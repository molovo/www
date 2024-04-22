import { create } from 'zustand'

const useLoadingStore = create<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ loading })),
}))

export default useLoadingStore
