import React from 'react'
import { Link } from 'react-router-dom'
import Stars from './Stars'

const imgFallback = (name) => `https://source.unsplash.com/600x400/?product,${encodeURIComponent(name)}`

export default function ProductCard({ product }){
  const displayImage = product.imageUrl && product.imageUrl.trim() !== '' ? product.imageUrl : imgFallback(product.name)
  return (
    <Link to={`/products/${product.id}`} className="card hover:translate-y-[-2px] transition block">
      <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden">
        <img src={displayImage} alt={product.name} className="w-full h-full object-cover" loading="lazy"/>
      </div>
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <p className="text-slate-600 line-clamp-2 text-sm">{product.description}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold">₹{product.price}</span>
        <span className="text-xs text-slate-500">{product.category || 'General'}</span>
      </div>
    </Link>
  )
}
