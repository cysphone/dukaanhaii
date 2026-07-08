'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function HotelLuxuryTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I would like to inquire about booking "${productName}" at ${business.name}.`
                : `Hello, I'm interested in staying at ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#141210] text-[#E0D8C8] font-sans selection:bg-[#D4AF37] selection:text-[#141210]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
        .luxury-display { font-family: 'Playfair Display', serif; }
        .luxury-body { font-family: 'Inter', sans-serif; }
      `}</style>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 transition-all duration-500 bg-[#141210]/95 backdrop-blur-md border-b border-[#D4AF37]/20">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="luxury-display text-2xl md:text-3xl text-[#D4AF37] tracking-wider">{business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}</div>
                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="luxury-body text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-[#E0D8C8] hover:text-[#D4AF37] transition-colors border-b border-transparent hover:border-[#D4AF37] pb-1">
                            Book Your Stay
                        </a>
                    )}
                </div>
            </header>

            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter grayscale blend-lighten"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#141210] via-transparent to-[#141210]"></div>

                <div className={`relative z-10 text-center max-w-5xl mx-auto transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className="h-px w-12 bg-[#D4AF37]"></span>
                        <span className="luxury-body text-[#D4AF37] text-xs uppercase tracking-[0.3em]">Exquisite Experience</span>
                        <span className="h-px w-12 bg-[#D4AF37]"></span>
                    </div>

                    <h1 className="luxury-display text-5xl md:text-7xl lg:text-9xl text-white font-normal mb-8 leading-[1.1]">
                        {business.headline || business.name}
                    </h1>

                    <p className="luxury-body text-lg md:text-xl text-[#AFA999] max-w-2xl mx-auto font-light leading-relaxed mb-12">
                        {business.tagline || 'Experience the pinnacle of luxury, refined comfort, and uncompromised elegance.'}
                    </p>

                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-10 py-4 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#141210] transition-all duration-500 luxury-body text-sm uppercase tracking-[0.2em] group">
                            Reserve Now
                        </a>
                    )}
                </div>
            </section>

            {/* The Story */}
            {(business.about || business.mission) && (
                <section className="py-32 px-6 border-b border-[#2A2622]">
                    <div className="max-w-5xl mx-auto text-center">
                        <h2 className="luxury-display text-4xl md:text-5xl text-[#D4AF37] mb-12">The Hotel</h2>
                        <p className="luxury-display text-xl md:text-3xl leading-relaxed text-[#E0D8C8] max-w-4xl mx-auto italic font-light">
                            "{business.about || business.mission}"
                        </p>
                        {business.vision && (
                            <p className="luxury-body text-sm mt-12 uppercase tracking-[0.2em] text-[#807D73] font-light max-w-2xl mx-auto">
                                {business.vision}
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Rooms & Suites */}
            {products.length > 0 && (
                <section className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#2A2622] pb-8">
                            <div>
                                <span className="luxury-body text-[#D4AF37] text-xs uppercase tracking-[0.3em] block mb-4">Accommodation</span>
                                <h2 className="luxury-display text-4xl md:text-5xl text-white">Rooms & Suites</h2>
                            </div>
                        </div>

                        <div className="space-y-24">
                            {products.map((product: any, idx: number) => (
                                <div key={product.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''} group`}>
                                    {/* Image */}
                                    <div className="w-full lg:w-3/5 overflow-hidden">
                                        <div className="aspect-[4/3] bg-[#0E0C0A] relative overflow-hidden ring-1 ring-[#D4AF37]/20">
                                            {product.imageUrl && (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-700 mix-blend-overlay"></div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="w-full lg:w-2/5 md:px-8">
                                        <h3 className="luxury-display text-3xl md:text-4xl text-white mb-4">{product.name}</h3>
                                        <div className="luxury-body text-[#D4AF37] text-lg tracking-widest mb-8">{formatPrice(product.price)} <span className="text-xs text-[#807D73]">/ NIGHT</span></div>

                                        {product.description && (
                                            <p className="luxury-body text-[#AFA999] leading-relaxed font-light mb-10">
                                                {product.description}
                                            </p>
                                        )}

                                        <a href={getProductUrl(business.slug, product.id)} className="luxury-body text-xs uppercase tracking-[0.2em] border-b border-[#D4AF37] text-[#D4AF37] pb-2 hover:text-white hover:border-white transition-colors">
                                            Discover Rituals
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-20 bg-[#0A0908] border-t border-[#D4AF37]/20">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                    <h2 className="luxury-display text-3xl text-[#D4AF37] tracking-widest">{business.name}</h2>
                    <div className="flex items-center justify-center gap-6 luxury-body text-xs tracking-widest text-[#807D73] uppercase">
                        {business.location && <span>{business.location}</span>}
                        <span>•</span>
                        <a href="/" className="hover:text-[#D4AF37] transition-colors">Powered by DukaanHai</a>
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
