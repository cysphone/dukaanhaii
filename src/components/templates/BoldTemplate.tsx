'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowUpRight, Camera, MessageCircle, Globe, MapPin, Phone, Mail } from 'lucide-react';

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
    category?: string | null;
    inStock: boolean;
  }>;
}

export default function BoldTemplate({ business, products }: TemplateProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi! I want to order "${productName}" from ${business.name}.`
        : `Hi! I'm interested in ${business.name}.`
    )}`;

  const brandColor = business.primaryColor || '#fb923c'; // orange-400

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-orange-500 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');
        .bold-display { font-family: 'Bebas Neue', cursive; letter-spacing: 0.03em; }
        .bold-body { font-family: 'DM Sans', sans-serif; }
      `}</style>

      {/* Header */}
      <header className="border-b-2 border-zinc-900 sticky top-0 bg-zinc-950/80 backdrop-blur-xl z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-3 h-10 rounded-sm" style={{ backgroundColor: brandColor }} />
            <h1 className="bold-display text-4xl text-white tracking-widest mt-1">
              {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
            </h1>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex gap-8 bold-display text-2xl tracking-widest text-zinc-500">
              {products.length > 0 && <a href="#products" className="hover:text-white transition-colors">Products</a>}
              {business.about && <a href="#story" className="hover:text-white transition-colors">Story</a>}
            </nav>
            {waNumber && (
              <a
                href={waLink()} 
                target="_blank"
                rel="noopener noreferrer"
                className="bold-display flex items-center gap-3 text-zinc-950 text-2xl px-6 py-2 rounded-none hover:scale-105 active:scale-95 transition-transform"
                style={{ backgroundColor: brandColor }}
              >
                <ShoppingCart className="w-5 h-5 mb-0.5" />
                {business.ctaText || 'ORDER NOW'}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 py-20 lg:py-32 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: brandColor }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          {business.tagline && (
            <div className="bold-display inline-flex items-center gap-3 text-2xl px-5 py-2 rounded-sm uppercase tracking-widest mb-8 border-2 border-zinc-800" style={{ color: brandColor }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: brandColor }} />
              {business.tagline}
            </div>
          )}
          
          <h2 className="bold-display text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] text-white leading-[0.85] mb-8 max-w-5xl uppercase mix-blend-difference">
            {business.headline || business.name}
          </h2>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-12 border-t-2 border-zinc-900 pt-8">
            {business.category && (
               <div className="flex flex-col">
                 <span className="bold-body text-xs text-zinc-500 uppercase tracking-widest font-bold">Category</span>
                 <span className="bold-display text-3xl">{business.category}</span>
               </div>
            )}
            {business.category && <div className="w-2 h-2 bg-zinc-800 rotate-45" />}
            <div className="flex flex-col">
              <span className="bold-body text-xs text-zinc-500 uppercase tracking-widest font-bold">Inventory</span>
              <span className="bold-display text-3xl">{products.length} ITEMS</span>
            </div>
            {business.location && <div className="w-2 h-2 bg-zinc-800 rotate-45" />}
            {business.location && (
               <div className="flex flex-col">
                 <span className="bold-body text-xs text-zinc-500 uppercase tracking-widest font-bold">Location</span>
                 <span className="bold-display text-3xl">{business.location}</span>
               </div>
            )}
          </div>
        </motion.div>
        
        {business.bannerUrl && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 w-full aspect-[21/9] rounded-sm overflow-hidden relative border-2 border-zinc-800"
          >
            <img src={business.bannerUrl} alt="Hero Banner" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          </motion.div>
        )}
      </section>

      {/* Scrolling Marquee (Optional design element) */}
      <div className="w-full overflow-hidden bg-zinc-900 py-4 border-y-2 border-zinc-800 flex whitespace-nowrap">
         <div className="bold-display text-4xl text-zinc-600 tracking-widest flex items-center gap-8 animate-[spin_10s_linear_infinite] [animation:scroll_20s_linear_infinite]">
            <style>{`@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
            {[...Array(10)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                {business.name} <span style={{ color: brandColor }}>✦</span>
              </span>
            ))}
         </div>
      </div>

      {/* Products */}
      {products.length > 0 && (
        <section id="products" className="max-w-[1400px] mx-auto px-6 py-32">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <h3 className="bold-display text-6xl md:text-8xl text-white leading-none">THE DROPS.</h3>
              <div className="w-32 h-2 mt-4" style={{ backgroundColor: brandColor }} />
            </div>
            {business.marketingDesc && (
              <p className="bold-body text-zinc-400 max-w-sm text-lg font-medium border-l-2 border-zinc-800 pl-4">
                {business.marketingDesc}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={product.id} 
                className="group flex flex-col bg-zinc-900 border-2 border-zinc-800 hover:border-zinc-600 transition-colors duration-300"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-zinc-950 p-4">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-zinc-800 text-zinc-800 group-hover:text-zinc-600 group-hover:border-zinc-600 transition-colors">
                      <ShoppingCart className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-zinc-950 text-white bold-display text-4xl px-4 py-2 border-2 border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  {!product.inStock && (
                     <div className="absolute top-6 right-6 bg-red-600 text-white bold-display text-2xl px-4 py-1 rotate-3">
                       SOLD OUT
                     </div>
                  )}
                </div>

                <div className="p-6 md:p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <h4 className="bold-display text-4xl text-white uppercase leading-none">{product.name}</h4>
                  </div>
                  
                  {product.category && (
                    <span className="bold-body text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 block">
                      // {product.category}
                    </span>
                  )}

                  {product.description && (
                    <p className="bold-body text-zinc-400 text-base leading-relaxed mb-8 flex-grow line-clamp-3">{product.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-zinc-800">
                    <span className="bold-display text-4xl" style={{ color: brandColor }}>{formatPrice(product.price)}</span>
                    <a
                      href={getProductUrl(business.slug, product.id)}
                      className="bold-display text-2xl text-zinc-950 px-6 py-2 bg-white hover:bg-zinc-200 transition-colors flex items-center gap-2"
                    >
                      VIEW <ArrowUpRight className="w-5 h-5 mb-1" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* About / Story Section */}
      {(business.about || business.mission || business.vision) && (
        <section id="story" className="border-t-2 border-zinc-900 bg-zinc-950 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 pointer-events-none" style={{ backgroundColor: brandColor }} />
          
          <div className="max-w-[1400px] mx-auto px-6 py-32 grid lg:grid-cols-12 gap-16 lg:gap-8 relative z-10">
            <div className="lg:col-span-5">
              <h3 className="bold-display text-7xl md:text-8xl text-white mb-8">THE STORY.</h3>
              {business.about && (
                <p className="bold-body text-zinc-300 leading-relaxed text-xl mb-12">{business.about}</p>
              )}
              
              <div className="grid grid-cols-2 gap-8 border-t-2 border-zinc-900 pt-8">
                {business.location && (
                  <div>
                    <span className="bold-body text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Location</span>
                    <span className="bold-display text-3xl">{business.location}</span>
                  </div>
                )}
                {business.category && (
                  <div>
                    <span className="bold-body text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">Focus</span>
                    <span className="bold-display text-3xl">{business.category}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-12">
              {business.mission && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900 p-8 md:p-12 border-2 border-zinc-800 border-l-8 hover:border-zinc-700 transition-colors"
                  style={{ borderLeftColor: brandColor }}
                >
                  <h4 className="bold-display text-5xl mb-6">THE MISSION.</h4>
                  <p className="bold-body text-zinc-400 text-lg leading-relaxed">{business.mission}</p>
                </motion.div>
              )}
              
              {business.vision && (
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-zinc-900 p-8 md:p-12 border-2 border-zinc-800 border-l-8 hover:border-zinc-700 transition-colors"
                  style={{ borderLeftColor: brandColor }}
                >
                  <h4 className="bold-display text-5xl mb-6">THE VISION.</h4>
                  <p className="bold-body text-zinc-400 text-lg leading-relaxed">{business.vision}</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-zinc-900 bg-zinc-950">
        <div className="max-w-[1400px] mx-auto px-6 py-20 grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2">
            <h2 className="bold-display text-6xl mb-6 text-white">{business.name}</h2>
            <p className="bold-body text-zinc-400 max-w-md text-lg mb-8">
              {business.footerText || "Pushing boundaries and redefining the standard. Join the movement."}
            </p>
            <div className="flex gap-4">
              {business.instagramUrl && (
                <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-colors">
                  <Camera className="w-6 h-6" />
                </a>
              )}
              {business.facebookUrl && (
                <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </a>
              )}
              {business.websiteUrl && (
                <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-14 h-14 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center hover:bg-white hover:text-zinc-950 transition-colors">
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="bold-display text-3xl mb-8 tracking-widest text-zinc-500">CONTACT</h4>
            <ul className="space-y-6 bold-body text-lg text-white font-medium">
              {business.email && (
                <li>
                  <a href={`mailto:${business.email}`} className="flex items-center gap-4 hover:opacity-70 transition-opacity">
                    <Mail className="w-5 h-5 text-zinc-500" /> {business.email}
                  </a>
                </li>
              )}
              {business.phoneNumber && (
                <li>
                  <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-4 hover:opacity-70 transition-opacity">
                    <Phone className="w-5 h-5 text-zinc-500" /> {business.phoneNumber}
                  </a>
                </li>
              )}
              {business.location && (
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0 mt-1" /> {business.location}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-zinc-900">
          <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 bold-display text-2xl tracking-widest text-zinc-600">
            <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. ALL RIGHTS RESERVED.`}</p>
            <p>
              POWERED BY <a href="/" className="text-white hover:underline ml-2">DUKAANHAI</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
