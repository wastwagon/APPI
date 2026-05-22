# Database Setup Guide

## 🗄️ Setting up the APPI Database in Supabase

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your APPI project: `qecdlbvdxulxlzsyhtgq`

### Step 2: Run Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `database/schema.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the schema

### Step 3: Create Admin User
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Fill in the details:
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

### Step 4: Verify Database Tables
1. Go to **Table Editor**
2. Verify these tables exist:
   - `profiles`
   - `political_parties`
   - `events`
   - `publications`
   - `event_registrations`
   - `working_groups`
   - `news_articles`

### Step 5: Test the Application
1. Make sure your development server is running: `pnpm dev`
2. Visit: `http://localhost:3001/admin`
3. Login with:
   - **Email**: `admin@appi.org`
   - **Password**: `admin123456`

## 🔧 Manual Database Setup (Alternative)

If the automated script doesn't work, you can set up the database manually:

### 1. Create Tables
Run this SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
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

-- Create political_parties table
CREATE TABLE political_parties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  logo_url TEXT,
  website TEXT,
  description TEXT,
  established_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('summit', 'dialogue', 'workshop', 'conference', 'meeting')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  country TEXT,
  max_participants INTEGER,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  featured_image TEXT,
  agenda JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create publications table
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT,
  excerpt TEXT,
  type TEXT NOT NULL CHECK (type IN ('policy_brief', 'report', 'toolkit', 'research', 'news')),
  category TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'fr', 'pt', 'es', 'ar', 'am', 'sw')),
  author_id UUID REFERENCES profiles(id),
  pdf_url TEXT,
  cover_image TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_registrations table
CREATE TABLE event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  registration_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'waitlist')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Create working_groups table
CREATE TABLE working_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  focus_area TEXT,
  lead_coordinator UUID REFERENCES profiles(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  member_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news_articles table
CREATE TABLE news_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  author_id UUID REFERENCES profiles(id),
  featured_image TEXT,
  category TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'fr', 'pt', 'es', 'ar', 'am', 'sw')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Create Indexes
```sql
-- Create indexes for better performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_events_start_date ON events(start_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_publications_type ON publications(type);
CREATE INDEX idx_publications_language ON publications(language);
CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON event_registrations(user_id);
```

### 3. Enable Row Level Security
```sql
-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE political_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE working_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
```

### 4. Create RLS Policies
```sql
-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Anyone can view published events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage events" ON events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Publications policies
CREATE POLICY "Anyone can view published publications" ON publications
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage publications" ON publications
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Event registrations policies
CREATE POLICY "Users can view their own registrations" ON event_registrations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create registrations" ON event_registrations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all registrations" ON event_registrations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 5. Create Functions and Triggers
```sql
-- Create functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'public')
  );
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
```

## 🧪 Testing the Setup

After setting up the database:

1. **Start the development server**:
   ```bash
   pnpm dev
   ```

2. **Visit the admin dashboard**:
   ```
   http://localhost:3001/admin
   ```

3. **Login with admin credentials**:
   - Email: `admin@appi.org`
   - Password: `admin123456`

4. **Test the features**:
   - View dashboard statistics
   - Navigate through admin sections
   - Create test data

## 🔐 Security Notes

- Change the default admin password after first login
- Use strong passwords for production
- Enable email verification for new users
- Set up proper backup strategies
- Monitor database usage and performance

## 🆘 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that `.env.local` file exists
   - Verify environment variables are correct

2. **"Unauthorized" errors**
   - Check that RLS policies are properly set up
   - Verify user roles in the database

3. **"Table doesn't exist" errors**
   - Run the database schema again
   - Check that all tables were created successfully

4. **Authentication issues**
   - Verify Supabase project settings
   - Check that auth is enabled in Supabase

For more help, check the Supabase documentation or create an issue in the repository.
