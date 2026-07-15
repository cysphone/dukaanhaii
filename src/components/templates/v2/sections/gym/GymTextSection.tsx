import React from 'react';
import { motion } from 'framer-motion';

export const GymTextSection = ({ data }: { data: any }) => {
  return (
    <section className="py-24 px-6 bg-[var(--color-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-6xl md:text-8xl font-heading text-white uppercase leading-[0.9] mb-6">
            {data.title || 'NO EXCUSES'}
          </h2>
          <div className="w-24 h-4 bg-black transform -skew-x-12 mb-8" />
        </motion.div>

        <motion.div 
          className="flex-1 bg-black p-10 transform -skew-x-3 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-white font-body text-xl md:text-2xl font-bold leading-relaxed transform skew-x-3">
            {data.content || 'We are more than just a gym. We are a community of dedicated individuals pushing each other to achieve greatness. Leave your ego at the door.'}
          </p>
        </motion.div>

      </div>
    </section>
  );
};
