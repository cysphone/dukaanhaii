'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { ServiceModernTemplateProps } from '../types';

interface ServicesPageProps {
  products: ServiceModernTemplateProps['products'];
  onServiceClick: (service: ServiceModernTemplateProps['products'][0]) => void;
}

export default function ServicesPage({ products, onServiceClick }: ServicesPageProps) {
  return (
    <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-24 px-6 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Our Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Comprehensive solutions designed to elevate your business.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(service => (
              <div key={service.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer flex flex-col" onClick={() => onServiceClick(service)}>
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <ImageGallery images={service.images} fallbackUrl={service.imageUrl} alt={service.name} />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  {service.category && <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 block">{service.category}</span>}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  <p className="text-slate-600 mb-8 line-clamp-3 flex-1">{service.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                    <span className="text-lg font-bold text-slate-900">{formatPrice(service.price)}</span>
                    <span className="text-blue-600 font-medium flex items-center gap-1 text-sm bg-blue-50 px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      Details <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
