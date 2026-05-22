-- =====================================================
-- COMPREHENSIVE DATABASE ANALYSIS SCRIPT
-- =====================================================
-- This script analyzes ALL tables, columns, and structures
-- in your current database without making assumptions about naming
-- =====================================================

-- 1. OVERVIEW: All tables in the database
SELECT 
    'DATABASE OVERVIEW' as analysis_type,
    t.tablename as table_name,
    t.schemaname as schema_name,
    CASE 
        WHEN t.tableowner = current_user THEN 'OWNED BY YOU'
        ELSE 'OWNED BY: ' || t.tableowner
    END as ownership,
    pg_size_pretty(pg_total_relation_size(t.tablename::regclass)) as table_size,
    (SELECT count(*) FROM information_schema.columns c 
     WHERE c.table_name = t.tablename AND c.table_schema = t.schemaname) as column_count
FROM pg_tables t
WHERE t.schemaname = 'public'
ORDER BY t.tablename;

-- 2. DETAILED TABLE STRUCTURES: All columns for all tables
SELECT 
    'TABLE STRUCTURE' as analysis_type,
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

-- 3. FOREIGN KEY RELATIONSHIPS: All table relationships
SELECT 
    'FOREIGN KEYS' as analysis_type,
    tc.table_name as source_table,
    kcu.column_name as source_column,
    ccu.table_name as referenced_table,
    ccu.column_name as referenced_column,
    tc.constraint_name
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

-- 4. INDEXES: All indexes on all tables
SELECT 
    'INDEXES' as analysis_type,
    t.tablename as table_name,
    i.indexname as index_name,
    i.indexdef as index_definition,
    CASE 
        WHEN i.indexdef LIKE '%UNIQUE%' THEN 'UNIQUE'
        ELSE 'NON-UNIQUE'
    END as index_type
FROM pg_indexes i
JOIN pg_tables t ON i.tablename = t.tablename
WHERE i.schemaname = 'public' AND t.schemaname = 'public'
ORDER BY t.tablename, i.indexname;

-- 5. CUSTOM TYPES AND ENUMS: All user-defined types
SELECT 
    'CUSTOM TYPES' as analysis_type,
    t.typname as type_name,
    t.typtype as type_category,
    CASE 
        WHEN t.typtype = 'e' THEN 'ENUM'
        WHEN t.typtype = 'c' THEN 'COMPOSITE'
        WHEN t.typtype = 'd' THEN 'DOMAIN'
        ELSE 'OTHER'
    END as type_type,
    pg_catalog.format_type(t.oid, NULL) as type_definition
FROM pg_catalog.pg_type t
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
    AND t.typtype IN ('e', 'c', 'd')
ORDER BY t.typname;

-- 6. VIEWS: All database views
SELECT 
    'VIEWS' as analysis_type,
    v.viewname as view_name,
    v.definition as view_definition
FROM pg_views v
WHERE v.schemaname = 'public'
ORDER BY v.viewname;

-- 7. FUNCTIONS AND PROCEDURES: All stored procedures
SELECT 
    'FUNCTIONS' as analysis_type,
    p.proname as function_name,
    pg_get_function_arguments(p.oid) as arguments,
    pg_get_function_result(p.oid) as return_type,
    p.prosrc as function_source
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
ORDER BY p.proname;

-- 8. TRIGGERS: All database triggers
SELECT 
    'TRIGGERS' as analysis_type,
    t.tgname as trigger_name,
    c.relname as table_name,
    t.tgtype as trigger_type,
    p.proname as function_name
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_proc p ON t.tgfoid = p.oid
JOIN pg_namespace n ON c.relnamespace = n.oid
WHERE n.nspname = 'public'
    AND NOT t.tgisinternal
ORDER BY c.relname, t.tgname;

-- 9. ROW LEVEL SECURITY (RLS): All RLS policies
SELECT 
    'RLS POLICIES' as analysis_type,
    p.schemaname,
    p.tablename,
    p.policyname,
    p.permissive,
    p.roles,
    p.cmd,
    p.qual,
    p.with_check
FROM pg_policies p
WHERE p.schemaname = 'public'
ORDER BY p.tablename, p.policyname;

