import React from 'react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartPage = ({ cartList, setCartList }) => {
  const calculateTotal = () => {
    return cartList.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  function handleClick(index) {
    const newCartList = cartList.filter((obj) => obj.id !== cartList[index].id);
    setCartList(newCartList);
  }

  return (
    <div className="cart-page">
      <div className="cart-container-full">
        <div className="cart-header">
          <FaShoppingCart className="cart-icon" />
          <h2>Your Shopping Cart</h2>
        </div>
        
        <div className="cart-items">
          {cartList.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
            </div>
          ) : (
            cartList.map((value, index) => (
              <div key={index} className="cart-item">
                <img src={value.image} alt={value.title} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{value.title}</h3>
                  <p className="cart-item-price">₹{value.price}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => handleClick(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        
        {cartList.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <h3>Total:</h3>
              <h3>₹{calculateTotal()}</h3>
            </div>
            <div className="cart-actions">
              <Link to="/products" className="continue-shopping">Continue Shopping</Link>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;