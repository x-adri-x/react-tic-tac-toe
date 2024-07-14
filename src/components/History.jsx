import { useRef } from 'react'
import GamePlay from './GamePlay'

export default function History({ setup, history }) {
  console.log('setup history comp', setup)
  const boardSize = parseInt(setup.size.split(' ')[0])
  const tableRef = useRef(null)

  createBoard()
  replay()

  function replay() {
    history.map((move, i) => {
      const row_nr = parseInt(move[0])
      const cell_nr = parseInt(move[1])
      return setTimeout(() => {
        if (tableRef.current) {
          const cell = tableRef.current.childNodes[0].childNodes[row_nr].childNodes[cell_nr]
          cell.innerText = move[3]
        }
      }, 2000 * i)
    })
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
                    <td key={j}></td>
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
        {history && <GamePlay history={history} />}
      </div>
      <div className="name-div player-2">
        <h1 id="player-2">{setup.player2Name}</h1>
      </div>
      <div className="board-container" id="board-container">
        {createBoard()}
      </div>
    </>
  )
}
