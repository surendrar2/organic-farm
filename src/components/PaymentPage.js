import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const [selectedMode, setSelectedMode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
    setUpiId('');
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  const handleConfirm = () => {
    if (!selectedMode) {
      alert('Please select a payment mode!');
      return;
    }

    if (selectedMode === 'UPI' && !upiId.trim()) {
      alert('Please enter your UPI ID!');
      return;
    }

    if (
      (selectedMode === 'Credit Card' || selectedMode === 'Debit Card') &&
      (!cardNumber.trim() || !expiry.trim() || !cvv.trim())
    ) {
      alert('Please fill all card details!');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Simulate gateway
      if (selectedMode === 'UPI') {
        alert(`Redirecting to UPI gateway for ID: ${upiId}`);
      } else if (selectedMode === 'Credit Card' || selectedMode === 'Debit Card') {
        alert(`Processing card payment: ****${cardNumber.slice(-4)}`);
      }

      // After gateway simulation:
      setTimeout(() => {
        // ✅ Save order
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const newOrder = {
          id: Date.now(),
          items: cart,
          status: 'Preparing'
        };
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        // ✅ Clear cart
        localStorage.removeItem('cart');

        // ✅ Redirect to My Orders
        setIsProcessing(false);
        alert('✅ Payment Successful! Redirecting to My Orders...');
        navigate('/orders');
      }, 2000);
    }, 1000);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Payment Options</h2>
      <p>Select a payment mode:</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'].map((mode) => (
          <li key={mode} style={{ margin: '10px 0' }}>
            <button
              style={{
                padding: '10px 20px',
                background: selectedMode === mode ? '#4CAF50' : '#eee',
                color: selectedMode === mode ? '#fff' : '#000',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => handleSelectMode(mode)}
            >
              {mode}
            </button>
          </li>
        ))}
      </ul>

      {selectedMode === 'UPI' && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Enter UPI ID (e.g. name@upi)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{ padding: '10px', width: '250px' }}
          />
        </div>
      )}

      {(selectedMode === 'Credit Card' || selectedMode === 'Debit Card') && (
        <div style={{ marginTop: '20px' }}>
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
          />
          <input
            type="text"
            placeholder="Expiry Date (MM/YY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
          />
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
          />
        </div>
      )}

      <button
        onClick={handleConfirm}
        disabled={isProcessing}
        style={{ marginTop: '30px', padding: '10px 20px' }}
      >
        {isProcessing ? 'Processing...' : 'Confirm Payment'}
      </button>
    </div>
  );
}
