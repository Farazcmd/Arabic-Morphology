import tkinter as tk
from tkinter import simpledialog

root = tk.Tk()
root.geometry("400x200+470+270")

# Open a native Windows input box (This fully supports natural Arabic typing!)
userRoot = simpledialog.askstring("Input", "Enter your three letter root verb (e.g., كتب):")


past_rules = {
    "هو" : "َ",
    "هما مذكر" : "َا",
    "هم" : "ُوا",

    "هي" : "َتْ",
    "هما مؤنث" : "َتَا",
    "هن" : "ْنَ",

    "انت" : "ْتَ",
    "انتما مذكر" : "ْتُما",
    "انتم" : "ْتُم",

    "انتِ" : "تِ",
    "انتما مؤنث" : "تُمَا",
    "انتنَّ" : "ْتُنَّ",

    "انا" : "ْتُ",
    "نحن" : "ْنَا"
}

present_rules = {
    "هو" : ["يَ", "ُ"],
    "هما مذكر" : ["يَ", "انِ"],
    "هم" : ["يَ", "ُونَ"],

    "هي" : ["تَ", "ُ"],
    "هما مؤنث" : ["تَ", "َانِ"],
    "هن" : ["يَ", "ْنَ"],

    "انتَ" : ["تَ", "ُ"],
    "انتما مذكر" : ["تَ", "َانِ"],
    "انتم" : ["تَ", "ُونَ"],

    "انتِ" : ["تَ", "ِينَ"], 
    "انتما مؤنث" : ["تَ", "َانِ"],
    "انتنَّ" : ["تَ", "ْنَ"],

    "انا" : ["أَ", "ُ"],
    "نحن" : ["نَ", "ُ"]
}

labelPast = tk.Label(root, text = "Past tense verbs", font=("Arial", 12, "bold"))
labelPast.grid(row = 0, column = 1, sticky="ew", padx=20, pady=5)

r = 1
for pronoun, suffix in past_rules.items():
    arabic_label = tk.Label(root, text = userRoot + suffix, font = ("Arial", 20), anchor = "e")
    arabic_label.grid(row = r, column = 1, sticky="ew", padx=20)
    r += 1
    
labelPresent = tk.Label(root, text = "Present tense verbs", font=("Arial", 12, "bold"))
labelPresent.grid(row = 0, column = 0, sticky="ew", padx=20, pady=5)

r = 1
for pronoun, sufpre in present_rules.items():
    arabic_label = tk.Label(root, text = sufpre[0] + userRoot[0] + "ْ" + userRoot[1:] + sufpre[1], font = ("Arial", 20), anchor = "e")
    arabic_label.grid(row = r, column = 0, sticky="ew", padx=20)
    r += 1

root.mainloop()