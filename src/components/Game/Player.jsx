export default function Player({ playerName, isHighlighted }) {
  return (
    <h1
      className={`${isHighlighted ? `text-red-500` : `text-slate-900`} font-mono ml-4 font-bold text-2xl md:text-5xl lg:text-5xl`}
    >
      {playerName}
    </h1>
  )
}
