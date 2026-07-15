'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { getPlaceholderImage, getPlaceholderText } from '@/lib/placeholders';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Shield, Zap, Activity, Database, Lock, Code, Crosshair, ChevronRight, Share2, Target, Camera, MessageCircle, Globe } from 'lucide-react';

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

export default function EcommerceTechCyberTemplate({ business, products }: TemplateProps) {
    const config = (business as any).templateConfig ? (typeof (business as any).templateConfig === 'string' ? JSON.parse((business as any).templateConfig) : (business as any).templateConfig) : {};
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I want to secure the "${productName}" from ${business.name}.`
                : `Connecting to ${business.name} for hardware inquiry.`
        )}`;

    const primaryNeon = business.primaryColor || '#8b5cf6'; // violet-500
    const secondaryNeon = business.secondaryColor || '#06b6d4'; // cyan-500

    return (
        <div className="min-h-screen bg-[#030308] text-[#a5b4fc] font-sans overflow-x-hidden selection:bg-[#8b5cf6] selection:text-white">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
              .cyber-display { font-family: 'Orbitron', sans-serif; }
              .cyber-body { font-family: 'Rajdhani', sans-serif; }
              
              .neon-border { 
                position: relative;
                background: rgba(10, 10, 20, 0.7);
                border: 1px solid rgba(139, 92, 246, 0.3);
                box-shadow: 0 0 15px rgba(139, 92, 246, 0.1), inset 0 0 20px rgba(139, 92, 246, 0.05);
              }
              .neon-border::before {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                border: 1px solid transparent;
                background: linear-gradient(45deg, #8b5cf6, #06b6d4) border-box;
                -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: destination-out;
                mask-composite: exclude;
                opacity: 0.5;
                transition: opacity 0.3s;
              }
              .neon-border:hover::before { opacity: 1; }
              
              .glitch-effect {
                animation: glitch 3s linear infinite;
              }
              @keyframes glitch {
                2%, 64% { transform: translate(2px,0) skew(0deg); }
                4%, 60% { transform: translate(-2px,0) skew(0deg); }
                62% { transform: translate(0,0) skew(5deg); }
              }
            `}</style>

            {/* Matrix Background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030308_80%)]"></div>
            
            {/* Ambient Lights */}
            <motion.div 
              animate={{ opacity: [0.3, 0.6, 0.3] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="fixed top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#8b5cf6]/10 rounded-full blur-[120px] pointer-events-none z-0"
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="fixed bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#06b6d4]/10 rounded-full blur-[120px] pointer-events-none z-0"
            />

            {/* Cyber Header */}
            <header className="fixed top-0 w-full z-50 border-b border-[#8b5cf6]/20 bg-[#030308]/80 backdrop-blur-xl">
                <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="cyber-display text-xl md:text-2xl font-bold tracking-widest text-white flex items-center gap-3 drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]">
                        <motion.div 
                          animate={{ opacity: [1, 0, 1] }} 
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Terminal className="w-5 h-5 text-[#06b6d4]" />
                        </motion.div>
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain" /> : business.name}
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 cyber-body text-sm font-semibold tracking-widest text-[#a5b4fc] uppercase">
                       {products.length > 0 && <a href="#inventory" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all flex items-center gap-2"><Database className="w-4 h-4"/> Inventory</a>}
                       {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission) && <a href="#specs" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all flex items-center gap-2"><Cpu className="w-4 h-4"/> Specs</a>}
                    </div>

                    {waNumber && (
                        <a 
                          href={waLink()} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="cyber-body text-xs font-bold uppercase tracking-[0.2em] text-white border border-[#06b6d4] bg-[#06b6d4]/10 px-5 py-2 hover:bg-[#06b6d4] hover:text-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-2"
                        >
                            <Zap className="w-4 h-4" /> Initialize
                        </a>
                    )}
                </div>
                {/* Progress bar effect */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8b5cf6] to-[#06b6d4] origin-left"
                />
            </header>

            {/* Hero Protocol */}
            <section className="relative z-10 pt-32 pb-24 px-6 min-h-[90vh] flex flex-col justify-center max-w-[1400px] mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="relative z-20"
                    >
                        <div className="cyber-body text-xs font-bold tracking-[0.4em] text-[#06b6d4] mb-6 uppercase flex items-center gap-3">
                            <span className="w-2 h-2 bg-[#06b6d4] animate-pulse"></span>
                            PROTOCOL: {business.category || 'NEXUS'}
                        </div>
                        
                        <h1 className="cyber-display text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.1] uppercase drop-shadow-[0_0_20px_rgba(139,92,246,0.4)] glitch-effect relative">
                            {(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}
                            <span className="absolute inset-0 text-[#06b6d4] -translate-x-[2px] translate-y-[2px] mix-blend-screen opacity-50 z-[-1] blur-[1px]">{(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}</span>
                            <span className="absolute inset-0 text-[#8b5cf6] translate-x-[2px] -translate-y-[2px] mix-blend-screen opacity-50 z-[-1] blur-[1px]">{(config?.hero?.headline || business.headline || getPlaceholderText('headline', business.name, 'ecommerce')) || business.name}</span>
                        </h1>
                        
                        <p className="cyber-body text-xl md:text-2xl font-medium text-[#c7d2fe] mb-10 tracking-wide leading-relaxed border-l-2 border-[#8b5cf6] pl-6 bg-gradient-to-r from-[#8b5cf6]/10 to-transparent py-4">
                            {(config?.hero?.tagline || business.tagline || getPlaceholderText('tagline', business.name, 'ecommerce')) || 'Next Generation Hardware & Cybernetics. Upgrade your reality.'}
                        </p>

                        <div className="flex flex-wrap gap-6">
                            <a 
                              href="#inventory" 
                              className="cyber-body font-bold uppercase tracking-[0.2em] text-sm px-8 py-4 bg-[#8b5cf6] text-white hover:bg-[#7c3aed] transition-all shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] flex items-center gap-3 border border-[#a78bfa] relative group overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2"><Database className="w-4 h-4" /> ACCESS_SYS</span>
                                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] w-[200%] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-[-20deg]"></div>
                            </a>
                            {waNumber && (
                                <a 
                                  href={waLink()} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="cyber-body font-bold uppercase tracking-[0.2em] text-sm px-8 py-4 border border-[#06b6d4] text-[#06b6d4] hover:bg-[#06b6d4]/10 transition-all shadow-[inset_0_0_15px_rgba(6,182,212,0.2)] flex items-center gap-2 group"
                                >
                                    <Activity className="w-4 h-4 group-hover:animate-pulse" /> PING_SERVER
                                </a>
                            )}
                        </div>
                    </motion.div>
                    
                    {(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'electronics')) && (
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 1, delay: 0.2 }}
                         className="relative lg:h-[600px] neon-border p-2 group"
                       >
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/20 to-[#06b6d4]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700"></div>
                          <img src={(config?.hero?.image || business.bannerUrl || getPlaceholderImage('ecommerce', 'electronics'))} alt="Tech Gear" className="w-full h-full object-cover filter contrast-125 saturate-150 relative z-0" />
                          
                          {/* HUD Elements */}
                          <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                             <div className="w-12 h-1 bg-[#06b6d4]"></div>
                             <div className="w-8 h-1 bg-[#06b6d4]"></div>
                          </div>
                          <div className="absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1">
                             <div className="w-12 h-1 bg-[#8b5cf6]"></div>
                             <div className="w-16 h-1 bg-[#8b5cf6]"></div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-32 h-32 border border-[#06b6d4]/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none flex items-center justify-center">
                             <div className="w-24 h-24 border border-[#8b5cf6]/50 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                          </div>
                       </motion.div>
                    )}
                </div>
            </section>

            {/* System Specs */}
            {((config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) || business.mission || business.vision) && (
                <section id="specs" className="relative z-10 py-24 px-6 max-w-[1400px] mx-auto border-t border-[#8b5cf6]/20">
                    <div className="flex items-center gap-4 mb-16">
                        <Code className="w-8 h-8 text-[#06b6d4]" />
                        <h2 className="cyber-display text-3xl font-bold text-white tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">SYS_SPECS</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#06b6d4]/50 to-transparent"></div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce')) && (
                           <motion.div 
                             initial={{ opacity: 0, y: 30 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             className="lg:col-span-2 neon-border p-10 bg-[#0a0a1a]/80"
                           >
                               <div className="flex items-center gap-3 mb-6 border-b border-[#8b5cf6]/30 pb-4">
                                 <Shield className="w-5 h-5 text-[#8b5cf6]" />
                                 <h3 className="cyber-body text-lg font-bold tracking-[0.3em] text-[#a5b4fc] uppercase">Core Directives</h3>
                               </div>
                               <p className="cyber-body text-[#c7d2fe] text-lg md:text-xl leading-[1.8] font-medium">
                                   <span className="text-[#06b6d4] mr-2 font-bold animate-pulse">&gt;_</span>
                                   {(config?.about?.text || business.about || getPlaceholderText('about', business.name, 'ecommerce'))}
                               </p>
                           </motion.div>
                        )}

                        <div className="flex flex-col gap-8">
                            {business.mission && (
                                <motion.div 
                                  initial={{ opacity: 0, x: 30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="neon-border p-8 bg-[#06b6d4]/5 flex-1 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#06b6d4] group-hover:shadow-[0_0_15px_#06b6d4] transition-shadow"></div>
                                    <h3 className="cyber-body text-xs font-bold tracking-[0.3em] text-[#06b6d4] mb-3 uppercase flex items-center gap-2">
                                      <Crosshair className="w-4 h-4" /> Mission_Log
                                    </h3>
                                    <p className="cyber-body text-[#a5b4fc] leading-relaxed">{business.mission}</p>
                                </motion.div>
                            )}
                            
                            {business.vision && (
                                <motion.div 
                                  initial={{ opacity: 0, x: 30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 }}
                                  className="neon-border p-8 bg-[#8b5cf6]/5 flex-1 relative overflow-hidden group"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#8b5cf6] group-hover:shadow-[0_0_15px_#8b5cf6] transition-shadow"></div>
                                    <h3 className="cyber-body text-xs font-bold tracking-[0.3em] text-[#8b5cf6] mb-3 uppercase flex items-center gap-2">
                                      <Target className="w-4 h-4" /> Vision_Log
                                    </h3>
                                    <p className="cyber-body text-[#a5b4fc] leading-relaxed">{business.vision}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}
            
            {business.marketingDesc && (
               <section className="relative z-10 py-20 px-6 bg-gradient-to-r from-[#8b5cf6]/20 to-[#06b6d4]/20 border-y border-[#8b5cf6]/30">
                  <div className="max-w-4xl mx-auto text-center">
                      <p className="cyber-display text-2xl md:text-4xl text-white font-bold tracking-wide leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase">
                        "{business.marketingDesc}"
                      </p>
                  </div>
               </section>
            )}

            {/* Interface Grid (Products) */}
            {products.length > 0 && (
                <section id="inventory" className="relative z-10 py-32 px-6 max-w-[1400px] mx-auto">
                    <div className="flex items-center justify-between mb-16">
                        <div className="flex items-center gap-4">
                            <Database className="w-10 h-10 text-[#8b5cf6]" />
                            <h2 className="cyber-display text-4xl md:text-5xl font-bold text-white tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]">DATABASE</h2>
                        </div>
                        <div className="hidden sm:block cyber-body text-[#06b6d4] font-bold tracking-[0.3em] uppercase bg-[#06b6d4]/10 border border-[#06b6d4]/30 px-4 py-2">
                           {products.length} ENTRIES
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.4, delay: (idx % 4) * 0.1 }}
                              key={product.id} 
                              className="group relative bg-[#0a0a1a]/90 backdrop-blur neon-border p-5 flex flex-col h-full hover:bg-[#13132b] transition-colors"
                            >
                                <div className="absolute top-2 right-2 z-20 flex gap-1">
                                   <div className="w-2 h-2 bg-[#8b5cf6] rounded-full group-hover:animate-ping"></div>
                                   <div className="w-2 h-2 bg-[#06b6d4] rounded-full group-hover:animate-ping" style={{ animationDelay: '0.2s' }}></div>
                                </div>

                                <div className="aspect-square relative overflow-hidden mb-6 border border-[#8b5cf6]/30 bg-[#050510]">
                                    {product.imageUrl ? (
                                        <img 
                                          src={product.imageUrl} 
                                          alt={product.name} 
                                          className="w-full h-full object-cover filter contrast-125 saturate-150 group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center border border-dashed border-[#4f46e5]/30">
                                           <Lock className="w-12 h-12 text-[#4f46e5]/30" />
                                        </div>
                                    )}
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent opacity-80"></div>
                                    
                                    <div className="absolute bottom-3 left-3 bg-[#0a0a1a]/80 backdrop-blur border border-[#06b6d4] px-3 py-1 cyber-body text-sm font-bold text-[#06b6d4] shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                                        {formatPrice(product.price)}
                                    </div>
                                    
                                    {!product.inStock && (
                                       <div className="absolute inset-0 bg-[#0a0a1a]/80 backdrop-blur-sm flex items-center justify-center z-10">
                                          <span className="cyber-display text-xl text-red-500 uppercase tracking-widest border border-red-500 px-4 py-2 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.5)]">ERR_DEPLETED</span>
                                       </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col relative z-10">
                                    {product.category && (
                                       <span className="cyber-body text-[10px] font-bold text-[#a5b4fc] uppercase tracking-[0.3em] mb-2 block border-b border-[#4f46e5]/30 pb-1 w-max">
                                         CLS://{product.category}
                                       </span>
                                    )}
                                    <h3 className="cyber-display text-xl font-bold text-white mb-3 group-hover:text-[#06b6d4] transition-colors leading-tight">{product.name}</h3>
                                    
                                    {product.description && (
                                        <p className="cyber-body text-[#a5b4fc] text-sm leading-[1.6] mb-6 flex-1 line-clamp-3">
                                            {product.description}
                                        </p>
                                    )}

                                    <a 
                                      href={getProductUrl(business.slug, product.id)} 
                                      className="w-full flex items-center justify-between cyber-display text-xs font-bold uppercase tracking-[0.2em] bg-[#8b5cf6]/10 hover:bg-[#8b5cf6] text-[#c7d2fe] hover:text-white border border-[#8b5cf6]/50 px-4 py-3 transition-all group/btn shadow-[inset_0_0_10px_rgba(139,92,246,0.1)]"
                                    >
                                        <span>INIT_DOWNLOAD</span>
                                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer Log */}
            <footer className="relative z-10 border-t-2 border-[#8b5cf6] bg-[#030308] pt-16 pb-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent opacity-50"></div>
                
                <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 cyber-body mb-16">
                   <div className="lg:col-span-2">
                       <h2 className="cyber-display text-3xl font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                          <Terminal className="w-6 h-6 text-[#06b6d4]" />
                          {business.name}
                       </h2>
                       <p className="text-[#a5b4fc] text-sm leading-relaxed max-w-md mb-8">
                          {business.footerText || "SYS.LOG: Upgrading reality parameters. End of transmission."}
                       </p>
                       <div className="flex gap-4">
                           {business.instagramUrl && (
                             <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 flex items-center justify-center text-[#c7d2fe] hover:text-white hover:bg-[#8b5cf6] hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all">
                               <Camera className="w-4 h-4" />
                             </a>
                           )}
                           {business.facebookUrl && (
                             <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 flex items-center justify-center text-[#c7d2fe] hover:text-white hover:bg-[#8b5cf6] hover:shadow-[0_0_15px_rgba(139,92,246,0.8)] transition-all">
                               <MessageCircle className="w-4 h-4" />
                             </a>
                           )}
                           {business.websiteUrl && (
                             <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#06b6d4]/30 bg-[#06b6d4]/10 flex items-center justify-center text-[#c7d2fe] hover:text-black hover:bg-[#06b6d4] hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all">
                               <Globe className="w-4 h-4" />
                             </a>
                           )}
                       </div>
                   </div>

                   <div>
                       <h4 className="cyber-body text-xs font-bold tracking-[0.3em] uppercase text-[#06b6d4] mb-6 border-b border-[#06b6d4]/30 pb-2">Network</h4>
                       <ul className="space-y-4 text-[#a5b4fc] text-sm">
                           {business.phoneNumber && (
                             <li><a href={`tel:${business.phoneNumber}`} className="hover:text-white hover:shadow-[0_0_10px_currentColor] transition-all">COMM: {business.phoneNumber}</a></li>
                           )}
                           {business.email && (
                             <li><a href={`mailto:${business.email}`} className="hover:text-white hover:shadow-[0_0_10px_currentColor] transition-all">PING: {business.email}</a></li>
                           )}
                       </ul>
                   </div>

                   <div>
                       <h4 className="cyber-body text-xs font-bold tracking-[0.3em] uppercase text-[#8b5cf6] mb-6 border-b border-[#8b5cf6]/30 pb-2">Location</h4>
                       <ul className="space-y-4 text-[#a5b4fc] text-sm">
                           {business.location && (
                             <li className="flex items-start gap-2">
                               <span className="text-[#8b5cf6]">&gt;</span> COORDS:<br/>{business.location}
                             </li>
                           )}
                       </ul>
                   </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 border-t border-[#8b5cf6]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 cyber-body text-xs font-bold uppercase tracking-[0.2em] text-[#6366f1]">
                    <div>{business.copyrightText || `SYS.SECURE © ${new Date().getFullYear()} ${business.name}`}</div>
                    <div>
                        INFRASTRUCTURE // <a href="/" className="text-[#06b6d4] hover:text-white hover:drop-shadow-[0_0_8px_rgba(6,182,212,1)] transition-all">DUKAANHAI</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
