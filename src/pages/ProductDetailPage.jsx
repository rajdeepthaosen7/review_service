import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProduct, listReviewsByProduct, createReview } from '../services/api'
import Stars from '../components/Stars'
import StarPicker from '../components/StarPicker'
import Toast from '../components/Toast'
import { useAuth } from '../context/AuthContext.jsx'

const imgFallback = (name) => `https://source.unsplash.com/800x500/?product,${encodeURIComponent(name)}`

export default function ProductDetailPage(){
  const { id } = useParams()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)
  const [toast, setToast] = useState(null)

  const load = async () => {
    const [{ data: p }, { data: r }] = await Promise.all([ getProduct(id), listReviewsByProduct(id) ])
    setProduct(p); setReviews(r || [])
  }

  useEffect(() => { load() }, [id])

  const avg = useMemo(() => {
    if(!reviews.length) return 0
    return Math.round((reviews.reduce((a,b)=>a+(b.rating||0),0)/reviews.length)*10)/10
  }, [reviews])

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const payload = { username: user.name, comment, rating }
      const optimistic = { id: `tmp-${Date.now()}`, username: user.name, comment, rating }
      setReviews(prev => [optimistic, ...prev]) // immediate update
      setComment(''); setRating(5); setToast('Review posted'); setTimeout(()=>setToast(null), 1500)
      await createReview(id, user.id, payload)
      const { data } = await listReviewsByProduct(id) // sync
      setReviews(data || [])
    }catch(err){
      console.error(err)
      setToast('Failed to post review')
    }
  }

  if(!product) return <p>Loading...</p>

  const displayImage = product.imageUrl && product.imageUrl.trim() !== '' ? product.imageUrl : imgFallback(product.name)

  return (
    <div>
      <Link to="/" className="text-sm text-indigo-600">&larr; Back to products</Link>

      {/* Single product view WITHOUT boxes */}
      <div className="mt-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl overflow-hidden">
            <img src={displayImage} alt={product.name} className="w-full h-auto object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <Stars value={Math.round(avg)} />
              <span className="text-sm text-slate-600">{avg || 0}/5 • {reviews.length} review{reviews.length!==1?'s':''}</span>
            </div>
            <p className="text-slate-700 mt-4">{product.description}</p>
            <div className="mt-4 text-2xl font-bold">₹{product.price}</div>
            <div className="mt-1 text-sm text-slate-500">Category: {product.category || 'General'}</div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="mt-3 space-y-4">
            {reviews.map(rv => (
              <div key={rv.id}>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{rv.username || 'Anonymous'}</div>
                  <Stars value={rv.rating} />
                </div>
                <p className="text-slate-700 mt-1">{rv.comment}</p>
                <hr className="border-slate-200 my-3" />
              </div>
            ))}
            {!reviews.length && <p className="text-slate-500">No reviews yet.</p>}
          </div>
        </section>

        {/* Add review (no box) */}
        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Add your review</h3>
          <form className="space-y-3" onSubmit={onSubmit}>
            <div>
              <div className="label">Your rating</div>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <div>
              <label className="label">Comment</label>
              <textarea className="input h-24" value={comment} onChange={e=>setComment(e.target.value)} required />
            </div>
            <button className="btn" type="submit">Submit review</button>
          </form>
        </section>
      </div>
      <Toast message={toast} />
    </div>
  )
}
