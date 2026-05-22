const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  try {
    console.log('🚀 Setting up APPI database...')
    
    // Read the schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Execute the schema
    const { error } = await supabase.rpc('exec_sql', { sql: schema })
    
    if (error) {
      console.error('❌ Error setting up database:', error)
      return
    }
    
    console.log('✅ Database schema created successfully!')
    
    // Create initial admin user
    console.log('👤 Creating initial admin user...')
    
    const { data: adminUser, error: adminError } = await supabase.auth.admin.createUser({
      email: 'admin@appi.org',
      password: 'admin123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'APPI Administrator',
        role: 'admin'
      }
    })
    
    if (adminError) {
      console.error('❌ Error creating admin user:', adminError)
      return
    }
    
    console.log('✅ Admin user created successfully!')
    console.log('📧 Email: admin@appi.org')
    console.log('🔑 Password: admin123456')
    console.log('⚠️  Please change the password after first login!')
    
    // Create some sample data
    console.log('📊 Creating sample data...')
    
    // Sample political parties
    const { error: partiesError } = await supabase
      .from('political_parties')
      .insert([
        {
          name: 'African National Congress',
          country: 'South Africa',
          description: 'Leading political party in South Africa',
          status: 'active'
        },
        {
          name: 'All Progressives Congress',
          country: 'Nigeria',
          description: 'Major political party in Nigeria',
          status: 'active'
        }
      ])
    
    if (partiesError) {
      console.error('❌ Error creating sample parties:', partiesError)
    } else {
      console.log('✅ Sample political parties created!')
    }
    
    // Sample events
    const { error: eventsError } = await supabase
      .from('events')
      .insert([
        {
          title: 'APPI Annual Summit 2024',
          description: 'Annual gathering of African political parties',
          event_type: 'summit',
          start_date: '2024-12-15T09:00:00Z',
          end_date: '2024-12-17T18:00:00Z',
          location: 'Addis Ababa, Ethiopia',
          country: 'Ethiopia',
          max_participants: 500,
          status: 'upcoming'
        }
      ])
    
    if (eventsError) {
      console.error('❌ Error creating sample events:', eventsError)
    } else {
      console.log('✅ Sample events created!')
    }
    
    console.log('🎉 Database setup completed successfully!')
    console.log('🌐 You can now access the admin dashboard at: http://localhost:3001/admin')
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupDatabase()
