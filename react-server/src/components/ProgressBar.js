import './css/progressBar.css'

function ProgressBar(props){
    return(
        <div className="progress-bar" >
            <div className="filler" key={props.progress} style={{width: `${props.progress}%`}}></div>
        </div>
    )
}

export default ProgressBar