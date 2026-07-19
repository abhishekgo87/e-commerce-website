import { createContext } from 'react'
import type { Product } from '../types/product'

export interface CartContextValue {
  cartItems: Product[]
  isCartLoading: boolean
  cartError: string | null
  addToCart: (product: Product) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  isInCart: (productId: number) => boolean
}

export const CartContext = createContext<CartContextValue | null>(null)
