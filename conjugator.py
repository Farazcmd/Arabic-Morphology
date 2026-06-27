from bidi.algorithm import get_display
import tkinter as ui
from tkinter import simpledialog

# Hide the ugly blank main UI window
root = ui.Tk()
root.withdraw()

# Open a native Windows input box (This fully supports natural Arabic typing!)
userRoot = simpledialog.askstring("Input", "Enter your three letter root verb (e.g., كتب):")



print(get_display(f"Root: {userRoot}"))

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

    "ِت" : "انتِ",
    "تُما" : "انتما",
    "تًنَّ" : "انتنَّ",

    "ُت" : "انا",
    "نَا" : "نحن", 
}

for pronoun, suffix in past_rules.items():
    conjugatedVerb = userRoot + pronoun
    print(get_display(conjugatedVerb))
    print("\n")
