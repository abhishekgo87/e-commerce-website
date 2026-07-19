import { createContext } from 'react'
import type { Product } from '../types/product'

export interface CartContextValue {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  isInCart: (productId: number) => boolean
}

export const CartContext = createContext<CartContextValue | null>(null)

