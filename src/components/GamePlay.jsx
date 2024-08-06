export default function GamePlay({ gamePlay }) {
  return (
    <div className="game-play-container">
      <h2>Gameplay: </h2>
      {gamePlay.map((move) => (
        <p key={move[0] + move[1]}>
          <strong>{move[2]}: </strong>
          {move[0]}:{move[1]}
        </p>
      ))}
    </div>
  )
}
