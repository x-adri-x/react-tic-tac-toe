import { useState } from 'react'

export default function PlayerSetup({ heading, setSetup, setHeading, setShowBoard }) {
  const [name, setName] = useState('')
  const [symbols, setSymbols] = useState(['X', 'O', '👻', '💀', '🐧', '🐼'])
  const [symbol, setSymbol] = useState(symbols[0])
  const dialog = document.querySelector('#player-dialog')
  const initDialog = document.querySelector('#init-dialog')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (heading === 'Player One') {
      setSetup((prevSetup) => ({
        ...prevSetup,
        player1Name: name,
        player1Symbol: symbol,
      }))
      setHeading('Player Two')
      setName('')
      const filteredSymbols = ['X', 'O', '👻', '💀', '🐧', '🐼'].filter((s) => s !== symbol)
      setSymbols(filteredSymbols)
      setSymbol(filteredSymbols[0])
    }

    if (heading === 'Player Two') {
      setSetup((prevSetup) => ({
        ...prevSetup,
        player2Name: name,
        player2Symbol: symbol,
      }))
      dialog.close()
      setShowBoard(true)
    }
  }

  const handleClick = () => {
    if (heading === 'Player One') {
      dialog.close()
      initDialog.showModal()
    }
    if (heading === 'Player Two') {
      setHeading('Player One')
      setSymbols(['X', 'O', '👻', '💀', '🐧', '🐼'])
      setSymbol('X')
      setName('')
    }
  }

  return (
    <>
      <dialog id="player-dialog">
        <h1>{heading}</h1>
        <form method="dialog" onSubmit={handleSubmit}>
          <label htmlFor="playerName">Name</label>
          <input
            id="playerName"
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="playerSymbol">Symbol to use</label>
          <select id="playerSymbol" value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            {symbols.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <div className="input-dialog-buttons-container">
            <input type="button" value="Back" className="back-button input-button" onClick={handleClick} />
            <input type="submit" value="Continue" className="submit-button input-button" />
          </div>
        </form>
      </dialog>
    </>
  )
}
