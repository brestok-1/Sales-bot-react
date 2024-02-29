import Main from "./components/callBlock/Main";
import ChatHistoryBlock from "./components/chatHistory/chatHistoryBlock";
import ChatSettingsBlock from "./components/chatSettings/chatSettingsBlock";
import {useState} from "react";

function App() {
    const [dialogue, setDialogue] = useState([])

    const [personalityType, setPersonalityType] = useState(null);
    const [objections, setObjections] = useState([{value: ""}]);
    const [pitchScript, setPitchScript] = useState(null);
    const [goal, setGoal] = useState(null);
    const [reason, setReason] = useState(null);
    const [lastContact, setLastContact] = useState(null);
    const [productDetail, setProductDetail] = useState(null);
    const [companyDescription, setCompanyDescription] = useState(null);
    const [targetCustomer, setTargetCustomer] = useState(null);
    const [personalBackground, setPersonalBackground] = useState(null);

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
                      targetCustomer={targetCustomer}
                      pitchScript={pitchScript}
                      goal={goal}
                      reason={reason}
                      lastContact={lastContact}
                      productDetail={productDetail}
                      companyDescription={companyDescription}
                      personalBackground={personalBackground}

                />

                <ChatSettingsBlock
                    onSetPersonalityType={(type) => {
                        setPersonalityType(type)
                    }}
                    onSetTargetAudience={(audience) => setTargetCustomer(audience)}
                    objections={objections}
                    onAddObjectionInput={addObjectionInput}
                    onRemoveObjectionInput={removeObjectionInput}
                    onUpdateObjectionValue={updateObjectionValue}
                    onSetPitchScript={(script) => {
                        setPitchScript(script)
                    }}
                    onSetGoal={(goal) => setGoal(goal)}
                    onSetReason={(reason) => setReason(reason)}
                    onSetLastContact={(lastContact) => setLastContact(lastContact)}
                    onSetProductDetail={(product) => setProductDetail(product)}
                    onSetCompanyDescription={(description) => setCompanyDescription(description)}
                    onSetPersonalBackground={(background) => setPersonalBackground(background)}
                />
            </div>
        </div>
    );
}

export default App;