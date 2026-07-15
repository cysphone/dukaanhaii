export const IconGridSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto border-t border-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center text-2xl font-bold mb-6">
            {i}
          </div>
          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{data[`b${i}Title`]}</h3>
          <p className="text-gray-500">{data[`b${i}Desc`]}</p>
        </div>
      ))}
    </div>
  </section>
);