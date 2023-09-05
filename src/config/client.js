import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rowkebbvlubpvsigkqtb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvd2tlYmJ2bHVicHZzaWdrcXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM4NTcxNzUsImV4cCI6MjAwOTQzMzE3NX0.EJ4HYYLQFk93QgtUJAADM4Xqv5TUyVXEQXoiifiBSq4'
export const supabase = createClient(supabaseUrl, supabaseKey);