-- Check Supabase connection and service role
-- This script helps diagnose connection issues

-- Check current user and role
SELECT 
    current_user as "Current User",
    current_setting('role') as "Current Role",
    current_setting('request.jwt.claims', true) as "JWT Claims";

-- Check if we're connected as service_role
SELECT 
    CASE 
        WHEN current_setting('role') = 'service_role' THEN 'Connected as service_role'
        WHEN current_setting('role') = 'authenticated' THEN 'Connected as authenticated user'
        WHEN current_setting('role') = 'anon' THEN 'Connected as anonymous'
        ELSE 'Connected as: ' || current_setting('role')
    END as "Connection Status";

-- Check if RLS is blocking access
SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- Check RLS policies on users table
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'users';

-- Test direct access to users table
SELECT 
    'Direct access test' as test_type,
    COUNT(*) as user_count
FROM users;

-- Test access with role filter
SELECT 
    'Member count test' as test_type,
    COUNT(*) as member_count
FROM users 
WHERE role = 'member';

-- Check what roles exist in the users table
SELECT 
    role,
    COUNT(*) as count
FROM users 
GROUP BY role
ORDER BY count DESC;

-- Check if there are any users at all
SELECT 
    'Total users' as description,
    COUNT(*) as count
FROM users;

-- Check the structure of the users table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'users'
ORDER BY ordinal_position;
