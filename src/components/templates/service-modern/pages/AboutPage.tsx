'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ServiceModernTemplateProps } from '../types';

interface AboutPageProps {
  business: ServiceModernTemplateProps['business'];
}

export default function AboutPage({ business }: AboutPageProps) {
  return (
    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">About Us</h2>
          <div className="prose prose-lg prose-slate mx-auto">
            <p className="text-xl text-slate-600 leading-relaxed whitespace-pre-wrap">
              {business.about || "We are a dedicated team of professionals committed to delivering excellence."}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {business.mission && (
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{business.mission}</p>
            </div>
          )}
          {business.vision && (
            <div className="bg-slate-900 p-10 rounded-3xl shadow-sm text-white">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{business.vision}</p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
