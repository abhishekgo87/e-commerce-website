import { FaArrowRight, FaLock, FaShoppingBag, FaTrash, FaTruck, FaUndoAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ProductImage } from '../components/common/ProductImage'
import { useCart } from '../hooks/useCart'

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart()
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)
  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 99
  const total = subtotal + delivery

  return (
    <div className="cart-page">
      <section className="cart-page-heading">
        <span className="eyebrow"><FaShoppingBag /> Your bag</span>
        <h1>Review your favourites.</h1>
        <p>{cartItems.length === 0 ? 'Your cart is ready for something great.' : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} saved for checkout.`}</p>
      </section>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <div className="empty-cart-visual">
            <img src="/images/generated/empty-cart.png" alt="Shopping bag with clothing, jewellery and electronics" />
          </div>
          <span className="empty-cart-icon"><FaShoppingBag /></span>
          <h2>Your cart is feeling a little light.</h2>
          <p>Explore clothing, jewellery and electronics selected to make everyday life better.</p>
          <Link to="/products" className="primary-button">Start shopping <FaArrowRight /></Link>
          <div className="empty-cart-benefits">
            <span><FaTruck /> Fast delivery</span><span><FaUndoAlt /> Easy returns</span><span><FaLock /> Secure checkout</span>
          </div>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-container-full">
            <div className="cart-header"><h2>Your items</h2><span>{cartItems.length} in cart</span></div>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <article key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-image-wrap"><ProductImage product={item} className="cart-item-image" /></div>
                  <div className="cart-item-details">
                    <small>{item.category === 'jewelery' ? 'Jewellery' : item.category}</small>
                    <h3>{item.title}</h3>
                    <p>In stock · Ready to dispatch</p>
                    <strong className="cart-item-price">{`\u20B9${item.price.toFixed(2)}`}</strong>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.title}`}><FaTrash /> Remove</button>
                </article>
              ))}
            </div>
            <Link to="/products" className="continue-shopping">← Continue shopping</Link>
          </section>

          <aside className="order-summary">
            <span className="eyebrow">Order summary</span>
            <h2>Your total</h2>
            <div className="summary-row"><span>Subtotal</span><strong>{`\u20B9${subtotal.toFixed(2)}`}</strong></div>
            <div className="summary-row"><span>Delivery</span><strong>{delivery === 0 ? 'Free' : `\u20B9${delivery}`}</strong></div>
            <div className="summary-divider" />
            <div className="summary-row summary-total"><span>Total</span><strong>{`\u20B9${total.toFixed(2)}`}</strong></div>
            <button className="checkout-btn">Proceed to checkout <FaArrowRight /></button>
            <p className="secure-note"><FaLock /> Secure, encrypted checkout</p>
            <div className="delivery-note"><FaTruck /><div><strong>{delivery === 0 ? 'You unlocked free delivery!' : `Add \u20B9${(999 - subtotal).toFixed(2)} for free delivery`}</strong><span>Estimated delivery in 3–5 business days</span></div></div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default CartPage
