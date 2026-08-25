// Pexels API Service with In-Memory and LocalStorage caching

export const PEXELS_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_PEXELS_API_KEY) ||
  'y6WP5reQNH7abdL2uzdLTyV8pq0kMmF3CHf7ZNkiHo98DXIvORUOBSfi';

export interface PexelsVideoFile {
  id: number;
  quality: 'hd' | 'sd' | 'uhd';
  file_type: string;
  width: number;
  height: number;
  fps: number;
  link: string;
}

export interface PexelsVideoItem {
  id: number;
  width: number;
  height: number;
  duration: number;
  url: string;
  image: string;
  video_files: PexelsVideoFile[];
}

export interface PexelsPhotoItem {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

// In-memory runtime cache
const memoryVideoCache = new Map<string, string[]>();
const memoryPhotoCache = new Map<string, string[]>();

/**
 * Searches and fetches real HD video stream URLs from Pexels API.
 * @param query Search query, e.g. "tropical resort", "travel luxury", "creative agency"
 * @param perPage Number of videos to fetch (default: 10)
 */
export async function searchPexelsVideos(
  query: string = 'tropical travel',
  perPage: number = 10
): Promise<string[]> {
  const cacheKey = `pexels_videos_${query.toLowerCase().trim()}_${perPage}`;

  // Check in-memory cache
  if (memoryVideoCache.has(cacheKey)) {
    return memoryVideoCache.get(cacheKey)!;
  }

  // Check localStorage cache if available
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryVideoCache.set(cacheKey, parsed);
        return parsed;
      }
    }
  } catch {
    // localStorage might be unavailable or restricted
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodedQuery}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const videos: PexelsVideoItem[] = data.videos || [];

    // Extract best quality HD MP4 links
    const videoUrls: string[] = videos
      .map((item) => {
        // Find best HD mp4 file
        const hdFile =
          item.video_files.find((f) => f.quality === 'hd' && f.file_type === 'video/mp4' && f.width >= 1280) ||
          item.video_files.find((f) => f.file_type === 'video/mp4') ||
          item.video_files[0];
        return hdFile ? hdFile.link : '';
      })
      .filter((url) => Boolean(url));

    if (videoUrls.length > 0) {
      memoryVideoCache.set(cacheKey, videoUrls);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(videoUrls));
      } catch {
        // storage quota exceeded or unavailable
      }
      return videoUrls;
    }
  } catch (err) {
    console.warn(`[Pexels Service] Failed to fetch videos for "${query}":`, err);
  }

  // Default fallback curated video URLs
  return [
    'https://html.aqlova.com/videos/cunnet/video-3.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-and-pool-42845-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
  ];
}

/**
 * Searches and fetches real high-res photography URLs from Pexels API.
 * @param query Search query, e.g. "luxury resort", "travel architecture"
 * @param perPage Number of photos to fetch (default: 10)
 */
export async function searchPexelsPhotos(
  query: string = 'travel resort',
  perPage: number = 10,
  orientation: 'landscape' | 'portrait' | 'square' = 'portrait'
): Promise<string[]> {
  const cacheKey = `pexels_photos_${query.toLowerCase().trim()}_${perPage}_${orientation}`;

  if (memoryPhotoCache.has(cacheKey)) {
    return memoryPhotoCache.get(cacheKey)!;
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=${perPage}&orientation=${orientation}`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Pexels Photo API error: ${res.status}`);
    }

    const data = await res.json();
    const photos: PexelsPhotoItem[] = data.photos || [];
    const photoUrls: string[] = photos
      .map((p) => p.src.original || p.src.large2x || p.src.large)
      .filter(Boolean);

    if (photoUrls.length > 0) {
      memoryPhotoCache.set(cacheKey, photoUrls);
      try {
        localStorage.setItem(cacheKey, JSON.stringify(photoUrls));
      } catch {
        // quota exceeded
      }
      return photoUrls;
    }
  } catch (err) {
    console.warn(`[Pexels Service] Failed to fetch photos for "${query}":`, err);
  }

  return [
    'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920',
  ];
}
