import { useContext } from 'react'
import { SetupContext } from '../SetupContext'

export default function Board({ board, winningCells, handleClick, isGameOver }) {
  const setup = useContext(SetupContext)
  const boardSize = parseInt(setup.size.split(' ')[0])

  const isWinningCell = (i, j) => {
    for (const cells of winningCells) {
      if (cells[0] === i && cells[1] === j) {
        return true
      }
    }

    return false
  }

  return (
    <table className="table-fixed border-collapse border-hidden w-80 min-h-80 self-end">
      <tbody>
        {Array(boardSize)
          .fill()
          .map((_, i) => (
            <tr data-row-nr={i} key={i}>
              {Array(boardSize)
                .fill()
                .map((_, j) => (
                  <td
                    key={j}
                    className={`border border-slate-500 text-xl ${isWinningCell(i, j) ? 'text-shadow text-transparent' : 'text-slate-900'} ${boardSize === 4 ? 'w-1/4 h-1/4' : boardSize === 5 ? 'w-1/5 h-1/5' : boardSize === 6 ? 'w-1/6 h-1/6' : 'w-1/3 h-1/3'}`}
                    onClick={(e) => !isGameOver && handleClick(e)}
                  >
                    {board[`${i}:${j}`]}
                  </td>
                ))}
            </tr>
          ))}
      </tbody>
    </table>
  )
}
