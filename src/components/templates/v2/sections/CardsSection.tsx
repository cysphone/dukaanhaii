export const CardsSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16 text-[var(--color-primary)]">{data.title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
          <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">{data[`card${i}Title`]}</h3>
          <p className="text-gray-600 leading-relaxed">{data[`card${i}Desc`]}</p>
        </div>
      ))}
    </div>
  </section>
);