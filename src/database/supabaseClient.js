import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dfaopjnyuohnqtbbbhof.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmYW9wam55dW9obnF0YmJiaG9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTYwNzU1ODQsImV4cCI6MTk3MTY1MTU4NH0.m9QQiSqt43idZLEU8XniQg_mArhiUsJqVk922t8jG2U"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
