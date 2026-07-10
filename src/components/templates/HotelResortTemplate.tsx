'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sun, Waves, Palmtree, Umbrella, Compass, MapPin, Camera, MessageCircle, Globe, ArrowRight, Anchor } from 'lucide-react';

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

export default function HotelResortTemplate({ business, products }: TemplateProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hello, I'd like to book the "${productName}" at ${business.name}.`
                : `Hello, I'm planning to stay at ${business.name}.`
        )}`;

    const primaryColor = business.primaryColor || '#0284c7'; // sky-600
    const secondaryColor = business.secondaryColor || '#f0f9ff'; // sky-50

    return (
        <div className="min-h-screen bg-[#F0F9FF] text-[#0369a1] font-sans selection:bg-[#38bdf8] selection:text-white overflow-hidden">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap');
              .resort-font { font-family: 'Plus Jakarta Sans', sans-serif; }
              
              .glass-nav {
                 background: rgba(255, 255, 255, 0.7);
                 backdrop-filter: blur(12px);
                 -webkit-backdrop-filter: blur(12px);
                 border-bottom: 1px solid rgba(255, 255, 255, 0.5);
              }
              
              .wave-animation {
                 animation: wave 8s linear infinite;
              }
              @keyframes wave {
                 0% { background-position-x: 0; }
                 100% { background-position-x: 1000px; }
              }
            `}</style>

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between resort-font">
                    <div className="text-2xl font-extrabold tracking-tight text-[#0c4a6e] flex items-center gap-2">
                        <Waves className="w-7 h-7 text-[#0ea5e9]" />
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-9 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden lg:flex items-center gap-8 text-[13px] font-bold tracking-[0.15em] uppercase text-[#0369a1]">
                       {products.length > 0 && <a href="#villas" className="hover:text-[#0ea5e9] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#0ea5e9] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Villas & Rooms</a>}
                       {(business.about || business.mission) && <a href="#resort" className="hover:text-[#0ea5e9] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#0ea5e9] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">The Resort</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          style={{ backgroundColor: primaryColor }}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-[#0ea5e9] text-white px-6 py-3 rounded-full font-bold shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:bg-[#0284c7] transition-all text-xs uppercase tracking-widest flex items-center gap-2 transform hover:-translate-y-0.5"
                        >
                            <Sun className="w-4 h-4" /> Book Stay
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#e0f2fe]">
                {business.bannerUrl && (
                  <motion.div style={{ y: yTransform }} className="absolute inset-0 z-0">
                     <img src={business.bannerUrl} alt="Tropical Resort" className="w-full h-full object-cover filter contrast-110 brightness-110 saturate-125 mix-blend-multiply opacity-30" />
                  </motion.div>
                )}
                
                {/* Decorative Sun */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-tr from-[#fef08a] to-[#fde047] rounded-full filter blur-[80px] opacity-40 mix-blend-multiply pointer-events-none z-0"
                ></motion.div>

                <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center pb-20">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                      className="space-y-8 resort-font mt-12 lg:mt-0"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0369a1] text-xs font-bold uppercase tracking-widest shadow-sm">
                            <Compass className="w-4 h-4 text-[#0ea5e9]" />
                            {business.category || 'Tropical Paradise'}
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[#0c4a6e] leading-[1.05] tracking-tight drop-shadow-sm">
                            {business.headline || business.name}
                        </h1>
                        
                        <p className="text-lg md:text-xl text-[#0369a1] font-medium max-w-xl leading-relaxed">
                            {business.tagline || 'Experience the perfect blend of luxury, comfort, and breathtaking views at our exclusive resort.'}
                        </p>
                        
                        {waNumber && (
                            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <a 
                                  href={waLink()} 
                                  style={{ backgroundColor: primaryColor }}
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-[#0ea5e9] text-white rounded-2xl font-bold shadow-xl shadow-[#0ea5e9]/30 hover:bg-[#0284c7] hover:-translate-y-1 transition-all text-sm uppercase tracking-widest group"
                                >
                                    Check Availability <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                {products.length > 0 && (
                                   <a href="#villas" className="text-[#0369a1] font-bold text-sm uppercase tracking-widest hover:text-[#0ea5e9] transition-colors flex items-center gap-2 px-4 py-4">
                                      View Villas
                                   </a>
                                )}
                            </div>
                        )}
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="relative hidden lg:block h-[700px] w-full"
                    >
                       <div className="absolute inset-0 bg-[#bae6fd] rounded-[3rem] rotate-3 opacity-50 scale-105"></div>
                       <div className="absolute inset-0 bg-white rounded-[3rem] overflow-hidden shadow-2xl p-3 border border-white">
                          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                             {business.bannerUrl ? (
                                <img src={business.bannerUrl} alt="Resort" className="w-full h-full object-cover" />
                             ) : (
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center"></div>
                             )}
                             <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/50 to-transparent"></div>
                          </div>
                       </div>
                       
                       {/* Floating Badge */}
                       <motion.div 
                         animate={{ y: [0, -10, 0] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                         className="absolute -left-10 top-1/4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4"
                       >
                          <div className="w-12 h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center">
                             <Umbrella className="w-6 h-6 text-[#0ea5e9]" />
                          </div>
                          <div>
                             <p className="text-[#0c4a6e] font-extrabold text-sm">Premium</p>
                             <p className="text-[#0369a1] text-xs font-semibold">Resort & Spa</p>
                          </div>
                       </motion.div>
                    </motion.div>
                </div>
                
                {/* Wave SVG Bottom */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 translate-y-[1px]">
                    <svg className="relative block w-full h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F0F9FF" opacity="0.5"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#F0F9FF"></path>
                    </svg>
                </div>
            </section>

            {/* About Box */}
            {(business.about || business.mission) && (
                <section id="resort" className="py-24 px-6 relative z-10 bg-[#F0F9FF]">
                    <div className="max-w-[1200px] mx-auto relative">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-[#bae6fd]/30 border border-[#e0f2fe] resort-font grid lg:grid-cols-2 gap-12 items-center"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e0f2fe] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                            
                            <div>
                                <h4 className="text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                                   <Palmtree className="w-5 h-5" /> About Our Resort
                                </h4>
                                <h2 className="text-4xl md:text-5xl font-extrabold text-[#0c4a6e] mb-6 leading-tight">Your Personal Slice of Paradise</h2>
                                <p className="text-[#0369a1] font-medium leading-[1.8] text-lg mb-8">
                                    {business.about || business.mission}
                                </p>
                                
                                {business.vision && (
                                   <div className="bg-[#f0f9ff] p-6 rounded-2xl border border-[#e0f2fe]">
                                      <h5 className="text-[#0c4a6e] font-extrabold text-sm uppercase tracking-wider mb-2">Our Vision</h5>
                                      <p className="text-[#0284c7] italic leading-relaxed">{business.vision}</p>
                                   </div>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="bg-[#f0f9ff] aspect-square rounded-[2rem] flex flex-col items-center justify-center p-6 text-center border border-[#e0f2fe] hover:bg-[#e0f2fe] transition-colors cursor-pointer group">
                                       <Waves className="w-10 h-10 text-[#0ea5e9] mb-4 group-hover:scale-110 transition-transform" />
                                       <span className="font-extrabold text-[#0c4a6e]">Private<br/>Beaches</span>
                                    </div>
                                    <div className="bg-[#0ea5e9] aspect-square rounded-[2rem] flex flex-col items-center justify-center p-6 text-center shadow-lg shadow-[#0ea5e9]/20 hover:bg-[#0284c7] transition-colors cursor-pointer group text-white">
                                       <Sun className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                                       <span className="font-extrabold">Endless<br/>Sunshine</span>
                                    </div>
                                </div>
                                <div className="space-y-4 translate-y-8">
                                    <div className="bg-[#0c4a6e] aspect-square rounded-[2rem] flex flex-col items-center justify-center p-6 text-center shadow-lg shadow-[#0c4a6e]/20 hover:bg-[#075985] transition-colors cursor-pointer group text-white">
                                       <Umbrella className="w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
                                       <span className="font-extrabold">Luxury<br/>Amenities</span>
                                    </div>
                                    <div className="bg-[#f0f9ff] aspect-square rounded-[2rem] flex flex-col items-center justify-center p-6 text-center border border-[#e0f2fe] hover:bg-[#e0f2fe] transition-colors cursor-pointer group">
                                       <Anchor className="w-10 h-10 text-[#0ea5e9] mb-4 group-hover:scale-110 transition-transform" />
                                       <span className="font-extrabold text-[#0c4a6e]">Ocean<br/>Activities</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}
            
            {business.marketingDesc && (
               <section className="py-20 px-6 bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                  >
                     <p className="resort-font text-2xl md:text-4xl font-extrabold leading-tight">
                        "{business.marketingDesc}"
                     </p>
                  </motion.div>
               </section>
            )}

            {/* Rooms Grid */}
            {products.length > 0 && (
                <section id="villas" className="py-32 px-6 bg-[#F0F9FF]">
                    <div className="max-w-[1400px] mx-auto resort-font">
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center text-center mb-20"
                        >
                            <h4 className="text-[#0ea5e9] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                               <MapPin className="w-4 h-4" /> Discover Your Sanctuary
                            </h4>
                            <h2 className="text-4xl md:text-6xl font-extrabold text-[#0c4a6e] tracking-tight">Rooms & Villas</h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {products.map((product, idx) => (
                                <motion.div 
                                  initial={{ opacity: 0, y: 40 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, margin: "-50px" }}
                                  transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                                  key={product.id} 
                                  className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-[#bae6fd]/20 hover:shadow-2xl hover:shadow-[#bae6fd]/50 transition-all duration-500 group flex flex-col h-full"
                                >
                                    <div className="aspect-[4/3] rounded-[2rem] bg-[#e0f2fe] overflow-hidden relative mb-6">
                                        {product.imageUrl ? (
                                            <img 
                                              src={product.imageUrl} 
                                              alt={product.name} 
                                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#bae6fd]">
                                               <Waves className="w-16 h-16" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e]/80 via-transparent to-transparent"></div>
                                        
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-extrabold text-[#0369a1] shadow-sm">
                                            {formatPrice(product.price)}
                                        </div>
                                        
                                        {product.category && (
                                           <div className="absolute bottom-4 left-4">
                                              <span className="bg-[#0ea5e9] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                                 {product.category}
                                              </span>
                                           </div>
                                        )}
                                    </div>
                                    
                                    <div className="px-4 pb-4 flex-1 flex flex-col">
                                        <h3 className="text-2xl font-extrabold text-[#0c4a6e] mb-4 group-hover:text-[#0ea5e9] transition-colors">{product.name}</h3>
                                        
                                        {product.description && (
                                            <p className="text-[#0369a1] font-medium text-sm leading-[1.8] mb-8 flex-1">
                                                {product.description}
                                            </p>
                                        )}
                                        
                                        {!product.inStock && (
                                           <p className="text-red-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                                              <span className="w-2 h-2 rounded-full bg-red-500"></span> Fully Booked
                                           </p>
                                        )}
                                        
                                        <div className="mt-auto">
                                            <a 
                                              href={getProductUrl(business.slug, product.id)} 
                                              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#f0f9ff] text-[#0ea5e9] font-extrabold hover:bg-[#0ea5e9] hover:text-white transition-colors group/btn"
                                            >
                                                View Details <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
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
            <footer className="bg-[#0c4a6e] text-[#bae6fd] pt-32 pb-12 resort-font relative overflow-hidden">
                {/* Wave top */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F0F9FF" opacity="0.3"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#F0F9FF"></path>
                    </svg>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-12 gap-16 mb-20 relative z-10 mt-10">
                   <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
                      <h2 className="text-4xl font-extrabold text-white mb-6 flex items-center gap-3">
                         <Waves className="w-8 h-8 text-[#0ea5e9]" />
                         {business.name}
                      </h2>
                      <p className="font-medium text-[#7dd3fc] max-w-sm mb-10 leading-relaxed text-lg">
                         {business.footerText || "Your passport to paradise. Where every moment is a memory in the making."}
                      </p>
                      
                      <div className="flex gap-4">
                         {business.instagramUrl && (
                           <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#075985] rounded-full flex items-center justify-center text-white hover:bg-[#0ea5e9] hover:-translate-y-1 transition-all">
                             <Camera className="w-5 h-5" />
                           </a>
                         )}
                         {business.facebookUrl && (
                           <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#075985] rounded-full flex items-center justify-center text-white hover:bg-[#0ea5e9] hover:-translate-y-1 transition-all">
                             <MessageCircle className="w-5 h-5" />
                           </a>
                         )}
                         {business.websiteUrl && (
                           <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-[#075985] rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0c4a6e] hover:-translate-y-1 transition-all">
                             <Globe className="w-5 h-5" />
                           </a>
                         )}
                      </div>
                   </div>
                   
                   <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4 className="font-extrabold text-[#0ea5e9] uppercase tracking-widest mb-6">Contact Oasis</h4>
                      <ul className="space-y-4 font-bold text-white">
                         {waNumber && (
                            <li>
                               <a href={waLink()} target="_blank" rel="noreferrer" className="hover:text-[#0ea5e9] transition-colors">Book via WhatsApp</a>
                            </li>
                         )}
                         {business.phoneNumber && (
                            <li>
                               <a href={`tel:${business.phoneNumber}`} className="hover:text-[#0ea5e9] transition-colors">{business.phoneNumber}</a>
                            </li>
                         )}
                         {business.email && (
                            <li>
                               <a href={`mailto:${business.email}`} className="hover:text-[#0ea5e9] transition-colors">{business.email}</a>
                            </li>
                         )}
                      </ul>
                   </div>
                   
                   <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                      <h4 className="font-extrabold text-[#0ea5e9] uppercase tracking-widest mb-6">Location</h4>
                      <ul className="space-y-4 font-bold text-white">
                         {business.location && (
                            <li className="flex items-start gap-3">
                               <MapPin className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                               <span>{business.location}</span>
                            </li>
                         )}
                      </ul>
                   </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 border-t border-[#075985] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 font-extrabold text-xs uppercase tracking-widest text-[#7dd3fc]">
                    <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                    <p>Designed with <a href="/" className="text-white hover:text-[#0ea5e9] transition-colors">DukaanHai</a></p>
                </div>
            </footer>
        </div>
    );
}
