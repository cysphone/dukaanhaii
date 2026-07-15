import React from 'react';
import { motion } from 'framer-motion';

export const RetailSplitHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="min-h-[90vh] flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Text Side */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-20 bg-[var(--color-background)] z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          {data.tagline && (
            <span className="text-sm font-heading tracking-[0.2em] uppercase text-gray-500 mb-6 block">
              {data.tagline}
            </span>
          )}
          
          <h1 className="text-6xl md:text-7xl font-heading text-[var(--color-primary)] mb-8 leading-[1.1] tracking-tight">
            {data.headline || 'New Collection'}
          </h1>
          
          {data.primaryCta && (
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'var(--color-secondary)' }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-4 bg-[var(--color-primary)] text-white font-body text-sm uppercase tracking-widest rounded-[var(--radius-base)] transition-colors duration-300"
            >
              {data.primaryCta}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Image Side */}
      <div className="flex-1 relative h-[50vh] md:h-auto">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {data.productImage ? (
            <img src={data.productImage} alt="Hero Product" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 font-heading tracking-widest uppercase">Image Placeholder</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
