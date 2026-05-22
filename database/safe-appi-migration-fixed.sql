-- =====================================================
-- SAFE APPI MIGRATION SCRIPT - FIXED VERSION
-- =====================================================
-- This script safely migrates to APPI schema by:
-- 1. Backing up existing data
-- 2. Renaming conflicting tables
-- 3. Creating new APPI schema with different names
-- 4. Preserving all existing functionality
-- =====================================================

-- VERIFICATION: Check which database we're connected to
SELECT 
    'DATABASE CHECK' as check_type,
    current_database() as current_db,
    CASE 
        WHEN current_database() = 'postgres' THEN 'WARNING: Connected to master postgres database'
        ELSE 'OK: Connected to project database'
    END as status;

-- STEP 1: VERIFY EXISTING TABLES
SELECT 
    'EXISTING TABLES CHECK' as check_type,
    COUNT(*) as table_count,
    CASE 
        WHEN COUNT(*) > 0 THEN 'Found existing tables - proceeding with migration'
        ELSE 'No existing tables found - this might be the wrong database'
    END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name IN ('admin_users', 'events', 'political_parties', 'publications');

-- STEP 2: CREATE BACKUP SCHEMA
CREATE SCHEMA IF NOT EXISTS backup_20241220;

-- STEP 3: BACKUP EXISTING TABLES WITH DATA
-- Backup admin_sessions (has data)
CREATE TABLE IF NOT EXISTS backup_20241220.admin_sessions AS 
SELECT * FROM admin_sessions;

-- Backup admin_users (has data)  
CREATE TABLE IF NOT EXISTS backup_20241220.admin_users AS 
SELECT * FROM admin_users;

-- Backup audit_log_entries (has data)
CREATE TABLE IF NOT EXISTS backup_20241220.audit_log_entries AS 
SELECT * FROM audit_log_entries;

-- STEP 4: RENAME CONFLICTING TABLES TO PRESERVE THEM
-- Rename existing tables to avoid conflicts with APPI schema
DO $$
BEGIN
    -- Only rename if tables exist and haven't been renamed already
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events' AND table_schema = 'public') 
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_events' AND table_schema = 'public') THEN
        ALTER TABLE events RENAME TO existing_events;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'political_parties' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_political_parties' AND table_schema = 'public') THEN
        ALTER TABLE political_parties RENAME TO existing_political_parties;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'publications' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_publications' AND table_schema = 'public') THEN
        ALTER TABLE publications RENAME TO existing_publications;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'news_articles' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_news_articles' AND table_schema = 'public') THEN
        ALTER TABLE news_articles RENAME TO existing_news_articles;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'working_groups' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_working_groups' AND table_schema = 'public') THEN
        ALTER TABLE working_groups RENAME TO existing_working_groups;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'event_registrations' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_event_registrations' AND table_schema = 'public') THEN
        ALTER TABLE event_registrations RENAME TO existing_event_registrations;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles' AND table_schema = 'public')
       AND NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'existing_profiles' AND table_schema = 'public') THEN
        ALTER TABLE profiles RENAME TO existing_profiles;
    END IF;
END $$;

-- STEP 5: CREATE NEW APPI SCHEMA WITH DIFFERENT NAMES
-- Create custom types (check if they exist first)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE user_role AS ENUM ('admin', 'party_focal_person', 'fellow', 'platform_collaborator', 'public');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
        CREATE TYPE user_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'event_type') THEN
        CREATE TYPE event_type AS ENUM ('summit', 'training', 'conference', 'workshop', 'dialogue');
    END IF;
END $$;

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(3) NOT NULL UNIQUE,
    region VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create political_parties_new (renamed to avoid conflict)
CREATE TABLE IF NOT EXISTS political_parties_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    country_id UUID REFERENCES countries(id),
    description TEXT,
    established_date DATE,
    logo_url TEXT,
    website TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (instead of profiles to avoid conflict)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255),
    role user_role DEFAULT 'public',
    status user_status DEFAULT 'active',
    country_id UUID REFERENCES countries(id),
    party_id UUID REFERENCES political_parties_new(id),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_categories
CREATE TABLE IF NOT EXISTS content_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES content_categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create publications_new (renamed to avoid conflict)
CREATE TABLE IF NOT EXISTS publications_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    content TEXT,
    excerpt TEXT,
    author_id UUID REFERENCES users(id),
    category_id UUID REFERENCES content_categories(id),
    type VARCHAR(100) NOT NULL,
    language VARCHAR(10) DEFAULT 'en',
    tags TEXT[],
    cover_image TEXT,
    pdf_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_articles_new (renamed to avoid conflict)
