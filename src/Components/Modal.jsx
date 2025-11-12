import React from "react";
import { ImCross } from "react-icons/im";
import { FaStar, FaShoppingCart, FaTag, FaBox } from "react-icons/fa";

const Modal = ({isOpen, product, onClose, setCartList, cartList}) => {
    if(!isOpen) return null;

    const isInCart = cartList.some(item => item.id === product.id);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!isInCart) {
            setCartList([...cartList, product]);
        }
    };

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
                <span className="modal-cross">
                    <ImCross onClick={onClose} />
                </span>
                
                <div className="modal-grid">
                    <div className="modal-image-section">
                        <img src={product.image} alt={product.title} />
                    </div>

                    <div className="modal-content">
                        <div className="modal-category">
                            <FaTag />
                            <span>{product.category}</span>
                        </div>

                        <h2 className="modal-title">{product.title}</h2>

                        <div className="modal-rating">
                            <div className="stars">
                                <FaStar className="star-icon" />
                                <span>{product.rating.rate}</span>
                            </div>
                            <span className="review-count">({product.rating.count} reviews)</span>
                        </div>

                        <div className="modal-price">
                            <h3>₹{product.price}</h3>
                        </div>

                        <div className="modal-description">
                            <h4>Description:</h4>
                            <p>{product.description}</p>
                        </div>

                        <div className="modal-stock">
                            <FaBox />
                            <span>In Stock</span>
                        </div>

                        <button 
                            className={`modal-cart-btn ${isInCart ? 'in-cart' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            <FaShoppingCart />
                            {isInCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;