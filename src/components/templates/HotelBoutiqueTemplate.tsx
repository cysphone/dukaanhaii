'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function HotelBoutiqueTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hi, I'm interested in reserving "${productName}" at ${business.name}.`
                : `Hi, I want to book a stay at ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#4A3F35] font-sans border-x-8 md:border-x-[16px] border-[#8C7A6B]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Karla:wght@400;500;700&display=swap');
        .boutique-display { font-family: 'Libre Baskerville', serif; }
        .boutique-body { font-family: 'Karla', sans-serif; }
      `}</style>

            {/* Header */}
            <header className="px-6 py-8 md:py-12 flex flex-col items-center justify-center text-center">
                <h1 className="boutique-display text-4xl md:text-5xl lg:text-6xl text-[#3A3026] mb-4">
                    {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                </h1>
                <div className="flex items-center gap-4 text-[#8C7A6B] boutique-body text-xs font-bold uppercase tracking-[0.2em]">
                    <span className="w-8 h-px bg-[#D0C5B5]"></span>
                    <span>{business.location || 'Boutique Hotel'}</span>
                    <span className="w-8 h-px bg-[#D0C5B5]"></span>
                </div>
            </header>

            {/* Hero Content */}
            <section className="px-6 max-w-5xl mx-auto mb-20 text-center">
                <h2 className="boutique-display text-2xl md:text-3xl lg:text-4xl leading-relaxed text-[#5A4D41] max-w-3xl mx-auto italic font-normal mb-8">
                    "{business.headline || business.tagline || 'A curated experience of comfort and distinctive style.'}"
                </h2>
                {waNumber && (
                    <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="inline-block boutique-body font-bold text-xs uppercase tracking-[0.2em] bg-[#4A3F35] text-white px-8 py-4 hover:bg-[#3A3026] transition-colors border border-transparent shadow-sm">
                        Reservation Inquiry
                    </a>
                )}
            </section>

            {/* Masonry or Grid About & Vision */}
            {(business.about || business.vision) && (
                <section className="max-w-5xl mx-auto px-6 mb-24 grid md:grid-cols-2 gap-8">
                    <div className="bg-[#F0EBE1] p-10 md:p-14 border border-[#E0D8CA]">
                        <h3 className="boutique-display text-2xl mb-6 text-[#3A3026]">Our Story</h3>
                        <p className="boutique-body text-[#6A5E51] leading-loose text-[15px]">
                            {business.about || business.mission}
                        </p>
                    </div>
                    {business.vision && (
                        <div className="bg-[#3A3026] text-[#FDFBF7] p-10 md:p-14 flex items-center justify-center text-center">
                            <div>
                                <span className="boutique-display text-4xl opacity-50 block mb-6">~</span>
                                <p className="boutique-display italic text-lg leading-loose">
                                    {business.vision}
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            )}

            {/* Rooms via Aesthetic Grid */}
            {products.length > 0 && (
                <section className="px-6 max-w-6xl mx-auto pb-32">
                    <div className="text-center mb-16">
                        <h3 className="boutique-display text-3xl text-[#3A3026]">The Quarters</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                        {products.map((product: any) => (
                            <div key={product.id} className="group cursor-pointer">
                                <div className="mb-6 relative overflow-hidden aspect-[4/5] bg-[#EBE5D8]">
                                    {product.imageUrl && (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 origin-center"
                                        />
                                    )}
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                                </div>

                                <div className="text-center px-4">
                                    <h4 className="boutique-display text-xl text-[#3A3026] mb-2 group-hover:text-[#8C7A6B] transition-colors">{product.name}</h4>
                                    <div className="boutique-body font-bold text-sm text-[#8C7A6B] mb-4 tracking-widest uppercase">
                                        {formatPrice(product.price)}
                                    </div>
                                    {product.description && (
                                        <p className="boutique-body text-[#7A6D60] text-[14px] leading-relaxed mb-6 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    <a href={getProductUrl(business.slug, product.id)} className="inline-block boutique-display italic text-[#4A3F35] border-b border-[#D0C5B5] group-hover:border-[#4A3F35] pb-1 transition-colors">
                                        View Details
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="border-t border-[#EAE3D5] py-12 px-6 flex flex-col md:flex-row items-center justify-between gap-6 boutique-body text-xs font-bold uppercase tracking-[0.2em] text-[#8C7A6B]">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <span>© {new Date().getFullYear()} {business.name}.</span>
                <a href="/" className="hover:text-[#4A3F35] transition-colors">Made softly with DukaanHai</a>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
