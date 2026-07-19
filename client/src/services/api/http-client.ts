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

interface ApiRequestOptions extends RequestInit {
  accessToken?: string
}

export const apiRequest = async <Response>(
  path: string,
  { accessToken, ...options }: ApiRequestOptions = {},
): Promise<Response> => {
  const headers = new Headers(options.headers)
  headers.set('Accept', 'application/json')

  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as ApiErrorResponse | null
    throw new ApiError(body?.message ?? 'API request failed', response.status)
  }

  if (response.status === 204) return undefined as Response
  return response.json() as Promise<Response>
}
