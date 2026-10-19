import React from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  MessageCircle, 
  Compass, 
  Train, 
  Car, 
  Accessibility, 
  ExternalLink,
  Building
} from 'lucide-react';

export const ContactDirections: React.FC = () => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-white border-t border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
            Visit Our Dwarka Clinic
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Clinic Location & Consultation Hours
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Conveniently situated at Aggarwal Arcade, Pocket 3, Sector 12 Dwarka with direct elevator access and ample parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards, Timing Table & Transit */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Landmark Card */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base font-serif">
                    Clinic Address
                  </h3>
                  <p className="text-sm text-slate-700 font-medium mt-1">
                    {CLINIC_DATA.address.shopNo}, {CLINIC_DATA.address.building}
                  </p>
                  <p className="text-xs text-teal-800 font-semibold mt-0.5">
                    Landmark: {CLINIC_DATA.address.landmark}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {CLINIC_DATA.address.area}, {CLINIC_DATA.address.city}, {CLINIC_DATA.address.state} - {CLINIC_DATA.address.pincode}
                  </p>
                </div>
              </div>

              {/* Direct Maps CTA Button */}
              <div className="pt-2">
                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-all shadow-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps App (Directions)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>

            {/* Quick Contact Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Card */}
              <a
                href={`tel:${CLINIC_DATA.intlPhone}`}
                className="bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/90 p-4 transition-colors group flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Call Reception
                  </div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    {CLINIC_DATA.phone}
                  </div>
                  <div className="text-[11px] text-teal-700 font-medium">Click to call</div>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href={CLINIC_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200/90 p-4 transition-colors group flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    WhatsApp Chat
                  </div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">
                    +91 75650 08500
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">Instant messaging</div>
                </div>
              </a>

            </div>

            {/* Timings Table */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-700" />
                <h3 className="font-bold text-slate-900 text-base font-serif">
                  Consultation Schedule
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Monday - Saturday */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>Monday to Saturday</span>
                    <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                      Open Daily
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Morning Session</span>
                      <span className="font-semibold text-slate-800">10:00 AM – 1:00 PM</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Evening Session</span>
                      <span className="font-semibold text-slate-800">5:30 PM – 7:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Sunday */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex justify-between items-center font-bold text-slate-900">
                    <span>Sunday</span>
                    <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      Appointment Only
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <span className="text-[10px] text-slate-400 block uppercase">Consultation Window</span>
                    <span className="font-semibold text-slate-800">12:00 PM – 1:00 PM</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Please book slot prior to arrival.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Reach / Transit Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                <Train className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">By Metro</div>
                  <div className="text-slate-500 text-[11px]">Dwarka Sector 12 (Blue Line) ~600m</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                <Car className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Parking</div>
                  <div className="text-slate-500 text-[11px]">Ample arcade surface parking</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                <Accessibility className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-800">Accessibility</div>
                  <div className="text-slate-500 text-[11px]">Elevator & wide staircase</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive View & Navigation Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
              
              {/* Map Header */}
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-300">
                    <Compass className="w-4 h-4" />
                    <span>Exact Geographical Coordinates</span>
                  </div>
                  <div className="text-sm font-bold font-serif">
                    Sector 12 Dwarka, New Delhi (28.5957° N, 77.0488° E)
                  </div>
                </div>

                <a
                  href={CLINIC_DATA.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-teal-600 hover:bg-teal-500 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Responsive Map Embed */}
              <div className="relative aspect-4/3 sm:aspect-16/10 w-full bg-slate-200">
                <iframe
                  title="Dr. Swati Aggarwal Clinic Location Map"
                  src="https://maps.google.com/maps?q=28.5957432,77.0487886+(Dr.+Swati+Aggarwal+General+Physician+Diabetology+Centre)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Landmark Guidance Footer */}
              <div className="p-4 bg-white border-t border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <Building className="w-4 h-4 text-teal-700" />
                  <span>Finding the Clinic inside Aggarwal Arcade:</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Enter Aggarwal Arcade in Pocket 3, Sector 12 Dwarka (located right near Ashirwad Chowk). The clinic is on the <strong>First Floor (Shop No. 105)</strong>, positioned directly above the Peter England showroom. Take the lift or central staircase up to Floor 1.
                </p>
                <div className="pt-2">
                  <a
                    href={CLINIC_DATA.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:text-teal-900 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Click here to navigate with turn-by-turn directions →</span>
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
