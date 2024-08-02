// /components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductDetail.css';
import { useCart } from '../contexts/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setNotification(`Товар "${product.name}" добавлен в корзину`);
    setTimeout(() => setNotification(''), 3000); // Убираем уведомление через 3 секунды
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  if (error) return <div className="alert alert-danger">Ошибка: {error}</div>;
  if (!product) return <div className="loading">Загрузка...</div>;

  return (
    <div className="container product-detail">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} className="img-fluid" alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">Цена: ${product.price}</p>
          <p className="category">Категория: {product.category}</p>
          <p className="rating">Рейтинг: {product.rating}</p>
          <p className="details">Подробности: {product.details}</p>
          <div className="reviews">
            <h4>Отзывы:</h4>
            <ul>
              {product.reviews && product.reviews.map((review, index) => (
                <li key={index}>
                  <strong>Пользователь:</strong> {review.userId}<br />
                  <strong>Комментарий:</strong> {review.comment}<br />
                  <strong>Рейтинг:</strong> {review.rating}<br />
                  <strong>Дата:</strong> {review.date}
                </li>
              ))}
            </ul>
          </div>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
          />
          <button className="btn btn-primary" onClick={handleAddToCart}>Добавить в корзину</button>
          {notification && <div className="notification">{notification}</div>}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