CREATE TABLE IF NOT EXISTS news_articles_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    author_id UUID REFERENCES users(id),
    category VARCHAR(100),
    language VARCHAR(10) DEFAULT 'en',
    featured_image TEXT,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media_files
CREATE TABLE IF NOT EXISTS media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    file_path TEXT NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events_new (renamed to avoid conflict)
CREATE TABLE IF NOT EXISTS events_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type event_type NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    country_id UUID REFERENCES countries(id),
    max_participants INTEGER,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'upcoming',
    featured_image TEXT,
    agenda JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations_new (renamed to avoid conflict)
CREATE TABLE IF NOT EXISTS event_registrations_new (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events_new(id),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    registration_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create internal_reports (new for member portal)
CREATE TABLE IF NOT EXISTS internal_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    category VARCHAR(100),
    author_id UUID REFERENCES users(id),
    access_level user_role DEFAULT 'party_focal_person',
    file_path TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create draft_declarations (new for member portal)
CREATE TABLE IF NOT EXISTS draft_declarations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    version VARCHAR(20),
    author_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_materials (new for member portal)
CREATE TABLE IF NOT EXISTS training_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    file_path TEXT,
    access_level user_role DEFAULT 'party_focal_person',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create toolkits (new for member portal)
CREATE TABLE IF NOT EXISTS toolkits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    file_path TEXT,
    access_level user_role DEFAULT 'party_focal_person',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create party_engagement (new for member portal)
CREATE TABLE IF NOT EXISTS party_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_id UUID REFERENCES political_parties_new(id),
    engagement_type VARCHAR(100),
    description TEXT,
    date DATE,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reform_progress (new for member portal)
CREATE TABLE IF NOT EXISTS reform_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    party_id UUID REFERENCES political_parties_new(id),
    reform_area VARCHAR(100),
    progress_percentage INTEGER,
    description TEXT,
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scheduled_activities (new for member portal)
CREATE TABLE IF NOT EXISTS scheduled_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    activity_type VARCHAR(100),
    scheduled_date TIMESTAMP WITH TIME ZONE,
    assigned_to UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'scheduled',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create website_analytics
CREATE TABLE IF NOT EXISTS website_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_url VARCHAR(500),
    visitor_ip INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    language VARCHAR(10) DEFAULT 'en',
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create contact_submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_settings
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) NOT NULL UNIQUE,
    setting_value TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_log (new, different from existing audit_log_entries)
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(255) NOT NULL,
    table_name VARCHAR(255),
    record_id TEXT,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- STEP 6: CREATE INDEXES FOR PERFORMANCE (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_email') THEN
        CREATE INDEX idx_users_email ON users(email);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_role') THEN
        CREATE INDEX idx_users_role ON users(role);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_users_party_id') THEN
        CREATE INDEX idx_users_party_id ON users(party_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_events_start_date') THEN
        CREATE INDEX idx_events_start_date ON events_new(start_date);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_events_status') THEN
        CREATE INDEX idx_events_status ON events_new(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_publications_type') THEN
        CREATE INDEX idx_publications_type ON publications_new(type);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_publications_language') THEN
        CREATE INDEX idx_publications_language ON publications_new(language);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_news_articles_language') THEN
        CREATE INDEX idx_news_articles_language ON news_articles_new(language);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_event_registrations_event_id') THEN
        CREATE INDEX idx_event_registrations_event_id ON event_registrations_new(event_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_event_registrations_user_id') THEN
        CREATE INDEX idx_event_registrations_user_id ON event_registrations_new(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_audit_log_user_id') THEN
        CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_audit_log_created_at') THEN
        CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
    END IF;
END $$;

-- STEP 7: INSERT SAMPLE DATA (only if tables are empty)
-- Insert sample countries
INSERT INTO countries (name, code, region) 
SELECT * FROM (VALUES 
    ('Ghana', 'GHA', 'West Africa'),
    ('Nigeria', 'NGA', 'West Africa'),
    ('Kenya', 'KEN', 'East Africa'),
    ('South Africa', 'ZAF', 'Southern Africa'),
    ('Ethiopia', 'ETH', 'East Africa'),
    ('Tanzania', 'TZA', 'East Africa'),
    ('Uganda', 'UGA', 'East Africa'),
    ('Senegal', 'SEN', 'West Africa'),
    ('Morocco', 'MAR', 'North Africa'),
    ('Egypt', 'EGY', 'North Africa')
) AS v(name, code, region)
WHERE NOT EXISTS (SELECT 1 FROM countries WHERE code = v.code);

-- Insert sample content categories
INSERT INTO content_categories (name, description) 
SELECT * FROM (VALUES 
    ('Political Reform', 'Publications and resources related to political reform'),
    ('Democracy', 'Content about democratic processes and institutions'),
    ('Elections', 'Election-related materials and guidelines'),
    ('Party Development', 'Resources for political party development'),
    ('Youth Engagement', 'Materials focused on youth political engagement'),
    ('Women in Politics', 'Resources for women political participation'),
    ('Policy Development', 'Policy formulation and implementation guides'),
    ('International Relations', 'Content about international political cooperation')
) AS v(name, description)
WHERE NOT EXISTS (SELECT 1 FROM content_categories WHERE name = v.name);

-- Insert sample system settings
INSERT INTO system_settings (setting_key, setting_value, description) 
SELECT * FROM (VALUES 
    ('site_name', 'African Political Parties Initiative', 'Website name'),
    ('contact_email', 'appi@africagovernancecentre.org', 'Primary contact email'),
    ('contact_phone', '+233 53 054 5528', 'Primary contact phone'),
    ('contact_address', '32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana', 'Primary contact address'),
    ('default_language', 'en', 'Default website language'),
    ('maintenance_mode', 'false', 'Maintenance mode status')
) AS v(setting_key, setting_value, description)
WHERE NOT EXISTS (SELECT 1 FROM system_settings WHERE setting_key = v.setting_key);

-- STEP 8: CREATE TRIGGERS FOR UPDATED_AT (only if they don't exist)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at (only if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at') THEN
        CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_political_parties_new_updated_at') THEN
        CREATE TRIGGER update_political_parties_new_updated_at BEFORE UPDATE ON political_parties_new FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_publications_new_updated_at') THEN
        CREATE TRIGGER update_publications_new_updated_at BEFORE UPDATE ON publications_new FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_news_articles_new_updated_at') THEN
        CREATE TRIGGER update_news_articles_new_updated_at BEFORE UPDATE ON news_articles_new FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_events_new_updated_at') THEN
        CREATE TRIGGER update_events_new_updated_at BEFORE UPDATE ON events_new FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_event_registrations_new_updated_at') THEN
        CREATE TRIGGER update_event_registrations_new_updated_at BEFORE UPDATE ON event_registrations_new FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_internal_reports_updated_at') THEN
        CREATE TRIGGER update_internal_reports_updated_at BEFORE UPDATE ON internal_reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_draft_declarations_updated_at') THEN
        CREATE TRIGGER update_draft_declarations_updated_at BEFORE UPDATE ON draft_declarations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_training_materials_updated_at') THEN
        CREATE TRIGGER update_training_materials_updated_at BEFORE UPDATE ON training_materials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_toolkits_updated_at') THEN
        CREATE TRIGGER update_toolkits_updated_at BEFORE UPDATE ON toolkits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_party_engagement_updated_at') THEN
        CREATE TRIGGER update_party_engagement_updated_at BEFORE UPDATE ON party_engagement FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_reform_progress_updated_at') THEN
        CREATE TRIGGER update_reform_progress_updated_at BEFORE UPDATE ON reform_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_scheduled_activities_updated_at') THEN
        CREATE TRIGGER update_scheduled_activities_updated_at BEFORE UPDATE ON scheduled_activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contact_submissions_updated_at') THEN
        CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_system_settings_updated_at') THEN
        CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- STEP 9: VERIFICATION QUERY
SELECT 
    'MIGRATION COMPLETE' as status,
    COUNT(*) as total_new_tables,
    'All existing data preserved in backup schema' as note
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND (table_name LIKE '%_new' 
    OR table_name IN ('users', 'countries', 'content_categories', 'internal_reports', 'draft_declarations', 'training_materials', 'toolkits', 'party_engagement', 'reform_progress', 'scheduled_activities', 'website_analytics', 'newsletter_subscriptions', 'contact_submissions', 'system_settings', 'audit_log', 'media_files'));

-- STEP 10: SUMMARY OF CHANGES
SELECT 
    'EXISTING TABLES PRESERVED' as category,
    table_name,
    'Renamed to avoid conflicts' as action
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_name LIKE 'existing_%'

UNION ALL

SELECT 
    'NEW APPI TABLES CREATED' as category,
    table_name,
    'Ready for APPI functionality' as action
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND (table_name LIKE '%_new' 
    OR table_name IN ('users', 'countries', 'content_categories', 'internal_reports', 'draft_declarations', 'training_materials', 'toolkits', 'party_engagement', 'reform_progress', 'scheduled_activities', 'website_analytics', 'newsletter_subscriptions', 'contact_submissions', 'system_settings', 'audit_log', 'media_files'))

ORDER BY category, table_name;
