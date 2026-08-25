/**
 * =========================================================================
 * Revlytics API Client
 * Connects to Cloudflare Worker & D1 SQL Database
 * Base URL: https://revelytics-final.mkmkataria07.workers.dev/
 * =========================================================================
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://revelytics-final.mkmkataria07.workers.dev';

export interface ApiResponse<T = any> {
  success?: boolean;
  count?: number;
  data?: T;
  error?: string;
  message?: string;
  [key: string]: any;
}

export interface BlogItem {
  id: number;
  slug: string;
  title: string;
  tag: string;
  summary?: string;
  content?: string;
  image_url?: string;
  author?: string;
  created_at?: string;
}

export interface ServiceItem {
  id: number;
  category_slug?: string;
  category_name?: string;
  service_slug?: string;
  title: string;
  subheading?: string;
  description?: string;
  sort_order?: number;
  // Legacy / UI helper fields
  category?: string;
  image_url?: string;
  link?: string;
  order_index?: number;
  years?: string;
}

export interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
  subheading?: string;
  section_sort_order?: number;
  question_sort_order?: number;
  category?: string;
  order_index?: number;
  is_active?: number;
}

export interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  service_type?: string;
  message: string;
}

// ---------------------------------------------------------------------------
// API METHODS
// ---------------------------------------------------------------------------

/**
 * Check Worker and D1 Database Health
 */
export async function checkApiHealth(): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`);
    return await res.json();
  } catch (err) {
    console.warn('API health check failed:', err);
    return { success: false, error: 'Cannot connect to Cloudflare Worker' };
  }
}

/**
 * Initialize / Migrate D1 SQL Schema
 */
export async function setupD1Database(): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/setup`, { method: 'POST' });
  return await res.json();
}

/**
 * Fetch all published blogs from D1
 */
export async function fetchBlogs(): Promise<BlogItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Failed to fetch blogs from D1 API:', err);
    return [];
  }
}

/**
 * Fetch single blog by ID or Slug
 */
export async function fetchBlogBySlug(slugOrId: string | number): Promise<BlogItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs/${encodeURIComponent(slugOrId)}`);
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn(`Failed to fetch blog ${slugOrId}:`, err);
    return null;
  }
}

/**
 * Create a new Blog post in D1 (API Key Required)
 */
export async function createBlog(
  blog: Partial<BlogItem>,
  apiKey = 'rev_live_9a8b7c6d5e4f3a2b1c0d'
): Promise<ApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(blog),
  });
  return await res.json();
}

/**
 * Fetch all active services from D1
 */
export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface WhyChooseItem {
  id?: string;
  number?: string;
  icon?: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailItem {
  id: number;
  slug: string;
  service_name: string;
  category?: string;
  features?: string | string[];
  pexels_query?: string;
  image_url?: string;
  process_title?: string;
  process_steps?: string | ProcessStep[];
  process_cta_text?: string;
  process_cta_link?: string;
  pexels_query_2?: string;
  banner_pexels_query?: string;
  banner_image_url?: string;
  why_choose_subtitle?: string;
  why_choose_title?: string;
  why_choose_items?: string | WhyChooseItem[];
  faqs?: string | ServiceFaq[];
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  schema_markup?: string | Record<string, any>;
}

export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/services`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Failed to fetch services from D1 API:', err);
    return [];
  }
}

/**
 * Fetch service detail by slug from D1 (service_details table)
 */
