import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import { CartContext } from './CartContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const products = [
  { id: 1, name: 'Fresh Apples', category: 'Fruits', image: '/images/Fresh Apples.jpg' },
  { id: 2, name: 'Organic Carrots', category: 'Vegetables', image: '/images/Organic Carrots.jpg' },
  { id: 3, name: 'Clay Pot', category: 'Pots', image: '/images/pot.jpeg' },
  { id: 4, name: 'Bananas', category: 'Fruits', image: '/images/Bananas.jpg' },
  { id: 5, name: 'Cabbage', category: 'Vegetables', image: '/images/Cabbage.jpeg' },
  { id: 6, name: 'Decorative Pot', category: 'Pots', image: '/images/Decorative Pot.jpg' },
];

export default function HomePage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const { addToCart } = useContext(CartContext);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Header />
      <Navbar />
      <FilterBar setCategory={setCategory} />
      <SearchBar search={search} setSearch={setSearch} />
      <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
      <ToastContainer />
    </div>
  );
}
