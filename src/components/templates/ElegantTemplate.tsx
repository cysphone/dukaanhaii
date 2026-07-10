'use client';

import { formatPrice, getProductUrl } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Diamond, MapPin, Camera, MessageCircle, Globe, Mail, Phone, ArrowRight } from 'lucide-react';

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

export default function ElegantTemplate({ business, products }: TemplateProps) {
    const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
    const waLink = (productName?: string) =>
        `https://wa.me/${waNumber}?text=${encodeURIComponent(
            productName
                ? `Bonjour, I wish to inquire about "${productName}" from your collection.`
                : `Bonjour, I would love to explore the offerings at ${business.name}.`
        )}`;

    const accentColor = '#D4AF37'; // Gold

    return (
        <div className="min-h-screen bg-[#FDFBF7] text-[#2C2A29] font-serif selection:bg-[#E8DCC4]">
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Lato:wght@300;400;700&display=swap');
              .elegant-display { font-family: 'Playfair Display', serif; }
              .elegant-body { font-family: 'Lato', sans-serif; }
            `}</style>

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DCC4]/50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className="elegant-display text-2xl font-semibold tracking-wide text-[#2C2A29]">
                            {business.logoUrl ? <img src={business.logoUrl} alt={business.name} className="h-10 w-auto object-contain" /> : business.name}
                        </h1>
                        {business.tagline && (
                            <span className="elegant-body text-[10px] uppercase tracking-[0.3em] text-[#8B8682] mt-1 hidden sm:block">
                                {business.tagline}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="hidden md:flex gap-8 elegant-body text-xs tracking-widest uppercase text-[#8B8682]">
                            {products.length > 0 && <a href="#collection" className="hover:text-[#D4AF37] transition-colors">Collection</a>}
                            {business.about && <a href="#philosophy" className="hover:text-[#D4AF37] transition-colors">Philosophy</a>}
                            <a href="#inquiry" className="hover:text-[#D4AF37] transition-colors">Inquiry</a>
                        </div>
                        {waNumber && (
                            <a
                                href={waLink()} style={{ backgroundColor: business.primaryColor || '#2C2A29', color: business.secondaryColor || '#FDFBF7' }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="elegant-body text-xs tracking-[0.2em] uppercase px-6 py-3 hover:opacity-80 transition-opacity duration-300 shadow-sm"
                            >
                                {business.ctaText || 'Connect'}
                            </a>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 max-w-6xl mx-auto text-center min-h-[85vh] flex flex-col justify-center items-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="w-full"
                >
                    <span className="elegant-body text-xs tracking-[0.4em] uppercase mb-8 block" style={{ color: accentColor }}>
                        {business.category || 'Luxury Collection'}
                    </span>
                    <h2 className="elegant-display text-5xl md:text-7xl lg:text-8xl font-normal leading-tight text-[#2C2A29] mb-12 max-w-4xl mx-auto">
                        {business.headline || business.name}
                    </h2>
                    
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: 96 }} 
                      transition={{ duration: 1, delay: 0.5 }} 
                      className="w-px bg-[#D4AF37] mx-auto mb-12 opacity-60 origin-top"
                    />

                    {business.marketingDesc && (
                        <p className="elegant-display italic text-xl md:text-3xl text-[#6D6A66] max-w-3xl mx-auto leading-relaxed">
                            "{business.marketingDesc}"
                        </p>
                    )}
                </motion.div>
                
                {business.bannerUrl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="w-full mt-24 aspect-video rounded-sm overflow-hidden"
                  >
                    <img src={business.bannerUrl} alt="Hero" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                  </motion.div>
                )}
            </section>

            {/* Curated Collection */}
            {products.length > 0 && (
                <section id="collection" className="py-32 px-6 max-w-7xl mx-auto border-t border-[#E8DCC4]/50">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="flex flex-col md:flex-row justify-between items-end mb-24"
                    >
                        <div>
                            <h3 className="elegant-display text-4xl md:text-5xl text-[#2C2A29] mb-6">Curated Collection</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-px bg-[#D4AF37]"></div>
                                <span className="elegant-body text-xs tracking-[0.2em] uppercase text-[#8B8682]">
                                    Exquisite Selections
                                </span>
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 text-right">
                            <span className="elegant-display text-2xl italic text-[#8B8682]">{products.length} Pieces</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                        {products.map((product, index) => (
                            <motion.div 
                              initial={{ opacity: 0, y: 40 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              key={product.id} 
                              className="group block"
                            >
                                <a href={getProductUrl(business.slug, product.id)} className="block relative overflow-hidden mb-8 aspect-[3/4] bg-[#F5F2EA]">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Diamond className="w-12 h-12 text-[#D4AF37] opacity-20 stroke-[1]" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                      <span className="bg-white/90 text-[#2C2A29] elegant-body text-[10px] tracking-[0.2em] uppercase px-6 py-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        View Details
                                      </span>
                                    </div>
                                </a>

                                <div className="text-center px-4">
                                    <h4 className="elegant-display text-2xl text-[#2C2A29] mb-3 group-hover:text-[#D4AF37] transition-colors duration-500">
                                        {product.name}
                                    </h4>
                                    {product.category && (
                                      <span className="elegant-body text-[10px] tracking-[0.2em] uppercase text-[#8B8682] block mb-4">
                                        {product.category}
                                      </span>
                                    )}
                                    {product.description && (
                                        <p className="elegant-body text-sm text-[#8B8682] leading-relaxed mb-6 line-clamp-2 max-w-sm mx-auto">
                                            {product.description}
                                        </p>
                                    )}
                                    <div className="elegant-body tracking-wider text-[#2C2A29] mt-6">
                                        {formatPrice(product.price)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Philosophy (About/Mission/Vision) */}
            {(business.about || business.mission || business.vision) && (
                <section id="philosophy" className="py-32 px-6 bg-[#F5F2EA] border-y border-[#E8DCC4]">
                    <div className="max-w-6xl mx-auto">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          className="text-center mb-24"
                        >
                            <h3 className="elegant-display text-4xl text-[#2C2A29] mb-6">Our Philosophy</h3>
                            <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
                        </motion.div>

                        <div className="grid lg:grid-cols-12 gap-16 items-start">
                            {business.about && (
                                <motion.div 
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  className="lg:col-span-6"
                                >
                                    <span className="elegant-body text-xs tracking-[0.2em] uppercase text-[#D4AF37] mb-6 block">The Heritage</span>
                                    <p className="elegant-display text-3xl leading-relaxed text-[#2C2A29]">
                                        {business.about}
                                    </p>
                                </motion.div>
                            )}

                            <div className="lg:col-span-5 lg:col-start-8 space-y-16">
                                {business.mission && (
                                    <motion.div 
                                      initial={{ opacity: 0, x: 20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                    >
                                        <span className="elegant-body text-xs tracking-[0.2em] uppercase text-[#8B8682] mb-4 block border-b border-[#E8DCC4] pb-3">The Mission</span>
                                        <p className="elegant-body text-base leading-loose text-[#6D6A66]">
                                            {business.mission}
                                        </p>
                                    </motion.div>
                                )}
                                {business.vision && (
                                    <motion.div 
                                      initial={{ opacity: 0, x: 20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.2 }}
                                    >
                                        <span className="elegant-body text-xs tracking-[0.2em] uppercase text-[#8B8682] mb-4 block border-b border-[#E8DCC4] pb-3">The Vision</span>
                                        <p className="elegant-body text-base leading-loose text-[#6D6A66]">
                                            {business.vision}
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Inquiry / Contact Footer */}
            <footer id="inquiry" className="bg-[#2C2A29] text-[#FDFBF7] pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 lg:gap-32">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                        <span className="elegant-body text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6 block">Personal Service</span>
                        <h3 className="elegant-display text-5xl md:text-6xl mb-12 font-light">Submit an Inquiry</h3>
                        
                        <div className="space-y-8 elegant-body mt-16 text-[#B4ADA5]">
                          {business.email && (
                            <a href={`mailto:${business.email}`} className="flex items-center gap-6 hover:text-[#D4AF37] transition-colors group">
                              <span className="w-12 h-12 rounded-full border border-[#4A4846] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                                <Mail className="w-4 h-4" />
                              </span>
                              <span className="tracking-widest uppercase text-xs">{business.email}</span>
                            </a>
                          )}
                          {business.phoneNumber && (
                            <a href={`tel:${business.phoneNumber}`} className="flex items-center gap-6 hover:text-[#D4AF37] transition-colors group">
                              <span className="w-12 h-12 rounded-full border border-[#4A4846] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                                <Phone className="w-4 h-4" />
                              </span>
                              <span className="tracking-widest uppercase text-xs">{business.phoneNumber}</span>
                            </a>
                          )}
                          {business.location && (
                            <div className="flex items-center gap-6 group">
                              <span className="w-12 h-12 rounded-full border border-[#4A4846] flex items-center justify-center">
                                <MapPin className="w-4 h-4" />
                              </span>
                              <span className="tracking-widest uppercase text-xs max-w-xs leading-relaxed">{business.location}</span>
                            </div>
                          )}
                        </div>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-[#363332] p-10 md:p-16 rounded-sm"
                    >
                      <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); alert("Your inquiry has been received with thanks."); }}>
                          <div className="space-y-2 relative">
                              <input type="text" required id="name" className="elegant-body w-full bg-transparent border-b border-[#5A5856] py-3 text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent" placeholder="Name" />
                              <label htmlFor="name" className="elegant-body absolute left-0 -top-3.5 text-[#8B8682] text-xs uppercase tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs transition-all pointer-events-none">Full Name</label>
                          </div>
                          <div className="space-y-2 relative pt-4">
                              <input type="email" required id="email" className="elegant-body w-full bg-transparent border-b border-[#5A5856] py-3 text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] transition-colors peer placeholder-transparent" placeholder="Email" />
                              <label htmlFor="email" className="elegant-body absolute left-0 0 text-[#8B8682] text-xs uppercase tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:top-7 peer-focus:top-0 peer-focus:text-xs transition-all pointer-events-none">Email Address</label>
                          </div>
                          <div className="space-y-2 relative pt-6">
                              <textarea required id="message" rows={4} className="elegant-body w-full bg-transparent border-b border-[#5A5856] py-3 text-[#FDFBF7] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none peer placeholder-transparent" placeholder="Message"></textarea>
                              <label htmlFor="message" className="elegant-body absolute left-0 top-1 text-[#8B8682] text-xs uppercase tracking-widest peer-placeholder-shown:text-base peer-placeholder-shown:top-9 peer-focus:top-1 peer-focus:text-xs transition-all pointer-events-none">Your Message</label>
                          </div>
                          <div className="pt-8">
                              <button type="submit" className="elegant-body text-xs tracking-[0.2em] uppercase bg-[#D4AF37] text-white px-12 py-5 hover:bg-[#FDFBF7] hover:text-[#2C2A29] transition-colors duration-500 w-full flex items-center justify-center gap-4">
                                  Send Inquiry <ArrowRight className="w-4 h-4" />
                              </button>
                          </div>
                      </form>
                    </motion.div>
                </div>
                
                <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-[#4A4846] flex flex-col md:flex-row justify-between items-center gap-8 elegant-body text-[#8B8682] text-[10px] tracking-widest uppercase">
                  <div className="flex gap-6">
                    {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">Camera</a>}
                    {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">MessageCircle</a>}
                    {business.websiteUrl && <a href={business.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">Website</a>}
                  </div>
                  
                  <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}</p>
                  
                  <p>
                      Powered by <a href="/" className="text-[#D4AF37] hover:text-[#FDFBF7] transition-colors">DukaanHai</a>
                  </p>
                </div>
            </footer>
        </div >
    );
}
