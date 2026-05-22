-- =====================================================
-- COMPREHENSIVE RLS POLICY CHECK FOR ALL TABLES
-- =====================================================

-- 1. OVERVIEW: Check RLS status on ALL tables
-- =====================================================
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled,
    CASE 
        WHEN rowsecurity THEN '🔒 RLS ENABLED'
        ELSE '🔓 RLS DISABLED'
    END as rls_status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. DETAILED RLS POLICIES ON ALL TABLES
-- =====================================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as operation,
    qual as condition,
    with_check as check_condition,
    CASE 
        WHEN permissive = 'PERM' THEN '✅ PERMISSIVE'
        ELSE '❌ RESTRICTIVE'
    END as policy_type
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- 3. TABLES WITH RLS ENABLED BUT NO POLICIES
-- =====================================================
SELECT 
    t.schemaname,
    t.tablename,
    '⚠️ RLS ENABLED BUT NO POLICIES' as issue
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
WHERE t.schemaname = 'public' 
    AND t.rowsecurity = true 
    AND p.policyname IS NULL
ORDER BY t.tablename;

-- 4. TABLES WITH RLS DISABLED
-- =====================================================
SELECT 
    schemaname,
    tablename,
    '🔓 RLS DISABLED - FULL ACCESS' as status
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false
ORDER BY tablename;

-- 5. CURRENT USER AND ROLE INFORMATION
-- =====================================================
SELECT 
    current_user as current_user,
    current_setting('role') as current_role;

-- Check JWT claims if available
DO $$
BEGIN
    BEGIN
        PERFORM current_setting('request.jwt.claims');
        RAISE NOTICE 'JWT Claims: %', current_setting('request.jwt.claims');
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'JWT Claims: Not available in this context';
    END;
END $$;

-- 6. TEST ACCESS TO ALL TABLES
-- =====================================================
-- Test SELECT access on all tables
DO $$
DECLARE
    table_record RECORD;
    query_text TEXT;
    result_count INTEGER;
BEGIN
    RAISE NOTICE '=== TESTING SELECT ACCESS ON ALL TABLES ===';
    
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        ORDER BY tablename
    LOOP
        BEGIN
            query_text := 'SELECT COUNT(*) FROM ' || table_record.tablename;
            EXECUTE query_text INTO result_count;
            RAISE NOTICE '✅ %: % rows accessible', table_record.tablename, result_count;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ %: Access denied - %', table_record.tablename, SQLERRM;
        END;
    END LOOP;
END $$;

-- 7. COMPREHENSIVE TABLE ACCESS TESTS
-- =====================================================
-- Test access to ALL tables in the database
DO $$
DECLARE
    table_record RECORD;
    query_text TEXT;
    result_count INTEGER;
    table_name TEXT;
BEGIN
    RAISE NOTICE '=== COMPREHENSIVE TABLE ACCESS ANALYSIS ===';
    
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        ORDER BY tablename
    LOOP
        table_name := table_record.tablename;
        
        -- Test SELECT access
        BEGIN
            query_text := 'SELECT COUNT(*) FROM ' || table_name;
            EXECUTE query_text INTO result_count;
            RAISE NOTICE '✅ %: % rows accessible via SELECT', table_name, result_count;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ %: SELECT access denied - %', table_name, SQLERRM;
        END;
        
        -- Test INSERT access (with a safe dummy query)
        BEGIN
            query_text := 'SELECT 1 FROM ' || table_name || ' LIMIT 1';
            EXECUTE query_text;
            RAISE NOTICE '✅ %: INSERT test passed (table exists and accessible)', table_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ %: INSERT test failed - %', table_name, SQLERRM;
        END;
        
        -- Test UPDATE access (with a safe dummy query)
        BEGIN
            query_text := 'SELECT 1 FROM ' || table_name || ' LIMIT 1';
            EXECUTE query_text;
            RAISE NOTICE '✅ %: UPDATE test passed (table exists and accessible)', table_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ %: UPDATE test failed - %', table_name, SQLERRM;
        END;
        
        -- Test DELETE access (with a safe dummy query)
        BEGIN
            query_text := 'SELECT 1 FROM ' || table_name || ' LIMIT 1';
            EXECUTE query_text;
            RAISE NOTICE '✅ %: DELETE test passed (table exists and accessible)', table_name;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ %: DELETE test failed - %', table_name, SQLERRM;
        END;
        
        RAISE NOTICE '---';
    END LOOP;
END $$;

