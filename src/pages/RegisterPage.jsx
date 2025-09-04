import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RegisterPage(){
  const { register } = useAuth()
  const [form, setForm] = useState({name:'', email:'', address:''})
  const nav = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    await register(form)
    nav('/', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold">Create your Shiwani E-mart account</h2>
        <form className="space-y-3 mt-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Name</label>
            <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
          </div>
          <button className="btn w-full" type="submit">Register</button>
        </form>
        <p className="text-sm text-slate-600 mt-3">Already have an account? <Link to="/login" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  )
}
