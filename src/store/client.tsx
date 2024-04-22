import { ClientSlug } from '@/components/client-logo'
import { create } from 'zustand'

const useClientStore = create<{
  client?: ClientSlug
  setClient: (client?: ClientSlug) => void
}>((set) => ({
  client: undefined as ClientSlug | undefined,
  setClient: (client?: ClientSlug) => set((state) => ({ client })),
}))

export default useClientStore
