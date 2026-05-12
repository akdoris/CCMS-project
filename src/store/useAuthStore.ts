import { create } from 'zustand'

type User = {
  id: string
  name: string
  email: string
  role: string
}

type AuthStore = {
  user:      User | null
  token:     string | null
  isLoading: boolean
  error:     string | null
  isAuthenticated: boolean

  setAuth:   (user: User, token: string) => void
  logout:    () => void
  setError:  (error: string | null) => void
  setLoading:(loading: boolean) => void
}

// Load from localStorage on startup
const storedToken = localStorage.getItem('ccms_token')
const storedUser  = localStorage.getItem('ccms_user')

export const useAuthStore = create<AuthStore>((set) => ({
  user:            storedUser  ? JSON.parse(storedUser) : null,
  token:           storedToken ?? null,
  isLoading:       false,
  error:           null,
  isAuthenticated: !!storedToken,

  setAuth: (user, token) => {
    localStorage.setItem('ccms_token', token)
    localStorage.setItem('ccms_user',  JSON.stringify(user))
    set({ user, token, isAuthenticated: true, error: null })
  },

  logout: () => {
    localStorage.removeItem('ccms_token')
    localStorage.removeItem('ccms_user')
    set({ user: null, token: null, isAuthenticated: false })
  },

  setError:   (error)   => set({ error }),
  setLoading: (loading) => set({ isLoading: loading }),
}))