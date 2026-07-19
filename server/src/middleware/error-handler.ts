import type { ErrorRequestHandler } from 'express'
import { AppError } from '../errors/app-error.js'

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  _next,
) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500
  const message = error instanceof AppError
    ? error.message
    : 'Internal server error'

  response.status(statusCode).json({
    status: 'error',
    message,
  })
}
