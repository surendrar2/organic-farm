import React from 'react';
import './ProductCard.css'
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div style={{
      margin: '10px',
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <img src={product.image} alt={product.name} width="150" />
      <p>{product.name}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
}
