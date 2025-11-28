/**
 * FILE: ui.js
 * Manages all DOM rendering and user interaction elements.
 * Depends on: core.js (for render data structure)
 */
class UserInterface {
    constructor() {
        this.consoleEl = document.getElementById('console-output');
        this.diskEl = document.getElementById('disk-visualizer');
        this.dirEl = document.getElementById('directory-list');
        this.countEl = document.getElementById('file-count');
        this.statsEl = document.getElementById('disk-stats');
    }

    log(msg, type="info") {
        const div = document.createElement('div');
        div.innerHTML = msg;
        if (type === "error") div.className = "log-error";
        if (type === "success") div.className = "log-success";
        if (type === "cmd") div.className = "log-cmd";
        this.consoleEl.appendChild(div);
        this.consoleEl.scrollTop = this.consoleEl.scrollHeight;
    }

    render(core) {
        // Directory
        this.dirEl.innerHTML = "";
        const keys = Object.keys(core.files);
        this.countEl.textContent = `${keys.length} Files`;
        
        if (keys.length === 0) {
            this.dirEl.innerHTML = "<li style='opacity:0.5; border:none;'>(System Empty)</li>";
        } else {
            for (const [name, fileData] of Object.entries(core.files)) {
                const li = document.createElement('li');
                
                // Color logic derived from file data
                const colorStyle = `background: linear-gradient(135deg, hsl(${fileData.hue1}, 100%, 65%), hsl(${fileData.hue2}, 100%, 45%));`;
                
                li.innerHTML = `
                    <div class="gradient-dot" style="${colorStyle}"></div>
                    <strong>${name}</strong> 
                    <span style="opacity:0.5; font-size:0.8em">[${fileData.size.toFixed(2)}]</span>
                `;
                li.onmouseenter = () => this.highlightBlocks(fileData.indices, true);
                li.onmouseleave = () => this.highlightBlocks(fileData.indices, false);
                this.dirEl.appendChild(li);
            }
        }

        // Disk Visualizer
        this.diskEl.innerHTML = "";
        let totalUsed = 0;
        
        core.disk.forEach((segments, idx) => {
            const div = document.createElement('div');
            div.id = `block-${idx}`;
            
            if (segments.length === 0) {
                div.className = "block";
            } else {
                div.className = "block used";
                
                segments.sort((a,b) => a.start - b.start);
                let gradStops = [];
                
                segments.forEach(seg => {
                    const startPct = (seg.start * 100).toFixed(1);
                    const endPct = (seg.end * 100).toFixed(1);
                    
                    // Internal Gradient: Highlight -> Shadow of SAME HUE (Single Color Profile)
                    const c1 = `hsl(${seg.hue1}, 95%, 65%)`; // Bright highlight
                    const c2 = `hsl(${seg.hue2}, 95%, 40%)`; // Deep tone
                    
                    gradStops.push(`${c1} ${startPct}%`);
                    gradStops.push(`${c2} ${endPct}%`);
                    
                    totalUsed += (seg.end - seg.start);
                    
                    // Split Character Visibility
                    if ((seg.end - seg.start) > 0.15) {
                        const charSpan = document.createElement('span');
                        charSpan.className = 'block-char';
                        charSpan.textContent = seg.name[0].toUpperCase();
                        const centerPos = ((seg.start + seg.end) / 2) * 100;
                        charSpan.style.left = `${centerPos}%`;
                        div.appendChild(charSpan);
                    }
                });

                // Add empty space as transparent stop at the end if the block isn't full
                const lastSeg = segments[segments.length-1];
                if (lastSeg.end < 0.99) {
                     gradStops.push(`transparent ${lastSeg.end*100}%`);
                }

                div.style.background = `linear-gradient(90deg, ${gradStops.join(', ')})`;
            }
            this.diskEl.appendChild(div);
        });

        const pct = ((totalUsed / core.DISK_SIZE) * 100).toFixed(1);
        this.statsEl.textContent = `${pct}% Used`;
    }

    highlightBlocks(indices, active) {
        indices.forEach(idx => {
            const el = document.getElementById(`block-${idx}`);
            if (el) active ? el.classList.add('highlight') : el.classList.remove('highlight');
        });
    }

   openModal() { 
        const modal = document.getElementById('rupture-modal');
        modal.classList.add('shake'); // NEW: Apply shake class when opening
        modal.classList.add('active'); 
    }
    
    closeModal() { 
        const modal = document.getElementById('rupture-modal');
        modal.classList.remove('active'); 
        // NEW: Remove shake immediately after close to prepare for next time
        setTimeout(() => modal.classList.remove('shake'), 300); 
    }

    clearConsole() { this.consoleEl.innerHTML = ""; }

    // NEW: Methods to handle the Revive visual effect
    startReviveAnimation() {
        // Apply glow to all blocks
        document.querySelectorAll('.block').forEach(el => {
            el.classList.add('revive-glow');
        });
    }

    stopReviveAnimation() {
        // Remove glow from all blocks
        document.querySelectorAll('.block').forEach(el => {
            el.classList.remove('revive-glow');
        });
    }
}