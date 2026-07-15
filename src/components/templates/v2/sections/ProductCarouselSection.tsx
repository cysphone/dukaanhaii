import Link from 'next/link';

export const ProductCarouselSection = ({ data, products, business }: { data: any, products: any[], business: any }) => (
  <section className="py-24 px-4 bg-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)] opacity-[0.03] rounded-full blur-[80px]"></div>
    
    <div className="max-w-7xl mx-auto mb-16 flex items-end justify-between relative z-10">
      <div>
        <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary)] tracking-tight mb-2">{data.title || 'Trending Now'}</h2>
        <p className="text-gray-500 font-medium">Discover our most popular selections.</p>
      </div>
      <div className="hidden md:flex gap-2">
         {/* Carousel controls could go here */}
         <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors cursor-pointer">←</div>
         <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors cursor-pointer">→</div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-12 snap-x hide-scrollbar relative z-10">
       {!products || products.length === 0 ? (
         <div className="w-full text-center text-gray-400 italic p-16 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50">
           No products added yet. They will appear here once added!
         </div>
       ) : (
         products.map(p => (
           <Link href={`/store/${business?.slug}/product/${p.id}`} key={p.id} className="min-w-[280px] md:min-w-[320px] bg-white rounded-3xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 snap-center transition-all duration-300 hover:-translate-y-2 group">
              <div className="w-full aspect-[4/5] rounded-2xl bg-gray-50 mb-6 overflow-hidden relative">
                {p.imageUrl ? (
                  <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-[var(--color-primary)] shadow-sm">
                  ₹{p.price}
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-[var(--color-primary)] transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">{p.description || 'A premium product.'}</p>
                <div className="w-full py-3 bg-[var(--color-background)] text-[var(--color-primary)] font-bold text-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </div>
              </div>
           </Link>
         ))
       )}
    </div>
  </section>
);