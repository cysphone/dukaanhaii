'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Camera, MessageCircle, Globe, Mail, Phone, MapPin } from 'lucide-react';

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

export default function MinimalTemplate({ business, products }: TemplateProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi! I'm interested in ordering "${productName}" from ${business.name}.`
        : `Hi! I'd like to know more about ${business.name}.`
    )}`;

  const primaryColor = business.primaryColor || '#1c1917'; // stone-900

  return (
    <div className="min-h-screen bg-[#fafaf9] font-sans text-stone-900 selection:bg-stone-200">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full bg-[#fafaf9]/80 backdrop-blur-md z-50 border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain" />
            ) : (
              <h1 className="font-display text-2xl font-semibold tracking-tight">{business.name}</h1>
            )}
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-500 font-body">
              {products.length > 0 && <a href="#shop" className="hover:text-stone-900 transition-colors">Shop</a>}
              {business.about && <a href="#about" className="hover:text-stone-900 transition-colors">About</a>}
              <a href="#contact" className="hover:text-stone-900 transition-colors">Contact</a>
            </nav>
            {waNumber && (
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {business.ctaText || 'Contact Us'}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            {business.tagline && (
              <span className="font-body text-xs font-semibold tracking-widest text-stone-500 uppercase">
                {business.tagline}
              </span>
            )}
            <h2 className="font-display text-5xl md:text-7xl font-semibold leading-tight text-stone-900">
              {business.headline || `Welcome to ${business.name}`}
            </h2>
            <p className="font-body text-lg text-stone-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {business.marketingDesc || "Discover our curated collection of premium products."}
            </p>
            {products.length > 0 && (
              <div className="pt-4">
                <a href="#shop" className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider border-b-2 border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-[4/5] md:aspect-square bg-stone-100 overflow-hidden rounded-2xl">
              {business.bannerUrl ? (
                <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <ShoppingBag className="w-24 h-24 stroke-[1]" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section id="shop" className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <h3 className="font-display text-3xl md:text-4xl font-semibold text-stone-900">
                Latest Arrivals
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {products.map((product, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  key={product.id} 
                  className="group block"
                >
                  <a href={getProductUrl(business.slug, product.id)}>
                    <div className="aspect-[3/4] bg-[#fafaf9] overflow-hidden mb-6 relative">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <ShoppingBag className="w-12 h-12 stroke-[1]" />
                        </div>
                      )}
                      
                      {!product.inStock && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                          Sold Out
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="font-body">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">{product.name}</h4>
                        <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
                      </div>
                      {product.category && (
                        <p className="text-sm text-stone-500 capitalize">{product.category}</p>
                      )}
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About & Mission/Vision */}
      {(business.about || business.mission || business.vision) && (
        <section id="about" className="py-24 px-6 bg-stone-900 text-stone-50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-8">
              {business.about && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                  <h3 className="font-display text-3xl md:text-4xl font-semibold mb-6">Our Story</h3>
                  <p className="font-body text-stone-300 leading-relaxed text-lg font-light">{business.about}</p>
                </motion.div>
              )}
            </div>

            <div className="space-y-12">
              {business.mission && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                  <h3 className="font-display text-2xl font-semibold mb-4 text-stone-200">Our Mission</h3>
                  <p className="font-body text-stone-400 leading-relaxed font-light">{business.mission}</p>
                </motion.div>
              )}
              {business.vision && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                  <h3 className="font-display text-2xl font-semibold mb-4 text-stone-200">Our Vision</h3>
                  <p className="font-body text-stone-400 leading-relaxed font-light">{business.vision}</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer id="contact" className="bg-[#fafaf9] pt-20 pb-10 px-6 border-t border-stone-200">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 font-body">
          <div className="lg:col-span-2">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain mb-6 grayscale opacity-80" />
            ) : (
              <h2 className="font-display text-2xl font-semibold mb-6">{business.name}</h2>
            )}
            <p className="text-stone-500 max-w-sm leading-relaxed mb-6">
              {business.footerText || "Crafting experiences and delivering quality products to our customers worldwide."}
            </p>
            <div className="flex gap-4">
              {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Camera className="w-5 h-5" /></a>}
              {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><MessageCircle className="w-5 h-5" /></a>}
              {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Globe className="w-5 h-5" /></a>}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-stone-900 mb-6 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm text-stone-600">
              {business.email && (
                <li><a href={`mailto:${business.email}`} className="flex items-center gap-3 hover:text-stone-900"><Mail className="w-4 h-4" /> {business.email}</a></li>
              )}
              {business.phoneNumber && (
                <li><a href={`tel:${business.phoneNumber}`} className="flex items-center gap-3 hover:text-stone-900"><Phone className="w-4 h-4" /> {business.phoneNumber}</a></li>
              )}
              {business.location && (
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 shrink-0 mt-0.5" /> <span>{business.location}</span></li>
              )}
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-stone-500">
          <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
          <p>
            Powered by <a href="/" className="font-semibold text-stone-900 hover:underline">DukaanHai</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
