import React from 'react';
import { motion } from 'framer-motion';

export const DentalHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center bg-blue-50 overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={data.backgroundImage || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1470&auto=format&fit=crop"} 
          alt="Dental Hero" 
          className="w-full h-full object-cover opacity-20" 
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-2xl"
        >
          {data.tagline && (
            <div className="inline-block px-4 py-1.5 bg-blue-100 rounded-full mb-6">
              <span className="text-blue-700 font-heading text-sm font-semibold tracking-wide uppercase">
                {data.tagline}
              </span>
            </div>
          )}
          
          <h1 className="text-5xl md:text-7xl font-heading text-slate-900 mb-6 leading-[1.1] font-bold">
            {data.headline || 'A Brighter Smile Awaits'}
          </h1>

          {data.primaryCta && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-4 bg-blue-600 text-white font-heading font-semibold text-lg rounded-[var(--radius-base)] shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            >
              {data.primaryCta}
            </motion.button>
          )}
        </motion.div>
        
        <div className="flex-1" />
      </div>
    </section>
  );
};
