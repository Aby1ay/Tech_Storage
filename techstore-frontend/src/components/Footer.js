import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom
import './Footer.css'; // Подключаем CSS файл

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-section">
            <h4>О компании</h4>
            <p>
              Мы — ведущий интернет-магазин электроники, предоставляющий лучшие товары и услуги
              по доступным ценам. Наша цель — обеспечить вас качественной продукцией и
              превосходным обслуживанием.
            </p>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <ul>
              <li>Адрес: Проспект Нурсултана Назарбаева, 56</li>
              <li>Телефон: +7 (771) 460-4767</li>
              <li>Email: support@techstore.com</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Ссылки</h4>
            <ul>
              <li><Link to="/">Главная</Link></li>
              <li><Link to="/products">Продукты</Link></li>
              <li><Link to="/about">О нас</Link></li>
              <li><Link to="/contact">Контакты</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Следите за нами</h4>
            <div className="social-media">
              <a href="https://www.facebook.com/Ya1yba" target="_blank" rel="noopener noreferrer">
                <img src="https://i.pinimg.com/originals/7f/68/99/7f689981b7050a848293ef0344f30d33.png" alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/ya1yba/" target="_blank" rel="noopener noreferrer">
                <img src="https://stepmash.by/wp-content/uploads/2018/09/instagram-icon.png" alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Tech Store. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
