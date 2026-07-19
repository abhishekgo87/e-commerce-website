import { env } from '../../config/env'
import type { ApiErrorResponse } from '../../types/api'

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiRequest = async <Response>(path: string): Promise<Response> => {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorResponse | null
    throw new ApiError(body?.message ?? 'API request failed', response.status)
  }

  return response.json() as Promise<Response>
}

