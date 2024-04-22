import { consume } from 'api-consumer'

const api = consume('/api', { credentials: 'include' })

export default api
