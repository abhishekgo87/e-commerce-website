export interface HealthResponse {
  status: 'ok'
  service: string
  supabaseConfigured: boolean
  timestamp: string
}

export interface ApiErrorResponse {
  status: 'error'
  message: string
}

