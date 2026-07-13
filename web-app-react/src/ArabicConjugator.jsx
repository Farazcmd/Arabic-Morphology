import React, {useState} from 'react';

function ArabicConjugator() {

    const past_rules = [
    "َ",
    "َا",
    "ُوا",

    "َتْ",
    "َتَا",
    "ْنَ",

    "ْتَ",
    "ْتُما",
    "ْتُم",

    "تِ",
    "تُمَا",
    "ْتُنَّ",

    "ْتُ",
    "ْنَا"
]

    const present_rules = [
    ["يَ", "ُ"],
    ["يَ", "انِ"],
    ["يَ", "ُونَ"],

    ["تَ", "ُ"],
    ["تَ", "َانِ"],
    ["يَ", "ْنَ"],

    ["تَ", "ُ"],
    ["تَ", "َانِ"],
    ["تَ", "ُونَ"],

    ["تَ", "ِينَ"], 
    ["تَ", "َانِ"],
    ["تَ", "ْنَ"],

    ["أَ", "ُ"],
    ["نَ", "ُ"]
    ]

    const [root, setRoot] = useState("فَعَلَ");



    function updateRoot(event) {
        setRoot(event.target.value);
    }

    return(<>
        <input type="text" placeholder="Enter a root... e.g., كتب" className="root-container" value={root} onChange={updateRoot}/>
        <button className="conjugate-button">Conjugate</button>

        <div className="container">

            <div className="conjugation-column">
                <h3>الماضي (Past Tense)</h3>
                {root.trim() !== "" && past_rules.map((conjugations, index) => (
                <React.Fragment key ={index}>
                <li>{root + conjugations}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>))} 
            </div>

            <div className="conjugation-column">
                <h3>المضارع (Present Tense)</h3>
                {root.trim() !== "" && present_rules.map((conjugations, index) => (
                <React.Fragment key={index}>
                <li>{conjugations[0] + root + conjugations[1]}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>))} 
            
            </div>

        </div>
    </>)

}

export default ArabicConjugator;