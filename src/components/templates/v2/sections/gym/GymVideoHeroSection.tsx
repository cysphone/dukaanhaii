import React from 'react';
import { motion } from 'framer-motion';

export const GymVideoHeroSection = ({ data }: { data: any }) => {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          src={data.videoUrl || "https://cdn.pixabay.com/video/2021/08/25/86307-593502845_large.mp4"} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-40 grayscale contrast-125"
        />
      </div>

      {/* Extreme Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {data.tagline && (
            <div className="inline-block px-4 py-1 bg-[var(--color-secondary)] mb-6 transform -skew-x-12">
              <span className="block transform skew-x-12 text-black font-heading uppercase tracking-wider font-bold">
                {data.tagline}
              </span>
            </div>
          )}
          
          <h1 className="text-7xl md:text-9xl font-heading text-white uppercase leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl mix-blend-difference">
            {data.headline || 'FORGE YOUR LEGACY'}
          </h1>

          {data.primaryCta && (
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'black' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[var(--color-primary)] text-white font-heading text-xl uppercase tracking-widest transition-colors duration-300 transform -skew-x-6 border-b-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2"
            >
              <span className="block transform skew-x-6">{data.primaryCta}</span>
            </motion.button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
