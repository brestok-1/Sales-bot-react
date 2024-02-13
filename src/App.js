import Main from "./components/callBlock/Main";
import ChatHistoryBlock from "./components/chatHistory/chatHistoryBlock";
import ChatSettingsBlock from "./components/chatSettings/chatSettingsBlock";
import {useState} from "react";

function App() {
    const [dialogue, setDialogue] = useState([])

    const [personalityType, setPersonalityType] = useState(null);
    const [targetAudience, setTargetAudience] = useState(null);
    const [objections, setObjections] = useState([{value: ""}]);

    function updateDialogue(type, content) {
        setDialogue(dialogue => [...dialogue, {type: type, content: content}]);
    }

    const addObjectionInput = () => {
        if (objections.length < 5) {
            setObjections([...objections, {value: ""}]);
        } else {
            alert("Cannot add more than 5 objections");
        }
    };

    const removeObjectionInput = (index) => {
        if (index !== 0) {
            setObjections(objections.filter((_, i) => i !== index));
        }
    };

    const updateObjectionValue = (index, newValue) => {
        setObjections(objections.map((objection, i) => {
            if (i === index) {
                return {...objection, value: newValue};
            }
            return objection;
        }));
    };
    return (
        <div className="container-fluid">
            <div className="row">
                <ChatHistoryBlock dialogue={dialogue}/>
                <Main onAddNewMessage={updateDialogue}
                      dialogue={dialogue}
                      clearDialogue={() => {
                          setDialogue([])
                      }}
                      presonalityType={personalityType}
                      objections={objections}
                      targetAudience={targetAudience}
                />

                <ChatSettingsBlock
                    onSetPersonalityType={(type) => {
                        setPersonalityType(type)
                    }}
                    onSetTargetAudience={(audience) => setTargetAudience(audience)}
                    objections={objections}
                    onAddObjectionInput={addObjectionInput}
                    onRemoveObjectionInput={removeObjectionInput}
                    onUpdateObjectionValue={updateObjectionValue}
                />
            </div>
        </div>
    );
}

export default App;