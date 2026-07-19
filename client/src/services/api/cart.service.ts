import { apiRequest } from './http-client'

export interface CartApiItem {
  id: number
  productId: number
  quantity: number
  createdAt: string
  updatedAt: string
}

interface CartResponse {
  items: CartApiItem[]
}

interface CartItemResponse {
  item: CartApiItem
}

export const getCart = (accessToken: string) =>
  apiRequest<CartResponse>('/cart', { accessToken })

export const addCartItem = (accessToken: string, productId: number) =>
  apiRequest<CartItemResponse>('/cart', {
    accessToken,
    method: 'POST',
    body: JSON.stringify({ productId, quantity: 1 }),
  })

export const removeCartItem = (accessToken: string, productId: number) =>
  apiRequest<void>(`/cart/${productId}`, {
    accessToken,
    method: 'DELETE',
  })
