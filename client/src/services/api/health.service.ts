import type { HealthResponse } from '../../types/api'
import { apiRequest } from './http-client'

export const getApiHealth = () => apiRequest<HealthResponse>('/health')

