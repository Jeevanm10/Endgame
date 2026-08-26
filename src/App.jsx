import {languages} from "./language";
import React from "react";
import clsx from "clsx";
import { getFarewellText,getRandomWord } from "./util";
import Confetti from "react-confetti";
import {useWindowSize} from 'react-use';

export default function AssemblyEndgame() {
  const {width,height} = useWindowSize()
  const [currentWord,setCurrentWord] = React.useState(() => getRandomWord())
  const [guessedLetter,setGuessedLetter] = React.useState([])
  const alphabets = "abcdefghijklmnopqrstuvwxyz"
  const lastGuessed = guessedLetter[guessedLetter.length-1]
  const isLastGuessIncorrect = lastGuessed && !currentWord.includes(lastGuessed)
  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split("").every(letter => guessedLetter.includes(letter))
  const isGameLost = wrongGuessCount == languages.length-1 ? true : false
  const isGameOver = isGameWon || isGameLost
  const gameStatusClass = clsx("game-status",{
    won : isGameWon,
    lost : isGameLost,
    farewell : isLastGuessIncorrect && !isGameLost
  })

  
  const alphabetElements = alphabets.split("").map(alpha => {
    const isCorrect = guessedLetter.includes(alpha) && currentWord.includes(alpha)
    const isWrong = guessedLetter.includes(alpha) && !currentWord.includes(alpha)
    const className = clsx({
      correct : isCorrect,
      wrong : isWrong
    })
    return(
      <button 
      className = {className}
      disabled = {isGameOver}
      aria-disabled ={guessedLetter.includes(alpha)}
      aria-label={`letter ${alpha}`}
      onClick={() => addGuessedLetter(alpha)} 
      key={alpha}>
      {alpha.toUpperCase()}
    </button>
    )
    })

  const currentWordElement = currentWord.split("").map((word,index) =>{
    const isRevealLetter = isGameLost || guessedLetter.includes(word)
    const letterClassName = clsx(
      isGameLost && !guessedLetter.includes(word) && "missed-letter"
    )
    return(<span key={index} className={letterClassName}>
      {isRevealLetter ? word.toUpperCase() : ""}
    </span>)
   })

  const languageElements = languages.map((lang,index)=>{
    const isLanguageLost = index < wrongGuessCount
    const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", isLanguageLost && "lost")
    return(
      <span 
        key={lang.name}
        style={styles} 
        className={className}
        >
        {lang.name}
        </span>
      )}
  )

  function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetter([])

  }

  function addGuessedLetter(letter){
    setGuessedLetter(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter,letter]) 
  }

  return(
    <main>
      {isGameWon &&  <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={1000}
    />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
            programming world safe from Assembly!</p>
      </header>
       <section aria-live="polite" role="status" className= {gameStatusClass}>
        {isGameOver ? (
          <>
          <h2>{isGameWon ? "you win! " : "Game over!"}</h2>
        <p>{ isGameWon ? "well done🎉" : "You lose! Better start learning assembly 😭"}</p>
        </>
      ): (isLastGuessIncorrect ?<p>"{getFarewellText(languages[wrongGuessCount-1].name)}"</p> : null)}
      </section> 
      <section className="lang-section">
        {languageElements}
      </section>
      <section className="word">
        {currentWordElement}
      </section>
      <section className="keyboard">
        {alphabetElements}
      </section>
      {isGameOver ? <button className="new-game-btn" onClick={startNewGame}>New game</button> : null}
    </main>
  )
}