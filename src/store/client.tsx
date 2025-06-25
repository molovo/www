import { ClientSlug } from '@/components/client-logo'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { createWithEqualityFn as create } from 'zustand/traditional'

const useClientStore = create<{
  client?: ClientSlug
  setClient: (client?: ClientSlug) => void
}>((set) => ({
  client: undefined as ClientSlug | undefined,
  setClient: (client?: ClientSlug) => set((state) => ({ ...state, client })),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Client', useClientStore)
}

export default useClientStore
