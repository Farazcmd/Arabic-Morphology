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

    const DIACRITICS_REGEX = /[\u064B-\u0652]/;
    function removeUnwantedDiacritics(root){
        if (!root) return "";
        const lastChar = root.slice(-1);
        if (DIACRITICS_REGEX.test(lastChar)) {
            root = root.slice(0, -1);
        }
        if (root[1] && DIACRITICS_REGEX.test(root[1])) {
            root = root[0] + root.slice(2);
        }
        return root;
    }

    const [root, setRoot] = useState(removeUnwantedDiacritics("فَعَلَ"));
    const [displayRoot, setDisplayRoot] = useState("فَعَلَ");

    function updateRoot(event) {
        const cleanRoot = displayRoot.trim();
        if (cleanRoot !== "") {
            const finalRoot = removeUnwantedDiacritics(cleanRoot);
            setRoot(finalRoot);
        }
    }

    function updateDisplayRoot(event) {
        setDisplayRoot(event.target.value);
    }


    return(<>
        <input type="text" placeholder="Enter a root... e.g., كتب" className="root-container" value={displayRoot} onChange={updateDisplayRoot}/>
        <button type="button" className="conjugate-button" onClick={updateRoot}>Conjugate</button>

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