import { useEffect } from 'react'
import { LoginModal } from '../components/auth/LoginModal'
import { useAuth } from '../hooks/useAuth'
import { AppProviders } from '../providers/AppProviders'
import { AppRoutes } from '../routes/AppRoutes'

const AppContent = () => {
  const { user, isLoading, openLoginModal } = useAuth()

  useEffect(() => {
    if (isLoading || user) return

    const loginPromptTimer = window.setTimeout(openLoginModal, 5_000)
    return () => window.clearTimeout(loginPromptTimer)
  }, [isLoading, openLoginModal, user])

  return (
    <>
      <AppRoutes />
      <LoginModal />
    </>
  )
}

const App = () => (
  <AppProviders>
    <AppContent />
  </AppProviders>
)

export default App
