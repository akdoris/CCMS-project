import api from '../lib/api'

export type RegisterData = {
  name:     string
  email:    string
  password: string
}

export type LoginData = {
  email:    string
  password: string
}

export const authService = {

  async register(data: RegisterData) {
    const res = await api.post('/auth/register', data)
    return res.data
  },

  async login(data: LoginData) {
    const res = await api.post('/auth/login', data)
    return res.data
  },

  async getMe() {
    const res = await api.get('/auth/me')
    return res.data
  },
}