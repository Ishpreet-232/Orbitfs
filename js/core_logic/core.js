/**
 * FILE: core.js
 * Core logic for the simulated file system: allocation, deletion, and defragmentation.
 */
class FileSystemCore {
    constructor(size = 50) { 
        this.DISK_SIZE = size;
        this.disk = Array.from({length: size}, () => []);
        this.files = {}; 
    }

    sanitize() {
        for(let i=0; i<this.DISK_SIZE; i++) {
            this.disk[i].sort((a,b) => a.start - b.start);
            this.disk[i] = this.disk[i].filter(seg => (seg.end - seg.start) > 0.001);
            this.disk[i].forEach(seg => {
                if (seg.start < 0) seg.start = 0;
                if (seg.end > 1) seg.end = 1;
            });
        }
    }

    createFile(name, size) {
        if (this.files[name]) throw new Error(`File '${name}' already exists.`);
        if (size <= 0) throw new Error("Invalid file size.");
        
        this.sanitize();

        let remaining = size;
        let allocatedIndices = [];
        
        // COLOR LOGIC: Single Profile (Monochromatic/Analogous)
        // Generate one base Hue. Hue2 is slightly shifted (15deg) for 3D effect.
        const hue1 = Math.floor(Math.random() * 360);
        const hue2 = (hue1 + 15) % 360; 

        // Allocation
        let emptyBlocks = [];
        for(let i=0; i<this.DISK_SIZE; i++) {
            if(this.disk[i].length === 0) emptyBlocks.push(i);
        }

        if (Math.ceil(remaining) > emptyBlocks.length) {
            throw new Error(`Insufficient continuous blocks. Try 'mend'.`);
        }

        emptyBlocks.slice(0, Math.ceil(remaining)).forEach((idx) => {
            let writeSize = 1.0;
            if (remaining < 1.0) writeSize = remaining;
            
            this.disk[idx].push({ 
                name: name, start: 0, end: writeSize, 
                hue1: hue1, hue2: hue2
            });
            allocatedIndices.push(idx);
            remaining -= writeSize;
        });

        this.files[name] = { 
            indices: allocatedIndices, size: size, 
            hue1: hue1, hue2: hue2 
        };
        
        this.saveBackup();
        return allocatedIndices;
    }

    deleteFile(name) {
        if (!this.files[name]) throw new Error("File not found.");
        const indices = this.files[name].indices;
        indices.forEach(idx => {
            this.disk[idx] = this.disk[idx].filter(seg => seg.name !== name);
        });
        delete this.files[name];
        this.sanitize();
        this.saveBackup();
        return indices.length;
    }

    resizeFile(name, newSize) {
        if (!this.files[name]) throw new Error("File not found.");
        const oldData = this.files[name];
        this.deleteFile(name); 
        try {
            this.sanitize();
            let remaining = newSize;
            let allocatedIndices = [];
            let emptyBlocks = [];
            for(let i=0; i<this.DISK_SIZE; i++) {
                if(this.disk[i].length === 0) emptyBlocks.push(i);
            }

            if (Math.ceil(remaining) > emptyBlocks.length) {
                // Re-create the file if resize fails
                this.createFile(name, oldData.size); 
                throw new Error(`Insufficient space to resize. Try 'mend'.`);
            }

            emptyBlocks.slice(0, Math.ceil(remaining)).forEach((idx) => {
                let writeSize = 1.0;
                if (remaining < 1.0) writeSize = remaining;
                this.disk[idx].push({ 
                    name: name, start: 0, end: writeSize, 
                    hue1: oldData.hue1, hue2: oldData.hue2
                });
                allocatedIndices.push(idx);
                remaining -= writeSize;
            });

            this.files[name] = { 
                indices: allocatedIndices, size: newSize, 
                hue1: oldData.hue1, hue2: oldData.hue2
            };
            this.saveBackup();
            return allocatedIndices.length;
        } catch (e) { throw e; }
    }

    defrag() {
        const allFiles = [];
        const sortedNames = Object.keys(this.files).sort((a, b) => this.files[a].indices[0] - this.files[b].indices[0]);
        sortedNames.forEach(name => {
            allFiles.push({
                name: name, size: this.files[name].size,
                hue1: this.files[name].hue1, hue2: this.files[name].hue2
            });
        });

        this.disk = Array.from({length: this.DISK_SIZE}, () => []);
        this.files = {}; 
        let cursor = 0.0;

        allFiles.forEach(file => {
            let remainingToWrite = file.size;
            const newIndices = [];
            while (remainingToWrite > 0.0001) { 
                const currentBlockIdx = Math.floor(cursor);
                if(currentBlockIdx >= this.DISK_SIZE) break;

                const offsetInBlock = cursor % 1; 
                const spaceInBlock = 1.0 - offsetInBlock;
                const writeAmount = Math.min(remainingToWrite, spaceInBlock);

                if (writeAmount > 0.0001) {
                    this.disk[currentBlockIdx].push({
                        name: file.name,
                        start: offsetInBlock,
                        end: offsetInBlock + writeAmount,
                        hue1: file.hue1, hue2: file.hue2
                    });
                    if (!newIndices.includes(currentBlockIdx)) newIndices.push(currentBlockIdx);
                }
                remainingToWrite -= writeAmount;
                cursor += writeAmount;
            }
            this.files[file.name] = {
                indices: newIndices, size: file.size,
                hue1: file.hue1, hue2: file.hue2
            };
        });
        this.sanitize();
        this.saveBackup();
    }

    ruptureRAM() {
        this.disk = Array.from({length: this.DISK_SIZE}, () => []);
        this.files = {};
    }

    restoreFromBackup() {
        const data = localStorage.getItem("fs_backup_split");
        if (!data) throw new Error("No backup found.");
        this.files = JSON.parse(data);
        this.defrag(); 
    }

    saveBackup() {
        localStorage.setItem("fs_backup_split", JSON.stringify(this.files));
    }
}