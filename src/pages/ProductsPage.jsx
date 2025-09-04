import React, { useEffect, useState } from 'react'
import { listProducts } from '../services/api'
import ProductCard from '../components/ProductCard'

export default function ProductsPage(){
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try{
      const { data } = await listProducts()
      setProducts(Array.isArray(data) ? data : [])
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchProducts() }, [])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => (<ProductCard key={p.id} product={p} />))}
          {products.length === 0 && <p className="text-slate-500">No products available.</p>}
        </div>
      )}
    </div>
  )
}
