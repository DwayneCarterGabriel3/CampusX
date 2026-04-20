import { createClient } from '@supabase/supabase-js';

// URL from your Supabase Dashboard
const supabaseUrl = 'https://zjxreobwviauxqulcvez.supabase.co'; 

// Use the "Publishable key" (the one starting with sb_publishable)
const supabaseKey = 'sb_publishable_c68NFgJxP4f8jaj0sYsJOw_iVb6RjAJ'; 

export const supabase = createClient(supabaseUrl, supabaseKey);