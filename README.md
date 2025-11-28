OrbitFS: Stealth Flow Edition (v3.6)
OrbitFS is a browser-based, high-fidelity file system visualizer and simulator. It features a "Stealth Flow" glassmorphism UI, a real-time memory block allocator, and a simulated command-line interface.
> Note: This project utilizes a modular architecture. All logic, visual rendering, and DOM interaction scripts are separated into distinct files.
> 
📂 Project Structure
To maintain clean code principles, the JavaScript logic is not embedded in the HTML. The project is organized as follows:
OrbitFS/
├── index.html              # Main entry point (DOM structure)
├── styles.css              # Glassmorphism theme and layout
└── js/
    ├── core.js             # File System Logic (Memory allocation, math)
    ├── wave_animation.js   # Background Canvas rendering (WaveEngine)
    └── ui.js               # Event listeners and DOM manipulation

✨ Key Features
 * Visual Memory Allocation: Real-time grid visualization of file blocks (sectors) with distinct hue-shifting gradients for individual files.
 * Modular Codebase: Logic is split into core.js (backend simulation), ui.js (frontend interaction), and wave_animation.js (visuals).
 * Stealth Flow UI: A dark, high-contrast interface using backdrop filters and neon accents (#00f260, #0575e6).
 * Simulated CLI: A built-in terminal to execute file system commands.
 * Persistence: Uses localStorage to save the state of the disk between sessions.
🚀 Setup & Installation
 * Clone or Download the repository.
 * Ensure your folder structure matches the Project Structure above.
 * Link the files in your index.html body (ensure they are loaded in this order):
<!-- end list -->
<body>
    <script src="js/wave_animation.js"></script>
    <script src="js/core.js"></script>
    <script src="js/ui.js"></script>
</body>

 * Open index.html in any modern web browser (Chrome, Firefox, Edge).
🧩 Module Documentation
1. js/core.js
Contains the FileSystemCore class. This file handles the raw data logic:
 * createFile(name, size): Calculates block requirements and assigns indices.
 * defrag(): Reorganizes scattered file blocks into continuous sectors (The "Mend" command).
 * ruptureRAM(): Completely wipes the internal array and file registry.
2. js/wave_animation.js
Contains the WaveEngine class.
 * Handles the HTML5 Canvas background.
 * Generates the sine-wave interference patterns using a dedicated render loop.
3. js/ui.js
Contains the InterfaceManager (or ui logic).
 * Connects the HTML inputs to the FileSystemCore methods.
 * Updates the "Volatile Memory Blocks" visualizer grid.
 * Parses text commands from the simulated console.
⌨️ Command Reference
Use the input field at the bottom of the interface to interact with OrbitFS.
| Command | Syntax | Description |
|---|---|---|
| Forge | forge [name] [size] | Creates a new file. Size is in abstract units (e.g., forge data.txt 5). |
| Discard | discard [name] | Deletes a file and frees up its blocks. |
| Resize | resize [name] [size] | Changes the size of an existing file. |
| Mend | mend | Defragments the disk, organizing blocks sequentially. |
| Rupture | rupture | WARNING: Purges all data from memory (Factory Reset). |
| Help | help | Lists available commands in the console. |
🎨 Customization
To change the color scheme, edit the CSS Variables in styles.css:
:root {
    --accent-primary: #00f260;  /* Success/Active Color */
    --accent-secondary: #0575e6; /* Info/System Color */
    --accent-error: #ff4b1f;    /* Error/Delete Color */
}

v3.6 - Stealth Flow Edition
