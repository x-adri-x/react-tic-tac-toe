export default function Select({ id, value, handleClick, label, children }) {
  return (
    <>
      <label className="text-red-600 font-bold" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="bg-slate-200 text-slate-700 h-9 px-1.5 py-2.5 text-xs focus:outline-red-500"
        value={value}
        onChange={handleClick}
      >
        {children}
      </select>
    </>
  )
}
