'use client';

import { useState } from 'react';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { AnimatePresence } from 'framer-motion';
import { MinimalTemplateProps, PageType } from './types';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function MinimalTemplate({ business, products }: MinimalTemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedProduct, setSelectedProduct] = useState<MinimalTemplateProps['products'][0] | null>(null);

  const navigateTo = (page: PageType) => {
    setActivePage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showProduct = (product: MinimalTemplateProps['products'][0]) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] selection:bg-stone-900 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#fafaf9]/80 backdrop-blur-xl z-50 border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="font-display text-2xl font-bold tracking-tight text-stone-900">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-8 object-contain" />
            ) : business.name}
          </button>
          
          <div className="hidden md:flex gap-8 font-body text-sm font-medium tracking-wide">
            <button onClick={() => navigateTo('home')} className={`${activePage === 'home' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'} transition-colors`}>Home</button>
            <button onClick={() => navigateTo('shop')} className={`${activePage === 'shop' || activePage === 'product' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'} transition-colors`}>Shop</button>
            <button onClick={() => navigateTo('about')} className={`${activePage === 'about' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'} transition-colors`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`${activePage === 'contact' ? 'text-stone-900' : 'text-stone-500 hover:text-stone-900'} transition-colors`}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Main Content with Page Transitions */}
      <main className="flex-1 pt-20">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage business={business} products={products} onNavigate={navigateTo} onProductClick={showProduct} />}
          {activePage === 'shop' && <ShopPage products={products} onProductClick={showProduct} />}
          {activePage === 'product' && selectedProduct && <ProductPage business={business} product={selectedProduct} onBack={() => navigateTo('shop')} />}
          {activePage === 'about' && <AboutPage business={business} />}
          {activePage === 'contact' && <ContactPage business={business} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-stone-500">
          <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
          <p>Powered by <a href="/" className="font-semibold text-stone-900 hover:underline">DukaanHai</a></p>
        </div>
      </footer>
    </div>
  );
}
