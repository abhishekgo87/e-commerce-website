import 'dotenv/config'

const requireEnv = (name: 'SUPABASE_URL' | 'SUPABASE_KEY'): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  supabaseUrl: requireEnv('SUPABASE_URL'),
  supabaseKey: requireEnv('SUPABASE_KEY'),
}

