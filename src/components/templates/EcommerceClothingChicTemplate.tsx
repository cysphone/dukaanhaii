'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Camera, MessageCircle, Globe, MapPin, Mail, Phone } from 'lucide-react';

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

export default function EcommerceClothingChicTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hello, I'd like to order "${productName}" from your latest collection.`
                : `Hello, I have an inquiry for ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,600;1,6..96,400&family=Jost:wght@300;400;500;600&display=swap');
              .chic-display { font-family: 'Bodoni Moda', serif; }
              .chic-body { font-family: 'Jost', sans-serif; }
            `}</style>

            {/* Modern Minimal Navigation */}
            <nav className="fixed w-full z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-black/5 transition-all">
                <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-10 chic-body text-[10px] font-medium tracking-[0.25em] uppercase text-gray-500">
                        {products.length > 0 && <a href="#collection" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">COLLECTION</a>}
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && <a href="#house" className="hover:text-black transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">THE HOUSE</a>}
                    </div>

                    <div className="chic-display text-2xl md:text-3xl font-normal tracking-tight text-center flex-1 md:flex-none">
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-8 md:h-10 w-auto object-contain mx-auto" /> : business.name}
                    </div>

                    <div className="flex justify-end gap-6 chic-body text-[10px] font-medium tracking-[0.25em] uppercase text-gray-500">
                        {waNumber && (
                            <a 
                                href={waLink()} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-black flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                                <ShoppingBag className="w-4 h-4 stroke-[1.5]" />
                                <span className="hidden sm:inline">{business.ctaText || 'INQUIRE'}</span>
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* Edgy Lookbook Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#E8E6E1]">
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'clothing')) && (
                  <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0 z-0"
                  >
                     <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'clothing'))} alt="Campaign" className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-[2s]" />
                     <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                  </motion.div>
                )}
                
                {/* Abstract overlay if no banner */}
                {!(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'clothing')) && (
                  <div className="absolute inset-0 z-0 bg-[#F5F3ED]">
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#EAE8E2] transform -skew-x-12 origin-top mix-blend-multiply"></div>
                  </div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full"
                >
                    <div className="bg-[#FDFBF7]/90 backdrop-blur-md p-10 md:p-16 border border-black/5 shadow-2xl">
                      <span className="chic-body block text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-8 border-b border-gray-300 inline-block pb-3">
                          {business.category || 'NEW COLLECTION'}
                      </span>
                      <h1 className="chic-display text-5xl md:text-7xl lg:text-8xl font-normal leading-none tracking-[-0.02em] mb-8">
                          {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || 'DEFINED BY ELEGANCE'}
                      </h1>
                      <p className="chic-body max-w-lg mx-auto text-base text-gray-600 font-light mb-12 leading-relaxed">
                          {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'ecommerce')) || 'Curating minimalism, sophisticated lines, and modern silhouettes for the contemporary wardrobe.'}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 chic-body text-[10px] font-medium tracking-[0.2em] uppercase">
                          <a href="#collection" className="bg-[#1A1A1A] text-white px-10 py-4 hover:bg-gray-800 transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-2 group">
                              EXPLORE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                          </a>
                      </div>
                    </div>
                </motion.div>
            </section>

            {/* Lookbook / Products Grid */}
            {products.length > 0 && (
                <section id="collection" className="max-w-[1400px] mx-auto px-6 py-32 md:py-40">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 border-b border-gray-200 pb-10 gap-8"
                    >
                        <h2 className="chic-display text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A]">Selected Pieces</h2>
                        <span className="chic-body text-[10px] tracking-[0.3em] uppercase text-gray-400">Vol. {new Date().getFullYear()}</span>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-24">
                        {products.map((product, idx) => (
                            <motion.a 
                              initial={{ opacity: 0, y: 40 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: (idx % 3) * 0.1 }}
                              key={product.id} 
                              href={getProductUrl(business.slug, product.id)} 
                              className="block group"
                            >
                                <div className={`relative bg-[#F5F3ED] overflow-hidden mb-8 ${idx % 3 === 1 ? 'lg:mt-24' : ''} ${idx % 3 === 2 ? 'lg:mt-12' : ''} aspect-[3/4]`}>
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center border border-black/5">
                                           <ShoppingBag className="w-8 h-8 text-gray-300 stroke-[1] mb-2" />
                                        </div>
                                    )}
                                    {/* Minimal Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-500"></div>
                                    
                                    {!product.inStock && (
                                       <div className="absolute bottom-6 right-6">
                                         <span className="chic-body text-[9px] tracking-[0.2em] uppercase bg-white/90 backdrop-blur px-3 py-1.5 border border-black/10">Archive</span>
                                       </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-start">
                                    <div className="pr-4">
                                        <h3 className="chic-display text-2xl mb-2 group-hover:text-gray-500 transition-colors line-clamp-1">{product.name}</h3>
                                        {product.category && (
                                            <span className="chic-body text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                                                {product.category}
                                            </span>
                                        )}
                                        {product.description && (
                                            <p className="chic-body text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="chic-body text-sm font-medium tracking-wide whitespace-nowrap">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </section>
            )}

            {/* Editorial About Section */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission || business.vision) && (
                <section id="house" className="bg-[#F5F3ED] py-32 md:py-40 px-6 border-y border-black/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8E6E1] rounded-full blur-[100px] pointer-events-none opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EAE8E2] rounded-full blur-[100px] pointer-events-none opacity-50"></div>

                    <div className="max-w-[1200px] mx-auto grid lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
                        <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="lg:col-span-7"
                        >
                            <span className="chic-body block text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-8 border-b border-gray-300 inline-block pb-2">THE HOUSE</span>
                            
                            {business.marketingDesc && (
                                <h2 className="chic-display text-4xl md:text-5xl lg:text-6xl mb-12 leading-[1.1] text-[#1A1A1A]">
                                    "{business.marketingDesc}"
                                </h2>
                            )}
                            
                            {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) && (
                                <p className="chic-body text-gray-600 leading-[1.8] font-light text-lg md:text-xl mb-10 max-w-2xl">
                                    {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce'))}
                                </p>
                            )}

                            <div className="grid sm:grid-cols-2 gap-10 mt-16 pt-16 border-t border-black/10">
                                {business.mission && (
                                    <div>
                                        <h4 className="chic-body text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-semibold">MISSION</h4>
                                        <p className="chic-body text-gray-600 leading-relaxed font-light text-sm">{business.mission}</p>
                                    </div>
                                )}
                                {business.vision && (
                                    <div>
                                        <h4 className="chic-body text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-4 font-semibold">VISION</h4>
                                        <p className="chic-body text-gray-600 leading-relaxed font-light text-sm">{business.vision}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          className="lg:col-span-5"
                        >
                            <div className="border border-gray-300 p-8 md:p-14 bg-[#FDFBF7] relative group">
                                <div className="absolute -top-3 -left-3 border-t border-l border-black w-6 h-6 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1 duration-500"></div>
                                <div className="absolute -bottom-3 -right-3 border-b border-r border-black w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 duration-500"></div>
                                
                                <div className="text-center">
                                    <h3 className="chic-display text-3xl mb-8">Atelier</h3>
                                    <ul className="space-y-6 chic-body text-sm font-light text-gray-600">
                                      {business.location && (
                                        <li className="flex flex-col items-center">
                                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-semibold">Location</span>
                                          {business.location}
                                        </li>
                                      )}
                                      {business.email && (
                                        <li className="flex flex-col items-center">
                                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-semibold">Inquiries</span>
                                          <a href={`mailto:${business.email}`} className="hover:text-black transition-colors">{business.email}</a>
                                        </li>
                                      )}
                                      {business.phoneNumber && (
                                        <li className="flex flex-col items-center">
                                          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-semibold">Phone</span>
                                          <a href={`tel:${business.phoneNumber}`} className="hover:text-black transition-colors">{business.phoneNumber}</a>
                                        </li>
                                      )}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-white pt-24 pb-12 px-6">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 chic-body mb-24">
                    <div className="lg:col-span-2">
                        <h2 className="chic-display text-4xl mb-6">{business.name}</h2>
                        <p className="text-gray-500 text-base font-light max-w-md leading-relaxed mb-8">
                            {business.footerText || 'Elevating everyday aesthetics through mindful design and impeccable craftsmanship.'}
                        </p>
                        <div className="flex gap-6">
                            {business.instagramUrl && (
                                <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                    <Camera className="w-5 h-5 stroke-[1.5]" />
                                </a>
                            )}
                            {business.facebookUrl && (
                                <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                    <MessageCircle className="w-5 h-5 stroke-[1.5]" />
                                </a>
                            )}
                            {business.websiteUrl && (
                                <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors">
                                    <Globe className="w-5 h-5 stroke-[1.5]" />
                                </a>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black mb-8">Services</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-light">
                            {waNumber && (
                                <li>
                                    <a href={waLink()} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-2">
                                        Personal Styling
                                    </a>
                                </li>
                            )}
                            <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Size Guide</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] font-semibold tracking-[0.25em] uppercase text-black mb-8">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-light">
                            <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 chic-body text-xs text-gray-400 font-light tracking-wide">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>
                        Powered by <a href="/" className="text-black font-medium hover:underline">DukaanHai</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
