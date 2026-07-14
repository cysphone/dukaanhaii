'use client';

import { useState } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images?: string[];
  fallbackUrl?: string | null;
  alt: string;
}

export default function ImageGallery({ images, fallbackUrl, alt }: ImageGalleryProps) {
  const allImages = images && images.length > 0 ? images : fallbackUrl ? [fallbackUrl] : [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (allImages.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100">
        <Camera className="w-12 h-12 stroke-[1]" />
      </div>
    );
  }

  if (allImages.length === 1) {
    return (
      <img src={allImages[0]} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
    );
  }

  return (
    <div className="relative w-full h-full group/gallery">
      <img src={allImages[currentIndex]} alt={alt} className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/gallery:opacity-100 transition-opacity">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === 0 ? allImages.length - 1 : prev - 1); }}
          className="bg-white/90 p-1.5 rounded-full text-slate-800 hover:bg-blue-50 hover:text-blue-600 shadow-sm transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(prev => prev === allImages.length - 1 ? 0 : prev + 1); }}
          className="bg-white/90 p-1.5 rounded-full text-slate-800 hover:bg-blue-50 hover:text-blue-600 shadow-sm transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
        {allImages.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? 'bg-blue-600 scale-125' : 'bg-white/80'}`} />
        ))}
      </div>
    </div>
  );
}
