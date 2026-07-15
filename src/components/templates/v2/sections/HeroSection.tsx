export const HeroSection = ({ data }: { data: any }) => (
  <section className="relative w-full h-[70vh] flex items-center justify-center bg-gray-900 overflow-hidden">
    {data.backgroundImage ? (
      <img src={data.backgroundImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-50" />
    ) : (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-50" />
    )}
    <div className="relative z-10 text-center px-4 max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-lg">{data.headline || 'Welcome'}</h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-10 drop-shadow">{data.tagline}</p>
      {data.primaryCta && (
        <button className="px-8 py-4 bg-[var(--color-secondary)] text-white font-bold rounded-full hover:scale-105 transition-transform shadow-xl">
          {data.primaryCta}
        </button>
      )}
    </div>
  </section>
);