import React, {useState, useEffect, useMemo} from 'react';


const ConjugationColumn = React.memo(function ConjugationColumn ({ title, form }) {
    return(
        <div className="conjugation-column">
            <h3>{title}</h3>
            <ul>
                {form.map((item, index) => (
                <React.Fragment key={index}>
                <li>{item}</li>
                {(index + 1) % 3 === 0 && <br/>}
                </React.Fragment>
            ))}
            </ul>
        </div>
    )
});


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

    "ْتِ",
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
    const [rootError, setRootError] = useState("");
    const [diacritics, setDiacritics] = useState([]);

    const cleanRoot = useMemo(() => removeUnwantedDiacritics(root, true), [root]);
    let [letter1, letter2, letter3] = cleanRoot;


    function updateRoot(event) {
        const temp = displayRoot.trim();
        if (temp === "") return;
        setDiacritics((displayRoot && displayRoot.match(ALL_DIACRITICS_REGEX, "")) || [])

        const cleanedLength = removeUnwantedDiacritics(temp, true).length;
        if (cleanedLength !== 3) {
            setRootError("Root must have exactly 3 letters.");
            return;
        }
        const finalRoot = removeUnwantedDiacritics(temp, false);
        setRoot(finalRoot);
        setRootError("");
    }

    function updateDisplayRoot(event) {
        setDisplayRoot(event.target.value);
    }

    const[font, setFont] = useState("Amiri");
    
    function changeFont(event) {
        setFont(event.target.value);
    }

    function classifyRoot(root, hasShaddah) {
        const [letter1, letter2, letter3] = root;
        const weakLetters = ["و", "ي"];
        const isDoubled = letter2 === letter3 || hasShaddah;
        const isHamzated = root.includes("ء");
        const isAssimilated = weakLetters.includes(letter1);
        const isHollow = weakLetters.includes(letter2);
        const isDefective = weakLetters.includes(letter3);
        const isSound = !(isDoubled || isHamzated || isAssimilated || isHollow || isDefective);

        return { isDoubled, isHamzated, isAssimilated, isHollow, isDefective, isSound };
    }

    function Hamzate(root, past_rules, present_rules) {
        let letter1 = root[0];
        let letter2 = root[1];
        let letter3 = root[2];

        if (letter1 === "ا") {
            letter1 = "أ";
        } if (letter2 === "ا") {
            letter2 = "أ";
        } if (letter2 === "و") {
            letter2 = "ؤ";
        } if (letter2 === "ي") {
            letter2 = "ئ";
        } if (letter3 === "ا") {
            letter3 = "أ";
        } if (letter3 === "و") {
            letter3 = "ؤ";
        } 
        
        const activePastForms = past_rules.map((conjugations) => letter1 + 'َ' + letter2 + root.slice(2) + conjugations);
        const passivePastForms = past_rules.map((conjugations) => letter1 + "ُ" + letter2 + "ِ" + letter3 + conjugations);
        const activePresentForms = present_rules.map((conjugations) => conjugations[0] + letter1 + "ْ" + letter2 + root.slice(2) + conjugations[1]);
        const passivePresentForms = present_rules.map((conjugations) => conjugations[0][0] + "ُ" + letter1 + "ْ" + letter2 + "َ" + letter3 + conjugations[1]);

        if (letter1 === "أ") {
            activePresentForms[12] = "آ" + letter2 + root.slice(2) + present_rules[12][1];
            passivePresentForms[12] = "أُؤْ" + letter2 + "َ" + letter3 + present_rules[12][1];
        }

        return { activePastForms, passivePastForms, activePresentForms, passivePresentForms };
        /* const { activePastForms, passivePastForms, activePresentForms, passivePresentForms } = 
        Hamzate(removeUnwantedDiacritics(root, true), past_rules, present_rules);    WRITE THIS TO USE  */
    }


    
    useEffect(() => {
        document.body.style.fontFamily = `'${font}', sans-serif`;
    }, [font]);

    const activePastForms = useMemo(
        () => past_rules.map((conjugations) => letter1 + 'َ' + root.slice(1) + conjugations), [root]
    );

    const passivePastForms = useMemo(
        () => past_rules.map((conjugations) => letter1 + "ُ" + letter2 + "ِ" + letter3 + conjugations), [root]
    );

    const activePresentForms = useMemo(
        () => present_rules.map((conjugations) => conjugations[0] + letter1 + "ْ" + root.slice(1) + conjugations[1]), [root]
    );

    const passivePresentForms = useMemo(
        () => present_rules.map((conjugations) => conjugations[0][0] + "ُ" + letter1 + "ْ" + letter2 + "َ" + letter3 + conjugations[1]), [root]
    );

    
    return(<>
        <input type="text" placeholder="Enter a root... e.g., كتب" className="root-container" value={displayRoot} onChange={updateDisplayRoot}/>
        <button type="button" className="conjugate-button" onClick={updateRoot}>Conjugate</button>
        {rootError && <p className="root-error">{rootError}</p>}
        <label className="fontLabel" htmlFor="fontSelect">Change font:</label>
        <select className="fontSelect" id="fontSelect" onChange={changeFont}>
            <option value="Amiri">Amiri</option>
            <option value="Tajawal">Tajawal</option>
        </select>


        <div className="container">

            <ConjugationColumn title="المَاضِي المَعْرُوف (Active Past)" form={activePastForms}/>

            <ConjugationColumn title="المَاضِي المَجْهُول (Passive Past)" form={passivePastForms}/>

            <ConjugationColumn title="المُضَارِع المَعْرُوف (Active Present)" form={activePresentForms}/>

            <ConjugationColumn title="المُضَارِع المَجْهُول (Passive Present)" form={passivePresentForms}/>

        </div>
    </>)

}

export default ArabicConjugator;