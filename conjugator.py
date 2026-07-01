import tkinter as tk
from tkinter import simpledialog

root = tk.Tk()
root.geometry("400x200+470+270")

# Open a native Windows input box (This fully supports natural Arabic typing!)
userRoot = simpledialog.askstring("Input", "Enter your three letter root verb (e.g., كتب):")


past_rules = {
    "" : "هو",
    "ا" : "هما",
    "وا" : "هم",

    "تْ" : "هي",
    "تا" : "هما",
    "هُنَّ" : "هن",

    "تَ" : "انت",
    "تُما" : "انتما",
    "تُم" : "انتم",

    "تِ" : "انتِ",
    "تُما" : "انتما",
    "تًنَّ" : "انتنَّ",

    "ُت" : "انا",
    "نَا" : "نحن", 
}

for pronouns, suffixes in past_rules.items():
    arabic_label = tk.Label(root, text = userRoot + pronouns, font = ("Arial", 20), anchor = "e")
    arabic_label.pack(fill = "x", padx = 20, pady = 5)
    
root.mainloop()