import './chatSettingsBlock.css'

function ChatSettingsBlock(props) {

    return (
        <div className="col-md-3 px-4 order-sm-1 order-md-3">
            <div className="chat-settings">
                <div className="fs-3 text-center mt-3">
                    Chat Settings
                </div>
                <div className="chat-settings-block px-3 mt-4">
                    <div className={'settings-card mt-3'}>
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Choose the buyer's
                            behavior
                        </label>
                        <select className="form-select settings-card mt-1" aria-label="Choose the buyer's behavior"
                                onChange={(event) => {
                                    props.onSetPersonalityType(event.target.value)
                                }}>
                            <option value={'0'} className={'d-none'}></option>
                            <option value="Passive">Passive</option>
                            <option value="Aggressive">Aggressive</option>
                            <option value="Shy">Shy</option>
                            <option value="Interested">Interested</option>
                            <option value="Rush">Rush</option>
                        </select>
                    </div>
                    <div className={'settings-card mt-3'}>
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Select your role
                        </label>
                        <select className="form-select" aria-label="Choose the buyer's behavior"
                                onChange={(event) => {
                                    props.onSetTargetAudience(event.target.value)
                                }}>
                            <option value={'0'} className={'d-none'}></option>
                            <option value="Individuals">Individual Sales Professional</option>
                            <option value="Organizations">Sales Team within a Company</option>
                        </select>
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Potential objections
                        </label>
                        {props.objections.map((objection, index) => (
                            <div className="input-group mt-2" key={index}>
                                <input type="text" className="form-control"
                                       value={objection.value}
                                       onChange={(e) => {
                                           props.onUpdateObjectionValue(index, e.target.value)
                                       }}
                                           aria-label="Objection"/>
                                <span className="input-group-text" onClick={() => props.onRemoveObjectionInput(index)}><i
                                    className="fa-solid fa-xmark fs-5"></i></span>
                            </div>
                        ))}
                        <div className="d-flex justify-content-center mt-2" onClick={props.onAddObjectionInput}>
                            <i className="fa-solid fa-plus fs-3"></i>
                        </div>
                    </div>

                    {/*<div className="mt-3 settings-card">*/}
                    {/*    <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Product*/}
                    {/*        details*/}
                    {/*    </label>*/}
                    {/*    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                    {/*</div>*/}

                    {/*<div className="mt-3 settings-card">*/}
                    {/*    <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Company description*/}
                    {/*    </label>*/}
                    {/*    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                    {/*</div>*/}


                    {/*<div className="mt-3 settings-card">*/}
                    {/*    <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Personal background*/}
                    {/*    </label>*/}
                    {/*    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default ChatSettingsBlock