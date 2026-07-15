'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Key, BedDouble, Wine, MapPin, Camera, MessageCircle, Globe, ArrowRight, Stars, Clock } from 'lucide-react';

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

export default function HotelBoutiqueTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 150]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Good day. I would like to inquire about reserving the "${productName}" at ${business.name}.`
                : `Good day. I would like to inquire about a reservation at ${business.name}.`
        )}`;

    const primaryColor = business.primaryColor || '#4A3F35';
    const secondaryColor = business.secondaryColor || '#F0EBE1';

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#4A3F35] font-sans selection:bg-[#8C7A6B] selection:text-white border-x-8 md:border-x-[16px] border-[#8C7A6B] relative overflow-hidden">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@400;500;600;700&display=swap');
              .boutique-display { font-family: 'Libre Baskerville', serif; }
              .boutique-body { font-family: 'Karla', sans-serif; }
              
              .texture-overlay {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                opacity: 0.04;
                mix-blend-mode: multiply;
              }
              
              .vintage-border {
                 border: 1px solid #D0C5B5;
                 position: relative;
              }
              .vintage-border::before {
                 content: '';
                 position: absolute;
                 inset: 4px;
                 border: 1px solid #EAE3D5;
                 pointer-events: none;
              }
            `}</style>
            
            <div className="fixed inset-0 texture-overlay pointer-events-none z-50"></div>

            {/* Header */}
            <header className="px-6 py-10 md:py-16 flex flex-col items-center justify-center text-center relative z-10 border-b border-[#EAE3D5] bg-[#FDFBF7]/90 backdrop-blur-md sticky top-0">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                    <h1 className="boutique-display text-3xl md:text-5xl lg:text-5xl text-[#3A3026] mb-5 tracking-wide">
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-12 w-auto object-contain mx-auto" /> : business.name}
                    </h1>
                    <div className="flex items-center gap-4 text-[#8C7A6B] boutique-body text-[10px] md:text-xs font-bold uppercase tracking-[0.25em]">
                        <span className="w-12 h-px bg-[#D0C5B5]"></span>
                        <span className="flex items-center gap-2"><Compass className="w-3.5 h-3.5" /> {business.location || 'Curated Hospitality'}</span>
                        <span className="w-12 h-px bg-[#D0C5B5]"></span>
                    </div>
                </motion.div>
            </header>

            {/* Hero Content */}
            <section className="relative min-h-[75vh] flex flex-col items-center justify-center px-6 py-20 text-center">
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('hotel', '')) && (
                  <motion.div style={{ y: yTransform }} className="absolute inset-0 z-0 opacity-40">
                     <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('hotel', ''))} alt="Hotel Atmosphere" className="w-full h-full object-cover sepia-[0.3]" />
                     <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-transparent to-[#FDFBF7]"></div>
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  className="max-w-4xl mx-auto relative z-10 vintage-border bg-[#FDFBF7]/80 backdrop-blur-sm p-12 md:p-20 shadow-2xl shadow-[#8C7A6B]/5"
                >
                    <Stars className="w-8 h-8 mx-auto text-[#8C7A6B] mb-8 opacity-60" />
                    
                    <div className="boutique-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C7A6B] mb-6">
                        {business.category || 'Boutique Hotel'}
                    </div>

                    <h2 className="boutique-display text-3xl md:text-5xl leading-[1.3] text-[#3A3026] mb-8 italic font-normal text-balance">
                        "{(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'hotel')) || (config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'hotel')) || 'A curated experience of comfort and distinctive style.'}"
                    </h2>
                    
                    {waNumber && (
                        <div className="mt-12">
                            <a 
                              href={waLink()} 
                              style={{ backgroundColor: primaryColor }}
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-3 boutique-body font-bold text-xs uppercase tracking-[0.2em] text-white px-10 py-5 hover:bg-[#3A3026] transition-all border border-transparent hover:shadow-[0_10px_20px_rgba(74,63,53,0.15)] group"
                            >
                                {business.ctaText || 'Reservation Inquiry'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    )}
                </motion.div>
            </section>

            {/* Aesthetic Grid About & Vision */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission || business.vision) && (
                <section className="max-w-6xl mx-auto px-6 py-24 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission) && (
                           <motion.div 
                             initial={{ opacity: 0, x: -30 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true, margin: "-100px" }}
                             transition={{ duration: 1 }}
                             className="lg:col-span-7 bg-[#F0EBE1] p-12 md:p-16 border border-[#E0D8CA] relative"
                           >
                               <div className="absolute top-0 right-0 w-32 h-32 bg-[#EBE5D8] rounded-full blur-3xl opacity-50"></div>
                               <h3 className="boutique-display text-3xl mb-8 text-[#3A3026] flex items-center gap-4">
                                 <Key className="w-6 h-6 text-[#8C7A6B]" /> Our Story
                               </h3>
                               <p className="boutique-body text-[#6A5E51] leading-[2.2] text-[15px] md:text-base mb-8">
                                   {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission}
                               </p>
                               {business.mission && (config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) && (
                                   <div className="pt-8 border-t border-[#D0C5B5]/50">
                                      <h4 className="boutique-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B] mb-3">Our Mission</h4>
                                      <p className="boutique-display italic text-[#5A4D41] leading-relaxed">{business.mission}</p>
                                   </div>
                               )}
                           </motion.div>
                        )}
                        
                        {business.vision && (
                            <motion.div 
                              initial={{ opacity: 0, x: 30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="lg:col-span-5 bg-[#3A3026] text-[#FDFBF7] p-12 md:p-16 flex flex-col justify-center text-center relative overflow-hidden"
                            >
                                <div className="absolute top-4 left-4 border-t border-l border-[#8C7A6B]/30 w-16 h-16"></div>
                                <div className="absolute bottom-4 right-4 border-b border-r border-[#8C7A6B]/30 w-16 h-16"></div>
                                
                                <span className="boutique-display text-6xl text-[#8C7A6B] block mb-6 opacity-30">~</span>
                                <h4 className="boutique-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B] mb-6">The Vision</h4>
                                <p className="boutique-display italic text-xl md:text-2xl leading-[1.8] text-[#EAE3D5]">
                                    "{business.vision}"
                                </p>
                            </motion.div>
                        )}
                    </div>
                </section>
            )}

            {business.marketingDesc && (
               <section className="py-24 px-6 border-y border-[#EAE3D5] relative z-10 bg-[#FDFBF7]">
                  <div className="max-w-4xl mx-auto text-center">
                     <p className="boutique-body text-xl md:text-2xl text-[#6A5E51] leading-relaxed uppercase tracking-widest font-light">
                        "{business.marketingDesc}"
                     </p>
                  </div>
               </section>
            )}

            {/* Rooms via Aesthetic Grid */}
            {products.length > 0 && (
                <section className="px-6 max-w-[1400px] mx-auto py-32 relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="text-center mb-24 flex flex-col items-center"
                    >
                        <BedDouble className="w-8 h-8 text-[#8C7A6B] mb-6 opacity-60" />
                        <h3 className="boutique-display text-4xl md:text-5xl text-[#3A3026] mb-4">The Quarters</h3>
                        <p className="boutique-body text-[#8C7A6B] tracking-[0.2em] uppercase text-xs font-bold">Curated Spaces for Rest & Reflection</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
                        {products.map((product, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 40 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.8, delay: (idx % 3) * 0.15 }}
                              key={product.id} 
                              className="group cursor-pointer flex flex-col h-full"
                            >
                                <div className="mb-8 relative overflow-hidden aspect-[3/4] bg-[#EBE5D8] vintage-border">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 origin-center filter contrast-[0.95]"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BedDouble className="w-12 h-12 text-[#8C7A6B]/30" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-[#3A3026]/5 transition-colors duration-700"></div>
                                    
                                    {product.category && (
                                       <div className="absolute top-6 left-6 bg-[#FDFBF7]/90 backdrop-blur-sm px-4 py-1.5 boutique-body text-[9px] font-bold uppercase tracking-widest text-[#5A4D41]">
                                          {product.category}
                                       </div>
                                    )}
                                </div>

                                <div className="text-center px-4 flex-1 flex flex-col">
                                    <h4 className="boutique-display text-2xl text-[#3A3026] mb-3 group-hover:text-[#8C7A6B] transition-colors">{product.name}</h4>
                                    <div className="boutique-body font-bold text-[13px] text-[#8C7A6B] mb-5 tracking-[0.15em] uppercase">
                                        From {formatPrice(product.price)}
                                    </div>
                                    
                                    {product.description && (
                                        <p className="boutique-body text-[#7A6D60] text-sm leading-[1.8] mb-8 line-clamp-3 flex-1 mx-auto max-w-sm">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    {!product.inStock && (
                                       <p className="boutique-body text-xs font-bold uppercase tracking-widest text-red-800/60 mb-4">Fully Booked</p>
                                    )}
                                    
                                    <div className="mt-auto">
                                        <a 
                                          href={getProductUrl(business.slug, product.id)} 
                                          className="inline-flex items-center gap-2 boutique-display italic text-[#4A3F35] border-b border-[#D0C5B5] group-hover:border-[#4A3F35] pb-1 transition-colors text-lg"
                                        >
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-[#EAE3D5] pt-20 pb-12 px-6 relative z-10 bg-[#FDFBF7]">
                <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-16 mb-20">
                    <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                       <h2 className="boutique-display text-3xl text-[#3A3026] mb-6 flex items-center gap-3">
                           {business.name}
                       </h2>
                       <p className="boutique-body text-sm leading-[2] text-[#6A5E51] max-w-sm mb-10">
                          {business.footerText || "A sanctuary of refined taste, where every detail is meticulously curated for your comfort."}
                       </p>
                       
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#D0C5B5] flex items-center justify-center text-[#8C7A6B] hover:bg-[#3A3026] hover:text-[#FDFBF7] transition-all">
                               <Camera className="w-4 h-4" />
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#D0C5B5] flex items-center justify-center text-[#8C7A6B] hover:bg-[#3A3026] hover:text-[#FDFBF7] transition-all">
                               <MessageCircle className="w-4 h-4" />
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#D0C5B5] flex items-center justify-center text-[#8C7A6B] hover:bg-[#3A3026] hover:text-[#FDFBF7] transition-all">
                               <Globe className="w-4 h-4" />
                             </a>
                           )}
                       </div>
                    </div>
                    
                    <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left boutique-body">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B] mb-6">Concierge</h4>
                       <ul className="space-y-4 text-sm text-[#5A4D41]">
                           {waNumber && (
                              <li>
                                 <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-[#3A3026] transition-colors border-b border-transparent hover:border-[#3A3026] pb-0.5">
                                    Reservation Inquiry
                                 </a>
                              </li>
                           )}
                           {business.phoneNumber && (
                              <li>
                                 <a href={`tel:${business.phoneNumber}`} className="hover:text-[#3A3026] transition-colors">
                                    {business.phoneNumber}
                                 </a>
                              </li>
                           )}
                           {business.email && (
                              <li>
                                 <a href={`mailto:${business.email}`} className="hover:text-[#3A3026] transition-colors">
                                    {business.email}
                                 </a>
                              </li>
                           )}
                       </ul>
                    </div>
                    
                    <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left boutique-body">
                       <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B] mb-6">Location</h4>
                       <ul className="space-y-4 text-sm text-[#5A4D41]">
                           {business.location && (
                              <li className="flex items-start gap-3">
                                 <MapPin className="w-4 h-4 text-[#8C7A6B] shrink-0 mt-0.5" />
                                 <span className="leading-relaxed">{business.location}</span>
                              </li>
                           )}
                       </ul>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto border-t border-[#EAE3D5] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 boutique-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C7A6B]">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>Crafted softly with <a href="/" className="text-[#4A3F35] hover:text-black transition-colors border-b border-[#D0C5B5]">DukaanHai</a></p>
                </div>
            </footer>
        </div>
    );
}
