# APPI Database Migration Guide

## ⚠️ IMPORTANT: Read This First

**Before running any SQL scripts, please follow these steps to ensure a safe migration:**

## Step 1: Analyze Current Database

1. **Go to your Supabase dashboard**
2. **Navigate to SQL Editor**
3. **Copy and paste the contents of `database/analyze-current-database.sql`**
4. **Click "Run"**
5. **Review the results** - This will show you:
   - Existing tables and their structure
   - Potential conflicts with the new schema
   - Whether you have existing data that needs backup

## Step 2: Decide on Migration Strategy

### Option A: Clean Install (Recommended for new projects)
- **Use if**: You have no existing data or don't mind losing it
- **Run**: `database/appi-complete-schema.sql` followed by `database/sample-data.sql`

### Option B: Safe Migration (Recommended for existing projects)
- **Use if**: You have existing data that needs to be preserved
- **Run**: `database/safe-migration-script.sql` followed by `database/sample-data.sql`

### Option C: Manual Migration (Advanced)
- **Use if**: You need to preserve specific data and customize the migration
- **Process**: Follow the safe migration script but customize the data restoration

## Step 3: Execute Migration

### For Clean Install:
```sql
-- 1. Run the complete schema
-- Copy and paste database/appi-complete-schema.sql

-- 2. Insert sample data
-- Copy and paste database/sample-data.sql
```

### For Safe Migration:
```sql
-- 1. Run the safe migration script
-- Copy and paste database/safe-migration-script.sql

-- 2. Insert sample data
-- Copy and paste database/sample-data.sql
```

## Step 4: Verify Migration

After running the scripts, verify the migration:

1. **Check tables exist**:
   ```sql
   SELECT tablename FROM pg_tables 
   WHERE schemaname = 'public' 
   ORDER BY tablename;
   ```

2. **Check sample data**:
   ```sql
   SELECT COUNT(*) as countries FROM countries;
   SELECT COUNT(*) as categories FROM content_categories;
   ```

3. **Test the application**:
   - Visit: `http://localhost:3000/admin`
   - Visit: `http://localhost:3000/member/login`

## Potential Conflicts to Watch For

### Tables That Might Conflict:
- `users` - User management
- `profiles` - User profiles
- `events` - Event management
- `publications` - Content management
- `political_parties` - Party information
- `countries` - Country reference data
- `content_categories` - Content organization

### Extensions That Might Conflict:
- `uuid-ossp` - UUID generation
- `pgcrypto` - Encryption functions

### Types/Enums That Might Conflict:
- `user_role` - User role enumeration
- `user_status` - User status enumeration
- `event_type` - Event type enumeration

## Backup Strategy

The safe migration script automatically creates backups in a schema named `backup_YYYYMMDD` (e.g., `backup_20250120`).

### To restore from backup:
```sql
-- Example: Restore users table from backup
INSERT INTO public.users 
SELECT * FROM backup_20250120.users 
WHERE id NOT IN (SELECT id FROM public.users);
```

### To view backup contents:
```sql
-- List backup schemas
SELECT schemaname FROM pg_tables 
WHERE schemaname LIKE 'backup_%' 
GROUP BY schemaname;

-- View backed up tables
SELECT tablename FROM pg_tables 
WHERE schemaname = 'backup_20250120';
```

## Troubleshooting

### Common Issues:

1. **"Table already exists" error**
   - Solution: Use the safe migration script instead of the complete schema

2. **"Type already exists" error**
   - Solution: The safe migration script handles this automatically

3. **"Permission denied" error**
   - Solution: Ensure you're using the correct database and have proper permissions

4. **"Foreign key constraint" error**
   - Solution: The safe migration script handles dependencies automatically

### Rollback Plan:

If something goes wrong, you can rollback:

1. **Drop the new tables**:
   ```sql
   DROP SCHEMA public CASCADE;
   CREATE SCHEMA public;
   ```

2. **Restore from backup**:
   ```sql
   -- Restore each table from backup schema
   CREATE TABLE public.users AS SELECT * FROM backup_YYYYMMDD.users;
   -- Repeat for other tables
   ```

## Post-Migration Tasks

After successful migration:

1. **Update environment variables** in your `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Test the application**:
   - Admin dashboard: `/admin`
   - Member portal: `/member/login`
   - Member dashboard: `/member/dashboard`

3. **Create admin user** (if needed):
   ```sql
   -- This will be handled by Supabase Auth in production
   -- For testing, you can create a user directly in the database
   ```

## Support

If you encounter issues:

1. **Check the analysis results** from Step 1
2. **Review the error messages** carefully
3. **Use the safe migration script** if you have existing data
4. **Contact support** with the specific error message

**Contact Information:**
- Email: appi@africagovernancecentre.org
- Phone: +233 53 054 5528

---

**Remember: Always backup your data before running any migration scripts!**
