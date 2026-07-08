'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function EcommerceFoodFreshTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hi, I'd like to order "${productName}" from ${business.name}.`
                : `Hi, I'm interested in ordering fresh products from ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#FFFBF7] text-[#4A3D34] font-sans selection:bg-[#F26E22] selection:text-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Quicksand:wght@400;500;600;700&display=swap');
        .fresh-display { font-family: 'Nunito', sans-serif; }
        .fresh-body { font-family: 'Quicksand', sans-serif; }
      `}</style>

            {/* Fresh Nav */}
            <nav className="border-b border-[#F5EEDC] bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="fresh-display text-2xl font-black text-[#6B8E23] flex items-center gap-2">
                        <span className="text-3xl">🍃</span>
                        {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                    </div>
                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="fresh-body font-bold text-sm bg-[#F26E22] text-white px-5 py-2 rounded-full hover:bg-[#D95D1A] transition-all shadow-md shadow-[#F26E22]/20 hover:shadow-lg hover:-translate-y-0.5">
                            Order on WhatsApp
                        </a>
                    )}
                </div>
            </nav>

            {/* Organic Hero */}
            <section className="relative px-6 py-20 lg:py-32 overflow-hidden flex items-center justify-center">
                {/* Soft Organic Shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFEED9] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] opacity-50 -z-10 animate-[spin_20s_linear_infinite]"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E8F0D1] rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] opacity-50 -z-10 animate-[spin_25s_linear_infinite_reverse]"></div>

                <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8F0D1] text-[#4A5D23] fresh-body font-bold text-sm mb-6">
                        100% {business.category || 'Fresh & Natural'}
                    </div>
                    <h1 className="fresh-display text-5xl md:text-7xl font-black text-[#2D241E] leading-[1.1] mb-6">
                        {business.headline || business.name}
                    </h1>
                    <p className="fresh-body text-xl text-[#7A6B62] font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                        {business.tagline || 'Farm-fresh quality delivered straight to your door. Taste the difference of organic goodness.'}
                    </p>

                    <div className="flex justify-center gap-4">
                        <a href="#market" className="fresh-body font-bold text-lg bg-[#6B8E23] text-white px-8 py-3.5 rounded-full hover:bg-[#5A7A1B] transition-all shadow-lg shadow-[#6B8E23]/30 hover:shadow-xl hover:-translate-y-1">
                            Shop Fresh
                        </a>
                    </div>
                </div>
            </section>

            {/* Fresh About */}
            {(business.about || business.mission) && (
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative">
                            <div className="aspect-square bg-[#F5EEDC] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] relative overflow-hidden flex items-center justify-center border-4 border-white shadow-2xl">
                                {/* Decorative element replacing an actual image for now */}
                                <span className="text-9xl opacity-50">🍊</span>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <h2 className="fresh-display text-4xl font-black text-[#2D241E]">Locally Sourced. <br /><span className="text-[#F26E22]">Freshly Delivered.</span></h2>
                            <p className="fresh-body text-lg text-[#7A6B62] font-medium leading-relaxed">
                                {business.about || business.mission}
                            </p>
                            {business.vision && (
                                <div className="bg-[#FFF8F0] border border-[#FDE0C4] p-6 rounded-2xl md:-ml-12 relative z-10 shadow-lg mt-8">
                                    <p className="fresh-body font-semibold text-[#D95D1A] italic text-lg leading-relaxed">"{business.vision}"</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Market Grid */}
            {products.length > 0 && (
                <section id="market" className="py-24 px-6 bg-[#FAF6EC]">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="fresh-display text-4xl font-black text-[#2D241E] mb-4">Fresh Market</h2>
                            <p className="fresh-body text-lg text-[#7A6B62] font-medium">Handpicked selections for you</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product: any) => (
                                <div key={product.id} className="bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-xl hover:shadow-[#F26E22]/10 transition-all duration-300 group border border-[#F5EEDC]">
                                    <div className="aspect-square rounded-[1.5rem] bg-[#F5F2EA] mb-4 overflow-hidden relative">
                                        {product.imageUrl ? (
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl opacity-50">🥑</div>
                                        )}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full fresh-body font-bold text-[#F26E22] text-sm shadow-sm">
                                            {formatPrice(product.price)}
                                        </div>
                                    </div>

                                    <div className="px-2 pb-2">
                                        <h3 className="fresh-display text-xl font-bold text-[#2D241E] mb-1 group-hover:text-[#6B8E23] transition-colors">{product.name}</h3>
                                        {product.description && (
                                            <p className="fresh-body text-sm text-[#8F8177] font-medium line-clamp-2 mb-4">
                                                {product.description}
                                            </p>
                                        )}
                                        <a href={getProductUrl(business.slug, product.id)} className="block w-full text-center py-2.5 rounded-xl bg-[#FFF4ED] text-[#F26E22] fresh-body font-bold hover:bg-[#F26E22] hover:text-white transition-colors mt-auto">
                                            Add to basket
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-[#2D241E] text-[#EBE6E0] py-16 text-center fresh-body">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-6xl mx-auto px-6 space-y-6">
                    <h2 className="fresh-display text-3xl font-black text-white">{business.name}</h2>
                    <div className="flex justify-center gap-6 font-medium text-sm">
                        {business.location && <span>📍 {business.location}</span>}
                    </div>
                    <p className="text-[#8F8177] text-sm">Freshly baked by DukaanHai</p>
                </div>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
