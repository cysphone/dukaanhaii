'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';

export default function GymPowerTemplate({ business, products }: any) {
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I want to sign up for "${productName}" at ${business.name}.`
                : `Hey! I'm interested in joining ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&family=Teko:wght@500;700&display=swap');
        .power-display { font-family: 'Montserrat', sans-serif; text-transform: uppercase; font-style: italic; font-weight: 900; }
        .power-body { font-family: 'Teko', sans-serif; text-transform: uppercase; font-size: 1.1rem; letter-spacing: 0.05em; }
        .clip-slant { clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%); }
        .clip-slant-reverse { clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%); }
      `}</style>

            {/* Hero Section */}
            <section className="relative pt-32 pb-40 px-6 border-b-8 border-red-600 clip-slant bg-zinc-900">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23dc2626\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <h1 className="power-display text-6xl md:text-8xl lg:text-9xl text-white tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] leading-none mb-6">
                        {business.name}
                    </h1>
                    <p className="power-body text-red-500 text-2xl md:text-3xl max-w-2xl mx-auto tracking-widest">
                        {business.tagline || 'Unleash Your Ultimate Power'}
                    </p>

                    <div className="flex gap-4 justify-center mt-12 power-body">
                        {waNumber && (
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white text-2xl px-10 py-3 skew-x-[-15deg] transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                                <span className="block skew-x-[15deg]">Join Now</span>
                            </a>
                        )}
                        <a href="#plans" className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white text-2xl px-10 py-3 skew-x-[-15deg] transition-all">
                            <span className="block skew-x-[15deg]">View Plans</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* About Section */}
            {(business.about || business.mission) && (
                <section className="py-24 px-6 max-w-5xl mx-auto relative">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="power-display text-5xl md:text-7xl text-zinc-800 absolute -top-10 left-0 -z-10 tracking-widest select-none">THE GRIND</h2>
                            <h3 className="power-display text-4xl text-white mb-6 border-l-4 border-red-600 pl-4">Our Mission</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed font-sans font-medium">
                                {business.about || business.mission}
                            </p>
                        </div>
                        {business.vision && (
                            <div className="bg-zinc-900 border border-zinc-800 p-8 skew-x-[-5deg] relative">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-red-600"></div>
                                <div className="skew-x-[5deg]">
                                    <h3 className="power-display text-3xl text-red-500 mb-4">The Vision</h3>
                                    <p className="text-zinc-300 font-sans italic">{business.vision}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Memberships/Products */}
            {products.length > 0 && (
                <section id="plans" className="py-32 px-6 bg-red-600 clip-slant-reverse mt-20">
                    <div className="max-w-6xl mx-auto pt-20">
                        <h2 className="power-display text-5xl md:text-6xl text-white text-center mb-16 drop-shadow-md">
                            Training Plans
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any) => (
                                <div key={product.id} className="bg-zinc-950 border-2 border-black p-8 hover:-translate-y-2 transition-transform duration-300 relative group">
                                    <div className="absolute inset-0 border-2 border-red-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none scale-105"></div>

                                    {product.imageUrl && (
                                        <div className="h-48 w-full bg-zinc-800 mb-6 overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                    )}

                                    <h3 className="power-display text-3xl text-white mb-2">{product.name}</h3>
                                    <div className="power-display text-4xl text-red-500 mb-4">{formatPrice(product.price)}</div>

                                    {product.description && (
                                        <p className="text-zinc-400 font-sans text-sm mb-8 line-clamp-3">{product.description}</p>
                                    )}

                                    <div className="mt-auto">
                                        <a href={getProductUrl(business.slug, product.id)} className="block text-center bg-white text-black power-body text-xl py-3 w-full hover:bg-black hover:text-red-500 transition-colors border-2 border-white">
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
            <footer className="py-12 border-t border-zinc-800 text-center text-zinc-500 power-body mt-20">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <p className="text-2xl text-zinc-300 mb-2">{business.name}</p>
                <p>{business.location && <span className="mr-4">📍 {business.location}</span>} Powered by DukaanHai</p>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
