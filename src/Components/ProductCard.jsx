import React, { useState } from "react";
import Modal from "./Modal";
import { FaHeart, FaShoppingCart, FaStar, FaEye } from "react-icons/fa";

const ProductCard = ({ product, setCartList, cartList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function addToCart(e) {
    e.stopPropagation();
    setCartList([...cartList, product]);
  }

  function toggleWishlist(e) {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  }

  return (
    <div
      className="product-card-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
          {isHovered && (
            <div className="product-overlay">
              <button className="overlay-btn" onClick={openModal}>
                <FaEye />
              </button>
              <button 
                className="overlay-btn" 
                onClick={addToCart}
              >
                <FaShoppingCart />
              </button>
              <button 
                className={`overlay-btn ${isWishlisted ? 'wishlisted' : ''}`}
                onClick={toggleWishlist}
              >
                <FaHeart />
              </button>
            </div>
          )}
        </div>

        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-title">{product.title.slice(0, 20)}...</h3>
          
          <div className="product-details">
            <div className="price-rating">
              <span className="product-price">₹{product.price}</span>
              <div className="rating">
                <FaStar className="star-icon" />
                <span>{product.rating.rate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        product={product}
        onClose={closeModal}
        setCartList={setCartList}
        cartList={cartList}
      />
    </div>
  );
};

export default ProductCard;