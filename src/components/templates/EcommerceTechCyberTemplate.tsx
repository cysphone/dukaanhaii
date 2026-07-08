'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceTechCyberTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I want to secure the "${productName}" from ${business.name}.`
                : `Connecting to ${business.name} for hardware inquiry.`
        )}`;

    return (
        <div className="min-h-screen bg-[#050510] text-[#a5b4fc] font-sans overflow-x-hidden selection:bg-[#6366f1] selection:text-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
        .cyber-display { font-family: 'Orbitron', sans-serif; }
        .cyber-body { font-family: 'Rajdhani', sans-serif; }
        .neon-border { box-shadow: 0 0 10px #4f46e5, inset 0 0 10px #4f46e5; border: 1px solid #6366f1; }
        .neon-border-hover:hover { box-shadow: 0 0 20px #8b5cf6, inset 0 0 20px #8b5cf6; border: 1px solid #a855f7; }
        .neon-text { text-shadow: 0 0 10px currentColor; }
      `}</style>

            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050510_70%)]"></div>

            {/* Cyber Header */}
            <header className="relative z-50 border-b border-[#4f46e5]/40 bg-[#050510]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="cyber-display text-2xl font-bold tracking-widest text-[#8b5cf6] neon-text flex items-center gap-3">
                        <span className="w-3 h-3 bg-[#8b5cf6] animate-pulse"></span>
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>
                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="cyber-body text-sm font-bold uppercase tracking-widest text-[#a5b4fc] border border-[#4f46e5] px-4 py-1.5 hover:bg-[#4f46e5]/20 hover:text-white transition-all">
                            SYS.MSG
                        </a>
                    )}
                </div>
            </header>

            {/* Hero Protocol */}
            <section className="relative z-10 pt-24 pb-20 px-6 min-h-[80vh] flex flex-col justify-center items-center text-center">
                <div className={`transition-all duration-1000 transform ${mounted ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <div className="cyber-body text-xs font-bold tracking-[0.5em] text-[#6366f1] mb-6 uppercase border-l-2 border-r-2 border-[#6366f1] inline-block px-4 py-1">
                        INIT SEQUENCE: {business.category || 'GEAR'}
                    </div>
                    <h1 className="cyber-display text-5xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#d946ef] to-[#8b5cf6] mb-8 leading-tight py-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        {business.headline || business.name}
                    </h1>
                    <p className="cyber-body text-xl md:text-3xl font-medium text-[#c7d2fe] max-w-3xl mx-auto mb-12 tracking-wide neon-text opacity-80">
                        {business.tagline || 'Next Generation Hardware & Cybernetics.'}
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="#inventory" className="cyber-display font-bold uppercase tracking-wider text-sm px-8 py-4 bg-[#4f46e5] text-white hover:bg-[#6366f1] transition-all relative group overflow-hidden">
                            <span className="relative z-10">Access Inventory</span>
                            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] background-size-[200%_200%] animate-[shimmer_2s_infinite]"></div>
                        </a>
                        {waNumber && (
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="cyber-display font-bold uppercase tracking-wider text-sm px-8 py-4 border border-[#d946ef] text-[#d946ef] hover:bg-[#d946ef]/10 transition-all neon-text">
                                Ping Server
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Specs / About */}
            {(business.about || business.mission) && (
                <section className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="neon-border p-8 bg-[#0a0a1a]/80 backdrop-blur relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#8b5cf6]"></div>
                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#8b5cf6]"></div>
                            <h2 className="cyber-display text-3xl font-bold text-[#8b5cf6] mb-6 tracking-widest uppercase">System Specs</h2>
                            <p className="cyber-body text-[#a5b4fc] text-lg leading-relaxed font-medium">
                                <span className="text-[#6366f1] mr-2">&gt;</span>{business.about || business.mission}
                            </p>
                        </div>

                        {business.vision && (
                            <div className="p-8 border-l-4 border-[#d946ef] bg-[#d946ef]/5">
                                <h3 className="cyber-body text-xs font-bold tracking-[0.3em] text-[#d946ef] mb-2 uppercase">Future Protocol</h3>
                                <p className="cyber-display text-xl leading-relaxed text-[#fbcfe8] italic">"{business.vision}"</p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Interface Grid (Products) */}
            {products.length > 0 && (
                <section id="inventory" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12">
                        <h2 className="cyber-display text-4xl font-bold text-white tracking-widest uppercase neon-text">Inventory</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#6366f1] to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product: any) => (
                            <div key={product.id} className="group relative bg-[#0a0a1a]/80 backdrop-blur neon-border neon-border-hover transition-all duration-300 p-6 flex flex-col h-full">
                                {product.imageUrl && (
                                    <div className="aspect-video relative overflow-hidden mb-6 border border-[#312e81]">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover filter contrast-125 saturate-150 group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-[#4f46e5]/10 group-hover:bg-transparent transition-colors"></div>
                                        <div className="absolute top-2 right-2 border border-[#8b5cf6] bg-[#050510]/80 backdrop-blur px-2 py-1 cyber-body text-xs font-bold text-[#d946ef]">
                                            ITEM_{product.id.substring(product.id.length - 4).toUpperCase()}
                                        </div>
                                    </div>
                                )}

                                <h3 className="cyber-display text-xl font-bold text-[#c7d2fe] mb-2 group-hover:text-white transition-colors">{product.name}</h3>

                                <div className="cyber-body text-2xl font-bold text-[#8b5cf6] mb-4 neon-text">
                                    {formatPrice(product.price)}
                                </div>

                                {product.description && (
                                    <p className="cyber-body text-[#6366f1] text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                        {product.description}
                                    </p>
                                )}

                                <a href={getProductUrl(business.slug, product.id)} className="w-full text-center cyber-display text-sm font-bold uppercase tracking-widest bg-[#4f46e5]/20 hover:bg-[#8b5cf6] text-[#a5b4fc] hover:text-white border border-[#4f46e5] py-3 transition-colors">
                                    Mount Protocol
                                </a>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer Log */}
            <footer className="relative z-10 border-t border-[#4f46e5]/40 bg-[#050510] py-8 text-center cyber-body text-sm font-bold text-[#6366f1] uppercase tracking-widest">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-1 items-start">
                        <span>SYS.OWNER: {business.name}</span>
                        {business.location && <span>COORDS: {business.location}</span>}
                    </div>
                    <div>
                        <a href="/" className="hover:text-[#a5b4fc] transition-colors">POWERED_BY // DUKAANHAI</a>
                    </div>
                </div>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
