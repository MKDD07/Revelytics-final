-- =========================================================================
-- Revlytics Cloudflare D1 Database Schema
-- Database ID: 6f0f1928-9284-4184-8b0e-333ada672515
-- =========================================================================

-- 1. API Keys Table
CREATE TABLE IF NOT EXISTS api_keys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key_name TEXT NOT NULL,
  api_key TEXT NOT NULL UNIQUE,
  permissions TEXT DEFAULT 'read,write',
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT NOT NULL,
  tag TEXT NOT NULL,
  summary TEXT,
  content TEXT,
  image_url TEXT,
  author TEXT DEFAULT 'Revlytics Editorial',
  is_published INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  image_url TEXT,
  link TEXT DEFAULT '#services',
  order_index INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  order_index INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4b. Index FAQs Table
CREATE TABLE IF NOT EXISTS index_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4c. Service FAQs Table
CREATE TABLE IF NOT EXISTS service_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  service_slug TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  meta_title TEXT,
  meta_description TEXT,
  schema_type TEXT DEFAULT 'FAQPage',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

-- 4d. FAQ Page Table
CREATE TABLE IF NOT EXISTS faq_page (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subheading TEXT NOT NULL,
  section_sort_order INTEGER NOT NULL DEFAULT 0,
  question TEXT NOT NULL,
  answer TEXT,
  question_sort_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1
);

-- 5. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  budget TEXT,
  service_type TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- INITIAL SEED DATA
-- =========================================================================

-- Seed API Key
INSERT OR IGNORE INTO api_keys (id, key_name, api_key, permissions)
VALUES (1, 'Admin Master Key', 'rev_live_9a8b7c6d5e4f3a2b1c0d', 'admin,read,write');

-- Seed Services
INSERT OR IGNORE INTO services (id, title, category, image_url, order_index) VALUES
(1, 'Luxury Resort Branding', 'Branding', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 1),
(2, 'Direct Booking Engine UX', 'Development', 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 2),
(3, 'Destination Marketing & SEO', 'Growth', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 3),
(4, 'Virtual Travel Experience & 3D', 'Innovation', 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 4),
(5, 'Hospitality Mobile App Suite', 'Engineering', 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 5);

-- Seed FAQs
INSERT OR IGNORE INTO faqs (id, question, answer, order_index) VALUES
(1, 'What is Revlytics?', 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.', 1),
(2, 'How long does a travel digital transformation project take?', 'Project timelines range from 2 to 8 weeks depending on scope, from direct booking engine UX audits to end-to-end multi-property digital platforms.', 2),
(3, 'How does Revlytics help increase direct hotel bookings?', 'We optimize the entire booking funnel — from immersive visual storytelling and mobile checkout speed to automated analytics tracking and revenue optimization.', 3),
(4, 'Can you integrate with our existing CRS and PMS booking engines?', 'Yes! We seamlessly integrate with major booking engines including SynXis, Sabre, Cloudbeds, Mews, SiteMinder, and custom direct booking APIs.', 4),
(5, 'Do you provide ongoing monthly growth and design retainers?', 'Yes, we offer dedicated monthly partnerships covering continuous UX improvements, CRO experimentation, SEO optimization, and campaign assets.', 5);

-- Seed Blogs
INSERT OR IGNORE INTO blogs (id, slug, title, tag, image_url, summary) VALUES
(1, 'transforming-direct-hotel-bookings-2025', 'Transforming Direct Hotel Bookings in 2025.', 'Hospitality Tech', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'How modern luxury hospitality brands are bypassing OTA commissions with custom direct booking flows.'),
(2, 'crafting-immersive-destination-web-experiences', 'Crafting Immersive Destination Web Experiences.', 'UI/UX Design', 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'Why dynamic media, kinetic typography, and fast loading speeds drive 40% higher room reservations.'),
(3, 'building-modern-identities-for-boutique-resorts', 'Building Modern Identities for Boutique Resorts.', 'Brand Strategy', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'The architectural elements of modern hospitality branding and experiential storytelling.');
