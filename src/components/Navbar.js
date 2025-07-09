import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../pages/CartContext';

export default function Navbar() {
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <nav style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
      <Link to="/home" style={{ margin: '0 10px' }}>Home</Link>

      <div
        onClick={() => navigate('/cart')}
        style={{
          display: 'inline-block',
          position: 'relative',
          cursor: 'pointer',
          margin: '0 10px',
          fontSize: '20px'
        }}
      >
        🛒 Cart
        {cartCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-12px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px'
          }}>
            {cartCount}
          </span>
        )}
      </div>
    </nav>
  );
}
