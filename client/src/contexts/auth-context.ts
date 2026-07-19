import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export interface SignUpResult {
  requiresEmailConfirmation: boolean
  isExistingAccount: boolean
}

export interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  isLoginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<SignUpResult>
  resendConfirmation: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
