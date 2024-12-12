import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Fim de jogo</h1>
        <h2>Muito bem, você fez {score} pontos</h2>
        <button onClick={retry}>Tentar de novo</button>
    </div>
  )
}

export default GameOver