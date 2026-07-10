'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Target, Crosshair, Activity, MapPin, Globe, Share2, Zap, Shield, Mail, Camera, MessageCircle } from 'lucide-react';

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

export default function FuturisticTemplate({ business, products }: TemplateProps) {
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Initiating order protocol for [${productName}] from ${business.name}.`
                : `Connecting to ${business.name} mainframe.`
        )}`;

    const accentColor = business.primaryColor || '#06b6d4'; // cyan-500

    return (
        <div className="min-h-screen bg-[#050505] text-cyan-50 font-sans selection:bg-cyan-500/30 overflow-hidden relative">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
              .cyber-display { font-family: 'Orbitron', sans-serif; }
              .cyber-body { font-family: 'Rajdhani', sans-serif; }
              .cyber-grid { background-image: linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px); background-size: 40px 40px; }
              .glitch-hover:hover { animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite; }
              @keyframes glitch-skew {
                0% { transform: skew(0deg); }
                20% { transform: skew(-2deg); }
                40% { transform: skew(2deg); }
                60% { transform: skew(-1deg); }
                80% { transform: skew(1deg); }
                100% { transform: skew(0deg); }
              }
            `}</style>

            {/* Grid Background & Scanlines */}
            <div className="fixed inset-0 cyber-grid pointer-events-none z-0"></div>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 2px, black 3px, black 3px)' }}></div>
            
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1] }} 
              transition={{ duration: 5, repeat: Infinity }}
              className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent pointer-events-none z-0"
            />

            {/* Header */}
            <header className="fixed top-0 w-full bg-black/60 backdrop-blur-md border-b border-cyan-500/20 z-50">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.div 
                          animate={{ opacity: [1, 0.2, 1] }} 
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-6 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" 
                        />
                        <h1 className="cyber-display text-xl md:text-2xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                            {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" /> : business.name}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-8">
                       <nav className="hidden lg:flex gap-8 cyber-body text-lg font-semibold tracking-widest text-cyan-600 uppercase">
                          {products.length > 0 && <a href="#inventory" className="hover:text-cyan-300 hover:text-shadow-[0_0_8px_#67e8f9] transition-all">Inventory</a>}
                          {business.about && <a href="#database" className="hover:text-cyan-300 hover:text-shadow-[0_0_8px_#67e8f9] transition-all">Database</a>}
                       </nav>

                        {waNumber && (
                            <a
                                href={waLink()} style={{ borderColor: accentColor, color: accentColor }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cyber-body uppercase tracking-widest flex items-center gap-2 bg-cyan-950/20 border text-sm font-bold px-4 py-1.5 hover:bg-cyan-900/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 group"
                            >
                                <Terminal className="w-4 h-4 group-hover:animate-pulse" />
                                {business.ctaText || 'LINK'}
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto z-10 min-h-[90vh] flex flex-col justify-center">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                      <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {business.tagline && (
                            <div className="inline-block cyber-body border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 px-3 py-1 uppercase tracking-[0.4em] text-sm mb-6 flex items-center gap-2">
                              <Activity className="w-4 h-4" /> SYS.MSG: {business.tagline}
                            </div>
                        )}

                        <h2 className="cyber-display text-5xl md:text-7xl lg:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-cyan-600 leading-[0.9] mb-8 uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                            {business.headline || business.name}
                        </h2>

                        {business.marketingDesc && (
                            <p className="cyber-body text-xl md:text-2xl text-cyan-100/70 font-semibold leading-relaxed border-l-2 border-cyan-500 pl-4 mb-8">
                                {business.marketingDesc}
                            </p>
                        )}
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-4 cyber-body text-cyan-500 text-sm uppercase tracking-widest"
                      >
                          {business.category && <span className="bg-cyan-950/40 border border-cyan-900 px-3 py-1">[ CLS: {business.category} ]</span>}
                          {business.location && <span className="bg-cyan-950/40 border border-cyan-900 px-3 py-1"><MapPin className="w-3 h-3 inline mb-0.5"/> {business.location}</span>}
                          <span className="bg-cyan-950/40 border border-cyan-900 px-3 py-1 text-green-400 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> ONLINE</span>
                      </motion.div>
                  </div>
                  
                  {business.bannerUrl ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] group"
                    >
                      <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay group-hover:bg-transparent transition-colors z-10" />
                      <img src={business.bannerUrl} alt="Hero Banner" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                      
                      {/* Decorative corner brackets */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20 m-4 opacity-50" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20 m-4 opacity-50" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-20 m-4 opacity-50" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20 m-4 opacity-50" />
                    </motion.div>
                  ) : (
                    <div className="aspect-square md:aspect-[4/3] border border-cyan-900 bg-cyan-950/10 flex flex-col items-center justify-center relative overflow-hidden">
                       <Cpu className="w-32 h-32 text-cyan-900 opacity-30" />
                       <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(6,182,212,0.05)_50%)] bg-[length:100%_4px]" />
                    </div>
                  )}
                </div>
            </section>

            {/* Inventory Grid (Products) */}
            {products.length > 0 && (
                <section id="inventory" className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-cyan-900/30">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h3 className="cyber-display text-4xl text-white uppercase tracking-widest drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] flex items-center gap-4">
                              <Crosshair className="w-8 h-8 text-cyan-500" />
                              Inventory_Protocol
                            </h3>
                            <div className="mt-4 flex gap-1">
                                {[...Array(10)].map((_, i) => (
                                    <div key={i} className="w-6 h-1 bg-cyan-900/50" />
                                ))}
                            </div>
                        </div>
                        <div className="bg-cyan-950/40 border border-cyan-900 px-6 py-2 cyber-body text-cyan-400 font-bold uppercase tracking-[0.3em]">
                          UNITS FOUND: {String(products.length).padStart(3, '0')}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-50px" }}
                              transition={{ duration: 0.4, delay: idx * 0.1 }}
                              key={product.id} 
                              className="group border border-cyan-900/50 bg-black/40 hover:bg-cyan-950/20 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 relative overflow-hidden flex flex-col"
                            >
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity m-2"></div>

                                <div className="aspect-[4/3] relative overflow-hidden bg-cyan-950/20 border-b border-cyan-900/50 p-4">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-cyan-900 border border-cyan-900/30">
                                            <Target className="w-16 h-16 mb-4 opacity-50" />
                                            <span className="cyber-body text-xs uppercase tracking-[0.3em]">NO_VISUAL_DATA</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    
                                    {!product.inStock && (
                                       <div className="absolute top-4 right-4 bg-red-950/80 border border-red-500 text-red-400 cyber-display text-xs px-3 py-1 uppercase tracking-widest backdrop-blur-sm">
                                         ERR: OUT_OF_STOCK
                                       </div>
                                    )}
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                      <h4 className="cyber-display text-xl text-white uppercase tracking-wide group-hover:text-cyan-300 transition-colors">{product.name}</h4>
                                    </div>
                                    
                                    {product.category && (
                                      <span className="cyber-body text-xs font-bold text-cyan-700 uppercase tracking-widest mb-4">
                                        // {product.category}
                                      </span>
                                    )}
                                    
                                    {product.description && (
                                        <p className="cyber-body text-cyan-100/50 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-medium">{product.description}</p>
                                    )}

                                    <div className="flex items-end justify-between mt-auto pt-6 border-t border-cyan-900/30">
                                        <div>
                                            <span className="block cyber-body text-cyan-700 text-[10px] font-bold uppercase tracking-widest mb-1">REQ_CREDITS</span>
                                            <span className="cyber-display font-bold text-2xl text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">{formatPrice(product.price)}</span>
                                        </div>

                                        <a
                                            href={getProductUrl(business.slug, product.id)}
                                            className="cyber-body font-bold uppercase tracking-[0.2em] text-xs border border-cyan-500/50 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] px-6 py-3 transition-all duration-300"
                                        >
                                            EXTRACT
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Database (About/Vision/Mission) */}
            {(business.about || business.mission || business.vision) && (
                <section id="database" className="py-24 px-6 max-w-7xl mx-auto relative z-10 border-t border-cyan-900/30">
                    <div className="flex items-center gap-4 mb-16">
                        <h3 className="cyber-display text-3xl text-white uppercase tracking-widest flex items-center gap-4">
                          <Cpu className="w-8 h-8 text-cyan-500" />
                          Core_Database
                        </h3>
                        <div className="flex-1 h-[1px] bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {business.about && (
                            <motion.div 
                              initial={{ opacity: 0, x: -30 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              className="lg:col-span-7 border border-cyan-900/50 bg-black/60 backdrop-blur-sm p-8 relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors"></div>
                                <h4 className="cyber-body text-cyan-500 text-sm uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-3">
                                  <Shield className="w-4 h-4" /> [FILE: ORIGIN.TXT]
                                </h4>
                                <p className="cyber-body text-cyan-50 text-xl leading-relaxed font-medium">{business.about}</p>
                            </motion.div>
                        )}

                        <div className="lg:col-span-5 flex flex-col gap-8">
                            {business.mission && (
                                <motion.div 
                                  initial={{ opacity: 0, x: 30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="border border-cyan-900/50 bg-cyan-950/10 p-8 flex-grow relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
                                    <h4 className="cyber-body text-cyan-400 text-sm uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" /> DIRECTIVE: ALPHA
                                    </h4>
                                    <p className="cyber-body text-cyan-100/70 text-lg leading-relaxed font-medium">{business.mission}</p>
                                </motion.div>
                            )}

                            {business.vision && (
                                <motion.div 
                                  initial={{ opacity: 0, x: 30 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: 0.2 }}
                                  className="border border-cyan-900/50 bg-cyan-950/10 p-8 flex-grow relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-600"></div>
                                    <h4 className="cyber-body text-cyan-400 text-sm uppercase tracking-[0.3em] font-bold mb-4 flex items-center gap-2">
                                        <Globe className="w-4 h-4" /> DIRECTIVE: OMEGA
                                    </h4>
                                    <p className="cyber-body text-cyan-100/70 text-lg leading-relaxed font-medium">{business.vision}</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-cyan-500/30 bg-black/80 backdrop-blur-xl relative z-20 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                  <div className="lg:col-span-2">
                    <h2 className="cyber-display text-3xl font-black uppercase text-white mb-4 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                      {business.name}
                    </h2>
                    <p className="cyber-body text-cyan-100/50 text-lg font-medium max-w-sm mb-8">
                      {business.footerText || "Upgrading reality through advanced commerce solutions."}
                    </p>
                    
                    <div className="flex gap-4">
                      {business.instagramUrl && (
                        <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 border border-cyan-900/50 bg-cyan-950/30 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                          <Camera className="w-5 h-5" />
                        </a>
                      )}
                      {business.facebookUrl && (
                        <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 border border-cyan-900/50 bg-cyan-950/30 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                          <MessageCircle className="w-5 h-5" />
                        </a>
                      )}
                      {business.websiteUrl && (
                        <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 border border-cyan-900/50 bg-cyan-950/30 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all">
                          <Share2 className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 lg:justify-self-end">
                     <h4 className="cyber-display text-xl text-cyan-500 uppercase mb-6 tracking-widest">Comm_Link</h4>
                     <ul className="space-y-4 cyber-body text-cyan-100 font-medium text-lg">
                       {business.email && (
                         <li>
                           <a href={`mailto:${business.email}`} className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                             <Mail className="w-4 h-4 text-cyan-600" /> {business.email}
                           </a>
                         </li>
                       )}
                       {business.phoneNumber && (
                         <li>
                           <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-3 hover:text-cyan-400 transition-colors">
                             <Activity className="w-4 h-4 text-cyan-600" /> {business.phoneNumber}
                           </a>
                         </li>
                       )}
                       {business.location && (
                         <li className="flex items-center gap-3">
                           <MapPin className="w-4 h-4 text-cyan-600" /> {business.location}
                         </li>
                       )}
                     </ul>
                  </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-cyan-900/30 flex flex-col md:flex-row items-center justify-between gap-6 cyber-body text-sm font-bold text-cyan-800 uppercase tracking-widest">
                    <div>
                        {business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. SYS_SECURE.`}
                    </div>
                    <div>
                        INFRASTRUCTURE // <a href="/" className="text-cyan-600 hover:text-cyan-400 transition-colors">DUKAANHAI_NET</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
