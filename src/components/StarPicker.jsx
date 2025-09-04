import React, { useState } from 'react'
export default function StarPicker({ value=5, onChange }){
  const [hover, setHover] = useState(0)
  const arr = [1,2,3,4,5]
  const effective = hover || value
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Rating">
      {arr.map(n => (
        <button
          key={n}
          type="button"
          aria-checked={value===n}
          role="radio"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="p-1"
          title={`${n} star${n>1?'s':''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill={n<=effective ? 'currentColor' : 'none'} stroke="currentColor"
            className={`w-6 h-6 ${n<=effective ? 'text-amber-500' : 'text-slate-300'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
              d="M11.48 3.499a.562.562 0 011.04 0l2.06 4.173a.563.563 0 00.424.308l4.6.668c.513.075.718.705.346 1.065l-3.327 3.244a.563.563 0 00-.162.498l.785 4.58a.563.563 0 01-.816.593l-4.115-2.163a.563.563 0 00-.524 0L7.615 18.63a.563.563 0 01-.816-.593l.785-4.58a.563.563 0 00-.162-.498L4.095 9.713a.563.563 0 01.346-1.065l4.6-.668a.563.563 0 00.424-.308l2.06-4.173z" />
          </svg>
        </button>
      ))}
    </div>
  )
}
