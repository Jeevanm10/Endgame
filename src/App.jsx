import {languages} from "./language";
import React from "react";
import clsx from "clsx";

export default function AssemblyEndgame() {
  const [currentWord,setCurrentWord] = React.useState("react")
  const alphabets = "abcdefghijklmnopqrstuvwxyz"
  const [guessedLetter,setGuessedLetter] = React.useState([])

  const alphabetElements = alphabets.split("").map(alpha => {
    const isGuessed = guessedLetter.includes(alpha)
    const isCorrect = isGuessed && currentWord.includes(alpha)
    const isWrong = !isGuessed && !currentWord.includes(alpha)
    const className = clsx({
      correct : isCorrect,
      wrong : isWrong
    })
    console.log(className)
    return(
      <button 
      className = {className}
      onClick={() => addGuessedLetter(alpha.toUpperCase())} 
      key={alpha}>
      {alpha.toUpperCase()}
    </button>
    )
    })

  const currentWordElement = currentWord.split("").map((word,index) =>
    <span key={index}>{word.toUpperCase()}</span>
   )

  const languageElements = languages.map(lang=>
    <span 
    key={lang.name}
      style={{color : lang.color,backgroundColor : lang.backgroundColor}} 
      className="chip">
        {lang.name}
        </span>
  )

  function addGuessedLetter(letter) {
    setGuessedLetter(prevLetter => prevLetter.includes(letter) ? prevLetter : [...prevLetter,letter]) 
  }

  return(
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word within 8 attempts to keep the 
            programming world safe from Assembly!</p>
      </header>
      <section className="game-status">
        <h2>you win!</h2>
        <p>well done</p>
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
      <button className="new-game-btn">New game</button>
    </main>
  )
}