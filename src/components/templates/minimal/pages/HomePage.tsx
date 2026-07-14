'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { MinimalTemplateProps } from '../types';

interface HomePageProps {
  business: MinimalTemplateProps['business'];
  products: MinimalTemplateProps['products'];
  onNavigate: (page: 'shop') => void;
  onProductClick: (product: MinimalTemplateProps['products'][0]) => void;
}

export default function HomePage({ business, products, onNavigate, onProductClick }: HomePageProps) {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="pt-20 pb-20 md:pt-32 md:pb-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 text-center md:text-left">
            {business.tagline && (
              <span className="font-body text-xs font-semibold tracking-widest text-stone-500 uppercase">
                {business.tagline}
              </span>
            )}
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-tight text-stone-900">
              {business.headline || `Welcome to ${business.name}`}
            </h2>
            <p className="font-body text-lg text-stone-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {business.marketingDesc || "Discover our curated collection of premium products."}
            </p>
            {products.length > 0 && (
              <div className="pt-4">
                <button 
                  onClick={() => onNavigate('shop')} 
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider border-b-2 border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 w-full">
            <div className="relative aspect-[4/5] md:aspect-square bg-stone-100 overflow-hidden rounded-2xl">
              {business.bannerUrl ? (
                <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <ShoppingBag className="w-24 h-24 stroke-[1]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {products.length > 0 && (
        <section className="py-24 px-6 bg-white border-t border-stone-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-stone-900">Featured Products</h3>
              <button onClick={() => onNavigate('shop')} className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">View All →</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.slice(0, 3).map((product) => (
                <div key={product.id} className="group block cursor-pointer" onClick={() => onProductClick(product)}>
                  <div className="aspect-[3/4] bg-[#fafaf9] overflow-hidden mb-6 relative">
                    <ImageGallery images={product.images} fallbackUrl={product.imageUrl} alt={product.name} />
                    {!product.inStock && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-xs font-semibold px-3 py-1 uppercase tracking-wider">Sold Out</div>
                    )}
                  </div>
                  <div className="font-body">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">{product.name}</h4>
                      <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
                    </div>
                    {product.category && <p className="text-sm text-stone-500 capitalize">{product.category}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
