export const ProductGridSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <div className="text-gray-500 italic p-8 border border-dashed border-gray-300 rounded-xl w-full text-center">
      Dynamic Product Grid (Layout: {data.layout || 'list'}) will be rendered here.
    </div>
  </section>
);