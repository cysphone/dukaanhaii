const fs = require('fs');
const path = require('path');

const templates = [
  { id: 'minimal', name: 'MinimalProductTemplate', bg: 'bg-white', text: 'text-zinc-900', accent: 'brand-600', font: 'font-sans', style: 'clean' },
  { id: 'bold', name: 'BoldProductTemplate', bg: 'bg-yellow-400', text: 'text-black', accent: 'black', font: 'font-mono', style: 'brutal' },
  { id: 'catalog', name: 'CatalogProductTemplate', bg: 'bg-zinc-50', text: 'text-zinc-800', accent: 'blue-600', font: 'font-sans', style: 'grid' },
  { id: 'elegant', name: 'ElegantProductTemplate', bg: 'bg-zinc-900', text: 'text-zinc-50', accent: 'amber-400', font: 'font-serif', style: 'luxury' },
  { id: 'futuristic', name: 'FuturisticProductTemplate', bg: 'bg-black', text: 'text-cyan-50', accent: 'cyan-400', font: 'font-sans', style: 'neon' },
  { id: 'playful', name: 'PlayfulProductTemplate', bg: 'bg-pink-50', text: 'text-purple-900', accent: 'pink-500', font: 'font-sans', style: 'rounded' },
  
  // E-commerce
  { id: 'ecommerce-clothing-chic', name: 'EcommerceClothingChicProductTemplate', bg: 'bg-stone-50', text: 'text-stone-900', accent: 'stone-800', font: 'font-serif', style: 'chic' },
  { id: 'ecommerce-clothing-street', name: 'EcommerceClothingStreetProductTemplate', bg: 'bg-zinc-950', text: 'text-zinc-100', accent: 'red-600', font: 'font-mono', style: 'brutal' },
  { id: 'ecommerce-tech-cyber', name: 'EcommerceTechCyberProductTemplate', bg: 'bg-[#0f172a]', text: 'text-cyan-50', accent: 'cyan-500', font: 'font-mono', style: 'neon' },
  { id: 'ecommerce-tech-gadget', name: 'EcommerceTechGadgetProductTemplate', bg: 'bg-slate-50', text: 'text-slate-900', accent: 'blue-600', font: 'font-sans', style: 'clean' },
  { id: 'ecommerce-food-fresh', name: 'EcommerceFoodFreshProductTemplate', bg: 'bg-green-50', text: 'text-green-950', accent: 'green-600', font: 'font-sans', style: 'rounded' },
  { id: 'ecommerce-food-menu', name: 'EcommerceFoodMenuProductTemplate', bg: 'bg-orange-50', text: 'text-orange-950', accent: 'orange-600', font: 'font-serif', style: 'warm' },

  // Gym & Fitness
  { id: 'gym-modern', name: 'GymModernProductTemplate', bg: 'bg-zinc-900', text: 'text-white', accent: 'red-500', font: 'font-sans', style: 'bold' },
  { id: 'gym-power', name: 'GymPowerProductTemplate', bg: 'bg-black', text: 'text-yellow-400', accent: 'yellow-500', font: 'font-mono', style: 'brutal' },
  { id: 'gym-zen', name: 'GymZenProductTemplate', bg: 'bg-stone-100', text: 'text-stone-800', accent: 'emerald-600', font: 'font-sans', style: 'clean' },

  // Hotels & Real Estate
  { id: 'hotel-luxury', name: 'HotelLuxuryProductTemplate', bg: 'bg-zinc-900', text: 'text-amber-50', accent: 'amber-500', font: 'font-serif', style: 'luxury' },
  { id: 'hotel-boutique', name: 'HotelBoutiqueProductTemplate', bg: 'bg-rose-50', text: 'text-rose-950', accent: 'rose-600', font: 'font-serif', style: 'chic' },
  { id: 'hotel-resort', name: 'HotelResortProductTemplate', bg: 'bg-cyan-50', text: 'text-cyan-950', accent: 'cyan-600', font: 'font-sans', style: 'clean' },

  // General Services & Portfolios
  { id: 'portfolio-creative', name: 'PortfolioCreativeProductTemplate', bg: 'bg-purple-900', text: 'text-white', accent: 'fuchsia-400', font: 'font-sans', style: 'playful' },
  { id: 'service-modern', name: 'ServiceModernProductTemplate', bg: 'bg-slate-900', text: 'text-slate-50', accent: 'blue-500', font: 'font-sans', style: 'clean' },
];

