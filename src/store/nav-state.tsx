import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn as create } from 'zustand/traditional'

const useNavStateStore = create<{
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

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Nav State', useNavStateStore)
}

export default useNavStateStore
