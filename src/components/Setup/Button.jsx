export default function Button({ title, handleClick, type }) {
  return (
    <button
      type={type}
      className="mt-4 font-bold font-mono border-solid border-red-500 border-4 p-2 leading-5"
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
