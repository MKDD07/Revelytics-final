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

// Quality presets for universal video and image loading
export type VideoQuality = 'sd' | 'hd' | 'uhd';
export type ImageQuality = 'thumb' | 'sd' | 'hd' | 'uhd';

/**
 * Transforms any Pexels image URL to a specific quality tier.
 * @param url Pexels photo URL
 * @param quality 'thumb' | 'sd' | 'hd' | 'uhd'
 */
export function getPexelsImageQualityUrl(url: string, quality: ImageQuality = 'hd'): string {
  if (!url) return url;
  if (!url.includes('images.pexels.com')) return url;

  const base = url.split('?')[0];
  switch (quality) {
    case 'thumb':
      return `${base}?auto=compress&cs=tinysrgb&w=350&fit=crop`;
    case 'sd':
      return `${base}?auto=compress&cs=tinysrgb&w=640&fit=crop`;
    case 'uhd':
      return `${base}?auto=compress&cs=tinysrgb&w=2560&fit=crop`;
    case 'hd':
    default:
      return `${base}?auto=compress&cs=tinysrgb&w=1280&fit=crop`;
  }
}

/**
 * Strictly selects the best matching video file for the desired quality tier:
 * - 'sd': 360p - 540p (max dimension <= 960), lowest bandwidth, strictly never UHD/4K.
 * - 'hd': 720p - 1080p (dimensions between 720 and 1920), crisp standard HD, strictly never UHD/4K.
 * - 'uhd': 4K / 2160p (dimensions >= 2160), fallback to highest available resolution.
 */
function selectVideoFile(files: PexelsVideoFile[], quality: VideoQuality): PexelsVideoFile | undefined {
  if (!files || files.length === 0) return undefined;
  const mp4Files = files.filter((f) => f.file_type === 'video/mp4' || !f.file_type);
  const pool = mp4Files.length > 0 ? mp4Files : files;

  if (quality === 'sd') {
    // 1. Check for genuine SD files (quality === 'sd' or resolution <= 960x960 or 'sd_' in URL)
    const sdFiles = pool.filter(
      (f) =>
        f.quality === 'sd' ||
        (f.width > 0 && f.width <= 960 && f.height <= 960) ||
        f.link.includes('sd_')
    );
    if (sdFiles.length > 0) {
      // Return the best SD option (highest within SD, e.g. 540p or 480p)
      return sdFiles.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    }

    // 2. Fallback: find lowest resolution non-UHD file (e.g. 720p)
    const nonUhd = pool.filter(
      (f) => f.quality !== 'uhd' && f.width < 2160 && f.height < 2160 && !f.link.includes('uhd_') && !f.link.includes('3840')
    );
    if (nonUhd.length > 0) {
      return nonUhd.sort((a, b) => (a.width * a.height) - (b.width * b.height))[0];
    }

    // 3. Ultimate fallback: lowest resolution file overall
    return pool.slice().sort((a, b) => (a.width * a.height) - (b.width * b.height))[0];
  }

  if (quality === 'hd') {
    // 1. Strict HD (720p - 1080p, strictly excluding UHD / 4K / 2160p)
    const hdFiles = pool.filter(
      (f) =>
        f.quality !== 'uhd' &&
        !f.link.includes('uhd_') &&
        !f.link.includes('3840') &&
        f.width < 2160 &&
        f.height < 2160 &&
        ((f.width >= 720 && f.width <= 1920) || (f.height >= 720 && f.height <= 1920) || f.quality === 'hd' || f.link.includes('hd_'))
    );
    if (hdFiles.length > 0) {
      // Pick best HD (closest to 1080p)
      return hdFiles.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    }

    // 2. Fallback: Any non-UHD file
    const nonUhd = pool.filter(
      (f) => f.quality !== 'uhd' && f.width < 2160 && f.height < 2160 && !f.link.includes('uhd_') && !f.link.includes('3840')
    );
    if (nonUhd.length > 0) {
      return nonUhd.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
    }

    // 3. Fallback: Lowest resolution available
    return pool.slice().sort((a, b) => (a.width * a.height) - (b.width * b.height))[0];
  }

  // UHD / 4K request
  const uhdFiles = pool.filter(
    (f) => f.quality === 'uhd' || f.width >= 2160 || f.height >= 2160 || f.link.includes('uhd_') || f.link.includes('3840')
  );
  if (uhdFiles.length > 0) {
    return uhdFiles.sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
  }

  // Fallback to highest available resolution
  return pool.slice().sort((a, b) => (b.width * b.height) - (a.width * a.height))[0];
}

/**
 * Searches and fetches video stream URLs from Pexels API with strict quality tiering.
 * @param query Search query
 * @param quality 'sd' (480p/540p), 'hd' (720p/1080p), 'uhd' (4K/2160p)
 * @param perPage Number of videos to fetch
 * @param orientation 'landscape' | 'portrait'
 */
export async function searchPexelsVideos(
  query: string = 'travel luxury resort',
  perPage: number = 5,
  orientation: 'landscape' | 'portrait' = 'portrait',
  quality: VideoQuality = 'hd'
): Promise<string[]> {
  const cacheKey = `pexels_videos_v3_${query.toLowerCase().trim()}_${perPage}_${orientation}_${quality}`;

  if (memoryVideoCache.has(cacheKey)) {
    return memoryVideoCache.get(cacheKey)!;
  }

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
    // Ignore localStorage read errors
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const res = await fetch(
      `https://api.pexels.com/videos/search?query=${encodedQuery}&per_page=${perPage}&orientation=${orientation}`,
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

    const videoUrls: string[] = videos
      .map((item) => {
        const matchedFile = selectVideoFile(item.video_files || [], quality);
        return matchedFile ? matchedFile.link : '';
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

  // Fallbacks per quality tier
  if (quality === 'sd') {
    return [
      'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-hiker-on-top-of-a-mountain-42525-medium.mp4',
      'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-medium.mp4',
    ];
  }

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
 * @param orientation 'landscape' | 'portrait' | 'square'
 * @param quality 'thumb' | 'sd' | 'hd' | 'uhd'
 */
export async function searchPexelsPhotos(
  query: string = 'travel resort',
  perPage: number = 10,
  orientation: 'landscape' | 'portrait' | 'square' = 'portrait',
  quality: ImageQuality = 'hd'
): Promise<string[]> {
  const cacheKey = `pexels_photos_${query.toLowerCase().trim()}_${perPage}_${orientation}_${quality}`;

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
      .map((p) => {
        if (quality === 'uhd') {
          return p.src.large2x || p.src.original || p.src.large;
        } else if (quality === 'sd') {
          return p.src.small || p.src.medium || getPexelsImageQualityUrl(p.src.original, 'sd');
        } else if (quality === 'thumb') {
          return p.src.tiny || getPexelsImageQualityUrl(p.src.original, 'thumb');
        } else {
          // HD (default)
          return p.src.large || p.src.portrait || p.src.medium || getPexelsImageQualityUrl(p.src.original, 'hd');
        }
      })
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
    getPexelsImageQualityUrl('https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg', quality),
    getPexelsImageQualityUrl('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', quality),
  ];
}
