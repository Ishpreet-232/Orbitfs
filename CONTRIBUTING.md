# Contributing Guide - OrbitFS

## Project Overview
OrbitFS is a modular file system implementation with separate components for core logic and UI.

## Branch Structure

### Main Branch (`main`)
- Protected branch
- Contains the base project structure
- All changes must come through Pull Requests

### Feature Branches

#### `feature/core-logic` - Core Logic Developer
**Assigned Files:**
- `js/core_logic/commands.js` - Command processing and parsing
- `js/core_logic/core.js` - Core file system operations

**Responsibilities:**
- Implement command parser (cd, ls, mkdir, touch, rm, etc.)
- File system operations (create, read, update, delete)
- Directory navigation and management
- Error handling for invalid commands
- Data structure for file system storage

**Key Functions to Implement:**
```javascript
// commands.js
class CommandProcessor {
  constructor(core, ui) { }
  execute(cmdName, args) { }
  // Individual command methods (cmdForge, cmdBanish, etc.)
}

// core.js
class FileSystem {
  constructor() { }
  createFile(path, content) { }
  createDirectory(path) { }
  readFile(path) { }
  deleteNode(path) { }
  listDirectory(path) { }
  // etc.
}
```

---

#### `feature/ui-components` - UI Developer
**Assigned Files:**
- `js/ui_component/ui.js` - Terminal UI and display
- `js/ui_component/wave_animation.js` - Background animations

**Responsibilities:**
- Terminal display and rendering
- Command input handling
- Output formatting and display
- Background wave animation
- User interaction management

**Key Functions to Implement:**
```javascript
// ui.js
class TerminalUI {
  constructor() { }
  init() { }
  displayPrompt() { }
  displayOutput(text, type) { }
  handleInput(command) { }
  clearScreen() { }
}

// wave_animation.js
class WaveAnimation {
  constructor(canvasId) { }
  init() { }
  animate() { }
  // Wave drawing logic
}
```

---

## Workflow

### 1. Clone the Repository
```bash
git clone https://github.com/Ishpreet-232/Orbitfs.git
cd Orbitfs
```

### 2. Checkout Your Assigned Branch
```bash
# For core logic developer:
git checkout feature/core-logic

# For UI developer:
git checkout feature/ui-components
```

### 3. Development Workflow
```bash
# Make your changes
# Test your code

# Stage changes
git add .

# Commit with clear message
git commit -m "feat: implement command parser for cd and ls"

# Push to your branch
git push origin feature/core-logic  # or feature/ui-components
```

### 4. Create Pull Request
1. Go to GitHub repository
2. Click "Pull Requests" → "New Pull Request"
3. Select your branch → `main`
4. Add description of your changes
5. Request review from team members
6. Wait for approval before merging

## Commit Message Guidelines

Use conventional commits format:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `test:` - Adding tests
- `style:` - Code style changes (formatting)

Examples:
```
feat: add file creation command
fix: resolve path navigation bug
refactor: optimize directory traversal
```

## Integration Points

### How Components Connect

The `main.js` file initializes and connects all components:

```javascript
// main.js structure
const fileSystem = new FileSystem();  // from core.js
const ui = new TerminalUI();          // from ui.js
const waveAnim = new WaveAnimation(); // from wave_animation.js
const cmdProcessor = new CommandProcessor(fileSystem, ui); // from commands.js

// UI sends commands to CommandProcessor
// CommandProcessor uses FileSystem for operations
// CommandProcessor uses UI to display results
```

**Communication Flow:**
```
User Input → UI → CommandProcessor → FileSystem (core logic)
                                    ↓
Result ← UI ← CommandProcessor ← FileSystem
```

## Testing Your Code

Before pushing:
1. Test your functions individually
2. Check integration with other components (if available)
3. Ensure no console errors
4. Verify functionality matches requirements

## File System Commands Reference

Commands to implement (for core-logic developer):

| Command | Description | Example |
|---------|-------------|---------|
| `ls` | List directory contents | `ls`, `ls /path` |
| `cd` | Change directory | `cd folder`, `cd ..` |
| `mkdir` | Create directory | `mkdir newfolder` |
| `touch` | Create file | `touch file.txt` |
| `rm` | Remove file/folder | `rm file.txt` |
| `cat` | Display file content | `cat file.txt` |
| `echo` | Write to file | `echo "text" > file.txt` |
| `pwd` | Print working directory | `pwd` |
| `clear` | Clear terminal | `clear` |

## Need Help?

- Check existing `index.html`, `styles.css`, and `main.js` for context
- Open an issue on GitHub for questions
- Review code comments in other files
- Contact project maintainer: @Ishpreet-232

## Pull Request Checklist

Before submitting PR:
- [ ] Code follows project style
- [ ] All functions are implemented
- [ ] Code is tested and working
- [ ] No console errors
- [ ] Commit messages are clear
- [ ] Branch is up to date with main
- [ ] Documentation/comments added where needed

---

**Happy Coding! 🚀**