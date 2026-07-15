import React from 'react';
import { ShoppingBag, ChevronRight, Share2, Star } from 'lucide-react';

export function ProductDetailSection({ 
  business,
  product
}: { 
  business: any;
  product?: any;
}) {
  if (!product) {
    return <div className="p-12 text-center">Product not found.</div>;
  }

  const wamessage = `Hi, I want to order ${product.name} (₹${product.price}) from your store.`;
  const waLink = `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(wamessage)}`;

  return (
    <section className="py-16 md:py-24 bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="hover:text-[var(--color-primary)]">Home</a>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <a href="/shop" className="hover:text-[var(--color-primary)]">Shop</a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-gray-900 font-medium truncate">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] sm:aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
              <img 
                src={product.imageUrl || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80`} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {!product.inStock && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-semibold rounded-full shadow-md">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <p className="text-2xl sm:text-3xl font-semibold text-[var(--color-primary)]">
                ₹{product.price}
              </p>
              <div className="flex items-center text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <span className="text-sm text-gray-500 ml-2">(Reviews)</span>
              </div>
            </div>

            <div className="prose prose-sm sm:prose-base text-gray-600 mb-8 max-w-none">
              <p>{product.description || "Premium quality product available at our store. Made with precision and care to deliver the best value for you."}</p>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100 mt-auto">
              {product.inStock ? (
                <>
                  <a 
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Buy on WhatsApp
                  </a>
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 transition-colors">
                    <Share2 className="w-5 h-5" />
                    Share Product
                  </button>
                </>
              ) : (
                <button 
                  disabled
                  className="w-full bg-gray-200 text-gray-500 px-8 py-4 rounded-xl font-semibold cursor-not-allowed"
                >
                  Currently Unavailable
                </button>
              )}
            </div>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Secure Order</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
