import React from 'react';
import Hero from './home/Hero';
import ProductSection from './home/ProductSection';
import CategoryBrowser from './home/CategoryBrowser';
import Footer from './Footer';
import PromoBanner from './home/PromoBanner';

const GranthKosh = () => {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ProductSection title="New Arrivals" />
      <ProductSection title="Bestsellers" />
      <CategoryBrowser />
      <PromoBanner />
      <Footer />
    </main>
  );
};

export default GranthKosh;
