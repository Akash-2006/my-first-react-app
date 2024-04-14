import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hwxdfwwgvnrfvtnsyogv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3eGRmd3dndm5yZnZ0bnN5b2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NDc0NjAsImV4cCI6MjAyMzMyMzQ2MH0.KDVkZjmRv8ii3XuuleFOcDh95lcG6kak3i8b78nJWNQ'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;