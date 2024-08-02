import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderTracking.css'; // Подключаем CSS файл

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrderStatus(response.data);
    } catch (err) {
      setError('Ошибка при отслеживании заказа. Убедитесь, что номер заказа введен правильно.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Отслеживание заказа</h2>
      <form onSubmit={handleSubmit} className="tracking-form">
        <div className="mb-3">
          <label htmlFor="orderId" className="form-label">Номер заказа</label>
          <input
            type="text"
            className="form-control"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Отследить</button>
      </form>
      {orderStatus && (
        <div className="order-status mt-4">
          <h4>Статус заказа</h4>
          <p><strong>Номер заказа:</strong> {orderStatus._id}</p>
          <p><strong>Статус:</strong> {orderStatus.status}</p>
          <p><strong>Дата заказа:</strong> {new Date(orderStatus.date).toLocaleDateString()}</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-4">{error}</div>
      )}
    </div>
  );
};

export default OrderTracking;
