export default function Dialog({ id, reference, children }) {
  return (
    <dialog
      id={id}
      ref={reference}
      className="text-slate-900 bg-white p-8 w-80 md:w-96 lg:w-96 md:h-1/2 lg:h-1/2 h-fit rounded-lg shadow font-mono"
    >
      {children}
    </dialog>
  )
}
