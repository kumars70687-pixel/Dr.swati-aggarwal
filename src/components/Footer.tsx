import React, { useState } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  HeartPulse, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldAlert, 
  ExternalLink, 
  Lock, 
  FileText, 
  X,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<'privacy' | 'disclaimer' | null>(null);

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
        
        {/* Urgent Emergency Warning Banner */}
        <div className="bg-rose-950/80 border-b border-rose-900/60 py-3 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-rose-200">
            <div className="flex items-center gap-2 text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Emergency Notice:</strong> This website is for scheduling appointments and general clinic information. If you have severe chest pain, shortness of breath, sudden numbness, or life-threatening symptoms, dial 112 immediately or visit the nearest hospital emergency room.
              </span>
            </div>
            <a
              href="tel:112"
              className="shrink-0 bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1 rounded text-xs transition-colors"
            >
              Call 112
            </a>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Column 1: Clinic Brand & Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base font-serif">
                    Dr. Swati Aggarwal
                  </h3>
                  <p className="text-[11px] text-teal-400 font-medium">
                    MBBS · Fellowship in Diabetes · ACMDC
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-relaxed text-xs">
                General Physician, Diabetologist & Vaccination Centre located at Aggarwal Arcade, Pocket 3, Sector 12 Dwarka, New Delhi. Dedicated to patient-centric medical consultations, rational prescribing, and preventive metabolic care.
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                  Delhi Medical Council
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                  14+ Years Clinical Exp.
                </span>
                <span className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                  Cold-Chain Vaccination
                </span>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#about" className="hover:text-teal-400 transition-colors">About Dr. Swati Aggarwal</a>
                </li>
                <li>
                  <a href="#services" className="hover:text-teal-400 transition-colors">Specialties & Treatments</a>
                </li>
                <li>
                  <a href="#why-us" className="hover:text-teal-400 transition-colors">Why Choose This Practice</a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-teal-400 transition-colors">Clinic Photo Gallery</a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-teal-400 transition-colors">Patient Stories & Reviews</a>
                </li>
                <li>
                  <a href="#book" className="hover:text-teal-400 transition-colors">Book an Appointment</a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-teal-400 transition-colors">Location & Consultation Hours</a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Timings */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif">
                Dwarka Clinic Location
              </h4>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Shop No. 105, 1st Floor, Aggarwal Arcade, Pocket 3, Sector 12 Dwarka, New Delhi 110075 (Above Peter England)</span>
                </p>

                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <a href={`tel:${CLINIC_DATA.intlPhone}`} className="hover:text-white font-mono">
                    {CLINIC_DATA.phone}
                  </a>
                </p>

                <p className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={CLINIC_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    WhatsApp: +91 75650 08500
                  </a>
                </p>

                <p className="flex items-start gap-2 pt-1 border-t border-slate-900">
                  <Clock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>Mon–Sat: 10:00 AM–1:00 PM & 5:30 PM–7:00 PM<br/>Sun: 12:00 PM–1:00 PM (Prior appointment)</span>
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold"
                >
                  <span>Google Maps Business Listing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Subfooter: Legal, Policies, Copyright */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Dr. Swati Aggarwal General Physician Diabetology and Vaccination Centre. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                Patient Privacy Policy
              </button>
              <span>·</span>
              <button
                onClick={() => setModalType('disclaimer')}
                className="hover:text-slate-300 transition-colors underline underline-offset-2"
              >
                Medical Disclaimer
              </button>
              <span>·</span>
              <a
                href={CLINIC_DATA.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors"
              >
                Verified Listing Source
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {modalType === 'privacy' && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalType(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto text-slate-800 text-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-base font-serif text-slate-900">Patient Privacy Policy</h3>
              </div>
              <button 
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 leading-relaxed text-slate-600">
              <p>
                <strong>Information Collected:</strong> When you use our appointment inquiry form, we collect only necessary contact details (Name, Phone Number, Service of Interest, and Preferred Timing) required for scheduling your clinic visit.
              </p>
              <p>
                <strong>Use of Data:</strong> Information submitted is strictly used by the clinic reception team of Dr. Swati Aggarwal to verify your consultation and coordinate appointment timings via phone call or WhatsApp.
              </p>
              <p>
                <strong>No Third-Party Sharing:</strong> We do not sell, rent, or disclose your personal or medical contact details to third-party marketing companies, insurance aggregators, or brokers.
              </p>
              <p>
                <strong>Confidentiality:</strong> All interactions comply with ethical medical guidelines and applicable data protection regulations in India.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setModalType(null)}
                className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Medical Safety Disclaimer Modal */}
      {modalType === 'disclaimer' && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setModalType(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 max-h-[85vh] overflow-y-auto text-slate-800 text-xs shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                <h3 className="font-bold text-base font-serif text-slate-900">Medical Safety & Practice Disclaimer</h3>
              </div>
              <button 
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 leading-relaxed text-slate-600">
              <p>
                <strong>Informational Purpose Only:</strong> The material and information contained on this website are for general educational, appointment scheduling, and informational purposes only. It is not intended to replace formal professional diagnosis, examination, or personalized medical treatment.
              </p>
              <p>
                <strong>Doctor-Patient Relationship:</strong> Submitting an online appointment inquiry does not in itself constitute a formal doctor-patient relationship. A formal relationship begins upon completion of a clinical consultation.
              </p>
              <p>
                <strong>No Automated Diagnosis:</strong> This platform does not provide automated symptom diagnosis, prescription issuance, or algorithm-driven medical treatments.
              </p>
              <p>
                <strong>Emergency Procedures:</strong> In case of critical health emergencies (such as sudden chest pain, severe shortness of breath, sudden numbness, or anaphylaxis), do not wait for an online response. Call national emergency services (112) or go immediately to the nearest hospital casualty department.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setModalType(null)}
                className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-lg text-xs"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
