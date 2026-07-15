import React from 'react';
import { motion } from 'framer-motion';

export const LawSplitHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="min-h-[85vh] flex flex-col md:flex-row bg-[var(--color-background)] overflow-hidden">
      {/* Text Side */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-24 py-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="w-16 h-1 bg-[var(--color-secondary)] mb-8" />
          <h1 className="text-5xl md:text-7xl font-heading text-[var(--color-primary)] mb-8 leading-tight font-medium">
            {data.headline || 'Excellence in Legal Representation'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 font-body leading-relaxed font-light">
            {data.tagline || 'Dedicated to protecting your rights with decades of combined experience.'}
          </p>
          
          {data.primaryCta && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-[var(--color-primary)] text-white font-heading text-sm uppercase tracking-widest rounded-[var(--radius-base)] hover:bg-[var(--color-secondary)] transition-colors duration-300"
            >
              {data.primaryCta}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Image Side */}
      <div className="flex-1 relative h-[40vh] md:h-auto border-l-8 border-[var(--color-secondary)]">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {data.productImage ? (
            <img src={data.productImage} alt="Legal Team" className="w-full h-full object-cover sepia-[0.3]" />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 font-heading uppercase tracking-widest">Image Placeholder</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
