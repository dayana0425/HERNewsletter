import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY!;

if (!supabaseUrl) {
  throw new Error('You need to provide a SUPABASE_URL env variable');
}

if (!supabaseKey) {
  throw new Error('You need to provide a SUPABASE_KEY env variable');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
