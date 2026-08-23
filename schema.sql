-- =========================================================================
-- Revlytics Cloudflare D1 Database Schema
-- Database ID: 6f0f1928-9284-4184-8b0e-333ada672515
-- =========================================================================

-- 4b. Index FAQs Table
CREATE TABLE index_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  question TEXT NOT NULL, answer TEXT, 
  sort_order INTEGER NOT NULL DEFAULT 0, 
  is_active INTEGER NOT NULL DEFAULT 1
);
-- 4c. Service FAQs Table
CREATE TABLE service_faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  service_slug TEXT NOT NULL, question TEXT NOT NULL, 
  answer TEXT, meta_title TEXT, meta_description TEXT, 
  schema_type TEXT DEFAULT 'FAQPage', 
  sort_order INTEGER NOT NULL DEFAULT 0, 
  is_active INTEGER NOT NULL DEFAULT 1
);
-- 4d. FAQ Page Table
CREATE TABLE faq_page (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  subheading TEXT NOT NULL, section_sort_order INTEGER NOT NULL DEFAULT 0, 
  question TEXT NOT NULL, answer TEXT, 
  question_sort_order INTEGER NOT NULL DEFAULT 0, 
  is_active INTEGER NOT NULL DEFAULT 1
)
