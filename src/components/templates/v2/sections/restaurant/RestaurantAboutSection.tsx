import React from 'react';
import { motion } from 'framer-motion';

export const RestaurantAboutSection = ({ data }: { data: any }) => {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-[var(--color-background)]">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] leading-tight mb-6">
              {data.title || 'Our Story'}
            </h2>
            <div className="w-16 h-[2px] bg-[var(--color-secondary)] mb-8" />
            <p className="text-lg md:text-xl font-body text-gray-700 leading-relaxed font-light">
              {data.description || 'Welcome to our restaurant. We pride ourselves on creating unforgettable culinary experiences with the finest ingredients.'}
            </p>
          </motion.div>
        </div>

        {/* Image Grid/Collage */}
        <div className="flex-1 relative w-full h-[500px]">
          <motion.div 
            className="absolute top-0 right-0 w-3/4 h-4/5 shadow-2xl z-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {data.image ? (
              <img src={data.image} alt="About Us" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-body">Main Image</div>
            )}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 shadow-xl z-20 border-8 border-[var(--color-background)]"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full h-full bg-[var(--color-secondary)]/20 flex items-center justify-center backdrop-blur-md">
              <span className="text-[var(--color-primary)] font-heading italic text-2xl">Since 2024</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
