import { createClient } from '@supabase/supabase-js';

export const anonSupabaseAPIKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const dbUrl = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(dbUrl, anonSupabaseAPIKey);
export const isInfoHidden = false;
