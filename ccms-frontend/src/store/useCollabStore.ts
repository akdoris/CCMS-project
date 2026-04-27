import { create } from 'zustand'
import { BrandCollab } from '../types'

interface CollabStore {
  collabs: BrandCollab[]
  addCollab: (collab: BrandCollab) => void
  updateCollab: (id: string, data: Partial<BrandCollab>) => void
  deleteCollab: (id: string) => void
  setCollabs: (collabs: BrandCollab[]) => void
}

export const useCollabStore = create<CollabStore>((set) => ({
  collabs: [],
  addCollab: (collab) => set((s) => ({ collabs: [collab, ...s.collabs] })),
  updateCollab: (id, data) =>
    set((s) => ({ collabs: s.collabs.map((c) => (c.id === id ? { ...c, ...data } : c)) })),
  deleteCollab: (id) => set((s) => ({ collabs: s.collabs.filter((c) => c.id !== id) })),
  setCollabs: (collabs) => set({ collabs }),
}))