import React from 'react';

export const ContactSection = ({ data, business }: { data: any, business: any }) => {
  const title = data.title || 'Get In Touch';
  const subtitle = data.subtitle || 'Contact';

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-full">{subtitle}</span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight mb-8">{title}</h2>
        <p className="text-gray-600 mb-10 leading-relaxed max-w-md">
          {data.description || 'Have questions or want to make a request? Feel free to reach out to us, and our team will get back to you as soon as possible.'}
        </p>

        <div className="space-y-6 text-sm text-gray-700">
          {business?.location && (
            <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-2xl">📍</span>
              <div>
                <h4 className="font-bold text-gray-900">Our Address</h4>
                <p className="text-gray-500">{business.location}</p>
              </div>
            </div>
          )}
          {business?.phoneNumber && (
            <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-2xl">📞</span>
              <div>
                <h4 className="font-bold text-gray-900">Phone Number</h4>
                <p className="text-gray-500">{business.phoneNumber}</p>
              </div>
            </div>
          )}
          {business?.email && (
            <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-2xl">✉️</span>
              <div>
                <h4 className="font-bold text-gray-900">Email Address</h4>
                <p className="text-gray-500">{business.email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100 relative">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=${encodeURIComponent(business?.location || 'New Delhi, India')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
    </section>
  );
};
