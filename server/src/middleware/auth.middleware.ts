import type { RequestHandler } from 'express'
import { AppError } from '../errors/app-error.js'
import { supabase } from '../lib/supabase.js'

const getBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) return null

  const [scheme, token] = authorizationHeader.trim().split(/\s+/)
  return scheme?.toLowerCase() === 'bearer' && token ? token : null
}

export const requireAuth: RequestHandler = async (request, _response, next) => {
  const accessToken = getBearerToken(request.header('authorization'))

  if (!accessToken) {
    next(new AppError('Authentication is required.', 401))
    return
  }

  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) {
    next(new AppError('Your session is invalid or has expired.', 401))
    return
  }

  request.auth = { accessToken, userId: data.user.id }
  next()
}
