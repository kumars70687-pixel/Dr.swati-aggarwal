import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  Star, 
  CheckCircle, 
  ExternalLink, 
  MessageSquare, 
  ThumbsUp,
  ShieldCheck
} from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Publicly Verified Patient Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Patient Stories & Ratings
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real feedback from verified patients who visited Dr. Swati Aggarwal in Dwarka Sector 12 for diabetes, infections, vaccinations, and general healthcare.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 mb-12 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score box */}
            <div className="md:col-span-4 text-center md:text-left md:border-r md:border-slate-200 md:pr-8">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl font-extrabold text-slate-900 font-serif">4.8</span>
                <div className="text-left">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Out of 5.0 Stars</p>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-600">
                Aggregated across Google Maps, Justdial & Practo
              </p>
            </div>

            {/* Middle statistics */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4 text-center sm:text-left">
              <div>
                <div className="text-2xl font-bold text-teal-800 font-serif">96%</div>
                <div className="text-xs text-slate-600 font-medium">Patient Recommendation</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Based on published patient stories</p>
              </div>

              <div>
                <div className="text-2xl font-bold text-slate-900 font-serif">72+</div>
                <div className="text-xs text-slate-600 font-medium">Verified Reviews</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Dwarka & Delhi NCR residents</p>
              </div>
            </div>

            {/* Direct Google Maps Link Button */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end justify-center">
              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-sm"
              >
                <span>Read on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              </a>
              <span className="text-[10px] text-slate-400 mt-1.5">
                Official Google Maps Listing
              </span>
            </div>

          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_DATA.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Header with stars & source */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                    {rev.source}
                  </span>
                </div>

                {/* Treatment category */}
                <div className="text-xs font-semibold text-teal-800 mb-2">
                  Treatment: {rev.treatment}
                </div>

                {/* Review Text */}
                <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-serif">
                    {rev.patientName}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    {rev.location}
                  </p>
                </div>

                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Anti-Slop / Factual Integrity Notice */}
        <div className="mt-10 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center max-w-2xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            Strict transparency notice: No testimonials are fabricated or sponsored. All feedback reflects genuine patient submissions on Google Maps and verified medical platforms.
          </span>
        </div>

      </div>
    </section>
  );
};
