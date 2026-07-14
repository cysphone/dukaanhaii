'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Camera, MessageCircle, Globe, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

interface TemplateProps {
  business: {
    name: string;
    slug: string;
    headline?: string | null;
    tagline?: string | null;
    about?: string | null;
    vision?: string | null;
    mission?: string | null;
    marketingDesc?: string | null;
    whatsappNumber?: string | null;
    location?: string | null;
    category?: string | null;
    logoUrl?: string | null;
    bannerUrl?: string | null;
    faviconUrl?: string | null;
    ctaText?: string | null;
    phoneNumber?: string | null;
    email?: string | null;
    instagramUrl?: string | null;
    facebookUrl?: string | null;
    websiteUrl?: string | null;
    primaryColor?: string | null;
    secondaryColor?: string | null;
    footerText?: string | null;
    copyrightText?: string | null;
  };
  products: Array<{
    id: string;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    images?: string[];
    category?: string | null;
    inStock: boolean;
  }>;
}

const ImageGallery = ({ images, fallbackUrl, alt }: { images?: string[], fallbackUrl?: string | null, alt: string }) => {
  const allImages = images && images.length > 0 ? images : fallbackUrl ? [fallbackUrl] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-stone-300 bg-stone-100">
        <ShoppingBag className="w-12 h-12 stroke-[1]" />
      </div>
    );
  }

  if (allImages.length === 1) {
    return (
      <img src={allImages[0]} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
    );
  }

  return (
    <div className="relative w-full h-full group/gallery">
      <img src={allImages[currentIndex]} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); }}
          className="bg-white/80 p-1 rounded-full text-stone-800 hover:bg-white shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); }}
          className="bg-white/80 p-1 rounded-full text-stone-800 hover:bg-white shadow-sm"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
        {allImages.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
};

