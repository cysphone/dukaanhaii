export const AboutSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div className="flex-1">
      <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-6">{data.title || 'About Us'}</h2>
      <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{data.description}</p>
    </div>
    {data.image && (
      <div className="flex-1">
        <img src={data.image} alt="About" className="w-full h-auto rounded-3xl shadow-2xl object-cover" />
      </div>
    )}
  </section>
);