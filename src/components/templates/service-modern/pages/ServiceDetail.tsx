'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Calendar } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { ServiceModernTemplateProps } from '../types';

interface ServiceDetailProps {
  business: ServiceModernTemplateProps['business'];
  service: ServiceModernTemplateProps['products'][0];
  onBack: () => void;
}

export default function ServiceDetail({ business, service, onBack }: ServiceDetailProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (serviceName: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in booking the service "${serviceName}" from ${business.name}.`)}`;

  return (
    <motion.div key="service-detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-12 md:py-24 px-6 max-w-7xl mx-auto">
        <button onClick={onBack} className="mb-12 text-slate-500 font-medium hover:text-slate-900 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Services
        </button>
        
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 lg:max-w-2xl">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm sticky top-32">
              <ImageGallery images={service.images} fallbackUrl={service.imageUrl} alt={service.name} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-8">
              {service.category && <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wide uppercase mb-6">{service.category}</span>}
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{service.name}</h1>
              <div className="text-3xl font-bold text-blue-600 mb-8">{formatPrice(service.price)}</div>
            </div>
            
            <div className="prose prose-slate prose-lg max-w-none mb-12">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Service Overview</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{service.description || 'No description provided.'}</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" /> Ready to get started?
              </h4>
              <a
                href={waLink(service.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold text-lg px-8 py-5 rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                Book via WhatsApp <MessageCircle className="w-6 h-6" />
              </a>
              <p className="text-center text-sm text-slate-500 mt-4">Average response time: Under 2 hours</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
