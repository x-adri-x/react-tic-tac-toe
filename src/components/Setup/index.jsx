import { useState, useRef } from 'react'
import Select from './Select'
import Dialog from '../Dialog'
import Button from './Button'

const SYMBOLS = ['X', 'O', '👻', '💀', '🐧', '🐼']
const BOARD_SIZES = ['3', '4', '5', '6']
const GAME_MODES = ['Human vs. Human', 'Human vs. AI']

export default function Setup({ setSetup, heading, setHeading, setShowBoard }) {
  const [mode, setMode] = useState(GAME_MODES[0])
  const [streak, setSelectedStreak] = useState(3)
  const [size, setSize] = useState(`${BOARD_SIZES[0]} x ${BOARD_SIZES[0]}`)
  const [symbols, setSymbols] = useState(SYMBOLS)
  const [symbol, setSymbol] = useState(symbols[0])
  const [winningStreak, setWinningStreak] = useState([3])
  const [name, setName] = useState('')
  const [hidden, setHidden] = useState(false)
  const gameDialogRef = useRef(null)
  const playerDialogRef = useRef(null)

  const handleGameStartClick = () => {
    gameDialogRef.current.showModal()
    setHidden(true)
  }

  const handleBoardSizeChange = (e) => {
    setSize(e.target.value)
    const boardSize = parseInt(e.target.value.split(' ')[0])
    setWinningStreak(new Array(boardSize - 2).fill().map((_, i) => i + 3))
  }

  function handleInitDialogSubmit() {
    setSetup({
      mode,
      streak,
      size,
    })

    playerDialogRef.current.showModal()
    gameDialogRef.current.close()
  }

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
      const filteredSymbols = SYMBOLS.filter((s) => s !== symbol)
      setSymbols(filteredSymbols)
      setSymbol(filteredSymbols[0])
    }

    if (heading === 'Player Two') {
      setSetup((prevSetup) => ({
        ...prevSetup,
        player2Name: name,
        player2Symbol: symbol,
      }))
      playerDialogRef.current.close()
      setShowBoard(true)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (heading === 'Player One') {
      gameDialogRef.current.showModal()
      playerDialogRef.current.close()
    }
    if (heading === 'Player Two') {
      setHeading('Player One')
      setSymbols(SYMBOLS)
      setSymbol('X')
      setName('')
    }
  }

  return (
    <>
      <div className={hidden ? 'hidden' : 'grid p-12 md:shadow-xl lg:shadow-xl md:w-96 lg:w-96 md:h-1/2 lg:h-1/2'}>
        <h1 className="flex justify-self-center text-center text-3xl self-end text-slate-900 md:text-4xl lg:text-4xl">
          Welcome
          <br />
          to
          <br />
          Tic Tac Toe!
        </h1>
        <h2 className="flex justify-self-center text-center text-sm tracking-wide text-slate-900 mt-3 font-mono">
          A GAME OF FUN AND LOGIC
        </h2>
        <div className="mt-14">
          <button
            type="button"
            className="text-slate-900 text-3xl border-solid border-red-500 border-4 rounded p-5 font-bold font-mono"
            onClick={handleGameStartClick}
          >
            Let&apos;s Play!
          </button>
        </div>
      </div>
      <Dialog id="init-dialog" reference={gameDialogRef}>
        <form method="dialog" className="flex flex-col justify-center gap-4" onSubmit={handleInitDialogSubmit}>
          <Select id="game-mode" value={mode} handleClick={(e) => setMode(e.target.value)} label="Game mode">
            {GAME_MODES.map((mode, i) => (
              <option key={i}>{mode}</option>
            ))}
          </Select>
          <Select id="board-size" value={size} handleClick={handleBoardSizeChange} label="Board size">
            {BOARD_SIZES.map((size) => (
              <option key={size}>
                {size} x {size}
              </option>
            ))}
          </Select>
          <Select
            id="winning-streak"
            value={streak}
            handleClick={(e) => setSelectedStreak(e.target.value)}
            label="Symbols to win"
          >
            {winningStreak.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </Select>
          <Button type="submit" title="Continue" />
        </form>
      </Dialog>
      <Dialog id="player-dialog" reference={playerDialogRef}>
        <h1 className="text-3xl mb-2.5">{heading}</h1>
        <form method="dialog" className="flex flex-col justify-center gap-4" onSubmit={handleSubmit}>
          <label className="text-red-600" htmlFor="playerName">
            Name
          </label>
          <input
            className="bg-slate-200 text-slate-700 h-9 px-1.5 py-2.5 text-xs focus:outline-red-500"
            id="playerName"
            type="text"
            placeholder="Name"
            value={name}
            required
            name="playerName"
            maxLength={10}
            onChange={(e) => setName(e.target.value)}
          />
          <Select id="playerSymbol" value={symbol} handleClick={(e) => setSymbol(e.target.value)} label="Symbol to use">
            {symbols.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </Select>
          <div className="flex justify-between">
            <Button title="Back" handleClick={handleClick} />
            <Button type="submit" title="Continue" />
          </div>
        </form>
      </Dialog>
    </>
  )
}