export async function fetchServiceDetailBySlug(slug: string): Promise<ServiceDetailItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/service-details/${encodeURIComponent(slug)}`);
    if (!res.ok) {
      // fallback to searching in services table
      const services = await fetchServices();
      const match = services.find((s) => s.service_slug === slug || s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      if (match) {
        return {
          id: match.id,
          slug: match.service_slug || slug,
          service_name: match.title,
          category: match.category_name || match.category || 'Web Design',
        };
      }
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn(`Failed to fetch service detail for ${slug}:`, err);
    return null;
  }
}

export type FaqDbSource =
  | 'page'
  | 'faq_page'
  | 'index'
  | 'index_faqs'
  | 'service'
  | 'service_faqs'
  | 'general'
  | 'faqs'
  | 'local';

/**
 * Fetch active FAQs from D1 based on chosen database source / table
 */
export async function fetchFaqs(
  type?: FaqDbSource,
  serviceSlug?: string
): Promise<FaqItem[]> {
  try {
    if (type === 'local') {
      return [];
    }

    const params = new URLSearchParams();
    if (type) {
      let normalizedType = type;
      if (type === 'faq_page') normalizedType = 'page';
      if (type === 'index_faqs') normalizedType = 'index';
      if (type === 'service_faqs') normalizedType = 'service';
      if (type === 'faqs') normalizedType = 'general';
      params.append('type', normalizedType);
    }
    if (serviceSlug) params.append('service', serviceSlug);

    const qs = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/api/faqs${qs}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Failed to fetch FAQs from D1 API:', err);
    return [];
  }
}

/**
 * Fetch FAQs by explicit DB table / source
 */
export async function fetchFaqsByDb(
  dbSource: FaqDbSource,
  serviceSlug?: string
): Promise<FaqItem[]> {
  return fetchFaqs(dbSource, serviceSlug);
}

/**
 * Fetch Homepage FAQs from index_faqs table
 */
export async function fetchIndexFaqs(): Promise<FaqItem[]> {
  return fetchFaqs('index_faqs');
}

/**
 * Fetch FAQ Page FAQs grouped/sorted from faq_page table
 */
export async function fetchFaqPage(): Promise<FaqItem[]> {
  return fetchFaqs('faq_page');
}

/**
 * Fetch Service-specific FAQs from service_faqs table
 */
export async function fetchServiceFaqs(serviceSlug?: string): Promise<FaqItem[]> {
  return fetchFaqs('service_faqs', serviceSlug);
}

/**
 * Fetch General FAQs from faqs table
 */
export async function fetchGeneralFaqs(): Promise<FaqItem[]> {
  return fetchFaqs('faqs');
}

/**
 * Submit a new Contact / Travel Discovery Inquiry to D1
 */
export async function submitInquiry(inquiry: InquiryPayload): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inquiry),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to submit inquiry to D1:', err);
    return { success: false, error: err.message || 'Submission failed' };
  }
}

/**
 * Verify an API Key against Cloudflare D1
 */
export async function verifyApiKey(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/keys/verify`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
      },
    });
    const json = await res.json();
    return !!json.authenticated;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// REV_DB CMS HELPERS (Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335)
// ---------------------------------------------------------------------------

export interface SectionH2Para {
  h2: string;
  paragraph: string;
}

export interface RevDbItem {
  id: number;
  page_name: string;
  section_name?: string;
  slug: string;
  heading: string;
  subheading?: string;
  meta_heading?: string;
  meta_data?: string;
  category?: string;
  author?: string;
  date?: string;
  image_url?: string;
  description?: string;
  paragraph?: string;
  useful_quote?: string;
  pexels_featured_query?: string;
  pexels_query_2?: string;
  pexels_query_3?: string;
  pexels_query_4?: string;
  pexels_query_5?: string;
  sections_h2_para?: string | SectionH2Para[];
  tags?: string | string[];
  created_at?: string;
  updated_at?: string;
}

export interface RevDbComment {
  id: number;
  rev_id: number;
  author_name: string;
  author_email?: string;
  comment_text: string;
  status?: string;
  created_at?: string;
}

/**
 * Fetch all rev_db CMS entries or by page_name from Cloudflare D1
 */
export async function fetchRevDb(pageName?: string): Promise<RevDbItem[]> {
  try {
    const query = pageName ? `?page=${encodeURIComponent(pageName)}` : '';
    const res = await fetch(`${API_BASE_URL}/api/rev_db${query}`);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.warn('Failed to fetch from rev_db:', err);
    return [];
  }
}

