import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ShopPage({ params }: { params: { slug: string } }) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
    include: {
      products: {
        where: { inStock: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!business) notFound();

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-surface-900 mb-4">Our Collection</h1>
        <p className="text-surface-600 text-lg">Browse our latest products and services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {business.products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-surface-100">
            <div className="aspect-[4/5] bg-surface-100 relative overflow-hidden">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-surface-400">No Image</div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <button className="px-6 py-2 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                   Quick View
                 </button>
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-bold text-lg text-surface-900 mb-2">{product.name}</h3>
              <p className="text-[var(--theme-primary)] font-black text-xl">₹{product.price}</p>
              {product.description && <p className="text-sm text-surface-500 mt-3 line-clamp-2">{product.description}</p>}
            </div>
          </div>
        ))}
      </div>
      
      {business.products.length === 0 && (
        <div className="text-center py-20 text-surface-500 text-lg">
          No products available in the shop yet. Check back soon!
        </div>
      )}
    </div>
  );
}
