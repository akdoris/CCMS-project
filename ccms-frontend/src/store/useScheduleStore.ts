import { create } from 'zustand'
import { ScheduledPost } from '../types'

interface ScheduleStore {
  posts: ScheduledPost[]
  addPost: (post: ScheduledPost) => void
  updatePost: (id: string, data: Partial<ScheduledPost>) => void
  deletePost: (id: string) => void
  setPosts: (posts: ScheduledPost[]) => void
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  posts: [],
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  updatePost: (id, data) =>
    set((s) => ({ posts: s.posts.map((p) => (p.id === id ? { ...p, ...data } : p)) })),
  deletePost: (id) => set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
  setPosts: (posts) => set({ posts }),
}))