import React from 'react'
export default function Toast({message, type='success'}){
  if(!message) return null
  const bg = type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
  return <div className={`fixed bottom-6 right-6 text-white px-4 py-3 rounded-2xl shadow-soft ${bg}`}>{message}</div>
}
