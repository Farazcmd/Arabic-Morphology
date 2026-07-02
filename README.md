# Arabic Verb Conjugator

The project features a clean, dual-column Graphical User Interface (GUI) built with Tkinter that automatically processes past and present tense conjugations side-by-side. It utilizes dynamic string-slicing logic to properly anchor Arabic diacritics (like Sukun) directly onto the root characters with perfect native script connectivity.

## Getting Started

### 1. Prerequisites
Make sure you have **Python 3.10 or higher** installed on your system. 

### 2. Environment Setup
No external packages or `pip install` commands are required! The application relies entirely on standard built-in Python libraries (`tkinter`).

### 3. Running the Project
1. Open the project folder in VS Code.
2. Run your main script file (e.g., `main.py`).
3. Press **F5** (or `Ctrl + F5`) to launch. A native GUI window will slide open, prompting you for a 3-letter root verb.

## System Notes
* **Arabic Layout Support:** Unlike terminal-based applications, this graphical interface handles Arabic cursives, right-to-left layout alignments, and diacritics natively via the operating system's window manager. For optimal rendering, ensure your system text engine supports standard Arabic font faces like *Arial* or *Segoe UI*.
