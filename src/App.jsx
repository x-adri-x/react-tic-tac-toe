import './App.css'
import Welcome from '@/components/Welcome'
import Game from '@/components/Game'
import GameSetup from '@/components/GameSetup'
import PlayerSetup from '@/components/PlayerSetup'
import { SetupContext } from '@/SetupContext'
import { useState } from 'react'

function App() {
  const [setup, setSetup] = useState({})
  const [heading, setHeading] = useState('Player One')
  const [showBoard, setShowBoard] = useState(false)

  return (
    <>
      <SetupContext.Provider value={setup}>
        <section className="landing-page-container">
          {!showBoard && <Welcome />}
          <GameSetup setSetup={setSetup} />
          <PlayerSetup heading={heading} setHeading={setHeading} setSetup={setSetup} setShowBoard={setShowBoard} />
          {showBoard && <Game />}
        </section>
      </SetupContext.Provider>
    </>
  )
}

export default App
