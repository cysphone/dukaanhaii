import React from 'react';

export function StoreFooter({ business }: { business: any }) {
  return (
    <footer className="w-full bg-black text-white/70 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">{business.name || 'Store'}</h3>
          <p className="text-sm max-w-sm leading-relaxed">
            {business.description || 'Dedicated to providing the best products and services.'}
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            {business.location && <li>📍 {business.location}</li>}
            {business.phoneNumber && <li>📞 {business.phoneNumber}</li>}
            {business.email && <li>✉️ {business.email}</li>}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide uppercase text-xs">Follow Us</h4>
          <div className="flex gap-4">
            {business.instagramUrl && <a href={business.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>}
            {business.facebookUrl && <a href={business.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>}
            {!business.instagramUrl && !business.facebookUrl && <span>@socials</span>}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-xs flex justify-between">
        <p>{business.copyrightText || `© ${new Date().getFullYear()} ${business.name || 'Store'}. All rights reserved.`}</p>
        <p>Powered by DukaanHai</p>
      </div>
    </footer>
  );
}
