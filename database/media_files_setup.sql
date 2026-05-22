-- Media Files Management Setup
-- This script creates the media_files table and related functionality

-- Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    public_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    description TEXT,
    tags TEXT[],
    uploaded_by UUID REFERENCES admin_users(id),
    downloads INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_media_files_category ON media_files(category);
CREATE INDEX IF NOT EXISTS idx_media_files_file_type ON media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON media_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_files_created_at ON media_files(created_at);
CREATE INDEX IF NOT EXISTS idx_media_files_is_active ON media_files(is_active);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_media_files_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_media_files_updated_at ON media_files;
CREATE TRIGGER trigger_update_media_files_updated_at
    BEFORE UPDATE ON media_files
    FOR EACH ROW
    EXECUTE FUNCTION update_media_files_updated_at();

-- Create function to increment download count
CREATE OR REPLACE FUNCTION increment_media_file_downloads(file_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE media_files 
    SET downloads = downloads + 1 
    WHERE id = file_id;
END;
$$ LANGUAGE plpgsql;

-- Create view for media files with admin user information
CREATE OR REPLACE VIEW media_files_with_uploader AS
SELECT 
    mf.*,
    au.full_name as uploader_name,
    au.email as uploader_email
FROM media_files mf
LEFT JOIN admin_users au ON mf.uploaded_by = au.id
WHERE mf.is_active = true;

-- Insert some sample categories
INSERT INTO media_files (name, original_name, file_type, mime_type, size, file_path, public_url, category, description, uploaded_by)
VALUES 
    ('sample-image-1.jpg', 'sample-image-1.jpg', 'image', 'image/jpeg', 1024000, 'images/sample-image-1.jpg', 'https://example.com/images/sample-image-1.jpg', 'Events', 'Sample event image', NULL),
    ('sample-document-1.pdf', 'sample-document-1.pdf', 'document', 'application/pdf', 2048000, 'documents/sample-document-1.pdf', 'https://example.com/documents/sample-document-1.pdf', 'Guidelines', 'Sample guidelines document', NULL)
ON CONFLICT DO NOTHING;

-- Create function to get media file statistics
CREATE OR REPLACE FUNCTION get_media_files_stats()
RETURNS TABLE (
    total_files BIGINT,
    total_size BIGINT,
    image_count BIGINT,
    video_count BIGINT,
    document_count BIGINT,
    audio_count BIGINT,
    total_downloads BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_files,
        COALESCE(SUM(size), 0) as total_size,
        COUNT(*) FILTER (WHERE file_type = 'image') as image_count,
        COUNT(*) FILTER (WHERE file_type = 'video') as video_count,
        COUNT(*) FILTER (WHERE file_type = 'document') as document_count,
        COUNT(*) FILTER (WHERE file_type = 'audio') as audio_count,
        COALESCE(SUM(downloads), 0) as total_downloads
    FROM media_files 
    WHERE is_active = true;
END;
$$ LANGUAGE plpgsql;
