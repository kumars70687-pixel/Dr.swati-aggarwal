import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  Calendar, 
  Navigation, 
  Phone, 
  Star, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Award,
  CheckCircle2,
  Syringe,
  Activity,
  HeartPulse
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Introduction & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Verified Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 border border-teal-200/80 px-2.5 py-1 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                Verified Google Maps Healthcare Practice
              </span>
              <a 
                href={CLINIC_DATA.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 px-2.5 py-1 rounded-md transition-colors"
                title="View on Google Maps"
              >
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span>4.8 Rating (72+ Reviews)</span>
              </a>
              <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <Award className="w-3.5 h-3.5 text-slate-700" />
                14+ Years Clinical Experience
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-teal-700 mb-2">
                DR. SWATI AGGARWAL · GENERAL PHYSICIAN & DIABETOLOGIST
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-serif tracking-tight leading-[1.15]">
                Evidence-Based Family Healthcare & Dedicated Diabetes Management in Dwarka
              </h1>
            </div>

            {/* Professional Summary */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Dr. Swati Aggarwal (<span className="text-slate-900 font-semibold">MBBS, Fellowship in Diabetes, ACMDC</span>) provides comprehensive outpatient medical care, specialized blood sugar stabilization, and certified cold-chain adult vaccinations at Sector 12 Dwarka. Committed to attentive consultations, rational prescriptions, and preventive well-being.
            </p>

            {/* Key Clinic Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Thorough diagnosis & patient education</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Specialized diabetology protocols</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Certified cold-chain vaccination facility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Morning & evening consultation sessions</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-300 shadow-sm transition-all"
              >
                <Navigation className="w-4 h-4 text-teal-700" />
                <span>Get Directions (Google Maps)</span>
              </a>

              <a
                href={`tel:${CLINIC_DATA.intlPhone}`}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-3.5 rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call {CLINIC_DATA.phone}</span>
              </a>
            </div>

            {/* Address & Hours Summary Bar */}
            <div className="pt-2 text-xs text-slate-500 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>105, 1st Floor, Aggarwal Arcade, Pocket 3, Sector 12 Dwarka</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Mon–Sat: 10 AM–1 PM & 5:30 PM–7 PM</span>
              </span>
            </div>

          </div>

          {/* Right Column: Verified Clinic Card with Authentic Photo */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
              
              {/* Photo Header */}
              <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/grass-cs/AABkmLcJW6i-TeqX4hRpl0909HS6CTbWdKnKrZgcRvZtVeK_beQG2IT9PklMlrO9ychFr9wToNeqVo1oElAI5oZlI9XOhNs_ZAPfRzp84ygxhUODrPUZMjVsDTY07eSXTum5VB2NxD7w3K3OejQ=w800" 
                  alt="Dr. Swati Aggarwal General Physician Diabetology and Vaccination Centre Dwarka" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                
                {/* Badge on Photo */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm border border-slate-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Google Maps Listing Photo</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-xs uppercase tracking-wider text-teal-300 font-semibold">
                    Verified Medical Centre
                  </div>
                  <div className="text-base font-bold text-white font-serif">
                    Dr. Swati Aggarwal Clinic
                  </div>
                  <div className="text-xs text-slate-200">
                    Sector 12 Dwarka, New Delhi · Rating 4.8 / 5.0
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                
                {/* Doctor Credentials Card */}
                <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/70">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-lg font-serif shrink-0 shadow-inner">
                      SA
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 text-sm font-serif">
                        Dr. Swati Aggarwal
                      </h2>
                      <p className="text-xs font-semibold text-teal-800">
                        MBBS · MBA (Hosp. Mgmt) · Fellowship in Diabetes
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Senior General Physician & Diabetologist (14+ Yrs Exp)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fast Facts Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Core Specialty</div>
                      <div className="font-semibold text-slate-800">Diabetology & GP</div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Vaccination</div>
                      <div className="font-semibold text-slate-800">Cold-Chain Unit</div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Consultation</div>
                      <div className="font-semibold text-slate-800">Morning & Evening</div>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-500 font-medium">Patient Rec.</div>
                      <div className="font-semibold text-emerald-700">96% Positive</div>
                    </div>
                  </div>
                </div>

                {/* Quick Booking CTA */}
                <div className="pt-1">
                  <button
                    onClick={onOpenBooking}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs py-3 rounded-lg transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>Inquire for Next Available Slot</span>
                  </button>
                </div>

                <div className="text-center">
                  <a
                    href={CLINIC_DATA.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-teal-700 hover:text-teal-800 font-medium underline underline-offset-2"
                  >
                    View Official Google Maps Business Profile →
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
