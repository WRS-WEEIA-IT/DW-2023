import { createClient } from '@supabase/supabase-js';

export const anonSupabaseAPIKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpvc2F5b3Fybmd2cnlkbmV4YWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NzUxOTAsImV4cCI6MjA1MjI1MTE5MH0.WGG3bQF3L37yL9HpMEJ6MkjiVkYOof0nzrzgjwUjyx0';
export const dbUrl = 'https://zosayoqrngvrydnexaek.supabase.co';

export const supabase = createClient(dbUrl, anonSupabaseAPIKey);
export const isInfoHidden = false;
