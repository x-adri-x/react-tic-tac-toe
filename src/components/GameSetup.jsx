import { useState } from 'react'

export default function GameSetup({ setSetup }) {
  const [mode, setMode] = useState('Human vs. Human')
  const [streak, setSelectedStreak] = useState(3)
  const [size, setSize] = useState('3 x 3')
  const [winningStreak, setWinningStreak] = useState([3])

  const handleBoardSizeChange = (e) => {
    setSize(e.target.value)
    const boardSize = parseInt(e.target.value.split(' ')[0])
    setWinningStreak(new Array(boardSize - 2).fill().map((_, i) => i + 3))
  }

  function handleInitDialogSubmit() {
    const playerDialog = document.querySelector('#player-dialog')
    const initDialog = document.querySelector('#init-dialog')

    setSetup({
      mode,
      streak,
      size,
    })

    playerDialog.showModal()
    initDialog.close()
  }

  return (
    <>
      <dialog id="init-dialog">
        <form method="dialog" onSubmit={handleInitDialogSubmit}>
          <label htmlFor="game-mode">Game mode</label>
          <select id="game-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Human vs. Human</option>
            <option>Human vs. AI</option>
          </select>
          <label htmlFor="board-size">Board size</label>
          <select id="board-size" value={size} onChange={handleBoardSizeChange}>
            <option>3 x 3</option>
            <option>4 x 4</option>
            <option>5 x 5</option>
            <option>6 x 6</option>
          </select>
          <label htmlFor="winning-streak">Symbols to win</label>
          <select id="winning-streak" value={streak} onChange={(e) => setSelectedStreak(e.target.value)}>
            {winningStreak.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
          <input type="submit" value="Continue" className="submit-button input-button" />
        </form>
      </dialog>
    </>
  )
}
