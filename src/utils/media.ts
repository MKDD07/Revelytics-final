// Media utility for query-based Pexels & high-res stock photography and videos

export interface MediaOptions {
  width?: number;
  height?: number;
  orientation?: 'landscape' | 'portrait' | 'square';
}

// Curated high-definition Pexels image database mapped by semantic queries
const PEXELS_IMAGE_DATABASE: Record<string, string[]> = {
  // Travel Destinations & Scenic Luxury Locations
  maldives: [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
  ],
  santorini: [
    'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
    'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg',
  ],
  bali: [
    'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
    'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
  ],
  amalfi: [
    'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg',
    'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
  ],
  alps: [
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    'https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg',
  ],
  kyoto: [
    'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg',
    'https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg',
  ],
  tulum: [
    'https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg',
    'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg',
  ],
  dubai: [
    'https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg',
    'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg',
  ],
  paris: [
    'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg',
    'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg',
  ],
  iceland: [
    'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg',
    'https://images.pexels.com/photos/831082/pexels-photo-831082.jpeg',
  ],
  resort: [
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg',
  ],
  tropical: [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg',
  ],

  // Branding, Identity & Graphic Design
  branding: [
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  ],
  design: [
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
  ],

  // Infodesign, Architecture & Modern Tech
  infodesign: [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  ],
  architecture: [
    'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
  ],

  // Digital, Marketing & AI
  digital: [
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
  ],
  marketing: [
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  ],

  // Editorial, Publishing & Content
  editorial: [
    'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg',
    'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg',
    'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
  ],

  // UI/UX & Product Design
  ui: [
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
  ],
  ux: [
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
  ],

  // Development & Code
  development: [
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg',
  ],
  code: [
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  ],

  // Motion Graphics & 3D
  motion: [
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
    'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
  ],
  '3d': [
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  ],

  // SEO, Growth & Analytics
  seo: [
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  ],
  analytics: [
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  ],
  growth: [
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg',
  ],

  // Strategy & Business
  strategy: [
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
  ],

  // Hero & Backgrounds
  hero: [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
  ],
  abstract: [
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
    'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  ],

  // Agency, Office & Creative Team
  about: [
    'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
    'https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg',
  ],
  agency: [
    'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
  ],

  // Portfolio, Design & UI/UX Work
  portfolio: [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg',
    'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg',
  ],

  // Technology, AI & Data Services
  service: [
    'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
    'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
    'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
  ],

  // Team & Professional Portraits
  team: [
    'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
    'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',
  ],

  // Testimonials & Reviews
  testimonial: [
    'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg',
    'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg',
    'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
  ],

  // Blog & News
  blog: [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg',
    'https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg',
    'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg',
    'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
  ],

  // Call to action & Backgrounds
  cta: [
    'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
    'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
  ],
};

// Distinct fallback pool so fallbacks are diverse and never repeat single URL
const DIVERSE_FALLBACK_POOL = [
  'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg',
  'https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  'https://images.pexels.com/photos/247791/pexels-photo-247791.png',
  'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
];

// Curated high-definition video loops for travel agency & creative studio
const PEXELS_VIDEO_DATABASE: Record<string, string[]> = {
  hero: [
    'https://html.aqlova.com/videos/cunnet/video-3.mp4',
    'https://html.aqlova.com/videos/cunnet/ca-video-2.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-and-pool-42845-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
  ],
  travel: [
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-and-pool-42845-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
  ],
  hiker: [
    'https://assets.mixkit.co/videos/preview/mixkit-man-walking-on-a-wooden-dock-towards-a-lake-41584-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-hiker-on-top-of-a-mountain-42525-large.mp4',
  ],
  marketing: [
    'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-41487-large.mp4',
    'https://html.aqlova.com/videos/cunnet/ca-video-2.mp4',
  ],
  digital: [
    'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-41487-large.mp4',
    'https://html.aqlova.com/videos/cunnet/ca-video-2.mp4',
  ],
  creative: [
    'https://html.aqlova.com/videos/cunnet/video-3.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-41487-large.mp4',
  ],
  abstract: [
    'https://assets.mixkit.co/videos/preview/mixkit-abstract-fast-lines-of-light-in-a-dark-space-42637-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-42861-large.mp4',
  ],
};

/**
 * Returns a query-based high-quality stock photo URL from Pexels CDN.
 */
export function getPexelsImage(query: string, index: number = 0, options?: MediaOptions): string {
  const normalizedKey = query.toLowerCase().trim();
  const words = normalizedKey.split(/\s+/);

  // 1. Direct match on full query
  let matchedList: string[] | undefined = PEXELS_IMAGE_DATABASE[normalizedKey];

  // 2. Search for any matching token in database keys
  if (!matchedList) {
    for (const key of Object.keys(PEXELS_IMAGE_DATABASE)) {
      if (normalizedKey.includes(key) || key.includes(normalizedKey)) {
        matchedList = PEXELS_IMAGE_DATABASE[key];
        break;
      }
    }
  }

  // 3. Search word by word
  if (!matchedList) {
    for (const word of words) {
      if (PEXELS_IMAGE_DATABASE[word]) {
        matchedList = PEXELS_IMAGE_DATABASE[word];
        break;
      }
    }
  }

  let rawUrl: string;
  if (matchedList && matchedList.length > 0) {
    rawUrl = matchedList[index % matchedList.length];
  } else {
    rawUrl = DIVERSE_FALLBACK_POOL[index % DIVERSE_FALLBACK_POOL.length];
  }

  const width = options?.width || 800;
  const height = options?.height || 600;
  const baseUrl = rawUrl.split('?')[0];

  return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

/**
 * Returns a query-based video URL for video headers and backgrounds.
 */
export function getPexelsVideo(query: string, index: number = 0): string {
  const normalizedKey = query.toLowerCase().trim();

  const matchingKey = Object.keys(PEXELS_VIDEO_DATABASE).find(
    (key) => normalizedKey.includes(key) || key.includes(normalizedKey)
  );

  if (matchingKey && PEXELS_VIDEO_DATABASE[matchingKey]?.length > 0) {
    const list = PEXELS_VIDEO_DATABASE[matchingKey];
    return list[index % list.length];
  }

  return PEXELS_VIDEO_DATABASE.hero[0];
}
