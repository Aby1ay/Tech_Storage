// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.slice(0, 3)); // Показываем только первые 3 продукта
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="container">
      <header className="jumbotron my-4">
        <h1 className="display-4">Добро пожаловать в наш магазин техники!</h1>
        <p className="lead">
          Мы предлагаем широкий ассортимент продуктов, включая ноутбуки, смартфоны, аксессуары и многое другое. Наши товары отличаются высоким качеством и доступными ценами.
        </p>
      </header>
      <section className="products-preview">
        <h2 className="section-title">Примеры наших продуктов</h2>
        <div className="row">
          {products.length === 0 ? (
            <div className="no-products">Нет доступных продуктов</div>
          ) : (
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-4 shadow-sm">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">${product.price}</small>
                      <a href={`/products/${product._id}`} className="btn btn-primary">Подробнее</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="about-us">
        <h2 className="section-title">О нас</h2>
        <p>
          Наш интернет-магазин был основан в 2024 году с целью предоставления качественной техники по доступным ценам. Мы стремимся к удовлетворению потребностей наших клиентов, предлагая надежные и современные продукты. Наша команда всегда готова помочь вам с выбором и предоставить необходимую поддержку.
        </p>
      </section>
    </div>
  );
}

export default Home;
