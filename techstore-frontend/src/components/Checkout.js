import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Checkout.css'; // Импортируем файл стилей

const Checkout = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика обработки заказа
    setOrderPlaced(true);
  };

  return (
    <div className="container mt-5">
      {!orderPlaced ? (
        <div>
          <h2 className="text-center mb-4">Оформление заказа</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">ФИО</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Адрес</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Телефон</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Оформить заказ</button>
          </form>
        </div>
      ) : (
        <div className="order-confirmation">
          <h2 className="text-center mb-4">Спасибо за ваш заказ!</h2>
          <p className="text-center">Ваш заказ был успешно оформлен.</p>
          <p className="text-center">ФИО: {name}</p>
          <p className="text-center">Адрес: {address}</p>
          <p className="text-center">Email: {email}</p>
          <p className="text-center">Телефон: {phone}</p>
          <div className="text-center mt-4">
            <a href="/" className="btn btn-primary">На главную</a>
            <a href="/products" className="btn btn-secondary ml-2">Продолжить покупки</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
