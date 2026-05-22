-- APPI - African Political Parties Initiative
-- Complete Database Schema
-- Created: 2025
-- Description: Comprehensive database schema for APPI website, admin dashboard, and member portal

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- AUTHENTICATION & USER MANAGEMENT
-- =====================================================

-- User roles enumeration
CREATE TYPE user_role AS ENUM (
  'admin',
  'party_focal_person',
  'fellow',
  'platform_collaborator',
  'observer',
  'public'
);

-- User status enumeration
CREATE TYPE user_status AS ENUM (
  'active',
  'inactive',
  'pending',
  'suspended',
  'verified'
);

-- Countries table
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(3) NOT NULL UNIQUE,
  flag_emoji VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Political parties table
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

-- Users table (extends Supabase auth.users)
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

-- User permissions table
CREATE TABLE user_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  permission_name VARCHAR(100) NOT NULL,
  granted BOOLEAN DEFAULT TRUE,
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, permission_name)
);

-- =====================================================
-- CONTENT MANAGEMENT
-- =====================================================

-- Content categories
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

-- Publications table
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

-- News articles table
CREATE TABLE news_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  featured_image_url TEXT,
  status user_status DEFAULT 'pending',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Media files table
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  alt_text VARCHAR(255),
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- EVENTS & SUMMIT MANAGEMENT
-- =====================================================

-- Event types
CREATE TYPE event_type AS ENUM (
  'summit',
  'workshop',
  'conference',
  'training',
  'meeting',
  'webinar',
  'other'
);

-- Events table
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

-- Event registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status user_status DEFAULT 'pending',
  dietary_requirements TEXT,
  special_needs TEXT,
  notes TEXT,
  UNIQUE(event_id, user_id)
);

-- =====================================================
-- MEMBER PORTAL & PRIVATE CONTENT
-- =====================================================

-- Internal reports table
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

-- Draft declarations table
CREATE TABLE draft_declarations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  version VARCHAR(20) DEFAULT '1.0',
  status user_status DEFAULT 'draft',
  access_level user_role NOT NULL,
  created_by UUID REFERENCES users(id),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training materials table
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

-- Toolkits table
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

-- =====================================================
-- ENGAGEMENT & PROGRESS TRACKING
-- =====================================================

-- Party engagement metrics
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

-- Reform progress tracking
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

-- Activity scheduling
CREATE TABLE scheduled_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activity_type VARCHAR(100),
  scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER,
  participants JSONB,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ANALYTICS & REPORTING
-- =====================================================

-- Website analytics
CREATE TABLE website_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_url VARCHAR(500) NOT NULL,
  page_title VARCHAR(255),
  visitor_ip VARCHAR(45),
  user_agent TEXT,
  referrer VARCHAR(500),
  session_id VARCHAR(255),
  user_id UUID REFERENCES users(id),
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255),
  country_id INTEGER REFERENCES countries(id),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  status user_status DEFAULT 'pending',
  responded_by UUID REFERENCES users(id),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- SYSTEM & SETTINGS
-- =====================================================

-- System settings
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'string',
  description TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_political_party_id ON users(political_party_id);

-- Publications indexes
CREATE INDEX idx_publications_slug ON publications(slug);
CREATE INDEX idx_publications_status ON publications(status);
CREATE INDEX idx_publications_published_at ON publications(published_at);

-- Events indexes
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);

-- Event registrations indexes
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);

-- Analytics indexes
CREATE INDEX idx_website_analytics_visited_at ON website_analytics(visited_at);
CREATE INDEX idx_website_analytics_user_id ON website_analytics(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE political_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE draft_declarations ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE toolkits ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Publications policies
CREATE POLICY "Public can view published publications" ON publications
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage all publications" ON publications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Public can view active events" ON events
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage all events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Internal reports policies
CREATE POLICY "Authorized users can view internal reports" ON internal_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'party_focal_person', 'fellow', 'platform_collaborator')
    )
  );

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_political_parties_updated_at BEFORE UPDATE ON political_parties
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

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

-- Insert sample system settings
INSERT INTO system_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'African Political Parties Initiative', 'string', 'Website name'),
('site_description', 'Reshaping Africa''s Political Parties for Democratic and Economic Transformation', 'string', 'Website description'),
('contact_email', 'appi@africagovernancecentre.org', 'string', 'Primary contact email'),
('contact_phone', '+233 53 054 5528', 'string', 'Primary contact phone'),
('contact_address', '32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana', 'string', 'Primary contact address'),
('maintenance_mode', 'false', 'boolean', 'Maintenance mode status'),
('registration_enabled', 'true', 'boolean', 'User registration enabled'),
('newsletter_enabled', 'true', 'boolean', 'Newsletter subscription enabled');

-- =====================================================
-- VIEWS FOR COMMON QUERIES
-- =====================================================

-- User statistics view
CREATE VIEW user_statistics AS
SELECT 
  role,
  status,
  COUNT(*) as user_count,
  COUNT(CASE WHEN created_at >= NOW() - INTERVAL '30 days' THEN 1 END) as new_users_30_days
FROM users
GROUP BY role, status;

-- Event statistics view
CREATE VIEW event_statistics AS
SELECT 
  event_type,
  status,
  COUNT(*) as event_count,
  COUNT(CASE WHEN start_date >= NOW() THEN 1 END) as upcoming_events
FROM events
GROUP BY event_type, status;

-- Engagement metrics view
CREATE VIEW engagement_metrics AS
SELECT 
  pp.name as party_name,
  c.name as country_name,
  COUNT(DISTINCT pe.user_id) as active_members,
  AVG(pe.events_attended) as avg_events_attended,
  AVG(pe.publications_read) as avg_publications_read
FROM political_parties pp
LEFT JOIN countries c ON pp.country_id = c.id
LEFT JOIN party_engagement pe ON pp.id = pe.political_party_id
GROUP BY pp.id, pp.name, c.name;

-- =====================================================
-- END OF SCHEMA
-- =====================================================

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT USAGE ON SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
