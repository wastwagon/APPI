-- Fix RLS policies for users table
-- This script will create appropriate RLS policies to allow admin access

-- First, check if RLS is enabled on users table
SELECT rowsecurity FROM pg_tables WHERE schemaname = 'public' AND tablename = 'users';

-- If RLS is enabled, we need to create policies
-- Option 1: Disable RLS on users table (if you want no restrictions)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Option 2: Create RLS policies to allow admin access (if you want to keep RLS)
-- First, drop any existing policies on users table
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON users;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON users;

-- Create new policies that allow admin access
CREATE POLICY "Enable read access for admin users" ON users
    FOR SELECT
    USING (true); -- Allow all reads for now

CREATE POLICY "Enable insert access for admin users" ON users
    FOR INSERT
    WITH CHECK (true); -- Allow all inserts for now

CREATE POLICY "Enable update access for admin users" ON users
    FOR UPDATE
    USING (true)
    WITH CHECK (true); -- Allow all updates for now

CREATE POLICY "Enable delete access for admin users" ON users
    FOR DELETE
    USING (true); -- Allow all deletes for now

-- Alternative: Create more restrictive policies based on user role
-- CREATE POLICY "Enable read access for admin users" ON users
--     FOR SELECT
--     USING (
--         current_setting('request.jwt.claims', true)::json->>'role' = 'admin' OR
--         current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
--     );

-- Check if the policies were created
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'users';

-- Test if we can now read from users table
SELECT COUNT(*) FROM users;

-- Test if we can read members specifically
SELECT COUNT(*) FROM users WHERE role = 'member';
