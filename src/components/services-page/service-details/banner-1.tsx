import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchServiceDetailBySlug, type ServiceDetailItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

// ==================================================
// START: Banner1 (Service Details Immersive Parallax Banner)
// Dynamic Pexels Photography & GSAP ScrollTrigger Parallax
// ==================================================

export interface ServiceDetailsBanner1Props {
  slug?: string;
}

const DEFAULT_BANNER_IMAGE = 'assets/img/banner/thumb-5.jpg';

const Banner1: React.FC<ServiceDetailsBanner1Props> = ({ slug: propSlug }) => {
  // Extract slug from prop, pathname (/service-details/ui-ux-design), or hash
  const currentSlug = useMemo(() => {
    if (propSlug) return propSlug;
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const parts = path.split('/');
    if (parts[0] === 'service-details' && parts[1]) {
      return parts[1];
    }
    const hash = window.location.hash.replace('#', '');
    const hashParts = hash.split('?')[0].split('/');
    if (hashParts[0] === 'service-details' && hashParts[1]) {
      return hashParts[1];
    }
    const param = new URLSearchParams(window.location.search || hash.split('?')[1] || '').get('service');
    return param || 'ui-ux-design';
  }, [propSlug]);

  const [detail, setDetail] = useState<ServiceDetailItem | null>(null);
  const [bannerImg, setBannerImg] = useState<string>(DEFAULT_BANNER_IMAGE);
  const [loading, setLoading] = useState<boolean>(true);

  const bannerContainerRef = useRef<HTMLDivElement | null>(null);
  const bannerImgRef = useRef<HTMLImageElement | null>(null);

  // 1. Fetch service details
  useEffect(() => {
    let isMounted = true;

    async function loadDetail() {
      if (!currentSlug) return;
      try {
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }
      } catch (err) {
        console.warn('Failed to load banner details:', err);
      }
    }

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // 2. Fetch Pexels Image based on pexels_query_2 or fallback metadata
  useEffect(() => {
    let isMounted = true;

    async function loadPexelsBanner() {
      // Use direct banner_image_url if present
      if (detail?.banner_image_url) {
        setBannerImg(detail.banner_image_url);
        setLoading(false);
        return;
      }

      const query =
        detail?.pexels_query_2 ||
        detail?.banner_pexels_query ||
        `${detail?.category || ''} ${detail?.service_name || currentSlug} panoramic cinematic workspace technology`.trim();

      try {
        setLoading(true);
        const photos = await searchPexelsPhotos(query, 1, 'landscape');
        if (isMounted && photos && photos.length > 0) {
          setBannerImg(photos[0]);
        }
      } catch (err) {
        console.warn('Pexels banner image search failed:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPexelsBanner();

    return () => {
      isMounted = false;
    };
  }, [detail, currentSlug]);

  // 3. GSAP ScrollTrigger Parallax Effect on Scroll Down
  useEffect(() => {
    if (!bannerImgRef.current || !bannerContainerRef.current) return;
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      const tween = gsap.fromTo(
        bannerImgRef.current,
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 15,
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      };
    }
  }, [bannerImg]);

  const serviceName = detail?.service_name || currentSlug;

  return (
    <>
      {/* Service Details Top Banner with Parallax Scroll Effect */}
      <div
        ref={bannerContainerRef}
        className="tp-banner-thumb fix w-100 scale-up-img"
        style={{
          position: 'relative',
          height: '520px',
          overflow: 'hidden',
          backgroundColor: '#0c0c0c',
        }}
      >
        <img
          ref={bannerImgRef}
          data-speed="0.4"
          data-lag="0"
          className="img-cover scale-up"
          src={bannerImg}
          alt={serviceName}
          style={{
            position: 'absolute',
            top: '-15%',
            left: 0,
            width: '100%',
            height: '130%',
            objectFit: 'cover',
            transition: 'opacity 0.4s ease-in-out',
            opacity: loading ? 0.8 : 1,
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
      {/* tp-banner-area-end */}
    </>
  );
};

export default Banner1;
