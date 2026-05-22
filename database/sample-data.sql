-- APPI - Sample Data Insertion Script
-- This script inserts sample data for testing and demonstration purposes
-- Run this after the main schema script

-- =====================================================
-- SAMPLE POLITICAL PARTIES
-- =====================================================

-- Ghana Political Parties
INSERT INTO political_parties (name, country_id, description, established_date, website, status) VALUES
('New Patriotic Party', (SELECT id FROM countries WHERE name = 'Ghana'), 'Conservative political party in Ghana', '1992-07-28', 'https://npp.org.gh', 'active'),
('National Democratic Congress', (SELECT id FROM countries WHERE name = 'Ghana'), 'Social democratic political party in Ghana', '1992-06-10', 'https://ndc.org.gh', 'active'),
('Convention People''s Party', (SELECT id FROM countries WHERE name = 'Ghana'), 'Socialist political party in Ghana', '1949-06-12', 'https://cpp.org.gh', 'active');

-- Nigeria Political Parties
INSERT INTO political_parties (name, country_id, description, established_date, website, status) VALUES
('All Progressives Congress', (SELECT id FROM countries WHERE name = 'Nigeria'), 'Major political party in Nigeria', '2013-07-31', 'https://apc.org.ng', 'active'),
('People''s Democratic Party', (SELECT id FROM countries WHERE name = 'Nigeria'), 'Major political party in Nigeria', '1998-08-31', 'https://pdp.org.ng', 'active'),
('Labour Party', (SELECT id FROM countries WHERE name = 'Nigeria'), 'Social democratic party in Nigeria', '2002-10-15', 'https://labourparty.org.ng', 'active');

-- Kenya Political Parties
INSERT INTO political_parties (name, country_id, description, established_date, website, status) VALUES
('Jubilee Party', (SELECT id FROM countries WHERE name = 'Kenya'), 'Major political party in Kenya', '2016-09-08', 'https://jubilee.org.ke', 'active'),
('Orange Democratic Movement', (SELECT id FROM countries WHERE name = 'Kenya'), 'Major political party in Kenya', '2005-12-18', 'https://odm.org.ke', 'active'),
('United Democratic Alliance', (SELECT id FROM countries WHERE name = 'Kenya'), 'Political party in Kenya', '2020-12-15', 'https://uda.org.ke', 'active');

-- South Africa Political Parties
INSERT INTO political_parties (name, country_id, description, established_date, website, status) VALUES
('African National Congress', (SELECT id FROM countries WHERE name = 'South Africa'), 'Major political party in South Africa', '1912-01-08', 'https://anc.org.za', 'active'),
('Democratic Alliance', (SELECT id FROM countries WHERE name = 'South Africa'), 'Major opposition party in South Africa', '2000-06-24', 'https://da.org.za', 'active'),
('Economic Freedom Fighters', (SELECT id FROM countries WHERE name = 'South Africa'), 'Radical left political party in South Africa', '2013-07-26', 'https://eff.org.za', 'active');

-- =====================================================
-- SAMPLE USERS (Note: These are mock users for demonstration)
-- =====================================================

-- Party Focal Persons
INSERT INTO users (email, full_name, role, status, party_id, country_id) VALUES
('john.owusu@npp.org.gh', 'John Owusu', 'party_focal_person', 'active', 
 (SELECT id FROM political_parties WHERE name = 'New Patriotic Party'), 
 (SELECT id FROM countries WHERE name = 'Ghana')),

('sarah.mensah@ndc.org.gh', 'Sarah Mensah', 'party_focal_person', 'active', 
 (SELECT id FROM political_parties WHERE name = 'National Democratic Congress'), 
 (SELECT id FROM countries WHERE name = 'Ghana')),

('ahmed.bello@apc.org.ng', 'Ahmed Bello', 'party_focal_person', 'active', 
 (SELECT id FROM political_parties WHERE name = 'All Progressives Congress'), 
 (SELECT id FROM countries WHERE name = 'Nigeria')),

('grace.odhiambo@jp.org.ke', 'Grace Odhiambo', 'party_focal_person', 'active', 
 (SELECT id FROM political_parties WHERE name = 'Jubilee Party'), 
 (SELECT id FROM countries WHERE name = 'Kenya')),

('thabo.maseko@anc.org.za', 'Thabo Maseko', 'party_focal_person', 'active', 
 (SELECT id FROM political_parties WHERE name = 'African National Congress'), 
 (SELECT id FROM countries WHERE name = 'South Africa'));

