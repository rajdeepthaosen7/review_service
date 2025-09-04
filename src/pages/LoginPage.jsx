import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Toast from '../components/Toast'

export default function LoginPage(){
  const { loginWithEmail } = useAuth()
  const [email, setEmail] = useState('')
  const [toast, setToast] = useState(null)
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      await loginWithEmail(email)
      nav('/', { replace: true })
    }catch(err){
      setToast(err.message || 'Login failed')
      setTimeout(()=>setToast(null), 2000)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold">Login to Shiwani E-mart</h2>
        <p className="text-slate-600 text-sm mt-1">Enter your registered email</p>
        <form className="space-y-3 mt-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={email} onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <button className="btn w-full" type="submit">Login</button>
        </form>
        <p className="text-sm text-slate-600 mt-3">No account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </div>
      <Toast message={toast} type="error" />
    </div>
  )
}
