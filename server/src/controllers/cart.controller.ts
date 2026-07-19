import type { RequestHandler } from 'express'
import { AppError } from '../errors/app-error.js'
import { addCartItem, getCartItems, removeCartItem } from '../services/cart.service.js'

const getAuth = (request: Express.Request) => {
  if (!request.auth) throw new AppError('Authentication is required.', 401)
  return request.auth
}

const parseProductId = (value: unknown): number => {
  const productId = Number(value)

  if (!Number.isInteger(productId) || productId <= 0) {
    throw new AppError('productId must be a positive integer.', 400)
  }

  return productId
}

const parseQuantity = (value: unknown): number => {
  const quantity = value === undefined ? 1 : Number(value)

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
    throw new AppError('quantity must be an integer between 1 and 99.', 400)
  }

  return quantity
}

export const getCart: RequestHandler = async (request, response) => {
  const { userId, accessToken } = getAuth(request)
  const items = await getCartItems(userId, accessToken)

  response.json({ items })
}

export const addToCart: RequestHandler = async (request, response) => {
  const { userId, accessToken } = getAuth(request)
  const productId = parseProductId(request.body?.productId)
  const quantity = parseQuantity(request.body?.quantity)
  const item = await addCartItem(userId, accessToken, productId, quantity)

  response.status(201).json({ item })
}

export const deleteFromCart: RequestHandler = async (request, response) => {
  const { userId, accessToken } = getAuth(request)
  const productId = parseProductId(request.params.productId)

  await removeCartItem(userId, accessToken, productId)
  response.status(204).send()
}
