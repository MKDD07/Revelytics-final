import React, { useEffect, useRef, useState } from 'react';
import { searchPexelsVideos, getPexelsImageQualityUrl } from '../../services/pexels';

export interface PosterItem {
  id: string;
  category: string;
  year: string;
  title: string;
  bgColor: string;
  videoUrl: string;
  posterUrl: string;
  query: string;
}

// Guaranteed HD working travel & resort direct MP4 video streams
const INITIAL_POSTERS: PosterItem[] = [
  {
    id: 'poster-1',
    category: 'DESTINATION MARKETING',
    year: '2024',
    title: 'WANDERLUST',
    bgColor: '#175c7a',
    query: 'tropical beach waves turquoise ocean',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    posterUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg', 'hd'),
  },
  {
    id: 'poster-2',
    category: 'LUXURY RESORT CAMPAIGN',
    year: '2025',
    title: 'SOLARIS VILLA',
    bgColor: '#d46513',
    query: 'luxury resort swimming pool hotel',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-hotel-and-pool-42845-large.mp4',
    posterUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg', 'hd'),
  },
  {
    id: 'poster-3',
    category: 'EXPERIENTIAL TRAVEL',
    year: '2024',
    title: 'SAFARI OASIS',
    bgColor: '#105e3f',
    query: 'jungle waterfall forest nature travel',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tropical-waterfall-in-a-forest-42848-large.mp4',
    posterUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg', 'hd'),
  },
  {
    id: 'poster-4',
    category: 'ECO-HOTEL BRANDING',
    year: '2025',
    title: 'AZURE COAST',
    bgColor: '#a62413',
    query: 'aerial coastline cliff ocean drone',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-waves-crashing-on-a-beach-42844-large.mp4',
    posterUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg', 'hd'),
  },
];

