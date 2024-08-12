import { useState } from 'react';
import { useRef } from 'react';
import './App.css';
import WinMessage from './components/WinMessage';
import LoseMessage from './components/LoseMessage';
import TriesLeft from './components/TriesLeft';

function App() {
  const textAreaRef = useRef(null);
  const maxAttempts = 5;
  const [guessCount, setGuessCount] = useState(0);
  const [guess, setGuess] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(Math.floor(Math.random() * 100));
  const [isCloseGuess, setIsCloseGuess] = useState(false);

  const [isGameOver, setIsGameOver] = useState(false);
  const [didGameStart, setDidGameStart] = useState(false);


  function processGuess() {
    const tempGuess = textAreaRef.current.value;
    setGuess(tempGuess);
    
    if(isValidGuess(tempGuess)) {
      setDidGameStart(true);
      setGuessCount(guessCount+1);
      setIsCloseGuess(Math.abs(correctAnswer-tempGuess) < 5);

      if(guessCount >= maxAttempts-1)
        setIsGameOver(true);

      if(tempGuess==correctAnswer)
        setIsGameOver(true);
      
    } 
  
  }

  function isValidGuess(guess){
    return isInt(guess) && guess>=0;
  }

  function isInt(value) {
    return !isNaN(value) && 
           parseInt(Number(value)) == value && 
           !isNaN(parseInt(value, 10));
  }

  function resetGame(){
    setGuessCount(0);
    setGuess('');
    setCorrectAnswer(Math.floor(Math.random() * 100));
    setIsCloseGuess(false);
    setIsGameOver(false);
    setDidGameStart(false);
    textAreaRef.current.value='';
  }
 
  return (
    <div className="App flex justify-center items-center flex-col space-y-20">
        <h1 className="text-green-600 font-bold text-xl">
          Guess the Number 
        </h1>
        <div>
          <textarea className="w-4/5" ref={textAreaRef} defaultValue={guess} />
        </div>
        {!isGameOver && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/5" type="button" onClick={() => processGuess()}>Submit Guess!</button>}
        {didGameStart && 
          <div>
            {guess > correctAnswer && !isGameOver && <p>Too High!</p>}
            {guess < correctAnswer && !isGameOver && <p>Too Low!</p>}
            {(isCloseGuess && guess!=correctAnswer && !isGameOver) && <p>You're close!</p>}
            <p>You guessed: {guess}</p>
            {guess!=correctAnswer && <TriesLeft maxAttempts={maxAttempts} numGuesses={guessCount} isGameOver={isGameOver} />}
          </div>
        }
        {isGameOver &&
          <div>
            {guess == correctAnswer 
             ? <WinMessage numGuesses={guessCount} />
             : <LoseMessage correctAnswer={correctAnswer} />
            }
            <button type="button" onClick={() => resetGame()}>Play Again?</button>
          </div>
        }
        
    </div>
  );
}

export default App;
