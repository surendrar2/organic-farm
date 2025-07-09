import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../pages/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const proceedToPayment = () => {
    navigate('/payment');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <p>{item.name}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <button onClick={proceedToPayment}>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}
