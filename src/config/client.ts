import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rowkebbvlubpvsigkqtb.supabase.co';
const supabaseKey = 'your-supabase-key-here';

export const supabase = createClient(supabaseUrl, supabaseKey);
