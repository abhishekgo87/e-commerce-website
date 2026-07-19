import type { MouseEvent } from 'react'
import { FaBox, FaCheck, FaShieldAlt, FaShoppingBag, FaStar, FaTag, FaTruck } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'
import { ProductImage } from '../common/ProductImage'

interface ProductModalProps {
  isOpen: boolean
  product: Product
  onClose: () => void
}

export const ProductModal = ({ isOpen, product, onClose }: ProductModalProps) => {
  const { addToCart, isInCart } = useCart()
  const productIsInCart = isInCart(product.id)

  if (!isOpen) return null

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!productIsInCart) addToCart(product)
  }

  return (
    <div className="modal" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-title-${product.id}`}
      >
        <button className="modal-cross" onClick={onClose} aria-label="Close product details">
          <ImCross />
        </button>

        <div className="modal-grid">
          <div className="modal-image-section">
            <span className="modal-image-badge">Customer favourite</span>
            <ProductImage product={product} />
          </div>

          <div className="modal-content">
            <div className="modal-category">
              <FaTag />
              <span>{product.category === 'jewelery' ? 'Jewellery' : product.category}</span>
            </div>

            <h2 className="modal-title" id={`product-title-${product.id}`}>{product.title}</h2>

            <div className="modal-rating">
              <div className="stars"><FaStar /><span>{product.rating.rate}</span></div>
              <span className="review-count">Based on {product.rating.count} ratings</span>
            </div>

            <div className="modal-price">
              <small>Inclusive of all taxes</small>
              <h3>{`\u20B9${product.price}`}</h3>
            </div>

            <div className="modal-description">
              <h4>Why you&apos;ll love it</h4>
              <p>{product.description}</p>
            </div>

            <div className="modal-benefits">
              <span><FaBox /> In stock</span>
              <span><FaTruck /> Fast delivery</span>
              <span><FaShieldAlt /> Secure checkout</span>
            </div>

            <button
              className={`modal-cart-btn ${productIsInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
              disabled={productIsInCart}
            >
              {productIsInCart ? <FaCheck /> : <FaShoppingBag />}
              {productIsInCart ? 'Added to your cart' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
