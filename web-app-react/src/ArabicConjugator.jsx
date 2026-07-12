import React, {useState} from 'react';

function ArabicConjugator() {

    const [root, setRoot] = useState("كتب");

    function updateRoot(event) {
        setRoot(event.target.value);
    }

    return(<div>

        <input className="root-container" value={root} onChange={updateRoot}/>

    </div>)

}

export default ArabicConjugator;