import type { PropsWithChildren } from 'react'
import { AuthProvider } from './AuthProvider'
import { CartProvider } from './CartProvider'

export const AppProviders = ({ children }: PropsWithChildren) => (
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
)
