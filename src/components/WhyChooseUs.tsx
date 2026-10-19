import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  Clock, 
  FileCheck, 
  Award, 
  ThermometerSnowflake, 
  MapPin, 
  CalendarCheck,
  CheckCircle,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Clock: <Clock className="w-6 h-6 text-teal-700" />,
    FileCheck: <FileCheck className="w-6 h-6 text-teal-700" />,
    Award: <Award className="w-6 h-6 text-teal-700" />,
    ThermometerSnowflake: <ThermometerSnowflake className="w-6 h-6 text-teal-700" />,
    MapPin: <MapPin className="w-6 h-6 text-teal-700" />,
    CalendarCheck: <CalendarCheck className="w-6 h-6 text-teal-700" />,
  };

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Factual & Supportable Benefits Only
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Why Patients Choose Our Dwarka Practice
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We believe in honest, rational clinical practice. Here are the genuine reasons families in Dwarka consult Dr. Swati Aggarwal for their healthcare.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CLINIC_DATA.whyChooseUs.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:border-teal-300 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center mb-5 shadow-2xs">
                  {iconMap[item.icon] || <ShieldCheck className="w-6 h-6 text-teal-700" />}
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-teal-800">
                <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                <span>Verified Clinic Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Factual Transparency Banner */}
        <div className="mt-12 bg-slate-900 text-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-teal-400 flex items-center justify-center shrink-0 border border-slate-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-serif">
                No Fabricated Accreditations or Unsubstantiated Guarantees
              </h4>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Medicine is a science that requires individualized assessment. We never promise "instant cures" or advertise fake awards. Our practice is backed by genuine credentials (MBBS, Fellowship in Diabetes), transparent consultation fees, and authentic patient feedback.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href={CLINIC_DATA.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold bg-teal-700 hover:bg-teal-600 text-white px-4 py-2.5 rounded-xl transition-colors"
            >
              Verify on Google Maps
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
