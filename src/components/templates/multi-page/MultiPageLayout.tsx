'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TemplateDef } from '@/lib/templates';
import { useEffect, useState } from 'react';

export default function MultiPageLayout({
  children,
  business,
  template,
}: {
  children: React.ReactNode;
  business: any;
  template: TemplateDef;
}) {
  const pathname = usePathname();
  const isAbout = pathname.endsWith('/about');
  const isShop = pathname.endsWith('/shop');
  const isContact = pathname.endsWith('/contact');
  const isHome = !isAbout && !isShop && !isContact && !pathname.includes('/product/');

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLegacyHome = isHome && !template.id.startsWith('niche-');

  if (isLegacyHome) {
    return <>{children}</>;
  }

  const themeVars = {
    '--theme-primary': template.colors[1],
    '--theme-secondary': template.colors[2],
    '--theme-bg': template.colors[0],
  } as React.CSSProperties;

  const getLinkClass = (active: boolean) => 
    `text-sm font-semibold transition-colors ${active ? 'text-surface-900 border-b-2 border-[var(--theme-primary)]' : 'text-surface-500 hover:text-[var(--theme-primary)]'}`;

  if (!mounted) return null;

  return (
    <div style={themeVars} className="min-h-screen bg-[var(--theme-bg)] font-sans selection:bg-[var(--theme-primary)] selection:text-white flex flex-col">
      {/* Top Banner if enabled */}
      {business.templateConfig?.topBar?.text && business.templateConfig.topBar.text !== 'SKIPPED' && (
        <div className="w-full bg-[var(--theme-primary)] text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
          {business.templateConfig.topBar.text}
        </div>
      )}

      {/* Main Navigation */}
      <nav className="sticky top-0 z-50 bg-[var(--theme-bg)]/80 backdrop-blur-md border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center">
              <Link href={`/`} className="flex items-center gap-3">
                {business.logoUrl ? (
                  <img src={business.logoUrl} alt={business.name} className="h-10 w-auto rounded" />
                ) : (
                  <div className="h-10 w-10 bg-[var(--theme-primary)] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {business.name.charAt(0)}
                  </div>
                )}
                <span className="font-bold text-xl text-surface-900 tracking-tight hidden sm:block">{business.name}</span>
              </Link>
            </div>

            {/* Nav Links */}
            <div className="flex gap-6 sm:gap-8 items-center">
              <Link href={`/`} className={getLinkClass(isHome)}>Home</Link>
              <Link href={`/about`} className={getLinkClass(isAbout)}>About</Link>
              <Link href={`/shop`} className={getLinkClass(isShop)}>Shop</Link>
              <Link href={`/contact`} className={getLinkClass(isContact)}>Contact</Link>
              {business.whatsappNumber && (
                <a
                  href={`https://wa.me/${business.whatsappNumber.replace('+', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-block px-5 py-2 bg-[var(--theme-primary)] text-white rounded-full text-sm font-bold shadow-md hover:opacity-90 transition-opacity"
                >
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{business.name}</h3>
            <p className="text-sm">{business.description || business.tagline}</p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href={`/`} className="hover:text-white transition-colors">Home</Link>
              <Link href={`/shop`} className="hover:text-white transition-colors">Shop</Link>
              <Link href={`/about`} className="hover:text-white transition-colors">About Us</Link>
              <Link href={`/contact`} className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-sm">
              {business.email && <p>📧 {business.email}</p>}
              {business.phoneNumber && <p>📞 {business.phoneNumber}</p>}
              {business.location && <p>📍 {business.location}</p>}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-surface-800 text-sm text-center">
          {business.copyrightText || `© ${new Date().getFullYear()} ${business.name}. All rights reserved.`}
        </div>
      </footer>
    </div>
  );
}
