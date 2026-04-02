import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zsemsbqamrqtiduhvxyy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZW1zYnFhbXJxdGlkdWh2eHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMTMyNzEsImV4cCI6MjA4OTc4OTI3MX0.gTLoyhvphscBBxoFlYOuZbtrRGqLkpLcpdJ5oTSPdtc"

export const supabase = createClient(supabaseUrl, supabaseKey)