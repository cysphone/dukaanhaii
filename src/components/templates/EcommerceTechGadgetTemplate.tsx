'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, ChevronRight, Apple, Globe, Camera, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

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

export default function EcommerceTechGadgetTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hi, I am interested in purchasing the "${productName}" from ${business.name}.`
                : `Hi, I want to learn more about tech products at ${business.name}.`
        )}`;

    const primaryColor = business.primaryColor || '#0066CC'; // apple blue

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#0066CC] selection:text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
              .tech-font { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
              
              /* Apple style smooth typography */
              .antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
              
              .glass-nav {
                background: rgba(29, 29, 31, 0.72);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
              }
            `}</style>

            {/* Apple-esque Dark Nav */}
            <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
                <div className="max-w-[1000px] mx-auto px-4 lg:px-0 h-14 flex items-center justify-between tech-font text-xs font-normal tracking-wide text-white/80 antialiased">
                    <span className="text-white font-medium flex items-center gap-2">
                        {business.logoUrl ? (
                           <img src={business.logoUrl} alt={business.name} className="h-6 w-auto object-contain" /> 
                        ) : (
                           <span className="text-lg font-bold tracking-tight">{business.name}</span>
                        )}
                    </span>
                    
                    <div className="hidden md:flex gap-8">
                        <a href="#store" className="hover:text-white transition-colors">Store</a>
                        <a href="#mac" className="hover:text-white transition-colors">Categories</a>
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce'))) && <a href="#about" className="hover:text-white transition-colors">About</a>}
                        {waNumber && <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>}
                    </div>

                    <div className="flex gap-4">
                       <SearchIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                       <BagIcon className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </nav>

            {/* Clean Hero */}
            <section className="relative pt-[120px] pb-10 bg-white text-center px-4 overflow-hidden min-h-[90vh] flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                  className="max-w-4xl mx-auto pt-16 pb-12 w-full z-10 antialiased"
                >
                    <h2 className="tech-font text-[#BF4800] font-semibold text-xs tracking-widest uppercase mb-4">
                        {business.category || 'New Arrival'}
                    </h2>
                    <h1 className="tech-font text-6xl md:text-[5.5rem] font-bold tracking-tighter mb-4 leading-none text-[#1D1D1F]">
                        {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}
                    </h1>
                    <p className="tech-font text-2xl md:text-3xl text-[#1D1D1F] font-normal max-w-2xl mx-auto mb-10 tracking-tight leading-snug">
                        {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'ecommerce')) || 'Pro capabilities. Unprecedented performance. Beautiful design.'}
                    </p>
                    <div className="flex justify-center items-center gap-6 tech-font text-[17px]">
                        <a 
                          href="#store" 
                          style={{ backgroundColor: primaryColor }}
                          className="text-white px-8 py-3 rounded-full font-medium hover:brightness-110 transition-all active:scale-95"
                        >
                            Buy
                        </a>
                        {waNumber && (
                            <a 
                              href={waLink()} 
                              style={{ color: primaryColor }}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:underline font-medium transition-colors flex items-center gap-1 group"
                            >
                                Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </motion.div>
                
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'electronics')) && (
                  <motion.div 
                    style={{ scale }}
                    className="w-full max-w-[1200px] mt-auto relative z-0"
                  >
                     <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'electronics'))} alt="Hero Product" className="w-full h-auto object-cover rounded-t-[3rem] shadow-2xl" />
                     {/* Gradient fade into next section */}
                     <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#F5F5F7] to-transparent"></div>
                  </motion.div>
                )}
            </section>

            {/* Featured Grid (Apple Style 2x2) */}
            {products.length > 0 && (
                <section id="store" className="pt-24 pb-12 px-4 md:px-6 max-w-[1400px] mx-auto">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-center mb-16 antialiased"
                    >
                        <h2 className="tech-font text-5xl font-bold tracking-tighter text-[#1D1D1F]">The latest.</h2>
                        <p className="tech-font text-2xl text-[#86868B] font-medium mt-4 tracking-tight">Take a look at what's new, right now.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {products.map((product, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: (idx % 2) * 0.1 }}
                              key={product.id} 
                              className={`bg-white rounded-[2.5rem] p-12 flex flex-col items-center text-center transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] duration-500 overflow-hidden ${idx === 0 && products.length % 2 !== 0 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="z-10 antialiased mb-10 w-full">
                                    {product.category && (
                                      <h4 className="tech-font text-xs font-semibold tracking-widest text-[#86868B] uppercase mb-2">
                                         {product.category}
                                      </h4>
                                    )}
                                    <h3 className="tech-font text-4xl font-bold tracking-tight mb-3 text-[#1D1D1F]">{product.name}</h3>
                                    
                                    {product.description && (
                                        <p className="tech-font text-[#1D1D1F] text-[17px] font-normal mb-5 max-w-md mx-auto leading-relaxed">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    <div className="tech-font text-[#86868B] font-medium mb-6">
                                        From {formatPrice(product.price)}
                                    </div>

                                    <div className="flex justify-center gap-6 tech-font text-[15px]">
                                        <a 
                                          href={getProductUrl(business.slug, product.id)} 
                                          style={{ backgroundColor: primaryColor }}
                                          className="text-white px-6 py-2 rounded-full font-medium hover:brightness-110 transition-all"
                                        >
                                            Buy
                                        </a>
                                        <a 
                                          href={getProductUrl(business.slug, product.id)} 
                                          style={{ color: primaryColor }}
                                          className="hover:underline font-medium flex items-center group"
                                        >
                                            Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                    
                                    {!product.inStock && (
                                       <div className="mt-4 tech-font text-sm font-medium text-red-500">Currently unavailable</div>
                                    )}
                                </div>

                                {product.imageUrl && (
                                    <div className="w-full max-w-lg mt-auto relative transform transition-transform duration-700 hover:scale-105">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain drop-shadow-2xl" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}
            
            {/* Marketing Callout */}
            {business.marketingDesc && (
               <section className="py-24 bg-white text-center px-4 overflow-hidden antialiased border-y border-[#E5E5EA]">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                  >
                     <h2 className="tech-font text-4xl md:text-[3.5rem] font-bold tracking-tighter text-[#1D1D1F] leading-tight mb-8">
                       {business.marketingDesc}
                     </h2>
                  </motion.div>
               </section>
            )}

            {/* Specs / Info Panel */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && (
                <section id="about" className="py-32 bg-black text-white px-4 md:px-12 antialiased overflow-hidden relative">
                    {/* Background glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    
                    <div className="max-w-6xl mx-auto tech-font">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="text-center max-w-4xl mx-auto mb-24"
                        >
                           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-none">Innovation <br/>everywhere.</h2>
                           <p className="text-2xl md:text-3xl text-[#86868B] font-medium leading-relaxed tracking-tight">
                               {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission}
                           </p>
                        </motion.div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {business.mission && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.1 }}
                                  className="bg-[#1D1D1F] p-12 rounded-[2.5rem]"
                                >
                                    <h3 className="text-[15px] font-semibold tracking-widest text-[#86868B] uppercase mb-4">Mission</h3>
                                    <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug">{business.mission}</p>
                                </motion.div>
                            )}
                            {business.vision && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="bg-[#1D1D1F] p-12 rounded-[2.5rem]"
                                >
                                    <h3 className="text-[15px] font-semibold tracking-widest text-[#86868B] uppercase mb-4">Vision</h3>
                                    <p className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug">{business.vision}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Clean Footer */}
            <footer className="bg-[#F5F5F7] py-12 px-4 tech-font text-[11px] text-[#86868B] antialiased">
                <div className="max-w-[1000px] mx-auto">
                   
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-[#D2D2D7] pb-12">
                      <div className="md:col-span-2">
                         <h3 className="text-[#1D1D1F] font-semibold mb-4 text-sm">{business.name}</h3>
                         <p className="leading-relaxed mb-6 max-w-sm">
                           {business.footerText || "Designed to push the boundaries of what's possible."}
                         </p>
                         <div className="flex gap-4">
                             {business.instagramUrl && (
                               <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
                                 <Camera className="w-5 h-5" />
                               </a>
                             )}
                             {business.facebookUrl && (
                               <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
                                 <MessageCircle className="w-5 h-5" />
                               </a>
                             )}
                             {business.websiteUrl && (
                               <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="text-[#86868B] hover:text-[#1D1D1F] transition-colors">
                                 <Globe className="w-5 h-5" />
                               </a>
                             )}
                         </div>
                      </div>
                      
                      <div>
                         <h3 className="text-[#1D1D1F] font-semibold mb-4 text-xs">Contact Support</h3>
                         <ul className="space-y-3">
                            {waNumber && <li><a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-[#1D1D1F] hover:underline">WhatsApp Support</a></li>}
                            {business.phoneNumber && <li><a href={`tel:${business.phoneNumber}`} className="hover:text-[#1D1D1F] hover:underline">{business.phoneNumber}</a></li>}
                            {business.email && <li><a href={`mailto:${business.email}`} className="hover:text-[#1D1D1F] hover:underline">{business.email}</a></li>}
                         </ul>
                      </div>
                      
                      <div>
                         <h3 className="text-[#1D1D1F] font-semibold mb-4 text-xs">Location</h3>
                         <ul className="space-y-3">
                            {business.location && (
                               <li className="flex items-start gap-2">
                                  <MapPin className="w-4 h-4 shrink-0" /> {business.location}
                               </li>
                            )}
                         </ul>
                      </div>
                   </div>
                   
                   <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#86868B]">
                       <p>{business.copyrightText || `Copyright © ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                       <div className="flex gap-4">
                           <a href="/" className="hover:text-[#1D1D1F] hover:underline transition-colors">Built on DukaanHai</a>
                       </div>
                   </div>
                </div>
            </footer>
        </div>
    );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14.5 14.5L10.5 10.5M6.5 12.5C3.18629 12.5 0.5 9.81371 0.5 6.5C0.5 3.18629 3.18629 0.5 6.5 0.5C9.81371 0.5 12.5 3.18629 12.5 6.5C12.5 9.81371 9.81371 12.5 6.5 12.5Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function BagIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.5 5.5C4.5 3.5 5.5 1.5 7.5 1.5C9.5 1.5 10.5 3.5 10.5 5.5M2.5 5.5H12.5L13.5 14.5H1.5L2.5 5.5Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
