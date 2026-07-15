'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Target, Zap, Activity, Flame, ChevronRight, Check, MapPin, Camera, MessageCircle, Globe, ArrowRight } from 'lucide-react';

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

export default function GymPowerTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I want to sign up for "${productName}" at ${business.name}.`
                : `Hey! I'm interested in joining ${business.name}.`
        )}`;

    const primaryColor = business.primaryColor || '#dc2626'; // red-600

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#dc2626] selection:text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,700;0,900;1,900&family=Teko:wght@400;500;600;700&display=swap');
              .power-display { font-family: 'Montserrat', sans-serif; text-transform: uppercase; }
              .power-body { font-family: 'Teko', sans-serif; text-transform: uppercase; letter-spacing: 0.05em; }
              
              .clip-slant { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
              .clip-slant-reverse { clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%); }
              
              .glitch-hover:hover {
                animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
              }
              
              @keyframes glitch-anim {
                0% { transform: translate(0) }
                20% { transform: translate(-2px, 2px) }
                40% { transform: translate(-2px, -2px) }
                60% { transform: translate(2px, 2px) }
                80% { transform: translate(2px, -2px) }
                100% { transform: translate(0) }
              }
              
              .grid-pattern {
                 background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                 background-size: 40px 40px;
              }
            `}</style>

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-[#050505]/90 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="power-display text-2xl font-black italic tracking-tighter text-white flex items-center gap-3">
                        <Flame className="w-8 h-8 text-[#dc2626]" />
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-10 power-body text-2xl tracking-widest text-zinc-400">
                        {products.length > 0 && <a href="#plans" className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">TRAINING PLANS</a>}
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission) && <a href="#grind" className="hover:text-white hover:text-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all">THE GRIND</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: primaryColor }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="power-body text-xl font-bold tracking-widest px-8 py-2 skew-x-[-15deg] hover:bg-white hover:text-black transition-all group border-2 border-transparent hover:border-black"
                        >
                            <span className="block skew-x-[15deg] flex items-center gap-2">
                               {business.ctaText || 'JOIN THE PACK'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 border-b-8 border-[#dc2626] clip-slant bg-[#111] overflow-hidden min-h-[95vh] flex items-center">
                <div className="absolute inset-0 grid-pattern opacity-50 z-0"></div>
                <div className="absolute inset-0 opacity-10 z-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                
                {/* Background Banner */}
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('gym', '')) && (
                  <div className="absolute inset-0 z-0">
                     <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('gym', ''))} alt="Gym Intensity" className="w-full h-full object-cover opacity-40 grayscale contrast-150 mix-blend-overlay" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-[#111]/40"></div>
                  </div>
                )}
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dc2626] rounded-full filter blur-[150px] opacity-20 pointer-events-none z-0"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full flex flex-col items-center text-center mt-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                    >
                        <div className="power-body text-[#dc2626] text-2xl md:text-3xl tracking-[0.2em] mb-4 flex items-center justify-center gap-4">
                            <span className="w-12 h-1 bg-[#dc2626]"></span>
                            {business.category || 'ELITE TRAINING FACILITY'}
                            <span className="w-12 h-1 bg-[#dc2626]"></span>
                        </div>
                        
                        <h1 className="power-display text-7xl md:text-[8rem] lg:text-[10rem] italic font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tracking-tighter leading-[0.85] mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] px-4">
                            {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'gym')) || business.name}
                        </h1>
                        
                        <p className="power-display font-black italic text-zinc-400 text-xl md:text-3xl max-w-4xl mx-auto tracking-widest mb-16 px-4">
                            {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'gym')) || 'UNLEASH YOUR ULTIMATE POWER'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center power-body">
                            {waNumber && (
                                <a 
                                  href={waLink()} 
                                  style={{ backgroundColor: primaryColor }}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-white text-3xl px-12 py-4 skew-x-[-15deg] transition-all hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] group border-2 border-transparent"
                                >
                                    <span className="block skew-x-[15deg] flex items-center gap-3">
                                        JOIN NOW <Zap className="w-6 h-6 group-hover:animate-pulse" />
                                    </span>
                                </a>
                            )}
                            {products.length > 0 && (
                                <a 
                                  href="#plans" 
                                  className="bg-transparent border-4 border-white hover:bg-white hover:text-black text-white text-3xl px-12 py-4 skew-x-[-15deg] transition-all group"
                                >
                                    <span className="block skew-x-[15deg] flex items-center gap-3">
                                        VIEW PLANS <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Scrolling Marquee */}
            {business.marketingDesc && (
               <div className="relative z-20 -mt-20 flex overflow-hidden bg-[#dc2626] border-y-4 border-black py-4 skew-y-[-2deg] shadow-2xl">
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }} 
                    transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                    className="flex whitespace-nowrap power-display font-black italic text-4xl text-black"
                  >
                      {[...Array(10)].map((_, i) => (
                         <span key={i} className="mx-8 flex items-center gap-8">
                            "{business.marketingDesc}" <Target className="w-8 h-8" />
                         </span>
                      ))}
                  </motion.div>
               </div>
            )}

            {/* About Section */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission) && (
                <section id="grind" className="py-32 px-6 max-w-[1400px] mx-auto relative z-10">
                    <h2 className="power-display text-[6rem] md:text-[10rem] font-black italic text-zinc-900 absolute -top-10 right-0 -z-10 tracking-tighter select-none whitespace-nowrap overflow-hidden opacity-50">
                        THE GRIND
                    </h2>
                    
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div 
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                            <h3 className="power-display font-black italic text-5xl md:text-6xl text-white mb-8 border-l-8 border-[#dc2626] pl-6 uppercase">
                                Our Mission
                            </h3>
                            <p className="text-zinc-300 text-xl md:text-2xl leading-relaxed font-sans font-medium">
                                {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission}
                            </p>
                            
                            <div className="mt-12 grid grid-cols-2 gap-6">
                                <div className="border-2 border-zinc-800 p-6 skew-x-[-10deg] bg-zinc-900/50">
                                   <div className="skew-x-[10deg] text-center">
                                      <Dumbbell className="w-10 h-10 text-[#dc2626] mx-auto mb-3" />
                                      <h4 className="power-body text-2xl tracking-widest text-white">RAW STRENGTH</h4>
                                   </div>
                                </div>
                                <div className="border-2 border-zinc-800 p-6 skew-x-[-10deg] bg-zinc-900/50">
                                   <div className="skew-x-[10deg] text-center">
                                      <Activity className="w-10 h-10 text-[#dc2626] mx-auto mb-3" />
                                      <h4 className="power-body text-2xl tracking-widest text-white">ENDURANCE</h4>
                                   </div>
                                </div>
                            </div>
                        </motion.div>
                        
                        {business.vision && (
                            <motion.div 
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              className="bg-[#dc2626] border-4 border-black p-10 md:p-16 skew-x-[-5deg] relative shadow-[20px_20px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] hover:translate-x-[10px] hover:translate-y-[10px] transition-all"
                            >
                                <div className="absolute top-0 right-0 w-12 h-12 bg-black flex items-center justify-center">
                                   <Zap className="w-6 h-6 text-[#dc2626]" />
                                </div>
                                <div className="absolute bottom-0 left-0 w-12 h-12 bg-black"></div>
                                <div className="skew-x-[5deg]">
                                    <h3 className="power-display font-black italic text-4xl md:text-5xl text-black mb-6 border-b-4 border-black pb-4">
                                       THE VISION
                                    </h3>
                                    <p className="text-black font-sans font-bold text-xl md:text-2xl leading-relaxed uppercase">
                                       "{business.vision}"
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {/* Memberships/Products */}
            {products.length > 0 && (
                <section id="plans" className="py-40 px-6 bg-[#dc2626] clip-slant-reverse mt-32 relative z-10">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="max-w-[1400px] mx-auto pt-20 relative z-10">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-center mb-24"
                        >
                            <h2 className="power-display font-black italic text-6xl md:text-8xl text-black uppercase drop-shadow-[4px_4px_0_rgba(255,255,255,1)]">
                                TRAINING PLANS
                            </h2>
                            <p className="power-body text-white text-3xl tracking-widest mt-6 bg-black inline-block px-8 py-2 skew-x-[-15deg]">
                               <span className="block skew-x-[15deg]">CHOOSE YOUR ARSENAL</span>
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 50 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                                  key={product.id} 
                                  className="bg-[#111] border-4 border-black p-8 hover:-translate-y-4 transition-transform duration-300 relative group flex flex-col shadow-[15px_15px_0px_rgba(0,0,0,1)] hover:shadow-[25px_25px_0px_rgba(0,0,0,1)]"
                                >
                                    <div className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none scale-105 z-20"></div>

                                    {product.imageUrl ? (
                                        <div className="h-56 w-full bg-black mb-8 overflow-hidden border-2 border-zinc-800 relative">
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 opacity-80 group-hover:opacity-100" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                        </div>
                                    ) : (
                                        <div className="h-56 w-full bg-black mb-8 border-2 border-zinc-800 flex items-center justify-center">
                                           <Dumbbell className="w-20 h-20 text-zinc-800" />
                                        </div>
                                    )}

                                    {product.category && (
                                       <div className="power-body text-[#dc2626] text-xl tracking-widest mb-2 flex items-center gap-2">
                                          <Target className="w-4 h-4" /> {product.category}
                                       </div>
                                    )}

                                    <h3 className="power-display font-black italic text-3xl text-white mb-2 uppercase">{product.name}</h3>
                                    
                                    <div className="power-display font-black italic text-5xl text-[#dc2626] mb-6 drop-shadow-[2px_2px_0_rgba(255,255,255,0.2)]">
                                        {formatPrice(product.price)}
                                    </div>

                                    {product.description && (
                                        <p className="text-zinc-400 font-sans font-medium text-base mb-8 flex-1 leading-relaxed">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    {!product.inStock && (
                                       <div className="mb-6 bg-red-950 border border-red-500 text-red-500 power-body text-xl text-center py-2">
                                          SOLD OUT / AT CAPACITY
                                       </div>
                                    )}

                                    <div className="mt-auto">
                                        <a 
                                          href={getProductUrl(business.slug, product.id)} 
                                          className="block text-center bg-white text-black power-body tracking-widest text-2xl py-4 w-full hover:bg-black hover:text-white transition-colors border-4 border-white skew-x-[-10deg] group/btn"
                                        >
                                            <span className="block skew-x-[10deg] flex items-center justify-center gap-2">
                                               VIEW DETAILS <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                            </span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="pt-32 pb-12 bg-[#050505] border-t-[16px] border-[#dc2626] relative z-20">
                <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                   <div className="lg:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                       <h2 className="power-display font-black italic text-5xl text-white mb-6 uppercase flex items-center gap-3">
                           <Flame className="w-10 h-10 text-[#dc2626]" />
                           {business.name}
                       </h2>
                       <p className="text-zinc-400 font-sans font-medium text-lg max-w-md mb-8">
                           {business.footerText || "DOMINATE YOUR GOALS. CRUSH YOUR LIMITS. JOIN THE ELITE."}
                       </p>
                       
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] skew-x-[-10deg] transition-all">
                               <span className="skew-x-[10deg]"><Camera className="w-6 h-6" /></span>
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] skew-x-[-10deg] transition-all">
                               <span className="skew-x-[10deg]"><MessageCircle className="w-6 h-6" /></span>
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black hover:border-white skew-x-[-10deg] transition-all">
                               <span className="skew-x-[10deg]"><Globe className="w-6 h-6" /></span>
                             </a>
                           )}
                       </div>
                   </div>

                   <div className="lg:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                       <h4 className="power-body text-3xl text-[#dc2626] tracking-widest mb-6">CONTACT HQ</h4>
                       <ul className="space-y-4 font-sans font-bold text-lg text-zinc-300">
                           {waNumber && (
                              <li>
                                 <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-white hover:underline decoration-[#dc2626] decoration-4 underline-offset-4 transition-all">
                                    WHATSAPP SUPPORT
                                 </a>
                              </li>
                           )}
                           {business.phoneNumber && (
                              <li>
                                 <a href={`tel:${business.phoneNumber}`} className="hover:text-white hover:underline decoration-[#dc2626] decoration-4 underline-offset-4 transition-all">
                                    {business.phoneNumber}
                                 </a>
                              </li>
                           )}
                           {business.email && (
                              <li>
                                 <a href={`mailto:${business.email}`} className="hover:text-white hover:underline decoration-[#dc2626] decoration-4 underline-offset-4 transition-all">
                                    {business.email}
                                 </a>
                              </li>
                           )}
                       </ul>
                   </div>

                   <div className="lg:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                       <h4 className="power-body text-3xl text-[#dc2626] tracking-widest mb-6">LOCATION</h4>
                       <ul className="space-y-4 font-sans font-bold text-lg text-zinc-300">
                           {business.location && (
                              <li className="flex items-start justify-center md:justify-start gap-3">
                                 <MapPin className="w-6 h-6 text-[#dc2626] shrink-0" />
                                 <span className="uppercase">{business.location}</span>
                              </li>
                           )}
                       </ul>
                   </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 border-t-4 border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 power-body text-2xl text-zinc-600 tracking-widest">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. ALL RIGHTS RESERVED.`}</p>
                    <p>POWERED BY <a href="/" className="text-white hover:text-[#dc2626] transition-colors underline decoration-[#dc2626]">DUKAANHAI</a></p>
                </div>
            </footer>
        </div>
    );
}
