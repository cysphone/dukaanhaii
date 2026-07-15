'use client';

import { Product } from '@prisma/client';
import { getTemplateById } from '@/lib/templates';

export default function MultiPageHomeTemplate({
  business,
  products,
}: {
  business: any;
  products: Product[];
}) {
  const template = getTemplateById(business.templateType);
  if (!template) return null;

  const config = business.templateConfig ? (typeof business.templateConfig === 'string' ? JSON.parse(business.templateConfig) : business.templateConfig) : {};

  return (
    <div>
      {/* Dynamic Sections rendering based on Template Def */}
      {template.sections?.map((section) => {
        const data = config[section.id] || {};
        
        switch (section.id) {
          case 'bannerCarousel':
            return (
              <div key={section.id} className="relative w-full h-[50vh] bg-surface-200 overflow-hidden">
                {data.images && data.images.length > 0 ? (
                  <img src={data.images[0]} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--theme-primary)]/10">
                     <h1 className="text-4xl md:text-6xl font-black text-[var(--theme-primary)] text-center px-4">{business.headline || business.name}</h1>
                  </div>
                )}
              </div>
            );
          
          case 'aboutUs':
            return (
              <div key={section.id} className="py-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                {data.image && (
                  <div className="w-full md:w-1/3 aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <img src={data.image} alt="About Us" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`w-full ${data.image ? 'md:w-2/3' : 'md:w-full text-center'}`}>
                  <h2 className="text-3xl font-bold text-surface-900 mb-6">About the Creator</h2>
                  <p className="text-lg text-surface-600 leading-relaxed whitespace-pre-wrap">{data.bio || business.about}</p>
                </div>
              </div>
            );
            
          case 'splitHero':
             return (
              <div key={section.id} className="py-20 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className={`w-full md:w-1/2`}>
                  <h1 className="text-5xl font-black text-surface-900 mb-6">{business.headline || business.name}</h1>
                  <p className="text-xl text-surface-600 leading-relaxed whitespace-pre-wrap mb-8">{data.text || business.tagline}</p>
                  <a href="/shop" className="px-8 py-4 bg-[var(--theme-primary)] text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition-all">Shop Collection</a>
                </div>
                <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                    {data.image ? <img src={data.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-[var(--theme-primary)]/20" />}
                </div>
              </div>
            );
            
          case 'portfolioGallery':
             return (
               <div key={section.id} className="py-20 px-4 max-w-7xl mx-auto">
                 <h2 className="text-3xl font-bold text-center text-surface-900 mb-12">Portfolio Gallery</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {data.images?.map((img: string, i: number) => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden shadow-md">
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    )) || <p className="text-center col-span-full text-surface-500">No images added yet.</p>}
                 </div>
               </div>
             );
          
          default:
            return (
              <div key={section.id} className="py-12 border-b border-surface-200 text-center">
                 <h3 className="text-xl font-bold text-surface-400 mb-2">{section.name} (Preview)</h3>
                 <pre className="text-sm text-surface-500 bg-surface-100 p-4 rounded-xl inline-block text-left">{JSON.stringify(data, null, 2)}</pre>
              </div>
            );
        }
      })}

      {/* Categories Section */}
      <div className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-surface-900 mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['New Arrivals', 'Best Sellers', 'Sale', 'Collections'].map((cat, i) => (
             <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden relative group cursor-pointer bg-surface-200">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
               <div className="absolute inset-0 flex items-center justify-center z-20">
                 <h3 className="text-white font-bold text-xl md:text-2xl">{cat}</h3>
               </div>
             </div>
          ))}
        </div>
      </div>

      {/* Default Featured Products Section for Home Page */}
      {products.length > 0 && (
        <div className="py-20 px-4 max-w-7xl mx-auto bg-surface-50 rounded-3xl my-12">
          <h2 className="text-3xl font-bold text-center text-surface-900 mb-12">Featured Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-surface-100">
                <div className="aspect-square bg-surface-100 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-400">No Image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-surface-900 line-clamp-1">{product.name}</h3>
                  <p className="text-[var(--theme-primary)] font-black text-lg mt-1">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
             <a href="/shop" className="inline-block px-8 py-3 border-2 border-[var(--theme-primary)] text-[var(--theme-primary)] font-bold rounded-full hover:bg-[var(--theme-primary)] hover:text-white transition-colors">
               View Full Shop
             </a>
          </div>
        </div>
      )}

      {/* Top Selling Products */}
      {products.length > 4 && (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-surface-900 mb-12">Top Selling Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-surface-100">
                <div className="aspect-square bg-surface-100 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-400">No Image</div>
                  )}
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-surface-900 line-clamp-1 text-sm">{product.name}</h3>
                  <p className="text-[var(--theme-primary)] font-bold mt-1">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <div className="py-20 px-4 bg-surface-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-surface-900 mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map((i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-surface-100">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {'★★★★★'}
                  </div>
                  <p className="text-surface-600 mb-6 font-medium">"Absolutely love the quality and attention to detail. Fast shipping and great customer service. Highly recommend!"</p>
                  <p className="font-bold text-surface-900">— Happy Customer</p>
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 max-w-5xl mx-auto text-center">
         <h2 className="text-4xl md:text-5xl font-black text-surface-900 mb-6">Ready to upgrade?</h2>
         <p className="text-xl text-surface-600 mb-10 max-w-2xl mx-auto">Join hundreds of happy customers and discover our premium collection today.</p>
         <a href="/shop" className="inline-block px-10 py-4 bg-[var(--theme-primary)] text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
           Start Shopping Now
         </a>
      </div>
    </div>
  );
}
