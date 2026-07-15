import React from 'react';
import Link from 'next/link';

export function StoreHeader({ business, template }: { business: any, template: any }) {
  const pages = template.pages || [];
  if (pages.length <= 1) return null; // No need for nav if only 1 page

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--color-background)]/80 border-b border-black/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/store/${business.slug}`} className="flex items-center gap-3">
          {business.logoUrl && (
            <img src={business.logoUrl} alt={business.name} className="h-10 w-auto rounded-md object-contain" />
          )}
          <span className="font-bold text-xl tracking-tight text-[var(--color-primary)]">
            {business.name || 'Store'}
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm">
          {pages.map((p: any) => (
            <Link 
              key={p.id} 
              href={p.path === '/' ? `/store/${business.slug}` : `/store/${business.slug}${p.path}`}
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              {p.name}
            </Link>
          ))}
        </nav>
        {/* Mobile menu could go here */}
        <div className="md:hidden text-2xl">☰</div>
      </div>
    </header>
  );
}
