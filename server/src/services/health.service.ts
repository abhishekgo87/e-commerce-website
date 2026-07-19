import { supabase } from '../lib/supabase.js'

export const getHealthStatus = () => ({
  status: 'ok' as const,
  service: 'shopease-api',
  supabaseConfigured: Boolean(supabase),
  timestamp: new Date().toISOString(),
})

