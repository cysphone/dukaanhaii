'use client';

import { motion } from 'framer-motion';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { MinimalTemplateProps } from '../types';

interface ShopPageProps {
  products: MinimalTemplateProps['products'];
  onProductClick: (product: MinimalTemplateProps['products'][0]) => void;
}

export default function ShopPage({ products, onProductClick }: ShopPageProps) {
  return (
    <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-4">Our Collection</h2>
          <p className="font-body text-stone-500 max-w-2xl mx-auto">Browse our complete range of products.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
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
      </section>
    </motion.div>
  );
}
