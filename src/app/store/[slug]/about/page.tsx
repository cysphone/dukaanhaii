import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function AboutPage({ params }: { params: { slug: string } }) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) notFound();

  return (
    <div className="py-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-black text-surface-900 mb-8 text-center">Our Story</h1>
      
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-surface-100 prose prose-lg max-w-none text-surface-600">
        <p className="text-xl leading-relaxed font-medium mb-8 text-surface-800">
          {business.about || `Welcome to ${business.name}.`}
        </p>
        
        {business.vision && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-surface-900 mb-4">Our Vision</h2>
            <p>{business.vision}</p>
          </div>
        )}
        
        {business.mission && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-surface-900 mb-4">Our Mission</h2>
            <p>{business.mission}</p>
          </div>
        )}
      </div>
    </div>
  );
}
