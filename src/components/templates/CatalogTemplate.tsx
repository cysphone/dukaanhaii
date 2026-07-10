'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, MapPin, Search, ChevronRight, MessageCircle, Star, Heart, Camera, Globe, Target } from 'lucide-react';
import { useState } from 'react';

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

export default function CatalogTemplate({ business, products }: TemplateProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName?: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(
      productName
        ? `Hi ${business.name}! I'd like to order "${productName}". Please share more details.`
        : `Hi ${business.name}! I'd like to know more about your products.`
    )}`;

  const [activeTab, setActiveTab] = useState('products');
  const accentColor = business.primaryColor || '#10b981'; // emerald-500

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center items-start pt-0 sm:pt-10 pb-0 sm:pb-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        .cat-font { font-family: 'Nunito', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="cat-font w-full max-w-md bg-white min-h-screen sm:min-h-[850px] sm:h-[850px] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border-[8px] border-white ring-1 ring-zinc-200">
        
        {/* Dynamic Header */}
        <div 
          className="relative px-6 pt-12 pb-8 shrink-0 overflow-hidden rounded-b-[2rem] z-10"
          style={{ 
            background: `linear-gradient(135deg, ${accentColor} 0%, ${business.secondaryColor || '#047857'} 100%)` 
          }}
        >
          {/* Abstract background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
          
          {business.bannerUrl && (
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none">
               <img src={business.bannerUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="relative z-10 text-white">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {business.logoUrl ? (
                   <img src={business.logoUrl} alt={business.name} className="w-10 h-10 object-contain drop-shadow-md" />
                ) : (
                   <ShoppingBag className="w-8 h-8 text-white drop-shadow-md" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-black leading-none drop-shadow-sm truncate">{business.name}</h1>
                <div className="flex items-center gap-2 mt-1.5 opacity-90">
                  <span className="bg-black/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm">
                    {business.category || 'Store'}
                  </span>
                  {business.location && (
                    <span className="text-xs font-semibold flex items-center truncate">
                      <MapPin className="w-3 h-3 mr-1" /> {business.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {business.headline && (
                <h2 className="text-[1.35rem] font-extrabold leading-tight mb-2 drop-shadow-md">{business.headline}</h2>
              )}
              {business.tagline && (
                <p className="text-white/80 text-sm font-semibold leading-relaxed">{business.tagline}</p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 flex gap-4 shrink-0 overflow-x-auto hide-scrollbar z-20 -mt-6">
           <button 
             onClick={() => setActiveTab('products')}
             className={`px-6 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 shrink-0 ${activeTab === 'products' ? 'bg-white text-zinc-900 scale-100' : 'bg-white/90 text-zinc-500 scale-95 hover:bg-white backdrop-blur-md'}`}
           >
             <ShoppingBag className="w-4 h-4" /> Products
           </button>
           <button 
             onClick={() => setActiveTab('about')}
             className={`px-6 py-3 rounded-2xl text-sm font-bold shadow-lg transition-all flex items-center gap-2 shrink-0 ${activeTab === 'about' ? 'bg-white text-zinc-900 scale-100' : 'bg-white/90 text-zinc-500 scale-95 hover:bg-white backdrop-blur-md'}`}
           >
             <Star className="w-4 h-4" /> About Us
           </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-32">
          <AnimatePresence mode="wait">
            
            {/* Products Tab */}
            {activeTab === 'products' && (
              <motion.div 
                key="products"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 pt-2"
              >
                {products.length === 0 ? (
                  <div className="text-center py-20 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-200">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                       <ShoppingBag className="w-10 h-10 text-zinc-300" />
                    </div>
                    <p className="text-zinc-500 font-bold mb-2">Inventory Empty</p>
                    <p className="text-zinc-400 text-sm px-8">Products are being updated. Check back soon!</p>
                  </div>
                ) : (
                  products.map((product, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={product.id} 
                      className="bg-white rounded-3xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-zinc-100 flex gap-4 group hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all cursor-pointer relative"
                    >
                      {/* Image */}
                      <div className="w-28 h-28 shrink-0 bg-zinc-100 rounded-2xl overflow-hidden relative">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ShoppingBag className="w-8 h-8 text-zinc-300" />
                          </div>
                        )}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                             <span className="bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md">Sold Out</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-center py-1 pr-2 min-w-0">
                        {product.category && (
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1 block truncate">
                            {product.category}
                          </span>
                        )}
                        <h4 className="font-extrabold text-zinc-900 text-[15px] leading-tight mb-1.5 truncate">{product.name}</h4>
                        {product.description && (
                          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mb-3">{product.description}</p>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-black text-lg" style={{ color: accentColor }}>{formatPrice(product.price)}</span>
                          <a
                            href={getProductUrl(business.slug, product.id)}
                            className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <motion.div 
                key="about"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 pt-2"
              >
                {business.marketingDesc && (
                  <div className="p-[3px] rounded-[2rem] bg-gradient-to-br from-zinc-200 to-zinc-100">
                    <div className="bg-white rounded-[1.85rem] p-6 text-center shadow-inner">
                      <p className="text-zinc-800 text-lg font-bold italic leading-relaxed">
                        "{business.marketingDesc}"
                      </p>
                    </div>
                  </div>
                )}

                {business.about && (
                  <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
                    <h4 className="font-black text-zinc-900 mb-3 text-lg flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">👋</div>
                      Our Story
                    </h4>
                    <p className="text-zinc-600 text-sm leading-loose font-medium">{business.about}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {business.mission && (
                    <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-100">
                      <h4 className="font-black text-zinc-900 mb-2 text-base flex items-center gap-2">
                        <Target className="w-4 h-4 text-rose-500" /> Mission
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed font-medium">{business.mission}</p>
                    </div>
                  )}

                  {business.vision && (
                    <div className="bg-zinc-50 rounded-3xl p-5 border border-zinc-100">
                      <h4 className="font-black text-zinc-900 mb-2 text-base flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" /> Vision
                      </h4>
                      <p className="text-zinc-600 text-xs leading-relaxed font-medium">{business.vision}</p>
                    </div>
                  )}
                </div>

                {/* Socials & Contact */}
                <div className="bg-zinc-900 text-white rounded-3xl p-6 shadow-xl">
                   <h4 className="font-black text-lg mb-4 text-center">Connect With Us</h4>
                   <div className="flex justify-center gap-4 mb-6">
                     {business.instagramUrl && (
                       <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors">
                         <Camera className="w-5 h-5" />
                       </a>
                     )}
                     {business.facebookUrl && (
                       <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors">
                         <MessageCircle className="w-5 h-5" />
                       </a>
                     )}
                     {business.websiteUrl && (
                       <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-zinc-900 transition-colors">
                         <Globe className="w-5 h-5" />
                       </a>
                     )}
                   </div>
                   
                   <div className="space-y-3 text-sm font-medium text-zinc-300 bg-black/20 rounded-2xl p-4">
                     {business.email && <div className="flex items-center gap-3"><span className="opacity-50">Email:</span> <a href={`mailto:${business.email}`} className="text-white">{business.email}</a></div>}
                     {business.phoneNumber && <div className="flex items-center gap-3"><span className="opacity-50">Phone:</span> <a href={`tel:${business.phoneNumber}`} className="text-white">{business.phoneNumber}</a></div>}
                   </div>
                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-zinc-100 pb-6 pt-4 px-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-b-[2.5rem]">
          {waNumber ? (
            <a
              href={waLink()} 
              style={{ backgroundColor: accentColor }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 text-white font-black py-4 rounded-[1.25rem] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-transform text-[15px]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          ) : (
            <div className="text-center">
               <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Powered By</p>
               <a href="/" className="font-black text-zinc-900 text-lg hover:opacity-70 transition-opacity">DukaanHai</a>
            </div>
          )}
          
          {waNumber && (
            <div className="text-center mt-3">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Powered by <a href="/" className="text-zinc-800">DukaanHai</a>
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