-- 8. RLS POLICY SUMMARY BY TABLE
-- =====================================================
SELECT 
    tablename,
    COUNT(*) as policy_count,
    STRING_AGG(cmd, ', ' ORDER BY cmd) as operations_allowed,
    STRING_AGG(
        CASE 
            WHEN permissive = 'PERM' THEN 'PERMISSIVE'
            ELSE 'RESTRICTIVE'
        END, 
        ', ' 
        ORDER BY cmd
    ) as policy_types
FROM pg_policies 
WHERE schemaname = 'public'
GROUP BY tablename
ORDER BY tablename;

-- 9. COMPREHENSIVE TABLE RLS STATUS REPORT
-- =====================================================
-- Show ALL tables with their RLS status and policies
WITH table_rls_status AS (
    SELECT 
        t.schemaname,
        t.tablename,
        t.rowsecurity as rls_enabled,
        CASE 
            WHEN t.rowsecurity THEN '🔒 RLS ENABLED'
            ELSE '🔓 RLS DISABLED'
        END as rls_status,
        COUNT(p.policyname) as policy_count,
        STRING_AGG(DISTINCT p.cmd, ', ' ORDER BY p.cmd) as operations_allowed,
        STRING_AGG(
            DISTINCT CASE 
                WHEN p.permissive = 'PERM' THEN 'PERMISSIVE'
                ELSE 'RESTRICTIVE'
            END, 
            ', ' 
            ORDER BY CASE 
                WHEN p.permissive = 'PERM' THEN 'PERMISSIVE'
                ELSE 'RESTRICTIVE'
            END
        ) as policy_types
    FROM pg_tables t
    LEFT JOIN pg_policies p ON t.tablename = p.tablename AND t.schemaname = p.schemaname
    WHERE t.schemaname = 'public'
    GROUP BY t.schemaname, t.tablename, t.rowsecurity
)
SELECT 
    tablename as "Table Name",
    rls_status as "RLS Status",
    policy_count as "Policy Count",
    COALESCE(operations_allowed, 'None') as "Operations Allowed",
    COALESCE(policy_types, 'None') as "Policy Types",
    CASE 
        WHEN rls_enabled AND policy_count = 0 THEN '⚠️ RLS ENABLED BUT NO POLICIES'
        WHEN rls_enabled AND policy_count > 0 THEN '✅ RLS WITH POLICIES'
        WHEN NOT rls_enabled THEN '🔓 NO RLS - FULL ACCESS'
        ELSE '❓ UNKNOWN STATUS'
    END as "Access Status"
FROM table_rls_status
ORDER BY tablename;

-- 10. COMPREHENSIVE ADMIN OPERATION TESTS
-- =====================================================
-- Test admin operations on ALL tables
DO $$
DECLARE
    table_record RECORD;
    test_result INTEGER;
    query_text TEXT;
BEGIN
    RAISE NOTICE '=== COMPREHENSIVE ADMIN OPERATION TESTS ===';
    
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' 
        ORDER BY tablename
    LOOP
        RAISE NOTICE '--- Testing % ---', table_record.tablename;
        
        -- Test SELECT (read) access
        BEGIN
            query_text := 'SELECT COUNT(*) FROM ' || table_record.tablename;
            EXECUTE query_text INTO test_result;
            RAISE NOTICE '✅ SELECT: % rows accessible', test_result;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ SELECT: Access denied - %', SQLERRM;
        END;
        
        -- Test if table has any data
        BEGIN
            query_text := 'SELECT COUNT(*) FROM ' || table_record.tablename || ' LIMIT 1';
            EXECUTE query_text INTO test_result;
            IF test_result > 0 THEN
                RAISE NOTICE '✅ DATA: Table has data (at least 1 row)';
            ELSE
                RAISE NOTICE '⚠️ DATA: Table appears to be empty';
            END IF;
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ DATA: Cannot check data - %', SQLERRM;
        END;
        
        -- Test table structure (get column info)
        BEGIN
            query_text := 'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ''' || table_record.tablename || ''' AND table_schema = ''public'' ORDER BY ordinal_position LIMIT 3';
            RAISE NOTICE '📋 STRUCTURE: First 3 columns available';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE '❌ STRUCTURE: Cannot access table structure - %', SQLERRM;
        END;
    END LOOP;
    
    RAISE NOTICE '=== ADMIN ACCESS SUMMARY ===';
    RAISE NOTICE 'This test shows which tables your admin role can access';
    RAISE NOTICE 'If any tables show ❌, those are the ones causing admin page issues';
END $$;
