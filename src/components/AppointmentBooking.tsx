import React, { useState, useEffect } from 'react';
import { CLINIC_DATA } from '../data/clinicData';
import { 
  saveAppointmentToSupabase, 
  AppointmentRecord, 
  SQL_SETUP_SCRIPT 
} from '../lib/supabase';
import { 
  Calendar, 
  Clock, 
  Phone, 
  User, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  MessageCircle, 
  ShieldCheck,
  RotateCcw,
  Building,
  Video,
  Database,
  Copy,
  Check,
  ExternalLink,
  FileCode
} from 'lucide-react';

interface AppointmentBookingProps {
  initialService?: string;
  onResetInitialService?: () => void;
  onOpenAppointmentsManager?: () => void;
}

interface BookingFormState {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredSession: string;
  visitMode: 'in-person' | 'teleconsultation';
  notes: string;
  consent: boolean;
}

interface SubmittedBooking extends BookingFormState {
  referenceId: string;
  timestamp: string;
  supabaseSaved: boolean;
  supabaseError?: string;
  needsTableSetup?: boolean;
}

export const AppointmentBooking: React.FC<AppointmentBookingProps> = ({ 
  initialService, 
  onResetInitialService,
  onOpenAppointmentsManager
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    phone: '',
    email: '',
    service: initialService || 'Diabetology & Blood Sugar Management',
    preferredDate: todayStr,
    preferredSession: 'Morning (10:00 AM – 1:00 PM)',
    visitMode: 'in-person',
    notes: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<SubmittedBooking | null>(null);
  const [showSqlSetup, setShowSqlSetup] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingFormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter patient full name';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Please provide contact mobile number';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select your preferred consultation date';
    }

    if (!formData.service) {
      newErrors.service = 'Please choose a clinical service';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please confirm acknowledgement of appointment policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `DSA-${new Date().getFullYear()}-${randomSuffix}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Prepare Supabase record
    const recordPayload: Omit<AppointmentRecord, 'id' | 'created_at'> = {
      reference_id: ref,
      full_name: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      service: formData.service,
      preferred_date: formData.preferredDate,
      preferred_session: formData.preferredSession,
      visit_mode: formData.visitMode,
      notes: formData.notes.trim() || undefined,
      status: 'pending',
    };

    // 1. Save to Supabase database
    const supabaseResult = await saveAppointmentToSupabase(recordPayload);

    // 2. Save locally as backup cache in localStorage
    try {
      const existingRaw = localStorage.getItem('dsa_appointments');
      const existing: AppointmentRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift({
        ...recordPayload,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('dsa_appointments', JSON.stringify(existing.slice(0, 50)));
    } catch {
      // ignore localStorage quota errors
    }

    const newSubmitted: SubmittedBooking = {
      ...formData,
      referenceId: ref,
      timestamp,
      supabaseSaved: supabaseResult.success,
      supabaseError: supabaseResult.error,
      needsTableSetup: supabaseResult.needsTableSetup,
    };

    setSubmittedBooking(newSubmitted);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: 'Diabetology & Blood Sugar Management',
      preferredDate: todayStr,
      preferredSession: 'Morning (10:00 AM – 1:00 PM)',
      visitMode: 'in-person',
      notes: '',
      consent: false,
    });
    setErrors({});
    if (onResetInitialService) onResetInitialService();
  };

  const copySql = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  // WhatsApp Pre-filled Link Generator
  const generateWhatsAppUrl = (booking: SubmittedBooking) => {
    const text = `Hello Dr. Swati Aggarwal Clinic Desk,\nI would like to inquire about an appointment slot.\n\n*Reference ID:* ${booking.referenceId}\n*Patient Name:* ${booking.fullName}\n*Phone:* ${booking.phone}\n*Service:* ${booking.service}\n*Mode:* ${booking.visitMode === 'in-person' ? 'Clinic In-Person (Dwarka Sec 12)' : 'Teleconsultation / Video'}\n*Date:* ${booking.preferredDate}\n*Session:* ${booking.preferredSession}\n${booking.notes ? `*Reason/Notes:* ${booking.notes}\n` : ''}\nPlease let me know the confirmed appointment timing. Thank you!`;
    return `https://wa.me/917565008500?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="book" className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-100 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Inquire For Next Available Slot
            </span>
            <span className="text-slate-300">·</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Supabase Connected</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Schedule an Appointment
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Request an in-person consultation at Sector 12 Dwarka or a follow-up teleconsultation with Dr. Swati Aggarwal. All bookings are synced directly to your clinic database.
          </p>

          {onOpenAppointmentsManager && (
            <div className="mt-4 flex items-center justify-center">
              <button
                type="button"
                onClick={onOpenAppointmentsManager}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-white border border-slate-300 hover:bg-slate-50 px-3.5 py-1.5 rounded-xl shadow-2xs transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-teal-700" />
                <span>View Appointments Database (Admin)</span>
              </button>
            </div>
          )}
        </div>

        {/* Emergency Notice Pill */}
        <div className="mb-8 p-3.5 bg-amber-50 rounded-xl border border-amber-200/80 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Medical Safety Notice:</strong> This appointment request form is for non-emergency inquiries. In case of acute chest pain, severe breathlessness, or emergency trauma, please dial 112 or visit the nearest hospital emergency room.
            </span>
          </div>
        </div>

        {/* Booking Card Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          
          {!submittedBooking ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
              
              {/* Form Heading & Mode Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif">
                    Patient Consultation Request
                  </h3>
                  <p className="text-xs text-slate-500">
                    Clinic hours: Mon–Sat 10:00 AM–1:00 PM & 5:30 PM–7:00 PM | Sun 12:00 PM–1:00 PM
                  </p>
                </div>

                {/* Mode Selector */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visitMode: 'in-person' })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      formData.visitMode === 'in-person'
                        ? 'bg-white text-teal-800 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>In-Person Clinic Visit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, visitMode: 'teleconsultation' })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      formData.visitMode === 'teleconsultation'
                        ? 'bg-white text-teal-800 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video / Follow-Up</span>
                  </button>
                </div>
              </div>

              {/* Patient Personal Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all ${
                        errors.fullName ? 'border-rose-300 ring-rose-100' : 'border-slate-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Mobile Phone (WhatsApp Active) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 transition-all ${
                        errors.phone ? 'border-rose-300 ring-rose-100' : 'border-slate-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Service & Date Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Clinical Service */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Consultation Specialty <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-800"
                  >
                    <option value="Diabetology & Blood Sugar Management">Diabetology & Blood Sugar</option>
                    <option value="Adult & Travel Vaccination Centre">Adult Vaccination Centre</option>
                    <option value="Acute Fever & Seasonal Infection">Fever & Seasonal Infections</option>
                    <option value="Hypertension & Blood Pressure">Hypertension / Blood Pressure</option>
                    <option value="Thyroid & Endocrine Health">Thyroid & Endocrine</option>
                    <option value="Gastrointestinal & Acidity">Gastro & Acidity / GERD</option>
                    <option value="Routine General Physician Checkup">General Physician Checkup</option>
                    <option value="Annual Preventive Health Review">Annual Health Review</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all"
                    />
                  </div>
                </div>

                {/* Preferred Timing Session */}
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Session <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.preferredSession}
                      onChange={(e) => setFormData({ ...formData, preferredSession: e.target.value })}
                      className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all text-slate-800"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">Morning: 10:00 AM – 1:00 PM</option>
                      <option value="Evening (5:30 PM – 7:00 PM)">Evening: 5:30 PM – 7:00 PM</option>
                      <option value="Sunday (12:00 PM – 1:00 PM)">Sunday: 12:00 PM – 1:00 PM</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Brief Reason for Visit */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brief Medical Reason / Symptoms (Optional)
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <textarea
                    rows={3}
                    placeholder="e.g. Seeking second opinion on recent fasting blood sugar report, or requesting Flu vaccination."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600/30 focus:border-teal-600 transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Confidential: Form information is only used by the clinic reception to schedule and verify your visit.
                </p>
              </div>

              {/* Acknowledgement Checkbox */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => {
                      setFormData({ ...formData, consent: e.target.checked });
                      if (errors.consent) setErrors({ ...errors, consent: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-600"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I understand that this is an <strong>appointment inquiry</strong>. The clinic reception will contact me via telephone or WhatsApp at +91 75650 08500 to confirm the specific time slot. Typical consultation fee is approx. ₹600.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-[11px] text-rose-500 font-medium pl-7">{errors.consent}</p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Recording Request...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${CLINIC_DATA.intlPhone}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-3.5 px-6 rounded-xl border border-slate-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Or Call Directly ({CLINIC_DATA.phone})</span>
                </a>
              </div>

            </form>
          ) : (
            /* Clear, Honest Confirmation State with WhatsApp Forwarding */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Inquiry Request Recorded
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-3">
                  Thank You, {submittedBooking.fullName}
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-lg mx-auto">
                  Your appointment request has been logged. Our clinic front desk will contact you shortly to confirm your specific consultation slot.
                </p>
              </div>

              {/* Inquiry Summary Box */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 max-w-xl mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-mono">
                  <span className="text-slate-500">Reference Number</span>
                  <span className="font-bold text-slate-900">{submittedBooking.referenceId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Patient Phone</span>
                  <span className="font-semibold text-slate-800">{submittedBooking.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Service</span>
                  <span className="font-semibold text-slate-800">{submittedBooking.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Preferred Date & Session</span>
                  <span className="font-semibold text-slate-800">
                    {submittedBooking.preferredDate} ({submittedBooking.preferredSession})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Consultation Type</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {submittedBooking.visitMode === 'in-person' ? 'In-Person at Dwarka Clinic' : 'Teleconsultation / Video'}
                  </span>
                </div>
                {submittedBooking.notes && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block mb-0.5">Notes:</span>
                    <span className="text-slate-700 italic">{submittedBooking.notes}</span>
                  </div>
                )}

                {/* Database Sync Status Indicator */}
                <div className="pt-2 border-t border-slate-200">
                  {submittedBooking.supabaseSaved ? (
                    <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] bg-emerald-50 p-2 rounded-lg border border-emerald-200/80">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Saved to Supabase database (Project: sfogathmwnqjnjiweqfm · appointments)</span>
                    </div>
                  ) : submittedBooking.needsTableSetup ? (
                    <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-900 text-[11px] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <Database className="w-3.5 h-3.5 text-amber-600" />
                          <span>Saved locally (Table setup pending in Supabase)</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowSqlSetup(true)}
                          className="underline font-bold text-amber-800 hover:text-amber-950"
                        >
                          View 1-Click SQL
                        </button>
                      </div>
                      <p className="text-[10px] text-amber-700">
                        Authentication succeeded! Run the SQL script once in your Supabase SQL editor to enable the appointments table.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-600 text-[11px] bg-slate-100 p-2 rounded-lg">
                      <Database className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Logged to clinic local cache (Supabase: {submittedBooking.supabaseError || 'Offline'})</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Instant WhatsApp Action Button (Never fake message claims) */}
              <div className="space-y-3 max-w-xl mx-auto">
                <a
                  href={generateWhatsAppUrl(submittedBooking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Request Details via WhatsApp to Clinic</span>
                </a>
                
                <p className="text-[11px] text-slate-500">
                  Clicking the button above opens WhatsApp with your pre-filled details addressed directly to Dr. Swati's verified clinic number (+91 75650 08500) for instant slot coordination.
                </p>
              </div>

              {/* Secondary Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`tel:${CLINIC_DATA.intlPhone}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-teal-800 bg-white border border-slate-300 py-2.5 px-4 rounded-xl"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Call Reception Now</span>
                </a>

                {onOpenAppointmentsManager && (
                  <button
                    onClick={onOpenAppointmentsManager}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-900 bg-slate-100 hover:bg-slate-200 py-2.5 px-4 rounded-xl border border-slate-200"
                  >
                    <Database className="w-3.5 h-3.5 text-teal-700" />
                    <span>View All in Supabase</span>
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 py-2.5 px-4 rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Book for Another Patient</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* SQL Setup Modal */}
      {showSqlSetup && (
        <div 
          className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowSqlSetup(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-teal-700" />
                <h4 className="font-bold text-slate-900 text-base font-serif">
                  Supabase SQL Setup for "appointments" Table
                </h4>
              </div>
              <button 
                onClick={() => setShowSqlSetup(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              Your Supabase credentials (Project: <strong>sfogathmwnqjnjiweqfm</strong>) are authenticated. Copy and run this SQL once in your Supabase SQL Editor to activate the table:
            </p>

            <div className="relative">
              <pre className="bg-slate-950 text-emerald-400 p-4 rounded-xl overflow-x-auto font-mono text-[11px] leading-relaxed max-h-60">
                {SQL_SETUP_SCRIPT}
              </pre>

              <button
                onClick={copySql}
                className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <a
                href="https://supabase.com/dashboard/project/sfogathmwnqjnjiweqfm/sql/new"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors"
              >
                <span>Open Supabase SQL Editor</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setShowSqlSetup(false)}
                className="w-full sm:w-auto text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
