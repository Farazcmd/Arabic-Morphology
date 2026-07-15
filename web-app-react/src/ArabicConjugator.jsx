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
    ["يَ", "اَنِ"],
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
    const ALL_DIACRITICS_REGEX = /[\u064B-\u0652]/g;

    function removeUnwantedDiacritics(root, removeAll){
        if (!root) return "";
    
        if (removeAll) {
            return root.replace(ALL_DIACRITICS_REGEX, "");
        } 

        if (DIACRITICS_REGEX.test(root.slice(-1))) {
            root = root.slice(0, -1);
        }
        if (root[1] && DIACRITICS_REGEX.test(root[1])) {
            root = root[0] + root.slice(2);
        }
        return root;
    }

    const [root, setRoot] = useState(removeUnwantedDiacritics("فَعَلَ", false));
    const [displayRoot, setDisplayRoot] = useState("فَعَلَ");

    function updateRoot(event) {
        const cleanRoot = displayRoot.trim();
        if (cleanRoot !== "") {
            const finalRoot = removeUnwantedDiacritics(cleanRoot, false);
            setRoot(finalRoot);
        }
    }

    function updateDisplayRoot(event) {
        setDisplayRoot(event.target.value);
    }

    
    const[font, setFont] = useState("Amiri");
    function changeFont(event) {
        setFont(event.target.value)
        document.body.style.fontFamily = `'${event.target.value}', sans-serif`;
        document.body.style.fontWeight = event.target.value === "Tajawal" ? "600" : "500";
    }

    return(<>
        <input type="text" placeholder="Enter a root... e.g., كتب" className="root-container" value={displayRoot} onChange={updateDisplayRoot}/>
        <button type="button" className="conjugate-button" onClick={updateRoot}>Conjugate</button>
        <label className="fontLabel" for="fontSelect">Change font:</label>
        <select className="fontSelect" name="fontSelect" id="fontSelect" onChange={changeFont}>
            <option value="Amiri">Amiri</option>
            <option value="Tajawal">Tajawal</option>
        </select>


        <div className="container">

            <div className="conjugation-column">
                <h3>المَاضِي المَعْرُوف (Active Past)</h3>
                {root.trim() !== "" && past_rules.map((conjugations, index) => (
                <React.Fragment key={index}>
                <li>{root[0] + 'َ' + root.slice(1) + conjugations}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>))} 
            </div>
                
            <div className="conjugation-column">
                <h3>المَاضِي المَجْهُول (Passive Past)</h3>
                {root.trim() !== "" && past_rules.map((conjugations, index) =>
                <React.Fragment key={index}>
                <li>{root[0] + "ُ" + root[1] + "ِ" + root.slice(3) + conjugations}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>)}
            </div>

            <div className="conjugation-column">
                <h3>المُضَارِع المَعْرُوف (Present Tense)</h3>
                {root.trim() !== "" && present_rules.map((conjugations, index) => (
                <React.Fragment key={index}>
                <li>{conjugations[0] + root[0] + "ْ" + root.slice(1) + conjugations[1]}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>))} 
            
            </div>

            <div className="conjugation-column">
                <h3>المُضَارِع المَجْهُول Passive Present</h3>
                {root.trim() !== "" && present_rules.map((conjugations, index) =>
                <React.Fragment key={index}>
                <li>{conjugations[0][0] + "ُ" + root[0] + "ْ" + root.slice(1) + conjugations[1]}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>)}
            </div>

        </div>
    </>)

}

export default ArabicConjugator;