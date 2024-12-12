import "./App.css";

import StartScreen from "./components/startScreen";
import { useCallback, useEffect, useState } from "react";

import { palavras } from "./data/words";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stage = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stage[0].name);
  const [wordList] = useState(palavras);

  const [chosenWord, setChosenWord] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  
  const [isLastAttemptCorrect, setIsLastAttemptCorrect] = useState(false);


  const choseWordAndCategory = useCallback(() => {
    const categories = Object.keys(wordList);
    const category =
      categories[Math.floor(Math.random() * categories.length)];

    const word =
      wordList[category][Math.floor(Math.random() * wordList[category].length)];

    return { word, category };
  }, [wordList]);

  const startStage = useCallback(() => {
    console.log("Iniciando o jogo...");
    const { word, category } = choseWordAndCategory();
  
    const wordLetters = word.split("");
  
    setChosenWord(word);
    setChosenCategory(category);
    setLetters(wordLetters);
  
    setGuessedLetters([]);
    setWrongLetters([]);
    setGuesses(3);
  
    setGameStage(stage[1].name);
  }, [choseWordAndCategory]);

  const verifyLetters = (inputLetter) => {
    const normalizedLetter = inputLetter.toLowerCase();
  
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }
  
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        normalizedLetter,
      ]);
      setIsLastAttemptCorrect(true); // Marca como correta
    } else {
      setWrongLetters((prevWrongLetters) => [
        ...prevWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((prevGuesses) => prevGuesses - 1);
      setIsLastAttemptCorrect(false); // Marca como incorreta
    }
  };

  const clearLettersStates = () => {
    setGuessedLetters ([]);
    setWrongLetters([]);
  }
  useEffect(() => {
    console.log("Estado inicial do jogo:", gameStage); // Deve mostrar "start"
  }, []);
  //monitorando as chances
  useEffect(() => {
    if(guesses <= 0){
      clearLettersStates ()
      setGameStage(stage[2].name)
    }
  }, [guesses])

  useEffect(() => {

    const uniqueLetters =[... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length)
    {
      setScore ((acturalScore) => acturalScore += 100);
      startStage();

    }

  }, [guessedLetters])


  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stage[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startStage={startStage} />}
      {gameStage === "game" && (
        <Game
          verifyLetters={verifyLetters}
          chosenWord={chosenWord}
          chosenCategory={chosenCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          setScore={setScore} // Adicione isso
          setGameStage={setGameStage} // Passe setGameStage também para controlar o estado do jogo
          isLastAttemptCorrect={isLastAttemptCorrect} // Passe como prop
          stage={stage}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
