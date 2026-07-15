import React from 'react';

export const TestimonialsSection = ({ data }: { data: any }) => {
  const title = data.title || 'What Our Clients Say';
  const subtitle = data.subtitle || 'Testimonials';
  
  // Support custom fields or generic list
  const reviews = [
    { name: data.client1Name || 'Amit Sharma', role: data.client1Role || 'Business Owner', text: data.client1Quote || 'Absolutely incredible service. The quality exceeded my expectations and customer support was outstanding!', rating: 5 },
    { name: data.client2Name || 'Priya Patel', role: data.client2Role || 'Designer', text: data.client2Quote || 'A beautiful, seamless experience. The attention to detail is stunning. Highly recommended!', rating: 5 },
    { name: data.client3Name || 'Rohan Das', role: data.client3Role || 'Tech Lead', text: data.client3Quote || 'Sleek, modern and extremely functional. It has transformed the way we showcase our brand.', rating: 5 }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-transparent to-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">{subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">{title}</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-black/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-6">
                  {Array.from({ length: r.rating }).map((_, idx) => (
                    <span key={idx} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed italic mb-8">"{r.text}"</p>
              </div>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center font-bold text-[var(--color-primary)]">
                  {r.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{r.name}</h4>
                  <span className="text-xs text-gray-400">{r.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
