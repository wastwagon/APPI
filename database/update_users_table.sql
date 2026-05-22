-- Add missing fields to users table for enhanced member profiles
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
ADD COLUMN IF NOT EXISTS position VARCHAR(255),
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Add indexes for new fields
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
