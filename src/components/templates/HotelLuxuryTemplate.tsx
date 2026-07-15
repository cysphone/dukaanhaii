'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Crown, ConciergeBell, Wine, MapPin, Camera, MessageCircle, Globe, ArrowRight, Diamond, Sparkles } from 'lucide-react';

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

export default function HotelLuxuryTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I would like to inquire about booking "${productName}" at ${business.name}.`
                : `Hello, I'm interested in staying at ${business.name}.`
        )}`;

    const primaryGold = business.primaryColor || '#D4AF37'; // luxury gold

    return (
        <div className="min-h-screen bg-[#0d0b0a] text-[#E0D8C8] font-sans selection:bg-[#D4AF37] selection:text-[#0d0b0a] overflow-hidden">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap');
              .luxury-display { font-family: 'Playfair Display', serif; }
              .luxury-body { font-family: 'Inter', sans-serif; }
              
              .gold-gradient {
                background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
              
              .gold-border {
                border-image: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C) 1;
              }
              
              .noise-bg {
                 background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                 opacity: 0.05;
                 mix-blend-mode: overlay;
                 pointer-events: none;
              }
            `}</style>
            
            <div className="fixed inset-0 noise-bg z-50"></div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 transition-all duration-700 bg-[#0d0b0a]/90 backdrop-blur-lg border-b border-[#D4AF37]/20">
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-24 flex items-center justify-between">
                    <div className="luxury-display text-2xl md:text-3xl text-white tracking-widest flex items-center gap-3">
                        <Crown className="w-6 h-6 text-[#D4AF37]" />
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-12 luxury-body text-[11px] font-semibold tracking-[0.3em] uppercase text-[#AFA999]">
                        {products.length > 0 && <a href="#suites" className="hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-px after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">Accommodations</a>}
                        {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission) && <a href="#experience" className="hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-3 after:left-0 after:w-full after:h-px after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">The Experience</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="luxury-body text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-[#0d0b0a] bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] px-8 py-3 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                        >
                            {business.ctaText || 'Reserve Now'}
                        </a>
                    )}
                </div>
                {/* Decorative border line */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
            </header>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
                <motion.div style={{ y: yTransform }} className="absolute inset-0 z-0">
                   {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('hotel', '')) ? (
                      <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('hotel', ''))} alt="Luxury Hotel" className="w-full h-full object-cover filter contrast-125 brightness-75 sepia-[0.2]" />
                   ) : (
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center filter grayscale blend-lighten"></div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b0a]/90 via-[#0d0b0a]/60 to-[#0d0b0a]"></div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37] rounded-full filter blur-[150px] opacity-10 pointer-events-none z-0"
                ></motion.div>

                <div className="relative z-10 text-center max-w-[1200px] mx-auto px-6 flex flex-col items-center mt-12">
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                      className="flex flex-col items-center w-full"
                    >
                        <div className="flex items-center justify-center gap-6 mb-12 w-full max-w-xl mx-auto">
                            <span className="h-px bg-gradient-to-r from-transparent to-[#D4AF37] flex-1"></span>
                            <span className="luxury-body text-[#D4AF37] text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em]">
                               {business.category || '5-Star Luxury Experience'}
                            </span>
                            <span className="h-px bg-gradient-to-l from-transparent to-[#D4AF37] flex-1"></span>
                        </div>

                        <h1 className="luxury-display text-5xl md:text-7xl lg:text-[7rem] text-white font-normal mb-10 leading-[1.05] tracking-tight drop-shadow-2xl">
                            {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'hotel')) || business.name}
                        </h1>

                        <p className="luxury-display italic text-xl md:text-3xl text-[#E0D8C8] max-w-3xl mx-auto font-light leading-relaxed mb-16 opacity-90">
                            "{(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'hotel')) || 'Experience the pinnacle of luxury, refined comfort, and uncompromised elegance.'}"
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-8">
                            {waNumber && (
                                <a 
                                  href={waLink()} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center gap-4 border border-[#D4AF37]/50 bg-[#0d0b0a]/50 backdrop-blur-md px-12 py-5 text-white hover:bg-[#D4AF37] hover:text-[#0d0b0a] hover:border-[#D4AF37] transition-all duration-700 luxury-body text-xs font-semibold uppercase tracking-[0.25em] group relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-3">
                                       Reserve Your Stay <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#B38728] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                                </a>
                            )}
                            {products.length > 0 && (
                               <a 
                                 href="#suites" 
                                 className="luxury-body text-xs font-semibold uppercase tracking-[0.2em] text-[#AFA999] hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-[#D4AF37] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                               >
                                  Explore Suites
                               </a>
                            )}
                        </div>
                    </motion.div>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 1 }}
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
                >
                   <span className="luxury-body text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">Scroll to Discover</span>
                   <div className="w-px h-16 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                </motion.div>
            </section>

            {/* The Story */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission || business.marketingDesc) && (
                <section id="experience" className="py-32 px-6 relative z-10">
                    <div className="max-w-[1200px] mx-auto">
                        {business.marketingDesc && (
                           <motion.div 
                             initial={{ opacity: 0, y: 30 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true, margin: "-100px" }}
                             transition={{ duration: 1 }}
                             className="text-center mb-32"
                           >
                              <Diamond className="w-8 h-8 mx-auto text-[#D4AF37] mb-8" />
                              <h2 className="luxury-display text-3xl md:text-5xl lg:text-6xl text-[#E0D8C8] leading-[1.3] max-w-4xl mx-auto italic font-light">
                                 "{business.marketingDesc}"
                              </h2>
                           </motion.div>
                        )}
                        
                        <div className="grid lg:grid-cols-12 gap-16 items-center">
                            <motion.div 
                              initial={{ opacity: 0, x: -50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 1.2 }}
                              className="lg:col-span-5 relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#D4AF37]/30"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#D4AF37]/30"></div>
                                <div className="p-10 md:p-14">
                                   <ConciergeBell className="w-10 h-10 text-[#D4AF37] mb-8" />
                                   <h3 className="luxury-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">The Hotel</h3>
                                   <h2 className="luxury-display text-4xl md:text-5xl text-white leading-tight mb-8">An Oasis of <br/>Refinement</h2>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 1.2, delay: 0.2 }}
                              className="lg:col-span-7"
                            >
                                <div className="pl-6 md:pl-12 border-l border-[#D4AF37]/20">
                                   <p className="luxury-display text-xl md:text-2xl leading-relaxed text-[#AFA999] font-light mb-10">
                                       {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'hotel')) || business.mission}
                                   </p>
                                   
                                   {business.vision && (
                                       <div className="pt-10 border-t border-[#D4AF37]/10">
                                          <h4 className="luxury-body text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-4">Our Vision</h4>
                                          <p className="luxury-body text-[#E0D8C8] leading-[2] font-light text-sm">
                                              {business.vision}
                                          </p>
                                       </div>
                                   )}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Rooms & Suites */}
            {products.length > 0 && (
                <section id="suites" className="py-32 px-6 relative z-10 bg-[#080706]">
                    <div className="max-w-[1400px] mx-auto">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="flex flex-col items-center text-center mb-32"
                        >
                            <span className="luxury-body text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.4em] mb-6 flex items-center gap-4">
                               <span className="w-8 h-px bg-[#D4AF37]/50"></span>
                               Accommodation
                               <span className="w-8 h-px bg-[#D4AF37]/50"></span>
                            </span>
                            <h2 className="luxury-display text-5xl md:text-7xl text-white tracking-wide">Rooms & Suites</h2>
                        </motion.div>

                        <div className="space-y-32 md:space-y-40">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 50 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-100px" }}
                                  transition={{ duration: 1.2 }}
                                  key={product.id} 
                                  className={`flex flex-col lg:flex-row gap-16 xl:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} group`}
                                >
                                    {/* Image */}
                                    <div className="w-full lg:w-[55%] relative">
                                        <div className="absolute -inset-4 border border-[#D4AF37]/20 z-0"></div>
                                        <div className="aspect-[4/3] bg-[#141210] relative overflow-hidden z-10">
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-[20s] ease-out group-hover:scale-110 filter contrast-125"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center border border-dashed border-[#D4AF37]/20">
                                                    <Wine className="w-16 h-16 text-[#D4AF37]/20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-80"></div>
                                            <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-1000 mix-blend-overlay"></div>
                                            
                                            {/* Category Tag */}
                                            {product.category && (
                                               <div className="absolute top-6 left-6 bg-[#0d0b0a]/80 backdrop-blur-md px-4 py-2 border border-[#D4AF37]/30 luxury-body text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                                                  {product.category}
                                               </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="w-full lg:w-[45%] flex flex-col items-start px-4 md:px-0 relative z-10">
                                        <Sparkles className="w-5 h-5 text-[#D4AF37]/50 mb-6" />
                                        <h3 className="luxury-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">{product.name}</h3>
                                        
                                        <div className="flex items-end gap-3 mb-10 pb-10 border-b border-[#D4AF37]/20 w-full">
                                           <div className="luxury-display text-[#D4AF37] text-3xl">{formatPrice(product.price)}</div>
                                           <div className="luxury-body text-[10px] uppercase tracking-[0.2em] text-[#807D73] mb-1.5">/ Night</div>
                                        </div>

                                        {product.description && (
                                            <p className="luxury-body text-[#AFA999] text-[15px] leading-[2] font-light mb-12">
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        {!product.inStock && (
                                           <div className="mb-8 border border-red-900/50 bg-red-900/10 px-6 py-3 luxury-body text-xs font-bold uppercase tracking-widest text-red-500">
                                              No Availability
                                           </div>
                                        )}

                                        <a 
                                          href={getProductUrl(business.slug, product.id)} 
                                          className="inline-flex items-center gap-4 luxury-body text-[11px] font-bold uppercase tracking-[0.25em] border border-[#D4AF37]/50 text-[#D4AF37] px-10 py-4 hover:bg-[#D4AF37] hover:text-[#0d0b0a] transition-all duration-500 group/link"
                                        >
                                            Discover Suite <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="pt-32 pb-16 bg-[#050404] border-t border-[#D4AF37]/20 relative z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
                
                <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-12 gap-16 mb-24">
                       <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                          <h2 className="luxury-display text-4xl text-[#D4AF37] tracking-widest mb-8 flex items-center gap-4">
                             <Crown className="w-8 h-8" />
                             {business.name}
                          </h2>
                          <p className="luxury-body text-sm leading-[2] font-light text-[#AFA999] max-w-sm mb-12">
                             {business.footerText || "An unparalleled destination of prestige, where luxury meets timeless elegance."}
                          </p>
                          
                          <div className="flex gap-5">
                             {business.instagramUrl && (
                               <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#AFA999] hover:bg-[#D4AF37] hover:text-[#050404] hover:border-[#D4AF37] transition-all duration-500">
                                 <Camera className="w-4 h-4" />
                               </a>
                             )}
                             {business.facebookUrl && (
                               <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#AFA999] hover:bg-[#D4AF37] hover:text-[#050404] hover:border-[#D4AF37] transition-all duration-500">
                                 <MessageCircle className="w-4 h-4" />
                               </a>
                             )}
                             {business.websiteUrl && (
                               <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#AFA999] hover:bg-white hover:text-black hover:border-white transition-all duration-500">
                                 <Globe className="w-4 h-4" />
                               </a>
                             )}
                          </div>
                       </div>
                       
                       <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left luxury-body">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8">Concierge</h4>
                          <ul className="space-y-5 text-[13px] font-light tracking-wide text-[#E0D8C8]">
                             {waNumber && (
                                <li>
                                   <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                                      Reservation Inquiry
                                   </a>
                                </li>
                             )}
                             {business.phoneNumber && (
                                <li>
                                   <a href={`tel:${business.phoneNumber}`} className="hover:text-[#D4AF37] transition-colors">
                                      {business.phoneNumber}
                                   </a>
                                </li>
                             )}
                             {business.email && (
                                <li>
                                   <a href={`mailto:${business.email}`} className="hover:text-[#D4AF37] transition-colors">
                                      {business.email}
                                   </a>
                                </li>
                             )}
                          </ul>
                       </div>
                       
                       <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left luxury-body">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8">Location</h4>
                          <ul className="space-y-5 text-[13px] font-light tracking-wide text-[#E0D8C8]">
                             {business.location && (
                                <li className="flex items-start gap-4">
                                   <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                                   <span className="leading-[1.8] max-w-xs">{business.location}</span>
                                </li>
                             )}
                          </ul>
                       </div>
                    </div>

                    <div className="border-t border-[#D4AF37]/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 luxury-body text-[10px] font-semibold uppercase tracking-[0.3em] text-[#807D73]">
                        <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                        <p>Powered by <a href="/" className="text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/30 hover:border-white pb-0.5">DukaanHai</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
