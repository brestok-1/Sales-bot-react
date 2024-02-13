import ReactMarkdown from "react-markdown";

function GPTReport(props) {

    return (
        <div className={'gpt-report px-4 mt-4'}>
            <ReactMarkdown children={props.report}/>
        </div>
    )
}

export default GPTReport