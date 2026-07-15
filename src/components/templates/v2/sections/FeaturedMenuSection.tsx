export const FeaturedMenuSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 bg-gray-50 text-center">
    <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">{data.title || 'Featured Menu'}</h2>
    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">{data.description}</p>
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
      {data.showProducts === 'true' || data.showProducts === true ? (
         <div className="text-gray-500 italic p-8 border border-dashed border-gray-300 rounded-xl w-full">Products will be loaded here dynamically.</div>
      ) : null}
    </div>
  </section>
);