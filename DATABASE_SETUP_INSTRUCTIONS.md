# APPI Database Setup Instructions

## Overview

This document provides comprehensive instructions for setting up the APPI (African Political Parties Initiative) database with member portal functionality, admin dashboard, and political party management system.

## Database Structure

The APPI database includes the following key components:

### 1. **Authentication & User Management**
- User roles: Admin, Party Focal Person, Fellow, Platform Collaborator, Observer, Public
- Political parties management
- User permissions and access control
- Countries and locations

### 2. **Content Management**
- Publications and news articles
- Content categories
- Media files management
- Internal reports and draft declarations

### 3. **Events & Summit Management**
- Event types and scheduling
- Event registrations
- Capacity management

### 4. **Member Portal & Private Content**
- Internal reports with access control
- Draft declarations
- Training materials
- Toolkits and resources

### 5. **Engagement & Progress Tracking**
- Party engagement metrics
- Reform progress tracking
- Activity scheduling

### 6. **Analytics & Reporting**
- Website analytics
- Newsletter subscriptions
- Contact form submissions

## Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and API keys

### Step 2: Run Database Schema

1. Go to your Supabase dashboard → SQL Editor
2. Copy and paste the contents of `database/appi-complete-schema.sql`
3. Click "Run" to execute the schema

### Step 3: Insert Sample Data

1. In the same SQL Editor
2. Copy and paste the contents of `database/sample-data.sql`
3. Click "Run" to insert sample data

### Step 4: Verify Setup

1. Check that all tables exist in Supabase Table Editor
2. Verify sample data has been inserted
3. Test the views and functions

## Key Features Implemented

### 🔐 **Member Portal System**

#### **User Roles & Access Levels**
- **Party Focal Persons**: Full access to internal reports, training materials, toolkits
- **Fellows**: Research access to publications, training materials, draft declarations
- **Platform Collaborators**: Capacity building access to toolkits, training materials
- **Admins**: Full system access and management capabilities

#### **Private Content Management**
- **Internal Reports**: Confidential reports with role-based access
- **Draft Declarations**: Working documents for political parties
- **Training Materials**: Custom courses with video and document support
- **Toolkits**: Practical implementation guides and resources

#### **Engagement Tracking**
- **Party Engagement Metrics**: Track member activity and participation
- **Reform Progress**: Monitor political party reform initiatives
- **Activity Scheduling**: Plan and manage upcoming activities

### 🛠️ **Admin Dashboard Features**

#### **Member Portal Management**
- **User Directory**: Complete member listing with search and filters
- **Role Management**: Assign and manage user roles and permissions
- **Access Control**: Monitor and control member portal access
- **Bulk Actions**: Send emails, verify users, export data

#### **Content Management**
- **Publications**: Manage public and private publications
- **Events**: Create and manage events and registrations
- **Political Parties**: Manage party information and relationships
- **Media Files**: Upload and organize media assets

#### **Analytics & Reporting**
- **User Statistics**: Track member portal usage
- **Engagement Metrics**: Monitor party participation
- **System Status**: Monitor database and API health

## Database Tables Overview

### Core Tables

| Table | Description | Key Features |
|-------|-------------|--------------|
| `users` | User profiles and authentication | Role-based access, party affiliation |
| `political_parties` | Political party information | Country, ideology, status |
| `countries` | Country reference data | Flags, codes, names |
| `content_categories` | Content organization | Hierarchical categories |
| `publications` | Public and private content | Status, categories, authors |
| `events` | Event management | Types, scheduling, capacity |
| `internal_reports` | Private member content | Access control, file management |
| `training_materials` | Educational content | Video, documents, progress tracking |
| `toolkits` | Implementation resources | Version control, access levels |
| `party_engagement` | Engagement metrics | Activity tracking, analytics |
| `reform_progress` | Progress tracking | Status, challenges, targets |

### Security Features

