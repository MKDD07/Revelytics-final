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
