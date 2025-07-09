import React from 'react';

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: '10px', width: '200px' }}
    />
  );
}
