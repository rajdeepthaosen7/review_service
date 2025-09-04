import React, { createContext, useContext, useEffect, useState } from 'react'
import { createCustomer, listCustomers } from '../services/api'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

export default function AuthProvider({children}){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem('review_user')
    if(raw){ setUser(JSON.parse(raw)) }
    setLoading(false)
  }, [])

  const loginWithEmail = async (email) => {
    const { data } = await listCustomers()
    const found = data.find(c => c.email.toLowerCase() === email.toLowerCase())
    if(!found) throw new Error('No account for this email')
    localStorage.setItem('review_user', JSON.stringify(found))
    setUser(found)
    return found
  }

  const register = async ({name, email, address}) => {
    const { data } = await createCustomer({name, email, address})
    localStorage.setItem('review_user', JSON.stringify(data))
    setUser(data)
    return data
  }

  const logout = () => {
    localStorage.removeItem('review_user')
    setUser(null)
  }

  return <AuthCtx.Provider value={{user, loading, loginWithEmail, register, logout}}>{children}</AuthCtx.Provider>
}
