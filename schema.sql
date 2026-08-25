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

-- 5. Revlytics Page CMS Content Table (rev_db)
-- Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
CREATE TABLE IF NOT EXISTS rev_db (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_name TEXT NOT NULL,
    section_name TEXT NOT NULL DEFAULT 'hero',
    slug TEXT UNIQUE NOT NULL,
    heading TEXT NOT NULL,
    subheading TEXT,
    meta_heading TEXT,
    meta_data TEXT,
    category TEXT,
    author TEXT,
    date TEXT,
    image_url TEXT,
    description TEXT,
    paragraph TEXT,
    useful_quote TEXT,
    
    -- Pexels image search queries (1 featured + 4 secondary)
    pexels_featured_query TEXT,
    pexels_query_2 TEXT,
    pexels_query_3 TEXT,
    pexels_query_4 TEXT,
    pexels_query_5 TEXT,
    
    -- Structured arrays/collections (JSON format)
    -- sections_h2_para: Array of objects [{ "h2": "...", "paragraph": "..." }] (Max 5)
    sections_h2_para TEXT CHECK(json_valid(sections_h2_para)),
    
    -- tags: Array of strings ["tag1", "tag2", ...] (Max 6)
    tags TEXT CHECK(json_valid(tags)),
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Revlytics Blog & Page Comments Table
CREATE TABLE IF NOT EXISTS rev_db_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    rev_id INTEGER NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT,
    comment_text TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- e.g., 'pending', 'approved', 'spam'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rev_id) REFERENCES rev_db(id) ON DELETE CASCADE
);

-- Seed Article into rev_db
INSERT OR IGNORE INTO rev_db (
    id,
    page_name,
    section_name,
    slug,
    heading,
    subheading,
    meta_heading,
    meta_data,
    category,
    author,
    date,
    image_url,
    description,
    paragraph,
    useful_quote,
    pexels_featured_query,
    pexels_query_2,
    pexels_query_3,
    pexels_query_4,
    pexels_query_5,
    sections_h2_para,
    tags
) VALUES (
    1,
    'travel-marketing-insights',
    'hero',
    'mastering-travel-digital-marketing-growth-guide',
    'Mastering Travel Digital Marketing: Strategies to Drive Bookings in 2026',
    'From immersive storytelling to hyper-local SEO, discover how modern travel brands turn wandering dreamers into paying travelers.',
    'Travel Digital Marketing Guide 2026 | Proven Strategies for Growth',
    'Explore comprehensive travel digital marketing strategies covering SEO, short-form video, user-generated content, automated funnels, and retention tactics.',
    'Digital Marketing',
    'Elena Rostova',
    '2026-08-25',
    'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg',
    'The travel landscape is evolving rapidly. Successful brands no longer just sell destinations—they sell anticipation, friction-free planning, and personalized digital journeys.',
    'Modern travelers make decisions across dozens of digital touchpoints before confirming a booking. Capturing their attention requires moving beyond static banners to build experiential campaigns, authoritative search visibility, and frictionless booking paths across web and mobile.',
    'Travel is the only thing you buy that makes you richer, but in marketing, clarity is what actually sells the ticket.',
    'aerial beach tropical resort travel',
    'person using smartphone booking flight airport',
    'travel vlogger filming with camera mountains',
    'luxury boutique hotel room ocean view',
    'backpacker checking digital map sunset',
    json('[
        {
            "h2": "1. Dominate Intent with Destination-First SEO",
            "paragraph": "Target high-intent, long-tail queries like \"best boutique stays in Amalfi for remote workers\" rather than generic keywords. Build comprehensive destination hubs, curated itineraries, and FAQ schemas that capture travelers at the planning stage."
        },
        {
            "h2": "2. Leverage Short-Form Visual Storytelling",
            "paragraph": "Platforms like TikTok, Instagram Reels, and YouTube Shorts drive spontaneous travel inspiration. Focus on authentic, raw micro-moments—such as hidden cafe entrances or drone vistas—over polished corporate promotional reels."
        },
        {
            "h2": "3. Turn User-Generated Content into Social Proof",
            "paragraph": "Travelers trust peers more than brands. Incentivize guests to share real photos using branded hashtags, and embed authentic UGC galleries directly into booking and checkout landing pages to reduce hesitation."
        },
        {
            "h2": "4. Automate Trigger-Based Email Sequences",
            "paragraph": "Implement behavioral automation triggered by destination page views or cart abandonment. Send hyper-relevant guides, weather highlights, and time-sensitive incentives to keep your brand top-of-mind."
        },
        {
            "h2": "5. Optimize for Frictionless Mobile Conversions",
            "paragraph": "Over 60% of travel bookings begin on mobile devices. Streamline the checkout process with Apple Pay, Google Pay, transparent pricing breakdowns, and page load times under 1.5 seconds."
        }
    ]'),
    json('["TravelMarketing", "SEOStrategy", "DigitalMarketing", "ContentMarketing", "HospitalityGrowth", "SocialMediaTrends"]')
);

-- Seed Comments into rev_db_comments (Linked to rev_id = 1)
INSERT OR IGNORE INTO rev_db_comments (id, rev_id, author_name, author_email, comment_text, status, created_at) VALUES 
(1, 1, 'Marcus Vance', 'marcus.vance@triphub.com', 'Spot on about short-form video. Our micro-itinerary Reels saw a 40% increase in direct inquiries this summer.', 'approved', datetime('now', '-5 minutes')),
(2, 1, 'Amina Patel', 'amina@wanderlustmedia.io', 'Destination-first SEO has been our biggest growth driver. Niche itinerary guides convert far better than broad city keywords.', 'approved', datetime('now', '-3 minutes')),
(3, 1, 'Julian Rossi', 'j.rossi@boutiquevillas.it', 'The point about mobile checkout friction is critical. Adding one-click digital wallets reduced our drop-off rate by 22%.', 'approved', datetime('now', '-30 seconds')),
(4, 1, 'Chloe Bennett', 'chloe@bennetttravel.com', 'Great breakdown! How often do you recommend updating seasonal destination hubs for SEO freshness?', 'approved', datetime('now')),
(5, 1, 'David Lin', 'david.lin@ecotrails.co', 'UGC embedded directly at checkout made an immediate impact on our tour bookings. High-value guide.', 'approved', datetime('now'));




