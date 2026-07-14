'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { ServiceModernTemplateProps } from '../types';

interface ContactPageProps {
  business: ServiceModernTemplateProps['business'];
}

export default function ContactPage({ business }: ContactPageProps) {
  return (
    <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-24 px-6 bg-slate-50 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Get in Touch</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Let's discuss how we can help you achieve your objectives.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {business.email && (
              <a href={`mailto:${business.email}`} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Mail className="w-7 h-7 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                  <span className="text-slate-600 font-medium">{business.email}</span>
                </div>
              </a>
            )}
            {business.phoneNumber && (
              <a href={`tel:${business.phoneNumber}`} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                  <Phone className="w-7 h-7 text-slate-400 group-hover:text-blue-500" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2">Phone</h4>
                  <span className="text-slate-600 font-medium">{business.phoneNumber}</span>
                </div>
              </a>
            )}
            {business.location && (
              <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-slate-400" />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-slate-900 mb-2">Location</h4>
                  <span className="text-slate-600 font-medium">{business.location}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
