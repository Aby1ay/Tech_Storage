import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProducts = async (searchTerm) => {
  const { data } = await axios.get(`/api/products?search=${searchTerm}`);
  return data;
};

const ProductList = () => {
  const [search, setSearch] = useState('');
  const { data: products } = useQuery(['products', search], () => fetchProducts(search));

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
