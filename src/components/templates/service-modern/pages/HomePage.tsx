'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { ServiceModernTemplateProps } from '../types';

interface HomePageProps {
  business: ServiceModernTemplateProps['business'];
  products: ServiceModernTemplateProps['products'];
  onNavigate: (page: 'services') => void;
  onServiceClick: (service: ServiceModernTemplateProps['products'][0]) => void;
}

export default function HomePage({ business, products, onNavigate, onServiceClick }: HomePageProps) {
  return (
    <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white -z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4 -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8 text-center lg:text-left">
              {business.tagline && (
                <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase">
                  {business.tagline}
                </span>
              )}
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                {business.headline || `Expert services by ${business.name}`}
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {business.marketingDesc || "We provide top-notch services tailored to your specific needs. Discover how we can help you achieve your goals today."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button 
                  onClick={() => onNavigate('services')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                >
                  {business.ctaText || 'Explore Services'} <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-2xl lg:max-w-none">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white">
                {business.bannerUrl ? (
                  <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                    <CheckCircle2 className="w-20 h-20 mb-4 stroke-[1]" />
                    <p className="font-medium">Professional Excellence</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      {products.length > 0 && (
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
                <p className="text-slate-500 text-lg">Specialized solutions for your unique requirements.</p>
              </div>
              <button onClick={() => onNavigate('services')} className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-1 group">
                View All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map(service => (
                <div key={service.id} className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer" onClick={() => onServiceClick(service)}>
                  <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden">
                    <ImageGallery images={service.images} fallbackUrl={service.imageUrl} alt={service.name} />
                  </div>
                  <div className="p-8">
                    {service.category && <span className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-2 block">{service.category}</span>}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                    <p className="text-slate-600 mb-6 line-clamp-2">{service.description || 'Professional service tailored for you.'}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                      <span className="text-lg font-bold text-slate-900">{formatPrice(service.price)}</span>
                      <span className="text-blue-600 font-medium flex items-center gap-1 text-sm">
                        View Details <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
