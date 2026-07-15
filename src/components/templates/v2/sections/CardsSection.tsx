export const CardsSection = ({ data }: { data: any }) => (
  <section className="py-24 px-6 w-full relative">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)]/5"></div>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-[var(--color-primary)] tracking-tight mb-4">{data.title || 'Discover More'}</h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
        {[1, 2, 3, 4].map(i => {
          const title = data[`c${i}_title`] || data[`card${i}Title`];
          const desc = data[`c${i}_desc`] || data[`card${i}Desc`];
          
          if (!title && i === 4) return null; // Only show 3 if 4th is missing
          if (!title && i !== 4) return null;

          return (
            <div 
              key={i} 
              className={`group relative overflow-hidden rounded-3xl bg-[var(--color-background)] border border-[var(--color-primary)]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(var(--color-primary),0.12)] transition-all duration-500 hover:-translate-y-1 ${
                i === 1 ? 'md:col-span-2 md:row-span-2' : (i === 4 ? 'md:col-span-2' : 'md:col-span-2')
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="p-8 h-full flex flex-col justify-end relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500"></div>
                <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-3">{title || `Feature ${i}`}</h3>
                {desc && <p className="text-gray-500 font-medium leading-relaxed max-w-sm">{desc}</p>}
                
                <div className="mt-6 inline-flex items-center text-[var(--color-secondary)] font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  Explore <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);