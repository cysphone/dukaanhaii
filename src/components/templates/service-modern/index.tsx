'use client';

import { useState } from 'react';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { ServiceModernTemplateProps, PageType } from './types';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetail from './pages/ServiceDetail';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function ServiceModernTemplate({ business, products }: ServiceModernTemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
  const [activePage, setActivePage] = useState<PageType>('home');
  const [selectedService, setSelectedService] = useState<ServiceModernTemplateProps['products'][0] | null>(null);

  const navigateTo = (page: PageType) => {
    setActivePage(page);
    setSelectedService(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showService = (service: ServiceModernTemplateProps['products'][0]) => {
    setSelectedService(service);
    setActivePage('service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200 selection:text-blue-900 flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-10 object-contain" />
            ) : (
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {business.name.charAt(0)}
              </div>
            )}
            <span className="font-extrabold text-xl tracking-tight">{business.name}</span>
          </button>
          
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <button onClick={() => navigateTo('home')} className={`${activePage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Home</button>
            <button onClick={() => navigateTo('services')} className={`${activePage === 'services' || activePage === 'service' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Services</button>
            <button onClick={() => navigateTo('about')} className={`${activePage === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>About</button>
            <button onClick={() => navigateTo('contact')} className={`${activePage === 'contact' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'} transition-colors`}>Contact</button>
            
            {business.whatsappNumber && (
              <a 
                href={`https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors ml-4"
              >
                Let's Talk
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage business={business} products={products} onNavigate={navigateTo} onServiceClick={showService} />}
          {activePage === 'services' && <ServicesPage products={products} onServiceClick={showService} />}
          {activePage === 'service' && selectedService && <ServiceDetail business={business} service={selectedService} onBack={() => navigateTo('services')} />}
          {activePage === 'about' && <AboutPage business={business} />}
          {activePage === 'contact' && <ContactPage business={business} />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 mt-auto">
        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {business.logoUrl ? (
                  <img src={business.logoUrl} alt={business.name} className="h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    {business.name.charAt(0)}
                  </div>
                )}
                <span className="font-extrabold text-xl tracking-tight">{business.name}</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                {business.footerText || "Delivering exceptional services and solutions tailored to your unique business needs."}
              </p>
            </div>
            
            <div className="flex gap-4 md:justify-end">
              {business.instagramUrl && (
                <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  IG
                </a>
              )}
              {business.facebookUrl && (
                <a href={business.facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  FB
                </a>
              )}
              {business.websiteUrl && (
                <a href={business.websiteUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
            <p className="flex items-center gap-1">
              Powered by <a href="/" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">DukaanHai</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
