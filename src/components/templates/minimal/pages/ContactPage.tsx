'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { MinimalTemplateProps } from '../types';

interface ContactPageProps {
  business: MinimalTemplateProps['business'];
}

export default function ContactPage({ business }: ContactPageProps) {
  return (
    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-6">Get in Touch</h2>
          <p className="font-body text-stone-500 mb-12 text-lg">Have a question or want to work together? We'd love to hear from you.</p>
          <div className="flex flex-col md:flex-row justify-center gap-12 font-body">
            {business.email && (
              <a href={`mailto:${business.email}`} className="flex flex-col items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><Mail className="w-6 h-6" /></div>
                <span className="font-medium">{business.email}</span>
              </a>
            )}
            {business.phoneNumber && (
              <a href={`tel:${business.phoneNumber}`} className="flex flex-col items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><Phone className="w-6 h-6" /></div>
                <span className="font-medium">{business.phoneNumber}</span>
              </a>
            )}
            {business.location && (
              <div className="flex flex-col items-center gap-4 text-stone-600">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
                <span className="font-medium max-w-[200px] text-center">{business.location}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
