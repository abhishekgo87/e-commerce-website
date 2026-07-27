import { useCallback, useEffect, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPaperPlane,
  FaShoppingBag,
  FaTimes,
} from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'

type AuthMode = 'login' | 'signup'

export const LoginModal = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    signIn,
    signUp,
    resendConfirmation,
  } = useAuth()
  const [mode, setMode] = useState<AuthMode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [confirmationEmail, setConfirmationEmail] = useState<string | null>(null)

  const handleClose = useCallback(() => {
    setIsPasswordVisible(false)
    closeLoginModal()
  }, [closeLoginModal])

  useEffect(() => {
    if (!isLoginModalOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [handleClose, isLoginModalOpen])

  if (!isLoginModalOpen) return null

  const changeMode = (nextMode: AuthMode) => {
    setMode(nextMode)
    setIsPasswordVisible(false)
    setErrorMessage(null)
    setSuccessMessage(null)
    setConfirmationEmail(null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    const normalizedEmail = email.trim().toLowerCase()

    try {
      if (mode === 'login') {
        await signIn(normalizedEmail, password)
      } else {
        const result = await signUp(normalizedEmail, password)
        if (result.requiresEmailConfirmation) {
          setConfirmationEmail(normalizedEmail)
          setSuccessMessage(
            result.isExistingAccount
              ? 'This email may already be registered. Verify it or return to sign in.'
              : 'Account created successfully. Verify your email to activate sign in.',
          )
          setPassword('')
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed.'

      if (message.toLowerCase().includes('email not confirmed')) {
        setConfirmationEmail(normalizedEmail)
        setErrorMessage('Your account exists, but the email is not verified yet.')
      } else if (message.toLowerCase().includes('invalid login credentials')) {
        setErrorMessage('Email or password is incorrect. If you just signed up, verify your email first.')
      } else {
        setErrorMessage(message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendConfirmation = async () => {
    if (!confirmationEmail) return

    setIsSubmitting(true)
    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await resendConfirmation(confirmationEmail)
      setSuccessMessage('Verification email sent. Please check your inbox and spam folder.')
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to resend verification email.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => event.stopPropagation()

  return (
    <div className="auth-modal" onClick={handleClose} role="presentation">
      <div
        className="auth-modal-card"
        onClick={stopPropagation}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        <button className="auth-modal-close" onClick={handleClose} aria-label="Close sign in dialog">
          <FaTimes />
        </button>

        <div className="auth-modal-brand">
          <span><FaShoppingBag /></span>
          <div><strong>ShopEase</strong><small>Your cart, on every device.</small></div>
        </div>

        <span className="auth-eyebrow">Secure customer access</span>
        <h2 id="auth-modal-title">
          {confirmationEmail ? 'Check your inbox.' : mode === 'login' ? 'Welcome back.' : 'Create your account.'}
        </h2>
        <p className="auth-modal-intro">
          {confirmationEmail
            ? 'One quick verification step keeps your account secure.'
            : mode === 'login'
              ? 'Sign in to save your cart and continue shopping.'
              : 'Sign up with your email to keep your picks safely synced.'}
        </p>

        {confirmationEmail ? (
          <div className="auth-confirmation">
            <span className="auth-confirmation-icon"><FaEnvelope /></span>
            <strong>{confirmationEmail}</strong>
            <p>Supabase requires email verification before this account can sign in.</p>

            {errorMessage && <p className="auth-message error" role="alert">{errorMessage}</p>}
            {successMessage && <p className="auth-message success"><FaCheckCircle /> {successMessage}</p>}

            <button className="auth-submit" disabled={isSubmitting} onClick={handleResendConfirmation} type="button">
              <FaPaperPlane /> {isSubmitting ? 'Sending...' : 'Resend verification email'}
            </button>
            <button className="auth-back-button" onClick={() => changeMode('login')} type="button">
              <FaArrowLeft /> Back to sign in
            </button>
          </div>
        ) : (
          <>
            <div className="auth-mode-switch" aria-label="Authentication mode">
              <button className={mode === 'login' ? 'active' : ''} onClick={() => changeMode('login')} type="button">Sign in</button>
              <button className={mode === 'signup' ? 'active' : ''} onClick={() => changeMode('signup')} type="button">Create account</button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                <span>Email address</span>
                <div><FaEnvelope /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required autoFocus /></div>
              </label>
              <label>
                <span>Password</span>
                <div>
                  <FaLock />
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    placeholder="Minimum 6 characters"
                    minLength={6}
                    required
                  />
                  <button
                    className="auth-password-toggle"
                    type="button"
                    onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isPasswordVisible}
                  >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>

              {errorMessage && <p className="auth-message error" role="alert">{errorMessage}</p>}
              {successMessage && <p className="auth-message success"><FaCheckCircle /> {successMessage}</p>}

              <button className="auth-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign in securely' : 'Create my account'}
              </button>
            </form>
          </>
        )}

        <p className="auth-security-note"><FaLock /> Credentials are securely stored in Supabase Authentication.</p>
      </div>
    </div>
  )
}
