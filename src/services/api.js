import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
export const api = axios.create({ baseURL })

// Customers
export const createCustomer = (payload) => api.post('/api/customers', payload)
export const listCustomers = () => api.get('/api/customers') // for login lookup

// Products
export const listProducts = () => api.get('/api/products')
export const getProduct = (id) => api.get(`/api/products/${id}`)

// Reviews
export const createReview = (productId, customerId, payload) => api.post(`/api/reviews`, payload, {
  params: { productId, customerId }
})
export const listReviewsByProduct = (productId) => api.get(`/api/reviews/product/${productId}`)

// services/api.js
export const findCustomerByEmail = (email) => api.get('/api/customers/search', { params: { email } })
