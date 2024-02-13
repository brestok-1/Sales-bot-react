import {useState} from "react";

function CallButtons(props) {
    const [isCalling, setIsCalling] = useState(false)

    function makeCall() {
        props.onCallStarting()
        setIsCalling(true)
    }


    return (
        <div className={'call-buttons-block d-flex justify-content-around'}>
            {!isCalling && <div className={'calls-list d-flex'}>
                <div className="icon icon-fill my-2" onClick={makeCall}><i className={'fs-1 fa fa-phone'}/></div>
            </div>}
            {isCalling &&
                <div className={'calls-list d-flex'}>
                    <div className="icon icon-fill me-2 my-2" onClick={() => {
                        setIsCalling(false)
                        props.onEndCalling()
                    }}><i className={'fs-1 fa fa-phone-slash'}/></div>
                    <div className={'calls-list'}>
                        <div className="icon icon-fill ms-2 my-2" onClick={() => {
                            props.onStopTalking()
                        }}><i className="fs-1 fa-regular fa-circle-stop"/></div>
                    </div>
                </div>}
        </div>
    )
}

export default CallButtons