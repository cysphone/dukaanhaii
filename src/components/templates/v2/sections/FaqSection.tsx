import React from 'react';

export const FaqSection = ({ data }: { data: any }) => {
  const title = data.title || 'Frequently Asked Questions';
  const subtitle = data.subtitle || 'Got Questions?';

  const faqs = [
    { q: data.q1 || 'What are your working hours?', a: data.a1 || 'We are open from 9:00 AM to 8:00 PM, Monday through Saturday.' },
    { q: data.q2 || 'Do you offer home delivery?', a: data.a2 || 'Yes, we provide safe and secure home delivery services to nearby locations.' },
    { q: data.q3 || 'How can I make a booking?', a: data.a3 || 'You can easily make a booking online via our website contact section or contact us directly on WhatsApp!' }
  ];

  return (
    <section className="py-24 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">{subtitle}</span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">{title}</h2>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-black/5 shadow-md">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start gap-3">
              <span className="text-[var(--color-primary)] font-black">Q.</span>
              {faq.q}
            </h3>
            <p className="text-gray-600 leading-relaxed pl-6">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
