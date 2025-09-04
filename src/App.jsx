import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AuthProvider, { useAuth } from './context/AuthContext.jsx'

const Nav = () => {
  const { user, logout } = useAuth()
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="font-bold text-lg">
          <span className="px-2 py-1 rounded-xl bg-indigo-100 text-indigo-700">Shiwani</span> E-mart
        </NavLink>
        <div className="flex items-center gap-3">
          <NavLink to="/" className={({isActive}) => `btn-ghost ${isActive ? 'bg-slate-100' : ''}`}>Products</NavLink>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-700">Hi, <span className="font-semibold">{user.name}</span></span>
              <button className="btn-ghost" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/login" className="btn-ghost">Login</NavLink>
              <NavLink to="/register" className="btn">Register</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Guard = ({children}) => {
  const { user, loading } = useAuth()
  if(loading) return <p className="p-6">Loading...</p>
  return user ? children : <Navigate to="/login" replace />
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Nav />
        <main className="max-w-6xl mx-auto px-4 py-8 pb-24">
          <Routes>
            <Route path="/" element={<Guard><ProductsPage /></Guard>} />
            <Route path="/products/:id" element={<Guard><ProductDetailPage /></Guard>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
