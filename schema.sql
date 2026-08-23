-- =========================================================================
-- Revlytics Cloudflare D1 Database Schema
-- Database ID: 6f0f1928-9284-4184-8b0e-333ada672515
-- =========================================================================

-- 1. Services Table
CREATE TABLE services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_slug TEXT NOT NULL,
  category_name TEXT NOT NULL,
  service_slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subheading TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0
);

-- 1b. Service Details Table
CREATE TABLE service_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  service_name TEXT NOT NULL DEFAULT '',
  category TEXT,
  features TEXT,
  pexels_query TEXT,
  image_url TEXT,
  process_title TEXT,
  process_steps TEXT,
  process_cta_text TEXT,
  process_cta_link TEXT,
  pexels_query_2 TEXT,
  why_choose_subtitle TEXT,
  why_choose_title TEXT,
  why_choose_items TEXT,
  faqs TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  schema_markup TEXT
);

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
);
