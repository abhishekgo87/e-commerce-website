import { useState } from 'react'
import type { MouseEvent } from 'react'
import { FaCheck, FaEye, FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa'
import { useCart } from '../../hooks/useCart'
import type { Product } from '../../types/product'
import { ProductImage } from '../common/ProductImage'
import { ProductModal } from './ProductModal'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const productIsInCart = isInCart(product.id)

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!productIsInCart) addToCart(product)
  }

  const handleToggleWishlist = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsWishlisted((currentValue) => !currentValue)
  }

  return (
    <article className="product-card">
      <div className="product-image-container">
        <span className="product-badge">Popular pick</span>
        <ProductImage product={product} className="product-image" />
        <div className="product-overlay">
          <button onClick={() => setIsOpen(true)} aria-label={`View ${product.title}`} title="Quick view">
            <FaEye />
          </button>
          <button
            className={isWishlisted ? 'wishlisted' : ''}
            onClick={handleToggleWishlist}
            aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.title} ${isWishlisted ? 'from' : 'to'} wishlist`}
            title="Save item"
          >
            <FaHeart />
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.category === 'jewelery' ? 'Jewellery' : product.category}</span>
          <span className="rating"><FaStar /> {product.rating.rate}</span>
        </div>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-review-count">{product.rating.count} verified ratings</p>
        <div className="product-card-footer">
          <div>
            <small>Our price</small>
            <strong className="product-price">{`\u20B9${product.price}`}</strong>
          </div>
          <button
            className={`add-cart-button ${productIsInCart ? 'added' : ''}`}
            onClick={handleAddToCart}
            disabled={productIsInCart}
          >
            {productIsInCart ? <FaCheck /> : <FaShoppingBag />}
            {productIsInCart ? 'Added' : 'Add'}
          </button>
        </div>
      </div>

      <ProductModal isOpen={isOpen} product={product} onClose={() => setIsOpen(false)} />
    </article>
  )
}
