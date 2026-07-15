import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const RetailProductCarouselSection = ({ data, products }: { data: any, products?: any[] }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [products]);

  const displayProducts = products && products.length > 0 ? products : [
    { id: 1, name: 'Minimalist Watch', price: 129, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30' },
    { id: 2, name: 'Leather Tote', price: 199, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809' },
    { id: 3, name: 'Sunglasses', price: 89, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083' },
    { id: 4, name: 'Ceramic Mug', price: 24, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d' }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] tracking-tight">
            {data.title || 'Trending Now'}
          </h2>
        </div>
      </div>

      <motion.div ref={carouselRef} className="cursor-grab overflow-hidden pl-6 md:pl-12">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          whileTap={{ cursor: 'grabbing' }}
          className="flex gap-8"
        >
          {displayProducts.map((product) => (
            <motion.div 
              key={product.id} 
              className="min-w-[300px] md:min-w-[400px] flex flex-col group"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[var(--radius-base)] bg-gray-100 mb-6">
                <img 
                  src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-black font-body text-sm font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-heading text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm font-body text-gray-500 mt-1">Free Shipping</p>
                </div>
                <span className="text-lg font-body font-semibold text-gray-900">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