-- Fellows
INSERT INTO users (email, full_name, role, status, party_id, country_id) VALUES
('kofi.adjei@fellow.appi.org', 'Kofi Adjei', 'fellow', 'active', 
 (SELECT id FROM political_parties WHERE name = 'New Patriotic Party'), 
 (SELECT id FROM countries WHERE name = 'Ghana')),

('chioma.okonkwo@fellow.appi.org', 'Chioma Okonkwo', 'fellow', 'active', 
 (SELECT id FROM political_parties WHERE name = 'All Progressives Congress'), 
 (SELECT id FROM countries WHERE name = 'Nigeria')),

('wambui.kimani@fellow.appi.org', 'Wambui Kimani', 'fellow', 'active', 
 (SELECT id FROM political_parties WHERE name = 'Jubilee Party'), 
 (SELECT id FROM countries WHERE name = 'Kenya')),

('sipho.ndlovu@fellow.appi.org', 'Sipho Ndlovu', 'fellow', 'active', 
 (SELECT id FROM political_parties WHERE name = 'African National Congress'), 
 (SELECT id FROM countries WHERE name = 'South Africa'));

-- Platform Collaborators
INSERT INTO users (email, full_name, role, status, party_id, country_id) VALUES
('emma.boateng@collaborator.appi.org', 'Emma Boateng', 'platform_collaborator', 'active', 
 (SELECT id FROM political_parties WHERE name = 'National Democratic Congress'), 
 (SELECT id FROM countries WHERE name = 'Ghana')),

('david.adebayo@collaborator.appi.org', 'David Adebayo', 'platform_collaborator', 'active', 
 (SELECT id FROM political_parties WHERE name = 'People''s Democratic Party'), 
 (SELECT id FROM countries WHERE name = 'Nigeria')),

('jane.wanjiku@collaborator.appi.org', 'Jane Wanjiku', 'platform_collaborator', 'active', 
 (SELECT id FROM political_parties WHERE name = 'Orange Democratic Movement'), 
 (SELECT id FROM countries WHERE name = 'Kenya')),

('peter.van@collaborator.appi.org', 'Peter van der Merwe', 'platform_collaborator', 'active', 
 (SELECT id FROM political_parties WHERE name = 'Democratic Alliance'), 
 (SELECT id FROM countries WHERE name = 'South Africa'));

-- =====================================================
-- SAMPLE EVENTS
-- =====================================================

INSERT INTO events (title, description, event_type, start_date, end_date, location, country_id, max_participants, registration_deadline, status) VALUES
('African Political Parties Summit 2025', 
 'The premier gathering of African political parties to discuss democratic governance and political reform.', 
 'summit', '2025-06-15 09:00:00+00', '2025-06-17 18:00:00+00', 
 'Accra International Conference Centre, Accra, Ghana', 
 (SELECT id FROM countries WHERE name = 'Ghana'), 500, '2025-05-15 23:59:59+00', 'upcoming'),

('Political Academy Training Workshop', 
 'Capacity building workshop for political party leaders and members.', 
 'training', '2025-04-20 08:00:00+00', '2025-04-22 17:00:00+00', 
 'Nairobi Convention Centre, Nairobi, Kenya', 
 (SELECT id FROM countries WHERE name = 'Kenya'), 100, '2025-04-10 23:59:59+00', 'upcoming'),

('Reform Dialogue Series - Nigeria', 
 'Series of dialogues on political reform and democratic governance in Nigeria.', 
 'dialogue', '2025-05-10 10:00:00+00', '2025-05-10 16:00:00+00', 
 'Abuja International Conference Centre, Abuja, Nigeria', 
 (SELECT id FROM countries WHERE name = 'Nigeria'), 200, '2025-05-05 23:59:59+00', 'upcoming'),

('Inclusive Leadership Workshop', 
 'Workshop focused on promoting inclusive leadership within political parties.', 
 'workshop', '2025-07-15 09:00:00+00', '2025-07-16 17:00:00+00', 
 'Cape Town Convention Centre, Cape Town, South Africa', 
 (SELECT id FROM countries WHERE name = 'South Africa'), 150, '2025-07-10 23:59:59+00', 'upcoming');

-- =====================================================
-- SAMPLE PUBLICATIONS
-- =====================================================

