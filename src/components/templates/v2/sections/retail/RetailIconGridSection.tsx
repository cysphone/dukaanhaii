import React from 'react';
import { motion } from 'framer-motion';

export const RetailIconGridSection = ({ data }: { data: any }) => {
  const features = data.features || [
    { title: 'Free Shipping', desc: 'On orders over $50', icon: '📦' },
    { title: 'Easy Returns', desc: '30-day return policy', icon: '🔄' },
    { title: 'Secure Payment', desc: '100% safe checkout', icon: '🔒' },
    { title: '24/7 Support', desc: 'Dedicated team', icon: '💬' }
  ];

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {features.map((feature: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl mb-4 text-[var(--color-primary)] border border-gray-100">
                {feature.icon}
              </div>
              <h4 className="font-heading font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm font-body text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
