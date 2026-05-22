-- APPI Safe Migration Script
-- This script safely migrates existing database to new APPI schema
-- Run AFTER analyzing current database with analyze-current-database.sql

-- =====================================================
-- SAFETY CHECKS AND BACKUP RECOMMENDATIONS
-- =====================================================

-- Check if we're in the right environment
DO $$
BEGIN
    IF current_database() = 'postgres' THEN
        RAISE EXCEPTION 'Do not run this on the postgres database!';
    END IF;
END $$;

-- =====================================================
-- STEP 1: BACKUP EXISTING DATA (if any)
-- =====================================================

-- Create backup schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS backup_$(date +%Y%m%d);

-- Backup existing tables that might conflict
DO $$
DECLARE
    table_name text;
    backup_schema text := 'backup_' || to_char(current_date, 'YYYYMMDD');
BEGIN
    -- List of tables to backup
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'users', 'profiles', 'events', 'publications', 
            'political_parties', 'countries', 'content_categories'
        )
    LOOP
        EXECUTE format('CREATE TABLE %I.%I AS SELECT * FROM public.%I', 
                      backup_schema, table_name, table_name);
        RAISE NOTICE 'Backed up table: %', table_name;
    END LOOP;
END $$;

-- =====================================================
-- STEP 2: DROP EXISTING CONFLICTING OBJECTS
-- =====================================================

-- Drop existing tables that will be recreated
DO $$
DECLARE
    table_name text;
BEGIN
    FOR table_name IN 
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN (
            'users', 'profiles', 'events', 'publications', 
            'political_parties', 'countries', 'content_categories',
            'media_files', 'news_articles', 'event_registrations',
            'internal_reports', 'draft_declarations', 'training_materials',
            'toolkits', 'party_engagement', 'reform_progress',
            'scheduled_activities', 'website_analytics',
            'newsletter_subscriptions', 'contact_submissions',
            'system_settings', 'audit_log', 'user_permissions'
        )
    LOOP
        EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', table_name);
        RAISE NOTICE 'Dropped table: %', table_name;
    END LOOP;
END $$;

-- Drop existing types/enums
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS user_status CASCADE;
DROP TYPE IF EXISTS event_type CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop existing views
DROP VIEW IF EXISTS user_statistics CASCADE;
DROP VIEW IF EXISTS event_statistics CASCADE;
DROP VIEW IF EXISTS engagement_metrics CASCADE;

-- =====================================================
-- STEP 3: APPLY NEW SCHEMA
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create new types
CREATE TYPE user_role AS ENUM (
  'admin', 'party_focal_person', 'fellow', 'platform_collaborator', 'observer', 'public'
);

CREATE TYPE user_status AS ENUM (
  'active', 'inactive', 'pending', 'suspended', 'verified'
);

CREATE TYPE event_type AS ENUM (
  'summit', 'workshop', 'conference', 'training', 'meeting', 'webinar', 'other'
);

-- Create countries table
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE,
  flag_emoji VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create political parties table
CREATE TABLE political_parties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  acronym VARCHAR(50),
  country_id INTEGER REFERENCES countries(id),
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  founding_date DATE,
  ideology VARCHAR(100),
  status user_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'public',
  status user_status DEFAULT 'pending',
  political_party_id UUID REFERENCES political_parties(id),
  position VARCHAR(100),
  phone VARCHAR(50),
  country_id INTEGER REFERENCES countries(id),
  city VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content categories
CREATE TABLE content_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES content_categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create publications table
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  category_id UUID REFERENCES content_categories(id),
  author_id UUID REFERENCES users(id),
  featured_image_url TEXT,
  file_url TEXT,
  file_size INTEGER,
  file_type VARCHAR(50),
  status user_status DEFAULT 'pending',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  event_type event_type NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255),
  venue_address TEXT,
  country_id INTEGER REFERENCES countries(id),
  capacity INTEGER,
  registration_required BOOLEAN DEFAULT TRUE,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  featured_image_url TEXT,
  status user_status DEFAULT 'active',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create member portal tables
CREATE TABLE internal_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  category_id UUID REFERENCES content_categories(id),
  access_level user_role NOT NULL,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE training_materials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  file_url TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  difficulty_level VARCHAR(50),
  access_level user_role NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE toolkits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  file_url TEXT,
  version VARCHAR(20) DEFAULT '1.0',
  access_level user_role NOT NULL,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create engagement tracking tables
CREATE TABLE party_engagement (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  political_party_id UUID REFERENCES political_parties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  engagement_date DATE NOT NULL,
  events_attended INTEGER DEFAULT 0,
  publications_read INTEGER DEFAULT 0,
  training_completed INTEGER DEFAULT 0,
  platform_usage_minutes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE reform_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  political_party_id UUID REFERENCES political_parties(id) ON DELETE CASCADE,
  reform_area VARCHAR(100) NOT NULL,
  current_status VARCHAR(100),
  progress_percentage INTEGER DEFAULT 0,
  challenges TEXT,
  next_steps TEXT,
  target_date DATE,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- STEP 4: RESTORE DATA (if needed)
-- =====================================================

-- This section can be customized based on analysis results
-- For now, we'll just insert the sample data

-- Insert sample countries
INSERT INTO countries (name, code, flag_emoji) VALUES
('Ghana', 'GHA', '🇬🇭'),
('Nigeria', 'NGA', '🇳🇬'),
('Kenya', 'KEN', '🇰🇪'),
('South Africa', 'ZAF', '🇿🇦'),
('Ethiopia', 'ETH', '🇪🇹'),
('Tanzania', 'TZA', '🇹🇿'),
('Uganda', 'UGA', '🇺🇬'),
('Rwanda', 'RWA', '🇷🇼'),
('Senegal', 'SEN', '🇸🇳'),
('Morocco', 'MAR', '🇲🇦');

-- Insert sample content categories
INSERT INTO content_categories (name, slug, description) VALUES
('Political Reform', 'political-reform', 'Content related to political reform initiatives'),
('Democratic Governance', 'democratic-governance', 'Democratic governance materials'),
('Capacity Building', 'capacity-building', 'Training and capacity building resources'),
('Research & Publications', 'research-publications', 'Research papers and publications'),
('Events & Summits', 'events-summits', 'Event announcements and summit information');

-- =====================================================
-- STEP 5: CREATE INDEXES AND SECURITY
-- =====================================================

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_publications_slug ON publications(slug);
CREATE INDEX idx_events_slug ON events(slug);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE political_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_reports ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Public can view published publications" ON publications
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (status = 'active');

-- =====================================================
-- STEP 6: VERIFICATION
-- =====================================================

-- Verify the migration
SELECT 
    'MIGRATION COMPLETE' as status,
    COUNT(*) as tables_created,
    current_database() as database_name
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN (
        'users', 'political_parties', 'countries', 'content_categories',
        'publications', 'events', 'internal_reports', 'training_materials',
        'toolkits', 'party_engagement', 'reform_progress'
    );

-- Show backup information
SELECT 
    'BACKUP CREATED' as backup_status,
    schemaname as backup_schema,
    COUNT(*) as backed_up_tables
FROM pg_tables 
WHERE schemaname LIKE 'backup_%'
GROUP BY schemaname;
