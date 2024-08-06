import { useState, useRef, useContext } from 'react'
import GamePlay from './GamePlay'
import { SetupContext } from '../SetupContext'

export default function Board({ setHistory }) {
  const setup = useContext(SetupContext)
  const [outcome, setOutcome] = useState('')
  const [activePlayer, setActivePlayer] = useState('player1')
  const [isGameOver, setIsGameOver] = useState(false)
  const [board, setBoard] = useState({})
  const [gamePlay, setGamePlay] = useState([])
  const boardSize = parseInt(setup.size.split(' ')[0])
  const tableRef = useRef(null)

  function handleClick(event) {
    const symbol = activePlayer === 'player1' ? setup.player1Symbol : setup.player2Symbol
    // Grab exact position of target element
    const row_nr = event.target.parentNode.dataset.rowNr
    const cell_nr = event.target.cellIndex
    // Save position to board object
    const key = `${row_nr}:${cell_nr}`
    if (!(key in board)) {
      event.target.innerText = symbol
      setBoard((prevBoard) => ({
        ...prevBoard,
        [`${row_nr}:${cell_nr}`]: symbol,
      }))
      setGamePlay((prevMove) => [...prevMove, [row_nr, cell_nr, activePlayer, symbol]])
      if (!checkGameOver(boardSize, [row_nr, cell_nr], symbol)) {
        changePlayer()
      } else {
        setIsGameOver(true)
      }
    }
  }

  function checkGameOver(boardSize, cell, symbol) {
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
    if (Object.keys(board).length === boardSize * boardSize) {
      updateWinner('draw')
      return true
    }
    return false
  }

  function updateWinner(winner) {
    if (winner === 'draw') {
      setOutcome(`Draw! Wanna try again?`)
    } else if (winner === 'player1') {
      setOutcome(`${setup.player1Name} has won!`)
    } else {
      setOutcome(`${setup.player2Name} has won!`)
    }
    setHistory(gamePlay)
  }

  function highlightCells(cells) {
    const table = document.querySelector('table')
    for (const cell of cells) {
      const [row, col] = cell
      table.childNodes[0].childNodes[row].childNodes[col].classList.add('highlight')
    }
  }

  function changePlayer() {
    activePlayer === 'player1' ? setActivePlayer('player2') : setActivePlayer('player1')
    highlightPlayer()
  }

  function highlightPlayer() {
    const player1 = document.querySelector('#player-1')
    const player2 = document.querySelector('#player-2')

    if (activePlayer === 'player1') {
      player1.classList.add('highlight')
      player2.classList.remove('highlight')
    } else {
      player2.classList.add('highlight')
      player1.classList.remove('highlight')
    }
  }

  function createBoard() {
    return (
      <table ref={tableRef} className={`board-${boardSize}`}>
        <tbody>
          {Array(boardSize)
            .fill()
            .map((_, i) => (
              <tr data-row-nr={i} key={i}>
                {Array(boardSize)
                  .fill()
                  .map((_, j) => (
                    <td key={j} onClick={(e) => !isGameOver && handleClick(e)}></td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    )
  }

  return (
    <>
      <div className="name-div player-1">
        <h1 id="player-1">{setup.player1Name}</h1>
      </div>
      <div className="name-div player-2">
        <h1 id="player-2">{setup.player2Name}</h1>
      </div>
      <div className="board-container" id="board-container">
        {createBoard()}
      </div>
      {gamePlay.length > 0 && <GamePlay gamePlay={gamePlay} />}
      {outcome && <p>{outcome}</p>}
    </>
  )
}
