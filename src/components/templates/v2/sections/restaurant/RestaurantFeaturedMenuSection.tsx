import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const RestaurantFeaturedMenuSection = ({ data, products, business }: { data: any, products?: any[], business?: any }) => {
  const storePrefix = business?.slug ? `/store/${business.slug}` : '';
  const menuItems = products && products.length > 0 ? products : [
    { id: 1, name: 'Truffle Risotto', description: 'Arborio rice, wild mushrooms, black truffle shavings, parmesan.', price: 28 },
    { id: 2, name: 'Pan-Seared Scallops', description: 'Diver scallops, cauliflower purée, crispy pancetta, herb oil.', price: 32 },
    { id: 3, name: 'Wagyu Ribeye', description: '8oz grade A5 wagyu, roasted root vegetables, red wine reduction.', price: 85 },
    { id: 4, name: 'Dark Chocolate Fondant', description: 'Warm chocolate cake, vanilla bean ice cream, raspberry coulis.', price: 14 }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto bg-[var(--color-background)]">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-heading text-[var(--color-primary)] mb-4">
          {data.title || "Chef's Specials"}
        </h2>
        {data.description && (
          <p className="text-gray-600 font-body text-lg italic max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
        {menuItems.slice(0, 6).map((item: any, index: number) => (
          <Link key={item.id} href={`${storePrefix}/product/${item.id}`} className="group cursor-pointer">
            <motion.div 
              className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-end justify-between mb-2">
              <h3 className="text-xl font-heading text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">{item.name}</h3>
              <div className="flex-1 border-b border-dotted border-gray-300 mx-4 relative top-[-6px]" />
              <span className="text-xl font-body font-bold text-[var(--color-secondary)]">₹{item.price}</span>
            </div>
            <p className="text-gray-500 font-body text-sm font-light leading-relaxed pr-12">
              {item.description}
            </p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
