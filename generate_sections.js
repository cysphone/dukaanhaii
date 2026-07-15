const fs = require('fs');
const path = require('path');

const dir = 'src/components/templates/v2/sections';

const sections = {
  'HeroSection': `export const HeroSection = ({ data }: { data: any }) => (
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
);`,
  'AboutSection': `export const AboutSection = ({ data }: { data: any }) => (
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
);`,
  'FeaturedMenuSection': `export const FeaturedMenuSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 bg-gray-50 text-center">
    <h2 className="text-4xl font-bold text-[var(--color-primary)] mb-4">{data.title || 'Featured Menu'}</h2>
    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">{data.description}</p>
    <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8">
      {data.showProducts === 'true' || data.showProducts === true ? (
         <div className="text-gray-500 italic p-8 border border-dashed border-gray-300 rounded-xl w-full">Products will be loaded here dynamically.</div>
      ) : null}
    </div>
  </section>
);`,
  'SimpleHeaderSection': `export const SimpleHeaderSection = ({ data }: { data: any }) => (
  <section className="py-24 px-4 bg-[var(--color-primary)] text-center text-white">
    <h1 className="text-5xl font-black mb-4">{data.title}</h1>
    {data.subtitle && <p className="text-xl text-gray-200">{data.subtitle}</p>}
  </section>
);`,
  'ProductGridSection': `export const ProductGridSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <div className="text-gray-500 italic p-8 border border-dashed border-gray-300 rounded-xl w-full text-center">
      Dynamic Product Grid (Layout: {data.layout || 'list'}) will be rendered here.
    </div>
  </section>
);`,
  'VideoHeroSection': `export const VideoHeroSection = ({ data }: { data: any }) => (
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
);`,
  'CardsSection': `export const CardsSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-16 text-[var(--color-primary)]">{data.title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform">
          <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">{data[\`card\${i}Title\`]}</h3>
          <p className="text-gray-600 leading-relaxed">{data[\`card\${i}Desc\`]}</p>
        </div>
      ))}
    </div>
  </section>
);`,
  'TextSection': `export const TextSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-4xl mx-auto text-center">
    <p className="text-2xl md:text-4xl font-medium text-[var(--color-primary)] leading-tight italic">"{data.text}"</p>
  </section>
);`,
  'SplitHeroSection': `export const SplitHeroSection = ({ data }: { data: any }) => (
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
);`,
  'IconGridSection': `export const IconGridSection = ({ data }: { data: any }) => (
  <section className="py-20 px-4 max-w-7xl mx-auto border-t border-gray-200">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center text-2xl font-bold mb-6">
            {i}
          </div>
          <h3 className="text-xl font-bold text-[var(--color-primary)] mb-3">{data[\`b\${i}Title\`]}</h3>
          <p className="text-gray-500">{data[\`b\${i}Desc\`]}</p>
        </div>
      ))}
    </div>
  </section>
);`,
  'ProductCarouselSection': `export const ProductCarouselSection = ({ data }: { data: any }) => (
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
);`
};

for (const [name, content] of Object.entries(sections)) {
  fs.writeFileSync(path.join(dir, `${name}.tsx`), content);
}

console.log('Successfully generated all sections!');
