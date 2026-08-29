import { useState, useEffect } from 'react';
import {
  searchPexelsVideos,
  searchPexelsPhotos,
  type VideoQuality,
  type ImageQuality,
} from '../services/pexels';
import { getPexelsVideo as getFallbackVideo, getPexelsImage as getFallbackImage } from '../utils/media';

export type { VideoQuality, ImageQuality };

/**
 * Custom hook to dynamically fetch and cache live Pexels API videos with quality settings.
 * @param query Search query keyword (e.g. "tropical resort", "travel luxury", "creative agency")
 * @param index Deterministic index from fetched results
 * @param defaultFallback Optional immediate fallback URL
 * @param quality 'sd' (480p) | 'hd' (720p/1080p) | 'uhd' (4K)
 * @param orientation 'landscape' | 'portrait'
 */
export function usePexelsVideo(
  query: string = 'tropical travel',
  index: number = 0,
  defaultFallback?: string,
  quality: VideoQuality = 'hd',
  orientation: 'landscape' | 'portrait' = 'portrait'
): string {
  const fallback = defaultFallback || getFallbackVideo(query, index);
  const [videoUrl, setVideoUrl] = useState<string>(fallback);

  useEffect(() => {
    let isMounted = true;

    searchPexelsVideos(query, 10, orientation, quality).then((videos) => {
      if (isMounted && videos.length > 0) {
        const selected = videos[index % videos.length];
        if (selected) {
          setVideoUrl(selected);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query, index, quality, orientation]);

  return videoUrl;
}

/**
 * Custom hook to dynamically fetch and cache live Pexels API photos with quality settings.
 * @param query Search query keyword (e.g. "maldives resort", "travel beach")
 * @param index Deterministic index from fetched results
 * @param defaultFallback Optional immediate fallback URL
 * @param quality 'thumb' | 'sd' | 'hd' | 'uhd'
 * @param orientation 'landscape' | 'portrait' | 'square'
 */
export function usePexelsImage(
  query: string = 'travel resort',
  index: number = 0,
  defaultFallback?: string,
  quality: ImageQuality = 'hd',
  orientation: 'landscape' | 'portrait' | 'square' = 'portrait'
): string {
  const fallback = defaultFallback || getFallbackImage(query, index);
  const [imageUrl, setImageUrl] = useState<string>(fallback);

  useEffect(() => {
    let isMounted = true;

    searchPexelsPhotos(query, 10, orientation, quality).then((photos) => {
      if (isMounted && photos.length > 0) {
        const selected = photos[index % photos.length];
        if (selected) {
          setImageUrl(selected);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [query, index, quality, orientation]);

  return imageUrl;
}
