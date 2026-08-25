import React, { useEffect, useRef, useState } from 'react';
import { searchPexelsPhotos } from '../../../services/pexels';

interface TextSegment {
  text: string;
  type?: 'normal' | 'primary' | 'outline';
}

interface ImageCardSegment {
  query: string;
  fallback: string;
}

type SegmentItem = TextSegment | ImageCardSegment;

const SEGMENTS: SegmentItem[] = [
  { text: 'WE ARCHITECT', type: 'normal' },
  { text: 'DIGITAL EXPERIENCES', type: 'primary' },
  {
    query: 'luxury resort architecture ocean pool villa',
    fallback: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  { text: 'MAXIMIZE DIRECT BOOKINGS', type: 'outline' },
  { text: 'SCALE LUXURY RESORTS', type: 'normal' },
  {
    query: 'modern luxury hotel suite interior hospitality',
    fallback: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  { text: 'CONVERT GUEST INTENT', type: 'primary' },
  { text: 'INTO REVENUE', type: 'outline' },
  {
    query: 'luxury boutique travel destination tropical resort',
    fallback: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  { text: 'CRAFT PURPOSEFUL ARCHITECTURE', type: 'normal' },
];

const HorizontalScrollText: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [cardImages, setCardImages] = useState<Record<number, string>>({});

  // Fetch dynamic Pexels photos by query
  useEffect(() => {
    let isMounted = true;

    async function loadDynamicImages() {
      const results: Record<number, string> = {};
      await Promise.all(
        SEGMENTS.map(async (seg, idx) => {
          if ('query' in seg) {
            try {
              const photos = await searchPexelsPhotos(seg.query, 1, 'portrait');
              if (photos && photos.length > 0) {
                results[idx] = photos[0];
              } else {
                results[idx] = seg.fallback;
              }
            } catch {
              results[idx] = seg.fallback;
            }
          }
        })
      );

      if (isMounted && Object.keys(results).length > 0) {
        setCardImages(results);
      }
    }

    loadDynamicImages();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // 1. Horizontal track pinning and translation with pinSpacing
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          pinSpacing: true,
          start: 'top -50%',
          end: () => `+=${Math.max(track.scrollWidth, 3200)}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 2. Character-level dynamic entrance staggered on horizontal container scroll
      const chars = track.querySelectorAll('.tp-horizontal-scroll-char');
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: () => gsap.utils.random(-140, 140),
          rotation: () => gsap.utils.random(-25, 25),
          opacity: 0.15,
          scale: () => gsap.utils.random(0.8, 1.2),
          ease: 'back.out(1.1)',
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: 'left 105%',
            end: 'left 35%',
            scrub: 1,
          },
        });
      });

      // 3. 4:5 Image cards 3D flip animation rising from the bottom below text
      const cards = track.querySelectorAll('.tp-horizontal-image-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 220,
          rotationX: 40,
          rotationY: -30,
          rotationZ: 8,
          opacity: 0,
          scale: 0.72,
          transformOrigin: 'bottom center',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: 'left 108%',
            end: 'left 38%',
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="tp-horizontal-scroll-section">
      <div ref={trackRef} className="tp-horizontal-scroll-track">
        <h2 className="tp-horizontal-scroll-text">
          {SEGMENTS.map((item, segIndex) => {
            // A. 4:5 Flip Image Card (Pure Visual Image - No Text Overlay)
            if ('query' in item) {
              const src = cardImages[segIndex] || item.fallback;
              return (
                <span key={segIndex} className="tp-horizontal-card-wrap">
                  <div className="tp-horizontal-image-card">
                    <img src={src} alt="Revlytics Visual Showcase" loading="lazy" />
                  </div>
                </span>
              );
            }

            // B. Text segment
            const isPrimary = item.type === 'primary';
            const isOutline = item.type === 'outline';
            const className = isPrimary
              ? 'highlight-primary'
              : isOutline
              ? 'highlight-outline'
              : '';

            return (
              <span key={segIndex} className={className}>
                {item.text.split('').map((char, charIndex) => (
                  <span
                    key={`${segIndex}-${charIndex}`}
                    className="tp-horizontal-scroll-char"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};

export default HorizontalScrollText;
