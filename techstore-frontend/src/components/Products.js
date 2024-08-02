import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  function Product({ product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button className="btn btn-primary" onClick={handleAddToCart}>Добавить в корзину</button>
    </div>
  );
}

  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);

        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

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
      <section className="filters mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="form-control category-select"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            {categories.map(category => (
              <option key={category._id} value={category.name}>{category.name}</option>
            ))}
          </select>
        </div>
      </section>
      <section className="products-list">
        <h2 className="section-title">Каталог продуктов</h2>
        <div className="row">
          {filteredProducts.length === 0 ? (
            <div className="no-products">Нет доступных продуктов</div>
          ) : (
            filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card shadow-sm">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center product-info">
                      <small className="text-muted">Код продукта: {product.code}</small>
                      <div className="product-price">${product.price}</div>
                    </div>
                    <a href={`/products/${product._id}`} className="btn btn-primary mt-3">Подробнее</a>
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
