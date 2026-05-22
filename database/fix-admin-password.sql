-- Fix admin user password with correct hash
-- Run this in your Supabase SQL editor

UPDATE admin_users 
SET password_hash = '$2b$12$pWHS8aviYKBPw.EgHD3Nu.3M0ysW2jtlj3conPeu6G8bClSNTvTUi'
WHERE email = 'admin@appi.org';

-- If the user doesn't exist, create it
INSERT INTO admin_users (email, password_hash, full_name, role, permissions) 
VALUES (
  'admin@appi.org',
  '$2b$12$pWHS8aviYKBPw.EgHD3Nu.3M0ysW2jtlj3conPeu6G8bClSNTvTUi',
  'APPI Administrator',
  'super_admin',
  '{"users": {"read": true, "write": true, "delete": true}, "events": {"read": true, "write": true, "delete": true}, "publications": {"read": true, "write": true, "delete": true}, "parties": {"read": true, "write": true, "delete": true}}'
) ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;

-- Verify the user exists
SELECT id, email, full_name, role, is_active FROM admin_users WHERE email = 'admin@appi.org';