const VideoScrollShowcase: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [posters, setPosters] = useState<PosterItem[]>(INITIAL_POSTERS);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const card4Ref = useRef<HTMLDivElement | null>(null);

  // Dynamically query high quality 720p/1080p HD videos from Pexels
  useEffect(() => {
    let isMounted = true;
    async function loadHighQualityVideos() {
      try {
        const updated = await Promise.all(
          INITIAL_POSTERS.map(async (item) => {
            const vids = await searchPexelsVideos(item.query, 3, 'portrait', 'hd');
            if (vids && vids.length > 0 && vids[0]) {
              return { ...item, videoUrl: vids[0] };
            }
            return item;
          })
        );
        if (isMounted) {
          setPosters(updated);
        }
      } catch (err) {
        console.warn('Pexels video fetch fallback to direct HD links:', err);
      }
    }
    loadHighQualityVideos();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !pinSectionRef.current) return;

    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    const pinSection = pinSectionRef.current;
    const c1 = card1Ref.current;
    const c2 = card2Ref.current;
    const c3 = card3Ref.current;
    const c4 = card4Ref.current;

    if (!c1 || !c2 || !c3 || !c4) return;

    // Scrubbed timeline for circular depth revolving motion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: 'top top',
        end: '+=200%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      },
    });

    // Animate the 4 cards along a circular orbit on scroll:
    // Card 1: starts back-left -> moves to front-left -> moves back
    tl.fromTo(
      c1,
      { xPercent: -90, yPercent: 12, scale: 0.82, zIndex: 1, opacity: 0.75, rotateY: -10 },
      { xPercent: -45, yPercent: -4, scale: 1.02, zIndex: 10, opacity: 1, rotateY: -2, ease: 'power1.inOut' },
      0
    ).to(
      c1,
      { xPercent: 45, yPercent: -12, scale: 0.98, zIndex: 8, opacity: 1, rotateY: 2, ease: 'power1.inOut' },
      0.5
    ).to(
      c1,
      { xPercent: 90, yPercent: 12, scale: 0.82, zIndex: 2, opacity: 0.75, rotateY: 10, ease: 'power1.inOut' },
      1
    );

    // Card 2: starts front-left (NIGHT SHIFT) -> moves to front-right -> moves back-right
    tl.fromTo(
      c2,
      { xPercent: -45, yPercent: -4, scale: 1.04, zIndex: 10, opacity: 1, rotateY: -2 },
      { xPercent: 45, yPercent: -12, scale: 1.02, zIndex: 9, opacity: 1, rotateY: 2, ease: 'power1.inOut' },
      0
    ).to(
      c2,
      { xPercent: 90, yPercent: 12, scale: 0.82, zIndex: 2, opacity: 0.75, rotateY: 10, ease: 'power1.inOut' },
      0.5
    ).to(
      c2,
      { xPercent: -90, yPercent: 12, scale: 0.82, zIndex: 1, opacity: 0.75, rotateY: -10, ease: 'power1.inOut' },
      1
    );

    // Card 3: starts front-right (BLACKLINE) -> moves to back-right -> moves to back-left
    tl.fromTo(
      c3,
      { xPercent: 45, yPercent: -12, scale: 1.02, zIndex: 9, opacity: 1, rotateY: 2 },
      { xPercent: 90, yPercent: 12, scale: 0.82, zIndex: 2, opacity: 0.75, rotateY: 10, ease: 'power1.inOut' },
      0
    ).to(
      c3,
      { xPercent: -90, yPercent: 12, scale: 0.82, zIndex: 1, opacity: 0.75, rotateY: -10, ease: 'power1.inOut' },
      0.5
    ).to(
      c3,
      { xPercent: -45, yPercent: -4, scale: 1.04, zIndex: 10, opacity: 1, rotateY: -2, ease: 'power1.inOut' },
      1
    );

    // Card 4: starts back-right (STUDIO 24) -> moves to back-left -> moves to front-left
    tl.fromTo(
      c4,
      { xPercent: 90, yPercent: 12, scale: 0.82, zIndex: 2, opacity: 0.75, rotateY: 10 },
      { xPercent: -90, yPercent: 12, scale: 0.82, zIndex: 1, opacity: 0.75, rotateY: -10, ease: 'power1.inOut' },
      0
    ).to(
      c4,
      { xPercent: -45, yPercent: -4, scale: 1.04, zIndex: 10, opacity: 1, rotateY: -2, ease: 'power1.inOut' },
      0.5
    ).to(
      c4,
      { xPercent: 45, yPercent: -12, scale: 1.02, zIndex: 9, opacity: 1, rotateY: 2, ease: 'power1.inOut' },
      1
    );

    // Programmatically ensure all videos play smoothly across all browsers
    const videos = pinSection.querySelectorAll('video');
    const playAll = () => {
      videos.forEach((vid) => {
        vid.muted = true;
        vid.defaultMuted = true;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      });
    };

    playAll();

    // Secondary trigger on viewport entry via ScrollTrigger
    ScrollTrigger.create({
      trigger: pinSection,
      start: 'top 95%',
      onEnter: playAll,
      onEnterBack: playAll,
    });

    // Also resume play on window focus or user interaction
    window.addEventListener('click', playAll, { once: true });
    window.addEventListener('touchstart', playAll, { once: true });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
      window.removeEventListener('click', playAll);
      window.removeEventListener('touchstart', playAll);
    };
  }, []);

  return (
    <div ref={pinSectionRef} className={`kiro-pinned-section ${className}`.trim()}>
      <div className="kiro-pinned-inner">
        {/* Split Editorial Meta Header */}
        <div className="kiro-pinned-split-header">
          <div className="kiro-split-left">
            <h4 className="kiro-split-heading">
              <span>CINEMATIC</span> <span>EXPERIENCE</span>
            </h4>
          </div>

          {/* Minimal Center Square Accent */}
          <div className="kiro-top-square-accent">
            <span className="square-dot" />
          </div>

          <div className="kiro-split-right">
            <p className="kiro-split-paragraph">
              Crafting high-impact visual narratives and bespoke brand campaigns through dynamic motion, cinematography, and spatial storytelling.
            </p>
          </div>
        </div>

        {/* 3D Circular Revolving Stage */}
        <div className="kiro-pinned-stage">
          {/* Card 1: WANDERLUST (Blue) */}
          <div
            ref={card1Ref}
            className="kiro-gsap-card"
            style={{ backgroundColor: posters[0].bgColor }}
          >
            <div className="kiro-card-media">
              <video
                key={posters[0].videoUrl}
                src={posters[0].videoUrl}
                poster={posters[0].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  (e.target as HTMLVideoElement).play().catch(() => {});
                }}
              />
            </div>
            <div className="kiro-card-top-bar">
              <span className="kiro-category-tag">{posters[0].category}</span>
              {posters[0].year && <span className="kiro-year-tag">{posters[0].year}</span>}
            </div>
            <div className="kiro-card-bottom-title">
              <h2>{posters[0].title}</h2>
            </div>
          </div>

          {/* Card 2: SOLARIS VILLA (Yellow/Orange) */}
          <div
            ref={card2Ref}
            className="kiro-gsap-card"
            style={{ backgroundColor: posters[1].bgColor }}
          >
            <div className="kiro-card-media">
              <video
                key={posters[1].videoUrl}
                src={posters[1].videoUrl}
                poster={posters[1].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  (e.target as HTMLVideoElement).play().catch(() => {});
                }}
              />
            </div>
            <div className="kiro-card-top-bar">
              <span className="kiro-category-tag">{posters[1].category}</span>
              {posters[1].year && <span className="kiro-year-tag">{posters[1].year}</span>}
            </div>
            <div className="kiro-card-bottom-title">
              <h2>{posters[1].title}</h2>
            </div>
          </div>

          {/* Card 3: SAFARI OASIS (Green) */}
          <div
            ref={card3Ref}
            className="kiro-gsap-card"
            style={{ backgroundColor: posters[2].bgColor }}
          >
            <div className="kiro-card-media">
              <video
                key={posters[2].videoUrl}
                src={posters[2].videoUrl}
                poster={posters[2].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  (e.target as HTMLVideoElement).play().catch(() => {});
                }}
              />
            </div>
            <div className="kiro-card-top-bar">
              <span className="kiro-category-tag">{posters[2].category}</span>
              {posters[2].year && <span className="kiro-year-tag">{posters[2].year}</span>}
            </div>
            <div className="kiro-card-bottom-title">
              <h2>{posters[2].title}</h2>
            </div>
          </div>

          {/* Card 4: AZURE COAST (Red) */}
          <div
            ref={card4Ref}
            className="kiro-gsap-card"
            style={{ backgroundColor: posters[3].bgColor }}
          >
            <div className="kiro-card-media">
              <video
                key={posters[3].videoUrl}
                src={posters[3].videoUrl}
                poster={posters[3].posterUrl}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                onCanPlay={(e) => {
                  (e.target as HTMLVideoElement).play().catch(() => {});
                }}
              />
            </div>
            <div className="kiro-card-top-bar">
              <span className="kiro-category-tag">{posters[3].category}</span>
              {posters[3].year && <span className="kiro-year-tag">{posters[3].year}</span>}
            </div>
            <div className="kiro-card-bottom-title">
              <h2>{posters[3].title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScrollShowcase;
