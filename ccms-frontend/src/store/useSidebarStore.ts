import { create } from 'zustand'

type SidebarStore = {
  isOpen: boolean       // mobile toggle
  isCollapsed: boolean  // desktop collapse
  toggle: () => void
  close: () => void
  toggleCollapse: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen:      false,
  isCollapsed: false,
  toggle:         () => set((s) => ({ isOpen: !s.isOpen })),
  close:          () => set({ isOpen: false }),
  toggleCollapse: () => set((s) => ({ isCollapsed: !s.isCollapsed })),
}))