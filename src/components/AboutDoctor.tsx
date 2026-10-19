import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  FileText,
  UserCheck,
  Stethoscope,
  HeartHandshake,
  BookOpen
} from 'lucide-react';

interface AboutDoctorProps {
  onOpenBooking: () => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({ onOpenBooking }) => {
  const { doctor } = CLINIC_DATA;

  return (
    <section id="about" className="py-16 lg:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Physician Profile & Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Meet Dr. Swati Aggarwal
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A trusted family physician and diabetologist in Dwarka, known for attentive listening, clear diagnostic counseling, and evidence-based clinical care.
          </p>
        </div>

        {/* Profile Card & Detailed Background Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Doctor Identity & Credentials Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
              
              {/* Doctor Avatar & Identity Badge */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 text-white flex flex-col items-center justify-center font-bold text-3xl font-serif shadow-lg shadow-teal-900/10">
                    <span>SA</span>
                    <Stethoscope className="w-4 h-4 text-teal-300 mt-1 opacity-80" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1.5 rounded-full shadow-md" title="Active & Verified Practice">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-center sm:text-left space-y-1">
                  <div className="inline-block text-[11px] font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded">
                    Delhi Medical Council Registered
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {doctor.fullName}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700">
                    {doctor.specialty}
                  </p>
                  <p className="text-xs text-slate-500">
                    Practicing in Dwarka Sector 12, New Delhi
                  </p>
                </div>
              </div>

              {/* Verified Qualifications List */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-teal-700" />
                  <span>Academic Qualifications & Fellowships</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">MBBS</span>
                      <p className="text-slate-500 text-[11px]">Bachelor of Medicine & Bachelor of Surgery</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Fellowship in Diabetes</span>
                      <p className="text-slate-500 text-[11px]">Specialized advanced clinical training in diabetology</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">ACMDC Certification</span>
                      <p className="text-slate-500 text-[11px]">Advance Certificate Course in Prevention & Management of Diabetes & Cardiovascular Disease</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">MBA in Hospital Management</span>
                      <p className="text-slate-500 text-[11px]">Healthcare administration, hygiene quality, and clinical ethics</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Details */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Clinical Experience</span>
                  <span className="font-bold text-slate-900">14+ Years</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Consultation Fee</span>
                  <span className="font-bold text-teal-800">Approx. ₹600</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Languages Spoken</span>
                  <span className="font-bold text-slate-900">English, Hindi</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">Practicing Since</span>
                  <span className="font-bold text-slate-900">Over a decade in Delhi NCR</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Consultation with Dr. Swati</span>
              </button>

            </div>
          </div>

          {/* Right Column: Narrative, Philosophy & Practice Highlights */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Professional Background */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 font-serif">
                Professional Background & Clinical Focus
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Dr. Swati Aggarwal has dedicated more than 14 years to providing dependable, patient-first general healthcare. Operating out of Aggarwal Arcade in Dwarka Sector 12, she treats patients across all age brackets suffering from acute infections, seasonal illnesses, and chronic health challenges.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Her postgraduate focus in diabetology via the specialized Fellowship in Diabetes and the Advance Certificate Course in Prevention & Management of Diabetes & Cardiovascular Disease (ACMDC) gives patients access to hospital-grade diabetes protocols in a warm neighborhood setting.
              </p>
            </div>

            {/* Core Practice Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Dedicated Listening & Counseling
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Patients consistently highlight that Dr. Swati gives ample consultation time, listening attentively to symptoms and medical histories without rushing.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Rational Prescriptions
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Care is strictly evidence-based. No redundant medicines, unneeded antibiotics, or excessive diagnostics—only what is genuinely necessary for your recovery.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Lifestyle & Diet Guidance
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Empowering patients with clear guidance on food choices, exercise, daily blood glucose tracking, and salt regulation to manage chronic conditions sustainably.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  High Patient Trust
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  With a 96% patient recommendation rate and 4.8★ rating on Google Maps and verified medical platforms, families in Dwarka rely on her care.
                </p>
              </div>
            </div>

            {/* Doctor's Stated Philosophy Quote Box */}
            <div className="border-l-4 border-teal-600 bg-teal-50/60 p-5 rounded-r-xl">
              <div className="text-xs font-bold text-teal-900 uppercase tracking-wide mb-1">
                Clinical Philosophy
              </div>
              <p className="text-sm italic text-slate-700 leading-relaxed">
                "{doctor.philosophy}"
              </p>
              <div className="mt-2 text-xs font-semibold text-teal-800">
                — Dr. Swati Aggarwal, MBBS, Fellowship in Diabetes
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
