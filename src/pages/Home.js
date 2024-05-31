import React from 'react';
import ProductList from '../components/ProductList';

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 },
  { id: 3, name: 'Product 3', price: 200 }
];

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
