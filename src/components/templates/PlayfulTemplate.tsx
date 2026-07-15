'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Camera, MessageCircle, Globe, Send, ShoppingBag } from 'lucide-react';

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

export default function PlayfulTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hey there! 🌟 I want to grab "${productName}" from ${business.name}.`
                : `Hey! 👋 I'm super interested in what ${business.name} has to offer.`
        )}`;

    const accentColor = business.primaryColor || '#FF6B6B'; // Reddish-pink

    return (
        <div className="min-h-screen bg-[#FFF4E6] text-[#2D3142] font-sans selection:bg-[#FFB1B1] selection:text-white overflow-hidden relative">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');
              .playful-display { font-family: 'Fredoka', sans-serif; }
              .playful-body { font-family: 'Nunito', sans-serif; }
              .brutal-shadow { box-shadow: 6px 6px 0px 0px #2D3142; }
              .brutal-shadow-hover:hover { box-shadow: 2px 2px 0px 0px #2D3142; transform: translate(4px, 4px); }
              .brutal-border { border: 3px solid #2D3142; }
              .blob-bg { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
              .squiggle-underline { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 4'%3E%3Cpath fill='none' stroke='%232D3142' stroke-width='2' stroke-linecap='round' d='M0 2 Q 5 4 10 2 T 20 2'/%3E%3C/svg%3E"); background-repeat: repeat-x; background-position: bottom; padding-bottom: 6px; }
            `}</style>

            {/* Fun Background Shapes */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -left-20 w-64 h-64 bg-[#FFE66D] rounded-full mix-blend-multiply opacity-50 blur-3xl" 
                />
                <motion.div 
                  animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/3 -right-20 w-96 h-96 bg-[#4ECDC4] blob-bg mix-blend-multiply opacity-40 blur-3xl" 
                />
                <motion.div 
                  animate={{ y: [0, -50, 0], x: [0, 30, 0] }} 
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#FF6B6B] rounded-full mix-blend-multiply opacity-40 blur-3xl" 
                />
            </div>

            {/* Header */}
            <header className="sticky top-4 w-full z-50 px-4 md:px-8">
                <motion.div 
                  initial={{ y: -100 }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="max-w-7xl mx-auto bg-white brutal-border brutal-shadow rounded-[2rem] px-6 py-4 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-12 h-12 bg-[#FFD93D] rounded-full flex items-center justify-center brutal-border shadow-[2px_2px_0px_#2D3142] group-hover:rotate-12 group-hover:scale-110 transition-all">
                            <Star className="w-6 h-6 text-[#2D3142] fill-[#2D3142]" />
                        </div>
                        <h1 className="playful-display text-3xl font-bold tracking-tight text-[#2D3142]">
                            {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <nav className="hidden lg:flex gap-6 playful-body font-bold text-lg text-[#2D3142]">
                           {products.length > 0 && <a href="#goodies" className="hover:text-[#FF6B6B] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-[#FF6B6B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Goodies</a>}
                           {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'general')) && <a href="#vibes" className="hover:text-[#FF6B6B] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:bg-[#FF6B6B] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">Vibes</a>}
                        </nav>

                        {waNumber && (
                            <a
                                href={waLink()} style={{ backgroundColor: accentColor }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="playful-body text-[#2D3142] font-black text-lg px-6 py-2.5 rounded-2xl brutal-border brutal-shadow brutal-shadow-hover transition-all flex items-center gap-2"
                            >
                                <Send className="w-5 h-5 -mt-0.5" />
                                {business.ctaText || "Let's Chat!"}
                            </a>
                        )}
                    </div>
                </motion.div>
            </header>

            {/* Hero */}
            <section className="relative pt-24 pb-32 px-6 max-w-7xl mx-auto z-10 text-center flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                >
                  {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'general')) && (
                      <div className="inline-block px-8 py-3 bg-[#FFE66D] text-[#2D3142] font-black playful-body text-xl rounded-full brutal-border shadow-[4px_4px_0px_#2D3142] -rotate-3 mb-12 hover:rotate-0 transition-transform cursor-default">
                          ✨ {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'general'))} ✨
                      </div>
                  )}
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="playful-display text-6xl md:text-8xl lg:text-[7rem] font-black text-[#2D3142] leading-[1.05] mb-10 max-w-5xl mx-auto"
                  style={{ textShadow: '4px 4px 0px #FFD93D' }}
                >
                    {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'general')) || business.name}
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {business.marketingDesc && (
                      <p className="playful-body text-2xl md:text-3xl text-[#2D3142] font-bold max-w-3xl mx-auto leading-relaxed squiggle-underline inline-block pb-2">
                          {business.marketingDesc}
                      </p>
                  )}
                </motion.div>
                
                {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('general', '')) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="w-full mt-24 aspect-[21/9] rounded-[3rem] overflow-hidden brutal-border brutal-shadow bg-white p-4 rotate-1 hover:rotate-0 transition-transform"
                  >
                    <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('general', ''))} alt="Hero Banner" className="w-full h-full object-cover rounded-[2rem] brutal-border" />
                  </motion.div>
                )}
            </section>

            {/* The Goods (Products) */}
            {products.length > 0 && (
                <section id="goodies" className="py-32 px-6 relative z-10 bg-[#4ECDC4] border-y-[6px] border-[#2D3142]">
                    {/* Top squiggles or shapes could go here */}
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20 bg-white p-8 rounded-[3rem] brutal-border brutal-shadow -rotate-1">
                            <h3 className="playful-display text-6xl text-[#2D3142] font-black flex items-center gap-4">
                                The <span className="text-[#FF6B6B] squiggle-underline">Goodies</span> 🛍️
                            </h3>
                            <div className="bg-[#FFE66D] px-8 py-4 rounded-full brutal-border shadow-[4px_4px_0px_#2D3142] rotate-3">
                                <span className="playful-body font-black text-[#2D3142] text-2xl">
                                    {products.length} Items Inside!
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                            {products.map((product, i) => {
                                const colors = ['bg-[#FFB1B1]', 'bg-[#FFE66D]', 'bg-[#FF9F1C]', 'bg-[#FFF4E6]', 'bg-white'];
                                const color = colors[i % colors.length];
                                return (
                                    <motion.div 
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true, margin: "-50px" }}
                                      transition={{ type: "spring", bounce: 0.4, delay: i * 0.1 }}
                                      key={product.id} 
                                      className={`bg-white rounded-[3rem] p-5 brutal-border brutal-shadow hover:brutal-shadow-hover transition-all duration-300 flex flex-col h-full group ${i % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0`}
                                    >
                                        <div className={`${color} rounded-[2.5rem] p-4 mb-6 aspect-square relative brutal-border overflow-hidden`}>
                                            {product.imageUrl ? (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover rounded-[2rem] brutal-border group-hover:scale-110 transition-transform duration-500 bg-white"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white rounded-[2rem] brutal-border flex items-center justify-center">
                                                    <ShoppingBag className="w-20 h-20 text-[#2D3142]" />
                                                </div>
                                            )}
                                            <div className="absolute -top-4 -right-4 bg-white px-4 py-2 rounded-full brutal-border shadow-[4px_4px_0px_#2D3142] rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all z-10">
                                                <span className="playful-display text-3xl font-black text-[#FF6B6B]">
                                                    {formatPrice(product.price)}
                                                </span>
                                            </div>
                                            {!product.inStock && (
                                               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2D3142] text-white playful-display text-3xl px-6 py-2 -rotate-12 brutal-border">
                                                 SOLD OUT!
                                               </div>
                                            )}
                                        </div>

                                        <div className="px-4 flex-grow flex flex-col">
                                            <div className="flex justify-between items-start gap-2 mb-2">
                                              <h4 className="playful-display text-3xl font-bold text-[#2D3142] group-hover:text-[#4ECDC4] transition-colors line-clamp-2">{product.name}</h4>
                                            </div>
                                            
                                            {product.category && (
                                              <span className="playful-body text-sm font-bold text-[#FF9F1C] uppercase tracking-wider mb-3">
                                                {product.category}
                                              </span>
                                            )}

                                            {product.description && (
                                                <p className="playful-body text-[#6B7280] font-bold text-base leading-relaxed mb-8 line-clamp-3 flex-grow">{product.description}</p>
                                            )}

                                            <a
                                                href={getProductUrl(business.slug, product.id)}
                                                className="mt-auto w-full text-center playful-display font-black text-2xl bg-[#2D3142] text-white py-4 rounded-2xl brutal-border shadow-[4px_4px_0px_#FF6B6B] hover:shadow-[2px_2px_0px_#FF6B6B] hover:translate-y-[2px] hover:translate-x-[2px] transition-all duration-200"
                                            >
                                                Grab It! 🛒
                                            </a>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Vibes (About/Mission/Vision) */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'general')) || business.mission || business.vision) && (
                <section id="vibes" className="py-32 px-6 relative z-10 bg-[#FFF4E6]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="flex justify-center mb-20"
                        >
                          <h3 className="playful-display text-6xl text-[#2D3142] font-black bg-white px-12 py-6 rounded-[3rem] brutal-border shadow-[8px_8px_0px_#4ECDC4] rotate-2">
                              The Vibes 🌈
                          </h3>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-10">
                            {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'general')) && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 50 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  className="bg-[#FFE66D] p-10 rounded-[3rem] brutal-border brutal-shadow hover:brutal-shadow-hover hover:-translate-y-2 transition-all -rotate-1 lg:col-span-2"
                                >
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-8 brutal-border shadow-[4px_4px_0px_#2D3142] rotate-12">
                                        <Heart className="w-10 h-10 text-[#FF6B6B] fill-[#FF6B6B]" />
                                    </div>
                                    <h4 className="playful-display text-5xl text-[#2D3142] font-black mb-6">Our Story</h4>
                                    <p className="playful-body text-[#2D3142] font-bold text-2xl leading-relaxed">{(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'general'))}</p>
                                </motion.div>
                            )}
                            
                            <div className="flex flex-col gap-10 lg:col-span-1">
                              {business.mission && (
                                  <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-[#4ECDC4] p-10 rounded-[3rem] brutal-border brutal-shadow hover:brutal-shadow-hover hover:-translate-y-2 transition-all rotate-2 flex-grow"
                                  >
                                      <h4 className="playful-display text-4xl text-[#2D3142] font-black mb-4">The Mission 🎯</h4>
                                      <p className="playful-body text-[#2D3142] font-bold text-xl leading-relaxed">{business.mission}</p>
                                  </motion.div>
                              )}
                              {business.vision && (
                                  <motion.div 
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-[#FF9F1C] p-10 rounded-[3rem] brutal-border brutal-shadow hover:brutal-shadow-hover hover:-translate-y-2 transition-all -rotate-2 flex-grow"
                                  >
                                      <h4 className="playful-display text-4xl text-white font-black mb-4" style={{ textShadow: '2px 2px 0px #2D3142' }}>The Vision 🚀</h4>
                                      <p className="playful-body text-white font-bold text-xl leading-relaxed">{business.vision}</p>
                                  </motion.div>
                              )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-[#2D3142] text-white pt-24 pb-12 px-6 border-t-[8px] border-[#FF6B6B] relative z-20 overflow-hidden">
                {/* Decorative blobs in footer */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FF9F1C] rounded-full blur-3xl opacity-20 pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#4ECDC4] rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 mb-20 relative z-10">
                  <div className="bg-white p-10 rounded-[3rem] brutal-border text-[#2D3142] rotate-1">
                    <h2 className="playful-display text-5xl font-black mb-4">{business.name}</h2>
                    <p className="playful-body text-xl font-bold text-[#6B7280] mb-8">
                      {business.footerText || "Making the world a more fun place, one awesome thing at a time!"}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      {business.instagramUrl && (
                        <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FFE66D] rounded-full brutal-border flex items-center justify-center hover:bg-[#FF6B6B] hover:text-white transition-colors brutal-shadow">
                          <Camera className="w-6 h-6" />
                        </a>
                      )}
                      {business.facebookUrl && (
                        <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#4ECDC4] rounded-full brutal-border flex items-center justify-center hover:bg-[#FF9F1C] hover:text-white transition-colors brutal-shadow">
                          <MessageCircle className="w-6 h-6" />
                        </a>
                      )}
                      {business.websiteUrl && (
                        <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-[#FFB1B1] rounded-full brutal-border flex items-center justify-center hover:bg-[#FF6B6B] hover:text-white transition-colors brutal-shadow">
                          <Globe className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center gap-6 playful-body text-xl font-bold">
                     <h3 className="playful-display text-4xl text-[#FFD93D] mb-4" style={{ textShadow: '2px 2px 0px #FF6B6B' }}>Hit Us Up!</h3>
                     
                     {business.email && (
                       <a href={`mailto:${business.email}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                         <div className="w-12 h-12 bg-[#FF6B6B] rounded-full brutal-border flex items-center justify-center shrink-0">💌</div>
                         <span className="truncate">{business.email}</span>
                       </a>
                     )}
                     {business.phoneNumber && (
                       <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                         <div className="w-12 h-12 bg-[#4ECDC4] rounded-full brutal-border flex items-center justify-center shrink-0">📞</div>
                         <span>{business.phoneNumber}</span>
                       </a>
                     )}
                     {business.location && (
                       <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl">
                         <div className="w-12 h-12 bg-[#FF9F1C] rounded-full brutal-border flex items-center justify-center shrink-0">📍</div>
                         <span>{business.location}</span>
                       </div>
                     )}
                  </div>
                </div>

                <div className="max-w-7xl mx-auto border-t-4 border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="playful-display text-2xl font-bold tracking-wider">
                        {business.copyrightText || `© ${new Date().getFullYear()} ${business.name}`}
                    </div>
                    
                    <div className="playful-body font-black text-xl bg-white text-[#2D3142] px-6 py-3 rounded-full brutal-border rotate-2">
                        Made with 💖 by <a href="/" className="text-[#FF6B6B] hover:text-[#4ECDC4] transition-colors underline decoration-wavy decoration-[#FFD93D] underline-offset-4">DukaanHai</a>
                    </div>
                </div>
            </footer>
        </div >
    );
}
