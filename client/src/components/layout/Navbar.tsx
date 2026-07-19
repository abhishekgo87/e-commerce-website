import {
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaShoppingBag,
  FaStore,
} from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

const navigationItems = [
  { to: '/', label: 'Home', icon: FaHome, end: true },
  { to: '/products', label: 'Shop', icon: FaStore },
  { to: '/about', label: 'Our Story', icon: FaInfoCircle },
  { to: '/contact', label: 'Contact', icon: FaEnvelope },
]

export const Navbar = () => {
  const { cartItems } = useCart()

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

        <NavLink to="/cart" className="cart-button" aria-label={`Cart with ${cartItems.length} items`}>
          <FaShoppingBag />
          <span>Cart</span>
          {cartItems.length > 0 && <b>{cartItems.length}</b>}
        </NavLink>
      </nav>
    </header>
  )
}

