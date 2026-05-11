import api from '../lib/api'
import type { ScheduledPost } from '../types'

export const scheduleService = {

  async getAll(): Promise<ScheduledPost[]> {
    const res = await api.get('/schedule')
    return res.data.data
  },

  async create(post: Omit<ScheduledPost, 'id'>): Promise<ScheduledPost> {
    const res = await api.post('/schedule', post)
    return res.data.data
  },

  async update(id: string, data: Partial<ScheduledPost>): Promise<ScheduledPost> {
    const res = await api.put(`/schedule/${id}`, data)
    return res.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/schedule/${id}`)
  },
}