function generateComponent(t) {
  const isDark = ['bg-zinc-900', 'bg-black', 'bg-zinc-950', 'bg-[#0f172a]', 'bg-slate-900', 'bg-purple-900'].includes(t.bg);
  const cardBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const border = isDark ? 'border-white/10' : 'border-black/10';
  const shadow = isDark ? 'shadow-black/50' : 'shadow-xl';
  const hoverCardBg = isDark ? 'hover:bg-white/10' : 'hover:bg-black/10';

  let imageContainerStyles = 'aspect-square relative overflow-hidden';
  if (t.style === 'rounded' || t.style === 'playful') imageContainerStyles += ' rounded-[3rem] shadow-2xl';
  else if (t.style === 'clean' || t.style === 'chic') imageContainerStyles += ' rounded-2xl shadow-xl';
  else if (t.style === 'brutal') imageContainerStyles += ' border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]';
  else if (t.style === 'neon') imageContainerStyles += ` rounded-xl border border-${t.accent} shadow-[0_0_30px_rgba(var(--${t.accent}-rgb),0.3)]`;
  else imageContainerStyles += ' rounded-xl shadow-lg';

  let btnStyles = 'block w-full text-center text-lg font-bold py-4 transition-all flex items-center justify-center gap-2';
  if (t.style === 'brutal') btnStyles += ` bg-${t.accent} text-${t.bg.replace('bg-', '')} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none`;
  else if (t.style === 'neon') btnStyles += ` bg-black text-${t.accent} border border-${t.accent} hover:shadow-[0_0_20px_rgba(var(--${t.accent}-rgb),0.5)] hover:bg-${t.accent}/10 rounded-xl`;
  else if (t.style === 'luxury') btnStyles += ` bg-transparent text-${t.accent} border border-${t.accent} hover:bg-${t.accent} hover:text-black rounded-sm uppercase tracking-widest`;
  else btnStyles += ` bg-${t.accent} hover:bg-${t.accent}/90 text-white rounded-xl shadow-lg shadow-${t.accent}/20 hover:-translate-y-1`;

  let outOfStockBtn = 'block w-full text-center text-lg font-bold py-4 rounded-xl cursor-not-allowed bg-zinc-300 text-zinc-500';
  if (t.style === 'brutal') outOfStockBtn = 'block w-full text-center text-lg font-bold py-4 border-4 border-zinc-400 bg-zinc-200 text-zinc-500 cursor-not-allowed';
  else if (t.style === 'neon') outOfStockBtn = 'block w-full text-center text-lg font-bold py-4 border border-zinc-600 bg-zinc-900 text-zinc-600 cursor-not-allowed rounded-xl';

  const isCustomBg = t.style === 'brutal' || t.style === 'neon' || t.style === 'luxury';
  const inlineStyleObj = isCustomBg ? '{}' : '{ backgroundColor: primaryColor, color: secondaryColor }';

  return `import Link from 'next/link';
import { formatPrice, getStorePath, getProductUrl } from '@/lib/utils';
import { Product, Business } from '@prisma/client';
import { ShoppingBag, ArrowLeft, Image as ImageIcon } from 'lucide-react';

interface Props {
  product: Product;
  business: Business;
  relatedProducts: Product[];
  waLink: string;
  waNumber: string | undefined;
}

export default function ${t.name}({ product, business, relatedProducts, waLink, waNumber }: Props) {
  // Theme specific styles
  const primaryColor = business.primaryColor || (['bg-zinc-900','bg-black','bg-zinc-950'].includes('${t.bg}') ? '#ffffff' : '#000000');
  const secondaryColor = business.secondaryColor || '${t.bg.replace('bg-', '')}';

  return (
    <div className="min-h-screen ${t.bg} ${t.text} ${t.font} transition-colors duration-500">
      {/* Header */}
      <header className="border-b ${border} sticky top-0 backdrop-blur-xl z-50 bg-inherit/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={getStorePath(business.slug)} className="text-xl font-black tracking-tight hover:opacity-70 transition-opacity flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            {business.name}
          </Link>
          <div className="text-sm font-medium opacity-60">Product Details</div>
        </div>
      </header>

      {/* Main Product Section */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Product Image */}
          <div className="${imageContainerStyles} ${cardBg} group">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center opacity-30">
                <ImageIcon className="w-24 h-24 mb-4" />
                <span className="text-sm font-bold uppercase tracking-widest">No Image Provided</span>
              </div>
            )}
            
            {!product.inStock && (
              <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 text-sm font-black tracking-widest uppercase shadow-xl transform rotate-3">
                Sold Out
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col h-full justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
                {product.name}
              </h1>
              <div className="text-3xl md:text-4xl font-bold opacity-90" style={{ color: primaryColor }}>
                {formatPrice(product.price)}
              </div>
            </div>

            {product.description && (
              <div className="prose prose-lg opacity-80 leading-relaxed whitespace-pre-line max-w-none">
                {product.description}
              </div>
            )}

            <div className="pt-8 border-t ${border}">
              {waNumber ? (
                product.inStock ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="${btnStyles}"
                    style={${inlineStyleObj}}
                  >
                    <ShoppingBag className="w-6 h-6" />
                    Order via WhatsApp
                  </a>
                ) : (
                  <div className="${outOfStockBtn}">
                    Currently Unavailable
                  </div>
                )
              ) : (
                <div className="bg-red-500/10 text-red-500 text-center py-4 rounded-xl text-sm font-bold border border-red-500/20">
                  Store cannot receive orders right now.
                </div>
              )}

              <div className="text-center mt-6">
                <p className="text-sm font-medium opacity-50 uppercase tracking-widest">
                  100% Secure WhatsApp Ordering
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="${cardBg} py-16 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center tracking-tight">
              More from {business.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={getProductUrl(business.slug, rp.id)} className="group block relative">
                  <div className="aspect-[4/5] ${cardBg} ${border} border relative overflow-hidden ${t.style === 'rounded' ? 'rounded-3xl' : t.style === 'brutal' ? 'border-4 border-black' : 'rounded-xl'} mb-4">
                    {rp.imageUrl ? (
                      <img
                        src={rp.imageUrl}
                        alt={rp.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                        <ImageIcon className="w-12 h-12" />
                      </div>
                    )}
                    {!rp.inStock && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-white font-black uppercase tracking-widest border-2 border-white px-3 py-1 transform -rotate-12">Out of stock</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:opacity-70 transition-opacity line-clamp-1 mb-1">
                      {rp.name}
                    </h3>
                    <p className="font-medium opacity-70">
                      {formatPrice(rp.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t ${border} py-12 md:py-24 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h3 className="text-2xl font-black mb-2">{business.name}</h3>
          <p className="opacity-60 mb-8">{business.location} • {business.category}</p>
          <a href="/" className="inline-block text-xs font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest">
            {business.footerText || 'Powered by DukaanHai'}
          </a>
        </div>
      </footer>
    </div>
  );
}
`;
}

templates.forEach(t => {
  fs.writeFileSync(path.join(__dirname, 'src/components/product-templates', t.name + '.tsx'), generateComponent(t));
});
console.log('Successfully generated 20 product templates!');
