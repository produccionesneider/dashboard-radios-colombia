import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://pqfjwjrfoxzxybuzwior.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZmp3anJmb3h6eHlidXp3aW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MTA1NzksImV4cCI6MjEwMTA4NjU3OX0.__6kHP3m1dQeykzYVQN7JCvGP105f8AFqTWV97fwfuQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
