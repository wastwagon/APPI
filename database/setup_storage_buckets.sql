-- Setup Supabase Storage Buckets for APPI
-- This script creates all necessary storage buckets with proper policies

-- 1. Create storage bucket for member profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'member-avatars',
  'member-avatars',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- 2. Create storage bucket for verification documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'verification-documents',
  'verification-documents',
  false, -- Private bucket for security
  10485760, -- 10MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
) ON CONFLICT (id) DO NOTHING;

-- 3. Create storage bucket for general media files (future admin/media-files)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media-files',
  'media-files',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) ON CONFLICT (id) DO NOTHING;

-- 4. Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'admin-uploads',
  'admin-uploads',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
) ON CONFLICT (id) DO NOTHING;

-- 5. Create storage bucket for temporary uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'temp-uploads',
  'temp-uploads',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- 6. Set up RLS policies for member-avatars bucket
-- Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload their own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'member-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public read access to avatars
CREATE POLICY "Public read access to avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'member-avatars');

-- Allow users to update their own avatar
CREATE POLICY "Users can update their own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'member-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own avatar
CREATE POLICY "Users can delete their own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'member-avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 7. Set up RLS policies for verification-documents bucket
-- Allow authenticated users to upload their own verification documents
CREATE POLICY "Users can upload their own verification documents" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'verification-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow admins to read verification documents
CREATE POLICY "Admins can read verification documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'verification-documents' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow users to read their own verification documents
CREATE POLICY "Users can read their own verification documents" ON storage.objects
FOR SELECT USING (
  bucket_id = 'verification-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 8. Set up RLS policies for media-files bucket
-- Allow admins to upload media files
CREATE POLICY "Admins can upload media files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'media-files' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow public read access to media files
CREATE POLICY "Public read access to media files" ON storage.objects
FOR SELECT USING (bucket_id = 'media-files');

-- Allow admins to update media files
CREATE POLICY "Admins can update media files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'media-files' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow admins to delete media files
CREATE POLICY "Admins can delete media files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'media-files' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- 9. Set up RLS policies for admin-uploads bucket
-- Allow admins to upload files
CREATE POLICY "Admins can upload files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'admin-uploads' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow public read access to admin uploads
CREATE POLICY "Public read access to admin uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'admin-uploads');

-- Allow admins to update files
CREATE POLICY "Admins can update files" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'admin-uploads' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'admin-uploads' AND
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE admin_users.id = auth.uid()
  )
);

-- 10. Set up RLS policies for temp-uploads bucket
-- Allow authenticated users to upload temporary files
CREATE POLICY "Users can upload temporary files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'temp-uploads' AND
  auth.uid() IS NOT NULL
);

-- Allow users to read their own temporary files
CREATE POLICY "Users can read their own temporary files" ON storage.objects
FOR SELECT USING (
  bucket_id = 'temp-uploads' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to delete their own temporary files
CREATE POLICY "Users can delete their own temporary files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'temp-uploads' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- 11. Create a function to clean up temporary files (older than 24 hours)
CREATE OR REPLACE FUNCTION cleanup_temp_files()
RETURNS void AS $$
BEGIN
  DELETE FROM storage.objects 
  WHERE bucket_id = 'temp-uploads' 
  AND created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- 12. Create a scheduled job to clean up temporary files (optional - requires pg_cron extension)
-- Uncomment if you have pg_cron extension installed:
-- SELECT cron.schedule('cleanup-temp-files', '0 2 * * *', 'SELECT cleanup_temp_files();');

-- 13. Create helper functions for file management
CREATE OR REPLACE FUNCTION get_file_url(bucket_name text, file_path text)
RETURNS text AS $$
BEGIN
  RETURN storage.url(bucket_name, file_path);
END;
$$ LANGUAGE plpgsql;

-- 14. Create a function to generate unique file names
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

-- 15. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_id ON storage.objects(bucket_id);
CREATE INDEX IF NOT EXISTS idx_storage_objects_created_at ON storage.objects(created_at);
CREATE INDEX IF NOT EXISTS idx_storage_objects_name ON storage.objects(name);

-- 16. Create a view for file statistics
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

-- Display created buckets
SELECT 
  id as bucket_name,
  name as display_name,
  public as is_public,
  file_size_limit,
  allowed_mime_types
FROM storage.buckets
WHERE id IN ('member-avatars', 'verification-documents', 'media-files', 'admin-uploads', 'temp-uploads')
ORDER BY id;
