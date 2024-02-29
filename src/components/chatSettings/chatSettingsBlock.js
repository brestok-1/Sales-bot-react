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
                                <span className="input-group-text"
                                      onClick={() => props.onRemoveObjectionInput(index)}><i
                                    className="fa-solid fa-xmark fs-5" style={{cursor: "pointer"}}></i></span>
                            </div>
                        ))}
                        <div className="d-flex justify-content-center mt-2" onClick={props.onAddObjectionInput}>
                            <i className="fa-solid fa-plus fs-3" style={{cursor: "pointer"}}></i>
                        </div>
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Product
                            details
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                                  onChange={(event) => {
                                      props.onSetProductDetail(event.target.value)
                                  }}></textarea>
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Company description
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                                  onChange={(event) => {
                                      props.onSetCompanyDescription(event.target.value)
                                  }}></textarea>
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Target customer
                            profile
                        </label>
                        <input className="form-control" type="text" placeholder="Programmer"
                               aria-label="default input example"
                               onChange={(event) => {
                                   props.onSetTargetAudience(event.target.value)
                               }}
                        />
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Personal background
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"
                                  onChange={(event) => {
                                      props.onSetPersonalBackground(event.target.value)
                                  }}
                        ></textarea>
                    </div>

                    <div className={'settings-card mt-3'}>
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Sales Pitch Script
                        </label>
                        <select className="form-select" aria-label="Choose the buyer's behavior"
                                onChange={(event) => {
                                    props.onSetPitchScript(event.target.value)
                                }}>
                            <option value={'0'} className={'d-none'}></option>
                            <option value="Mock call">Mock call</option>
                            <option value="Cold call">Cold call</option>
                            <option value="Warm call">Warm call</option>
                        </select>
                    </div>

                    <div className="mt-3 settings-card">
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Goal of the call
                        </label>
                        <input className="form-control" type="text" placeholder="Improve my sales skills"
                               aria-label="" onChange={(event) => {
                            props.onSetGoal(event.target.value)
                        }}/>
                    </div>

                    <div className={'settings-card mt-3'}>
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Reason for Contacting
                            the prospect
                        </label>
                        <select className="form-select" aria-label=""
                                onChange={(event) => {
                                    props.onSetReason(event.target.value)
                                }}>
                            <option value={'0'} className={'d-none'}></option>
                            <option value="New product/service offering">New product/service offering</option>
                            <option value="Information about special promotions">Information about special
                                promotions
                            </option>
                            <option value="Invitation to an event">Invitation to an event</option>
                            <option value="Feedback on a previous purchase">Feedback on a previous
                                purchase
                            </option>
                            <option value="Update on product/service information">Update on product/service
                                information
                            </option>
                        </select>
                    </div>

                    <div className={'settings-card mt-3'}>
                        <label htmlFor="exampleFormControlTextarea1" className={"form-label fs-5"}>Last contact time
                        </label>
                        <select className="form-select" aria-label=""
                                onChange={(event) => {
                                    props.onSetLastContact(event.target.value)
                                }}>
                            <option value={'Never'}>Never</option>
                            <option value="Same day">Same day</option>
                            <option value="2-10 days ago">2-10 days ago</option>
                            <option value="11-30 days ago">11-30 days ago</option>
                            <option value="31-70 days ago">31-70 days ago</option>
                            <option value="71+ days ago">70+ days ago</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatSettingsBlock