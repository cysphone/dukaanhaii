'use client';

import { motion } from 'framer-motion';
import { MinimalTemplateProps } from '../types';

interface AboutPageProps {
  business: MinimalTemplateProps['business'];
}

export default function AboutPage({ business }: AboutPageProps) {
  return (
    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-6">Our Story</h2>
          {business.about ? (
            <p className="font-body text-lg text-stone-600 leading-relaxed whitespace-pre-wrap">{business.about}</p>
          ) : (
            <p className="font-body text-lg text-stone-600 leading-relaxed">We are passionate about delivering exceptional quality and design in every piece.</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-12 mt-16">
          {business.vision && (
            <div className="bg-stone-50 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-medium text-stone-900 mb-4">Our Vision</h3>
              <p className="font-body text-stone-600">{business.vision}</p>
            </div>
          )}
          {business.mission && (
            <div className="bg-stone-50 p-8 rounded-2xl">
              <h3 className="font-display text-2xl font-medium text-stone-900 mb-4">Our Mission</h3>
              <p className="font-body text-stone-600">{business.mission}</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
