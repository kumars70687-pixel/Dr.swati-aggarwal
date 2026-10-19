import React, { useState } from 'react';
import { CLINIC_DATA, ServiceItem } from '../data/clinicData';
import { 
  Activity, 
  ShieldPlus, 
  Thermometer, 
  HeartPulse, 
  Stethoscope, 
  Wind, 
  Pill, 
  ClipboardCheck, 
  ArrowRight, 
  Check, 
  Search,
  Sparkles
} from 'lucide-react';

interface SpecialtiesServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const SpecialtiesServices: React.FC<SpecialtiesServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconMap: Record<string, React.ReactNode> = {
    Activity: <Activity className="w-5 h-5" />,
    ShieldPlus: <ShieldPlus className="w-5 h-5" />,
    Thermometer: <Thermometer className="w-5 h-5" />,
    HeartPulse: <HeartPulse className="w-5 h-5" />,
    Stethoscope: <Stethoscope className="w-5 h-5" />,
    Wind: <Wind className="w-5 h-5" />,
    Pill: <Pill className="w-5 h-5" />,
    ClipboardCheck: <ClipboardCheck className="w-5 h-5" />,
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'diabetology', label: 'Diabetology & Metabolic' },
    { id: 'vaccination', label: 'Vaccination Centre' },
    { id: 'general', label: 'General Medicine & Fevers' },
    { id: 'preventive', label: 'Preventive Health' },
  ];

  const filteredServices = CLINIC_DATA.services.filter((svc) => {
    const matchesCategory = activeCategory === 'all' || svc.category === activeCategory;
    const matchesQuery = 
      svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.keyPoints.some(kp => kp.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="services" className="py-16 lg:py-24 bg-slate-50 border-t border-b border-slate-200/70 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Verified Offerings Only
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Specialties & Clinical Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Scientifically grounded medical treatments, dedicated diabetes care, and certified cold-chain immunizations overseen by Dr. Swati Aggarwal.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-semibold px-3.5 py-2 rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search condition or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md hover:border-teal-300/80 transition-all group"
            >
              <div>
                {/* Icon & Category Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 group-hover:bg-teal-700 text-teal-700 group-hover:text-white flex items-center justify-center transition-colors">
                    {iconMap[service.icon] || <Activity className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {service.category}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-teal-800 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {service.shortDesc}
                </p>

                {/* Key Clinical Points */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  {service.keyPoints.slice(0, 3).map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* Common Symptoms if available */}
                {service.commonSymptoms && service.commonSymptoms.length > 0 && (
                  <div className="mt-3 pt-2 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Common symptoms: </span>
                    {service.commonSymptoms.join(', ')}
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full flex items-center justify-between text-xs font-semibold text-teal-700 hover:text-teal-900 p-2 rounded-lg hover:bg-teal-50/70 transition-colors"
                >
                  <span>Book Consultation for this</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-600 text-sm">No services matched your search "{searchQuery}".</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-teal-700 underline"
            >
              Reset filters to show all services
            </button>
          </div>
        )}

        {/* Cold-Chain Vaccination Highlight Card */}
        <div className="mt-12 bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cold-Chain Maintained Adult & Travel Immunizations</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Authorized Vaccine Administration in Sector 12 Dwarka
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Vaccines lose potency if not stored strictly between +2°C and +8°C. Our clinic operates medical-grade cold refrigeration for Influenza (Flu), Typhoid, Pneumonia, Hepatitis A & B, and HPV immunizations with vaccination cards provided.
              </p>
            </div>

            <button
              onClick={() => onSelectService('Adult & Travel Vaccination Centre')}
              className="shrink-0 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
            >
              Inquire for Vaccination
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
