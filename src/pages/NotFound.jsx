import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="text-center py-20">
      <h2 className="text-3xl font-bold">404</h2>
      <p className="text-slate-600 mt-1">Page not found</p>
      <Link to="/" className="btn mt-4 inline-block">Back to Products</Link>
    </div>
  )
}
