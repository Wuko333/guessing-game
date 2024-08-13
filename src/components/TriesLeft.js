
function TriesLeft(props){
    return <div>You have {props.maxAttempts - props.numGuesses} attempts left. {!props.isGameOver && <div>Guess Again! </div>} </div>;
}


export default TriesLeft;