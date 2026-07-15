export const SplitHeroSection = ({ data }: { data: any }) => (
  <section className="min-h-[80vh] flex flex-col md:flex-row bg-[var(--color-background)]">
    <div className="flex-1 flex flex-col justify-center px-8 md:px-20 py-12">
      <h1 className="text-5xl md:text-7xl font-black text-[var(--color-primary)] mb-6 leading-tight">{data.headline}</h1>
      <p className="text-xl text-gray-600 mb-10">{data.tagline}</p>
      {data.primaryCta && (
        <div>
          <button className="px-10 py-4 bg-[var(--color-primary)] text-white font-bold rounded-full hover:shadow-xl transition-shadow text-lg">
            {data.primaryCta}
          </button>
        </div>
      )}
    </div>
    <div className="flex-1 bg-gray-100 relative">
      {data.productImage ? (
         <img src={data.productImage} alt="Hero Product" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
         <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
           <span className="text-gray-400 font-bold">Image Placeholder</span>
         </div>
      )}
    </div>
  </section>
);