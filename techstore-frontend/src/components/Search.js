import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/search?query=${query}`);
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError('Произошла ошибка при поиске. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Поиск товаров..." 
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Поиск'}
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div>
        {results.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Search;
