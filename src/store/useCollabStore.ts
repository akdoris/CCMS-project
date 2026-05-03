import { create } from 'zustand'
import type { BrandCollab } from '../types/index'

type CollabStore = {
  collabs: BrandCollab[]
  setCollabs: (collabs: BrandCollab[]) => void
  addCollab: (collab: BrandCollab) => void
  updateCollab: (id: string, data: Partial<BrandCollab>) => void
  deleteCollab: (id: string) => void
}

export const useCollabStore = create<CollabStore>((set) => ({
  collabs: [],
  setCollabs: (collabs) => set({ collabs }),
  addCollab: (collab) => set((s) => ({ collabs: [collab, ...s.collabs] })),
  updateCollab: (id, data) =>
    set((s) => ({
      collabs: s.collabs.map((c) => (c.id === id ? { ...c, ...data } : c)),
    })),
  deleteCollab: (id) =>
    set((s) => ({ collabs: s.collabs.filter((c) => c.id !== id) })),
}))
