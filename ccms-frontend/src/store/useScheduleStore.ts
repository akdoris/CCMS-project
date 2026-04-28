import { create } from 'zustand'
import type { ScheduledPost } from '../types/index'

type ScheduleStore = {
  posts: ScheduledPost[]
  setPosts: (posts: ScheduledPost[]) => void
  addPost: (post: ScheduledPost) => void
  updatePost: (id: string, data: Partial<ScheduledPost>) => void
  deletePost: (id: string) => void
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((s) => ({ posts: [post, ...s.posts] })),
  updatePost: (id, data) =>
    set((s) => ({
      posts: s.posts.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),
  deletePost: (id) =>
    set((s) => ({ posts: s.posts.filter((p) => p.id !== id) })),
}))
