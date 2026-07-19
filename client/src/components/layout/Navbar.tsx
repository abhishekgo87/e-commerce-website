import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaSignOutAlt,
  FaShoppingBag,
  FaStore,
  FaUser,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const navigationItems = [
  { to: '/', label: 'Home', icon: FaHome, end: true },
  { to: '/products', label: 'Shop', icon: FaStore },
  { to: '/about', label: 'Our Story', icon: FaInfoCircle },
  { to: '/contact', label: 'Contact', icon: FaEnvelope },
]

export const Navbar = () => {
  const { cartItems } = useCart()
  const { user, openLoginModal, signOut } = useAuth()

  const handleAuthClick = () => {
    if (user) {
      void signOut().catch((error: unknown) => {
        console.error('Unable to sign out.', error)
      })
      return
    }

    openLoginModal()
  }

  return (
    <header className="site-header">
      <div className="announcement-bar">
        <span>Free delivery on orders over ₹999</span>
        <span className="announcement-separator">•</span>
        <span>Easy 7-day returns</span>
      </div>
      <nav className="navbar" aria-label="Primary navigation">
        <NavLink to="/" className="nav-brand">
          <span className="brand-mark"><FaShoppingBag /></span>
          <span>
            <strong>ShopEase</strong>
            <small>Finds for every day</small>
          </span>
        </NavLink>

        <div className="nav-links">
          {navigationItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className={`auth-nav-button ${user ? 'signed-in' : ''}`}
            onClick={handleAuthClick}
            title={user ? `Signed in as ${user.email ?? 'customer'}` : 'Sign in'}
          >
            {user ? <FaSignOutAlt /> : <FaUser />}
            <span>{user ? 'Sign out' : 'Sign in'}</span>
          </button>
          <NavLink to="/cart" className="cart-button" aria-label={`Cart with ${cartItems.length} items`}>
            <FaShoppingBag />
            <span>Cart</span>
            {cartItems.length > 0 && <b>{cartItems.length}</b>}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