INSERT INTO publications (title, subtitle, content, excerpt, author_id, category_id, type, language, tags, published_at) VALUES
('Democratic Governance in Africa: Challenges and Opportunities', 
 'A comprehensive analysis of democratic governance across African nations', 
 'This publication examines the current state of democratic governance in Africa...', 
 'An in-depth analysis of democratic governance challenges and opportunities across African nations.', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 (SELECT id FROM content_categories WHERE name = 'Research Papers' LIMIT 1), 
 'research_paper', 'en', ARRAY['democracy', 'governance', 'africa'], 
 '2024-12-01 10:00:00+00'),

('Political Party Reform Toolkit', 
 'Practical guide for political party reform and modernization', 
 'This toolkit provides practical guidance for political parties seeking to reform...', 
 'A comprehensive toolkit for political party reform and modernization.', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 (SELECT id FROM content_categories WHERE name = 'Toolkits' LIMIT 1), 
 'toolkit', 'en', ARRAY['reform', 'toolkit', 'political-parties'], 
 '2024-11-15 14:00:00+00'),

('Youth Engagement in African Politics', 
 'Strategies for increasing youth participation in political processes', 
 'This report explores strategies for increasing youth participation...', 
 'Strategies and best practices for increasing youth participation in African political processes.', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 (SELECT id FROM content_categories WHERE name = 'Reports' LIMIT 1), 
 'report', 'en', ARRAY['youth', 'engagement', 'politics'], 
 '2024-10-20 09:00:00+00');

-- =====================================================
-- SAMPLE NEWS ARTICLES
-- =====================================================

INSERT INTO news_articles (title, content, excerpt, author_id, category, language, published_at) VALUES
('APPI Launches New Political Academy Program', 
 'The African Political Parties Initiative has launched a new Political Academy program...', 
 'APPI announces the launch of its new Political Academy program aimed at strengthening political parties.', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 'Announcements', 'en', '2024-12-15 08:00:00+00'),

('Summit 2025: Registration Now Open', 
 'Registration for the African Political Parties Summit 2025 is now open...', 
 'Early registration is now open for the upcoming African Political Parties Summit 2025.', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 'Events', 'en', '2024-12-10 10:00:00+00'),

('New Research Fellowship Program Announced', 
 'APPI is pleased to announce the launch of its new Research Fellowship Program...', 
 'A new research fellowship program has been announced to support political research in Africa.', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 'Programs', 'en', '2024-12-05 14:00:00+00');

-- =====================================================
-- SAMPLE INTERNAL REPORTS (Member Portal Content)
-- =====================================================

INSERT INTO internal_reports (title, content, category, author_id, access_level, created_at) VALUES
('Internal Party Reform Assessment - Ghana', 
 'Comprehensive assessment of political party reform progress in Ghana...', 
 'Assessment', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 'party_focal_person', 
 '2024-12-01 09:00:00+00'),

('Training Needs Analysis Report', 
 'Analysis of training needs across political parties in the region...', 
 'Analysis', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 'fellow', 
 '2024-11-25 11:00:00+00'),

('Capacity Building Framework', 
 'Framework for capacity building initiatives across political parties...', 
 'Framework', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 'platform_collaborator', 
 '2024-11-20 15:00:00+00');

-- =====================================================
-- SAMPLE TRAINING MATERIALS (Member Portal Content)
-- =====================================================

INSERT INTO training_materials (title, description, category, access_level, created_at) VALUES
('Democratic Governance Fundamentals', 
 'Comprehensive training material covering the fundamentals of democratic governance.', 
 'Governance', 
 'party_focal_person', 
 '2024-12-01 10:00:00+00'),

('Political Party Management', 
 'Training materials for effective political party management and organization.', 
 'Management', 
 'fellow', 
 '2024-11-28 14:00:00+00'),

('Youth Engagement Strategies', 
 'Strategies and best practices for engaging youth in political processes.', 
 'Engagement', 
 'platform_collaborator', 
 '2024-11-25 16:00:00+00');

-- =====================================================
-- SAMPLE TOOLKITS (Member Portal Content)
-- =====================================================

INSERT INTO toolkits (name, description, category, access_level, created_at) VALUES
('Political Party Reform Toolkit', 
 'Comprehensive toolkit for political party reform and modernization.', 
 'Reform', 
 'party_focal_person', 
 '2024-12-01 11:00:00+00'),

('Communication Strategy Toolkit', 
 'Toolkit for developing effective communication strategies for political parties.', 
 'Communication', 
 'fellow', 
 '2024-11-30 13:00:00+00'),

