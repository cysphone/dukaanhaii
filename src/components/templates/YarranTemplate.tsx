'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface YarranTemplateProps {
  business: any;
  products: any[];
}

export default function YarranTemplate({ business, products }: YarranTemplateProps) {
  const companyName = business.name || 'Yarran';
  const tagline = business.tagline || 'Strong. Through it all.';
  const heroDescription = business.headline || 'We bring technical excellence and human judgment to every risk.';
  
  const aboutTitle = business.vision || 'Demand Excellence.';
  const aboutDescription = business.about || 'Built on the belief that algorithms can\'t replace experience. We are here to partner with you for the long term.';

  const features = [
    { title: 'Experience in depth', description: 'Our underwriters bring decades of specialized knowledge.' },
    { title: 'First Class Service', description: 'Direct access to decision makers when you need them most.' },
    { title: 'Flexible Solutions', description: 'Tailored coverage designed around your unique risks.' }
  ];

  const promiseList = [
    'Technical strength',
    'Service reliability',
    'Long-term commitment',
    'Full-service support'
  ];

  const contactEmail = business.email || 'hello@example.com';
  const contactPhone = business.phoneNumber || business.whatsappNumber || '';

  // Theme Constants
  const colors = {
    bg: '#F9F8F6',
    text: '#0E1111',
    accent: '#496F36', // Yarran Forest Green
    footerBg: '#0E1111',
    footerText: '#F9F8F6'
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text }} className="min-h-screen font-sans selection:bg-[#496F36] selection:text-white">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full transition-all duration-300" style={{ backgroundColor: `${colors.bg}FA`, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-[1312px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="#" className="text-2xl font-bold tracking-tight">{companyName}</Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Home</Link>
              <Link href="#about" className="text-sm font-medium hover:opacity-70 transition-opacity">About Us</Link>
              <Link href="#services" className="text-sm font-medium hover:opacity-70 transition-opacity">Products</Link>
            </nav>
          </div>
          <Link 
            href="#contact" 
            style={{ backgroundColor: colors.text, color: colors.bg }}
            className="px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Contact
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-32 md:pt-32 md:pb-48 px-6 md:px-12 max-w-[1312px] mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(54px,8vw,88px)] leading-[1.05] font-bold tracking-tight mb-8">
              {tagline}{tagline.endsWith('.') ? '' : '.'}
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mb-12 opacity-90">
              {heroDescription}
            </p>
            <Link 
              href="#services" 
              style={{ backgroundColor: colors.accent, color: 'white' }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-medium hover:opacity-90 transition-opacity group"
            >
              Discover our products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* About / Intro Section */}
        <section id="about" className="py-24 px-6 md:px-12 max-w-[1312px] mx-auto border-t border-black/10">
          <div className="grid md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-5">
              <h2 className="text-[clamp(44px,6vw,60px)] leading-[1.1] font-bold tracking-tight">
                {aboutTitle}{aboutTitle.endsWith('.') ? '' : '.'}
              </h2>
            </div>
            <div className="md:col-span-7 flex flex-col items-start justify-center">
              <p className="text-lg md:text-xl leading-relaxed mb-8">
                {aboutDescription}
              </p>
              <Link href="#contact" className="text-lg font-semibold underline underline-offset-8 decoration-2 hover:text-[#496F36] transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Features / Services Section */}
        <section id="services" className="py-24 px-6 md:px-12 max-w-[1312px] mx-auto border-t border-black/10">
          <h2 className="text-[clamp(44px,6vw,60px)] leading-[1.1] font-bold tracking-tight mb-16">
            Solid.
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature: any, index: number) => (
              <div key={index} className="flex flex-col gap-4">
                <div style={{ backgroundColor: colors.text }} className="w-12 h-1 mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                <p className="text-lg leading-relaxed opacity-80">{feature.description}</p>
              </div>
            ))}
          </div>

          {products && products.length > 0 && (
            <div className="mt-24">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">Our Offerings</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="p-8 rounded-3xl bg-white border border-black/5 flex flex-col gap-4">
                    {product.imageUrl && (
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      </div>
                    )}
                    <h4 className="text-xl font-bold">{product.name}</h4>
                    {product.description && <p className="opacity-80 text-base">{product.description}</p>}
                    <span className="font-semibold text-lg mt-auto">
                      {product.price === 0 ? 'Contact for pricing' : `₹${product.price.toLocaleString()}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Promise Section */}
        <section className="py-24 px-6 md:px-12 max-w-[1312px] mx-auto border-t border-black/10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(36px,5vw,48px)] leading-[1.1] font-bold tracking-tight mb-12">
                The {companyName} promise
              </h2>
              <div className="flex flex-col gap-6">
                {promiseList.map((promise: string, i: number) => (
                  <div key={i} className="flex items-center gap-4 text-xl md:text-2xl font-medium">
                    <CheckCircle2 style={{ color: colors.accent }} className="w-8 h-8 flex-shrink-0" />
                    <span>{promise}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-black/5 flex items-center justify-center">
              {business.bannerUrl ? (
                <Image src={business.bannerUrl} alt="Decorative" fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#496F36]/20 to-transparent" />
              )}
            </div>
          </div>
        </section>

        {/* Dark Footer CTA */}
        <section id="contact" style={{ backgroundColor: colors.footerBg, color: colors.footerText }} className="py-32 px-6 md:px-12">
          <div className="max-w-[1312px] mx-auto text-center flex flex-col items-center">
            <h2 className="text-[clamp(54px,8vw,88px)] leading-[1.05] font-bold tracking-tight mb-12">
              There. When you need support.
            </h2>
            <Link 
              href={contactPhone ? `https://wa.me/${contactPhone.replace(/\D/g, '')}` : `mailto:${contactEmail}`}
              style={{ backgroundColor: colors.footerText, color: colors.footerBg }}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform"
            >
              Let's start a conversation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Links */}
      <footer style={{ backgroundColor: colors.footerBg, color: colors.footerText }} className="px-6 md:px-12 pb-12 pt-12 border-t border-white/10">
        <div className="max-w-[1312px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold tracking-tight mb-6">{companyName}</h3>
            <p className="opacity-60 text-sm max-w-xs leading-relaxed">
              Bringing technical excellence and human judgment to every risk.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-6">About Us</h4>
            <ul className="flex flex-col gap-4 opacity-70">
              <li><Link href="#about" className="hover:opacity-100 transition-opacity">Our Story</Link></li>
              <li><Link href="#contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Products</h4>
            <ul className="flex flex-col gap-4 opacity-70">
              <li><Link href="#services" className="hover:opacity-100 transition-opacity">All Offerings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-6">Legal</h4>
            <ul className="flex flex-col gap-4 opacity-70">
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Privacy Notice</Link></li>
              <li><Link href="#" className="hover:opacity-100 transition-opacity">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1312px] mx-auto flex flex-col md:flex-row items-center justify-between opacity-50 text-sm pt-8 border-t border-white/10">
          <p>© {new Date().getFullYear()} {companyName}. All rights reserved.</p>
          <p className="mt-4 md:mt-0 max-w-2xl text-xs md:text-right">
            {companyName} is a trading name registered in the United Kingdom. Regulated by the relevant financial authorities.
          </p>
        </div>
      </footer>

    </div>
  );
}
