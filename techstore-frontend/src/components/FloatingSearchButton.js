import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FloatingSearchButton.css'; // Импортируйте стили

function FloatingSearchButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search'); // Перенаправление на страницу поиска
  };

  return (
    <button className="floating-search-button" onClick={handleClick}>
      <span className="floating-search-icon">🔍</span> {/* Используйте иконку поиска */}
    </button>
  );
}

export default FloatingSearchButton;
