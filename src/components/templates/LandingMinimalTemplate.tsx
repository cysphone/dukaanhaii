'use client';

import { motion } from 'framer-motion';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { Mail, Phone, MapPin, ExternalLink, Camera, MessageCircle, Globe, CheckCircle } from 'lucide-react';

interface TemplateProps {
  business: any | {
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
  products?: Array<{
    id: string;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    category?: string | null;
    inStock: boolean;
  }>;
}

export default function LandingMinimalTemplate({ business }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in learning more about ${business.name}.`)}`;

  const primaryColor = business.primaryColor || '#000000';
  const secondaryColor = business.secondaryColor || '#ffffff';

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-200">
      
      {/* Simple Header */}
      <header className="py-6 px-6 max-w-5xl mx-auto flex justify-between items-center">
        {business.logoUrl ? (
          <img src={business.logoUrl} alt={business.name} className="h-8 object-contain" />
        ) : (
          <span className="text-xl font-semibold tracking-tight">{business.name}</span>
        )}
        
        {waNumber && (
          <a href={waLink} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline flex items-center gap-2" style={{ color: primaryColor }}>
             {business.ctaText || "Contact Us"} <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'service')) && (
            <span className="inline-block px-3 py-1 bg-slate-100 rounded-md text-sm font-medium text-slate-600">
              {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'service'))}
            </span>
          )}
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'service')) || `Welcome to ${business.name}`}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg">
            {business.marketingDesc || "We provide exceptional solutions and services. Discover how we can make a difference for you today."}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            {waNumber && (
              <a 
                href={waLink} 
                target="_blank" 
                rel="noreferrer" 
                className="px-8 py-4 rounded-xl text-white font-semibold text-center transition-all hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                style={{ backgroundColor: primaryColor }}
              >
                {business.ctaText || "Get Started"}
              </a>
            )}
            {business.email && (
              <a 
                href={`mailto:${business.email}`}
                className="px-8 py-4 rounded-xl border border-slate-200 text-slate-900 font-semibold text-center hover:bg-slate-50 transition-colors"
              >
                Email Us
              </a>
            )}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('service', '')) ? (
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('service', ''))} alt="Hero" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="relative aspect-square md:aspect-[4/5] rounded-3xl bg-slate-100 overflow-hidden flex flex-col items-center justify-center p-8 text-center border border-slate-200">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <CheckCircle className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Setup Complete</h3>
              <p className="text-slate-500">Upload a banner image in your admin dashboard to replace this placeholder.</p>
            </div>
          )}
          
          {/* Floating badge */}
          {business.category && (
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Category</p>
                  <p className="font-bold">{business.category}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

      </main>

      {/* Feature / About Section */}
      {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'service')) && (
        <section className="bg-slate-50 py-24 px-6 mt-12 border-t border-slate-100">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">About {business.name}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'service'))}</p>
          </div>
        </section>
      )}

      {/* Simple Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-slate-100">
        <div className="flex gap-4">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><Camera className="w-5 h-5" /></a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><MessageCircle className="w-5 h-5" /></a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors"><Globe className="w-5 h-5" /></a>}
        </div>
        
        <p className="text-sm text-slate-500 text-center md:text-left">
          {business.copyrightText || `© ${new Date().getFullYear()} ${business.name}.`}
        </p>
        
        <a href="/" className="text-sm font-semibold text-slate-900 hover:underline">
          Built with DukaanHai
        </a>
      </footer>
    </div>
  );
}
