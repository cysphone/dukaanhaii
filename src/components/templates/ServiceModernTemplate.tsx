'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Camera, MessageCircle, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';

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
    category?: string | null;
    inStock: boolean;
  }>;
}

export default function ServiceModernTemplate({ business, products }: TemplateProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi! I'm interested in your service: "${productName}".`
        : `Hi! I'd like to know more about your services.`
    )}`;

  const primaryColor = business.primaryColor || '#0f172a'; // slate-900
  const secondaryColor = business.secondaryColor || '#f8fafc'; // slate-50

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-xl font-bold tracking-tight" style={{ color: primaryColor }}>
                {business.name}
              </span>
            )}
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            {products.length > 0 && <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>}
            {business.about && <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>}
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
          {waNumber && (
            <a
              href={waLink()}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
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
              <a href="#services" className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center">
                View Services
              </a>
            )}
          </div>
        </motion.div>
        
        {/* Hero Image / Banner */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full"
        >
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
        </motion.div>
      </section>

      {/* Services Grid (Mapped from Products) */}
      {products.length > 0 && (
        <section id="services" className="py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <span className="text-sm font-bold uppercase tracking-wider mb-3 block" style={{ color: primaryColor }}>What We Do</span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Core Services</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Comprehensive solutions designed to elevate your business and solve your most complex challenges.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((service, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={service.id} 
                  className="group rounded-3xl p-8 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110 duration-500 bg-white" style={{ color: primaryColor }}>
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.name}</h3>
                  {service.description && (
                    <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{service.description}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-200/60">
                    <span className="font-semibold text-lg text-slate-900">{formatPrice(service.price)}</span>
                    <a href={getProductUrl(business.slug, service.id)} className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" style={{ color: primaryColor }}>
                      Learn more <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Mission */}
      {(business.about || business.mission || business.vision) && (
        <section id="about" className="py-32 bg-slate-900 text-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
             <div className="space-y-8">
                {business.about && (
                  <div>
                    <span className="text-sm font-bold uppercase tracking-wider mb-3 block text-blue-400">Our Story</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">About Us</h2>
                    <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">{business.about}</p>
                  </div>
                )}
             </div>
             <div className="space-y-6">
                {business.mission && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">🎯</div>
                      Our Mission
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{business.mission}</p>
                  </motion.div>
                )}
                {business.vision && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">✨</div>
                      Our Vision
                    </h3>
                    <p className="text-slate-300 leading-relaxed">{business.vision}</p>
                  </motion.div>
                )}
             </div>
          </div>
        </section>
      )}

      {/* Footer / Contact */}
      <footer id="contact" className="bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
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
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4 text-slate-600">
              {business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="flex items-center gap-3 hover:text-blue-600 transition-colors font-medium">
                    <Mail className="w-5 h-5 text-slate-400" /> {business.email}
                  </a>
                </li>
              )}
              {business.phoneNumber && (
                <li>
                  <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-3 hover:text-blue-600 transition-colors font-medium">
                    <Phone className="w-5 h-5 text-slate-400" /> {business.phoneNumber}
                  </a>
                </li>
              )}
              {business.location && (
                <li className="flex items-start gap-3 font-medium">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-slate-400" /> <span>{business.location}</span>
                </li>
              )}
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
