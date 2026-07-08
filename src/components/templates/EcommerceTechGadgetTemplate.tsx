'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceTechGadgetTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hi, I am interested in purchasing the "${productName}" from ${business.name}.`
                : `Hi, I want to learn more about tech products at ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans selection:bg-[#0066CC] selection:text-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        .tech-font { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      `}</style>

            {/* Apple-esque Dark Nav */}
            <nav className="fixed w-full z-50 bg-[rgba(29,29,31,0.72)] backdrop-blur-lg border-b border-[#333336]">
                <div className="max-w-[1000px] mx-auto px-4 lg:px-0 h-12 flex items-center justify-between tech-font text-xs font-medium text-white/80">
                    <span className="text-white font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" /></svg>
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </span>
                    <div className="flex gap-6">
                        <a href="#store" className="hover:text-white transition-colors">Store</a>
                        {(business.about) && <a href="#about" className="hover:text-white transition-colors hidden sm:block">About</a>}
                        {waNumber && <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Support</a>}
                    </div>
                </div>
            </nav>

            {/* Clean Hero */}
            <section className="pt-20 pb-10 bg-white text-center px-4 overflow-hidden border-b border-[#E5E5EA]">
                <div className={`max-w-4xl mx-auto pt-16 pb-20 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <h2 className="tech-font text-[#BF4800] font-semibold text-xs tracking-widest uppercase mb-4">
                        {business.category || 'New Arrival'}
                    </h2>
                    <h1 className="tech-font text-5xl md:text-7xl font-bold tracking-tight mb-6">
                        {business.headline || business.name}
                    </h1>
                    <p className="tech-font text-xl md:text-2xl text-[#86868B] font-medium max-w-2xl mx-auto mb-10 tracking-tight">
                        {business.tagline || 'Pro capabilities. Unprecedented performance. Beautiful design.'}
                    </p>
                    <div className="flex justify-center gap-4 tech-font text-[15px]">
                        <a href="#store" className="bg-[#0066CC] hover:bg-[#0077ED] text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                            Buy
                        </a>
                        {waNumber && (
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-1">
                                Learn more <span className="text-sm">›</span>
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Featured Grid (Apple Style 2x2) */}
            {products.length > 0 && (
                <section id="store" className="py-12 px-4 max-w-[1400px] mx-auto">
                    <div className="grid md:grid-cols-2 gap-4">
                        {products.map((product: any, idx: number) => (
                            <div key={product.id} className={`bg-white rounded-[2rem] p-10 flex flex-col items-center text-center transition-transform hover:scale-[1.01] shadow-sm hover:shadow-md cursor-pointer ${idx === 0 && products.length % 2 !== 0 ? 'md:col-span-2' : ''}`}>
                                <h3 className="tech-font text-3xl font-semibold tracking-tight mb-2">{product.name}</h3>
                                {product.description && (
                                    <p className="tech-font text-[#86868B] text-lg font-medium mb-4 max-w-md line-clamp-2">
                                        {product.description}
                                    </p>
                                )}
                                <div className="tech-font text-[#1D1D1F] font-medium mb-6">
                                    From {formatPrice(product.price)}
                                </div>

                                <div className="flex gap-4 tech-font text-[15px] mb-12">
                                    <a href={getProductUrl(business.slug, product.id)} className="bg-[#0066CC] hover:bg-[#0077ED] text-white px-5 py-1.5 rounded-full font-medium transition-colors">
                                        Buy
                                    </a>
                                    <a href={getProductUrl(business.slug, product.id)} className="text-[#0066CC] hover:underline font-medium flex items-center py-1.5">
                                        Learn more <span className="text-sm ml-1">›</span>
                                    </a>
                                </div>

                                {product.imageUrl && (
                                    <div className="w-full max-w-sm mt-auto">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-auto object-contain drop-shadow-xl" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Specs / Info Panel */}
            {(business.about || business.mission) && (
                <section id="about" className="py-24 bg-black text-white text-center px-4">
                    <div className="max-w-3xl mx-auto tech-font">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">Innovation everywhere.</h2>
                        <p className="text-xl md:text-2xl text-[#86868B] font-medium leading-relaxed mb-16">
                            {business.about || business.mission}
                        </p>
                        {business.vision && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-[#333336] pt-12">
                                <div className="col-span-1 md:col-span-3">
                                    <h3 className="text-xs font-semibold tracking-widest text-[#86868B] uppercase mb-4">Core Vision</h3>
                                    <p className="text-2xl font-semibold tracking-tight leading-snug">{business.vision}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Clean Footer */}
            <footer className="bg-[#F5F5F7] border-t border-[#E5E5EA] py-8 text-center tech-font text-xs text-[#86868B]">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>Copyright © {new Date().getFullYear()} {business.name}. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="/" className="hover:text-[#1D1D1F] transition-colors">Built on DukaanHai</a>
                        {business.location && <span className="border-l border-[#D2D2D7] pl-4">{business.location}</span>}
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
