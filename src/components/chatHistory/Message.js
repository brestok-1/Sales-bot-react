import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRobot, faUser} from "@fortawesome/free-solid-svg-icons";

function Message(props) {
    return (
        <div>
            {props.type === 'bot' &&
                <div className={'message-example-bot fs-4 mt-1 px-3'}>
                    <FontAwesomeIcon icon={faRobot} className={'fs-4'}/>
                    <span className={'ms-2'}>Bot</span>
                    <div className={'message-text pb-2'}>{props.content}</div>
                </div>
            }
            {props.type === 'user' &&
                <div className={'message-example-user fs-4 mt-1 px-3'}>
                    <FontAwesomeIcon icon={faUser} className={''}/>
                    <span className={'ms-2'}>User</span>
                    <div className={'message-text pb-2'}>{props.content}</div>
                </div>
            }
        </div>
    )
}

export default Message
