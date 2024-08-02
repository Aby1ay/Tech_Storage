import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data.slice(0, 3)); // Показываем только первые 5 продуктов
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true, 
    autoplaySpeed: 3000, 
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="container">
      <header className="hero">
        <h1 className="hero-title">Добро пожаловать в Tech Store!</h1>
        <p className="hero-description">
          Откройте для себя наш широкий ассортимент техники: от ноутбуков до аксессуаров. Высокое качество и лучшие цены!
        </p>
      </header>
      
      <section id="products-slider" className="products-slider">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <div key={product._id} className="slider-item">
              <a href={`/products/${product._id}`} className="slider-link">
                <img src={product.image} alt={product.name} className="slider-img"/>
                <h5 className="slider-title">{product.name}</h5>
                <p className="slider-price">${product.price}</p>
              </a>
            </div>
          ))}
        </Slider>
      </section>
      
      <section className="products-preview">
        <h2 className="section-title">Популярные товары</h2>
        <div className="row">
          {products.length === 0 ? (
            <div className="no-products">Нет доступных продуктов</div>
          ) : (
            products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <div className="card mb-4">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="card-price">${product.price}</span>
                      <a href={`/products/${product._id}`} className="btn btn-outline-primary">Подробнее</a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="news" className="news">
        <h2 className="section-title">Новости</h2>
        <div className="news-item">
          <h4>Новинки в нашем магазине</h4>
          <p>Ознакомьтесь с последними поступлениями ноутбуков и других гаджетов в нашем магазине.</p>
        </div>
        <div className="news-item">
          <h4>Акции на аксессуары</h4>
          <p>Воспользуйтесь скидками до 50% на аксессуары в течение этой недели!</p>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2 className="section-title">Отзывы наших клиентов</h2>
        <div className="testimonial-item">
          <p>"Прекрасный опыт покупок, отличное качество и обслуживание. Буду возвращаться снова!"</p>
          <small>- Алексей Петров</small>
        </div>
        <div className="testimonial-item">
          <p>"Замечательные товары и быстрая доставка. Рекомендую всем!"</p>
          <small>- Ольга Кузнецова</small>
        </div>
      </section>

      <section id="faq" className="faq">
        <h2 className="section-title">Часто задаваемые вопросы</h2>
        <div className="faq-item">
          <strong>Какой срок доставки?</strong>
          <p>Доставка занимает от 3 до 7 дней в зависимости от вашего местоположения.</p>
        </div>
        <div className="faq-item">
          <strong>Какие способы оплаты доступны?</strong>
          <p>Мы принимаем кредитные карты, PayPal и банковские переводы.</p>
        </div>
      </section>

      
    </div>
  );
}

export default Home;
