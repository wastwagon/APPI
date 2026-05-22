# Database Scripts

This folder contains all database-related SQL scripts for the APPI project.

## 🔍 **Debugging Scripts**

### **check_rls_policies.sql**
- **Purpose**: Check all Row Level Security (RLS) policies on all tables
- **Use**: Run this first to diagnose RLS issues
- **Output**: Shows RLS policies, table security settings, and access tests

### **check_supabase_connection.sql**
- **Purpose**: Test Supabase connection and service role access
- **Use**: Diagnose connection issues and role permissions
- **Output**: Connection status, user roles, and table access tests

### **fix_rls_policies.sql**
- **Purpose**: Fix RLS policies that might be blocking admin access
- **Use**: Run after identifying RLS issues
- **Actions**: Disables RLS or creates permissive policies for admin access

## 🏗️ **Schema and Setup Scripts**

### **schema.sql**
- **Purpose**: Main database schema definition
- **Use**: Initial database setup
- **Tables**: profiles, political_parties, events, publications, etc.

### **appi-complete-schema.sql**
- **Purpose**: Complete schema with all tables and relationships
- **Use**: Full database setup with comprehensive structure
- **Features**: Includes users table, foreign keys, indexes

### **setup.sql**
- **Purpose**: Database initialization script
- **Use**: Set up the database from scratch
- **Includes**: Tables, indexes, initial data

## 🔧 **Migration Scripts**

### **safe-migration-script.sql**
- **Purpose**: Safe database migration without data loss
- **Use**: Update existing database structure
- **Features**: Preserves existing data

### **safe-appi-migration.sql**
- **Purpose**: APPI-specific migration script
- **Use**: Migrate to APPI schema
- **Features**: Handles data transformation

### **clean-fresh-appi-schema.sql**
- **Purpose**: Clean schema for fresh installation
- **Use**: New database setup
- **Features**: No existing data dependencies

## 👥 **User Management Scripts**

### **admin-users-setup.sql**
- **Purpose**: Set up admin users and permissions
- **Use**: Create initial admin accounts
- **Features**: Admin user creation with proper roles

### **fix-admin-password.sql**
- **Purpose**: Fix admin password issues
- **Use**: Reset or update admin passwords
- **Features**: Secure password hashing

### **fix-user-creation.sql**
- **Purpose**: Fix user creation issues
- **Use**: Resolve user registration problems
- **Features**: User table fixes and constraints

## 📊 **Analysis Scripts**

### **analyze-current-database.sql**
- **Purpose**: Analyze current database structure and data
- **Use**: Database health check and analysis
- **Output**: Table sizes, row counts, relationships

### **combined-database-analysis.sql**
- **Purpose**: Comprehensive database analysis
- **Use**: Full database audit
- **Features**: Multiple analysis queries combined

### **simple-database-analysis.sql**
- **Purpose**: Basic database analysis
- **Use**: Quick database overview
- **Features**: Essential statistics and checks

## 📝 **Sample Data**

### **sample-data.sql**
- **Purpose**: Sample data for testing and development
- **Use**: Populate database with test data
- **Features**: Realistic sample data for all tables

## 📚 **Documentation**

### **MIGRATION_GUIDE.md**
- **Purpose**: Guide for database migrations
- **Use**: Step-by-step migration instructions
- **Features**: Best practices and troubleshooting

## 🚀 **Usage Instructions**

### **For Debugging "Failed to fetch members":**

1. **First, run the diagnostic:**
   ```sql
   -- Run in Supabase SQL Editor
   \i database/check_rls_policies.sql
   ```

2. **Test the connection:**
   ```sql
   -- Run in Supabase SQL Editor
   \i database/check_supabase_connection.sql
   ```

3. **Fix RLS issues (if needed):**
   ```sql
   -- Run in Supabase SQL Editor
   \i database/fix_rls_policies.sql
   ```

4. **Test the API:**
   ```
   Visit: https://your-domain.com/api/test-database
   ```

### **For New Database Setup:**

1. **Run the complete schema:**
   ```sql
   \i database/appi-complete-schema.sql
   ```

2. **Set up admin users:**
   ```sql
   \i database/admin-users-setup.sql
   ```

3. **Add sample data (optional):**
   ```sql
   \i database/sample-data.sql
   ```

## 🔒 **Security Notes**

- **RLS Policies**: Most tables have Row Level Security enabled
- **Service Role**: Admin APIs use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- **Environment Variables**: Ensure all Supabase keys are properly configured
- **Backup**: Always backup your database before running migration scripts

## 📞 **Troubleshooting**

### **Common Issues:**

1. **"Failed to fetch members"**
   - Check RLS policies with `check_rls_policies.sql`
   - Fix with `fix_rls_policies.sql`

2. **Connection errors**
   - Verify environment variables
   - Test with `check_supabase_connection.sql`

3. **Permission denied**
   - Ensure service role key is correct
   - Check RLS policies

### **Environment Variables Required:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```