-- 10. DATA ANALYSIS: Row counts and data presence
SELECT 
    'DATA ANALYSIS' as analysis_type,
    s.schemaname,
    s.relname as tablename,
    s.n_tup_ins as total_rows_inserted,
    s.n_tup_upd as total_rows_updated,
    s.n_tup_del as total_rows_deleted,
    CASE 
        WHEN s.n_tup_ins > 0 THEN 'HAS DATA'
        ELSE 'EMPTY'
    END as data_status,
    pg_size_pretty(pg_total_relation_size(s.schemaname||'.'||s.relname)) as total_size
FROM pg_stat_user_tables s
WHERE s.schemaname = 'public'
ORDER BY s.n_tup_ins DESC, s.relname;

-- 11. SEQUENCES: All sequences in the database
SELECT 
    'SEQUENCES' as analysis_type,
    sequence_name,
    data_type,
    start_value,
    minimum_value,
    maximum_value,
    increment,
    cycle_option
FROM information_schema.sequences
WHERE sequence_schema = 'public'
ORDER BY sequence_name;

-- 12. EXTENSIONS: All installed extensions
SELECT 
    'EXTENSIONS' as analysis_type,
    extname as extension_name,
    extversion as version,
    extrelocatable as relocatable
FROM pg_extension
ORDER BY extname;

-- 13. SCHEMA SIZE ANALYSIS: Database size breakdown
SELECT 
    'SCHEMA SIZE' as analysis_type,
    t.schemaname,
    t.tablename,
    pg_size_pretty(pg_total_relation_size(t.schemaname||'.'||t.tablename)) as total_size,
    pg_size_pretty(pg_relation_size(t.schemaname||'.'||t.tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(t.schemaname||'.'||t.tablename) - pg_relation_size(t.schemaname||'.'||t.tablename)) as index_size
FROM pg_tables t
WHERE t.schemaname = 'public'
ORDER BY pg_total_relation_size(t.schemaname||'.'||t.tablename) DESC;

-- 14. SUMMARY AND RECOMMENDATIONS
SELECT 
    'MIGRATION SUMMARY' as summary_type,
    'TOTAL TABLES' as metric,
    COUNT(*)::text as value
FROM pg_tables t
WHERE t.schemaname = 'public'

UNION ALL

SELECT 
    'MIGRATION SUMMARY' as summary_type,
    'TABLES WITH DATA' as metric,
    COUNT(*)::text as value
FROM pg_stat_user_tables s
WHERE s.schemaname = 'public' AND s.n_tup_ins > 0

UNION ALL

SELECT 
    'MIGRATION SUMMARY' as summary_type,
    'TOTAL CUSTOM TYPES' as metric,
    COUNT(*)::text as value
FROM pg_catalog.pg_type t
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public' AND t.typtype IN ('e', 'c', 'd')

UNION ALL

SELECT 
    'MIGRATION SUMMARY' as summary_type,
    'TOTAL FUNCTIONS' as metric,
    COUNT(*)::text as value
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'

UNION ALL

SELECT 
    'MIGRATION SUMMARY' as summary_type,
    'RECOMMENDATION' as metric,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_stat_user_tables s
            WHERE s.schemaname = 'public' AND s.n_tup_ins > 0
        ) THEN 'BACKUP REQUIRED - Database has existing data'
        ELSE 'CLEAN INSTALL - Database appears to be empty'
    END as value;

-- 15. FINAL RECOMMENDATIONS
SELECT 
    'NEXT STEPS' as step_type,
    'ANALYSIS COMPLETE' as action,
    'Review all tables above to identify potential conflicts with APPI schema' as description

UNION ALL

SELECT 
    'NEXT STEPS' as step_type,
    'BACKUP STRATEGY' as action,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_stat_user_tables s
            WHERE s.schemaname = 'public' AND s.n_tup_ins > 0
        ) THEN 'Create full database backup before proceeding with migration'
        ELSE 'No backup needed - database appears empty'
    END as description

UNION ALL

SELECT 
    'NEXT STEPS' as step_type,
    'MIGRATION APPROACH' as action,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM pg_stat_user_tables s
            WHERE s.schemaname = 'public' AND s.n_tup_ins > 0
        ) THEN 'Use safe-migration-script.sql to preserve existing data'
        ELSE 'Use appi-complete-schema.sql for clean installation'
    END as description;
