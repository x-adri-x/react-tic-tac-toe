import { useState, useContext, useMemo } from 'react'
import GamePlay from '../GamePlay'
import Board from '../Board'
import { SetupContext } from '../../SetupContext'
import Button from './Button'
import Player from './Player'

export default function Game() {
  const setup = useContext(SetupContext)
  const [outcome, setOutcome] = useState('')
  const [activePlayer, setActivePlayer] = useState('player1')
  const [isGameOver, setIsGameOver] = useState(false)
  const [board, setBoard] = useState({})
  const [history, setHistory] = useState([])
  const [winningCells, setWinningCells] = useState([])
  const boardSize = useMemo(() => parseInt(setup.size.split(' ')[0]), [setup.size])
  const isHistory = useMemo(() => history.length === 0, [history])

  const handleReplayClick = () => {
    setBoard({})
    history.map((move, i) => {
      const row_nr = parseInt(move[0])
      const cell_nr = parseInt(move[1])
      return setTimeout(() => {
        setBoard((prevBoard) => {
          return { ...prevBoard, [`${row_nr}:${cell_nr}`]: move[3] }
        })
      }, 2000 * i)
    })
  }

  const handleClick = (event) => {
    const symbol = activePlayer === 'player1' ? setup.player1Symbol : setup.player2Symbol
    // Grab exact position of target element
    const row_nr = event.target.parentNode.dataset.rowNr
    const cell_nr = event.target.cellIndex
    // Save position to board object
    const key = `${row_nr}:${cell_nr}`
    if (!(key in board)) {
      setBoard((prevBoard) => ({
        ...prevBoard,
        [`${row_nr}:${cell_nr}`]: symbol,
      }))
      const lastMove = [...history, [row_nr, cell_nr, activePlayer, symbol]]
      setHistory(lastMove)

      if (!checkGameOver(boardSize, [row_nr, cell_nr], symbol)) {
        changePlayer()
      } else {
        setIsGameOver(true)
      }
    }
  }

  const checkGameOver = (boardSize, cell, symbol) => {
    let [row_nr, cell_nr] = cell
    row_nr = parseInt(row_nr)
    cell_nr = parseInt(cell_nr)
    // check vertically
    // look up
    let counter = 1
    let winningStreakCells = [[row_nr, cell_nr]]
    let i = row_nr - 1
    while (i >= 0 && board[`${i}:${cell_nr}`] === symbol) {
      winningStreakCells.push([i, cell_nr])
      counter += 1
      i -= 1
    }

    // look down
    i = row_nr + 1
    while (i < boardSize && board[`${i}:${cell_nr}`] === symbol) {
      winningStreakCells.push([i, cell_nr])
      counter += 1
      i += 1
    }
    if (counter === parseInt(setup.streak)) {
      updateWinner(activePlayer)
      highlightCells(winningStreakCells)
      return true
    } else {
      winningStreakCells = [[row_nr, cell_nr]]
      counter = 1
    }

    // check horizontally
    // look left
    i = cell_nr - 1
    while (i >= 0 && board[`${row_nr}:${i}`] === symbol) {
      winningStreakCells.push([row_nr, i])
      counter += 1
      i -= 1
    }

    // look right
    i = cell_nr + 1
    while (i < boardSize && board[`${row_nr}:${i}`] === symbol) {
      winningStreakCells.push([row_nr, i])
      counter += 1
      i += 1
    }
    if (counter === parseInt(setup.streak)) {
      updateWinner(activePlayer)
      highlightCells(winningStreakCells)
      return true
    } else {
      winningStreakCells = [[row_nr, cell_nr]]
      counter = 1
    }

    // check diagonally
    // check top left
    i = row_nr - 1
    let j = cell_nr - 1
    while (i >= 0 && board[`${i}:${j}`] === symbol) {
      winningStreakCells.push([i, j])
      counter += 1
      i -= 1
      j -= 1
    }

    // check bottom right
    i = row_nr + 1
    j = cell_nr + 1
    while (i < boardSize && board[`${i}:${j}`] === symbol) {
      winningStreakCells.push([i, j])
      counter += 1
      i += 1
      j += 1
    }
    if (counter === parseInt(setup.streak)) {
      updateWinner(activePlayer)
      highlightCells(winningStreakCells)
      return true
    } else {
      winningStreakCells = [[row_nr, cell_nr]]
      counter = 1
    }

    // check top right
    i = row_nr - 1
    j = cell_nr + 1
    while (i >= 0 && board[`${i}:${j}`] === symbol) {
      winningStreakCells.push([i, j])
      counter += 1
      i -= 1
      j += 1
    }

    // check bottom left
    i = row_nr + 1
    j = cell_nr - 1
    while (i < boardSize && board[`${i}:${j}`] === symbol) {
      winningStreakCells.push([i, j])
      counter += 1
      i += 1
      j -= 1
    }
    if (counter === parseInt(setup.streak)) {
      updateWinner(activePlayer)
      highlightCells(winningStreakCells)
      return true
    } else {
      winningStreakCells = [[row_nr, cell_nr]]
      counter = 1
    }

    if (Object.keys(board).length + 1 === boardSize * boardSize) {
      updateWinner('draw')
      return true
    }
    return false
  }

  const updateWinner = (winner) => {
    if (winner === 'draw') {
      setOutcome(`Draw! Wanna try again?`)
    } else if (winner === 'player1') {
      setOutcome(`${setup.player1Name} has won!`)
    } else {
      setOutcome(`${setup.player2Name} has won!`)
    }
  }

  const highlightCells = (cells) => {
    setWinningCells(cells)
  }

  const changePlayer = () => {
    activePlayer === 'player1' ? setActivePlayer('player2') : setActivePlayer('player1')
  }

  const handleResetClick = () => {
    setBoard({})
    setHistory([])
    setIsGameOver(false)
    setWinningCells([])
    setOutcome('')
  }

  const handleNewGameClick = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col justify-center p-12 md:shadow-xl lg:shadow-xl md:w-[680px] lg:w-[680px] w-[420px]">
      <header className="flex justify-between">
        <Button title="Reset game" handleClick={handleResetClick} className="mr-2" />
        <Button title="Replay game" handleClick={handleReplayClick} isHistory={isHistory} className="mr-2" />
        <Button title="New game" handleClick={handleNewGameClick} />
      </header>
      <div className="mt-auto">
        <div className="flex justify-between mt-7 mb-8">
          <Player playerName={setup.player1Name} isHighlighted={activePlayer === 'player1'} />
          <Player playerName={setup.player2Name} isHighlighted={activePlayer === 'player2'} />
        </div>

        <div className="grid justify-center items-center">
          <Board board={board} winningCells={winningCells} handleClick={handleClick} isGameOver={isGameOver} />
        </div>
      </div>
      {history && <GamePlay history={history} />}
      {outcome && <p className="text-slate-900 font-mono text-xl min-h-6 mt-8">{outcome}</p>}
    </div>
  )
}
