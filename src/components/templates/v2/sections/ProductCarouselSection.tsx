export const ProductCarouselSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 bg-gray-50 overflow-hidden">
    <div className="max-w-7xl mx-auto mb-12">
      <h2 className="text-4xl font-bold text-[var(--color-primary)]">{data.title || 'Trending Now'}</h2>
    </div>
    <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto pb-8 snap-x">
       {data.showProducts === 'true' || data.showProducts === true ? (
         <div className="w-full text-center text-gray-500 italic p-12 border border-dashed border-gray-300 rounded-xl">Products Carousel Placeholder</div>
       ) : null}
    </div>
  </section>
);