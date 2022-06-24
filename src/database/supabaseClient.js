import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ijwzzsubrtzghdxzqmts.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqd3p6c3VicnR6Z2hkeHpxbXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYwNzc4OTgsImV4cCI6MTk3MTY1Mzg5OH0.GPOBhrQybDzBnT-m-CDWx2uMwuXcCN1OEO2h7P71fUU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
