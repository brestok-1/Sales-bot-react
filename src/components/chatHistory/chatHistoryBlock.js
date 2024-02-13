import './chatHistoryBlock.css'
import Message from "./Message";


function chatHistoryBlock(props) {
    return (
        <div className="col-md-3 px-4 order-3 order-md-1">
            <div className="chat-history">
                <div className="fs-3 text-center mt-3">
                    Chat History
                </div>
                <div className="chat-history-block mt-4">
                    {props.dialogue.map((message, index) =>
                        <Message type={message.type} content={message.content} key={index}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default chatHistoryBlock