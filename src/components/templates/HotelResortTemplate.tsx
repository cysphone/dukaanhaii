'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function HotelResortTemplate({ business, products }: any) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Hello, I'd like to book the "${productName}" at ${business.name}.`
                : `Hello, I'm planning to stay at ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#F0F9FF] text-[#0284C7] font-sans selection:bg-[#0EA5E9] selection:text-white">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        .resort-font { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>

            {/* Wave Top */}
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8]"></div>

            {/* Nav */}
            <nav className="absolute top-0 w-full z-50 py-8 px-6 lg:px-12 resort-font">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <span className="text-2xl font-extrabold tracking-tight text-[#0369A1]">{business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}</span>
                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur text-[#0369A1] px-5 py-2.5 rounded-full font-semibold shadow-sm hover:shadow-md transition-all text-sm">
                            Book Stay
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-24 px-6 lg:min-h-[80vh] flex items-center">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className={`space-y-8 resort-font transition-all duration-1000 transform ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0369A1] text-xs font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
                            Welcome to Paradise
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-[#0C4A6E] leading-[1.1] tracking-tight">
                            {business.headline || 'Your Tropical Escape Awaits.'}
                        </h1>
                        <p className="text-lg md:text-xl text-[#0284C7] font-light max-w-lg leading-relaxed">
                            {business.tagline || 'Experience the perfect blend of luxury, comfort, and breathtaking views at our exclusive resort.'}
                        </p>
                        {waNumber && (
                            <div className="pt-4">
                                <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center px-8 py-4 bg-[#0EA5E9] text-white rounded-2xl font-bold shadow-lg shadow-[#0EA5E9]/30 hover:bg-[#0284C7] hover:-translate-y-1 transition-all">
                                    Check Availability
                                </a>
                            </div>
                        )}
                    </div>
                    <div className={`hidden lg:block relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-1000 delay-300 transform ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <div className="absolute inset-0 bg-[#BAE6FD] animate-pulse"></div>
                        {/* Decorative placeholder for hero */}
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center"></div>
                    </div>
                </div>
            </section>

            {/* About Box */}
            {(business.about || business.mission) && (
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto bg-white rounded-[2rem] p-10 md:p-16 shadow-xl shadow-[#BAE6FD]/20 border border-[#E0F2FE] resort-font text-center">
                        <h2 className="text-3xl font-bold text-[#0C4A6E] mb-6">About Our Resort</h2>
                        <p className="text-lg text-[#0284C7] font-light leading-relaxed max-w-3xl mx-auto">
                            {business.about || business.mission}
                        </p>
                    </div>
                </section>
            )}

            {/* Rooms Grid */}
            {products.length > 0 && (
                <section className="py-24 px-6 bg-gradient-to-b from-[#F0F9FF] to-white">
                    <div className="max-w-7xl mx-auto resort-font">
                        <h2 className="text-4xl font-extrabold text-[#0C4A6E] text-center mb-16 tracking-tight">Rooms & Villas</h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any) => (
                                <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-[#BAE6FD]/20 border border-[#E0F2FE] group hover:shadow-2xl hover:shadow-[#BAE6FD]/40 transition-all duration-500">
                                    <div className="aspect-[4/3] bg-[#E0F2FE] overflow-hidden relative">
                                        {product.imageUrl && (
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-bold text-[#0369A1] shadow-sm">
                                            {formatPrice(product.price)}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-[#0C4A6E] mb-3 group-hover:text-[#0EA5E9] transition-colors">{product.name}</h3>
                                        {product.description && (
                                            <p className="text-[#0369A1] font-light text-sm line-clamp-3 mb-6 leading-relaxed">
                                                {product.description}
                                            </p>
                                        )}
                                        <a href={getProductUrl(business.slug, product.id)} className="block w-full text-center py-3 rounded-xl bg-[#F0F9FF] text-[#0EA5E9] font-bold hover:bg-[#E0F2FE] transition-colors">
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-[#0C4A6E] text-[#BAE6FD] py-16 resort-font text-center relative overflow-hidden">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                {/* Wave bottom */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#F0F9FF" opacity="0.3"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="#F0F9FF"></path>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-10">
                    <h2 className="text-3xl font-extrabold text-white mb-6">{business.name}</h2>
                    <div className="flex items-center justify-center gap-4 text-sm font-semibold opacity-80 mb-8">
                        {business.location && <span>{business.location}</span>}
                    </div>
                    <p className="text-xs font-light tracking-wider opacity-60">Created with DukaanHai</p>
                </div>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