/**
 * Fetch specific entry by slug (e.g. 'innovative-strategies-market-research')
 */
export async function fetchRevDbBySlug(slug: string): Promise<RevDbItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rev_db?slug=${encodeURIComponent(slug)}`);
    const json = await res.json();
    if (json.data && !Array.isArray(json.data)) {
      return json.data;
    }
    if (Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (err) {
    console.warn(`Failed to fetch rev_db entry for slug ${slug}:`, err);
    return null;
  }
}

/**
 * Fetch specific heading entry by page and section (e.g. page_name='blog-details', section_name='hero')
 */
export async function fetchRevDbHeading(
  pageName: string,
  sectionName = 'hero'
): Promise<RevDbItem | null> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/rev_db?page=${encodeURIComponent(pageName)}&section=${encodeURIComponent(sectionName)}`
    );
    const json = await res.json();
    if (json.data && !Array.isArray(json.data)) {
      return json.data;
    }
    if (Array.isArray(json.data) && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (err) {
    console.warn(`Failed to fetch rev_db heading for ${pageName}/${sectionName}:`, err);
    return null;
  }
}

/**
 * Fetch comments for a rev_db item
 */
export async function fetchRevDbComments(revId: number): Promise<RevDbComment[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rev_db_comments?rev_id=${revId}`);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data;
    }
    return [];
  } catch (err) {
    console.warn(`Failed to fetch comments for rev_id ${revId}:`, err);
    return [];
  }
}

/**
 * Submit a new comment for a rev_db entry
 */
export async function submitRevDbComment(comment: {
  rev_id: number;
  author_name: string;
  author_email?: string;
  comment_text: string;
}): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/rev_db_comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to submit comment:', err);
    return { success: false, error: err.message || 'Submission failed' };
  }
}

// ---------------------------------------------------------------------------
// PEXELS API HELPERS (with 4s timeout so it never hangs)
// ---------------------------------------------------------------------------

const PEXELS_TIMEOUT_MS = 4000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

/**
 * Fetch the first landscape photo URL from Pexels for a given query (4s timeout).
 * Routes through the Cloudflare Worker proxy at /api/pexels.
 * Returns null immediately if the API key isn't configured or the request times out.
 */
export async function fetchPexelsPhoto(query: string): Promise<string | null> {
  if (!query) return null;
  try {
    const res = await withTimeout(
      fetch(`${API_BASE_URL}/api/pexels?query=${encodeURIComponent(query)}&per_page=1`),
      PEXELS_TIMEOUT_MS
    );
    if (!res.ok) return null;
    const json = await res.json();
    const photos: any[] = json?.photos ?? [];
    return photos[0]?.src?.large ?? photos[0]?.src?.medium ?? null;
  } catch (err) {
    console.warn(`fetchPexelsPhoto failed/timed-out for query "${query}":`, err);
    return null;
  }
}

/**
 * Fetch multiple Pexels photos in parallel, each with an independent timeout.
 */
export async function fetchPexelsPhotos(queries: string[]): Promise<(string | null)[]> {
  return Promise.all(queries.map((q) => fetchPexelsPhoto(q)));
}

// ---------------------------------------------------------------------------
// REV_DB ARTICLE LISTING (for blog index page)
// ---------------------------------------------------------------------------

/**
 * Fetch all blog articles from rev_db (all rows with a slug and image_url).
 * Optionally filter by page_name.
 */
export async function fetchRevDbArticles(pageName?: string): Promise<RevDbItem[]> {
  try {
    const query = pageName ? `?page=${encodeURIComponent(pageName)}` : '';
    const res = await withTimeout(
      fetch(`${API_BASE_URL}/api/rev_db${query}`),
      6000
    );
    const json = await res.json();
    const data: RevDbItem[] = Array.isArray(json.data) ? json.data : [];
    // Only return rows that have both a slug and a heading
    return data.filter((item) => item.slug && item.heading);
  } catch (err) {
    console.warn('fetchRevDbArticles failed:', err);
    return [];
  }
}




