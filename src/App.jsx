import Game from '@/components/Game/'
import Setup from '@/components/Setup/'
import { SetupContext } from '@/SetupContext'
import { useState } from 'react'

function App() {
  const [setup, setSetup] = useState({})
  const [heading, setHeading] = useState('Player One')
  const [showBoard, setShowBoard] = useState(false)

  return (
    <>
      <section className="flex min-h-full justify-center items-center h-screen md:flex-col lg:flex-col p-5 mx-auto">
        <SetupContext.Provider value={setup}>
          <Setup heading={heading} setHeading={setHeading} setSetup={setSetup} setShowBoard={setShowBoard} />
          {showBoard && <Game />}
        </SetupContext.Provider>
      </section>
    </>
  )
}

export default App
