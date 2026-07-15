export const SimpleHeaderSection = ({ data }: { data: any }) => (
  <section className="py-24 px-4 bg-[var(--color-primary)] text-center text-white">
    <h1 className="text-5xl font-black mb-4">{data.title}</h1>
    {data.subtitle && <p className="text-xl text-gray-200">{data.subtitle}</p>}
  </section>
);