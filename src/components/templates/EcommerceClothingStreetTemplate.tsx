'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceClothingStreetTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Yo! I need to cop that "${productName}" from ${business.name}.`
                : `Yo! Need info on ${business.name} drops.`
        )}`;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400 selection:text-black overflow-x-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&family=Syne:wght@700;800&display=swap');
        .street-display { font-family: 'Syne', sans-serif; }
        .street-body { font-family: 'Space Grotesk', sans-serif; }
        
        .marquee-container { overflow: hidden; white-space: nowrap; }
        .marquee-content { display: inline-block; animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>

            {/* Marquee Top */}
            <div className="bg-yellow-400 text-black py-2 street-display text-sm font-bold uppercase tracking-widest marquee-container border-b-2 border-white">
                <div className="marquee-content whitespace-nowrap">
                    {Array(10).fill(`${business.tagline || 'LATEST DROP NOW LIVE'} /// `).join('')}
                </div>
            </div>

            {/* Hardcore Nav */}
            <nav className="border-b-2 border-white/20 p-6 flex justify-between items-center z-50 relative bg-black">
                <div className="street-display text-3xl font-extrabold uppercase tracking-tighter mix-blend-difference">{business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}</div>
                {waNumber && (
                    <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="street-body font-bold text-xs uppercase bg-white text-black px-4 py-2 hover:bg-yellow-400 transition-colors">
                        Hit Us Up
                    </a>
                )}
            </nav>

            {/* Hero */}
            <section className="relative min-h-[85vh] flex flex-col justify-center px-6 lg:px-20 border-b-2 border-white/20">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity filter contrast-125 grayscale"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-10">
                    <span className="street-body inline-block bg-red-600 text-white font-bold px-3 py-1 text-sm uppercase tracking-widest mb-6 -rotate-2">
                        {business.category || 'UNDERGROUND'}
                    </span>
                    <h1 className="street-display text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        {business.headline || business.name}
                    </h1>
                    <p className="street-body text-xl md:text-2xl font-bold bg-yellow-400 text-black inline-block px-4 py-2 mt-4 max-w-full">
                        EST. 2024 / WORLDWIDE
                    </p>
                </div>

                {/* Animated Badge */}
                <div className="absolute bottom-10 right-10 w-32 h-32 hidden md:flex items-center justify-center animate-spin-slow" style={{ animationDuration: '10s' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                        <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                        <text className="street-body text-[13px] font-bold uppercase tracking-widest" fill="currentColor">
                            <textPath href="#curve" startOffset="0%">• {business.name} • EXCLUSIVE DROPS • NO RESTOCKS </textPath>
                        </text>
                    </svg>
                </div>
            </section>

            {/* Grid Products */}
            {products.length > 0 && (
                <section className="py-20 border-b-2 border-white/20 bg-[#111]">
                    <div className="px-6 lg:px-20 mb-12 flex justify-between items-end">
                        <h2 className="street-display text-5xl md:text-7xl uppercase text-white tracking-tighter">The Vault</h2>
                    </div>

                    <div className="w-full border-y-2 border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/20">
                            {products.map((product: any) => (
                                <div key={product.id} className="group relative bg-black flex flex-col h-full hover:bg-white hover:text-black transition-colors duration-300">
                                    <div className="aspect-[4/5] bg-zinc-900 border-b-2 border-white/20 group-hover:border-black/20 p-4 relative">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center street-display text-4xl opacity-10">NO IMG</div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-yellow-400 text-black street-body font-bold px-3 py-1 text-sm border-2 border-black rotate-3 group-hover:-rotate-3 transition-transform">
                                            {formatPrice(product.price)}
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="street-display text-2xl uppercase tracking-tight mb-2 leading-none">{product.name}</h3>
                                        {product.description && (
                                            <p className="street-body text-sm text-gray-400 group-hover:text-gray-700 font-medium mb-6 line-clamp-3">
                                                {product.description}
                                            </p>
                                        )}
                                        <div className="mt-auto">
                                            <a href={getProductUrl(business.slug, product.id)} className="block w-full text-center border-2 border-white group-hover:border-black text-white group-hover:bg-black group-hover:text-white street-body font-bold uppercase py-3 transition-all hover:scale-105 active:scale-95">
                                                Grab It
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Brutalist About */}
            {(business.about || business.mission) && (
                <section className="py-20 px-6 lg:px-20 flex flex-col md:flex-row gap-12 items-center bg-yellow-400 text-black relative border-b-2 border-white/20">
                    <div className="w-full md:w-1/2">
                        <h2 className="street-display text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">Manifesto</h2>
                        <div className="w-full h-2 bg-black mb-8"></div>
                        <p className="street-body text-xl font-bold leading-tight">
                            {business.about || business.mission}
                        </p>
                    </div>

                    {business.vision && (
                        <div className="w-full md:w-1/2 bg-black text-white p-10 border-4 border-black shadow-[15px_15px_0_0_#fff]">
                            <span className="street-body text-red-500 font-bold block mb-4 uppercase text-xl">/// The Vision</span>
                            <p className="street-display text-2xl uppercase tracking-tight leading-snug">
                                "{business.vision}"
                            </p>
                        </div>
                    )}
                </section>
            )}

            {/* Footer */}
            <footer className="py-12 px-6 lg:px-20 bg-black text-white street-body flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold uppercase border-t-8 border-yellow-400">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="flex gap-4">
                    <span>{business.name}</span>
                    <span className="text-red-500">©{new Date().getFullYear()}</span>
                </div>
                <div>
                    <a href="/" className="hover:text-yellow-400 transition-colors">Powered By DukaanHai</a>
                </div>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
