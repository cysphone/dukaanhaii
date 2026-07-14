'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Camera, MessageCircle, Globe, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface TemplateProps {
  business: {
    name: string;
    slug: string;
    headline?: string | null;
    tagline?: string | null;
    about?: string | null;
    vision?: string | null;
    mission?: string | null;
    marketingDesc?: string | null;
    whatsappNumber?: string | null;
    location?: string | null;
    category?: string | null;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    faviconUrl?: string | null;
    ctaText?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    instagramUrl?: string | null;
    facebookUrl?: string | null;
    websiteUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    footerText?: string | null;
    copyrightText?: string | null;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    images?: string[];
    category?: string | null;
    inStock: boolean;
  }>;
}

const ImageGallery = ({ images, fallbackUrl, alt, primaryColor }: { images?: string[], fallbackUrl?: string | null, alt: string, primaryColor: string }) => {
  const allImages = images && images.length > 0 ? images : fallbackUrl ? [fallbackUrl] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="w-full h-full rounded-2xl flex items-center justify-center bg-slate-100/50">
        <ImageIcon className="w-12 h-12 text-slate-300" />
      </div>
    );
  }

  if (allImages.length === 1) {
    return (
      <img src={allImages[0]} alt={alt} className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out" />
    );
  }

  return (
    <div className="relative w-full h-full group/gallery rounded-2xl overflow-hidden">
      <img src={allImages[currentIndex]} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity bg-black/10">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); }}
          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-slate-800 hover:bg-white shadow-md hover:scale-110 transition-transform"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); }}
          className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-slate-800 hover:bg-white shadow-md hover:scale-110 transition-transform"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {allImages.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default function ServiceModernTemplate({ business, products }: TemplateProps) {
  const [activePage, setActivePage] = useState<'home' | 'services' | 'about' | 'contact' | 'serviceDetail'>('home');
  const [selectedService, setSelectedService] = useState<TemplateProps['products'][0] | null>(null);

  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi! I'm interested in your service: "${productName}".`
        : `Hi! I'd like to know more about your services.`
    )}`;

  const primaryColor = business.primaryColor || '#0f172a'; // slate-900

  const handleServiceClick = (e: React.MouseEvent, service: TemplateProps['products'][0]) => {
    e.preventDefault();
    setSelectedService(service);
    setActivePage('serviceDetail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLink = ({ page, label }: { page: typeof activePage, label: string }) => (
    <button 
      onClick={() => { setActivePage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`hover:text-slate-900 transition-colors ${activePage === page ? 'text-slate-900 font-semibold' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200 flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setActivePage('home')} className="flex items-center gap-3 text-left">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-xl font-bold tracking-tight" style={{ color: primaryColor }}>
                {business.name}
              </span>
            )}
          </button>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <NavLink page="home" label="Home" />
            {products.length > 0 && <NavLink page="services" label="Services" />}
            {business.about && <NavLink page="about" label="About Us" />}
            <NavLink page="contact" label="Contact" />
          </div>
          {waNumber && (
            <a
              href={waLink(selectedService?.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-white text-sm font-medium transition-transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              {business.ctaText || "Get a Quote"}
            </a>
          )}
        </div>
      </nav>

      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              {/* Hero Section */}
              <section className="pt-20 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8 text-center lg:text-left">
                  {business.tagline && (
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-sm font-medium tracking-wide uppercase" style={{ color: primaryColor }}>
                      {business.tagline}
                    </span>
                  )}
                  <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                    {business.headline || `Expert services by ${business.name}`}
                  </h1>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    {business.marketingDesc || "We provide top-notch services tailored to your specific needs. Discover how we can help you achieve your goals today."}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                    {waNumber && (
                      <a
                        href={waLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-4 rounded-full text-white font-semibold flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-black/5"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {business.ctaText || "Book a Consultation"} <ArrowRight className="w-5 h-5" />
                      </a>
                    )}
                    {products.length > 0 && (
                      <button onClick={() => { setActivePage('services'); window.scrollTo({ top: 0 }); }} className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center">
                        View Services
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Hero Image / Banner */}
                <div className="flex-1 w-full">
                  {business.bannerUrl ? (
                     <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                       <img src={business.bannerUrl} alt="Hero" className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                     </div>
                  ) : (
                    <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100 flex items-center justify-center ring-1 ring-black/5">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #94a3b8 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        <div className="text-center p-8 relative z-10">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Globe className="w-10 h-10 text-slate-300" />
                          </div>
                          <h2 className="text-3xl font-bold text-slate-800">Your Future Awaits</h2>
                          <p className="text-slate-500 mt-4 max-w-sm">Upload a banner image in your dashboard to make this section stand out.</p>
                        </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Featured Services */}
              {products.length > 0 && (
                <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                      <div>
                        <span className="text-sm font-bold uppercase tracking-wider mb-3 block" style={{ color: primaryColor }}>What We Do</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Our Core Services</h2>
                      </div>
                      <button onClick={() => { setActivePage('services'); window.scrollTo({ top: 0 }); }} className="text-slate-600 font-semibold hover:text-slate-900 flex items-center gap-2 transition-colors">
                        View All Services <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {products.slice(0, 3).map((service, idx) => {
                        const hasImages = (service.images && service.images.length > 0) || !!service.imageUrl;
                        return (
                          <div 
                            key={service.id} 
                            onClick={(e) => handleServiceClick(e, service)}
                            className="group rounded-3xl p-6 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col cursor-pointer"
                          >
                            {hasImages ? (
                              <div className="w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden relative">
                                <ImageGallery images={service.images} fallbackUrl={service.imageUrl} alt={service.name} primaryColor={primaryColor} />
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 duration-500 bg-white" style={{ color: primaryColor }}>
                                <CheckCircle2 className="w-7 h-7" />
                              </div>
                            )}
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                            {service.description && (
                              <p className="text-slate-600 leading-relaxed mb-8 flex-grow line-clamp-3">{service.description}</p>
                            )}
                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200/60">
                              <span className="font-semibold text-lg text-slate-900">{formatPrice(service.price)}</span>
                              <span className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: primaryColor }}>
                                Learn more <ArrowRight className="w-4 h-4" />
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {/* ALL SERVICES PAGE */}
          {activePage === 'services' && (
            <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <section className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">All Services</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive solutions designed to elevate your business.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((service) => {
                      const hasImages = (service.images && service.images.length > 0) || !!service.imageUrl;
                      return (
                        <div 
                          key={service.id} 
                          onClick={(e) => handleServiceClick(e, service)}
                          className="group rounded-3xl p-6 bg-white hover:bg-slate-50 border border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col cursor-pointer"
                        >
                          {hasImages ? (
                            <div className="w-full aspect-[4/3] mb-6 rounded-2xl overflow-hidden relative">
                              <ImageGallery images={service.images} fallbackUrl={service.imageUrl} alt={service.name} primaryColor={primaryColor} />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 duration-500 bg-slate-100" style={{ color: primaryColor }}>
                              <CheckCircle2 className="w-7 h-7" />
                            </div>
                          )}
                          <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                          {service.description && (
                            <p className="text-slate-600 leading-relaxed mb-8 flex-grow line-clamp-3">{service.description}</p>
                          )}
                          <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                            <span className="font-semibold text-lg text-slate-900">{formatPrice(service.price)}</span>
                            <span className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: primaryColor }}>
                              Learn more <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* SERVICE DETAIL PAGE */}
          {activePage === 'serviceDetail' && selectedService && (
            <motion.div key="serviceDetail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <button onClick={() => setActivePage('services')} className="mb-10 text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to Services
                </button>
                <div className="flex flex-col lg:flex-row gap-16">
                  <div className="flex-1 w-full lg:max-w-xl">
                    <div className="aspect-[4/3] md:aspect-square bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 p-2 border border-slate-100">
                      {((selectedService.images && selectedService.images.length > 0) || !!selectedService.imageUrl) ? (
                        <ImageGallery images={selectedService.images} fallbackUrl={selectedService.imageUrl} alt={selectedService.name} primaryColor={primaryColor} />
                      ) : (
                        <div className="w-full h-full rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-slate-300">
                           <CheckCircle2 className="w-20 h-20 mb-4 stroke-[1.5]" />
                           <span className="text-slate-400 font-medium">Service Detail</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 space-y-8 py-4">
                    <div>
                      {selectedService.category && <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">{selectedService.category}</span>}
                      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{selectedService.name}</h1>
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-slate-100 border border-slate-200">
                        <span className="text-2xl font-bold text-slate-900">{formatPrice(selectedService.price)}</span>
                      </div>
                    </div>
                    {selectedService.description && (
                      <div className="prose prose-slate prose-lg max-w-none">
                        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedService.description}</p>
                      </div>
                    )}
                    <div className="pt-8 mt-8 border-t border-slate-200">
                      <a
                        href={waLink(selectedService.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 text-white font-semibold px-10 py-5 rounded-2xl hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-300/50 transition-all text-lg"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Book this Service <MessageCircle className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ABOUT PAGE */}
          {activePage === 'about' && (business.about || business.mission || business.vision) && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <section className="py-32 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[70vh] flex items-center">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">
                   <div className="space-y-8">
                      {business.about && (
                        <div>
                          <span className="text-sm font-bold uppercase tracking-wider mb-3 block text-blue-400">Our Story</span>
                          <h2 className="text-4xl md:text-6xl font-bold mb-8">About Us</h2>
                          <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{business.about}</p>
                        </div>
                      )}
                   </div>
                   <div className="space-y-6 pt-10 lg:pt-0">
                      {business.mission && (
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">🎯</div>
                            Our Mission
                          </h3>
                          <p className="text-slate-300 leading-relaxed">{business.mission}</p>
                        </div>
                      )}
                      {business.vision && (
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">✨</div>
                            Our Vision
                          </h3>
                          <p className="text-slate-300 leading-relaxed">{business.vision}</p>
                        </div>
                      )}
                   </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
                <span className="text-sm font-bold uppercase tracking-wider mb-3 block" style={{ color: primaryColor }}>Get in Touch</span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-slate-900">Let's Connect</h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">Ready to start your next project? Reach out to us and let's make it happen.</p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <Mail className="w-7 h-7 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Email Us</h4>
                        <span className="font-medium text-slate-600">{business.email}</span>
                      </div>
                    </a>
                  )}
                  {business.phoneNumber && (
                    <a href={`tel:${business.phoneNumber}`} className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <Phone className="w-7 h-7 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
                        <span className="font-medium text-slate-600">{business.phoneNumber}</span>
                      </div>
                    </a>
                  )}
                  {business.location && (
                    <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white border border-slate-200">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Visit Us</h4>
                        <span className="font-medium text-slate-600 text-center inline-block">{business.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 mt-auto border-t border-slate-200">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {business.logoUrl ? (
                <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300" />
              ) : (
                <span className="text-2xl font-bold tracking-tight text-slate-900">{business.name}</span>
              )}
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-8">
              {business.footerText || "Empowering your business with exceptional services. Contact us today to start your journey towards excellence."}
            </p>
            <div className="flex gap-3">
              {business.facebookUrl && (
                <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
              )}
              {business.instagramUrl && (
                <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-600 hover:text-white transition-all">
                  <Camera className="w-5 h-5" />
                </a>
              )}
              {business.websiteUrl && (
                <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
                  <Globe className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li><button onClick={() => { setActivePage('home'); window.scrollTo({ top: 0 }); }} className="hover:text-blue-600 transition-colors">Home</button></li>
              {products.length > 0 && <li><button onClick={() => { setActivePage('services'); window.scrollTo({ top: 0 }); }} className="hover:text-blue-600 transition-colors">Services</button></li>}
              {business.about && <li><button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0 }); }} className="hover:text-blue-600 transition-colors">About Us</button></li>}
              <li><button onClick={() => { setActivePage('contact'); window.scrollTo({ top: 0 }); }} className="hover:text-blue-600 transition-colors">Contact</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
          <p className="flex items-center gap-1">
            Powered by <a href="/" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">DukaanHai</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
