'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, ArrowRight, Camera, MessageCircle, Globe, Flame, Zap, Plus, X, MapPin, Mail } from 'lucide-react';

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

export default function EcommerceClothingStreetTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Yo! I need to cop that "${productName}" from ${business.name}.`
                : `Yo! Need info on ${business.name} drops.`
        )}`;

    const accentColor = business.primaryColor || '#facc15'; // yellow-400

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#facc15] selection:text-black overflow-hidden relative">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
              .street-display { font-family: 'Syne', sans-serif; }
              .street-body { font-family: 'Space Grotesk', sans-serif; }
              
              .marquee-container { overflow: hidden; white-space: nowrap; }
              .marquee-content { display: inline-block; animation: marquee 15s linear infinite; }
              @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              
              .noise-bg {
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                pointer-events: none;
                z-index: 50;
                opacity: 0.05;
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
              }
            `}</style>

            <div className="noise-bg"></div>

            {/* Marquee Top */}
            <div className="bg-[#facc15] text-black py-2.5 street-display text-sm font-bold uppercase tracking-widest marquee-container border-b-4 border-black relative z-50">
                <div className="marquee-content whitespace-nowrap">
                    {Array(15).fill(`${(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'ecommerce')) || 'LATEST DROP NOW LIVE'} /// `).join('')}
                </div>
            </div>

            {/* Hardcore Nav */}
            <nav className="border-b-4 border-white p-6 flex justify-between items-center z-40 relative bg-black">
                <div className="street-display text-3xl font-extrabold uppercase tracking-tighter mix-blend-difference flex items-center gap-3">
                  <Flame className="w-8 h-8 text-[#facc15] fill-[#facc15]" />
                  {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                </div>
                
                <div className="hidden lg:flex items-center gap-8 street-body font-bold text-sm uppercase tracking-widest">
                   {products.length > 0 && <a href="#vault" className="hover:text-[#facc15] transition-colors">The Vault</a>}
                   {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && <a href="#manifesto" className="hover:text-[#facc15] transition-colors">Manifesto</a>}
                </div>

                {waNumber && (
                    <a 
                      href={waLink()} 
                      style={{ backgroundColor: accentColor, color: 'black' }} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="street-body font-bold text-sm uppercase px-6 py-3 border-2 border-transparent hover:border-white hover:bg-black hover:text-white transition-all flex items-center gap-2 group"
                    >
                        <Zap className="w-4 h-4 group-hover:fill-white" /> Hit Us Up
                    </a>
                )}
            </nav>

            {/* Hero */}
            <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-20 border-b-4 border-white overflow-hidden">
                {/* Background Graphics */}
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'clothing')) ? (
                  <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
                    <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'clothing'))} alt="Campaign" className="w-full h-full object-cover opacity-40 filter contrast-125 grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  </motion.div>
                ) : (
                  <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-20">
                     <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rotate-45 mix-blend-overlay"></div>
                     <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border-[20px] border-[#facc15] rotate-12 mix-blend-overlay"></div>
                  </motion.div>
                )}

                <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <span className="street-body inline-block bg-white text-black font-extrabold px-4 py-1 text-sm uppercase tracking-[0.3em] mb-8 -rotate-2 border-2 border-black shadow-[4px_4px_0_#facc15]">
                          {business.category || 'UNDERGROUND ARCHIVE'}
                      </span>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="street-display text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-white mb-8"
                    >
                        {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}
                    </motion.h1>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="flex flex-wrap items-center gap-6"
                    >
                      <p className="street-body text-lg md:text-xl font-bold bg-[#facc15] text-black inline-block px-6 py-3 border-2 border-white">
                          EST. 2024 // WORLDWIDE
                      </p>
                      
                      {products.length > 0 && (
                        <a href="#vault" className="street-body text-lg md:text-xl font-bold bg-transparent text-white border-2 border-white inline-flex items-center gap-3 px-6 py-3 hover:bg-white hover:text-black transition-colors group">
                           BROWSE ARCHIVE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </motion.div>
                </div>

                {/* Animated Badge */}
                <div className="absolute bottom-10 right-10 w-40 h-40 hidden lg:flex items-center justify-center animate-[spin_10s_linear_infinite] z-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                        <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                        <text className="street-body text-[14px] font-bold uppercase tracking-widest" fill="currentColor">
                            <textPath href="#curve" startOffset="0%">• {business.name} • EXCLUSIVE DROPS • NO RESTOCKS </textPath>
                        </text>
                    </svg>
                </div>
            </section>

            {/* Grid Products */}
            {products.length > 0 && (
                <section id="vault" className="py-24 border-b-4 border-white bg-black relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_20px)] pointer-events-none"></div>

                    <div className="px-6 lg:px-20 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
                        <h2 className="street-display text-6xl md:text-8xl uppercase text-white tracking-tighter leading-none">
                           THE VAULT
                        </h2>
                        <div className="street-body font-bold text-xl text-[#facc15] border-b-2 border-[#facc15] pb-1">
                           [{products.length}] ITEMS FOUND
                        </div>
                    </div>

                    <div className="w-full border-y-4 border-white relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y-4 md:divide-y-0 md:divide-x-4 divide-white">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: 1 }}
                                  viewport={{ once: true, margin: "-100px" }}
                                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                                  key={product.id} 
                                  className="group relative bg-black flex flex-col h-full hover:bg-white transition-colors duration-300"
                                >
                                    <div className="aspect-[4/5] bg-zinc-900 border-b-4 border-white p-6 relative overflow-hidden">
                                        {product.imageUrl ? (
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 group-hover:scale-110 transition-all duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/20">
                                               <X className="w-16 h-16 text-white/20 mb-4" />
                                               <span className="street-body font-bold text-white/20 uppercase tracking-widest">NO_IMG</span>
                                            </div>
                                        )}
                                        
                                        <div className="absolute top-4 right-4 bg-[#facc15] text-black street-body font-extrabold px-4 py-2 text-lg border-4 border-black rotate-3 group-hover:-rotate-3 transition-transform shadow-[4px_4px_0_rgba(255,255,255,1)] group-hover:shadow-[4px_4px_0_rgba(0,0,0,1)] z-10">
                                            {formatPrice(product.price)}
                                        </div>
                                        
                                        {!product.inStock && (
                                           <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-20">
                                              <span className="street-display text-4xl text-red-500 uppercase tracking-tighter border-4 border-red-500 px-6 py-2 -rotate-12 bg-black">SOLD OUT</span>
                                           </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col group-hover:text-black">
                                        {product.category && (
                                           <span className="street-body text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
                                              // {product.category}
                                           </span>
                                        )}
                                        <h3 className="street-display text-3xl uppercase tracking-tighter mb-4 leading-[1.1]">{product.name}</h3>
                                        
                                        {product.description && (
                                            <p className="street-body text-base text-gray-400 group-hover:text-gray-700 font-medium mb-8 line-clamp-3">
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto pt-6 border-t-2 border-white/20 group-hover:border-black/20">
                                            <a 
                                              href={getProductUrl(business.slug, product.id)} 
                                              className="flex items-center justify-between w-full border-4 border-white group-hover:border-black text-white group-hover:bg-black group-hover:text-white street-body font-bold uppercase px-6 py-4 transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_#facc15]"
                                            >
                                                <span>SECURE ITEM</span>
                                                <Plus className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Brutalist About */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission || business.vision || business.marketingDesc) && (
                <section id="manifesto" className="py-32 px-6 lg:px-20 bg-white text-black border-b-4 border-black relative overflow-hidden">
                    <motion.div style={{ y: y2 }} className="absolute right-0 top-0 opacity-10 pointer-events-none">
                       <h2 className="street-display text-[20rem] leading-none uppercase tracking-tighter select-none">MANIFESTO</h2>
                    </motion.div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        {business.marketingDesc && (
                           <div className="mb-24 bg-black text-white p-8 md:p-12 border-l-8 border-[#facc15] shadow-[10px_10px_0_#facc15] max-w-4xl">
                              <h3 className="street-display text-4xl md:text-5xl uppercase tracking-tighter leading-none">
                                "{business.marketingDesc}"
                              </h3>
                           </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
                            <div className="w-full md:w-1/2">
                                <h2 className="street-display text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-8">THE LOGIC.</h2>
                                <div className="w-full h-4 bg-black mb-10"></div>
                                {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) && (
                                  <p className="street-body text-2xl font-bold leading-tight mb-12">
                                      {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce'))}
                                  </p>
                                )}
                                
                                {business.mission && (
                                   <div className="border-t-4 border-black pt-8">
                                      <span className="street-body font-black uppercase tracking-widest text-sm mb-4 block text-gray-500">M.I.S.S.I.O.N</span>
                                      <p className="street-body text-xl font-bold">{business.mission}</p>
                                   </div>
                                )}
                            </div>

                            {business.vision && (
                                <motion.div 
                                  initial={{ opacity: 0, x: 50 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="w-full md:w-1/2 bg-[#facc15] text-black p-10 md:p-16 border-4 border-black shadow-[15px_15px_0_0_#000] rotate-2 hover:rotate-0 transition-transform duration-300"
                                >
                                    <span className="street-body text-red-600 font-black block mb-6 uppercase text-sm tracking-widest bg-black text-white inline-block px-4 py-2">
                                      /// V.I.S.I.O.N
                                    </span>
                                    <p className="street-display text-3xl md:text-4xl uppercase tracking-tighter leading-[1.1]">
                                        {business.vision}
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="pt-20 pb-12 px-6 lg:px-20 bg-black text-white street-body border-t-8 border-[#facc15]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                   <div className="lg:col-span-2">
                      <h2 className="street-display text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">{business.name}</h2>
                      <p className="text-gray-400 font-bold max-w-sm mb-8 text-lg">
                        {business.footerText || "Breaking the mold. Redefining the streets."}
                      </p>
                      <div className="flex gap-4">
                         {business.instagramUrl && (
                           <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white text-black border-4 border-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                             <Camera className="w-6 h-6" />
                           </a>
                         )}
                         {business.facebookUrl && (
                           <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white text-black border-4 border-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                             <MessageCircle className="w-6 h-6" />
                           </a>
                         )}
                         {business.websiteUrl && (
                           <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-white text-black border-4 border-white flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                             <Globe className="w-6 h-6" />
                           </a>
                         )}
                      </div>
                   </div>

                   <div>
                      <h4 className="street-display text-2xl uppercase tracking-tighter mb-6">INFO</h4>
                      <ul className="space-y-4 font-bold text-gray-400">
                         {business.location && (
                           <li className="uppercase tracking-widest text-sm flex items-start gap-3">
                             <MapPin className="w-5 h-5 shrink-0 text-white" /> {business.location}
                           </li>
                         )}
                         {business.email && (
                           <li className="uppercase tracking-widest text-sm flex items-center gap-3">
                             <Mail className="w-5 h-5 text-white" /> <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">{business.email}</a>
                           </li>
                         )}
                      </ul>
                   </div>

                   <div>
                      <h4 className="street-display text-2xl uppercase tracking-tighter mb-6">LEGAL</h4>
                      <ul className="space-y-4 font-bold text-gray-400">
                         <li><a href="#" className="uppercase tracking-widest text-sm hover:text-white transition-colors">TERMS OF SERVICE</a></li>
                         <li><a href="#" className="uppercase tracking-widest text-sm hover:text-white transition-colors">PRIVACY POLICY</a></li>
                         <li><a href="#" className="uppercase tracking-widest text-sm hover:text-white transition-colors">SHIPPING / RETURNS</a></li>
                      </ul>
                   </div>
                </div>

                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase tracking-widest border-t-4 border-white/20 pt-8">
                    <div className="flex gap-4 items-center">
                        <span>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}`}</span>
                    </div>
                    <div className="bg-white text-black px-4 py-2 border-2 border-white">
                        POWERED BY <a href="/" className="hover:text-red-600 transition-colors">DUKAANHAI</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
