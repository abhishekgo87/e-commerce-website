import { FaFacebookF, FaInstagram, FaShoppingBag, FaTwitter } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Footer = () => (
  <footer className="site-footer">
    <div className="footer-grid">
      <div className="footer-brand">
        <div className="footer-logo"><FaShoppingBag /> ShopEase</div>
        <p>Thoughtful fashion, useful tech and everyday favourites—all in one easy place.</p>
        <div className="social-links" aria-label="Social media links">
          <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
          <a href="#facebook" aria-label="Facebook"><FaFacebookF /></a>
          <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
        </div>
      </div>
      <div>
        <h3>Shop</h3>
        <Link to="/products/men's%20clothing">Men&apos;s fashion</Link>
        <Link to="/products/women's%20clothing">Women&apos;s fashion</Link>
        <Link to="/products/electronics">Electronics</Link>
        <Link to="/products/jewelery">Jewellery</Link>
      </div>
      <div>
        <h3>Company</h3>
        <Link to="/about">Our story</Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/products">All products</Link>
      </div>
      <div className="footer-note">
        <h3>Need help?</h3>
        <p>Our support team is available every day from 9 AM to 8 PM.</p>
        <a href="mailto:hello@shopease.in">hello@shopease.in</a>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} ShopEase. Made for better everyday shopping.</span>
      <span>Secure checkout · Easy returns · Friendly support</span>
    </div>
  </footer>
)