('Digital Campaign Toolkit', 
 'Digital tools and strategies for modern political campaigns.', 
 'Digital', 
 'platform_collaborator', 
 '2024-11-27 15:00:00+00');

-- =====================================================
-- SAMPLE DRAFT DECLARATIONS (Member Portal Content)
-- =====================================================

INSERT INTO draft_declarations (title, content, version, author_id, status, created_at) VALUES
('Draft Declaration on Democratic Governance', 
 'This draft declaration outlines principles for democratic governance...', 
 '1.0', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 'draft', 
 '2024-12-01 12:00:00+00'),

('Draft Declaration on Youth Participation', 
 'Draft declaration promoting youth participation in political processes...', 
 '1.0', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 'draft', 
 '2024-11-29 14:00:00+00'),

('Draft Declaration on Political Party Reform', 
 'Draft declaration on political party reform and modernization...', 
 '1.0', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 'draft', 
 '2024-11-26 16:00:00+00');

-- =====================================================
-- SAMPLE PARTY ENGAGEMENT RECORDS
-- =====================================================

INSERT INTO party_engagement (party_id, engagement_type, description, date, status, created_at) VALUES
((SELECT id FROM political_parties WHERE name = 'New Patriotic Party'), 
 'Training', 'Political Academy training session', '2024-12-15', 'completed', 
 '2024-12-15 09:00:00+00'),

((SELECT id FROM political_parties WHERE name = 'All Progressives Congress'), 
 'Consultation', 'Reform dialogue consultation', '2024-12-10', 'completed', 
 '2024-12-10 14:00:00+00'),

((SELECT id FROM political_parties WHERE name = 'Jubilee Party'), 
 'Assessment', 'Party reform assessment', '2024-12-05', 'in_progress', 
 '2024-12-05 11:00:00+00');

-- =====================================================
-- SAMPLE REFORM PROGRESS RECORDS
-- =====================================================

INSERT INTO reform_progress (party_id, reform_area, progress_percentage, description, date, created_at) VALUES
((SELECT id FROM political_parties WHERE name = 'New Patriotic Party'), 
 'Internal Democracy', 75, 'Significant progress in internal democratic processes', '2024-12-15', 
 '2024-12-15 10:00:00+00'),

((SELECT id FROM political_parties WHERE name = 'All Progressives Congress'), 
 'Youth Engagement', 60, 'Moderate progress in youth engagement initiatives', '2024-12-10', 
 '2024-12-10 15:00:00+00'),

((SELECT id FROM political_parties WHERE name = 'Jubilee Party'), 
 'Transparency', 45, 'Initial progress in transparency measures', '2024-12-05', 
 '2024-12-05 12:00:00+00');

-- =====================================================
-- SAMPLE SCHEDULED ACTIVITIES
-- =====================================================

INSERT INTO scheduled_activities (title, description, activity_type, assigned_to, scheduled_date, status, created_at) VALUES
('Follow-up Meeting - NPP', 
 'Follow-up meeting with New Patriotic Party leadership', 
 'Meeting', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 '2024-12-20 10:00:00+00', 'scheduled', 
 '2024-12-15 09:00:00+00'),

('Training Session - APC', 
 'Training session for All Progressives Congress members', 
 'Training', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), 
 '2024-12-22 14:00:00+00', 'scheduled', 
 '2024-12-15 10:00:00+00'),

('Assessment Review - JP', 
 'Review of Jubilee Party reform assessment', 
 'Review', 
 (SELECT id FROM users WHERE role = 'platform_collaborator' LIMIT 1), 
 '2024-12-25 11:00:00+00', 'scheduled', 
 '2024-12-15 11:00:00+00');

-- =====================================================
-- SAMPLE CONTACT SUBMISSIONS
-- =====================================================

INSERT INTO contact_submissions (name, email, subject, message, status, created_at) VALUES
('Kwame Asante', 'kwame.asante@email.com', 'General Inquiry', 
 'I would like to learn more about APPI''s programs and how my party can get involved.', 
 'new', '2024-12-15 08:00:00+00'),

('Fatima Hassan', 'fatima.hassan@email.com', 'Partnership Request', 
 'Our organization is interested in partnering with APPI on democratic governance initiatives.', 
 'new', '2024-12-14 14:00:00+00'),

('David Mwangi', 'david.mwangi@email.com', 'Event Information', 
 'I would like more information about the upcoming summit and registration process.', 
 'new', '2024-12-13 16:00:00+00');

