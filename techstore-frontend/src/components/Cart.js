// /components/Cart.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCart, calculateTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Ваша корзина пуста.</p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Цена: ${item.price.toFixed(2)}</p>
                  <p>Количество: {item.quantity}</p>
                  <button className="remove-button" onClick={() => removeFromCart(item._id)}>Удалить</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            Общая стоимость: ${calculateTotal().toFixed(2)}
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Оформить заказ</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
