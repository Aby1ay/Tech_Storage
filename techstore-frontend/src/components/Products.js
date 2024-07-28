// src/components/Products.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
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
        <h1 className="display-4">Наши Продукты</h1>
        <p className="lead">
          Просмотрите полный ассортимент нашей продукции. Здесь вы найдете всё, что вам нужно: от ноутбуков до смартфонов.
        </p>
      </header>
      <section className="products-list">
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
    </div>
  );
}

export default Products;
