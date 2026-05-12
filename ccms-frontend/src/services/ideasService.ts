import api from '../lib/api'
import type { ContentIdea } from '../types'

export const ideasService = {

  async getAll(): Promise<ContentIdea[]> {
    const res = await api.get('/ideas')
    return res.data.data
  },

  async create(idea: Omit<ContentIdea, 'id' | 'createdAt'>): Promise<ContentIdea> {
    const res = await api.post('/ideas', idea)
    return res.data.data
  },

  async update(id: string, data: Partial<ContentIdea>): Promise<ContentIdea> {
    const res = await api.put(`/ideas/${id}`, data)
    return res.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/ideas/${id}`)
  },
}