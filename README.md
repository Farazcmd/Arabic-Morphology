# Arabic Verb Conjugator

A Python-based rule engine designed to model and compute Arabic linguistic morphology, specifically focusing on Form I verbs. The project includes integrated text-reshaping logic to ensure correct script connectivity and right-to-left orientation directly within a terminal interface.

---

## Getting Started

### 1. Prerequisites
Make sure you have Python 3.10 or higher installed on your system.

### 2. Environment Setup
Install the necessary packages required to handle Arabic text rendering and bidirectional layout processing in the terminal:

pip install arabic-reshaper python-bidi

### 3. Running the Project
1. Open the project folder in VS Code.
2. Open your core script file.
3. Press **F5** (or go to **Run -> Start Debugging**) to launch the script in a dedicated external terminal window. 

---

## Known Hurdles & Terminal Fixes

### Issue: Disconnected Arabic Letters
* **Symptoms:** The terminal prints Arabic letters in their isolated forms side-by-side (e.g., ك ت ب instead of كتب).
* **The Cause:** Default terminal fonts like Consolas do not natively support Arabic cursive connectivity rules in a command line environment.
* **The Fix:** 
  1. In the external Windows Terminal window, click the **dropdown arrow ( ⌵ )** at the top bar and open **Settings**.
  2. In the left sidebar, under Profiles, click on Defaults.
  3. Scroll down and click on Appearance.
  4. Change the Font face to **Simplified Arabic Fixed** (highly recommended for perfect monospaced alignment) or **Segoe UI**.
  5. Click **Save** and rerun your script.