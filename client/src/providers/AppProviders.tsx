import type { PropsWithChildren } from 'react'
import { CartProvider } from './CartProvider'

export const AppProviders = ({ children }: PropsWithChildren) => (
  <CartProvider>{children}</CartProvider>
)

