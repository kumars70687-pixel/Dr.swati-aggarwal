import React, { useState, useEffect } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  Navigation, 
  ChevronUp 
} from 'lucide-react';

interface QuickActionWidgetProps {
  onOpenBooking: () => void;
}

export const QuickActionWidget: React.FC<QuickActionWidgetProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Fixed Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${CLINIC_DATA.intlPhone}`}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-bold active:bg-slate-200"
        >
          <Phone className="w-4 h-4 text-teal-700 mb-0.5" />
          <span>Call</span>
        </a>

        <a
          href={CLINIC_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold active:bg-emerald-100 border border-emerald-200/60"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-teal-700 text-white text-[10px] font-bold active:bg-teal-800 shadow-sm"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book</span>
        </button>

        <a
          href={CLINIC_DATA.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-lg bg-slate-100 text-slate-800 text-[10px] font-bold active:bg-slate-200"
        >
          <Navigation className="w-4 h-4 text-teal-700 mb-0.5" />
          <span>Maps</span>
        </a>
      </div>

      {/* Desktop Floating Speed-dial & Scroll to Top */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white text-slate-700 hover:text-slate-900 shadow-md border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-y-0.5"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating WhatsApp Quick Button */}
        <a
          href={CLINIC_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
          title="Direct WhatsApp Consultation Desk"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Clinic</span>
        </a>
      </div>
    </>
  );
};
