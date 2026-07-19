import { useCallback, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CartContext } from '../contexts/cart-context'
import type { Product } from '../types/product'

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<Product[]>([])

  const addToCart = useCallback((product: Product) => {
    setCartItems((currentItems) => [...currentItems, product])
  }, [])

  const removeFromCart = useCallback((productId: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    )
  }, [])

  const isInCart = useCallback(
    (productId: number) => cartItems.some((item) => item.id === productId),
    [cartItems],
  )

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, isInCart }),
    [addToCart, cartItems, isInCart, removeFromCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

