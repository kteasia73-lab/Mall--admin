import axios from 'axios'
const BASE = import.meta.env.VITE_BACKEND || 'http://localhost:4000'

export const api = axios.create({
  baseURL: BASE + '/api',
  headers: { 'Content-Type': 'application/json' }
})

export function setAuth(token){
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
