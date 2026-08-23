/**
 * =========================================================================
 * Revlytics Cloudflare Worker & D1 Database API
 * Domain: https://revelytics.mkmkataria07.workers.dev
 * Database ID: 6f0f1928-9284-4184-8b0e-333ada672515
 * =========================================================================
 */

// Cloudflare D1 Type Definitions
export interface D1Result<T = unknown> {
  results: T[];
  success: boolean;
  meta: {
    last_row_id: number;
    changes: number;
    duration: number;
    rows_read: number;
    rows_written: number;
  };
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run<T = unknown>(): Promise<D1Result<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1Result>;
}

export interface Env {
  DB: D1Database;
  ASSETS?: { fetch: (request: Request) => Promise<Response> };
  ENVIRONMENT?: string;
  API_URL?: string;
  MASTER_API_KEY?: string;
  PEXELS_API_KEY?: string;
}

// Global CORS Headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
  'Access-Control-Max-Age': '86400',
};

// Standard JSON Response Helper
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

// API Key Authentication Middleware Helper
async function verifyApiKey(request: Request, env: Env): Promise<{ valid: boolean; keyData?: any }> {
  const apiKey =
    request.headers.get('x-api-key') ||
    request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!apiKey) return { valid: false };

  // Master fallback check
  if (apiKey === 'rev_live_9a8b7c6d5e4f3a2b1c0d' || (env.MASTER_API_KEY && apiKey === env.MASTER_API_KEY)) {
    return { valid: true, keyData: { permissions: 'admin,read,write', name: 'Master Key' } };
  }

  try {
    const keyRecord = await env.DB.prepare(
      'SELECT * FROM api_keys WHERE api_key = ? AND is_active = 1'
    )
      .bind(apiKey)
      .first();

    if (keyRecord) {
      return { valid: true, keyData: keyRecord };
    }
  } catch (err) {
    console.error('Error verifying API Key:', err);
  }

  return { valid: false };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';
    const method = request.method.toUpperCase();

    // 1. Handle CORS Preflight
    if (method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // 2. Serve Static Frontend Assets (SPA-aware)
    if (!path.startsWith('/api') && env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
      // SPA fallback: serve index.html for unmatched client routes
      return env.ASSETS.fetch(new Request(new URL('/', request.url), request));
    }

    try {
      // -----------------------------------------------------------------------
      // ROOT & HEALTH CHECK
      // -----------------------------------------------------------------------
      if (path === '/' || path === '/api' || path === '/api/health') {
        if (env.ASSETS && path === '/') {
          return await env.ASSETS.fetch(request);
        }

        return jsonResponse({
          success: true,
          service: 'Revlytics Cloudflare D1 Worker API',
          domain: 'https://revelytics.mkmkataria07.workers.dev',
          databaseId: '6f0f1928-9284-4184-8b0e-333ada672515',
          status: 'healthy',
          endpoints: [
            '/api/setup (POST/GET to initialize database schema & seeds)',
            '/api/blogs (GET, POST, PUT, DELETE)',
            '/api/services (GET, POST, PUT, DELETE)',
            '/api/faqs (GET, POST, PUT, DELETE)',
            '/api/inquiries (GET, POST)',
            '/api/keys (GET, POST, verify)',
          ],
        });
      }

      // -----------------------------------------------------------------------
      // DATABASE SETUP & AUTO-MIGRATION ROUTE
      // -----------------------------------------------------------------------
      if (path === '/api/setup' || path === '/api/init') {
        // Create tables
        await env.DB.batch([
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS api_keys (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              key_name TEXT NOT NULL,
              api_key TEXT NOT NULL UNIQUE,
              permissions TEXT DEFAULT 'read,write',
              is_active INTEGER DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `),
          env.DB.prepare(`
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
          `),
          env.DB.prepare(`
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
          `),
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS faqs (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              question TEXT NOT NULL,
              answer TEXT NOT NULL,
              category TEXT DEFAULT 'General',
              order_index INTEGER DEFAULT 0,
              is_active INTEGER DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `),
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS faq_page (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              subheading TEXT NOT NULL,
              section_sort_order INTEGER NOT NULL DEFAULT 0,
              question TEXT NOT NULL,
              answer TEXT,
              question_sort_order INTEGER NOT NULL DEFAULT 0,
              is_active INTEGER NOT NULL DEFAULT 1
            );
          `),
          // NEW: index_faqs table (homepage FAQs) — was missing, caused fallback to faq_page
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS index_faqs (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              question TEXT NOT NULL,
              answer TEXT NOT NULL,
              sort_order INTEGER NOT NULL DEFAULT 0,
              is_active INTEGER NOT NULL DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `),
          // NEW: service_faqs table — was missing too
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS service_faqs (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              service_slug TEXT,
              question TEXT NOT NULL,
              answer TEXT NOT NULL,
              sort_order INTEGER NOT NULL DEFAULT 0,
              is_active INTEGER NOT NULL DEFAULT 1,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `),
          env.DB.prepare(`
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
          `),
          // Seed API Key
          env.DB.prepare(`
            INSERT OR IGNORE INTO api_keys (id, key_name, api_key, permissions)
            VALUES (1, 'Admin Master Key', 'rev_live_9a8b7c6d5e4f3a2b1c0d', 'admin,read,write');
          `),
          // Seed Services
          env.DB.prepare(`
            INSERT OR IGNORE INTO services (id, title, category, image_url, order_index) VALUES
            (1, 'Luxury Resort Branding', 'Branding', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 1),
            (2, 'Direct Booking Engine UX', 'Development', 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 2),
            (3, 'Destination Marketing & SEO', 'Growth', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 3),
            (4, 'Virtual Travel Experience & 3D', 'Innovation', 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 4),
            (5, 'Hospitality Mobile App Suite', 'Engineering', 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop', 5);
          `),
          // Seed general faqs table
          env.DB.prepare(`
            INSERT OR IGNORE INTO faqs (id, question, answer, order_index) VALUES
            (1, 'What is Revlytics?', 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.', 1),
            (2, 'How long does a travel digital transformation project take?', 'Project timelines range from 2 to 8 weeks depending on scope, from direct booking engine UX audits to end-to-end multi-property digital platforms.', 2),
            (3, 'How does Revlytics help increase direct hotel bookings?', 'We optimize the entire booking funnel — from immersive visual storytelling and mobile checkout speed to automated analytics tracking and revenue optimization.', 3),
            (4, 'Can you integrate with our existing CRS and PMS booking engines?', 'Yes! We seamlessly integrate with major booking engines including SynXis, Sabre, Cloudbeds, Mews, SiteMinder, and custom direct booking APIs.', 4),
            (5, 'Do you provide ongoing monthly growth and design retainers?', 'Yes, we offer dedicated monthly partnerships covering continuous UX improvements, CRO experimentation, SEO optimization, and campaign assets.', 5);
          `),
          // Seed faq_page (dedicated FAQ page)
          env.DB.prepare(`
            INSERT OR IGNORE INTO faq_page (id, subheading, section_sort_order, question, answer, question_sort_order, is_active) VALUES
            (1, 'Our FAQs', 1, 'What is Revlytics?', 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.', 1, 1),
            (2, 'Our FAQs', 1, 'How long does a typical project take?', 'Project timelines vary depending on scope and requirements, but most design and development projects range between 2 to 6 weeks.', 2, 1),
            (3, 'Our FAQs', 1, 'What makes Revlytics different from other agencies?', 'We focus on end-to-end strategy, rapid execution, and data-driven designs tailored specifically to scale modern luxury travel and hospitality brands.', 3, 1),
            (4, 'Our FAQs', 1, 'Can you handle both design and development?', 'Yes! We provide full-stack services including brand strategy, UI/UX design, custom web development, and digital marketing.', 4, 1),
            (5, 'Our FAQs', 1, 'Do you offer ongoing support after project delivery?', 'Absolutely. We provide flexible maintenance, optimization, and dedicated post-launch support packages to ensure long-term success.', 5, 1);
          `),
          // NEW: Seed index_faqs (homepage FAQs) — distinct copy so it's visibly separate from faq_page
          env.DB.prepare(`
            INSERT OR IGNORE INTO index_faqs (id, question, answer, sort_order, is_active) VALUES
            (1, 'What does Revlytics do?', 'We help luxury resorts and hospitality brands increase direct bookings through design, engineering, and growth strategy.', 1, 1),
            (2, 'Who is Revlytics for?', 'Boutique hotels, luxury resorts, and global destination brands looking to reduce OTA dependency and grow direct revenue.', 2, 1),
            (3, 'How do I get started?', 'Reach out through our contact form and our team will schedule an initial discovery call within 48 hours.', 3, 1);
          `),
          // Seed blogs
          env.DB.prepare(`
            INSERT OR IGNORE INTO blogs (id, slug, title, tag, image_url, summary) VALUES
            (1, 'transforming-direct-hotel-bookings-2025', 'Transforming Direct Hotel Bookings in 2025.', 'Hospitality Tech', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'How modern luxury hospitality brands are bypassing OTA commissions with custom direct booking flows.'),
            (2, 'crafting-immersive-destination-web-experiences', 'Crafting Immersive Destination Web Experiences.', 'UI/UX Design', 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'Why dynamic media, kinetic typography, and fast loading speeds drive 40% higher room reservations.'),
            (3, 'building-modern-identities-for-boutique-resorts', 'Building Modern Identities for Boutique Resorts.', 'Brand Strategy', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'The architectural elements of modern hospitality branding and experiential storytelling.');
          `),
        ]);

        return jsonResponse({
          success: true,
          message: 'Cloudflare D1 tables initialized and seeded successfully.',
          databaseId: '6f0f1928-9284-4184-8b0e-333ada672515',
        });
      }

      // -----------------------------------------------------------------------
      // 1. BLOGS API
      // -----------------------------------------------------------------------
      if (path === '/api/blogs') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM blogs WHERE is_published = 1 ORDER BY id DESC'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized. Valid API key required.' }, 401);

          const body = (await request.json()) as any;
          const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

          const result = await env.DB.prepare(`
            INSERT INTO blogs (slug, title, tag, summary, content, image_url, author)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `)
            .bind(
              slug,
              body.title,
              body.tag || 'Insights',
              body.summary || '',
              body.content || '',
              body.image_url || '',
              body.author || 'Revlytics'
            )
            .run();

          return jsonResponse({ success: true, message: 'Blog created successfully', id: result.meta.last_row_id }, 201);
        }
      }

      if (path.startsWith('/api/blogs/')) {
        const idOrSlug = decodeURIComponent(path.split('/api/blogs/')[1]);

        if (method === 'GET') {
          const isNum = !isNaN(Number(idOrSlug));
          const query = isNum
            ? 'SELECT * FROM blogs WHERE id = ?'
            : 'SELECT * FROM blogs WHERE slug = ?';
          const blog = await env.DB.prepare(query).bind(idOrSlug).first();

          if (!blog) return jsonResponse({ error: 'Blog not found' }, 404);
          return jsonResponse({ success: true, data: blog });
        }

        if (method === 'PUT') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          await env.DB.prepare(`
            UPDATE blogs SET 
              title = COALESCE(?, title),
              tag = COALESCE(?, tag),
              summary = COALESCE(?, summary),
              content = COALESCE(?, content),
              image_url = COALESCE(?, image_url),
              updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `)
            .bind(body.title, body.tag, body.summary, body.content, body.image_url, idOrSlug)
            .run();

          return jsonResponse({ success: true, message: 'Blog updated successfully' });
        }

        if (method === 'DELETE') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          await env.DB.prepare('DELETE FROM blogs WHERE id = ?').bind(idOrSlug).run();
          return jsonResponse({ success: true, message: 'Blog deleted successfully' });
        }
      }

      // -----------------------------------------------------------------------
      // 2. SERVICES API
      // -----------------------------------------------------------------------
      if (path === '/api/services') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM services WHERE is_active = 1 ORDER BY order_index ASC, id ASC'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const result = await env.DB.prepare(`
            INSERT INTO services (title, category, description, image_url, link, order_index)
            VALUES (?, ?, ?, ?, ?, ?)
          `)
            .bind(
              body.title,
              body.category || 'Service',
              body.description || '',
              body.image_url || '',
              body.link || '#services',
              body.order_index || 0
            )
            .run();

          return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
        }
      }

      if (path.startsWith('/api/services/')) {
        const id = path.split('/api/services/')[1];

        if (method === 'GET') {
          const service = await env.DB.prepare('SELECT * FROM services WHERE id = ?').bind(id).first();
          if (!service) return jsonResponse({ error: 'Service not found' }, 404);
          return jsonResponse({ success: true, data: service });
        }

        if (method === 'PUT') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          await env.DB.prepare(`
            UPDATE services SET 
              title = COALESCE(?, title),
              category = COALESCE(?, category),
              description = COALESCE(?, description),
              image_url = COALESCE(?, image_url),
              link = COALESCE(?, link),
              order_index = COALESCE(?, order_index)
            WHERE id = ?
          `)
            .bind(body.title, body.category, body.description, body.image_url, body.link, body.order_index, id)
            .run();

          return jsonResponse({ success: true, message: 'Service updated successfully' });
        }

        if (method === 'DELETE') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          await env.DB.prepare('DELETE FROM services WHERE id = ?').bind(id).run();
          return jsonResponse({ success: true, message: 'Service deleted successfully' });
        }
      }

      // -----------------------------------------------------------------------
      // 3. FAQS API
      // -----------------------------------------------------------------------
      if (path === '/api/faqs' || path === '/api/index-faqs' || path === '/api/faq-page' || path === '/api/service-faqs') {
        if (method === 'GET') {
          const type = url.searchParams.get('type') || (path === '/api/index-faqs' ? 'index' : path === '/api/faq-page' ? 'page' : path === '/api/service-faqs' ? 'service' : null);
          const serviceSlug = url.searchParams.get('service') || url.searchParams.get('slug');

          // If asking for faq_page (dedicated FAQ page)
          if (type === 'page' || path === '/api/faq-page') {
            try {
              const res = await env.DB.prepare(
                'SELECT id, subheading, section_sort_order, question, answer, question_sort_order, is_active FROM faq_page WHERE is_active = 1 ORDER BY section_sort_order ASC, question_sort_order ASC, id ASC'
              ).all();
              return jsonResponse({ success: true, count: res.results.length, data: res.results });
            } catch (e) {
              console.warn('faq_page query error:', e);
              return jsonResponse({ success: true, count: 0, data: [] });
            }
          }

          // If asking for index_faqs (homepage FAQs)
          if (type === 'index' || path === '/api/index-faqs') {
            try {
              const res = await env.DB.prepare(
                'SELECT id, question, answer, sort_order, is_active FROM index_faqs WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
              ).all();
              return jsonResponse({ success: true, count: res.results.length, data: res.results });
            } catch (e) {
              console.warn('index_faqs query error:', e);
              return jsonResponse({ success: true, count: 0, data: [] });
            }
          }

          // If asking for service_faqs
          if (type === 'service' || path === '/api/service-faqs' || serviceSlug) {
            try {
              let query = 'SELECT * FROM service_faqs WHERE is_active = 1';
              const params: any[] = [];
              if (serviceSlug) {
                query += ' AND service_slug = ?';
                params.push(serviceSlug);
              }
              query += ' ORDER BY sort_order ASC, id ASC';

              const stmt = params.length > 0 ? env.DB.prepare(query).bind(...params) : env.DB.prepare(query);
              const res = await stmt.all();
              return jsonResponse({ success: true, count: res.results.length, data: res.results });
            } catch (e) {
              console.warn('service_faqs query error:', e);
              return jsonResponse({ success: true, count: 0, data: [] });
            }
          }

          // If asking for general / faqs table
          if (type === 'general' || type === 'faqs') {
            try {
              const { results } = await env.DB.prepare(
                'SELECT * FROM faqs WHERE is_active = 1 ORDER BY order_index ASC, id ASC'
              ).all();
              return jsonResponse({ success: true, count: results?.length || 0, data: results || [] });
            } catch (e) {
              console.warn('faqs query error:', e);
              return jsonResponse({ success: true, count: 0, data: [] });
            }
          }

          // No type specified at all: default to general faqs table only.
          // (Removed the old index->page->faqs silent-fallback chain that
          // caused index_faqs requests to render faq_page content.)
          try {
            const { results } = await env.DB.prepare(
              'SELECT * FROM faqs WHERE is_active = 1 ORDER BY order_index ASC, id ASC'
            ).all();
            return jsonResponse({ success: true, count: results?.length || 0, data: results || [] });
          } catch (e: any) {
            return jsonResponse({ success: true, count: 0, data: [] });
          }
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const type = body.type || url.searchParams.get('type');

          // Explicit table targeting based on `type` in body, defaulting to `faqs`.
          if (type === 'index') {
            const result = await env.DB.prepare(`
              INSERT INTO index_faqs (question, answer, sort_order, is_active)
              VALUES (?, ?, ?, 1)
            `)
              .bind(body.question, body.answer, body.sort_order || 10)
              .run();
            return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
          }

          if (type === 'page') {
            const result = await env.DB.prepare(`
              INSERT INTO faq_page (question, answer, subheading, section_sort_order, question_sort_order, is_active)
              VALUES (?, ?, ?, ?, ?, 1)
            `)
              .bind(body.question, body.answer, body.subheading || 'Our FAQs', body.section_sort_order || 1, body.question_sort_order || 0)
              .run();
            return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
          }

          if (type === 'service') {
            const result = await env.DB.prepare(`
              INSERT INTO service_faqs (service_slug, question, answer, sort_order, is_active)
              VALUES (?, ?, ?, ?, 1)
            `)
              .bind(body.service_slug || body.serviceSlug || null, body.question, body.answer, body.sort_order || 0)
              .run();
            return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
          }

          // default: general faqs table
          const result = await env.DB.prepare(`
            INSERT INTO faqs (question, answer, category, order_index)
            VALUES (?, ?, ?, ?)
          `)
            .bind(body.question, body.answer, body.category || 'General', body.order_index || 0)
            .run();
          return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
        }
      }

      if (path.startsWith('/api/faqs/')) {
        const id = path.split('/api/faqs/')[1];

        if (method === 'DELETE') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          await env.DB.prepare('DELETE FROM faqs WHERE id = ?').bind(id).run();
          return jsonResponse({ success: true, message: 'FAQ deleted successfully' });
        }
      }

      // -----------------------------------------------------------------------
      // 4. CONTACT INQUIRIES API
      // -----------------------------------------------------------------------
      if (path === '/api/inquiries' || path === '/api/contacts') {
        if (method === 'GET') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized. API key required to view inquiries.' }, 401);

          const { results } = await env.DB.prepare(
            'SELECT * FROM inquiries ORDER BY id DESC LIMIT 100'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const body = (await request.json()) as any;
          if (!body.name || !body.email || !body.message) {
            return jsonResponse({ error: 'Missing required fields: name, email, message' }, 400);
          }

          const result = await env.DB.prepare(`
            INSERT INTO inquiries (name, email, company, budget, service_type, message)
            VALUES (?, ?, ?, ?, ?, ?)
          `)
            .bind(
              body.name,
              body.email,
              body.company || '',
              body.budget || '',
              body.service_type || body.serviceType || 'General Inquiry',
              body.message
            )
            .run();

          return jsonResponse(
            {
              success: true,
              message: 'Thank you! Your travel discovery inquiry has been safely stored in D1 database.',
              inquiryId: result.meta.last_row_id,
            },
            201
          );
        }
      }

      // -----------------------------------------------------------------------
      // 5. API KEYS MANAGEMENT
      // -----------------------------------------------------------------------
      if (path === '/api/keys' || path === '/api/api-keys') {
        if (method === 'GET') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const { results } = await env.DB.prepare(
            'SELECT id, key_name, permissions, is_active, created_at FROM api_keys'
          ).all();
          return jsonResponse({ success: true, data: results });
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const randomSuffix = crypto.randomUUID().replace(/-/g, '').slice(0, 20);
          const generatedKey = `rev_live_${randomSuffix}`;

          const result = await env.DB.prepare(`
            INSERT INTO api_keys (key_name, api_key, permissions)
            VALUES (?, ?, ?)
          `)
            .bind(body.key_name || 'New API Key', generatedKey, body.permissions || 'read,write')
            .run();

          return jsonResponse(
            {
              success: true,
              message: 'API Key generated successfully. Save this key now.',
              apiKey: generatedKey,
              id: result.meta.last_row_id,
            },
            201
          );
        }
      }

      if (path === '/api/keys/verify') {
        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          return jsonResponse({
            success: auth.valid,
            authenticated: auth.valid,
            keyData: auth.keyData || null,
          });
        }
      }

      // -----------------------------------------------------------------------
      // 6. PEXELS API PROXY (Using worker PEXELS_API_KEY)
      // -----------------------------------------------------------------------
      if (path === '/api/pexels/photos' || path === '/api/pexels') {
        if (method === 'GET') {
          const query = url.searchParams.get('query') || 'luxury resort travel';
          const perPage = url.searchParams.get('per_page') || '15';
          const apiKey =
            env.PEXELS_API_KEY ||
            'y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi';

          const res = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
            {
              headers: { Authorization: apiKey },
            }
          );
          const data = await res.json();
          return jsonResponse(data, res.status);
        }
      }

      if (path === '/api/pexels/videos') {
        if (method === 'GET') {
          const query = url.searchParams.get('query') || 'tropical travel';
          const perPage = url.searchParams.get('per_page') || '10';
          const apiKey =
            env.PEXELS_API_KEY ||
            'y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi';

          const res = await fetch(
            `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
            {
              headers: { Authorization: apiKey },
            }
          );
          const data = await res.json();
          return jsonResponse(data, res.status);
        }
      }

      // Route Not Found
      return jsonResponse({ error: 'Route not found', path }, 404);
    } catch (err: any) {
      console.error('Unhandled Worker Error:', err);
      return jsonResponse(
        {
          error: 'Internal Server Error',
          message: err?.message || String(err),
        },
        500
      );
    }
  },
};