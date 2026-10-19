import { createClient } from '@supabase/supabase-js';

// Fallback to the user's provided credentials if env vars are unset
export const SUPABASE_URL = 
  import.meta.env.VITE_SUPABASE_URL || 'https://sfogathmwnqjnjiweqfm.supabase.co';

export const SUPABASE_ANON_KEY = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_-Pbg6vZPlmsp20vVZb0bbA_IGtoqWMV';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

export interface AppointmentRecord {
  id?: string;
  reference_id: string;
  full_name: string;
  phone: string;
  email?: string | null;
  service: string;
  preferred_date: string;
  preferred_session: string;
  visit_mode: string;
  notes?: string | null;
  status: string;
  created_at?: string;
}

export const SQL_SETUP_SCRIPT = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/sfogathmwnqjnjiweqfm/sql/new)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_session TEXT NOT NULL,
  visit_mode TEXT NOT NULL DEFAULT 'in-person',
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow visitors to insert appointment booking requests
DROP POLICY IF EXISTS "Allow anonymous appointment booking" ON public.appointments;
CREATE POLICY "Allow anonymous appointment booking"
ON public.appointments FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading appointments for administration & status checks
DROP POLICY IF EXISTS "Allow reading appointments" ON public.appointments;
CREATE POLICY "Allow reading appointments"
ON public.appointments FOR SELECT
TO anon, authenticated
USING (true);

-- Allow updating appointment status (e.g., confirmed, completed)
DROP POLICY IF EXISTS "Allow updating appointments" ON public.appointments;
CREATE POLICY "Allow updating appointments"
ON public.appointments FOR UPDATE
TO anon, authenticated
USING (true);
`;

/**
 * Inserts a new appointment record into Supabase
 */
export async function saveAppointmentToSupabase(record: Omit<AppointmentRecord, 'id' | 'created_at'>): Promise<{
  success: boolean;
  data?: AppointmentRecord;
  error?: string;
  needsTableSetup?: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          reference_id: record.reference_id,
          full_name: record.full_name,
          phone: record.phone,
          email: record.email || null,
          service: record.service,
          preferred_date: record.preferred_date,
          preferred_session: record.preferred_session,
          visit_mode: record.visit_mode,
          notes: record.notes || null,
          status: record.status || 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      // Check if table missing (PGRST205 / 42P01)
      const isMissingTable = 
        error.code === 'PGRST205' || 
        error.message?.includes('schema cache') || 
        error.message?.includes('relation "public.appointments" does not exist');

      return {
        success: false,
        error: error.message,
        needsTableSetup: isMissingTable,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown database error';
    return {
      success: false,
      error: message,
    };
  }
}

/**
 * Fetches all appointments saved in Supabase
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  data: AppointmentRecord[];
  error?: string;
  needsTableSetup?: boolean;
}> {
  try {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      const isMissingTable = 
        error.code === 'PGRST205' || 
        error.message?.includes('schema cache');
      return {
        data: [],
        error: error.message,
        needsTableSetup: isMissingTable,
      };
    }

    return { data: data || [] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { data: [], error: message };
  }
}

/**
 * Checks connection status to Supabase
 */
export async function checkSupabaseConnection(): Promise<{
  connected: boolean;
  tableReady: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.from('appointments').select('id').limit(1);
    if (!error) {
      return {
        connected: true,
        tableReady: true,
        message: 'Connected to Supabase. appointments table is active.',
      };
    }

    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      return {
        connected: true,
        tableReady: false,
        message: 'Connected to Supabase project, but "appointments" table has not been created yet in SQL editor.',
      };
    }

    return {
      connected: false,
      tableReady: false,
      message: error.message,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed';
    return {
      connected: false,
      tableReady: false,
      message,
    };
  }
}
