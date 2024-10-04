export default function Button({ title, handleClick, isHistory, className }) {
  return (
    <button
      className={`${className} text-slate-900 border border-4 border-red-500 p-2 font-bold font-mono leading-4 h-fit`}
      disabled={isHistory}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}
