import React from 'react';
import Link from 'next/link';

export function StoreHeader({ business, template }: { business: any, template: any }) {
  const pages = template.pages || [];
  if (pages.length <= 1) return null; // No need for nav if only 1 page

  return (
    <header className="sticky top-4 z-50 w-full max-w-7xl mx-auto px-4 md:px-8 mt-4 transition-all duration-300">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-2xl flex items-center justify-between h-16 md:h-20 px-6 transition-all duration-300">
        <Link href={`/store/${business.slug}`} className="flex items-center gap-3 group">
          {business.logoUrl ? (
            <img src={business.logoUrl} alt={business.name} className="h-10 w-auto rounded-lg object-contain group-hover:scale-105 transition-transform" />
          ) : (
            <div className="h-10 w-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-bold text-white text-lg">{business.name?.charAt(0) || 'S'}</span>
            </div>
          )}
          <span className="font-extrabold text-xl tracking-tight text-[var(--color-primary)] group-hover:opacity-80 transition-opacity">
            {business.name || 'Store'}
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 font-semibold text-sm">
          {pages.map((p: any) => (
            <Link 
              key={p.id} 
              href={p.path === '/' ? `/store/${business.slug}` : `/store/${business.slug}${p.path}`}
              className="px-4 py-2 rounded-full hover:bg-white/10 text-[var(--color-primary)] hover:text-white transition-all duration-200 relative group"
            >
              {p.name}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-secondary)] transition-all duration-300 group-hover:w-1/2 rounded-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
           {/* Placeholder for Cart / CTA */}
           <Link href={`/store/${business.slug}/contact`} className="px-6 py-2.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-full hover:shadow-[0_0_20px_rgba(var(--color-primary),0.4)] hover:scale-105 transition-all duration-300">
              Contact Us
           </Link>
        </div>

        <div className="md:hidden text-2xl text-[var(--color-primary)] cursor-pointer hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
    </header>
  );
}
