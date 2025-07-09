import React from 'react';

export default function FilterBar({ setCategory }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <button onClick={() => setCategory('All')}>All</button>{' '}
      <button onClick={() => setCategory('Fruits')}>Fruits</button>{' '}
      <button onClick={() => setCategory('Vegetables')}>Vegetables</button>{' '}
      <button onClick={() => setCategory('Pots')}>Pots</button>
    </div>
  );
}
