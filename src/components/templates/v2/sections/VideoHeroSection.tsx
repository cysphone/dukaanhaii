export const VideoHeroSection = ({ data }: { data: any }) => (
  <section className="relative w-full h-[80vh] flex items-center justify-center bg-black overflow-hidden">
    {data.backgroundVideo && (
      <img src={data.backgroundVideo} alt="Video Fallback" className="absolute inset-0 w-full h-full object-cover opacity-60" />
    )}
    <div className="relative z-10 text-center px-4 max-w-5xl">
      <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tight">{data.headline}</h1>
      <p className="text-2xl text-gray-300 mb-10 uppercase tracking-widest">{data.tagline}</p>
      {data.primaryCta && (
        <button className="px-10 py-5 bg-[var(--color-secondary)] text-white font-black text-xl rounded hover:bg-white hover:text-black transition-colors">
          {data.primaryCta}
        </button>
      )}
    </div>
  </section>
);