export const TextSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-4xl mx-auto text-center">
    <p className="text-2xl md:text-4xl font-medium text-[var(--color-primary)] leading-tight italic">"{data.text}"</p>
  </section>
);