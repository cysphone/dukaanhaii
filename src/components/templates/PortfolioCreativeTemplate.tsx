'use client';

import { getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Camera, MessageCircle, Globe, ArrowRight, ExternalLink } from 'lucide-react';

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

export default function PortfolioCreativeTemplate({ business, products }: TemplateProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'd like to collaborate with ${business.name}.`)}`;

  const primaryColor = business.primaryColor || '#000000';
  const secondaryColor = business.secondaryColor || '#ffffff';

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 selection:bg-neutral-200">
      {/* Navigation */}
      <nav className="fixed w-full z-50 mix-blend-difference text-white">
        <div className="max-w-screen-2xl mx-auto px-6 py-8 flex justify-between items-center">
          {business.logoUrl ? (
            <img src={business.logoUrl} alt={business.name} className="h-8 invert" />
          ) : (
            <span className="text-2xl font-bold uppercase tracking-widest">{business.name}</span>
          )}
          <div className="flex gap-6 items-center">
             <a href="#work" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">Work</a>
             <a href="#about" className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 overflow-hidden">
        {business.bannerUrl && (
          <div className="absolute inset-0 z-0">
            <img src={business.bannerUrl} alt="Background" className="w-full h-full object-cover opacity-20 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fafafa] opacity-90" />
          </div>
        )}
        
        <div className="max-w-screen-2xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {business.tagline && (
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-neutral-500 mb-6">
                {business.tagline}
              </p>
            )}
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter uppercase max-w-6xl">
              {business.headline || `Creative Studio`}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 max-w-xl"
          >
            <p className="text-lg md:text-2xl text-neutral-600 font-light leading-relaxed">
              {business.marketingDesc || "We craft digital experiences, visual identities, and creative campaigns for ambitious brands."}
            </p>
            
            {waNumber && (
              <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-4 mt-12 group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110" style={{ backgroundColor: primaryColor }}>
                  <ArrowRight className="w-6 h-6" />
                </div>
                <span className="text-xl font-medium uppercase tracking-wider">{business.ctaText || "Let's Talk"}</span>
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      {products.length > 0 && (
        <section id="work" className="py-32 px-6">
          <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-20 uppercase tracking-tighter">Selected Work.</h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-24">
              {products.map((item, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id} 
                  className={`group ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                >
                  <a href={getProductUrl(business.slug, item.id)} className="block">
                    <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-neutral-200 mb-8">
                      {item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-neutral-800 text-neutral-600">No Image</div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                        <span className="bg-white text-black px-6 py-3 rounded-full text-sm font-medium uppercase tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          View Project <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-2">{item.name}</h3>
                        {item.category && <p className="text-neutral-500 uppercase tracking-widest text-sm">{item.category}</p>}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {(business.about || business.vision) && (
        <section id="about" className="py-32 px-6 bg-neutral-900 text-white selection:bg-neutral-700">
          <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter mb-12">The<br/>Studio.</h2>
              <div className="flex gap-6">
                {business.instagramUrl && (
                  <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Camera className="w-5 h-5" />
                  </a>
                )}
                {business.facebookUrl && (
                  <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
                {business.websiteUrl && (
                  <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
            
            <div className="space-y-16">
              {business.about && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500 mb-6 border-b border-neutral-800 pb-4">Who we are</h3>
                  <p className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-300">
                    {business.about}
                  </p>
                </div>
              )}
              
              {business.vision && (
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-neutral-500 mb-6 border-b border-neutral-800 pb-4">Our Vision</h3>
                  <p className="text-xl font-light leading-relaxed text-neutral-400">
                    {business.vision}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm uppercase tracking-widest text-neutral-500">
            {business.copyrightText || `© ${new Date().getFullYear()} ${business.name}`}
          </p>
          <a href="#" className="text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:opacity-70 transition-opacity">
            {business.name}
          </a>
          <p className="text-sm uppercase tracking-widest text-neutral-500">
            Design by <a href="/" className="text-black font-medium hover:underline">DukaanHai</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
