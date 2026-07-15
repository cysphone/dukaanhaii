'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Dumbbell, Trophy, Zap, Activity, ChevronRight, CheckCircle2, MapPin, Camera, MessageCircle, Globe, ArrowUpRight } from 'lucide-react';

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

export default function GymModernTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I am interested in "${productName}" from ${business.name}.`
                : `Hi, I want to join ${business.name} today.`
        )}`;

    const accentColor = business.primaryColor || '#facc15'; // yellow-400

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-[#facc15] selection:text-black overflow-hidden relative">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
              .modern-font { font-family: 'Outfit', sans-serif; }
              
              .glass-panel {
                 background: rgba(24, 24, 27, 0.4);
                 backdrop-filter: blur(12px);
                 -webkit-backdrop-filter: blur(12px);
                 border: 1px solid rgba(255, 255, 255, 0.05);
              }
            `}</style>

            {/* Modern NavBar */}
            <nav className="fixed w-full z-50 glass-panel border-b-0 border-zinc-800 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex justify-between items-center modern-font">
                    <div className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
                        <Dumbbell className="w-8 h-8 text-[#facc15] -rotate-45" />
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-10 font-bold text-sm tracking-wide text-zinc-400">
                        {products.length > 0 && <a href="#memberships" className="hover:text-white transition-colors">Memberships</a>}
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission) && <a href="#facility" className="hover:text-white transition-colors">Facility</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: accentColor, color: 'black' }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="font-bold text-sm px-6 py-2.5 rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Zap className="w-4 h-4" /> {business.ctaText || 'Join Now'}
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 modern-font overflow-hidden">
                {/* Abstract Background Shapes */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#facc15] rounded-full mix-blend-overlay filter blur-[120px] opacity-20 pointer-events-none"
                />
                <motion.div 
                  animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} 
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-overlay filter blur-[120px] opacity-10 pointer-events-none"
                />
                
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('gym', '')) && (
                  <motion.div style={{ y: yTransform }} className="absolute inset-0 z-0">
                     <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('gym', ''))} alt="Gym Facility" className="w-full h-full object-cover opacity-30 grayscale filter contrast-125 mix-blend-luminosity" />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent"></div>
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                  </motion.div>
                )}

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-[#facc15] text-sm font-bold mb-8 uppercase tracking-widest">
                            <Activity className="w-4 h-4 animate-pulse" />
                            {business.category || 'Premium Fitness Facility'}
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl lg:text-[6.5rem] font-black text-white leading-[0.9] tracking-tighter mb-8">
                            {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'gym')) || business.name}
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-zinc-400 font-medium max-w-2xl mb-12 leading-relaxed">
                            {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'gym')) || 'Elevate your fitness with modern technology, expert training, and an elite community.'}
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            {waNumber && (
                                <a 
                                  href={waLink()} 
                                  style={{ backgroundColor: accentColor, color: 'black' }}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="group relative inline-flex items-center justify-center px-10 py-5 font-black text-lg rounded-full hover:scale-105 transition-all overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">Start Your Journey <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/20 transition-all duration-300 group-hover:scale-100"></div>
                                </a>
                            )}
                            {products.length > 0 && (
                               <a href="#memberships" className="font-bold text-lg text-white hover:text-[#facc15] transition-colors flex items-center gap-2">
                                  View Memberships <ChevronRight className="w-5 h-5" />
                               </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {business.marketingDesc && (
               <section className="py-20 px-6 bg-[#facc15] text-black relative z-10">
                  <div className="max-w-[1400px] mx-auto text-center">
                     <p className="modern-font text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
                        "{business.marketingDesc}"
                     </p>
                  </div>
               </section>
            )}

            {/* Content Highlights */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission) && (
                <section id="facility" className="py-32 modern-font relative z-10">
                    <div className="max-w-[1400px] mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <motion.div 
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8 }}
                            >
                                <span className="text-[#facc15] font-bold tracking-widest uppercase text-sm mb-4 block">The Facility</span>
                                <h2 className="text-5xl md:text-6xl font-black mb-8 text-white leading-tight">Redefining the <br/>Fitness Experience</h2>
                                <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium mb-12">
                                    {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) || business.mission}
                                </p>
                                
                                <div className="space-y-6">
                                   {business.vision && (
                                       <div className="p-8 rounded-3xl glass-panel border border-zinc-800/50 relative overflow-hidden group">
                                           <div className="absolute left-0 top-0 w-1 h-full bg-[#facc15]"></div>
                                           <h3 className="text-[#facc15] font-black uppercase tracking-wider mb-3 text-sm">Our Vision</h3>
                                           <p className="text-zinc-300 font-medium leading-relaxed">{business.vision}</p>
                                       </div>
                                   )}
                                   {business.mission && (config?.about?.text || business.about || getPlaceholderText('about', business.name, 'gym')) && (
                                       <div className="p-8 rounded-3xl glass-panel border border-zinc-800/50 relative overflow-hidden group">
                                           <div className="absolute left-0 top-0 w-1 h-full bg-white"></div>
                                           <h3 className="text-white font-black uppercase tracking-wider mb-3 text-sm">Our Mission</h3>
                                           <p className="text-zinc-300 font-medium leading-relaxed">{business.mission}</p>
                                       </div>
                                   )}
                                </div>
                            </motion.div>

                            <motion.div 
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8 }}
                              className="grid grid-cols-2 gap-6 relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#facc15]/10 to-transparent blur-2xl rounded-full -z-10"></div>
                                <div className="bg-zinc-900/80 backdrop-blur p-10 rounded-[2.5rem] border border-zinc-800 aspect-square flex flex-col justify-between group hover:border-[#facc15]/50 transition-colors">
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-[#facc15] group-hover:scale-110 transition-transform">
                                       <Trophy className="w-8 h-8" />
                                    </div>
                                    <p className="font-black text-2xl text-white leading-tight">Elite<br/>Coaching</p>
                                </div>
                                <div className="bg-[#facc15] p-10 rounded-[2.5rem] text-black aspect-square flex flex-col justify-between translate-y-12 group hover:brightness-110 transition-all shadow-[0_20px_40px_rgba(250,204,21,0.2)]">
                                    <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-[#facc15] group-hover:scale-110 transition-transform">
                                       <Zap className="w-8 h-8" />
                                    </div>
                                    <p className="font-black text-2xl leading-tight">Next-Gen<br/>Equipment</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Products Slider/Grid */}
            {products.length > 0 && (
                <section id="memberships" className="py-32 px-6 modern-font relative z-10 bg-zinc-950">
                    <div className="max-w-[1400px] mx-auto">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16"
                        >
                           <div>
                              <span className="text-[#facc15] font-bold tracking-widest uppercase text-sm mb-4 block">Join The Club</span>
                              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                                  Memberships
                              </h2>
                           </div>
                           <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm bg-zinc-900 px-6 py-3 rounded-full border border-zinc-800">
                             {products.length} Options Available
                           </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                                  key={product.id} 
                                  className="bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-800 hover:border-[#facc15] transition-all duration-300 group hover:shadow-[0_20px_40px_rgba(250,204,21,0.05)] flex flex-col"
                                >
                                    <div className="aspect-[4/3] bg-zinc-800 relative overflow-hidden">
                                        {product.imageUrl ? (
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100 filter grayscale group-hover:grayscale-0" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                               <Dumbbell className="w-16 h-16" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                                        
                                        {product.category && (
                                           <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white">
                                              {product.category}
                                           </div>
                                        )}
                                        
                                        {!product.inStock && (
                                           <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center">
                                              <span className="text-red-500 font-black uppercase tracking-widest border-2 border-red-500 bg-red-500/10 px-6 py-2 rounded-full rotate-[-5deg]">Full Capacity</span>
                                           </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-10 flex-1 flex flex-col relative">
                                        <div className="absolute -top-16 right-8 bg-[#facc15] text-black px-6 py-3 rounded-2xl font-black text-2xl shadow-xl shadow-black/50 rotate-3 group-hover:rotate-0 transition-transform">
                                            {formatPrice(product.price)}
                                        </div>
                                        
                                        <h3 className="text-3xl font-black text-white mb-4 leading-tight">{product.name}</h3>
                                        
                                        {product.description && (
                                            <p className="text-zinc-400 font-medium mb-8 flex-1 leading-relaxed">
                                               {product.description}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto border-t border-zinc-800 pt-8">
                                            <a 
                                              href={getProductUrl(business.slug, product.id)} 
                                              className="w-full flex items-center justify-between font-bold text-lg uppercase tracking-wider group/btn"
                                            >
                                                <span className="text-white group-hover/btn:text-[#facc15] transition-colors">Select Plan</span>
                                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover/btn:bg-[#facc15] group-hover/btn:text-black transition-colors">
                                                    <ArrowUpRight className="w-5 h-5" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="pt-24 pb-12 modern-font relative z-10 bg-[#09090b] overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent"></div>
                
                <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-12 gap-16 mb-20">
                   <div className="lg:col-span-5">
                      <h2 className="text-4xl font-black text-white mb-6 flex items-center gap-3">
                         <Dumbbell className="w-8 h-8 text-[#facc15] -rotate-45" />
                         {business.name}
                      </h2>
                      <p className="text-zinc-400 font-medium leading-relaxed max-w-sm mb-10 text-lg">
                         {business.footerText || "Push your limits. Redefine your boundaries. Welcome to the new standard of fitness."}
                      </p>
                      
                      <div className="flex gap-4">
                         {business.instagramUrl && (
                           <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#facc15] hover:border-[#facc15] transition-all">
                             <Camera className="w-5 h-5" />
                           </a>
                         )}
                         {business.facebookUrl && (
                           <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#facc15] hover:border-[#facc15] transition-all">
                             <MessageCircle className="w-5 h-5" />
                           </a>
                         )}
                         {business.websiteUrl && (
                           <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-[#facc15] hover:border-[#facc15] transition-all">
                             <Globe className="w-5 h-5" />
                           </a>
                         )}
                      </div>
                   </div>
                   
                   <div className="lg:col-span-7 grid sm:grid-cols-2 gap-12">
                      <div>
                         <h4 className="text-white font-black uppercase tracking-widest mb-8">Location</h4>
                         <ul className="space-y-6 text-zinc-400 font-medium">
                            {business.location && (
                               <li className="flex items-start gap-4">
                                  <MapPin className="w-6 h-6 text-[#facc15] shrink-0" />
                                  <span>{business.location}</span>
                               </li>
                            )}
                         </ul>
                      </div>
                      
                      <div>
                         <h4 className="text-white font-black uppercase tracking-widest mb-8">Contact</h4>
                         <ul className="space-y-6 text-zinc-400 font-medium">
                            {business.phoneNumber && (
                               <li><a href={`tel:${business.phoneNumber}`} className="hover:text-white transition-colors">{business.phoneNumber}</a></li>
                            )}
                            {business.email && (
                               <li><a href={`mailto:${business.email}`} className="hover:text-white transition-colors">{business.email}</a></li>
                            )}
                            {waNumber && (
                               <li><a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp Support</a></li>
                            )}
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 text-sm font-bold uppercase tracking-widest border-t border-zinc-900 pt-8">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>Powered by <a href="/" className="text-white hover:text-[#facc15] transition-colors">DukaanHai</a></p>
                </div>
            </footer>
        </div>
    );
}
