import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://<tuo-progetto>.supabase.co'; // Sostituisci con l'URL del tuo progetto
const supabaseKey = '<chiave-pubblica>'; // Sostituisci con la tua chiave pubblica (disponibile nella dashboard)

export const supabase = createClient(supabaseUrl, supabaseKey);