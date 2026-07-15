export const HeroSection = ({ data }: { data: any }) => (
  <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
    {/* Mesh Gradient Background */}
    <div className="absolute inset-0 bg-[var(--color-background)]">
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
    </div>
    
    {data.backgroundImage && (
      <div className="absolute inset-0 z-0">
        <img src={data.backgroundImage} alt="Hero" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]"></div>
      </div>
    )}

    <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col items-start text-left space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-sm font-semibold text-[var(--color-primary)]">
          <span className="w-2 h-2 rounded-full bg-[var(--color-secondary)] animate-pulse"></span>
          Welcome to the Future
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] leading-[1.1] tracking-tight">
          {data.headline || 'Welcome'}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl leading-relaxed">
          {data.tagline || 'Experience the next generation of online shopping.'}
        </p>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <button className="px-8 py-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(var(--color-primary),0.5)] hover:-translate-y-1 transition-all duration-300">
            {data.primaryCta || 'Shop Collection'}
          </button>
          <button className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-[var(--color-primary)] font-bold rounded-full hover:bg-white/10 transition-all duration-300">
            {data.secondaryCta || 'Learn More'}
          </button>
        </div>
      </div>

      <div className="hidden lg:block relative h-full min-h-[500px] w-full perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 rounded-3xl transform rotate-y-12 rotate-x-12 backdrop-blur-xl border border-white/20 shadow-2xl animate-float"></div>
        <div className="absolute inset-4 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 transform rotate-y-6 rotate-x-6 shadow-xl animate-float animation-delay-2000 flex flex-col justify-between p-8">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] mb-6 shadow-lg"></div>
           <div className="space-y-4">
             <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
             <div className="h-4 w-1/2 bg-white/10 rounded animate-pulse"></div>
             <div className="h-4 w-5/6 bg-white/10 rounded animate-pulse"></div>
           </div>
        </div>
      </div>
    </div>
  </section>
);