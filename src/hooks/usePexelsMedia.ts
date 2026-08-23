import { useState, useEffect } from 'react';
import { searchPexelsVideos, searchPexelsPhotos } from '../services/pexels';
import { getPexelsVideo as getFallbackVideo, getPexelsImage as getFallbackImage } from '../utils/media';

/**
 * Custom hook to dynamically fetch and cache live Pexels API videos.
 * @param query Search query keyword (e.g. "tropical resort", "travel luxury", "creative agency")
 * @param index Deterministic index from fetched results
 * @param defaultFallback Optional immediate fallback URL
 */
export function usePexelsVideo(
  query: string = 'tropical travel',
  index: number = 0,
  defaultFallback?: string
): string {
  const fallback = defaultFallback || getFallbackVideo(query, index);
  const [videoUrl, setVideoUrl] = useState<string>(fallback);

  useEffect(() => {
    let isMounted = true;

    searchPexelsVideos(query, 10).then((videos) => {
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
  }, [query, index]);

  return videoUrl;
}

/**
 * Custom hook to dynamically fetch and cache live Pexels API photos.
 * @param query Search query keyword (e.g. "maldives resort", "travel beach")
 * @param index Deterministic index from fetched results
 * @param defaultFallback Optional immediate fallback URL
 */
export function usePexelsImage(
  query: string = 'travel resort',
  index: number = 0,
  defaultFallback?: string
): string {
  const fallback = defaultFallback || getFallbackImage(query, index);
  const [imageUrl, setImageUrl] = useState<string>(fallback);

  useEffect(() => {
    let isMounted = true;

    searchPexelsPhotos(query, 10).then((photos) => {
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
  }, [query, index]);

  return imageUrl;
}
