import { createWithEqualityFn as create } from 'zustand/traditional'

const useLoadingStore = create<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}))

export default useLoadingStore
