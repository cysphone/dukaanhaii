import React from 'react';
import { motion } from 'framer-motion';

export const BakeryHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-amber-50">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={data.backgroundImage || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1470&auto=format&fit=crop"} 
          alt="Bakery Hero" 
          className="w-full h-full object-cover opacity-60" 
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 via-amber-900/20 to-amber-50" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {data.tagline && (
            <span className="block text-amber-100 font-heading text-xl italic mb-4 drop-shadow-md">
              {data.tagline}
            </span>
          )}
          
          <h1 className="text-6xl md:text-8xl font-heading text-white mb-8 leading-[1.1] drop-shadow-lg shadow-amber-900">
            {data.headline || 'Freshly Baked Daily'}
          </h1>
        </motion.div>

        {data.primaryCta && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-amber-600 text-white font-body text-sm uppercase tracking-widest rounded-full hover:bg-amber-700 shadow-xl transition-colors duration-300"
          >
            {data.primaryCta}
          </motion.button>
        )}
      </div>
    </section>
  );
};
