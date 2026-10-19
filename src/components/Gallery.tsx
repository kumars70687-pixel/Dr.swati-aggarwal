import React, { useState, useEffect, useCallback } from 'react';
import { CLINIC_DATA, GalleryImage } from '../data/clinicData';
import { 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Image as ImageIcon,
  ExternalLink
} from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'clinic', label: 'Clinic & Exterior' },
    { id: 'consultation', label: 'Consultation Suite' },
    { id: 'vaccination', label: 'Vaccine Storage' },
    { id: 'facility', label: 'Reception & Facility' },
  ];

  const filteredImages = CLINIC_DATA.gallery.filter(
    (img) => activeCategory === 'all' || img.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  }, [selectedImageIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [selectedImageIndex, filteredImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, nextImage, prevImage]);

  const currentImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Facility & Practice Environment
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Clinic Photo Gallery
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A look inside Dr. Swati Aggarwal's consultation clinic in Sector 12 Dwarka, featuring verified listing imagery, patient consultation space, and cold-chain vaccine refrigeration.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                activeCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, index) => (
            <div
              key={img.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 w-full bg-slate-900 overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Listing Photo Tag */}
                {img.isOfficialListingPhoto && (
                  <div className="absolute top-3 left-3 bg-teal-800/95 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-teal-600/50">
                    <ShieldCheck className="w-3 h-3 text-teal-300" />
                    <span>Verified Listing Photo</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-md">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Caption & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm font-serif mb-1 group-hover:text-teal-700 transition-colors">
                    {img.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {img.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-teal-700 font-semibold">
                  <span>Click to enlarge</span>
                  <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-700" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Photo Link Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>Photos from Dr. Swati Aggarwal clinic listing on Google Maps. </span>
          <a
            href={CLINIC_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 hover:text-teal-800 font-semibold inline-flex items-center gap-1 underline underline-offset-2 ml-1"
          >
            <span>View All Photos on Google Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-teal-400" />
                <span className="font-serif font-bold text-sm sm:text-base">{currentImage.title}</span>
                {currentImage.isOfficialListingPhoto && (
                  <span className="text-[10px] bg-teal-800 text-teal-200 px-2 py-0.5 rounded font-semibold ml-2">
                    Official Listing
                  </span>
                )}
              </div>
              <button
                onClick={closeLightbox}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Viewport */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[420px]">
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Navigation Arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 text-slate-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="max-w-xl leading-relaxed">
                {currentImage.description}
              </p>
              <div className="text-[11px] text-slate-500 whitespace-nowrap">
                Image {selectedImageIndex! + 1} of {filteredImages.length}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
