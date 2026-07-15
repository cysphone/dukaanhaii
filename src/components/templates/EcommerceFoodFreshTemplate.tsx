'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, ShoppingBasket, MapPin, Camera, MessageCircle, Globe, ArrowRight, Sun, Droplets, CheckCircle2, ChevronRight, Phone, Mail, Target } from 'lucide-react';

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

export default function EcommerceFoodFreshTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hi, I'd like to order "${productName}" from ${business.name}.`
                : `Hi, I'm interested in ordering fresh products from ${business.name}.`
        )}`;

    const primaryGreen = business.primaryColor || '#65a30d'; // lime-600
    const primaryOrange = business.secondaryColor || '#ea580c'; // orange-600

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#2C3322] font-sans selection:bg-[#EAF3DE] selection:text-[#2C3322] overflow-hidden relative">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
              .fresh-display { font-family: 'Nunito', sans-serif; }
              .fresh-body { font-family: 'Quicksand', sans-serif; }
              
              .organic-blob-1 { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
              .organic-blob-2 { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            `}</style>

            {/* Fresh Nav */}
            <nav className="fixed w-full top-0 z-50 bg-[#FDFCF8]/90 backdrop-blur-xl border-b border-[#EAF3DE]">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="fresh-display text-2xl font-black text-[#4d7c0f] flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EAF3DE] rounded-full flex items-center justify-center">
                          <Leaf className="w-5 h-5 text-[#65a30d] fill-[#65a30d]/20" />
                        </div>
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 fresh-body font-bold text-[#4B5543]">
                       {products.length > 0 && <a href="#market" className="hover:text-[#65a30d] transition-colors flex items-center gap-2"><ShoppingBasket className="w-4 h-4"/> Market</a>}
                       {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && <a href="#farm" className="hover:text-[#65a30d] transition-colors flex items-center gap-2"><Sun className="w-4 h-4"/> Our Farm</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: primaryOrange }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="fresh-body font-bold text-white px-6 py-2.5 rounded-full hover:opacity-90 transition-all shadow-[0_8px_20px_-6px_rgba(234,88,12,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(234,88,12,0.5)] hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            {business.ctaText || 'Order Fresh'}
                        </a>
                    )}
                </div>
            </nav>

            {/* Organic Hero */}
            <section className="relative px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center min-h-[90vh]">
                {/* Soft Organic Shapes */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FEF3C7] organic-blob-1 opacity-60 -z-10 blur-3xl"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#EAF3DE] organic-blob-2 opacity-60 -z-10 blur-3xl"
                />

                <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                  >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF3DE] text-[#4d7c0f] fresh-body font-bold text-sm mb-8 border border-[#d9f99d]">
                          <CheckCircle2 className="w-4 h-4 text-[#65a30d]" />
                          100% {business.category || 'Fresh & Organic'}
                      </div>
                      
                      <h1 className="fresh-display text-6xl md:text-7xl lg:text-[5.5rem] font-black text-[#2C3322] leading-[1.1] mb-8">
                          {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}
                      </h1>
                      
                      <p className="fresh-body text-xl text-[#4B5543] font-medium mb-12 leading-relaxed">
                          {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'ecommerce')) || 'Farm-fresh quality delivered straight to your door. Taste the difference of organic goodness every single day.'}
                      </p>

                      <div className="flex flex-wrap gap-4">
                          <a 
                            href="#market" 
                            style={{ backgroundColor: primaryGreen }}
                            className="fresh-body font-bold text-lg text-white px-8 py-4 rounded-full hover:opacity-90 transition-all shadow-[0_8px_20px_-6px_rgba(101,163,13,0.4)] hover:shadow-[0_12px_25px_-6px_rgba(101,163,13,0.5)] hover:-translate-y-1 flex items-center gap-3"
                          >
                              <ShoppingBasket className="w-5 h-5" /> Shop Fresh
                          </a>
                          
                          {business.marketingDesc && (
                            <a href="#farm" className="fresh-body font-bold text-lg text-[#4d7c0f] bg-[#EAF3DE] px-8 py-4 rounded-full hover:bg-[#d9f99d] transition-colors flex items-center gap-2">
                                Our Story
                            </a>
                          )}
                      </div>
                      
                      <div className="mt-12 flex items-center gap-6 text-[#6b7280] fresh-body text-sm font-semibold">
                         <div className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#eab308]"/> Sun-kissed</div>
                         <div className="flex items-center gap-2"><Droplets className="w-4 h-4 text-[#3b82f6]"/> Pure Water</div>
                         <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-[#22c55e]"/> Chemical Free</div>
                      </div>
                  </motion.div>
                  
                  {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'grocery')) && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1, delay: 0.2, type: "spring" }}
                      className="relative lg:h-[700px]"
                    >
                       <div className="absolute inset-0 bg-[#EAF3DE] organic-blob-2 scale-105 opacity-50 blur-xl"></div>
                       <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'grocery'))} alt="Fresh Produce" className="w-full h-full object-cover organic-blob-1 border-8 border-white shadow-2xl relative z-10" />
                       
                       {/* Floating Elements */}
                       <motion.div 
                         animate={{ y: [0, -15, 0] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         className="absolute top-10 -left-10 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-3 z-20 border border-[#f3f4f6]"
                       >
                         <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center text-2xl">🌱</div>
                         <div>
                           <p className="fresh-body font-bold text-[#2C3322]">Harvested</p>
                           <p className="fresh-body text-xs text-[#6b7280]">Daily Fresh</p>
                         </div>
                       </motion.div>
                       
                       <motion.div 
                         animate={{ y: [0, 15, 0] }}
                         transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                         className="absolute bottom-10 -right-10 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-3 z-20 border border-[#f3f4f6]"
                       >
                         <div className="w-12 h-12 bg-[#fce7f3] rounded-full flex items-center justify-center text-2xl">🚜</div>
                         <div>
                           <p className="fresh-body font-bold text-[#2C3322]">Direct from Farm</p>
                           <p className="fresh-body text-xs text-[#6b7280]">Local Sourced</p>
                         </div>
                       </motion.div>
                    </motion.div>
                  )}
                </div>
            </section>

            {/* Fresh About */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && (
                <section id="farm" className="py-32 px-6 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FAFAFA] rounded-full -translate-y-1/2 translate-x-1/4 -z-10"></div>
                    
                    <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
                        <motion.div 
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="lg:col-span-5 relative"
                        >
                            <div className="aspect-[4/5] bg-[#EAF3DE] organic-blob-2 relative overflow-hidden flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
                                <div className="text-center relative z-10">
                                   <Leaf className="w-24 h-24 text-[#65a30d] mx-auto mb-6 opacity-80" />
                                   <h3 className="fresh-display text-4xl font-black text-[#4d7c0f]">Grown with Love.</h3>
                                </div>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, x: 50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          className="lg:col-span-7 space-y-10"
                        >
                            <div>
                                <span className="fresh-body text-[#ea580c] font-bold tracking-widest uppercase text-sm mb-4 block">Our Roots</span>
                                <h2 className="fresh-display text-5xl md:text-6xl font-black text-[#2C3322] leading-[1.1]">
                                   Locally Sourced. <br />
                                   <span style={{ color: primaryGreen }}>Freshly Delivered.</span>
                                </h2>
                            </div>
                            
                            <p className="fresh-body text-xl text-[#4B5543] font-medium leading-relaxed max-w-2xl">
                                {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission}
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-[#f3f4f6]">
                               {business.mission && (
                                  <div>
                                    <div className="w-12 h-12 bg-[#EAF3DE] rounded-2xl flex items-center justify-center mb-4">
                                      <Target className="w-6 h-6 text-[#65a30d]" />
                                    </div>
                                    <h4 className="fresh-display text-xl font-bold text-[#2C3322] mb-2">Our Mission</h4>
                                    <p className="fresh-body text-[#6b7280] font-medium leading-relaxed">{business.mission}</p>
                                  </div>
                               )}
                               {business.vision && (
                                  <div>
                                    <div className="w-12 h-12 bg-[#FEF3C7] rounded-2xl flex items-center justify-center mb-4">
                                      <Sun className="w-6 h-6 text-[#eab308]" />
                                    </div>
                                    <h4 className="fresh-display text-xl font-bold text-[#2C3322] mb-2">Our Vision</h4>
                                    <p className="fresh-body text-[#6b7280] font-medium leading-relaxed">{business.vision}</p>
                                  </div>
                               )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
            
            {business.marketingDesc && (
               <section className="py-20 px-6 bg-[#65a30d] text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10 mix-blend-overlay"></div>
                 <div className="max-w-4xl mx-auto text-center relative z-10">
                    <p className="fresh-display text-3xl md:text-5xl font-black leading-tight italic">
                      "{business.marketingDesc}"
                    </p>
                 </div>
               </section>
            )}

            {/* Market Grid */}
            {products.length > 0 && (
                <section id="market" className="py-32 px-6 bg-[#FDFCF8]">
                    <div className="max-w-[1400px] mx-auto">
                        <div className="text-center mb-20">
                            <span className="fresh-body text-[#ea580c] font-bold tracking-widest uppercase text-sm mb-4 block">Farm to Table</span>
                            <h2 className="fresh-display text-5xl md:text-6xl font-black text-[#2C3322] mb-6">Fresh Market</h2>
                            <p className="fresh-body text-xl text-[#6b7280] font-medium">Handpicked selections harvested today</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product, i) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 30 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.5, delay: i * 0.1 }}
                                  key={product.id} 
                                  className="bg-white rounded-[2.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(101,163,13,0.1)] transition-all duration-500 group border border-[#f3f4f6] flex flex-col h-full"
                                >
                                    <div className="aspect-[4/3] rounded-[2rem] bg-[#EAF3DE] mb-6 overflow-hidden relative">
                                        {product.imageUrl ? (
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#65a30d]/30">
                                                <ShoppingBasket className="w-16 h-16" />
                                            </div>
                                        )}
                                        
                                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full fresh-body font-black text-[#2C3322] text-lg shadow-sm border border-[#f3f4f6]">
                                            {formatPrice(product.price)}
                                        </div>
                                        
                                        {!product.inStock && (
                                           <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                                              <span className="bg-[#ea580c] text-white fresh-display font-black text-xl px-6 py-2 rounded-full shadow-lg rotate-[-5deg]">Sold Out</span>
                                           </div>
                                        )}
                                    </div>

                                    <div className="px-4 pb-4 flex-1 flex flex-col">
                                        {product.category && (
                                          <span className="fresh-body text-xs font-bold text-[#65a30d] uppercase tracking-wider mb-2">
                                            {product.category}
                                          </span>
                                        )}
                                        <h3 className="fresh-display text-2xl font-black text-[#2C3322] mb-3 group-hover:text-[#65a30d] transition-colors line-clamp-1">{product.name}</h3>
                                        
                                        {product.description && (
                                            <p className="fresh-body text-[#6b7280] font-medium line-clamp-2 mb-6 leading-relaxed">
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        <div className="mt-auto pt-4 border-t border-[#f3f4f6]">
                                          <a 
                                            href={getProductUrl(business.slug, product.id)} 
                                            className="flex items-center justify-center gap-2 w-full text-center py-4 rounded-2xl bg-[#FDFCF8] border-2 border-[#EAF3DE] text-[#4d7c0f] fresh-body font-bold hover:bg-[#65a30d] hover:border-[#65a30d] hover:text-white transition-all group/btn"
                                          >
                                              <span>Add to basket</span>
                                              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
            <footer className="bg-[#2C3322] text-[#FDFCF8] pt-24 pb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4B5543] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none"></div>
                
                <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10 mb-20">
                   <div className="lg:col-span-2">
                       <h2 className="fresh-display text-5xl font-black text-[#EAF3DE] mb-6 flex items-center gap-3">
                           <Leaf className="w-8 h-8 text-[#65a30d] fill-[#65a30d]" />
                           {business.name}
                       </h2>
                       <p className="fresh-body text-[#9ca3af] font-medium max-w-sm mb-10 leading-relaxed text-lg">
                           {business.footerText || "Bringing nature's finest directly to your table. Eat fresh, live well."}
                       </p>
                       
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#4B5543] rounded-full flex items-center justify-center hover:bg-[#65a30d] transition-colors">
                               <Camera className="w-5 h-5" />
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#4B5543] rounded-full flex items-center justify-center hover:bg-[#65a30d] transition-colors">
                               <MessageCircle className="w-5 h-5" />
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#4B5543] rounded-full flex items-center justify-center hover:bg-[#65a30d] transition-colors">
                               <Globe className="w-5 h-5" />
                             </a>
                           )}
                       </div>
                   </div>
                   
                   <div>
                       <h4 className="fresh-display text-2xl font-bold text-white mb-8">Visit Farm</h4>
                       <ul className="space-y-6 fresh-body font-medium text-[#9ca3af]">
                           {business.location && (
                             <li className="flex items-start gap-4">
                               <div className="w-10 h-10 bg-[#4B5543] rounded-xl flex items-center justify-center shrink-0">
                                 <MapPin className="w-4 h-4 text-[#EAF3DE]" />
                               </div>
                               <span className="mt-2">{business.location}</span>
                             </li>
                           )}
                       </ul>
                   </div>
                   
                   <div>
                       <h4 className="fresh-display text-2xl font-bold text-white mb-8">Contact</h4>
                       <ul className="space-y-6 fresh-body font-medium text-[#9ca3af]">
                           {business.phoneNumber && (
                             <li className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-[#4B5543] rounded-xl flex items-center justify-center shrink-0">
                                 <Phone className="w-4 h-4 text-[#EAF3DE]" />
                               </div>
                               <a href={`tel:${business.phoneNumber}`} className="hover:text-white transition-colors">{business.phoneNumber}</a>
                             </li>
                           )}
                           {business.email && (
                             <li className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-[#4B5543] rounded-xl flex items-center justify-center shrink-0">
                                 <Mail className="w-4 h-4 text-[#EAF3DE]" />
                               </div>
                               <a href={`mailto:${business.email}`} className="hover:text-white transition-colors">{business.email}</a>
                             </li>
                           )}
                       </ul>
                   </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 border-t border-[#4B5543] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 fresh-body font-medium text-[#9ca3af]">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. Grown with care.`}</p>
                    <p>
                        Powered by <a href="/" className="text-[#EAF3DE] font-bold hover:text-[#65a30d] transition-colors">DukaanHai</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}
