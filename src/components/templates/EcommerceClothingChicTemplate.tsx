'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceClothingChicTemplate({ business, products }: any) {
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
        <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-[#f0f0f0] selection:text-black">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,700;1,6..96,400&family=Jost:wght@300;400;500;600&display=swap');
        .chic-display { font-family: 'Bodoni Moda', serif; }
        .chic-body { font-family: 'Jost', sans-serif; }
      `}</style>

            {/* Modern Minimal Navigation */}
            <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
                <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-8 chic-body text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                        <a href="#collection" className="hover:text-black transition-colors">Collection</a>
                        {(business.about || business.mission) && <a href="#about" className="hover:text-black transition-colors">About</a>}
                    </div>

                    <div className="chic-display text-3xl font-normal tracking-tight text-center flex-1 md:flex-none">
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>

                    <div className="hidden md:flex justify-end gap-6 chic-body text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500">
                        {waNumber && (
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="text-black border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all">
                                Contact
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* Edgy Lookbook Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Abstract Minimalist Background Shapes for High Fashion Feel */}
                <div className="absolute inset-0 z-0 bg-gray-50">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-100 transform -skew-x-12 origin-top"></div>
                </div>

                <div className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <span className="chic-body block text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-8 border-b border-gray-300 inline-block pb-2">
                        {business.category || 'New Collection'}
                    </span>
                    <h1 className="chic-display text-6xl md:text-8xl lg:text-9xl font-normal leading-none tracking-[-0.02em] mb-6">
                        {business.headline || 'Defined by Elegance'}
                    </h1>
                    <p className="chic-body max-w-xl mx-auto text-lg text-gray-500 font-light mb-12">
                        {business.tagline || 'Curating minimalism, sophisticated lines, and modern silhouettes for the contemporary wardrobe.'}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 chic-body text-xs font-semibold tracking-[0.2em] uppercase">
                        <a href="#collection" className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors w-full sm:w-auto text-center">
                            Shop Collection
                        </a>
                        {waNumber && (
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="text-black border-b border-black pb-1 hover:text-gray-500 transition-colors">
                                Personal Shopper
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Lookbook / Products Grid */}
            {products.length > 0 && (
                <section id="collection" className="max-w-[1400px] mx-auto px-6 py-32">
                    <div className="flex items-end justify-between mb-16 border-b border-gray-200 pb-8">
                        <h2 className="chic-display text-4xl md:text-5xl">Selected Pieces</h2>
                        <span className="chic-body text-[10px] tracking-[0.3em] uppercase text-gray-500 pb-2">Autumn / Winter</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20">
                        {products.map((product: any, idx: number) => (
                            <a key={product.id} href={getProductUrl(business.slug, product.id)} className="block group">
                                <div className={`relative bg-gray-50 overflow-hidden mb-6 ${idx % 2 === 1 ? 'aspect-[3/4] mt-0 lg:mt-16' : 'aspect-[3/4]'}`}>
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
                                        />
                                    )}
                                    {/* Minimal Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black-[0.02] transition-colors duration-500"></div>
                                </div>

                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="chic-display text-xl mb-1 group-hover:text-gray-500 transition-colors">{product.name}</h3>
                                        {product.description && (
                                            <p className="chic-body text-sm text-gray-400 font-light line-clamp-1 mb-2">
                                                {product.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="chic-body text-sm font-medium tracking-wide">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            )}

            {/* Editorial About Section */}
            {(business.about || business.mission) && (
                <section id="about" className="bg-gray-50 py-32 px-6">
                    <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="chic-body block text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6">The House</span>
                            <h2 className="chic-display text-4xl md:text-5xl mb-8 leading-tight">
                                Crafting modern classics driven by purpose.
                            </h2>
                            <p className="chic-body text-gray-500 leading-relaxed font-light text-lg mb-8">
                                {business.about || business.mission}
                            </p>
                        </div>
                        {business.vision && (
                            <div className="border border-gray-200 p-10 md:p-14 bg-white relative">
                                <div className="absolute -top-3 -left-3 border-t border-l border-black w-6 h-6"></div>
                                <div className="absolute -bottom-3 -right-3 border-b border-r border-black w-6 h-6"></div>
                                <span className="chic-display italic text-2xl text-gray-800 leading-relaxed text-center block">
                                    "{business.vision}"
                                </span>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-16">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 chic-body">
                    <div className="lg:col-span-2">
                        <h2 className="chic-display text-3xl mb-4">{business.name}</h2>
                        <p className="text-gray-400 text-sm font-light max-w-sm leading-relaxed">
                            {business.tagline || 'Elevating everyday aesthetics through mindful design.'}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black mb-6 border-b border-gray-200 pb-4">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-light">
                            {waNumber && <li><a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WhatsApp</a></li>}
                            <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-black transition-colors">Pinterest</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black mb-6 border-b border-gray-200 pb-4">Info</h4>
                        <ul className="space-y-4 text-sm text-gray-500 font-light">
                            {business.location && <li>{business.location}</li>}
                            <li><a href="/" className="hover:text-black transition-colors">Powered by DukaanHai</a></li>
                        </ul>
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
