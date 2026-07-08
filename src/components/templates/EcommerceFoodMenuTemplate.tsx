'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceFoodMenuTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I would like to place an order for "${productName}" from ${business.name}.`
                : `I'd like to place an order at ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#FCFAFA] text-[#2C2C2C] font-sans selection:bg-[#E11D48] selection:text-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
        .menu-display { font-family: 'DM Serif Display', serif; }
        .menu-body { font-family: 'Inter', sans-serif; }
      `}</style>

            {/* Hero / Cover */}
            <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center border-b-[12px] border-[#E11D48] bg-white">
                <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
                    <div className="menu-display text-7xl md:text-8xl text-[#1A1A1A] mb-4">
                        {business.name}
                    </div>
                    <div className="flex items-center justify-center gap-4 text-[#8A8A8A] mb-8">
                        <span className="h-px w-16 bg-[#E5E5E5]"></span>
                        <span className="menu-body text-xs font-semibold uppercase tracking-[0.2em]">{business.category || 'Menu & Cafe'}</span>
                        <span className="h-px w-16 bg-[#E5E5E5]"></span>
                    </div>

                    <h2 className="menu-display italic text-2xl md:text-3xl text-[#E11D48] max-w-2xl mx-auto leading-relaxed mb-10">
                        {business.headline || business.tagline || 'Savor the art of culinary excellence.'}
                    </h2>

                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#1A1A1A] text-white menu-body text-sm font-semibold uppercase tracking-widest px-10 py-4 hover:bg-[#E11D48] transition-colors">
                            {business.ctaText || 'Order Now'}
                        </a>
                    )}
                </div>
            </section>

            {/* Story */}
            {(business.about || business.vision) && (
                <section className="py-20 px-6 max-w-3xl mx-auto text-center">
                    <h3 className="menu-display text-3xl mb-6">Our Story</h3>
                    <p className="menu-body text-lg text-[#555] font-light leading-relaxed mb-8">
                        {business.about || business.mission}
                    </p>
                    {business.vision && (
                        <p className="menu-body text-sm font-medium uppercase tracking-widest text-[#E11D48]">
                            {business.vision}
                        </p>
                    )}
                </section>
            )}

            {/* The Menu (List Based) */}
            {products.length > 0 && (
                <section className="py-20 px-6 bg-[#FCFAFA]">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="menu-display text-5xl text-[#1A1A1A]">The Menu</h2>
                            <div className="w-12 h-1 bg-[#E11D48] mx-auto mt-6"></div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                            {products.map((product: any) => (
                                <div key={product.id} className="group flex flex-col items-start text-left border-b border-[#EAEAEA] pb-6 hover:border-[#E11D48] transition-colors duration-300">
                                    <div className="w-full flex justify-between items-baseline mb-2 gap-4">
                                        <h3 className="menu-display text-2xl text-[#1A1A1A] group-hover:text-[#E11D48] transition-colors">{product.name}</h3>
                                        <div className="flex-1 border-b-2 border-dotted border-[#DFDFDF] hidden sm:block"></div>
                                        <span className="menu-body font-semibold text-lg text-[#1A1A1A]">{formatPrice(product.price)}</span>
                                    </div>

                                    {product.description && (
                                        <p className="menu-body text-sm text-[#777] font-light leading-relaxed mb-4 w-[90%]">
                                            {product.description}
                                        </p>
                                    )}

                                    <a href={getProductUrl(business.slug, product.id)} className="menu-body text-xs font-semibold uppercase tracking-widest text-[#E11D48] hover:text-[#1A1A1A] transition-colors flex items-center gap-1 mt-auto">
                                        Select <span className="text-lg leading-none mt-[-2px]">→</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer Info */}
            <footer className="bg-[#1A1A1A] text-white py-24 text-center">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="menu-display text-4xl mb-8 text-[#E11D48]">{business.name}</h2>
                    <div className="menu-body text-sm text-[#AAA] font-light leading-loose space-y-2 mb-12">
                        {business.location && <p>{business.location}</p>}
                        <p>Mon-Sun • 8am - 10pm</p>
                    </div>
                    <div className="w-12 h-px bg-[#333] mx-auto mb-12"></div>
                    <div className="menu-body text-xs text-[#666] uppercase tracking-[0.2em]">
                        <a href="/" className="hover:text-white transition-colors">Powered by DukaanHai</a>
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
