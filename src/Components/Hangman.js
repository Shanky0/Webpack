import React, { useState } from 'react';
import base0 from '../images/0.jpg';
import base1 from '../images/1.jpg';
import base2 from '../images/2.jpg';
import base3 from '../images/3.jpg';
import base4 from '../images/4.jpg';
import base5 from '../images/5.jpg';
import base6 from '../images/6.jpg';


import { randomword } from '../wordList'
import './Hangman.css'


var gameState = '';
const Hangman = () => {
  const maxWrong = 6;
  const images = [base0, base1, base2, base3, base4, base5, base6];

  const [state, setState] = useState({ wrong: 0, guessed: new Set(), answer: randomword() })
  const gameOver = state.wrong >= maxWrong;


  // Reset Function
  const reset = () => {
    setState({ wrong: 0, guessed: new Set(), answer: randomword() })
  }

  const handleGuess = (e) => {
    let letter = e.target.value;
    console.log(letter);
    setState({ ...state, wrong: state.wrong + (state.answer.word.toUpperCase().includes(letter) ? 0 : 1), guessed: state.guessed.add(letter) });
  }

  // Keypad generate function
  const generateKeypad = () => {
    return "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("").map((letter) => (
      <button key={letter} value={letter} onClick={handleGuess} disabled={state.guessed.has(letter)} >
        {letter}
      </button>
    ));
  }

  const guessedWord = () => {
    return state.answer.word.toUpperCase().split("").map((letter) => (state.guessed.has(letter) ? letter : "_"));
  }

  const isWinner = guessedWord().join("") === state.answer.word.toUpperCase();
  if (isWinner) gameState = "Congrats, You have won the Game";
  if (gameOver) gameState = "Better Luck Next Time";
  let restart = gameOver || isWinner;

  return (
    <div>
      <div className="Hangman">
        <h2>Hangman</h2>
        <img src={images[state.wrong]} alt="HangMan" />
        {(isWinner || gameOver) ? <h1> {gameState}</h1> : <>
          <p>
            Guessed Left: {maxWrong - state.wrong} / {maxWrong}
          </p>
          <p>Hint : {state.answer.hint}</p>
          <p className="Hangman-word">
            {!gameOver ? guessedWord() : state.answer.word.toUpperCase()}
          </p>
          <p className="Hangman-btns">{generateKeypad()}</p>
        </>}
        {restart && (
          <button id="reset" onClick={() => reset()}>
            Restart?
          </button>
        )}
      </div>
    </div>
  )
}

export default Hangman