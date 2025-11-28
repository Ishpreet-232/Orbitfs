/**
 * FILE: main.js
 * Application entry point: initialization, event listeners, and global exposure.
 * Depends on: core.js, ui.js, commands.js, wave_animation.js
 */

// Initialize core services
const core = new FileSystemCore(50);
const ui = new UserInterface();
const wave = new WaveEngine(); 

// Expose core objects globally (needed for commands.js and index.html onclicks)
window.core = core;
window.ui = ui;

// Setup the executeRupture method on the global commands object
// This is necessary because it is called directly from the HTML modal button's onclick attribute.
window.commands.executeRupture = () => {
    core.ruptureRAM();
    ui.render(core);
    ui.closeModal();
    ui.log("💥 CRITICAL: Purge Complete.", "error");
};

const handleInput = () => {
    const inputEl = document.getElementById('command-input');
    const raw = inputEl.value.trim();
    if (!raw) return;
    ui.log(`> ${raw}`, "cmd");
    const parts = raw.split(" ");
    
    // Call the command processing function defined in commands.js
    // Pass core and ui references to the command processor
    processCommand(parts[0].toLowerCase(), parts.slice(1), core, ui);
    
    inputEl.value = "";
};

// Setup Event Listeners for command execution
document.getElementById('exec-btn').addEventListener('click', handleInput);
document.getElementById('command-input').addEventListener('keypress', (e) => {
    if (e.key === "Enter") handleInput();
});

// Initial render of the disk and directory upon load
ui.render(core);