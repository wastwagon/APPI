-- Complete APPI Database Setup Script (Simple Final Version)
-- This script sets up all necessary database changes for member settings and verification system
-- Uses simple IF NOT EXISTS clauses to avoid errors

-- ============================================================================
-- 1. CREATE VERIFICATION STATUS ENUM
-- ============================================================================
DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ============================================================================
-- 2. UPDATE USERS TABLE WITH NEW FIELDS
-- ============================================================================
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS position VARCHAR(255),
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add indexes for new fields (using IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_position ON users(position);
CREATE INDEX IF NOT EXISTS idx_users_avatar_url ON users(avatar_url);

-- Update existing users to have default values for new fields
UPDATE users 
SET 
    phone = COALESCE(phone, ''),
    position = COALESCE(position, ''),
    bio = COALESCE(bio, ''),
    avatar_url = COALESCE(avatar_url, '')
WHERE phone IS NULL OR position IS NULL OR bio IS NULL OR avatar_url IS NULL;

-- ============================================================================
-- 3. CREATE VERIFICATION REQUESTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS verification_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    national_id VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    status verification_status DEFAULT 'pending',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES admin_users(id),
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance (using IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_verification_requests_user_id ON verification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_requests_status ON verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_verification_requests_submitted_at ON verification_requests(submitted_at);

-- Add RLS policies (disabled for now as per previous setup)
ALTER TABLE verification_requests DISABLE ROW LEVEL SECURITY;

-- Add trigger for updated_at (handle existing trigger)
CREATE OR REPLACE FUNCTION update_verification_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists, then create new one
DROP TRIGGER IF EXISTS trigger_update_verification_requests_updated_at ON verification_requests;
CREATE TRIGGER trigger_update_verification_requests_updated_at
    BEFORE UPDATE ON verification_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_verification_requests_updated_at();

-- ============================================================================
-- 4. SETUP STORAGE BUCKETS (SIMPLE VERSION)
-- ============================================================================

-- Create storage bucket for member profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-avatars',
  'member-avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'verification-documents',
  'verification-documents',
  false, -- Private bucket for security
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for general media files (future admin/media-files)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-files',
  'media-files',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-uploads',
  'admin-uploads',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
) ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for temporary uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'temp-uploads',
  'temp-uploads',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 5. CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function to clean up temporary files
CREATE OR REPLACE FUNCTION cleanup_temp_files()
RETURNS void AS $$
BEGIN
  DELETE FROM storage.objects 
  WHERE bucket_id = 'temp-uploads' 
  AND created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to get file URL
CREATE OR REPLACE FUNCTION get_file_url(bucket_name text, file_path text)
RETURNS text AS $$
BEGIN
  RETURN storage.url(bucket_name, file_path);
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique file names
CREATE OR REPLACE FUNCTION generate_unique_filename(original_name text, user_id uuid)
RETURNS text AS $$
DECLARE
  file_extension text;
  timestamp_str text;
  unique_filename text;
BEGIN
  -- Extract file extension
  file_extension := CASE 
    WHEN original_name LIKE '%.%' THEN '.' || split_part(original_name, '.', -1)
    ELSE ''
  END;
  
  -- Generate timestamp
  timestamp_str := to_char(now(), 'YYYYMMDD_HH24MISS');
  
  -- Create unique filename
  unique_filename := user_id::text || '/' || timestamp_str || '_' || 
                    encode(gen_random_bytes(8), 'hex') || file_extension;
  
  RETURN unique_filename;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 6. CREATE INDEXES AND VIEWS
-- ============================================================================

-- Storage indexes (using IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_id ON storage.objects(bucket_id);
CREATE INDEX IF NOT EXISTS idx_storage_objects_created_at ON storage.objects(created_at);
CREATE INDEX IF NOT EXISTS idx_storage_objects_name ON storage.objects(name);

-- Storage statistics view
CREATE OR REPLACE VIEW storage_stats AS
SELECT 
  bucket_id,
  COUNT(*) as total_files,
  SUM(metadata->>'size')::bigint as total_size,
  AVG((metadata->>'size')::bigint) as avg_file_size,
  MIN(created_at) as oldest_file,
  MAX(created_at) as newest_file
FROM storage.objects
GROUP BY bucket_id;

-- ============================================================================
-- 7. VERIFICATION SYSTEM VIEWS
-- ============================================================================

-- View for pending verifications
CREATE OR REPLACE VIEW pending_verifications AS
SELECT 
  vr.id,
  vr.user_id,
  vr.national_id,
  vr.document_url,
  vr.submitted_at,
  u.full_name,
  u.email,
  u.role
FROM verification_requests vr
JOIN users u ON vr.user_id = u.id
WHERE vr.status = 'pending'
ORDER BY vr.submitted_at DESC;

-- View for verification statistics
CREATE OR REPLACE VIEW verification_stats AS
SELECT 
  status,
  COUNT(*) as count,
  AVG(EXTRACT(EPOCH FROM (reviewed_at - submitted_at))/3600) as avg_review_time_hours
FROM verification_requests
GROUP BY status;

-- ============================================================================
-- 8. DISPLAY SETUP SUMMARY
-- ============================================================================

-- Show created buckets
SELECT 'STORAGE BUCKETS CREATED:' as info;
SELECT 
  id as bucket_name,
  name as display_name,
  public as is_public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id IN ('member-avatars', 'verification-documents', 'media-files', 'admin-uploads', 'temp-uploads')
ORDER BY id;

-- Show table changes
SELECT 'TABLE CHANGES APPLIED:' as info;
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name IN ('phone', 'position', 'bio', 'avatar_url')
ORDER BY column_name;

-- Show verification table
SELECT 'VERIFICATION TABLE CREATED:' as info;
SELECT 
  table_name,
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'verification_requests'
ORDER BY ordinal_position;

-- Show functions created
SELECT 'HELPER FUNCTIONS CREATED:' as info;
SELECT 
  routine_name,
  routine_type
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('cleanup_temp_files', 'get_file_url', 'generate_unique_filename', 'update_verification_requests_updated_at')
ORDER BY routine_name;

-- Show views created
SELECT 'VIEWS CREATED:' as info;
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('storage_stats', 'pending_verifications', 'verification_stats')
ORDER BY table_name;

SELECT 'SETUP COMPLETE! All systems are ready for member settings and verification functionality.' as status;
SELECT 'NOTE: Storage policies need to be configured manually in Supabase dashboard under Storage > Policies' as note;
