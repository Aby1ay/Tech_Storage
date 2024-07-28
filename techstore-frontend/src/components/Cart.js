import React, { useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.product._id === product._id);
    if (existingItem) {
      setCartItems(cartItems.map((item) =>
        item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { product, quantity: 1 }]);
    }
    setTotal(total + product.price);
  };

  const handleCheckout = async () => {
    try {
      await axios.post('http://localhost:5000/orders/create', {
        user: 'userId', // Замените на фактический userId
        items: cartItems.map((item) => ({ product: item.product._id, quantity: item.quantity })),
        total,
      });
      setCartItems([]);
      setTotal(0);
      alert('Order placed successfully');
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Cart</h2>
      <div className="mb-3">
        {cartItems.map((item) => (
          <div key={item.product._id}>
            {item.product.name} - {item.quantity} x ${item.product.price}
          </div>
        ))}
      </div>
      <div className="mb-3">Total: ${total}</div>
      <button className="btn btn-primary" onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
