/**
 * =========================================================================
 * Revlytics Cloudflare Worker & D1 Database API
 * Domain: https://revelytics.mkmkataria07.workers.dev
 * Database ID: 6f0f1928-9284-4184-8b0e-333ada672515
 * =========================================================================
 */

export interface Env {
  DB: D1Database;
  ENVIRONMENT?: string;
  API_URL?: string;
  MASTER_API_KEY?: string;
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

    try {
      // -----------------------------------------------------------------------
      // ROOT & HEALTH CHECK
      // -----------------------------------------------------------------------
      if (path === '/' || path === '/api' || path === '/api/health') {
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
          // Seed FAQs
          env.DB.prepare(`
            INSERT OR IGNORE INTO faqs (id, question, answer, order_index) VALUES
            (1, 'What is Revlytics?', 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.', 1),
            (2, 'How long does a travel digital transformation project take?', 'Project timelines range from 2 to 8 weeks depending on scope, from direct booking engine UX audits to end-to-end multi-property digital platforms.', 2),
            (3, 'How does Revlytics help increase direct hotel bookings?', 'We optimize the entire booking funnel — from immersive visual storytelling and mobile checkout speed to automated analytics tracking and revenue optimization.', 3),
            (4, 'Can you integrate with our existing CRS and PMS booking engines?', 'Yes! We seamlessly integrate with major booking engines including SynXis, Sabre, Cloudbeds, Mews, SiteMinder, and custom direct booking APIs.', 4),
            (5, 'Do you provide ongoing monthly growth and design retainers?', 'Yes, we offer dedicated monthly partnerships covering continuous UX improvements, CRO experimentation, SEO optimization, and campaign assets.', 5);
          `),
          // Seed Blogs
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
      if (path === '/api/faqs') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM faqs WHERE is_active = 1 ORDER BY order_index ASC, id ASC'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
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
