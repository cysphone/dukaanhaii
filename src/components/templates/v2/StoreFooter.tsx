import React from 'react';
import Link from 'next/link';

export function StoreFooter({ business }: { business: any }) {
  return (
    <footer className="w-full bg-[var(--color-background)] border-t border-[var(--color-primary)]/10 pt-24 pb-12 mt-auto relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 rounded-[100%] blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 relative z-10">
        <div className="md:col-span-2">
          <Link href={`/store/${business.slug}`} className="inline-block mb-6">
            {business.logoUrl ? (
              <img src={business.logoUrl} alt={business.name} className="h-12 w-auto object-contain" />
            ) : (
              <span className="font-black text-3xl tracking-tight text-[var(--color-primary)]">
                {business.name || 'Store'}
              </span>
            )}
          </Link>
          <p className="text-[var(--color-primary)]/60 text-lg max-w-sm leading-relaxed mb-8">
            {business.description || 'Dedicated to providing the best products and services with uncompromising quality.'}
          </p>
          <div className="flex gap-4">
            {business.instagramUrl && (
              <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                IG
              </a>
            )}
            {business.facebookUrl && (
              <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300">
                FB
              </a>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="text-[var(--color-primary)] font-bold mb-6 tracking-wide text-sm uppercase">Quick Links</h4>
          <ul className="space-y-4 text-[var(--color-primary)]/70 font-medium">
            <li><Link href={`/store/${business.slug}`} className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
            <li><Link href={`/store/${business.slug}/about`} className="hover:text-[var(--color-primary)] transition-colors">About Us</Link></li>
            <li><Link href={`/store/${business.slug}/shop`} className="hover:text-[var(--color-primary)] transition-colors">Shop</Link></li>
            <li><Link href={`/store/${business.slug}/contact`} className="hover:text-[var(--color-primary)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[var(--color-primary)] font-bold mb-6 tracking-wide text-sm uppercase">Contact Us</h4>
          <ul className="space-y-4 text-[var(--color-primary)]/70 font-medium text-sm">
            {business.location && <li className="flex items-start gap-3"><span className="text-[var(--color-secondary)]">📍</span> <span>{business.location}</span></li>}
            {business.phoneNumber && <li className="flex items-start gap-3"><span className="text-[var(--color-secondary)]">📞</span> <span>{business.phoneNumber}</span></li>}
            {business.email && <li className="flex items-start gap-3"><span className="text-[var(--color-secondary)]">✉️</span> <span>{business.email}</span></li>}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-[var(--color-primary)]/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-[var(--color-primary)]/40 text-sm font-medium">
          {business.copyrightText || `© ${new Date().getFullYear()} ${business.name || 'Store'}. All rights reserved.`}
        </p>
        <p className="text-[var(--color-primary)]/40 text-sm font-medium flex items-center gap-2">
          Powered by <span className="text-[var(--color-primary)] font-bold">DukaanHai</span>
        </p>
      </div>
    </footer>
  );
}
