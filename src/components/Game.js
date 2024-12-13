import { useState, useRef } from "react";
import "./Game.css";
import Roleta from "./Roleta";

const Game = ({
  verifyLetters,
  chosenWord,
  chosenCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
  setScore,
  setGameStage,
  stage,
  isLastAttemptCorrect,
}) => {
  const [letter, setLetter] = useState("");
  const [roletaValue, setRoletaValue] = useState(0); // Valor da roleta
  const [isRoletaSpun, setIsRoletaSpun] = useState(false); // Controle se a roleta foi rodada
  const letterInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isRoletaSpun){
        alert("você deve girar a roleta antes");
        return;
    }
    if (letter) {
      verifyLetters(letter);
      if (letters.includes(letter.toLowerCase())) {
        setScore((prevScore) => prevScore + roletaValue);
      }
      setLetter("");
      letterInputRef.current.focus();
      setIsRoletaSpun(false); // Reseta o estado da roleta para obrigar o jogador a rodá-la novamente
    }
  };

  const handleRoletaStop = (segmento) => {
    console.log("Segmento selecionado:", segmento);

    if (segmento === "PERDE TUDO") {
      setGameStage(stage[2].name);
    } else if (segmento !== "$0") {
      const valor = parseInt(segmento.replace("$", ""), 10);
      setRoletaValue(valor);
      setIsRoletaSpun(true); // Habilita o botão após rodar a roleta
    } else {
      setRoletaValue(0);
      setIsRoletaSpun(true); // Permite tentativa mesmo com $0
    }
  };

  return (
    <div className="game">
       <h1>Gire a roda</h1>
      <div className="roleta-wrapper">
       
        <Roleta onStop={handleRoletaStop} />
      </div>

      <div className="containerWord">
        {letters.map((char, i) =>
          guessedLetters.includes(char) ? (
            <span key={i} className="letter">
              {char}
            </span>
          ) : (
            <span key={i} className="border"></span>
          )
        )}
      </div>
      <div className="container">
        <p>Tente adivinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="letter"
            maxLength="1"
            required
            onChange={(e) => {
              const input = e.target.value;
              if (/^[a-zA-Z]$/.test(input)) {
                setLetter(input);
              } else {
                setLetter("");
              }
            }}
            value={letter}
            ref={letterInputRef}
          />
          <button type="submit" >
            Adivinhar
          </button>
        </form>
      </div>
      <div className="containerWrong">
        <p>
          {wrongLetters.map((char, i) => (
            <span key={i}>
              {char}
              {i < wrongLetters.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <h3>
          <span>{chosenCategory}</span>
        </h3>
      </div>
      <div>
      <h2 className="points">
        Pontuação: <span>{score}</span>
      </h2>
      <p>Você tem {guesses} tentativas restantes</p>
      </div>
    </div>
  );
};

export default Game;
