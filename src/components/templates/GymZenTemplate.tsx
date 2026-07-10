'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Wind, Heart, Sparkles, MapPin, Camera, MessageCircle, Globe, ArrowRight, Flower2 } from 'lucide-react';

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

export default function GymZenTemplate({ business, products }: TemplateProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Namaste, I would like to book "${productName}" at ${business.name}.`
                : `Namaste, I want to learn more about ${business.name}.`
        )}`;

    const primaryColor = business.primaryColor || '#065f46'; // emerald-800
    const secondaryColor = business.secondaryColor || '#ecfdf5'; // emerald-50

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#292524] font-sans selection:bg-[#d1fae5] selection:text-[#064e3b] overflow-hidden">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Nunito:wght@300;400;500;600&display=swap');
              .zen-display { font-family: 'Lora', serif; }
              .zen-body { font-family: 'Nunito', sans-serif; }
              
              .soft-glass {
                background: rgba(253, 251, 247, 0.7);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-bottom: 1px solid rgba(6, 95, 70, 0.05);
              }
              
              .blob-shape {
                 border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
                 animation: morph 8s ease-in-out infinite;
              }
              
              @keyframes morph {
                 0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
                 34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
                 67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
              }
            `}</style>

            {/* Navigation */}
            <nav className="fixed w-full z-50 soft-glass transition-all duration-500">
                <div className="max-w-[1200px] mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="zen-display text-2xl md:text-3xl text-[#065f46] flex items-center gap-3">
                        <Leaf className="w-6 h-6 text-[#10b981] opacity-80" />
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 zen-body text-[13px] font-semibold tracking-[0.15em] uppercase text-[#44403c]">
                       {products.length > 0 && <a href="#offerings" className="hover:text-[#065f46] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-[#065f46] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">Offerings</a>}
                       {(business.about || business.mission) && <a href="#philosophy" className="hover:text-[#065f46] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-[#065f46] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">Philosophy</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: secondaryColor, color: primaryColor }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="zen-body text-[13px] font-semibold tracking-[0.1em] uppercase px-6 py-2.5 rounded-full hover:bg-[#065f46] hover:text-white transition-all duration-500 shadow-sm"
                        >
                            {business.ctaText || 'Book Session'}
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative min-h-[95vh] flex flex-col justify-center pt-32 pb-24 px-6 overflow-hidden">
                {/* Organic Background Elements */}
                <motion.div 
                  style={{ y: yTransform }}
                  className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#d1fae5] blob-shape mix-blend-multiply opacity-40 z-0"
                />
                <motion.div 
                  style={{ y: yTransform }}
                  className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#fef3c7] blob-shape mix-blend-multiply opacity-40 z-0"
                  initial={{ animationDelay: '-4s' }}
                />

                <div className="max-w-[1000px] mx-auto text-center relative z-10 w-full flex flex-col items-center">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="flex flex-col items-center"
                    >
                        <span className="zen-body flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-[#065f46]/10 text-[#065f46] text-xs font-semibold tracking-[0.2em] uppercase mb-10 shadow-sm">
                            <Sparkles className="w-3.5 h-3.5" /> {business.category || 'Mind & Body Sanctuary'}
                        </span>
                        
                        <h1 className="zen-display text-6xl md:text-[5.5rem] text-[#1c1917] leading-[1.1] mb-8 font-medium">
                            {business.headline || business.name}
                        </h1>
                        
                        <p className="zen-body text-xl md:text-2xl text-[#57534e] max-w-2xl mx-auto leading-relaxed font-light mb-16">
                            {business.tagline || 'Find your balance, breath, and inner peace in a sanctuary designed for your well-being.'}
                        </p>
                        
                        {waNumber && (
                            <div className="flex flex-col sm:flex-row gap-6 items-center">
                                <a 
                                  href={waLink()} 
                                  style={{ backgroundColor: primaryColor }}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center gap-3 text-white zen-body text-[13px] font-semibold tracking-[0.15em] uppercase rounded-full px-10 py-4 transition-all duration-500 shadow-[0_10px_30px_rgba(6,95,70,0.2)] hover:shadow-[0_15px_40px_rgba(6,95,70,0.3)] hover:-translate-y-1 group"
                                >
                                    Begin Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                                {products.length > 0 && (
                                   <a href="#offerings" className="zen-body text-[#57534e] hover:text-[#065f46] text-[13px] font-semibold tracking-[0.1em] uppercase transition-colors">
                                      View Offerings
                                   </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
                
                {business.bannerUrl && (
                   <motion.div 
                     style={{ opacity: opacityTransform }}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ duration: 2, delay: 0.5 }}
                     className="absolute bottom-0 left-0 w-full h-[30vh] z-0 overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10"></div>
                      <img src={business.bannerUrl} alt="Sanctuary" className="w-full h-full object-cover object-top opacity-30 filter sepia-[0.3] blur-[2px]" />
                   </motion.div>
                )}
            </section>

            {business.marketingDesc && (
               <section className="py-24 px-6 bg-[#065f46] text-[#ecfdf5] relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')]"></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                  >
                     <Flower2 className="w-8 h-8 mx-auto mb-8 opacity-50" />
                     <p className="zen-display text-3xl md:text-5xl italic leading-relaxed font-light">
                        "{business.marketingDesc}"
                     </p>
                  </motion.div>
               </section>
            )}

            {/* Philosophy */}
            {(business.about || business.vision || business.mission) && (
                <section id="philosophy" className="py-32 px-6 relative">
                    <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1 }}
                          className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                               <span className="w-12 h-px bg-[#065f46]/30"></span>
                               <h2 className="zen-body text-[11px] font-bold tracking-[0.3em] uppercase text-[#065f46]">Our Philosophy</h2>
                            </div>
                            
                            <h3 className="zen-display text-4xl md:text-5xl text-[#1c1917] leading-tight">
                               A harmonious approach to inner wellness.
                            </h3>
                            
                            <p className="zen-body text-[#57534e] leading-[2] text-lg font-light">
                                {business.about || business.mission}
                            </p>
                            
                            {business.mission && business.about && (
                                <div className="pt-6 border-t border-[#e7e5e4]">
                                   <h4 className="zen-body text-sm font-semibold tracking-wider uppercase text-[#292524] mb-3">Our Mission</h4>
                                   <p className="zen-body text-[#78716c] leading-relaxed font-light">{business.mission}</p>
                                </div>
                            )}
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="relative"
                        >
                            {business.vision && (
                                <div className="bg-[#ecfdf5] rounded-[3rem] p-12 md:p-16 relative overflow-hidden group hover:bg-[#d1fae5] transition-colors duration-700">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000"></div>
                                    <Wind className="w-10 h-10 text-[#065f46]/20 mb-8" />
                                    <h4 className="zen-body text-xs font-semibold tracking-[0.2em] uppercase text-[#065f46] mb-4">The Vision</h4>
                                    <p className="zen-display text-2xl md:text-3xl text-[#064e3b] leading-[1.6] italic relative z-10">
                                        "{business.vision}"
                                    </p>
                                </div>
                            )}
                            
                            {!business.vision && (
                               <div className="aspect-square rounded-[3rem] bg-[#ecfdf5] flex items-center justify-center">
                                  <Heart className="w-24 h-24 text-[#065f46]/10" />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Offerings */}
            {products.length > 0 && (
                <section id="offerings" className="py-32 px-6 bg-white border-t border-[#f5f5f4] relative z-10">
                    <div className="max-w-[1200px] mx-auto">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="text-center mb-24 max-w-2xl mx-auto"
                        >
                            <h2 className="zen-body text-[11px] font-bold tracking-[0.3em] uppercase text-[#065f46] mb-4">Studio Offerings</h2>
                            <h3 className="zen-display text-4xl md:text-5xl text-[#1c1917] mb-6">Curated Experiences</h3>
                            <p className="zen-body text-[#78716c] text-lg font-light">Classes, workshops, and private sessions designed to align your mind, body, and spirit.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 40 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
                                  key={product.id} 
                                  className="group flex flex-col h-full bg-[#FDFBF7] rounded-[2rem] p-4 border border-[#f5f5f4] hover:shadow-[0_20px_40px_rgba(6,95,70,0.06)] transition-all duration-500"
                                >
                                    <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden mb-8 bg-[#f5f5f4] relative">
                                        {product.imageUrl ? (
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#d6d3d1]">
                                               <Leaf className="w-12 h-12" />
                                            </div>
                                        )}
                                        
                                        {product.category && (
                                           <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full zen-body text-[10px] font-semibold tracking-widest uppercase text-[#065f46]">
                                              {product.category}
                                           </div>
                                        )}
                                    </div>
                                    
                                    <div className="px-4 pb-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-3 gap-4">
                                            <h3 className="zen-display text-2xl text-[#1c1917] leading-snug group-hover:text-[#065f46] transition-colors">{product.name}</h3>
                                            <div className="zen-body text-[#065f46] font-medium whitespace-nowrap bg-[#ecfdf5] px-3 py-1 rounded-full text-sm">
                                               {formatPrice(product.price)}
                                            </div>
                                        </div>
                                        
                                        {product.description && (
                                            <p className="zen-body text-[#78716c] text-sm leading-[1.8] mb-8 line-clamp-3 font-light flex-1">
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        {!product.inStock && (
                                           <p className="zen-body text-xs font-semibold uppercase tracking-wider text-red-400 mb-4">Currently Full</p>
                                        )}
                                        
                                        <div className="mt-auto pt-6 border-t border-[#f5f5f4]">
                                            <a 
                                              href={getProductUrl(business.slug, product.id)} 
                                              className="inline-flex items-center gap-2 text-[#065f46] zen-body text-xs font-bold uppercase tracking-[0.15em] hover:text-[#047857] transition-colors group/link"
                                            >
                                                Explore Details
                                                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
            <footer className="bg-[#1c1917] text-[#d6d3d1] pt-24 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#065f46]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                
                <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-12 gap-16 mb-20 relative z-10">
                   <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                       <h2 className="zen-display text-3xl text-[#f5f5f4] mb-6 flex items-center gap-3">
                          <Leaf className="w-6 h-6 text-[#10b981]" />
                          {business.name}
                       </h2>
                       <p className="zen-body text-sm leading-[2] text-[#a8a29e] max-w-sm mb-10 font-light">
                          {business.footerText || "A sacred space for movement, breath, and profound transformation."}
                       </p>
                       
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#44403c] flex items-center justify-center text-[#a8a29e] hover:bg-[#065f46] hover:text-white hover:border-[#065f46] transition-all">
                               <Camera className="w-4 h-4" />
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#44403c] flex items-center justify-center text-[#a8a29e] hover:bg-[#065f46] hover:text-white hover:border-[#065f46] transition-all">
                               <MessageCircle className="w-4 h-4" />
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#44403c] flex items-center justify-center text-[#a8a29e] hover:bg-white hover:text-black hover:border-white transition-all">
                               <Globe className="w-4 h-4" />
                             </a>
                           )}
                       </div>
                   </div>
                   
                   <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                       <h4 className="zen-body text-[10px] font-bold tracking-[0.2em] uppercase text-[#78716c] mb-6">Connection</h4>
                       <ul className="space-y-4 zen-body text-sm font-light">
                           {waNumber && (
                              <li>
                                 <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                                    Book via WhatsApp
                                 </a>
                              </li>
                           )}
                           {business.email && (
                              <li>
                                 <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">
                                    {business.email}
                                 </a>
                              </li>
                           )}
                           {business.phoneNumber && (
                              <li>
                                 <a href={`tel:${business.phoneNumber}`} className="hover:text-white transition-colors">
                                    {business.phoneNumber}
                                 </a>
                              </li>
                           )}
                       </ul>
                   </div>
                   
                   <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                       <h4 className="zen-body text-[10px] font-bold tracking-[0.2em] uppercase text-[#78716c] mb-6">Sanctuary Location</h4>
                       <ul className="space-y-4 zen-body text-sm font-light">
                           {business.location && (
                              <li className="flex items-start gap-3">
                                 <MapPin className="w-4 h-4 text-[#78716c] shrink-0 mt-0.5" />
                                 <span className="leading-relaxed">{business.location}</span>
                              </li>
                           )}
                       </ul>
                   </div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 border-t border-[#292524] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 zen-body text-[11px] tracking-[0.1em] text-[#78716c] uppercase">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>Curated on <a href="/" className="text-[#a8a29e] hover:text-white transition-colors">DukaanHai</a></p>
                </div>
            </footer>
        </div>
    );
}
