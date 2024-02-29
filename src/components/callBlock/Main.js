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
        // if (props.objections[0].value === '') {
        //     emptyFiels += 'Objections\n'
        // }
        // if (!props.pitchScript || props.pitchScript === '0') {
        //     emptyFiels += 'Sales Pitch Script\n'
        // }
        // if (!props.goal) {
        //     emptyFiels += 'Goal of the call\n'
        // }
        // if (!props.reason || props.reason === '0') {
        //     emptyFiels += 'Reason for Contacting the prospect\n'
        // }
        if (!props.targetCustomer) {
            emptyFiels += 'Target audience\n'
        }
        if (!props.presonalityType || props.presonalityType === '0') {
            emptyFiels += 'Personality type\n' || props.reason === '0'
        }
        // if (!props.productDetail) {
        //     emptyFiels += 'Product details\n'
        // }
        // if (!props.companyDescription) {
        //     emptyFiels += 'Company description\n'
        // }
        // if (!props.personalBackground) {
        //     emptyFiels += 'Personal background\n'
        // }
        if (emptyFiels.length > 0) {
            alert('The following settings have not been set:\n' + emptyFiels)
            window.location.reload()
        }
        const socket = new WebSocket('ws://0.0.0.0:7860/ws/1');
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
                try {
                    recorder.ondataavailable = (event) => {
                        setAudioChunks(prevAudioChunks => [...prevAudioChunks, event.data]);

                    };

                } catch (e) {
                    alert('It is not possible to send an empty message')
                }
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
                    console.log(base64String)
                    const dataWS = {
                        'audio': base64String,
                        'target_customer': props.targetCustomer,
                        // 'objections': props.objections,
                        'personality_type': props.presonalityType,
                        // 'pitch_script': props.pitchScript,
                        // 'goal': props.goal,
                        // 'reason': props.reason,
                        // 'last_contact': props.lastContact,
                        // 'product_details': props.productDetail,
                        // 'company_description': props.companyDescription,
                        // 'personal_background': props.personalBackground
                    }
                    console.log(dataWS)
                    ws.send(JSON.stringify(dataWS));
                };

                setAudioChunks([]);

                return newAudioChunks;
            });
        };
        try {
            mediaRecorder.stop();
        } catch (e) {
            return
        }
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