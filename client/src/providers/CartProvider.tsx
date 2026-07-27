import { useCallback, useEffect, useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CartContext } from '../contexts/cart-context'
import productList from '../data/productList'
import { useAuth } from '../hooks/useAuth'
import {
  addCartItem as addCartItemRequest,
  getCart,
  removeCartItem as removeCartItemRequest,
} from '../services/api/cart.service'
import type { Product } from '../types/product'

export const CartProvider = ({ children }: PropsWithChildren) => {
  const { session, openLoginModal } = useAuth()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isCartLoading, setIsCartLoading] = useState(false)
  const [cartError, setCartError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) {
      setCartItems([])
      setCartError(null)
      setIsCartLoading(false)
      return
    }

    let isCurrentRequest = true
    setIsCartLoading(true)
    setCartError(null)

    void getCart()
      .then(({ items }) => {
        if (!isCurrentRequest) return

        const productById = new Map(productList.map((product) => [product.id, product]))
        const products = items
          .map((item) => productById.get(item.productId))
          .filter((product): product is Product => Boolean(product))

        setCartItems(products)
      })
      .catch((error: unknown) => {
        if (!isCurrentRequest) return
        setCartError(error instanceof Error ? error.message : 'Unable to load your cart.')
      })
      .finally(() => {
        if (isCurrentRequest) setIsCartLoading(false)
      })

    return () => {
      isCurrentRequest = false
    }
  }, [session])

  const addToCart = useCallback(async (product: Product) => {
    if (!session) {
      openLoginModal()
      return
    }

    if (cartItems.some((item) => item.id === product.id)) return

    setCartError(null)
    setCartItems((currentItems) => [...currentItems, product])

    try {
      await addCartItemRequest(product.id)
    } catch (error) {
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== product.id))
      setCartError(error instanceof Error ? error.message : 'Unable to add this item.')
    }
  }, [cartItems, openLoginModal, session])

  const removeFromCart = useCallback(async (productId: number) => {
    if (!session) {
      openLoginModal()
      return
    }

    const previousItems = cartItems
    setCartError(null)
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId))

    try {
      await removeCartItemRequest(productId)
    } catch (error) {
      setCartItems(previousItems)
      setCartError(error instanceof Error ? error.message : 'Unable to remove this item.')
    }
  }, [cartItems, openLoginModal, session])

  const isInCart = useCallback(
    (productId: number) => cartItems.some((item) => item.id === productId),
    [cartItems],
  )

  const value = useMemo(
    () => ({
      cartItems,
      isCartLoading,
      cartError,
      addToCart,
      removeFromCart,
      isInCart,
    }),
    [addToCart, cartError, cartItems, isCartLoading, isInCart, removeFromCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
