'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, ArrowRight, Camera, MessageCircle, Globe, MapPin, Clock, ChefHat, GlassWater } from 'lucide-react';

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

export default function EcommerceFoodMenuTemplate({ business, products }: TemplateProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I would like to place an order for "${productName}" from ${business.name}.`
                : `I'd like to place an order at ${business.name}.`
        )}`;

    const accentColor = business.primaryColor || '#e11d48'; // rose-600

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1a1a1a] font-sans selection:bg-[#e11d48] selection:text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
              .menu-display { font-family: 'DM Serif Display', serif; }
              .menu-body { font-family: 'Inter', sans-serif; }
              .noise-overlay {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                opacity: 0.03;
                pointer-events: none;
                position: fixed;
                inset: 0;
                z-index: 100;
              }
            `}</style>
            
            <div className="noise-overlay"></div>

            {/* Elegant Navigation */}
            <nav className="fixed w-full top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#e11d48]/10 transition-all duration-300">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex-1 hidden md:flex items-center gap-8 menu-body text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                        {products.length > 0 && <a href="#menu" className="hover:text-[#e11d48] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#e11d48] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Menu</a>}
                        {(business.about || business.vision) && <a href="#story" className="hover:text-[#e11d48] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-px after:bg-[#e11d48] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Our Story</a>}
                    </div>

                    <div className="menu-display text-2xl md:text-3xl font-normal tracking-tight text-center flex-1 shrink-0">
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain mx-auto" /> : business.name}
                    </div>

                    <div className="flex-1 flex justify-end gap-6 menu-body text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                        {waNumber && (
                            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#e11d48] hover:opacity-80 transition-opacity">
                                <UtensilsCrossed className="w-4 h-4" />
                                <span className="hidden sm:inline">Reservation / Order</span>
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero / Cover */}
            <section className="relative px-6 min-h-[90vh] flex flex-col justify-center items-center text-center pt-24 border-b-[16px] border-[#e11d48] bg-white overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
                    <UtensilsCrossed className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] text-[#e11d48] rotate-12" />
                </div>
                
                {business.bannerUrl && (
                  <div className="absolute inset-0 z-0">
                     <img src={business.bannerUrl} alt="Restaurant ambiance" className="w-full h-full object-cover opacity-15 grayscale filter contrast-125" />
                     <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white"></div>
                  </div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center"
                >
                    <div className="flex items-center justify-center gap-4 text-gray-400 mb-10 w-full">
                        <span className="h-px bg-gray-300 flex-1 max-w-[100px]"></span>
                        <span className="menu-body text-[10px] font-bold uppercase tracking-[0.3em] whitespace-nowrap text-[#e11d48]">
                           {business.category || 'FINE DINING & EXCELLENCE'}
                        </span>
                        <span className="h-px bg-gray-300 flex-1 max-w-[100px]"></span>
                    </div>

                    <h1 className="menu-display text-6xl md:text-8xl lg:text-[7rem] text-[#1a1a1a] leading-[0.9] mb-8">
                        {business.name}
                    </h1>

                    <h2 className="menu-display italic text-2xl md:text-4xl text-[#e11d48] max-w-2xl mx-auto leading-relaxed mb-12">
                        {business.headline || business.tagline || 'Savor the art of culinary excellence.'}
                    </h2>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: accentColor }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-3 bg-[#e11d48] text-white menu-body text-xs font-semibold uppercase tracking-[0.2em] px-10 py-5 hover:bg-[#be123c] transition-colors shadow-xl shadow-[#e11d48]/20 group"
                        >
                            {business.ctaText || 'Place an Order'}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    )}
                </motion.div>
            </section>

            {/* Story */}
            {(business.about || business.vision || business.marketingDesc) && (
                <section id="story" className="py-32 px-6 max-w-4xl mx-auto text-center relative">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                    >
                      <ChefHat className="w-12 h-12 mx-auto text-[#e11d48] mb-8 opacity-80 stroke-[1.5]" />
                      <h3 className="menu-display text-4xl md:text-5xl mb-10 text-[#1a1a1a]">Our Philosophy</h3>
                      
                      {business.marketingDesc && (
                         <h4 className="menu-display text-2xl md:text-3xl text-gray-500 italic mb-8 leading-relaxed">
                            "{business.marketingDesc}"
                         </h4>
                      )}
                      
                      {business.about && (
                        <p className="menu-body text-lg md:text-xl text-gray-600 font-light leading-[1.8] mb-12 max-w-3xl mx-auto">
                            {business.about}
                        </p>
                      )}
                      
                      {business.mission && (
                         <div className="mt-12 pt-12 border-t border-gray-200">
                           <span className="menu-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#e11d48] mb-4 block">Our Mission</span>
                           <p className="menu-body text-base text-gray-500 font-light max-w-2xl mx-auto">
                              {business.mission}
                           </p>
                         </div>
                      )}
                    </motion.div>
                </section>
            )}

            {/* The Menu (List Based) */}
            {products.length > 0 && (
                <section id="menu" className="py-32 px-6 bg-[#FCFAFA] border-t border-gray-100">
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          className="text-center mb-24"
                        >
                            <span className="menu-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#e11d48] mb-4 block">À la carte</span>
                            <h2 className="menu-display text-5xl md:text-6xl text-[#1a1a1a]">The Menu</h2>
                            <div className="w-16 h-1 bg-[#e11d48] mx-auto mt-8"></div>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-x-20 gap-y-16">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 20 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                                  key={product.id} 
                                  className="group flex flex-col items-start text-left relative"
                                >
                                    {/* Category Marker if exists */}
                                    {product.category && (
                                       <span className="menu-body text-[9px] font-bold uppercase tracking-[0.2em] text-[#e11d48] mb-3 block">
                                          {product.category}
                                       </span>
                                    )}

                                    <div className="w-full flex justify-between items-baseline mb-3 gap-4">
                                        <h3 className="menu-display text-2xl text-[#1a1a1a] group-hover:text-[#e11d48] transition-colors bg-[#FCFAFA] pr-4 z-10">{product.name}</h3>
                                        <div className="flex-1 border-b-[2px] border-dotted border-gray-300 hidden sm:block translate-y-[-6px]"></div>
                                        <span className="menu-body font-semibold text-lg text-[#1a1a1a] bg-[#FCFAFA] pl-4 z-10">{formatPrice(product.price)}</span>
                                    </div>

                                    {product.description && (
                                        <p className="menu-body text-sm text-gray-500 font-light leading-[1.8] mb-5 w-[90%]">
                                            {product.description}
                                        </p>
                                    )}

                                    <div className="mt-auto flex items-center justify-between w-full border-b border-transparent group-hover:border-[#e11d48]/20 pb-4 transition-colors">
                                       <a 
                                         href={getProductUrl(business.slug, product.id)} 
                                         className="menu-body text-[10px] font-bold uppercase tracking-widest text-[#e11d48] hover:text-[#1a1a1a] transition-colors flex items-center gap-2 group/btn"
                                       >
                                           Select Item <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                       </a>
                                       {!product.inStock && (
                                          <span className="menu-body text-[9px] font-semibold uppercase tracking-widest text-red-500 border border-red-200 bg-red-50 px-2 py-1">Sold Out</span>
                                       )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-32 text-center flex flex-col items-center">
                           <GlassWater className="w-8 h-8 text-gray-300 mb-6" />
                           <p className="menu-body text-xs font-medium uppercase tracking-[0.2em] text-gray-400 max-w-sm leading-relaxed">
                              Please inform your server of any allergies or dietary requirements before ordering.
                           </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer Info */}
            <footer className="bg-[#1a1a1a] text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e11d48] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 opacity-10 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center md:text-left mb-24 relative z-10">
                   <div className="flex flex-col items-center md:items-start">
                       <h2 className="menu-display text-4xl mb-6 text-[#FDFBF7]">{business.name}</h2>
                       <p className="menu-body text-sm text-gray-400 font-light leading-relaxed mb-8 max-w-xs">
                          {business.footerText || "An unforgettable culinary journey awaits. Reserve your table today."}
                       </p>
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#e11d48] hover:bg-[#e11d48] transition-all">
                               <Camera className="w-4 h-4" />
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#e11d48] hover:bg-[#e11d48] transition-all">
                               <MessageCircle className="w-4 h-4" />
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-[#e11d48] hover:bg-[#e11d48] transition-all">
                               <Globe className="w-4 h-4" />
                             </a>
                           )}
                       </div>
                   </div>

                   <div className="flex flex-col items-center md:items-start">
                       <h4 className="menu-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#e11d48] mb-6">Location</h4>
                       <div className="menu-body text-sm text-gray-400 font-light leading-loose flex flex-col items-center md:items-start gap-4">
                           {business.location && (
                             <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 shrink-0 mt-1" />
                                <span>{business.location}</span>
                             </div>
                           )}
                           <div className="flex items-start gap-3">
                              <Clock className="w-5 h-5 text-gray-500 shrink-0 mt-1" />
                              <span>Mon-Sun<br/>8:00 AM - 10:00 PM</span>
                           </div>
                       </div>
                   </div>

                   <div className="flex flex-col items-center md:items-start">
                       <h4 className="menu-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#e11d48] mb-6">Contact</h4>
                       <ul className="menu-body text-sm text-gray-400 font-light leading-loose space-y-3">
                           {business.phoneNumber && (
                             <li><a href={`tel:${business.phoneNumber}`} className="hover:text-white transition-colors">{business.phoneNumber}</a></li>
                           )}
                           {business.email && (
                             <li><a href={`mailto:${business.email}`} className="hover:text-white transition-colors">{business.email}</a></li>
                           )}
                           {waNumber && (
                             <li><a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Reservations</a></li>
                           )}
                       </ul>
                   </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 menu-body text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>
                        <a href="/" className="hover:text-white transition-colors flex items-center gap-2">
                          Powered by <span className="text-[#e11d48] font-bold">DukaanHai</span>
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
