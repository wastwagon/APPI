# 🗄️ Supabase Database Setup Guide

## Quick Setup Instructions

### 1. Access Your Supabase Project
- Go to: https://supabase.com/dashboard/project/qecdlbvdxulxlzsyhtgq
- Navigate to **SQL Editor**

### 2. Run the Database Schema
1. Copy the entire contents of `database/setup.sql`
2. Paste it into the SQL Editor
3. Click **Run** to execute

### 3. Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Fill in:
   - **Email**: `admin@appi.org`
   - **Password**: `admin123456`
   - **User Metadata**:
     ```json
     {
       "full_name": "APPI Administrator",
       "role": "admin"
     }
     ```
4. Click **Create User**

### 4. Test the Setup
1. Visit: `http://localhost:3001/test-connection`
2. Check if connection is successful
3. Visit: `http://localhost:3001/admin`
4. Login with admin credentials

## Troubleshooting

### If you get "Database error creating new user":
1. Make sure you've run the SQL script completely
2. Check that the `profiles` table exists
3. Verify the trigger function `handle_new_user()` was created

### If you get "supabaseKey is required":
1. Restart the development server: `pnpm dev`
2. Check that `.env.local` file exists and has correct values
3. Verify environment variables are loaded

### If tables don't exist:
1. Run the SQL script again
2. Check for any error messages in the SQL Editor
3. Make sure you have the correct permissions

## Manual Database Setup

If the automated script doesn't work, follow these steps:

### Step 1: Create Tables
Run this in SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'public' CHECK (role IN ('admin', 'party_rep', 'fellow', 'observer', 'public')),
  party_affiliation TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 2: Create Other Tables
Continue with the rest of the tables from `database/setup.sql`

### Step 3: Enable RLS and Create Policies
Run the RLS policies section from `database/setup.sql`

### Step 4: Create Functions and Triggers
Run the functions and triggers section from `database/setup.sql`

## Verification Checklist

- [ ] All tables created successfully
- [ ] RLS policies enabled
- [ ] Functions and triggers created
- [ ] Admin user created in Auth
- [ ] Connection test passes
- [ ] Admin dashboard accessible
- [ ] Login works with admin credentials

## Common Issues and Solutions

### Issue: "relation 'profiles' does not exist"
**Solution**: Run the SQL script again, ensuring all tables are created

### Issue: "function handle_new_user() does not exist"
**Solution**: Make sure the function creation part of the SQL script was executed

### Issue: "permission denied"
**Solution**: Check that you're using the correct Supabase project and have proper permissions

### Issue: Environment variables not loading
**Solution**: 
1. Restart the development server
2. Check that `.env.local` file exists in the project root
3. Verify the file has the correct format (no spaces around `=`)

## Next Steps After Setup

1. **Test the admin dashboard**: Visit `/admin` and login
2. **Create sample data**: Add some test events and publications
3. **Configure authentication**: Set up email verification if needed
4. **Set up storage**: Configure file uploads for images and documents
5. **Deploy**: Prepare for production deployment

## Support

If you continue to have issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Ensure the Supabase project is active and accessible
4. Try creating a fresh Supabase project if needed
