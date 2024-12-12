import './startScreen.css'

const StartScreen = ({startStage}) => {
  return (
    <div>
        <h1>Roda a roda</h1>
        <p>Adivinhe a palavra</p>
        <button onClick={startStage}>Começar</button>
    </div>
  )
}

export default StartScreen