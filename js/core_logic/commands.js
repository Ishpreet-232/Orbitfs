/**
 * FILE: commands.js
 * Command processing logic. It takes raw input and calls core/ui methods.
 */

// Function is globally available to main.js
const processCommand = (cmdName, args, core, ui) => {
    switch(cmdName) {
        case 'forge':
            if (args.length !== 2) return ui.log("Usage: forge [name] [size]", "error");
            try {
                const size = parseFloat(args[1]);
                if (isNaN(size)) throw new Error("Size must be a number");
                const indices = core.createFile(args[0], size);
                const file = core.files[args[0]];
                ui.render(core);
                const grad = `linear-gradient(90deg, hsl(${file.hue1},100%,60%), hsl(${file.hue2},100%,40%))`;
                const dot = `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${grad};"></span>`;
                ui.log(`${dot} <strong>${args[0]}</strong> forged (${size})`, "success");
            } catch(e) { ui.log(`❌ ${e.message}`, "error"); }
            break;
        case 'resize':
            if (args.length !== 2) return ui.log("Usage: resize [name] [size]", "error");
            try {
                const size = parseFloat(args[1]);
                core.resizeFile(args[0], size);
                ui.render(core);
                ui.log(`📏 <strong>${args[0]}</strong> resized to ${size}`, "info");
            } catch(e) { ui.log(`❌ ${e.message}`, "error"); }
            break;
        case 'banish':
            try {
                core.deleteFile(args[0]);
                ui.render(core);
                ui.log(`🗑 <strong>${args[0]}</strong> banished.`, "info");
            } catch(e) { ui.log(`❌ ${e.message}`, "error"); }
            break;
        case 'mend':
            core.defrag();
            ui.render(core);
            ui.log("🧩 Memory Mended.", "success");
            break;
        case 'rupture':
            // The modal open itself applies the shake (see ui.js)
            ui.openModal();
            break;
            
        case 'revive':
            try {
                ui.startReviveAnimation(); // NEW: Start the glow effect immediately
                core.restoreFromBackup();
                ui.render(core);
                ui.log("✨ System Revived.", "success");
                
                // NEW: Stop the glow after 1.5 seconds to show the recovery
                setTimeout(() => ui.stopReviveAnimation(), 1500); 
            } catch(e) { 
                ui.log(`⚠ ${e.message}`, "error"); 
                // Ensure glow stops if there's an error
                ui.stopReviveAnimation(); 
            }
            break;
        case 'clear':
            ui.clearConsole();
            break;
        case 'help':
            ui.log("Commands: forge, resize, banish, mend, rupture, revive, clear");
            break;
        default:
            ui.log(`❓ Unknown: ${cmdName}`, "error");
    }
};

// We expose the command processor to the global scope or via a command object
window.processCommand = processCommand;

// Global command namespace (for index.html onclick)
window.commands = {};