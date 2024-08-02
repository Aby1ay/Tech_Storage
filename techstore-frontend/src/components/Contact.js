import React from 'react';
import './Contact.css'; // Подключаем CSS файл

function Contact() {
  return (
    <div className="contact-container">
      <h1>Контакты</h1>
      <p>Мы всегда готовы помочь вам. Свяжитесь с нами по любым вопросам:</p>
      <h2>Основные контакты</h2>
      <ul>
        <li><strong>Адрес:</strong> Проспект Нурсултана Назарбаева, 56</li>
        <li><strong>Телефон:</strong> +7 (771) 460-4767</li>
        <li><strong>Email:</strong> support@techstore.com</li>
      </ul>
      <h2>Рабочие часы</h2>
      <p>
        Понедельник - Пятница: 9:00 - 18:00<br />
        Суббота: 10:00 - 16:00<br />
        Воскресенье: выходной
      </p>
      <h2>Социальные сети</h2>
      <p>Следите за нами в социальных сетях для получения последних новостей и предложений:</p>
      <div className="social-media">
        <a href="https://www.facebook.com/Ya1yba" target="_blank" rel="noopener noreferrer">
          <img src="https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-feisbuk-logotip-na-prozrachnom-fone-16.png" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/ya1yba/" target="_blank" rel="noopener noreferrer">
          <img src="https://bogatyr.club/uploads/posts/2023-03/thumbs/1678280795_bogatyr-club-p-vektornie-znachki-foni-instagram-57.png" alt="Instagram" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
