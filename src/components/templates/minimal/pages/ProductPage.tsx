'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import ImageGallery from '../components/ImageGallery';
import { MinimalTemplateProps } from '../types';

interface ProductPageProps {
  business: MinimalTemplateProps['business'];
  product: MinimalTemplateProps['products'][0];
  onBack: () => void;
}

export default function ProductPage({ business, product, onBack }: ProductPageProps) {
  const waNumber = business.whatsappNumber?.replace(/[^0-9]/g, '');
  const waLink = (productName: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in ordering "${productName}" from ${business.name}.`)}`;

  return (
    <motion.div key="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <button onClick={onBack} className="mb-8 font-body text-sm font-medium text-stone-500 hover:text-stone-900 flex items-center gap-2 transition-colors">
          <ArrowRight className="w-4 h-4 rotate-180" /> Back to Shop
        </button>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-1">
            <div className="aspect-[4/5] bg-stone-100 rounded-xl overflow-hidden">
              <ImageGallery images={product.images} fallbackUrl={product.imageUrl} alt={product.name} />
            </div>
          </div>
          <div className="flex-1 space-y-8 py-4">
            <div>
              {product.category && <p className="text-stone-500 text-sm font-medium uppercase tracking-wider mb-3">{product.category}</p>}
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-stone-900 mb-4">{product.name}</h1>
              <p className="font-body text-2xl text-stone-700">{formatPrice(product.price)}</p>
            </div>
            {product.description && (
              <div className="prose prose-stone">
                <p className="font-body text-stone-600 leading-relaxed whitespace-pre-wrap">{product.description}</p>
              </div>
            )}
            <div className="pt-6 border-t border-stone-200">
              <a
                href={waLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 text-white font-medium px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                style={{ backgroundColor: business.primaryColor || '#1c1917' }}
              >
                Buy via WhatsApp <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
