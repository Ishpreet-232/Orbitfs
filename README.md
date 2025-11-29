# ✨ OrbitFS: Stealth Flow Edition (v3.6)

OrbitFS is a **browser-based, high-fidelity file system visualizer and simulator**. It features a "Stealth Flow" **glassmorphism** UI, a real-time memory block allocator, and a simulated command-line interface.

> **Note:** This project utilizes a modular architecture. All logic, visual rendering, and DOM interaction scripts are separated into distinct files to maintain clean code principles.

---

## 🔗 Live Demo

You can try the latest version of OrbitFS right now!

➡️ **[Launch OrbitFS: Stealth Flow Edition](https://loquacious-treacle-8ff40b.netlify.app/)** ⬅️

---

## 📂 Project Structure

The JavaScript logic is not embedded directly in the HTML. The project is organized as follows:

OrbitFS/ ├── index.html # Main entry point (DOM structure) ├── styles.css # Glassmorphism theme and layout └── js/ ├── core.js # File System Logic (Memory allocation, math) ├── wave_animation.js # Background Canvas rendering (WaveEngine) └── ui.js # Event listeners and DOM manipulation

---

## 💡 Key Features

* **Visual Memory Allocation:** Real-time grid visualization of file blocks (sectors) with distinct hue-shifting gradients for individual files. 
* **Stealth Flow UI:** A dark, high-contrast interface using `backdrop-filter` and neon accents (`#00f260`, `#0575e6`).
* **Simulated CLI:** A built-in terminal to execute file system commands like `forge`, `discard`, and `mend`.
* **Modular Codebase:** Logic is cleanly split into `core.js` (backend simulation), `ui.js` (frontend interaction), and `wave_animation.js` (visuals).
* **Persistence:** Uses `localStorage` to save the state of the disk between browser sessions.

---

## 🚀 Setup & Installation

To run OrbitFS locally:

1.  **Clone or Download** the repository.
2.  Ensure your folder structure matches the **Project Structure** above.
3.  The scripts must be linked in your `index.html` body and loaded in the following order due to dependencies:

    ```html
    <body>
        <script src="js/wave_animation.js"></script>
        <script src="js/core.js"></script>
        <script src="js/ui.js"></script>
    </body>
    ```

4.  Open **`index.html`** in any modern web browser (Chrome, Firefox, Edge) to launch the simulator.

---

## ⚙️ Module Documentation

### 1. `js/core.js` (FileSystemCore)

Contains the core **FileSystemCore** class. This file handles all raw data logic and simulation math:

* `createFile(name, size)`: Calculates block requirements and assigns sector indices.
* `defrag()`: Reorganizes scattered file blocks into continuous sectors (The **`mend`** command).
* `ruptureRAM()`: Completely wipes the internal array and file registry (The **`rupture`** command).

### 2. `js/wave_animation.js` (WaveEngine)

Contains the **WaveEngine** class, responsible for background visuals:

* Handles the HTML5 Canvas background rendering.
* Generates the sine-wave interference patterns using a dedicated render loop for the **Stealth Flow** effect.

### 3. `js/ui.js` (InterfaceManager)

Contains the front-end logic:

* Connects the HTML inputs and buttons to the **FileSystemCore** methods.
* Updates the "Volatile Memory Blocks" visualizer grid in real-time.
* Parses and executes text commands from the simulated console.

---

## ⌨️ Command Reference

Use the input field at the bottom of the interface to interact with OrbitFS.

| Command | Syntax | Description |
| :--- | :--- | :--- |
| **Forge** | `forge [name] [size]` | Creates a new file. Size is in abstract units (e.g., `forge data.txt 5`). |
| **Discard** | `discard [name]` | Deletes a file and frees up its memory blocks. |
| **Resize** | `resize [name] [size]` | Changes the size of an existing file. |
| **Mend** | `mend` | **Defragments** the disk, organizing file blocks sequentially for efficiency. |
| **Rupture** | `rupture` | **WARNING:** Purges all data from memory (Factory Reset). |
| **Help** | `help` | Lists available commands in the console. |

---

## 🎨 Customization

To change the core color scheme, edit the following CSS Variables in **`styles.css`**:

```css
:root {
    --accent-primary: #00f260;    /* Success/Active Color (e.g., File block) */
    --accent-secondary: #0575e6;  /* Info/System Color (e.g., System block) */
    --accent-error: #ff4b1f;      /* Error/Delete Color */
}