#### **Row Level Security (RLS)**
- All sensitive tables have RLS enabled
- Users can only access content appropriate to their role
- Admins have full access to all data

#### **Access Control Policies**
- **Public Content**: Publications and events with 'active' status
- **Member Content**: Role-based access to internal reports and materials
- **Admin Content**: Full access for administrative users

## Sample Data Included

### **Political Parties**
- Ghana: NPP, NDC, CPP
- Nigeria: APC, PDP, LP
- Kenya: JP, ODM, UDA
- South Africa: ANC, DA, EFF

### **Users**
- **Party Focal Persons**: 5 sample users across different parties
- **Fellows**: 4 research and policy experts
- **Platform Collaborators**: 4 capacity building leads

### **Content**
- **Publications**: 4 sample publications across categories
- **Events**: 4 upcoming events (summit, training, conference)
- **Internal Reports**: 3 confidential reports
- **Training Materials**: 4 courses with different difficulty levels
- **Toolkits**: 4 practical implementation guides

### **Engagement Data**
- **Party Engagement**: 50 sample engagement records
- **Reform Progress**: 5 reform areas with progress tracking
- **Scheduled Activities**: 4 upcoming activities

## API Endpoints (To Be Implemented)

### **Authentication**
```typescript
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/register
POST /api/auth/verify
```

### **Member Portal**
```typescript
GET /api/members/profile
PUT /api/members/profile
GET /api/members/reports
GET /api/members/training
GET /api/members/toolkits
GET /api/members/activities
PUT /api/members/progress
```

### **Admin Management**
```typescript
GET /api/admin/members
POST /api/admin/members
PUT /api/admin/members/:id
DELETE /api/admin/members/:id
GET /api/admin/analytics
GET /api/admin/reports
```

## Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Next.js Configuration
NODE_ENV=development
VERCEL_ENV=development

# Internationalization
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_LOCALES=en,fr,pt,es,ar,am,sw

# File Upload
NEXT_PUBLIC_MAX_FILE_SIZE=10485760
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,application/pdf
```

## Testing the Setup

### **1. Database Connection**
Visit: `http://localhost:3000/test-connection`
Should show successful database connection

### **2. Admin Dashboard**
Visit: `http://localhost:3000/admin`
Should show the updated admin dashboard with member portal stats

### **3. Member Portal**
Visit: `http://localhost:3000/member/login`
Should show the secure member login page

### **4. Member Management**
Visit: `http://localhost:3000/admin/members`
Should show the member management interface

## Next Steps

### **Immediate Tasks**
1. **Backend Integration**: Implement API endpoints for member portal
2. **Authentication**: Set up Supabase Auth with role-based access
3. **File Upload**: Implement file upload for reports and materials
4. **Email System**: Set up email notifications for members

### **Future Enhancements**
1. **Real-time Features**: Live chat, notifications, activity feeds
2. **Advanced Analytics**: Detailed engagement and progress reports
3. **Mobile App**: Native mobile application for members
4. **Multilingual Support**: Translate member portal content
5. **Integration**: Connect with external political party systems

## Support

For technical support or questions:
- **Email**: appi@africagovernancecentre.org
- **Phone**: +233 53 054 5528
- **Address**: 32 Hackman Owusu Agyeman Street, East Legon, Accra – Ghana

## Files Created/Updated

### **Database Files**
- `database/appi-complete-schema.sql` - Complete database schema
- `database/sample-data.sql` - Sample data for testing

### **Admin Pages**
- `app/admin/page.tsx` - Updated admin dashboard
- `app/admin/members/page.tsx` - New member management page
- `app/admin/layout.tsx` - Updated navigation

### **Member Portal**
- `app/member/login/page.tsx` - Secure member login
- `app/member/dashboard/page.tsx` - Member dashboard

### **Documentation**
- `DATABASE_SETUP_INSTRUCTIONS.md` - This file
- `README.md` - Updated project documentation

---

**Built with ❤️ for African Political Parties Initiative**
