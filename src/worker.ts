/**
 * =========================================================================
 * Revlytics Cloudflare Worker & D1 Database API
 * Domain: https://revelytics-final.mkmkataria07.workers.dev/
 * Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
 * =========================================================================
 *
 * NOTE ON SCHEMA:
 * The tables `index_faqs`, `service_faqs`, and `faq_page` already exist in
 * the D1 database (created manually — see schema below). The `/api/setup`
 * route no longer tries to (re)create or reseed them, since doing so was
 * redundant and, for `service_faqs`, actually mismatched the real column
 * set (real table has `service_slug NOT NULL`, `meta_title`,
 * `meta_description`, `schema_type` — none of which the old worker knew
 * about). All read/write routes below now target the real columns.
 *
 * CREATE TABLE index_faqs (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   question TEXT NOT NULL, answer TEXT,
 *   sort_order INTEGER NOT NULL DEFAULT 0,
 *   is_active INTEGER NOT NULL DEFAULT 1
 * );
 *
 * CREATE TABLE service_faqs (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   service_slug TEXT NOT NULL, question TEXT NOT NULL,
 *   answer TEXT, meta_title TEXT, meta_description TEXT,
 *   schema_type TEXT DEFAULT 'FAQPage',
 *   sort_order INTEGER NOT NULL DEFAULT 0,
 *   is_active INTEGER NOT NULL DEFAULT 1
 * );
 *
 * CREATE TABLE faq_page (
 *   id INTEGER PRIMARY KEY AUTOINCREMENT,
 *   subheading TEXT NOT NULL, section_sort_order INTEGER NOT NULL DEFAULT 0,
 *   question TEXT NOT NULL, answer TEXT,
 *   question_sort_order INTEGER NOT NULL DEFAULT 0,
 *   is_active INTEGER NOT NULL DEFAULT 1
 * );
 * =========================================================================
 */

// Cloudflare D1 Type Definitions
import { getMetadataForPath } from './utils/seoData';
import {
  hashPassword,
  verifyPassword,
  generateSessionToken,
  verifySessionToken,
  encodeApiKey,
  decodeApiKey,
} from './utils/adminAuth';

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