export default function MinimalTemplate({ business, products }: TemplateProps) {
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'about' | 'contact' | 'product'>('home');
  const [selectedProduct, setSelectedProduct] = useState<TemplateProps['products'][0] | null>(null);

  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi! I'm interested in ordering "${productName}" from ${business.name}.`
        : `Hi! I'd like to know more about ${business.name}.`
    )}`;

  const primaryColor = business.primaryColor || '#1c1917'; // stone-900

  const handleProductClick = (e: React.MouseEvent, product: TemplateProps['products'][0]) => {
    e.preventDefault();
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const NavLink = ({ page, label }: { page: typeof activePage, label: string }) => (
    <button 
      onClick={() => { setActivePage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      className={`hover:text-stone-900 transition-colors ${activePage === page ? 'text-stone-900 border-b border-stone-900 pb-0.5' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] font-sans text-stone-900 selection:bg-stone-200 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full bg-[#fafaf9]/80 backdrop-blur-md z-50 border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => setActivePage('home')} className="flex items-center gap-4 text-left">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain" />
            ) : (
              <h1 className="font-display text-2xl font-semibold tracking-tight">{business.name}</h1>
            )}
          </button>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-500 font-body">
              <NavLink page="home" label="Home" />
              {products.length > 0 && <NavLink page="shop" label="Shop" />}
              {business.about && <NavLink page="about" label="About" />}
              <NavLink page="contact" label="Contact" />
            </nav>
            {waNumber && (
              <a
                href={waLink(selectedProduct?.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                {business.ctaText || 'Contact Us'}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          
          {/* HOME PAGE */}
          {activePage === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="pt-20 pb-20 md:pt-32 md:pb-32 px-6 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 space-y-6 text-center md:text-left">
                    {business.tagline && (
                      <span className="font-body text-xs font-semibold tracking-widest text-stone-500 uppercase">
                        {business.tagline}
                      </span>
                    )}
                    <h2 className="font-display text-5xl md:text-7xl font-semibold leading-tight text-stone-900">
                      {business.headline || `Welcome to ${business.name}`}
                    </h2>
                    <p className="font-body text-lg text-stone-500 max-w-lg mx-auto md:mx-0 leading-relaxed">
                      {business.marketingDesc || "Discover our curated collection of premium products."}
                    </p>
                    {products.length > 0 && (
                      <div className="pt-4">
                        <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0 }); }} className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider border-b-2 border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors">
                          Explore Collection <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 w-full">
                    <div className="relative aspect-[4/5] md:aspect-square bg-stone-100 overflow-hidden rounded-2xl">
                      {business.bannerUrl ? (
                        <img src={business.bannerUrl} alt={business.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300">
                          <ShoppingBag className="w-24 h-24 stroke-[1]" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {products.length > 0 && (
                <section className="py-24 px-6 bg-white border-t border-stone-100">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between mb-12">
                      <h3 className="font-display text-3xl md:text-4xl font-semibold text-stone-900">Featured Products</h3>
                      <button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0 }); }} className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">View All →</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                      {products.slice(0, 3).map((product) => (
                        <div key={product.id} className="group block cursor-pointer" onClick={(e) => handleProductClick(e, product)}>
                          <div className="aspect-[3/4] bg-[#fafaf9] overflow-hidden mb-6 relative">
                            <ImageGallery images={product.images} fallbackUrl={product.imageUrl} alt={product.name} />
                            {!product.inStock && (
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-xs font-semibold px-3 py-1 uppercase tracking-wider">Sold Out</div>
                            )}
                          </div>
                          <div className="font-body">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">{product.name}</h4>
                              <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
                            </div>
                            {product.category && <p className="text-sm text-stone-500 capitalize">{product.category}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {/* SHOP PAGE */}
          {activePage === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="py-20 px-6 max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                  <h2 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-4">Our Collection</h2>
                  <p className="font-body text-stone-500 max-w-2xl mx-auto">Browse our complete range of products.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                  {products.map((product) => (
                    <div key={product.id} className="group block cursor-pointer" onClick={(e) => handleProductClick(e, product)}>
                      <div className="aspect-[3/4] bg-[#fafaf9] overflow-hidden mb-6 relative">
                        <ImageGallery images={product.images} fallbackUrl={product.imageUrl} alt={product.name} />
                        {!product.inStock && (
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-stone-900 text-xs font-semibold px-3 py-1 uppercase tracking-wider">Sold Out</div>
                        )}
                      </div>
                      <div className="font-body">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">{product.name}</h4>
                          <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
                        </div>
                        {product.category && <p className="text-sm text-stone-500 capitalize">{product.category}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {/* PRODUCT DETAIL PAGE */}
          {activePage === 'product' && selectedProduct && (
            <motion.div key="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="py-20 px-6 max-w-6xl mx-auto">
                <button onClick={() => setActivePage('shop')} className="mb-8 font-body text-sm font-medium text-stone-500 hover:text-stone-900 flex items-center gap-2 transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" /> Back to Shop
                </button>
                <div className="flex flex-col md:flex-row gap-16">
                  <div className="flex-1">
                    <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden">
                      <ImageGallery images={selectedProduct.images} fallbackUrl={selectedProduct.imageUrl} alt={selectedProduct.name} />
                    </div>
                  </div>
                  <div className="flex-1 space-y-8 py-4">
                    <div>
                      {selectedProduct.category && <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-3">{selectedProduct.category}</p>}
                      <h1 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-4">{selectedProduct.name}</h1>
                      <p className="font-body text-2xl text-stone-700">{formatPrice(selectedProduct.price)}</p>
                    </div>
                    {selectedProduct.description && (
                      <div className="prose prose-stone">
                        <p className="font-body text-stone-600 leading-relaxed whitespace-pre-wrap">{selectedProduct.description}</p>
                      </div>
                    )}
                    <div className="pt-6 border-t border-stone-200">
                      <a
                        href={waLink(selectedProduct.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 text-white font-medium px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Buy via WhatsApp <MessageCircle className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* ABOUT PAGE */}
          {activePage === 'about' && (business.about || business.mission || business.vision) && (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="py-24 px-6 bg-stone-900 text-stone-50 min-h-[70vh] flex items-center">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 w-full">
                  <div className="space-y-8">
                    {business.about && (
                      <div>
                        <h3 className="font-display text-4xl md:text-5xl font-semibold mb-8">Our Story</h3>
                        <p className="font-body text-stone-300 leading-relaxed text-lg font-light whitespace-pre-wrap">{business.about}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-12 pt-4 md:pt-0">
                    {business.mission && (
                      <div>
                        <h3 className="font-display text-2xl font-semibold mb-4 text-stone-200 border-b border-stone-800 pb-4">Our Mission</h3>
                        <p className="font-body text-stone-400 leading-relaxed font-light">{business.mission}</p>
                      </div>
                    )}
                    {business.vision && (
                      <div>
                        <h3 className="font-display text-2xl font-semibold mb-4 text-stone-200 border-b border-stone-800 pb-4">Our Vision</h3>
                        <p className="font-body text-stone-400 leading-relaxed font-light">{business.vision}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* CONTACT PAGE */}
          {activePage === 'contact' && (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <section className="py-24 px-6 max-w-4xl mx-auto text-center min-h-[60vh] flex flex-col justify-center">
                <h2 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-8">Get in Touch</h2>
                <p className="font-body text-stone-500 mb-12 text-lg">Have a question or want to work together? We'd love to hear from you.</p>
                <div className="flex flex-col md:flex-row justify-center gap-12 font-body">
                  {business.email && (
                    <a href={`mailto:${business.email}`} className="flex flex-col items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><Mail className="w-6 h-6" /></div>
                      <span className="font-medium">{business.email}</span>
                    </a>
                  )}
                  {business.phoneNumber && (
                    <a href={`tel:${business.phoneNumber}`} className="flex flex-col items-center gap-4 text-stone-600 hover:text-stone-900 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><Phone className="w-6 h-6" /></div>
                      <span className="font-medium">{business.phoneNumber}</span>
                    </a>
                  )}
                  {business.location && (
                    <div className="flex flex-col items-center gap-4 text-stone-600">
                      <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center"><MapPin className="w-6 h-6" /></div>
                      <span className="font-medium max-w-[200px] text-center">{business.location}</span>
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-[#fafaf9] pt-20 pb-10 px-6 border-t border-stone-200 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 font-body">
          <div className="lg:col-span-2">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-8 w-auto object-contain mb-6 grayscale opacity-80" />
            ) : (
              <h2 className="font-display text-2xl font-semibold mb-6">{business.name}</h2>
            )}
            <p className="text-stone-500 max-w-sm leading-relaxed mb-6">
              {business.footerText || "Crafting experiences and delivering quality products to our customers worldwide."}
            </p>
            <div className="flex gap-4">
              {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Camera className="w-5 h-5" /></a>}
              {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><MessageCircle className="w-5 h-5" /></a>}
              {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors"><Globe className="w-5 h-5" /></a>}
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 border-t border-stone-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-body text-stone-500">
          <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
          <p>Powered by <a href="/" className="font-semibold text-stone-900 hover:underline">DukaanHai</a></p>
        </div>
      </footer>
    </div>
  );
}
