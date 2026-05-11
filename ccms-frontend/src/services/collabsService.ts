import api from '../lib/api'
import type { BrandCollab } from '../types'

export const collabsService = {

  async getAll(): Promise<BrandCollab[]> {
    const res = await api.get('/collabs')
    return res.data.data
  },

  async create(collab: Omit<BrandCollab, 'id'>): Promise<BrandCollab> {
    const res = await api.post('/collabs', collab)
    return res.data.data
  },

  async update(id: string, data: Partial<BrandCollab>): Promise<BrandCollab> {
    const res = await api.put(`/collabs/${id}`, data)
    return res.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/collabs/${id}`)
  },
}