const bcrypt = require('bcryptjs')

async function createAdminUser() {
  const email = 'admin@appi.org'
  const password = 'admin123'
  
  // Hash the password
  const passwordHash = await bcrypt.hash(password, 12)
  
  console.log('Admin User Details:')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('Password Hash:', passwordHash)
  
  console.log('\nSQL to insert admin user:')
  console.log(`
INSERT INTO admin_users (email, password_hash, full_name, role, permissions) 
VALUES (
  '${email}',
  '${passwordHash}',
  'APPI Administrator',
  'super_admin',
  '{"users": {"read": true, "write": true, "delete": true}, "events": {"read": true, "write": true, "delete": true}, "publications": {"read": true, "write": true, "delete": true}, "parties": {"read": true, "write": true, "delete": true}}'
) ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  permissions = EXCLUDED.permissions;
  `)
}

createAdminUser().catch(console.error)
