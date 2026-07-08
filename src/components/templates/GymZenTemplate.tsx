'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';

export default function GymZenTemplate({ business, products }: any) {
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Namaste, I would like to book "${productName}" at ${business.name}.`
                : `Namaste, I want to learn more about ${business.name}.`
        )}`;

    return (
        <div className="min-h-screen bg-[#F7F9F6] text-stone-800 font-sans selection:bg-emerald-200">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Nunito:wght@300;400;600&display=swap');
        .zen-display { font-family: 'Lora', serif; }
        .zen-body { font-family: 'Nunito', sans-serif; }
      `}</style>

            {/* Navigation */}
            <nav className="border-b border-emerald-100/50 bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="zen-display text-2xl text-emerald-900">{business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}</div>
                    {waNumber && (
                        <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="zen-body text-emerald-800 hover:text-emerald-600 transition-colors text-sm font-semibold tracking-wide uppercase">
                            Book a Session
                        </a>
                    )}
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-24 pb-32 px-6 overflow-hidden">
                {/* Soft background blob */}
                <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 left-0 -z-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <span className="zen-body inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-widest uppercase">
                        {business.category || 'Wellness Studio'}
                    </span>
                    <h1 className="zen-display text-5xl md:text-7xl text-stone-900 leading-tight">
                        {business.headline || business.name}
                    </h1>
                    <p className="zen-body text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
                        {business.tagline || 'Find your balance, breath, and inner peace in a sanctuary designed for your well-being.'}
                    </p>
                    {waNumber && (
                        <div className="pt-4">
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="inline-block bg-emerald-800 hover:bg-emerald-900 text-white zen-body rounded-full px-8 py-3.5 transition-all shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5">
                                Begin Your Journey
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Philosophy */}
            {(business.about || business.vision) && (
                <section className="py-24 px-6 bg-white">
                    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="zen-display text-4xl text-stone-900">Our Philosophy</h2>
                            <div className="w-12 h-1 bg-emerald-300 rounded-full"></div>
                            <p className="zen-body text-stone-600 leading-loose text-lg font-light">
                                {business.about || business.mission}
                            </p>
                        </div>
                        {business.vision && (
                            <div className="bg-emerald-50 rounded-[2rem] p-10 md:p-14 relative">
                                <span className="absolute -top-6 -left-6 text-6xl opacity-20 filter drop-shadow-sm">🌿</span>
                                <p className="zen-display text-2xl text-emerald-900 leading-relaxed italic">
                                    "{business.vision}"
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Offerings */}
            {products.length > 0 && (
                <section className="py-32 px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="zen-display text-4xl text-stone-900 mb-4">Studio Offerings</h2>
                            <p className="zen-body text-stone-500">Classes, workshops, and private sessions</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any) => (
                                <div key={product.id} className="bg-white rounded-3xl p-8 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group border border-stone-100">
                                    {product.imageUrl && (
                                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-stone-50">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                        </div>
                                    )}
                                    <h3 className="zen-display text-2xl text-stone-900 mb-2">{product.name}</h3>
                                    <div className="zen-body text-emerald-700 font-semibold mb-4">{formatPrice(product.price)}</div>
                                    {product.description && (
                                        <p className="zen-body text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                                            {product.description}
                                        </p>
                                    )}
                                    <a href={getProductUrl(business.slug, product.id)} className="inline-flex items-center text-emerald-800 font-medium hover:text-emerald-600 transition-colors zen-body group/link">
                                        Explore Details
                                        <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-emerald-950 text-emerald-100/60 py-16 text-center">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <h2 className="zen-display text-3xl text-white mb-6">{business.name}</h2>
                {business.location && <p className="zen-body mb-8">📍 {business.location}</p>}
                <p className="zen-body text-sm text-emerald-500">Curated on <a href="/" className="text-emerald-400 hover:text-white transition-colors">DukaanHai</a></p>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
