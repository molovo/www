import { create } from 'zustand'

const useContactFormStateStore = create<{
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}))

export default useContactFormStateStore
