import GPTReport from "./GPTReport";
import CallButtons from "./CallButtons";
import './Main.css'
import {useState} from "react";
import {getReport} from "../../utils";

function Main(props) {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [audioChunks, setAudioChunks] = useState([]);
    const [ws, setWs] = useState(null);
    const [report, setReport] = useState('')


    function startCall() {
        let emptyFiels = ''
        if (props.objections[0].value === '') {
            emptyFiels += 'Objections\n'
        }
        if (!props.targetAudience || props.targetAudience === '0') {
            emptyFiels += 'Target audience\n'
        }
        if (!props.presonalityType || props.presonalityType === '0') {
            emptyFiels += 'Personality type\n'
        }
        if(emptyFiels.length > 0){
            alert('The following settings have not been set:\n' + emptyFiels)
            window.location.reload()
        }
        const socket = new WebSocket('ws://localhost:8000/ws/1');
        props.clearDialogue()
        setReport('')
        socket.onopen = () => startRecording();
        socket.onclose = (event) => console.log('WebSocket disconnected', event);
        socket.onerror = (error) => {
            alert('Something was wrong. Try again later.')
            window.location.reload()
        };
        socket.onmessage = (event) => playResponse(event.data);
        setWs(socket);
    }

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                const recorder = new MediaRecorder(stream);
                setMediaRecorder(recorder);
                recorder.ondataavailable = (event) => {
                    setAudioChunks(prevAudioChunks => [...prevAudioChunks, event.data]);
                };

                recorder.start();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const stopAndSend = () => {
        mediaRecorder.ondataavailable = (event) => {
            setAudioChunks(prevAudioChunks => {
                const newAudioChunks = [...prevAudioChunks, event.data];

                const audioBlob = new Blob(newAudioChunks, {type: 'audio/wav'});
                const reader = new FileReader();
                reader.readAsArrayBuffer(audioBlob);
                reader.onloadend = () => {
                    let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(reader.result)));
                    const dataWS = {
                        'audio': base64String,
                        'target_audience': props.targetAudience,
                        'objections': props.objections,
                        'personality_type': props.presonalityType
                    }
                    ws.send(JSON.stringify(dataWS));
                };

                setAudioChunks([]);

                return newAudioChunks;
            });
        };

        mediaRecorder.stop();
    };


    const playResponse = (data) => {
        data = JSON.parse(data)
        const userMessage = data['user_query']
        const botMessage = data['ai_response']
        const audioSrc = `data:audio/mp3;base64,${data['voice_response']}`;
        const audio = new Audio(audioSrc);
        audio.play();

        props.onAddNewMessage('user', userMessage)
        audio.onended = () => {
            props.onAddNewMessage('bot', botMessage)
            startRecording()
        };
    };

    function endCall() {

        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            setAudioChunks([]);
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
            setWs(null);
            getReport(props.dialogue)
                .then(report => {
                    console.log(report)
                    setReport(report['response'])
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


    return (
        <div className="col-md-6 order-2">
            <div className="chat">
                <div className="fs-3 text-center mt-3">
                    Sales Bot
                </div>
                <GPTReport report={report}/>
                <CallButtons onCallStarting={startCall} onStopTalking={stopAndSend} onEndCalling={endCall}/>
            </div>
        </div>
    )
}

export default Main