import React, {useState} from 'react';

function ArabicConjugator() {

    const [root, setRoot] = useState("");

    function updateRoot(event) {
        setRoot(event.target.value);
    }

    return(<div>
        <input type="text" placeholder="Enter a root... e.g., كتب" className="root-container" value={root} onChange={updateRoot}/>

    </div>)

}

export default ArabicConjugator;