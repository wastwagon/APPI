-- =====================================================
-- COMBINED DATABASE ANALYSIS SCRIPT
-- =====================================================
-- This script shows ALL tables and their structures in ONE result set
-- =====================================================

-- COMBINED ANALYSIS: All tables with their columns and details
SELECT 
    'TABLE_OVERVIEW' as analysis_type,
    t.tablename as table_name,
    t.tableowner as owner,
    pg_size_pretty(pg_total_relation_size(t.tablename::regclass)) as size,
    (SELECT count(*) FROM information_schema.columns c 
     WHERE c.table_name = t.tablename AND c.table_schema = t.schemaname) as column_count,
    CASE 
        WHEN s.n_tup_ins > 0 THEN 'HAS DATA'
        ELSE 'EMPTY'
    END as data_status,
    s.n_tup_ins as row_count,
    '' as column_name,
    '' as data_type,
    '' as is_nullable,
    '' as constraints
FROM pg_tables t
LEFT JOIN pg_stat_user_tables s ON t.tablename = s.relname AND t.schemaname = s.schemaname
WHERE t.schemaname = 'public'

UNION ALL

-- COLUMN DETAILS: All columns for all tables
SELECT 
    'COLUMN_DETAIL' as analysis_type,
    c.table_name as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    c.column_name,
    c.data_type || 
    CASE 
        WHEN c.character_maximum_length IS NOT NULL THEN '(' || c.character_maximum_length || ')'
        WHEN c.numeric_precision IS NOT NULL THEN '(' || c.numeric_precision || ',' || c.numeric_scale || ')'
        ELSE ''
    END as data_type,
    c.is_nullable,
    CASE 
        WHEN tc.constraint_type = 'PRIMARY KEY' THEN 'PRIMARY KEY'
        WHEN tc.constraint_type = 'FOREIGN KEY' THEN 'FOREIGN KEY'
        WHEN tc.constraint_type = 'UNIQUE' THEN 'UNIQUE'
        WHEN c.column_default IS NOT NULL THEN 'DEFAULT: ' || c.column_default
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

UNION ALL

-- FOREIGN KEY RELATIONSHIPS
SELECT 
    'FOREIGN_KEY' as analysis_type,
    tc.table_name as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    kcu.column_name as column_name,
    'FOREIGN KEY' as data_type,
    '' as is_nullable,
    'REFERENCES ' || ccu.table_name || '(' || ccu.column_name || ')' as constraints
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'

UNION ALL

-- CUSTOM TYPES
SELECT 
    'CUSTOM_TYPE' as analysis_type,
    t.typname as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    CASE 
        WHEN t.typtype = 'e' THEN 'ENUM'
        WHEN t.typtype = 'c' THEN 'COMPOSITE'
        WHEN t.typtype = 'd' THEN 'DOMAIN'
        ELSE 'OTHER'
    END as column_name,
    'CUSTOM TYPE' as data_type,
    '' as is_nullable,
    pg_catalog.format_type(t.oid, NULL) as constraints
FROM pg_catalog.pg_type t
JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
WHERE n.nspname = 'public'
    AND t.typtype IN ('e', 'c', 'd')

UNION ALL

-- INDEXES
SELECT 
    'INDEX' as analysis_type,
    t.tablename as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    i.indexname as column_name,
    CASE 
        WHEN i.indexdef LIKE '%UNIQUE%' THEN 'UNIQUE INDEX'
        ELSE 'INDEX'
    END as data_type,
    '' as is_nullable,
    i.indexdef as constraints
FROM pg_indexes i
JOIN pg_tables t ON i.tablename = t.tablename
WHERE i.schemaname = 'public' AND t.schemaname = 'public'

UNION ALL

-- VIEWS
SELECT 
    'VIEW' as analysis_type,
    v.viewname as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    'VIEW DEFINITION' as column_name,
    'VIEW' as data_type,
    '' as is_nullable,
    LEFT(v.definition, 100) || '...' as constraints
FROM pg_views v
WHERE v.schemaname = 'public'

UNION ALL

-- FUNCTIONS
SELECT 
    'FUNCTION' as analysis_type,
    p.proname as table_name,
    '' as owner,
    '' as size,
    0 as column_count,
    '' as data_status,
    0 as row_count,
    'FUNCTION' as column_name,
    pg_get_function_result(p.oid) as data_type,
    '' as is_nullable,
    pg_get_function_arguments(p.oid) as constraints
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'

ORDER BY analysis_type, table_name, column_name;
