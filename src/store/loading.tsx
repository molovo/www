import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn as create } from 'zustand/traditional'

const useLoadingStore = create<{
  loading: boolean
  setLoading: (loading: boolean) => void
}>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set((state) => ({ ...state, loading })),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Loading', useLoadingStore)
}

export default useLoadingStore
