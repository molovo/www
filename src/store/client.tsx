import { ClientSlug } from '@/components/client-logo'
import { createWithEqualityFn as create } from 'zustand/traditional'

const useClientStore = create<{
  client?: ClientSlug
  setClient: (client?: ClientSlug) => void
}>((set) => ({
  client: undefined as ClientSlug | undefined,
  setClient: (client?: ClientSlug) => set((state) => ({ ...state, client })),
}))

export default useClientStore
