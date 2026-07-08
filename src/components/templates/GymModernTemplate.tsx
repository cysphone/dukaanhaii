'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';

export default function GymModernTemplate({ business, products }: any) {
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `I am interested in "${productName}" from ${business.name}.`
                : `Hi, I want to join ${business.name} today.`
        )}`;

    return (
        <div className="min-h-screen bg-[#18181b] text-zinc-100 font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');
        .modern-font { font-family: 'Outfit', sans-serif; }
      `}</style>

            {/* Modern NavBar */}
            <nav className="fixed w-full z-50 mix-blend-difference">
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center modern-font">
                    <div className="text-2xl font-extrabold tracking-tight text-white">{business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}</div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 modern-font">
                {/* Abstract Background Shapes */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-30"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-zinc-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-700 bg-zinc-900/50 backdrop-blur-md text-yellow-400 text-sm font-semibold mb-8 uppercase tracking-widest">
                        {business.category || 'Fitness Facility'}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6">
                        {business.headline || business.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-10">
                        {business.tagline || 'Elevate your fitness with modern technology and expert training.'}
                    </p>

                    {waNumber && (
                        <div className="flex justify-center gap-4">
                            <a href={waLink()} style={{ backgroundColor: business.primaryColor || undefined, color: business.secondaryColor || undefined }} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-yellow-400 rounded-full hover:bg-yellow-300 transition-all overflow-hidden">
                                <span className="relative z-10">Get Your Membership</span>
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white transition-all duration-300 group-hover:scale-100 group-hover:bg-yellow-200/50"></div>
                            </a>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Highlights */}
            {(business.about || business.mission) && (
                <section className="py-24 bg-[#0f0f11] modern-font">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-4xl font-bold mb-6 text-white">About the Facility</h2>
                                <p className="text-zinc-400 text-lg leading-relaxed font-light mb-8">
                                    {business.about}
                                </p>
                                {business.vision && (
                                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                                        <h3 className="text-yellow-400 font-bold mb-2">Our Vision</h3>
                                        <p className="text-zinc-400 text-sm">{business.vision}</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 aspect-square flex flex-col justify-end">
                                    <span className="text-4xl mb-4">🏆</span>
                                    <p className="font-semibold text-lg text-white">Expert Trainers</p>
                                </div>
                                <div className="bg-yellow-400 p-8 rounded-3xl text-black aspect-square flex flex-col justify-end translate-y-8">
                                    <span className="text-4xl mb-4 text-black">⚡</span>
                                    <p className="font-semibold text-lg max-w-[120px]">Modern Equipment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Products Slider/Grid */}
            {products.length > 0 && (
                <section className="py-32 px-6 modern-font">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-black text-white mb-12 flex items-center gap-4">
                            <span className="w-8 h-1 bg-yellow-400 block rounded-full"></span>
                            Memberships
                        </h2>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any) => (
                                <div key={product.id} className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-yellow-400 transition-colors group">
                                    {product.imageUrl && (
                                        <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
                                        {product.description && (
                                            <p className="text-zinc-400 text-sm mb-6 line-clamp-3">{product.description}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-black text-yellow-400">{formatPrice(product.price)}</span>
                                            <a href={getProductUrl(business.slug, product.id)} className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                                                ↗
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="py-12 border-t border-zinc-800 modern-font">

        <div className="flex flex-wrap gap-4 items-center justify-center mt-4 mb-4 w-full">
          {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Instagram</a>}
          {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Facebook</a>}
          {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Website</a>}
          {business.email && <a href={`mailto:${business.email}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Email</a>}
          {business.phoneNumber && <a href={`tel:${business.phoneNumber}`} className="opacity-80 hover:opacity-100 underline decoration-1 underline-offset-4">Call Us</a>}
        </div>

                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
                    <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
                    <p>Built with <a href="/" className="text-white hover:text-yellow-400 transition-colors">DukaanHai</a></p>
                </div>
              <div className='w-full text-center mt-4 border-t border-black/10 pt-4 text-xs opacity-60\'>
          {business.footerText && <p className='mb-1'>{business.footerText}</p>}
          <p>{business.copyrightText || '© ' + new Date().getFullYear() + ' ' + business.name + '. All rights reserved.'}</p>
        </div>
      </footer>
        </div>
    );
}
