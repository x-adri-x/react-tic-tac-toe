export default function Welcome() {
  const handleClick = () => {
    const dialog = document.querySelector('#init-dialog')
    dialog.showModal()
  }
  return (
    <div className="welcome-container">
      <h1>
        Welcome
        <br />
        to
        <br />
        Tic Tac Toe!
      </h1>
      <h2>A GAME OF FUN AND LOGIC</h2>
      <div className="button-container">
        <button type="button" className="playmode" onClick={handleClick}>
          Let&apos;s Play!
        </button>
      </div>
    </div>
  )
}
