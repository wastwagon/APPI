import { createClient } from '@supabase/supabase-js'

// Get environment variables with validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'present' : 'missing',
    key: supabaseAnonKey ? 'present' : 'missing'
  })
}

// Client-side Supabase client with error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing server-side Supabase environment variables')
    throw new Error('Supabase environment variables not configured')
  }
  
  return createClient(supabaseUrl, serviceRoleKey)
}

// Admin client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
)

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'admin' | 'party_rep' | 'fellow' | 'observer' | 'public'
          party_affiliation: string | null
          country: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'party_rep' | 'fellow' | 'observer' | 'public'
          party_affiliation?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'party_rep' | 'fellow' | 'observer' | 'public'
          party_affiliation?: string | null
          country?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_type: 'summit' | 'dialogue' | 'workshop' | 'conference' | 'meeting'
          start_date: string
          end_date: string
          location: string | null
          country: string | null
          max_participants: number | null
          registration_deadline: string | null
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          featured_image: string | null
          agenda: any | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_type: 'summit' | 'dialogue' | 'workshop' | 'conference' | 'meeting'
          start_date: string
          end_date: string
          location?: string | null
          country?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          featured_image?: string | null
          agenda?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_type?: 'summit' | 'dialogue' | 'workshop' | 'conference' | 'meeting'
          start_date?: string
          end_date?: string
          location?: string | null
          country?: string | null
          max_participants?: number | null
          registration_deadline?: string | null
          status?: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
          featured_image?: string | null
          agenda?: any | null
          created_at?: string
        }
      }
      publications: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          content: string | null
          excerpt: string | null
          type: 'policy_brief' | 'report' | 'toolkit' | 'research' | 'news'
          category: string | null
          language: 'en' | 'fr' | 'pt' | 'es' | 'ar' | 'am' | 'sw'
          author_id: string | null
          pdf_url: string | null
          cover_image: string | null
          tags: string[] | null
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          content?: string | null
          excerpt?: string | null
          type: 'policy_brief' | 'report' | 'toolkit' | 'research' | 'news'
          category?: string | null
          language?: 'en' | 'fr' | 'pt' | 'es' | 'ar' | 'am' | 'sw'
          author_id?: string | null
          pdf_url?: string | null
          cover_image?: string | null
          tags?: string[] | null
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          content?: string | null
          excerpt?: string | null
          type?: 'policy_brief' | 'report' | 'toolkit' | 'research' | 'news'
          category?: string | null
          language?: 'en' | 'fr' | 'pt' | 'es' | 'ar' | 'am' | 'sw'
          author_id?: string | null
          pdf_url?: string | null
          cover_image?: string | null
          tags?: string[] | null
          published_at?: string | null
          created_at?: string
        }
      }
    }
  }
}
