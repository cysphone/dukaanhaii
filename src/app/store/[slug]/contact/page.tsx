import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function ContactPage({ params }: { params: { slug: string } }) {
  const business = await prisma.business.findUnique({
    where: { slug: params.slug },
  });

  if (!business) notFound();

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-surface-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-surface-600">We'd love to hear from you. Here's how you can reach us.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-surface-50 p-10 rounded-3xl">
          <h2 className="text-2xl font-bold text-surface-900 mb-8">Contact Information</h2>
          <div className="space-y-6 text-lg">
            {business.email && (
              <div className="flex items-center gap-4">
                <span className="text-2xl">📧</span>
                <a href={`mailto:${business.email}`} className="font-medium text-surface-800 hover:text-[var(--theme-primary)]">{business.email}</a>
              </div>
            )}
            {business.phoneNumber && (
              <div className="flex items-center gap-4">
                <span className="text-2xl">📞</span>
                <a href={`tel:${business.phoneNumber}`} className="font-medium text-surface-800 hover:text-[var(--theme-primary)]">{business.phoneNumber}</a>
              </div>
            )}
            {business.whatsappNumber && (
              <div className="flex items-center gap-4">
                <span className="text-2xl">💬</span>
                <a href={`https://wa.me/${business.whatsappNumber.replace('+', '')}`} target="_blank" rel="noreferrer" className="font-medium text-surface-800 hover:text-[var(--theme-primary)]">WhatsApp Us</a>
              </div>
            )}
            {business.location && (
              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <span className="font-medium text-surface-800">{business.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-surface-100">
           <h2 className="text-2xl font-bold text-surface-900 mb-8">Send a Message</h2>
           <form className="space-y-6">
             <div>
               <label className="block text-sm font-bold text-surface-700 mb-2">Name</label>
               <input type="text" className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]" placeholder="Your Name" />
             </div>
             <div>
               <label className="block text-sm font-bold text-surface-700 mb-2">Email</label>
               <input type="email" className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]" placeholder="your@email.com" />
             </div>
             <div>
               <label className="block text-sm font-bold text-surface-700 mb-2">Message</label>
               <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)]" placeholder="How can we help?"></textarea>
             </div>
             <button type="button" className="w-full py-4 bg-[var(--theme-primary)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-lg">
               Send Message
             </button>
           </form>
        </div>
      </div>
    </div>
  );
}
