import React from 'react';
import { motion } from 'framer-motion';

export const RestaurantHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Background Image with Parallax effect */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {data.backgroundImage ? (
          <img src={data.backgroundImage} alt="Restaurant Hero" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[#1a1a1a]" />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="uppercase tracking-[0.3em] text-sm font-medium text-[var(--color-secondary)]">
              {data.tagline || 'Experience Fine Dining'}
            </span>
            <div className="h-[1px] w-12 bg-white/50" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-heading mb-8 leading-[1.1] drop-shadow-2xl">
            {data.headline || 'A Culinary Journey'}
          </h1>
        </motion.div>

        {data.primaryCta && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-transparent border border-white text-white font-body text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 backdrop-blur-sm"
          >
            {data.primaryCta}
          </motion.button>
        )}
      </div>

      {/* Decorative Gradient overlay for bottom blending */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent pointer-events-none" />
    </section>
  );
};
