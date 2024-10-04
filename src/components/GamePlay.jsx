export default function GamePlay({ history }) {
  return (
    <div className="flex flex-wrap mt-5 min-h-12">
      {history.map((move) => (
        <p key={move[0] + move[1]} className="mr-4 text-slate-900 font-mono">
          <strong>{move[3]}: </strong>
          {move[0]}:{move[1]}
        </p>
      ))}
    </div>
  )
}
