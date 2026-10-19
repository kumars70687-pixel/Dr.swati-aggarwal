import React, { useState, useEffect } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Calendar, 
  Navigation, 
  AlertCircle,
  MessageCircle,
  HeartPulse,
  Database
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAppointmentsManager?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAppointmentsManager }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About Doctor', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Clinic Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & Hours', href: '#contact' },
  ];

  return (
    <>
      {/* Top Notification / Emergency & Hours Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Dwarka Sector 12: Mon–Sat 10:00 AM–1:00 PM & 5:30 PM–7:00 PM</span>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>For acute medical emergencies, please visit nearest emergency room or dial 112.</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {onOpenAppointmentsManager && (
              <button
                onClick={onOpenAppointmentsManager}
                className="hidden sm:inline-flex items-center gap-1 text-teal-300 hover:text-white font-medium transition-colors"
                title="View Appointments in Supabase"
              >
                <Database className="w-3 h-3 text-teal-400" />
                <span>Supabase DB</span>
              </button>
            )}
            <a 
              href={`tel:${CLINIC_DATA.intlPhone}`} 
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors font-medium"
              title="Call Clinic Reception"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{CLINIC_DATA.phone}</span>
            </a>
            <span className="text-slate-600">·</span>
            <a 
              href={CLINIC_DATA.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              title="WhatsApp Clinic"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-3' 
          : 'bg-white border-b border-slate-100 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo and Brand Title */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                <HeartPulse className="w-6 h-6 text-teal-100" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-serif">
                    Dr. Swati Aggarwal
                  </span>
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200/60 rounded px-1.5 py-0.5">
                    MBBS · Diabetology
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  General Physician & Diabetology Centre · Dwarka Sec 12
                </p>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-teal-700 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {onOpenAppointmentsManager && (
                <button
                  type="button"
                  onClick={onOpenAppointmentsManager}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg px-3 py-2 transition-all border border-slate-200/60"
                  title="View Saved Appointments in Supabase"
                >
                  <Database className="w-3.5 h-3.5 text-teal-700" />
                  <span>Appointments DB</span>
                </button>
              )}

              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg px-3 py-2 transition-all border border-slate-200/60"
                title="Get Directions on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>Directions</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg px-4 py-2 transition-all shadow-sm hover:shadow-teal-700/20 active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg px-2.5 py-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 mt-3 shadow-xl">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700 hover:text-teal-700 py-1.5 border-b border-slate-50"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <a
                  href={`tel:${CLINIC_DATA.intlPhone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>Call {CLINIC_DATA.phone}</span>
                </a>

                <a
                  href={CLINIC_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  <Navigation className="w-4 h-4 text-teal-700" />
                  <span>Get Directions on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
