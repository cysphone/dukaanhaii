import React from 'react';
import { motion } from 'framer-motion';

export const GymCardsSection = ({ data }: { data: any }) => {
  const cards = data.cards || [
    { id: 1, title: 'STRENGTH', description: 'Powerlifting & Olympic Lifting', icon: '🏋️' },
    { id: 2, title: 'CONDITIONING', description: 'High Intensity Interval Training', icon: '🏃' },
    { id: 3, title: 'FIGHT CAMP', description: 'Boxing & Muay Thai', icon: '🥊' }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-[var(--color-background)]">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-heading text-[var(--color-primary)] uppercase tracking-tight">
          {data.title || 'OUR PROGRAMS'}
        </h2>
        <div className="w-24 h-2 bg-[var(--color-secondary)] mx-auto mt-6 transform -skew-x-12" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card: any, index: number) => (
          <motion.div
            key={card.id || index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
          >
            {/* Shadow Element */}
            <div className="absolute inset-0 bg-black transform translate-x-3 translate-y-3 -skew-x-3 transition-transform group-hover:translate-x-4 group-hover:translate-y-4" />
            
            {/* Card Body */}
            <div className="relative bg-white border-4 border-black p-8 h-full transform -skew-x-3 flex flex-col items-center text-center transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2">
              <span className="text-6xl mb-6 transform skew-x-3 block">{card.icon}</span>
              <h3 className="text-3xl font-heading text-black uppercase tracking-wide mb-4 transform skew-x-3">
                {card.title}
              </h3>
              <p className="text-gray-600 font-body text-lg font-bold transform skew-x-3">
                {card.description}
              </p>
              
              <div className="mt-8 transform skew-x-3">
                <button className="text-[var(--color-primary)] font-heading uppercase tracking-widest text-lg hover:text-[var(--color-secondary)] transition-colors flex items-center gap-2">
                  EXPLORE <span className="text-2xl leading-none">→</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