-- =====================================================
-- SAMPLE NEWSLETTER SUBSCRIPTIONS
-- =====================================================

INSERT INTO newsletter_subscriptions (email, language, is_active, subscribed_at) VALUES
('newsletter1@email.com', 'en', true, '2024-12-15 09:00:00+00'),
('newsletter2@email.com', 'fr', true, '2024-12-14 10:00:00+00'),
('newsletter3@email.com', 'pt', true, '2024-12-13 11:00:00+00'),
('newsletter4@email.com', 'es', true, '2024-12-12 12:00:00+00'),
('newsletter5@email.com', 'ar', true, '2024-12-11 13:00:00+00');

-- =====================================================
-- SAMPLE WEBSITE ANALYTICS
-- =====================================================

INSERT INTO website_analytics (page_url, session_id, visitor_ip, user_agent, created_at) VALUES
('/', 'session_001', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-12-15 10:00:00+00'),
('/about', 'session_001', '192.168.1.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', '2024-12-15 10:05:00+00'),
('/platforms', 'session_002', '192.168.1.2', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', '2024-12-15 11:00:00+00'),
('/summit', 'session_003', '192.168.1.3', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', '2024-12-15 12:00:00+00'),
('/contact', 'session_004', '192.168.1.4', 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36', '2024-12-15 13:00:00+00');

-- =====================================================
-- SAMPLE MEDIA FILES
-- =====================================================

INSERT INTO media_files (filename, original_name, file_path, file_size, mime_type, uploaded_by, created_at) VALUES
('summit_banner_2025.jpg', 'summit_banner_2025.jpg', '/uploads/events/summit_banner_2025.jpg', 2048576, 'image/jpeg', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), '2024-12-15 09:00:00+00'),

('training_manual.pdf', 'training_manual.pdf', '/uploads/materials/training_manual.pdf', 5120000, 'application/pdf', 
 (SELECT id FROM users WHERE role = 'fellow' LIMIT 1), '2024-12-14 14:00:00+00'),

('party_logo_npp.png', 'party_logo_npp.png', '/uploads/parties/party_logo_npp.png', 1024000, 'image/png', 
 (SELECT id FROM users WHERE role = 'party_focal_person' LIMIT 1), '2024-12-13 16:00:00+00');

-- =====================================================
-- SAMPLE EVENT REGISTRATIONS
-- =====================================================

INSERT INTO event_registrations (event_id, user_id, status, registration_data, created_at) VALUES
((SELECT id FROM events WHERE title = 'African Political Parties Summit 2025'), 
 (SELECT id FROM users WHERE email = 'john.owusu@npp.org.gh'), 
 'confirmed', 
 '{"dietary_restrictions": "none", "accommodation_required": true}', 
 '2024-12-15 08:00:00+00'),

((SELECT id FROM events WHERE title = 'Political Academy Training Workshop'), 
 (SELECT id FROM users WHERE email = 'sarah.mensah@ndc.org.gh'), 
 'confirmed', 
 '{"dietary_restrictions": "vegetarian", "accommodation_required": false}', 
 '2024-12-14 10:00:00+00'),

((SELECT id FROM events WHERE title = 'Reform Dialogue Series - Nigeria'), 
 (SELECT id FROM users WHERE email = 'ahmed.bello@apc.org.ng'), 
 'pending', 
 '{"dietary_restrictions": "none", "accommodation_required": true}', 
 '2024-12-13 14:00:00+00');

-- =====================================================
-- SAMPLE AUDIT LOG ENTRIES
-- =====================================================

INSERT INTO audit_log (action, table_name, record_id, user_id, old_values, new_values, ip_address, user_agent, created_at) VALUES
('INSERT', 'users', 'user_001', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 NULL, 
 '{"email": "newuser@example.com", "full_name": "New User"}', 
 '192.168.1.100', 
 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
 '2024-12-15 09:00:00+00'),

('UPDATE', 'political_parties', 'party_001', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 '{"status": "inactive"}', 
 '{"status": "active"}', 
 '192.168.1.100', 
 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
 '2024-12-15 10:00:00+00'),

('DELETE', 'events', 'event_001', 
 (SELECT id FROM users WHERE role = 'admin' LIMIT 1), 
 '{"title": "Old Event", "description": "Old description"}', 
 NULL, 
 '192.168.1.100', 
 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', 
 '2024-12-15 11:00:00+00');

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'Sample data insertion completed successfully!' as status;
