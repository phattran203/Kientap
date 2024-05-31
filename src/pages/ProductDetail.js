import React from 'react';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: 100, description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 150, description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', price: 200, description: 'Description for Product 3' }
];

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price} USD</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetail;

