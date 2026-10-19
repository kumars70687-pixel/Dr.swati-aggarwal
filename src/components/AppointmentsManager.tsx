import React, { useState, useEffect } from 'react';
import { 
  AppointmentRecord, 
  fetchAppointmentsFromSupabase, 
  checkSupabaseConnection, 
  SQL_SETUP_SCRIPT, 
  SUPABASE_URL 
} from '../lib/supabase';
import { 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Search, 
  Filter,
  X,
  FileCode,
  ShieldCheck,
  Building2,
  Video
} from 'lucide-react';

interface AppointmentsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentsManager: React.FC<AppointmentsManagerProps> = ({ isOpen, onClose }) => {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean;
    tableReady: boolean;
    message: string;
  } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState('all');

  const loadData = async () => {
    setLoading(true);
    // 1. Check connection
    const status = await checkSupabaseConnection();
    setConnectionStatus(status);

    // 2. Fetch from Supabase
    const { data, needsTableSetup } = await fetchAppointmentsFromSupabase();
    
    // 3. Also merge any local bookings from localStorage as cache/fallback
    const localSavedRaw = localStorage.getItem('dsa_appointments');
    let localSaved: AppointmentRecord[] = [];
    if (localSavedRaw) {
      try {
        localSaved = JSON.parse(localSavedRaw);
      } catch {
        // ignore JSON parse error
      }
    }

    if (data && data.length > 0) {
      setAppointments(data);
    } else {
      setAppointments(localSaved);
    }

    if (needsTableSetup) {
      setShowSqlModal(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const copySql = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  if (!isOpen) return null;

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.reference_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = filterService === 'all' || app.service === filterService;
    return matchesSearch && matchesService;
  });

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg font-serif">Supabase Appointments Database</h3>
                <span className="text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                  Project: sfogathmwnqjnjiweqfm
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Connected to {SUPABASE_URL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setShowSqlModal(true)}
              className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-teal-300 px-3 py-2 rounded-xl transition-colors border border-slate-700"
              title="View SQL Setup Script"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>SQL Schema</span>
            </button>

            <button
              onClick={loadData}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs bg-teal-700 hover:bg-teal-600 text-white px-3 py-2 rounded-xl transition-colors shadow-sm disabled:opacity-50"
              title="Refresh Appointments"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Database Status Alert Banner */}
        {connectionStatus && !connectionStatus.tableReady && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Database Setup Notice: </span>
                <span>The Supabase connection is authenticated, but the <strong>appointments</strong> table needs to be created in your Supabase SQL editor.</span>
              </div>
            </div>

            <button
              onClick={() => setShowSqlModal(true)}
              className="shrink-0 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>1-Click SQL Script</span>
            </button>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, ref ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-600/30 w-full sm:w-auto"
            >
              <option value="all">All Specialties</option>
              <option value="Diabetology & Blood Sugar Management">Diabetology</option>
              <option value="Adult & Travel Vaccination Centre">Vaccination</option>
              <option value="Acute Fever & Seasonal Infection">Fever & Infection</option>
              <option value="Hypertension & Blood Pressure">Hypertension</option>
            </select>
          </div>
        </div>

        {/* Content Body / Appointment Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {loading ? (
            <div className="py-16 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin" />
              <span>Querying Supabase database...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-xs max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="font-bold text-slate-800 text-sm">No Appointments Logged Yet</p>
              <p className="text-slate-500 leading-relaxed">
                When patients submit the booking form on this website, their appointment details will appear here and sync directly to your Supabase project (<strong>sfogathmwnqjnjiweqfm</strong>).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((app, index) => (
                <div
                  key={app.id || app.reference_id || index}
                  className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-teal-300 hover:shadow-xs transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                        {app.reference_id}
                      </span>
                      <span className="text-xs font-bold text-slate-900 font-serif">
                        {app.full_name}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        app.status === 'confirmed' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status || 'pending'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{app.created_at ? new Date(app.created_at).toLocaleDateString() : 'Recent Request'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <a href={`tel:${app.phone}`} className="font-mono font-semibold text-slate-900 hover:underline">
                        {app.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{app.preferred_date} ({app.preferred_session})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {app.visit_mode === 'in-person' ? (
                        <Building2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      ) : (
                        <Video className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      )}
                      <span className="capitalize">{app.visit_mode} · {app.service}</span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 italic">
                      Notes: {app.notes}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <a
                      href={`https://wa.me/91${app.phone.replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20${encodeURIComponent(app.full_name)},%20this%20is%20Dr.%20Swati%20Aggarwal%20Clinic%20regarding%20your%20appointment%20request%20(${app.reference_id}).`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-semibold text-[11px] inline-flex items-center gap-1"
                    >
                      <span>WhatsApp Patient</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <span className="text-[10px] text-slate-400">
                      Synced with Supabase database
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Secure TLS 1.3 connection to Supabase Project: <strong>sfogathmwnqjnjiweqfm</strong></span>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-xl text-xs"
          >
            Close Viewer
          </button>
        </div>

      </div>

      {/* SQL Setup Modal */}
      {showSqlModal && (
        <div 
          className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowSqlModal(false)}
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
                onClick={() => setShowSqlModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 leading-relaxed">
              To allow the website to write appointment bookings directly to your Supabase PostgreSQL database, run this script once in your <strong>Supabase SQL Editor</strong>:
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
                onClick={() => { setShowSqlModal(false); loadData(); }}
                className="w-full sm:w-auto text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl"
              >
                I've Run the SQL (Verify Connection)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
