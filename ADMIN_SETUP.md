# APPI Admin Authentication Setup

## Overview
This guide sets up a proper admin authentication system for the APPI project, similar to the reference schema provided.

## Database Setup

### 1. Run the Admin Database Schema
Execute the following SQL in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database/admin-users-setup.sql
```

This will create:
- `admin_users` table with proper authentication
- `admin_sessions` table for session management
- `audit_log_entries` table for activity tracking
- Default admin user with credentials: `admin@appi.org` / `admin123`

### 2. Verify Tables Created
Check that the following tables exist in your Supabase database:
- `admin_users`
- `admin_sessions` 
- `audit_log_entries`

## Features Implemented

### ✅ Admin Authentication
- **Database-driven authentication** (not hardcoded)
- **Session management** with secure cookies
- **Password hashing** using bcryptjs
- **Role-based permissions** (super_admin, admin, moderator)

### ✅ Security Features
- **Audit logging** for all admin actions
- **Session expiration** (24 hours)
- **IP tracking** for security monitoring
- **User agent logging** for session management

### ✅ API Endpoints
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/verify` - Session verification
- `POST /api/admin/auth/logout` - Admin logout

### ✅ Admin Dashboard
- **Real-time authentication** status
- **User role display**
- **Session management**
- **Professional UI** with statistics

## Usage

### 1. Access Admin Panel
Visit: `http://localhost:3001/admin`

### 2. Login Credentials
- **Email**: `admin@appi.org`
- **Password**: `admin123`

### 3. Features Available
- ✅ Secure login/logout
- ✅ Session persistence
- ✅ Role-based access
- ✅ Activity logging
- ✅ Professional dashboard

## Database Schema

### admin_users Table
```sql
- id (UUID, Primary Key)
- email (TEXT, Unique)
- password_hash (TEXT)
- full_name (TEXT)
- role (TEXT: super_admin, admin, moderator)
- permissions (JSONB)
- is_active (BOOLEAN)
- last_login (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### admin_sessions Table
```sql
- id (UUID, Primary Key)
- admin_user_id (UUID, Foreign Key)
- session_token (TEXT, Unique)
- expires_at (TIMESTAMP)
- ip_address (INET)
- user_agent (TEXT)
- created_at (TIMESTAMP)
```

### audit_log_entries Table
```sql
- id (UUID, Primary Key)
- admin_user_id (UUID, Foreign Key)
- action (TEXT)
- table_name (TEXT)
- record_id (TEXT)
- old_values (JSONB)
- new_values (JSONB)
- ip_address (INET)
- user_agent (TEXT)
- created_at (TIMESTAMP)
```

## Security Notes

1. **Change Default Password**: Update the default admin password in production
2. **Environment Variables**: Ensure all Supabase environment variables are set
3. **HTTPS**: Use HTTPS in production for secure cookie transmission
4. **Rate Limiting**: Consider adding rate limiting for login attempts
5. **Backup**: Regular database backups for admin data

## Troubleshooting

### Common Issues

1. **"Database error"**: Check Supabase connection and environment variables
2. **"Invalid credentials"**: Verify admin user exists in database
3. **Session issues**: Clear browser cookies and try again
4. **Middleware errors**: Check environment variables in middleware

### Debug Steps

1. Check `/debug-env` for environment variable status
2. Verify database tables exist in Supabase
3. Check browser console for JavaScript errors
4. Verify API endpoints are accessible

## Next Steps

1. **Add More Admin Users**: Create additional admin accounts
2. **Implement User Management**: Add CRUD operations for admin users
3. **Add Permissions System**: Implement granular permissions
4. **Add Two-Factor Authentication**: Enhance security
5. **Add Password Reset**: Self-service password recovery
