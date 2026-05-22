-- =====================================================
-- SIMPLE DATABASE ANALYSIS SCRIPT
-- =====================================================
-- This script will show ALL tables and their structures
-- in your current database
-- =====================================================

-- 1. ALL TABLES IN THE DATABASE
SELECT 
    'ALL TABLES' as section,
    t.tablename as table_name,
    t.tableowner as owner,
    pg_size_pretty(pg_total_relation_size(t.tablename::regclass)) as size,
    (SELECT count(*) FROM information_schema.columns c 
     WHERE c.table_name = t.tablename AND c.table_schema = t.schemaname) as column_count
FROM pg_tables t
WHERE t.schemaname = 'public'
ORDER BY t.tablename;

-- 2. ALL COLUMNS FOR ALL TABLES
SELECT 
    'TABLE COLUMNS' as section,
    c.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default,
    CASE 
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRIMARY KEY'
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN 'FOREIGN KEY'
        WHEN tc.constraint_type = 'UNIQUE' THEN 'UNIQUE'
        ELSE ''
    END as constraints
FROM information_schema.columns c
LEFT JOIN information_schema.key_column_usage kcu 
    ON c.table_name = kcu.table_name 
    AND c.column_name = kcu.column_name
    AND c.table_schema = kcu.table_schema
LEFT JOIN information_schema.table_constraints tc 
    ON kcu.constraint_name = tc.constraint_name
    AND kcu.table_schema = tc.table_schema
WHERE c.table_schema = 'public'
ORDER BY c.table_name, c.ordinal_position;

-- 3. FOREIGN KEY RELATIONSHIPS
SELECT 
    'FOREIGN KEYS' as section,
    tc.table_name as source_table,
    kcu.column_name as source_column,
    ccu.table_name as referenced_table,
    ccu.column_name as referenced_column
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, kcu.column_name;

-- 4. TABLES WITH DATA
SELECT 
    'TABLES WITH DATA' as section,
    s.relname as table_name,
    s.n_tup_ins as total_rows_inserted,
    s.n_tup_upd as total_rows_updated,
    s.n_tup_del as total_rows_deleted,
    CASE 
        WHEN s.n_tup_ins > 0 THEN 'HAS DATA'
        ELSE 'EMPTY'
    END as data_status
FROM pg_stat_user_tables s
WHERE s.schemaname = 'public'
ORDER BY s.n_tup_ins DESC, s.relname;

-- 5. CUSTOM TYPES AND ENUMS
SELECT 
    'CUSTOM TYPES' as section,
    t.typname as type_name,
    CASE 
        WHEN t.typtype = 'e' THEN 'ENUM'
        WHEN t.typtype = 'c' THEN 'COMPOSITE'
        WHEN t.typtype = 'd' THEN 'DOMAIN'
        ELSE 'OTHER'
    END as type_type
FROM pg_catalog.pg_type t
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
    AND t.typtype IN ('e', 'c', 'd')
ORDER BY t.typname;

-- 6. INDEXES
SELECT 
    'INDEXES' as section,
    t.tablename as table_name,
    i.indexname as index_name,
    CASE 
        WHEN i.indexdef LIKE '%UNIQUE%' THEN 'UNIQUE'
        ELSE 'NON-UNIQUE'
    END as index_type
FROM pg_indexes i
JOIN pg_tables t ON i.tablename = t.tablename
WHERE i.schemaname = 'public' AND t.schemaname = 'public'
ORDER BY t.tablename, i.indexname;

-- 7. VIEWS
SELECT 
    'VIEWS' as section,
    v.viewname as view_name
FROM pg_views v
WHERE v.schemaname = 'public'
ORDER BY v.viewname;

-- 8. FUNCTIONS
SELECT 
    'FUNCTIONS' as section,
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
ORDER BY p.proname;

-- 9. SUMMARY STATISTICS
SELECT 
    'SUMMARY' as section,
    'Total Tables' as metric,
    COUNT(*)::text as value
FROM pg_tables t
WHERE t.schemaname = 'public'

UNION ALL

SELECT 
    'SUMMARY' as section,
    'Tables with Data' as metric,
    COUNT(*)::text as value
FROM pg_stat_user_tables s
WHERE s.schemaname = 'public' AND s.n_tup_ins > 0

UNION ALL

SELECT 
    'SUMMARY' as section,
    'Total Custom Types' as metric,
    COUNT(*)::text as value
FROM pg_catalog.pg_type t
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public' AND t.typtype IN ('e', 'c', 'd')

UNION ALL

SELECT 
    'SUMMARY' as section,
    'Total Functions' as metric,
    COUNT(*)::text as value
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'

UNION ALL

SELECT 
    'SUMMARY' as section,
    'Migration Recommendation' as metric,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_stat_user_tables s
            WHERE s.schemaname = 'public' AND s.n_tup_ins > 0
        ) THEN 'BACKUP REQUIRED - Database has existing data'
        ELSE 'CLEAN INSTALL - Database appears to be empty'
    END as value;
