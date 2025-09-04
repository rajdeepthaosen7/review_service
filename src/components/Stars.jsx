import React from 'react'
export default function Stars({ value = 0, size='w-5 h-5' }){
  const arr = [1,2,3,4,5]
  return (
    <div className="flex gap-1">
      {arr.map(n => (
        <svg key={n} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={n<=value ? 'currentColor' : 'none'} stroke="currentColor" className={`${size} ${n<=value ? 'text-amber-500' : 'text-slate-300'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.48 3.499a.562.562 0 011.04 0l2.06 4.173a.563.563 0 00.424.308l4.6.668c.513.075.718.705.346 1.065l-3.327 3.244a.563.563 0 00-.162.498l.785 4.58a.563.563 0 01-.816.593l-4.115-2.163a.563.563 0 00-.524 0L7.615 18.63a.563.563 0 01-.816-.593l.785-4.58a.563.563 0 00-.162-.498L4.095 9.713a.563.563 0 01.346-1.065l4.6-.668a.563.563 0 00.424-.308l2.06-4.173z" />
        </svg>
      ))}
    </div>
  )
}