// Sitemap & Robots Handlers (Connected to Cloudflare D1 Database)
async function handleRobots(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const robotsTxt = `User-agent: *
Allow: /
Allow: /services
Allow: /services/*
Allow: /blog
Allow: /blog/*
Allow: /faq
Allow: /contact

Sitemap: ${origin}/sitemap.xml`;
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

/**
 * Dynamic Complete Sitemap containing all static pages + D1 services + D1 blogs in a single <urlset>
 */
async function handleDynamicSitemapXml(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const today = new Date().toISOString().split('T')[0];

  const toDateStr = (val: any) => {
    if (!val) return today;
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return today;
      return d.toISOString().split('T')[0];
    } catch {
      return today;
    }
  };

  // 1. Static Core Pages
  const staticPages = [
    { loc: `${origin}/`, priority: '1.0', changefreq: 'daily', lastmod: today },
    { loc: `${origin}/services`, priority: '0.95', changefreq: 'daily', lastmod: today },
    { loc: `${origin}/blog`, priority: '0.90', changefreq: 'daily', lastmod: today },
    { loc: `${origin}/faq`, priority: '0.80', changefreq: 'monthly', lastmod: today },
    { loc: `${origin}/contact`, priority: '0.80', changefreq: 'monthly', lastmod: today },
  ];

  // 2. Dynamic Services from Cloudflare D1
  const STATIC_SERVICES = [
    'luxury-resort-branding',
    'direct-booking-engine-ux',
    'destination-marketing-seo',
    'virtual-travel-experience-3d',
    'hospitality-mobile-app-suite',
    'ui-ux-design',
    'web-development',
    'brand-identity',
    'digital-marketing',
    'motion-graphics',
  ];

  let dbServices: any[] = [];
  if (env?.DB) {
    try {
      const svcRes = await env.DB.prepare(
        `SELECT service_slug, updated_at, created_at FROM services
         WHERE is_active = 1 OR is_active IS NULL
         ORDER BY sort_order ASC, id ASC`
      ).all();
      dbServices = svcRes?.results || [];
    } catch (e) {
      console.warn('D1 services query error in sitemap:', e);
    }
  }

  const seenServiceSlugs = new Set(
    dbServices.map((s: any) => s.service_slug || s.slug).filter(Boolean)
  );

  const serviceEntries = [
    ...dbServices
      .filter((s: any) => s && (s.service_slug || s.slug))
      .map((s: any) => ({
        loc: `${origin}/services/${s.service_slug || s.slug}`,
        lastmod: toDateStr(s.updated_at || s.created_at),
        changefreq: 'weekly',
        priority: '0.85',
      })),
    ...STATIC_SERVICES
      .filter((slug) => !seenServiceSlugs.has(slug))
      .map((slug) => ({
        loc: `${origin}/services/${slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.85',
      })),
  ];

  // 3. Dynamic Blogs from Cloudflare D1 (rev_db + blogs tables)
  const STATIC_BLOGS = [
    'mastering-travel-digital-marketing-growth-guide',
    'transforming-direct-hotel-bookings-2025',
    'crafting-immersive-destination-web-experiences',
    'building-modern-identities-for-boutique-resorts',
  ];

  let dbBlogs: any[] = [];
  if (env?.DB) {
    try {
      const revRes = await env.DB.prepare(
        `SELECT slug, updated_at, created_at, date FROM rev_db
         WHERE slug IS NOT NULL AND slug != ''
         ORDER BY id DESC`
      ).all();
      dbBlogs = revRes?.results || [];

      if (dbBlogs.length === 0) {
        const blogRes = await env.DB.prepare(
          `SELECT slug, updated_at, created_at FROM blogs
           WHERE is_published = 1 OR is_published IS NULL
           ORDER BY id DESC`
        ).all();
        dbBlogs = blogRes?.results || [];
      }
    } catch (e) {
      console.warn('D1 blogs query error in sitemap:', e);
    }
  }

  const seenBlogSlugs = new Set<string>();
  const blogEntries: Array<{ loc: string; lastmod: string; changefreq: string; priority: string }> = [];

  for (const post of dbBlogs) {
    if (post?.slug && !seenBlogSlugs.has(post.slug)) {
      seenBlogSlugs.add(post.slug);
      blogEntries.push({
        loc: `${origin}/blog/${post.slug}`,
        lastmod: toDateStr(post.updated_at || post.created_at || post.date),
        changefreq: 'weekly',
        priority: '0.80',
      });
    }
  }

  for (const slug of STATIC_BLOGS) {
    if (!seenBlogSlugs.has(slug)) {
      seenBlogSlugs.add(slug);
      blogEntries.push({
        loc: `${origin}/blog/${slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.80',
      });
    }
  }

  // Assemble full dynamic URL set
  const allUrls = [...staticPages, ...serviceEntries, ...blogEntries];

  const xmlEntries = allUrls
    .map(
      (item) => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

async function handleSitemapIndex(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${origin}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${origin}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${origin}/sitemap-blogs.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

async function handleSitemapPages(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: `${origin}/`, priority: '1.0', changefreq: 'daily' },
    { loc: `${origin}/services`, priority: '0.95', changefreq: 'daily' },
    { loc: `${origin}/blog`, priority: '0.90', changefreq: 'daily' },
    { loc: `${origin}/faq`, priority: '0.80', changefreq: 'monthly' },
    { loc: `${origin}/contact`, priority: '0.80', changefreq: 'monthly' },
  ];

  const urls = staticUrls
    .map(
      (page) =>
`  <url>
    <loc>${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

async function handleSitemapServices(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const today = new Date().toISOString().split('T')[0];

  const toDateStr = (val: any) => {
    if (!val) return today;
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return today;
      return d.toISOString().split('T')[0];
    } catch {
      return today;
    }
  };

  const STATIC_SERVICES = [
    'luxury-resort-branding',
    'direct-booking-engine-ux',
    'destination-marketing-seo',
    'virtual-travel-experience-3d',
    'hospitality-mobile-app-suite',
    'ui-ux-design',
    'web-development',
    'brand-identity',
    'digital-marketing',
    'motion-graphics',
  ];

  let dbResults: any[] = [];
  if (env?.DB) {
    try {
      const queryRes = await env.DB.prepare(
        `SELECT service_slug, updated_at, created_at FROM services
         WHERE is_active = 1 OR is_active IS NULL
         ORDER BY sort_order ASC, id ASC`
      ).all();
      dbResults = queryRes?.results || [];
    } catch (e) {
      console.warn('sitemap-services query error:', e);
    }
  }

  const dbSlugs = new Set(dbResults.map((s: any) => s.service_slug || s.slug).filter(Boolean));
  const allEntries: Array<{ slug: string; lastmod: string }> = [
    ...dbResults
      .filter((svc: any) => svc && (svc.service_slug || svc.slug))
      .map((svc: any) => ({
        slug: svc.service_slug || svc.slug,
        lastmod: toDateStr(svc.updated_at || svc.created_at),
      })),
    ...STATIC_SERVICES
      .filter((s) => !dbSlugs.has(s))
      .map((s) => ({ slug: s, lastmod: today })),
  ];

  const urls = allEntries
    .map(
      ({ slug, lastmod }) =>
`  <url>
    <loc>${origin}/services/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

async function handleSitemapBlogs(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const origin =
    url.origin && !url.origin.includes('localhost') && !url.origin.includes('127.0.0.1')
      ? url.origin
      : 'https://www.revlytics.in';
  const today = new Date().toISOString().split('T')[0];

  const toDateStr = (val: any) => {
    if (!val) return today;
    try {
      const d = new Date(val);
      if (isNaN(d.getTime())) return today;
      return d.toISOString().split('T')[0];
    } catch {
      return today;
    }
  };

  const STATIC_BLOGS = [
    'mastering-travel-digital-marketing-growth-guide',
    'transforming-direct-hotel-bookings-2025',
    'crafting-immersive-destination-web-experiences',
    'building-modern-identities-for-boutique-resorts',
  ];

  let results: any[] = [];
  if (env?.DB) {
    try {
      const queryRes = await env.DB.prepare(
        `SELECT slug, updated_at, created_at, date FROM rev_db
         WHERE slug IS NOT NULL AND slug != ''
         ORDER BY id DESC`
      ).all();
      results = queryRes?.results || [];

      if (results.length === 0) {
        const blogsRes = await env.DB.prepare(
          `SELECT slug, updated_at, created_at FROM blogs
           WHERE is_published = 1 OR is_published IS NULL
           ORDER BY id DESC`
        ).all();
        results = blogsRes?.results || [];
      }
    } catch (e) {
      console.warn('sitemap-blogs query error:', e);
    }
  }

  const seenSlugs = new Set<string>();
  const dbEntries = results
    .filter((post) => {
      if (!post?.slug || seenSlugs.has(post.slug)) return false;
      seenSlugs.add(post.slug);
      return true;
    })
    .map((post) => ({
      slug: post.slug,
      lastmod: toDateStr(post.updated_at || post.created_at || post.date),
    }));

  const fallbackEntries = STATIC_BLOGS
    .filter((s) => !seenSlugs.has(s))
    .map((s) => ({ slug: s, lastmod: today }));

  const allEntries = [...dbEntries, ...fallbackEntries];

  const urls = allEntries
    .map(
      ({ slug, lastmod }) =>
`  <url>
    <loc>${origin}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      ...corsHeaders,
    },
  });
}

declare const HTMLRewriter: any;

// Server-Side Dynamic Metadata & JSON-LD Injection for Crawlers & Scrapers
async function injectHtmlMetadata(response: Response, pathname: string, env: Env): Promise<Response> {
  const meta = getMetadataForPath(pathname);
  
  if (typeof HTMLRewriter !== 'undefined') {
    const rewriter = new HTMLRewriter()
      .on('title', {
        element(el: any) {
          el.setInnerContent(meta.title);
        },
      })
      .on('meta[name="description"]', {
        element(el: any) {
          el.setAttribute('content', meta.description);
        },
      })
      .on('meta[name="keywords"]', {
        element(el: any) {
          el.setAttribute('content', meta.keywords);
        },
      })
      .on('link[rel="canonical"]', {
        element(el: any) {
          el.setAttribute('href', meta.canonical);
        },
      })
      .on('meta[property="og:title"]', {
        element(el: any) {
          el.setAttribute('content', meta.title);
        },
      })
      .on('meta[property="og:description"]', {
        element(el: any) {
          el.setAttribute('content', meta.description);
        },
      })
      .on('meta[property="og:url"]', {
        element(el: any) {
          el.setAttribute('content', meta.canonical);
        },
      })
      .on('meta[property="og:image"]', {
        element(el: any) {
          el.setAttribute('content', meta.ogImage);
        },
      })
      .on('meta[property="og:type"]', {
        element(el: any) {
          el.setAttribute('content', meta.ogType);
        },
      })
      .on('meta[name="twitter:title"]', {
        element(el: any) {
          el.setAttribute('content', meta.title);
        },
      })
      .on('meta[name="twitter:description"]', {
        element(el: any) {
          el.setAttribute('content', meta.description);
        },
      })
      .on('meta[name="twitter:image"]', {
        element(el: any) {
          el.setAttribute('content', meta.ogImage);
        },
      })
      .on('head', {
        element(el: any) {
          el.append(`\n  <script type="application/ld+json">\n${JSON.stringify(meta.schema, null, 2)}\n  </script>\n`, { html: true });
        },
      });

    return rewriter.transform(response);
  }

  // Fallback string replacement (e.g. during local tests or environments without HTMLRewriter)
  let html = await response.text();
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`);
  html = html.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${meta.canonical}" />`);
  html = html.replace(/<\/head>/i, `  <script type="application/ld+json">\n${JSON.stringify(meta.schema, null, 2)}\n  </script>\n</head>`);

  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.delete('content-length');
  headers.delete('content-encoding');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// -----------------------------------------------------------------------
// Admin Database & Security Helpers
// -----------------------------------------------------------------------
async function ensureAdminTables(env: Env) {
  if (!env?.DB) return;
  try {
    await env.DB.batch([
      env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS credentials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password_hash BLOB NOT NULL,
          groq_apikey_encrypted BLOB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `),
      env.DB.prepare(`
        CREATE TABLE IF NOT EXISTS service_details (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          slug TEXT NOT NULL UNIQUE,
          service_name TEXT NOT NULL DEFAULT '',
          category TEXT,
          features TEXT,
          approach_steps TEXT,
          summary TEXT,
          approach_title TEXT,
          process_title TEXT,
          process_steps TEXT,
          process_cta_text TEXT,
          process_cta_link TEXT,
          "pexels_query_2" TEXT,
          why_choose_subtitle TEXT,
          why_choose_title TEXT,
          why_choose_items TEXT,
          faqs TEXT,
          meta_title TEXT,
          meta_description TEXT,
          meta_keywords TEXT,
          schema_markup TEXT,
          og_image TEXT
        );
      `),
      env.DB.prepare(`
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
          pexels_featured_query TEXT,
          pexels_query_2 TEXT,
          pexels_query_3 TEXT,
          pexels_query_4 TEXT,
          pexels_query_5 TEXT,
          sections_h2_para TEXT,
          tags TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `),
    ]);

    const existing = await env.DB.prepare('SELECT id FROM credentials LIMIT 1').first();
    if (!existing) {
      const defaultHash = await hashPassword('revlytics2026!');
      await env.DB.prepare(`
        INSERT INTO credentials (username, password_hash, groq_apikey_encrypted)
        VALUES (?, ?, ?)
      `)
        .bind('admin', defaultHash, '')
        .run();
    }
  } catch (err) {
    console.warn('ensureAdminTables warning:', err);
  }
}

async function getAdminUser(request: Request, env: Env): Promise<{ valid: boolean; username?: string }> {
  const authHeader = request.headers.get('Authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.replace('Bearer ', '').trim();
    return await verifySessionToken(token);
  }
  const apiKeyAuth = await verifyApiKey(request, env);
  if (apiKeyAuth.valid) {
    return { valid: true, username: 'admin' };
  }
  return { valid: false };
}

async function getGroqKey(env: Env): Promise<string> {
  if (!env?.DB) return '';
  try {
    const row = (await env.DB.prepare(
      'SELECT groq_apikey_encrypted FROM credentials WHERE groq_apikey_encrypted IS NOT NULL AND groq_apikey_encrypted != "" LIMIT 1'
    ).first()) as any;
    if (row?.groq_apikey_encrypted) {
      return decodeApiKey(row.groq_apikey_encrypted);
    }
  } catch (err) {
    console.warn('getGroqKey error:', err);
  }
  return '';
}

async function callGroqChat(
  apiKey: string,
  prompt: string,
  systemPrompt?: string,
  model?: string,
  continueContext?: any
): Promise<any> {
  const chosenModel = model && model.trim() ? model.trim() : 'llama-3.3-70b-versatile';

  const messages: any[] = [
    {
      role: 'system',
      content:
        systemPrompt ||
        'You are an expert travel and hospitality digital marketing AI for Revlytics. Always respond with valid JSON.',
    },
  ];

  if (continueContext) {
    messages.push({
      role: 'user',
      content: prompt,
    });
    messages.push({
      role: 'assistant',
      content: typeof continueContext === 'string' ? continueContext : JSON.stringify(continueContext),
    });
    messages.push({
      role: 'user',
      content: 'Please continue generating and complete all remaining sections of the JSON object from where it was left off. Respond ONLY with the complete, valid JSON object.',
    });
  } else {
    messages.push({
      role: 'user',
      content: prompt,
    });
  }

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: chosenModel,
      messages,
      response_format: { type: 'json_object' },
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    if (res.status === 400 && errorText.includes('response_format')) {
      const retryRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: chosenModel,
          messages,
          temperature: 0.7,
          max_tokens: 4096,
        }),
      });
      if (retryRes.ok) {
        const retryData: any = await retryRes.json();
        const content = retryData.choices?.[0]?.message?.content || '{}';
        return parseJsonSafely(content);
      }
    }
    throw new Error(`Groq API returned error (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as any;
  const content = data.choices?.[0]?.message?.content || '{}';
  return parseJsonSafely(content);
}

function parseJsonSafely(str: string): any {
  if (!str) return {};
  try {
    return JSON.parse(str);
  } catch {
    const jsonMatch = str.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch {}
    }
    const firstBrace = str.indexOf('{');
    const lastBrace = str.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(str.substring(firstBrace, lastBrace + 1));
      } catch {}
    }
    return { raw: str };
  }
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

    // 2. Robots.txt & Sitemap XML Endpoints (Dynamic D1 generation with exact application/xml MIME type)
    if (path === '/robots.txt') {
      return await handleRobots(request, env);
    }
    if (path === '/sitemap.xml' || path === '/api/sitemap.xml' || path === '/sitemap-all.xml') {
      return await handleDynamicSitemapXml(request, env);
    }
    if (path === '/sitemap-index.xml' || path === '/api/sitemap-index.xml' || path === '/sitemap_index.xml') {
      return await handleSitemapIndex(request, env);
    }
    if (path === '/sitemap-pages.xml' || path === '/api/sitemap-pages.xml') {
      return await handleSitemapPages(request, env);
    }
    if (path === '/sitemap-services.xml' || path === '/api/sitemap-services.xml') {
      return await handleSitemapServices(request, env);
    }
    if (path === '/sitemap-blogs.xml' || path === '/api/sitemap-blogs.xml') {
      return await handleSitemapBlogs(request, env);
    }

    // 3. Serve Static Frontend Assets (SPA & Pre-rendered Metadata)
    if (!path.startsWith('/api') && env.ASSETS) {
      const hasFileExtension = /\.[a-zA-Z0-9]+$/.test(path);
      
      // If it's a page route navigation (e.g. /, /services, /services/luxury-resort-branding, /blog/...)
      if (method === 'GET' && !hasFileExtension) {
        const indexResponse = await env.ASSETS.fetch(new Request(new URL('/', request.url), request));
        if (indexResponse.status === 200) {
          return await injectHtmlMetadata(indexResponse, path, env);
        }
      }

      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
      if (method === 'GET' && !hasFileExtension) {
        const indexResponse = await env.ASSETS.fetch(new Request(new URL('/', request.url), request));
        return await injectHtmlMetadata(indexResponse, path, env);
      }
      return response;
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
          domain: 'https://revelytics-final.mkmkataria07.workers.dev/',
          databaseId: '939a2da3-3705-413d-a89f-dd10e1e08335',
          status: 'healthy',
          endpoints: [
            '/api/setup (POST/GET to initialize core schema & seeds — index_faqs/service_faqs/faq_page are pre-existing and untouched)',
            '/api/blogs (GET, POST, PUT, DELETE)',
            '/api/services (GET, POST, PUT, DELETE)',
            '/api/faqs (GET, POST, DELETE) — supports ?type=general|index|page|service',
            '/api/inquiries (GET, POST)',
            '/api/keys (GET, POST, verify)',
          ],
        });
      }

      // -----------------------------------------------------------------------
      // DATABASE SETUP & AUTO-MIGRATION ROUTE
      // Only creates/seeds tables that are actually owned by this worker.
      // index_faqs, service_faqs, and faq_page already exist in D1 with
      // their own schema (see header comment) and are intentionally
      // NOT created or reseeded here.
      // -----------------------------------------------------------------------
      if (path === '/api/setup' || path === '/api/init') {
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
          // Seed general faqs table
          env.DB.prepare(`
            INSERT OR IGNORE INTO faqs (id, question, answer, order_index) VALUES
            (1, 'What is Revlytics?', 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.', 1),
            (2, 'How long does a travel digital transformation project take?', 'Project timelines range from 2 to 8 weeks depending on scope, from direct booking engine UX audits to end-to-end multi-property digital platforms.', 2),
            (3, 'How does Revlytics help increase direct hotel bookings?', 'We optimize the entire booking funnel — from immersive visual storytelling and mobile checkout speed to automated analytics tracking and revenue optimization.', 3),
            (4, 'Can you integrate with our existing CRS and PMS booking engines?', 'Yes! We seamlessly integrate with major booking engines including SynXis, Sabre, Cloudbeds, Mews, SiteMinder, and custom direct booking APIs.', 4),
            (5, 'Do you provide ongoing monthly growth and design retainers?', 'Yes, we offer dedicated monthly partnerships covering continuous UX improvements, CRO experimentation, SEO optimization, and campaign assets.', 5);
          `),
          // Seed blogs
          env.DB.prepare(`
            INSERT OR IGNORE INTO blogs (id, slug, title, tag, image_url, summary) VALUES
            (1, 'transforming-direct-hotel-bookings-2025', 'Transforming Direct Hotel Bookings in 2025.', 'Hospitality Tech', 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'How modern luxury hospitality brands are bypassing OTA commissions with custom direct booking flows.'),
            (2, 'crafting-immersive-destination-web-experiences', 'Crafting Immersive Destination Web Experiences.', 'UI/UX Design', 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'Why dynamic media, kinetic typography, and fast loading speeds drive 40% higher room reservations.'),
            (3, 'building-modern-identities-for-boutique-resorts', 'Building Modern Identities for Boutique Resorts.', 'Brand Strategy', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop', 'The architectural elements of modern hospitality branding and experiential storytelling.');
          `),
          // Revlytics Page CMS Table (rev_db)
          // Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
          env.DB.prepare(`
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
              pexels_featured_query TEXT,
              pexels_query_2 TEXT,
              pexels_query_3 TEXT,
              pexels_query_4 TEXT,
              pexels_query_5 TEXT,
              sections_h2_para TEXT CHECK(json_valid(sections_h2_para)),
              tags TEXT CHECK(json_valid(tags)),
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
          `),
          // Revlytics Comments Table
          env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS rev_db_comments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              rev_id INTEGER NOT NULL,
              author_name TEXT NOT NULL,
              author_email TEXT,
              comment_text TEXT NOT NULL,
              status TEXT DEFAULT 'pending',
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (rev_id) REFERENCES rev_db(id) ON DELETE CASCADE
            );
          `),
          // Seed rev_db
          env.DB.prepare(`
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
              '[{"h2":"1. Dominate Intent with Destination-First SEO","paragraph":"Target high-intent, long-tail queries like \\"best boutique stays in Amalfi for remote workers\\" rather than generic keywords. Build comprehensive destination hubs, curated itineraries, and FAQ schemas that capture travelers at the planning stage."},{"h2":"2. Leverage Short-Form Visual Storytelling","paragraph":"Platforms like TikTok, Instagram Reels, and YouTube Shorts drive spontaneous travel inspiration. Focus on authentic, raw micro-moments—such as hidden cafe entrances or drone vistas—over polished corporate promotional reels."},{"h2":"3. Turn User-Generated Content into Social Proof","paragraph":"Travelers trust peers more than brands. Incentivize guests to share real photos using branded hashtags, and embed authentic UGC galleries directly into booking and checkout landing pages to reduce hesitation."},{"h2":"4. Automate Trigger-Based Email Sequences","paragraph":"Implement behavioral automation triggered by destination page views or cart abandonment. Send hyper-relevant guides, weather highlights, and time-sensitive incentives to keep your brand top-of-mind."},{"h2":"5. Optimize for Frictionless Mobile Conversions","paragraph":"Over 60% of travel bookings begin on mobile devices. Streamline the checkout process with Apple Pay, Google Pay, transparent pricing breakdowns, and page load times under 1.5 seconds."}]',
              '["TravelMarketing", "SEOStrategy", "DigitalMarketing", "ContentMarketing", "HospitalityGrowth", "SocialMediaTrends"]'
            );
          `),
          // Seed sample comments (Linked to rev_id = 1)
          env.DB.prepare(`
            INSERT OR IGNORE INTO rev_db_comments (id, rev_id, author_name, author_email, comment_text, status, created_at) VALUES 
            (1, 1, 'Marcus Vance', 'marcus.vance@triphub.com', 'Spot on about short-form video. Our micro-itinerary Reels saw a 40% increase in direct inquiries this summer.', 'approved', datetime('now', '-5 minutes')),
            (2, 1, 'Amina Patel', 'amina@wanderlustmedia.io', 'Destination-first SEO has been our biggest growth driver. Niche itinerary guides convert far better than broad city keywords.', 'approved', datetime('now', '-3 minutes')),
            (3, 1, 'Julian Rossi', 'j.rossi@boutiquevillas.it', 'The point about mobile checkout friction is critical. Adding one-click digital wallets reduced our drop-off rate by 22%.', 'approved', datetime('now', '-30 seconds')),
            (4, 1, 'Chloe Bennett', 'chloe@bennetttravel.com', 'Great breakdown! How often do you recommend updating seasonal destination hubs for SEO freshness?', 'approved', datetime('now')),
            (5, 1, 'David Lin', 'david.lin@ecotrails.co', 'UGC embedded directly at checkout made an immediate impact on our tour bookings. High-value guide.', 'approved', datetime('now'));
          `),
        ]);

        return jsonResponse({
          success: true,
          message: 'Core Cloudflare D1 tables (including rev_db & rev_db_comments) initialized and seeded successfully.',
          databaseId: '939a2da3-3705-413d-a89f-dd10e1e08335',
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
          try {
            const { results } = await env.DB.prepare(
              'SELECT * FROM services ORDER BY sort_order ASC, id ASC'
            ).all();
            return jsonResponse({ success: true, count: results.length, data: results });
          } catch {
            const { results } = await env.DB.prepare('SELECT * FROM services').all();
            return jsonResponse({ success: true, count: results.length, data: results });
          }
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const result = await env.DB.prepare(`
            INSERT INTO services (category_slug, category_name, service_slug, title, subheading, description, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `)
            .bind(
              body.category_slug || (body.category_name || body.title || 'service').toLowerCase().replace(/\s+/g, '-'),
              body.category_name || body.category || 'General',
              body.service_slug || (body.title || '').toLowerCase().replace(/\s+/g, '-'),
              body.title,
              body.subheading || '',
              body.description || '',
              body.sort_order ?? 0
            )
            .run();

          return jsonResponse({ success: true, id: result.meta.last_row_id }, 201);
        }
      }

      if (path.startsWith('/api/services/')) {
        const id = path.split('/api/services/')[1];

        if (method === 'GET') {
          const service = await env.DB.prepare('SELECT * FROM services WHERE id = ? OR service_slug = ?').bind(id, id).first();
          if (!service) return jsonResponse({ error: 'Service not found' }, 404);
          return jsonResponse({ success: true, data: service });
        }

        if (method === 'PUT') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          await env.DB.prepare(`
            UPDATE services SET 
              category_slug = COALESCE(?, category_slug),
              category_name = COALESCE(?, category_name),
              service_slug = COALESCE(?, service_slug),
              title = COALESCE(?, title),
              subheading = COALESCE(?, subheading),
              description = COALESCE(?, description),
              sort_order = COALESCE(?, sort_order)
            WHERE id = ?
          `)
            .bind(
              body.category_slug,
              body.category_name,
              body.service_slug,
              body.title,
              body.subheading,
              body.description,
              body.sort_order,
              id
            )
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
      // 2b. SERVICE DETAILS API (`service_details` table)
      // -----------------------------------------------------------------------
      if (path === '/api/service-details' || path.startsWith('/api/service-details/')) {
        if (method === 'GET') {
          const slug = path.startsWith('/api/service-details/')
            ? path.split('/api/service-details/')[1]
            : url.searchParams.get('slug');

          if (slug) {
            try {
              let detail = (await env.DB.prepare('SELECT * FROM service_details WHERE slug = ?').bind(slug).first()) as any;
              if (!detail) {
                const service = (await env.DB.prepare('SELECT * FROM services WHERE service_slug = ?').bind(slug).first()) as any;
                if (service) {
                  detail = {
                    id: service.id,
                    slug: service.service_slug,
                    service_name: service.title,
                    category: service.category_name || 'Web Design'
                  };
                }
              }
              if (!detail) return jsonResponse({ error: 'Service detail not found' }, 404);
              return jsonResponse({ success: true, data: detail });
            } catch {
              const service = (await env.DB.prepare('SELECT * FROM services WHERE service_slug = ?').bind(slug).first()) as any;
              if (service) {
                return jsonResponse({
                  success: true,
                  data: {
                    id: service.id,
                    slug: service.service_slug,
                    service_name: service.title,
                    category: service.category_name || 'Web Design'
                  }
                });
              }
              return jsonResponse({ error: 'Failed to retrieve service detail' }, 500);
            }
          }

          try {
            const { results } = await env.DB.prepare('SELECT * FROM service_details').all();
            return jsonResponse({ success: true, count: results.length, data: results });
          } catch {
            return jsonResponse({ success: true, count: 0, data: [] });
          }
        }
      }

      // -----------------------------------------------------------------------
      // 3. FAQS API (general `faqs`, `index_faqs`, `faq_page`, `service_faqs`)
      // -----------------------------------------------------------------------
      if (path === '/api/faqs' || path === '/api/index-faqs' || path === '/api/faq-page' || path === '/api/service-faqs') {
        if (method === 'GET') {
          const type = url.searchParams.get('type') || (path === '/api/index-faqs' ? 'index' : path === '/api/faq-page' ? 'page' : path === '/api/service-faqs' ? 'service' : null);
          const serviceSlug = url.searchParams.get('service') || url.searchParams.get('slug');

          // faq_page (dedicated FAQ page)
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

          // index_faqs (homepage FAQs)
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

          // service_faqs — real schema includes meta_title, meta_description, schema_type
          if (type === 'service' || path === '/api/service-faqs' || serviceSlug) {
            try {
              let query =
                'SELECT id, service_slug, question, answer, meta_title, meta_description, schema_type, sort_order, is_active FROM service_faqs WHERE is_active = 1';
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

          // general faqs table
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

          // No type specified: default to general faqs table only.
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
            // service_slug is NOT NULL in the real schema — required.
            if (!body.service_slug && !body.serviceSlug) {
              return jsonResponse({ error: 'service_slug is required for service FAQs' }, 400);
            }
            const result = await env.DB.prepare(`
              INSERT INTO service_faqs (service_slug, question, answer, meta_title, meta_description, schema_type, sort_order, is_active)
              VALUES (?, ?, ?, ?, ?, ?, ?, 1)
            `)
              .bind(
                body.service_slug || body.serviceSlug,
                body.question,
                body.answer,
                body.meta_title || null,
                body.meta_description || null,
                body.schema_type || 'FAQPage',
                body.sort_order || 0
              )
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
          const apiKey = env.PEXELS_API_KEY;
          if (!apiKey) {
            return jsonResponse({ error: 'PEXELS_API_KEY is not configured on this worker.' }, 500);
          }

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
          const apiKey = env.PEXELS_API_KEY;
          if (!apiKey) {
            return jsonResponse({ error: 'PEXELS_API_KEY is not configured on this worker.' }, 500);
          }

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

      // -----------------------------------------------------------------------
      // 7. REV_DB CMS API (Page Headings, Subheadings & Meta)
      // Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
      // -----------------------------------------------------------------------
      // -----------------------------------------------------------------------
      // 7. REV_DB CMS API (Page Headings, Subheadings, Pexels, Categories & Comments)
      // Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
      // -----------------------------------------------------------------------
      if (path === '/api/rev_db/categories' || path === '/api/categories') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(`
            SELECT category AS name, COUNT(*) AS count
            FROM rev_db
            WHERE category IS NOT NULL AND category != ''
            GROUP BY category
            ORDER BY count DESC
            LIMIT 8
          `).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }
      }

      if (path === '/api/rev_db' || path.startsWith('/api/rev_db/')) {
        const pathParam = path.startsWith('/api/rev_db/')
          ? decodeURIComponent(path.split('/api/rev_db/')[1])
          : null;
        const pageParam = url.searchParams.get('page');
        const sectionParam = url.searchParams.get('section');
        const slugParam = url.searchParams.get('slug') || pathParam;

        if (method === 'GET') {
          // If query by slug or ID
          if (slugParam && !pageParam && !sectionParam) {
            const isNum = !isNaN(Number(slugParam));
            const query = isNum
              ? 'SELECT * FROM rev_db WHERE id = ?'
              : 'SELECT * FROM rev_db WHERE slug = ?';
            const item = await env.DB.prepare(query).bind(slugParam).first();
            if (!item) return jsonResponse({ error: 'Record not found in rev_db' }, 404);
            return jsonResponse({ success: true, data: item });
          }

          if (pageParam && sectionParam) {
            const item = await env.DB.prepare(
              'SELECT * FROM rev_db WHERE page_name = ? AND section_name = ?'
            )
              .bind(pageParam, sectionParam)
              .first();
            return jsonResponse({ success: true, data: item });
          } else if (pageParam) {
            const { results } = await env.DB.prepare(
              'SELECT * FROM rev_db WHERE page_name = ? ORDER BY id ASC'
            )
              .bind(pageParam)
              .all();
            return jsonResponse({ success: true, count: results.length, data: results });
          } else {
            const { results } = await env.DB.prepare(
              'SELECT * FROM rev_db ORDER BY id ASC'
            ).all();
            return jsonResponse({ success: true, count: results.length, data: results });
          }
        }

        if (method === 'POST') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized. Valid API key required.' }, 401);

          const body = (await request.json()) as any;
          if (!body.page_name || !body.heading) {
            return jsonResponse({ error: 'page_name and heading are required.' }, 400);
          }

          const slug = body.slug || body.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const sectionsJson = typeof body.sections_h2_para === 'object'
            ? JSON.stringify(body.sections_h2_para)
            : (body.sections_h2_para || '[]');
          const tagsJson = typeof body.tags === 'object'
            ? JSON.stringify(body.tags)
            : (body.tags || '[]');

          const result = await env.DB.prepare(`
            INSERT INTO rev_db (
              page_name, section_name, slug, heading, subheading, meta_heading, meta_data, category, author, date, image_url, description, paragraph, useful_quote, pexels_featured_query, pexels_query_2, pexels_query_3, pexels_query_4, pexels_query_5, sections_h2_para, tags
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `)
            .bind(
              body.page_name,
              body.section_name || 'hero',
              slug,
              body.heading,
              body.subheading || '',
              body.meta_heading || '',
              body.meta_data || '',
              body.category || '',
              body.author || '',
              body.date || '',
              body.image_url || '',
              body.description || '',
              body.paragraph || '',
              body.useful_quote || '',
              body.pexels_featured_query || '',
              body.pexels_query_2 || '',
              body.pexels_query_3 || '',
              body.pexels_query_4 || '',
              body.pexels_query_5 || '',
              sectionsJson,
              tagsJson
            )
            .run();

          return jsonResponse(
            { success: true, message: 'rev_db record created successfully', id: result.meta.last_row_id },
            201
          );
        }

        if (method === 'PUT') {
          const auth = await verifyApiKey(request, env);
          if (!auth.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const id = pathParam && !isNaN(Number(pathParam)) ? Number(pathParam) : body.id;

          const sectionsJson = body.sections_h2_para !== undefined
            ? (typeof body.sections_h2_para === 'object' ? JSON.stringify(body.sections_h2_para) : body.sections_h2_para)
            : null;
          const tagsJson = body.tags !== undefined
            ? (typeof body.tags === 'object' ? JSON.stringify(body.tags) : body.tags)
            : null;

          if (id) {
            await env.DB.prepare(`
              UPDATE rev_db SET
                heading = COALESCE(?, heading),
                subheading = COALESCE(?, subheading),
                meta_heading = COALESCE(?, meta_heading),
                meta_data = COALESCE(?, meta_data),
                category = COALESCE(?, category),
                author = COALESCE(?, author),
                date = COALESCE(?, date),
                image_url = COALESCE(?, image_url),
                description = COALESCE(?, description),
                paragraph = COALESCE(?, paragraph),
                useful_quote = COALESCE(?, useful_quote),
                pexels_featured_query = COALESCE(?, pexels_featured_query),
                pexels_query_2 = COALESCE(?, pexels_query_2),
                pexels_query_3 = COALESCE(?, pexels_query_3),
                pexels_query_4 = COALESCE(?, pexels_query_4),
                pexels_query_5 = COALESCE(?, pexels_query_5),
                sections_h2_para = COALESCE(?, sections_h2_para),
                tags = COALESCE(?, tags),
                updated_at = CURRENT_TIMESTAMP
              WHERE id = ?
            `)
              .bind(
                body.heading,
                body.subheading,
                body.meta_heading,
                body.meta_data,
                body.category,
                body.author,
                body.date,
                body.image_url,
                body.description,
                body.paragraph,
                body.useful_quote,
                body.pexels_featured_query,
                body.pexels_query_2,
                body.pexels_query_3,
                body.pexels_query_4,
                body.pexels_query_5,
                sectionsJson,
                tagsJson,
                id
              )
              .run();

            return jsonResponse({ success: true, message: 'rev_db record updated successfully' });
          } else if (body.slug) {
            await env.DB.prepare(`
              UPDATE rev_db SET
                heading = COALESCE(?, heading),
                subheading = COALESCE(?, subheading),
                meta_heading = COALESCE(?, meta_heading),
                meta_data = COALESCE(?, meta_data),
                category = COALESCE(?, category),
                author = COALESCE(?, author),
                date = COALESCE(?, date),
                image_url = COALESCE(?, image_url),
                description = COALESCE(?, description),
                paragraph = COALESCE(?, paragraph),
                useful_quote = COALESCE(?, useful_quote),
                pexels_featured_query = COALESCE(?, pexels_featured_query),
                pexels_query_2 = COALESCE(?, pexels_query_2),
                pexels_query_3 = COALESCE(?, pexels_query_3),
                pexels_query_4 = COALESCE(?, pexels_query_4),
                pexels_query_5 = COALESCE(?, pexels_query_5),
                sections_h2_para = COALESCE(?, sections_h2_para),
                tags = COALESCE(?, tags),
                updated_at = CURRENT_TIMESTAMP
              WHERE slug = ?
            `)
              .bind(
                body.heading,
                body.subheading,
                body.meta_heading,
                body.meta_data,
                body.category,
                body.author,
                body.date,
                body.image_url,
                body.description,
                body.paragraph,
                body.useful_quote,
                body.pexels_featured_query,
                body.pexels_query_2,
                body.pexels_query_3,
                body.pexels_query_4,
                body.pexels_query_5,
                sectionsJson,
                tagsJson,
                body.slug
              )
              .run();

            return jsonResponse({ success: true, message: 'rev_db record updated successfully' });
          }
        }
      }

      // -----------------------------------------------------------------------
      // 8. REV_DB COMMENTS API
      // -----------------------------------------------------------------------
      if (path === '/api/rev_db_comments' || path === '/api/rev_db/comments') {
        if (method === 'GET') {
          const revId = url.searchParams.get('rev_id');
          if (revId) {
            const { results } = await env.DB.prepare(
              "SELECT * FROM rev_db_comments WHERE rev_id = ? AND status != 'spam' ORDER BY id DESC"
            )
              .bind(revId)
              .all();
            return jsonResponse({ success: true, count: results.length, data: results });
          } else {
            const { results } = await env.DB.prepare(
              'SELECT * FROM rev_db_comments ORDER BY id DESC LIMIT 100'
            ).all();
            return jsonResponse({ success: true, count: results.length, data: results });
          }
        }

        if (method === 'POST') {
          const body = (await request.json()) as any;
          if (!body.rev_id || !body.author_name || !body.comment_text) {
            return jsonResponse(
              { error: 'rev_id, author_name, and comment_text are required fields.' },
              400
            );
          }

          const result = await env.DB.prepare(`
            INSERT INTO rev_db_comments (rev_id, author_name, author_email, comment_text, status)
            VALUES (?, ?, ?, ?, ?)
          `)
            .bind(
              body.rev_id,
              body.author_name,
              body.author_email || '',
              body.comment_text,
              body.status || 'approved'
            )
            .run();

          return jsonResponse(
            {
              success: true,
              message: 'Comment submitted successfully.',
              id: result.meta.last_row_id,
            },
            201
          );
        }
      }

      // -----------------------------------------------------------------------
      // 9. ADMIN AUTHENTICATION & CREDENTIALS API
      // Table: credentials (id, username, password_hash, groq_apikey_encrypted, created_at)
      // -----------------------------------------------------------------------
      if (path.startsWith('/api/auth/') || path.startsWith('/api/admin/') || path.startsWith('/api/ai/')) {
        await ensureAdminTables(env);
      }

      if (path === '/api/auth/login') {
        if (method === 'POST') {
          const body = (await request.json()) as any;
          const { username, password } = body || {};

          if (!username || !password) {
            return jsonResponse({ error: 'Username and password are required.' }, 400);
          }

          const user = (await env.DB.prepare(
            'SELECT id, username, password_hash, groq_apikey_encrypted FROM credentials WHERE username = ?'
          )
            .bind(username)
            .first()) as any;

          if (!user) {
            return jsonResponse({ error: 'Invalid username or password.' }, 401);
          }

          const passwordValid = await verifyPassword(password, user.password_hash);
          if (!passwordValid) {
            return jsonResponse({ error: 'Invalid username or password.' }, 401);
          }

          const token = await generateSessionToken(user.username);
          return jsonResponse({
            success: true,
            token,
            username: user.username,
            hasGroqKey: !!user.groq_apikey_encrypted,
          });
        }
      }

      if (path === '/api/auth/me') {
        if (method === 'GET') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) {
            return jsonResponse({ authenticated: false, error: 'Unauthorized.' }, 401);
          }

          const user = (await env.DB.prepare(
            'SELECT username, groq_apikey_encrypted, created_at FROM credentials WHERE username = ?'
          )
            .bind(admin.username)
            .first()) as any;

          return jsonResponse({
            authenticated: true,
            username: admin.username,
            hasGroqKey: !!user?.groq_apikey_encrypted,
            createdAt: user?.created_at,
          });
        }
      }

      if (path === '/api/auth/setup') {
        if (method === 'POST') {
          const body = (await request.json()) as any;
          const { username, password, groqApiKey } = body || {};

          if (!username || !password) {
            return jsonResponse({ error: 'Username and password are required.' }, 400);
          }

          const hash = await hashPassword(password);
          const encryptedGroq = groqApiKey ? encodeApiKey(groqApiKey) : '';

          await env.DB.prepare(`
            INSERT INTO credentials (username, password_hash, groq_apikey_encrypted)
            VALUES (?, ?, ?)
            ON CONFLICT(username) DO UPDATE SET
              password_hash = excluded.password_hash,
              groq_apikey_encrypted = CASE WHEN excluded.groq_apikey_encrypted != '' THEN excluded.groq_apikey_encrypted ELSE credentials.groq_apikey_encrypted END
          `)
            .bind(username, hash, encryptedGroq)
            .run();

          const token = await generateSessionToken(username);
          return jsonResponse({
            success: true,
            message: 'Admin credentials configured successfully.',
            token,
            username,
            hasGroqKey: !!encryptedGroq,
          });
        }
      }

      if (path === '/api/auth/update-groq-key') {
        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const { groqApiKey } = body || {};

          const encoded = groqApiKey ? encodeApiKey(groqApiKey.trim()) : '';
          await env.DB.prepare(`
            UPDATE credentials SET groq_apikey_encrypted = ? WHERE username = ?
          `)
            .bind(encoded, admin.username)
            .run();

          return jsonResponse({
            success: true,
            message: 'Groq API Key updated successfully in Cloudflare D1.',
            hasGroqKey: !!encoded,
          });
        }
      }

      // -----------------------------------------------------------------------
      // 10. ADMIN SERVICE DETAILS MANAGEMENT (Table: service_details)
      // -----------------------------------------------------------------------
      if (path === '/api/admin/service-details') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM service_details ORDER BY id ASC'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          if (!body.slug) {
            return jsonResponse({ error: 'Service slug is required.' }, 400);
          }

          const featuresStr = typeof body.features === 'object' ? JSON.stringify(body.features) : body.features || '';
          const approachStr = typeof body.approach_steps === 'object' ? JSON.stringify(body.approach_steps) : body.approach_steps || '';
          const processStr = typeof body.process_steps === 'object' ? JSON.stringify(body.process_steps) : body.process_steps || '';
          const whyChooseStr = typeof body.why_choose_items === 'object' ? JSON.stringify(body.why_choose_items) : body.why_choose_items || '';
          const faqsStr = typeof body.faqs === 'object' ? JSON.stringify(body.faqs) : body.faqs || '';

          await env.DB.prepare(`
            INSERT INTO service_details (
              slug, service_name, category, features, approach_steps, summary,
              approach_title, process_title, process_steps, process_cta_text,
              process_cta_link, "pexels_query_2", why_choose_subtitle,
              why_choose_title, why_choose_items, faqs, meta_title,
              meta_description, meta_keywords, schema_markup, og_image
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
              service_name = excluded.service_name,
              category = excluded.category,
              features = excluded.features,
              approach_steps = excluded.approach_steps,
              summary = excluded.summary,
              approach_title = excluded.approach_title,
              process_title = excluded.process_title,
              process_steps = excluded.process_steps,
              process_cta_text = excluded.process_cta_text,
              process_cta_link = excluded.process_cta_link,
              "pexels_query_2" = excluded."pexels_query_2",
              why_choose_subtitle = excluded.why_choose_subtitle,
              why_choose_title = excluded.why_choose_title,
              why_choose_items = excluded.why_choose_items,
              faqs = excluded.faqs,
              meta_title = excluded.meta_title,
              meta_description = excluded.meta_description,
              meta_keywords = excluded.meta_keywords,
              schema_markup = excluded.schema_markup,
              og_image = excluded.og_image
          `)
            .bind(
              body.slug,
              body.service_name || '',
              body.category || 'Services',
              featuresStr,
              approachStr,
              body.summary || '',
              body.approach_title || '',
              body.process_title || '',
              processStr,
              body.process_cta_text || '',
              body.process_cta_link || '',
              body.pexels_query_2 || '',
              body.why_choose_subtitle || '',
              body.why_choose_title || '',
              whyChooseStr,
              faqsStr,
              body.meta_title || '',
              body.meta_description || '',
              body.meta_keywords || '',
              body.schema_markup || '',
              body.og_image || ''
            )
            .run();

          return jsonResponse({ success: true, message: 'Service detail saved successfully.', slug: body.slug });
        }
      }

      if (path.startsWith('/api/admin/service-details/')) {
        const slug = path.split('/api/admin/service-details/')[1];

        if (method === 'DELETE') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          await env.DB.prepare('DELETE FROM service_details WHERE slug = ?').bind(slug).run();
          return jsonResponse({ success: true, message: `Service ${slug} deleted successfully.` });
        }
      }

      // -----------------------------------------------------------------------
      // 11. ADMIN PAGES META MANAGEMENT
      // -----------------------------------------------------------------------
      if (path === '/api/admin/pages-meta') {
        if (method === 'GET') {
          const corePages = ['home', 'services', 'blog', 'faq', 'contact'];
          const { results: revMeta } = await env.DB.prepare(
            'SELECT page_name, slug, meta_heading, meta_data, description FROM rev_db'
          ).all();

          const { results: serviceMeta } = await env.DB.prepare(
            'SELECT slug, service_name, meta_title, meta_description, meta_keywords, og_image FROM service_details'
          ).all();

          return jsonResponse({
            success: true,
            corePages,
            revMeta,
            serviceMeta,
          });
        }

        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const { pageName, slug, meta_title, meta_description, meta_keywords, og_image } = body || {};

          if (!pageName && !slug) {
            return jsonResponse({ error: 'pageName or slug is required.' }, 400);
          }

          if (slug && (await env.DB.prepare('SELECT id FROM service_details WHERE slug = ?').bind(slug).first())) {
            await env.DB.prepare(`
              UPDATE service_details SET
                meta_title = COALESCE(?, meta_title),
                meta_description = COALESCE(?, meta_description),
                meta_keywords = COALESCE(?, meta_keywords),
                og_image = COALESCE(?, og_image)
              WHERE slug = ?
            `)
              .bind(meta_title, meta_description, meta_keywords, og_image, slug)
              .run();
          } else {
            await env.DB.prepare(`
              INSERT INTO rev_db (page_name, slug, heading, meta_heading, meta_data, description)
              VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(slug) DO UPDATE SET
                meta_heading = excluded.meta_heading,
                meta_data = excluded.meta_data,
                description = excluded.description,
                updated_at = CURRENT_TIMESTAMP
            `)
              .bind(
                pageName || 'page',
                slug || pageName,
                meta_title || 'Revlytics',
                meta_title || '',
                meta_description || '',
                meta_description || ''
              )
              .run();
          }

          return jsonResponse({ success: true, message: 'Page metadata updated in Cloudflare D1.' });
        }
      }

      // -----------------------------------------------------------------------
      // 12. ADMIN BLOGS MANAGEMENT API
      // -----------------------------------------------------------------------
      if (path === '/api/admin/blogs') {
        if (method === 'GET') {
          const { results } = await env.DB.prepare(
            'SELECT * FROM rev_db WHERE slug IS NOT NULL AND slug != "" ORDER BY id DESC'
          ).all();
          return jsonResponse({ success: true, count: results.length, data: results });
        }

        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          if (!body.title && !body.heading) {
            return jsonResponse({ error: 'Blog title is required.' }, 400);
          }

          const heading = body.heading || body.title;
          const slug = (body.slug || heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
          const pageName = (body.page_name || 'blog').trim();
          const sectionName = (body.section_name || 'hero').trim();

          const sectionsJson = typeof body.sections_h2_para === 'object' ? JSON.stringify(body.sections_h2_para) : (body.sections_h2_para || '[]');
          const tagsJson = typeof body.tags === 'object' ? JSON.stringify(body.tags) : (body.tags || '[]');

          await env.DB.prepare(`
            INSERT INTO rev_db (
              page_name, section_name, slug, heading, subheading, meta_heading, meta_data,
              category, author, date, image_url, description, paragraph, useful_quote,
              pexels_featured_query, pexels_query_2, pexels_query_3, pexels_query_4, pexels_query_5,
              sections_h2_para, tags
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(slug) DO UPDATE SET
              page_name = excluded.page_name,
              section_name = excluded.section_name,
              heading = excluded.heading,
              subheading = excluded.subheading,
              meta_heading = excluded.meta_heading,
              meta_data = excluded.meta_data,
              category = excluded.category,
              author = excluded.author,
              date = excluded.date,
              image_url = excluded.image_url,
              description = excluded.description,
              paragraph = excluded.paragraph,
              useful_quote = excluded.useful_quote,
              pexels_featured_query = excluded.pexels_featured_query,
              pexels_query_2 = excluded.pexels_query_2,
              pexels_query_3 = excluded.pexels_query_3,
              pexels_query_4 = excluded.pexels_query_4,
              pexels_query_5 = excluded.pexels_query_5,
              sections_h2_para = excluded.sections_h2_para,
              tags = excluded.tags,
              updated_at = CURRENT_TIMESTAMP
          `)
            .bind(
              pageName,
              sectionName,
              slug,
              heading,
              body.subheading || '',
              body.meta_heading || heading,
              body.meta_data || body.description || '',
              body.category || 'Travel Insights',
              body.author || 'Elena Rostova',
              body.date || new Date().toISOString().split('T')[0],
              body.image_url || 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
              body.description || '',
              body.paragraph || '',
              body.useful_quote || '',
              body.pexels_featured_query || 'luxury travel',
              body.pexels_query_2 || '',
              body.pexels_query_3 || '',
              body.pexels_query_4 || '',
              body.pexels_query_5 || '',
              sectionsJson,
              tagsJson
            )
            .run();

          return jsonResponse({ success: true, message: 'Article published successfully to rev_db D1.', slug, page_name: pageName });
        }
      }

      if (path.startsWith('/api/admin/blogs/')) {
        const slug = path.split('/api/admin/blogs/')[1];

        if (method === 'DELETE') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          await env.DB.prepare('DELETE FROM rev_db WHERE slug = ?').bind(slug).run();
          await env.DB.prepare('DELETE FROM blogs WHERE slug = ?').bind(slug).run();
          return jsonResponse({ success: true, message: `Article ${slug} deleted successfully.` });
        }
      }

      // -----------------------------------------------------------------------
      // 13. GROQ AI GENERATION & REV_DB FEED ENDPOINTS
      // -----------------------------------------------------------------------
      if (path === '/api/ai/generate-blog' || path === '/api/ai/continue-blog' || path === '/api/ai/feed-revdb') {
        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const {
            topic,
            prompt: rawPrompt,
            page_name: customPageName,
            section_name: customSectionName,
            tone = 'Luxury & Authoritative',
            keywords = '',
            targetAudience = 'Luxury Hotel Owners, Resort Directors & Travel Operators',
            model,
            isContinue,
            autoSave,
            currentDraft,
          } = body || {};

          const activePrompt = (rawPrompt || topic || '').trim();
          if (!activePrompt && !currentDraft?.heading) {
            return jsonResponse({ error: 'Topic or prompt is required for AI generation.' }, 400);
          }

          let groqKey = body.groqApiKey || (await getGroqKey(env));
          if (!groqKey) {
            return jsonResponse({ error: 'Groq API Key is not configured. Please add your Groq API key in Settings.' }, 400);
          }

          const promptText = `Generate a high-converting, deeply researched, luxury travel industry article/content piece to feed the rev_db table.
Topic/Prompt: ${activePrompt || currentDraft?.heading}
Tone: ${tone}
Target Audience: ${targetAudience}
Keywords: ${keywords}

Respond strictly with a valid JSON object matching exactly this schema and column types for table rev_db:
{
  "page_name": "${customPageName || (activePrompt ? activePrompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').substring(0, 40) : 'travel-insights')}",
  "section_name": "${customSectionName || 'hero'}",
  "slug": "${activePrompt ? activePrompt.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'travel-marketing-playbook'}",
  "heading": "Authoritative H1 Article Headline (55-80 chars)",
  "subheading": "Engaging, practical subtitle explaining the core thesis",
  "meta_heading": "SEO Meta Title (50-60 chars) | Revlytics",
  "meta_data": "Actionable, click-driving Meta Description for Google Search (140-160 chars)",
  "category": "Performance Marketing",
  "author": "Elena Rostova",
  "date": "${new Date().toISOString().split('T')[0]}",
  "image_url": "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
  "description": "2-3 sentence executive summary of the business strategy.",
  "paragraph": "Compelling narrative opening paragraph capturing high-intent travel decision-makers.",
  "useful_quote": "A memorable, punchy quote highlighting the human & financial transformation of luxury travel.",
  "pexels_featured_query": "specific descriptive photo search query for hero featured image",
  "pexels_query_2": "specific descriptive photo search query for section 1",
  "pexels_query_3": "specific descriptive photo search query for section 2",
  "pexels_query_4": "specific descriptive photo search query for section 3",
  "pexels_query_5": "specific descriptive photo search query for section 4",
  "sections_h2_para": [
    { "h2": "1. Strategic Step or Heading", "paragraph": "In-depth, actionable strategy breakdown explaining exactly how to execute..." },
    { "h2": "2. Strategic Step or Heading", "paragraph": "Detailed implementation mechanics and conversion optimization techniques..." },
    { "h2": "3. Strategic Step or Heading", "paragraph": "Technology frameworks, automation, and guest experience benchmarks..." },
    { "h2": "4. Strategic Step or Heading", "paragraph": "Revenue management, pricing psychology, and direct booking tactics..." },
    { "h2": "5. Strategic Step or Heading", "paragraph": "Long-term scaling models and customer retention plays..." }
  ],
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5", "Tag6"]
}`;

          const result = await callGroqChat(
            groqKey,
            promptText,
            'You are the Chief Strategy Officer and Lead Hospitality Growth Architect for Revlytics. Generate exceptionally high-value, factual, conversion-oriented travel insights in valid JSON format matching table rev_db.',
            model,
            isContinue ? currentDraft : undefined
          );

          // If autoSave or path is /api/ai/feed-revdb, automatically insert into rev_db
          if (autoSave || path === '/api/ai/feed-revdb') {
            const heading = result.heading || activePrompt;
            const slug = (result.slug || heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).trim();
            const pageName = (result.page_name || customPageName || 'travel-insights').trim();
            const sectionName = (result.section_name || customSectionName || 'hero').trim();

            const sectionsJson = typeof result.sections_h2_para === 'object' ? JSON.stringify(result.sections_h2_para) : (result.sections_h2_para || '[]');
            const tagsJson = typeof result.tags === 'object' ? JSON.stringify(result.tags) : (result.tags || '[]');

            await env.DB.prepare(`
              INSERT INTO rev_db (
                page_name, section_name, slug, heading, subheading, meta_heading, meta_data,
                category, author, date, image_url, description, paragraph, useful_quote,
                pexels_featured_query, pexels_query_2, pexels_query_3, pexels_query_4, pexels_query_5,
                sections_h2_para, tags
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(slug) DO UPDATE SET
                page_name = excluded.page_name,
                section_name = excluded.section_name,
                heading = excluded.heading,
                subheading = excluded.subheading,
                meta_heading = excluded.meta_heading,
                meta_data = excluded.meta_data,
                category = excluded.category,
                author = excluded.author,
                date = excluded.date,
                image_url = excluded.image_url,
                description = excluded.description,
                paragraph = excluded.paragraph,
                useful_quote = excluded.useful_quote,
                pexels_featured_query = excluded.pexels_featured_query,
                pexels_query_2 = excluded.pexels_query_2,
                pexels_query_3 = excluded.pexels_query_3,
                pexels_query_4 = excluded.pexels_query_4,
                pexels_query_5 = excluded.pexels_query_5,
                sections_h2_para = excluded.sections_h2_para,
                tags = excluded.tags,
                updated_at = CURRENT_TIMESTAMP
            `)
              .bind(
                pageName,
                sectionName,
                slug,
                heading,
                result.subheading || '',
                result.meta_heading || heading,
                result.meta_data || result.description || '',
                result.category || 'Performance Marketing',
                result.author || 'Elena Rostova',
                result.date || new Date().toISOString().split('T')[0],
                result.image_url || 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg',
                result.description || '',
                result.paragraph || '',
                result.useful_quote || '',
                result.pexels_featured_query || 'luxury travel',
                result.pexels_query_2 || '',
                result.pexels_query_3 || '',
                result.pexels_query_4 || '',
                result.pexels_query_5 || '',
                sectionsJson,
                tagsJson
              )
              .run();

            return jsonResponse({
              success: true,
              message: 'Successfully generated and inserted into rev_db!',
              slug,
              data: result,
            });
          }

          return jsonResponse({ success: true, data: result });
        }
      }

      if (path === '/api/ai/generate-meta') {
        if (method === 'POST') {
          const admin = await getAdminUser(request, env);
          if (!admin.valid) return jsonResponse({ error: 'Unauthorized.' }, 401);

          const body = (await request.json()) as any;
          const { pageType = 'service', name, description = '', keywords = '', model } = body || {};

          let groqKey = body.groqApiKey || (await getGroqKey(env));
          if (!groqKey) {
            return jsonResponse({ error: 'Groq API Key is not configured. Please add your Groq API key in Settings.' }, 400);
          }

          const prompt = `Generate perfect SEO metadata for a ${pageType} page on Revlytics website.
Name / Subject: ${name}
Current Description: ${description}
Keywords: ${keywords}

Respond with a valid JSON object matching this schema:
{
  "meta_title": "Optimized Title Tag under 60 chars ending with | Revlytics",
  "meta_description": "Compelling Meta Description between 140-160 chars driving clicks",
  "meta_keywords": "comma separated relevant high-intent travel SEO keywords",
  "h1_heading": "Clear, powerful H1 headline for the page hero",
  "schema_type": "${pageType === 'service' ? 'Service' : pageType === 'faq' ? 'FAQPage' : 'WebPage'}"
}`;

          const result = await callGroqChat(
            groqKey,
            prompt,
            'You are an elite Technical SEO Director specializing in luxury travel, hotel booking conversions, and Schema.org structured data. Respond strictly with valid JSON.',
            model
          );

          return jsonResponse({ success: true, data: result });
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