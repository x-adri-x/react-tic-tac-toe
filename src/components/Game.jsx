import { useState } from 'react'
import Board from '@/components/Board'
import History from './History'

export default function Game({ setup }) {
  const [gameKey, setGameKey] = useState(0)
  const [history, setHistory] = useState([])
  const [isReplay, setIsReplay] = useState(false)

  console.log('setup', setup)

  const handleReplay = () => {
    setIsReplay(true)
    setGameKey((prevKey) => prevKey + 1)
  }

  return (
    <div className="main-game-container">
      <header>
        <button type="button" className="header-btn" onClick={() => setGameKey((prevKey) => prevKey + 1)}>
          Reset game
        </button>
        <button type="button" className="header-btn" disabled={history.length === 0} onClick={handleReplay}>
          Replay game
        </button>
      </header>
      {isReplay ? (
        <History history={history} setup={setup} />
      ) : (
        <Board key={gameKey} setup={setup} setHistory={setHistory} />
      )}
    </div>
  )
}
