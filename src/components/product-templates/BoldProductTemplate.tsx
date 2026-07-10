import Link from 'next/link';
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

export default function BoldProductTemplate({ product, business, relatedProducts, waLink, waNumber }: Props) {
  // Theme specific styles
  const primaryColor = business.primaryColor || (['bg-zinc-900','bg-black','bg-zinc-950'].includes('bg-yellow-400') ? '#ffffff' : '#000000');
  const secondaryColor = business.secondaryColor || 'yellow-400';

  return (
    <div className="min-h-screen bg-yellow-400 text-black font-mono transition-colors duration-500">
      {/* Header */}
      <header className="border-b border-black/10 sticky top-0 backdrop-blur-xl z-50 bg-inherit/80">
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
          <div className="aspect-square relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black/5 group">
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

            <div className="pt-8 border-t border-black/10">
              {waNumber ? (
                product.inStock ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-lg font-bold py-4 transition-all flex items-center justify-center gap-2 bg-black text-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                    style={{}}
                  >
                    <ShoppingBag className="w-6 h-6" />
                    Order via WhatsApp
                  </a>
                ) : (
                  <div className="block w-full text-center text-lg font-bold py-4 border-4 border-zinc-400 bg-zinc-200 text-zinc-500 cursor-not-allowed">
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
        <section className="bg-black/5 py-16 md:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black mb-12 text-center tracking-tight">
              More from {business.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map(rp => (
                <Link key={rp.id} href={getProductUrl(business.slug, rp.id)} className="group block relative">
                  <div className="aspect-[4/5] bg-black/5 border-black/10 border relative overflow-hidden border-4 border-black mb-4">
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
      <footer className="border-t border-black/10 py-12 md:py-24 text-center">
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
