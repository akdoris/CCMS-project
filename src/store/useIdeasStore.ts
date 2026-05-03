import { create } from 'zustand'
import type { ContentIdea } from '../types/index'

type IdeasStore = {
  ideas: ContentIdea[]
  setIdeas: (ideas: ContentIdea[]) => void
  addIdea: (idea: ContentIdea) => void
  updateIdea: (id: string, data: Partial<ContentIdea>) => void
  deleteIdea: (id: string) => void
}

export const useIdeasStore = create<IdeasStore>((set) => ({
  ideas: [],
  setIdeas: (ideas) => set({ ideas }),
  addIdea: (idea) => set((s) => ({ ideas: [idea, ...s.ideas] })),
  updateIdea: (id, data) =>
    set((s) => ({
      ideas: s.ideas.map((i) => (i.id === id ? { ...i, ...data } : i)),
    })),
  deleteIdea: (id) =>
    set((s) => ({ ideas: s.ideas.filter((i) => i.id !== id) })),
}))
