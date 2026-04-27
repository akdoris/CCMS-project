import { create } from 'zustand'
import { ContentIdea } from '../types'

interface IdeasStore {
  ideas: ContentIdea[]
  addIdea: (idea: ContentIdea) => void
  updateIdea: (id: string, data: Partial<ContentIdea>) => void
  deleteIdea: (id: string) => void
  setIdeas: (ideas: ContentIdea[]) => void
}

export const useIdeasStore = create<IdeasStore>((set) => ({
  ideas: [],
  addIdea: (idea) => set((s) => ({ ideas: [idea, ...s.ideas] })),
  updateIdea: (id, data) =>
    set((s) => ({ ideas: s.ideas.map((i) => (i.id === id ? { ...i, ...data } : i)) })),
  deleteIdea: (id) => set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),
  setIdeas: (ideas) => set({ ideas }),
}))