import React from 'react';
import Link from 'next/link';

export const ProductGridSection = ({ data, products, business }: { data: any, products?: any[], business?: any }) => {
  const storePrefix = business?.slug ? `/store/${business.slug}` : '';
  const displayProducts = products && products.length > 0 ? products : [
    { id: 'sample-1', name: 'Sample Product 1', price: 99, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
    { id: 'sample-2', name: 'Sample Product 2', price: 149, imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80' },
    { id: 'sample-3', name: 'Sample Product 3', price: 79, imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
    { id: 'sample-4', name: 'Sample Product 4', price: 129, imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80' },
    { id: 'sample-5', name: 'Sample Product 5', price: 199, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
    { id: 'sample-6', name: 'Sample Product 6', price: 89, imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {data.title && (
        <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-primary)] mb-10 text-center">
          {data.title}
        </h2>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {displayProducts.map((product: any) => (
          <Link key={product.id} href={`${storePrefix}/product/${product.id}`} className="group cursor-pointer flex flex-col">
            <div className="relative w-full aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img 
                src={product.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex justify-between items-start mt-2">
              <h3 className="text-lg font-heading text-gray-900 group-hover:text-[var(--color-primary)] transition-colors">
                {product.name}
              </h3>
              <span className="text-lg font-body font-semibold text-gray-900 ml-4">
                ₹{product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};