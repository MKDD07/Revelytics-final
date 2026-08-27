import React, { useEffect, useRef } from 'react';
import { usePexelsImage } from '../../hooks';
import { FlowingSvgTrack } from './flowing-svg-track';

// ============================================================================
// Props & Types
// ============================================================================
export interface SplitImageScrollProps {
  leftText?: string;
  rightText?: string;
  centerRevealText?: string;
  pexelsQuery?: string;
  pexelsIndex?: number;
  fallbackImage?: string;
}

// Default luxury fallback image
const DEFAULT_IMAGE =
  'https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

export const SplitImageScroll: React.FC<SplitImageScrollProps> = ({
  leftText = 'We',
  rightText = 'are',
  centerRevealText = 'Revelytics',
  pexelsQuery = 'red modern creative fashion',
  pexelsIndex = 0,
  fallbackImage = DEFAULT_IMAGE,
}) => {
  const dynamicImage = usePexelsImage(pexelsQuery, pexelsIndex, fallbackImage);
  const imageSrc = dynamicImage || fallbackImage;

  // DOM Refs
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  // Intro outer texts ("We" and "are")
  const leftTextRef = useRef<HTMLHeadingElement | null>(null);
  const rightTextRef = useRef<HTMLHeadingElement | null>(null);

  // Center Brand Reveal Text ("Revelytics")
  const centerTextRef = useRef<HTMLHeadingElement | null>(null);

  // Main Image Container (expands & splits)
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const leftHalfRef = useRef<HTMLDivElement | null>(null);
  const rightHalfRef = useRef<HTMLDivElement | null>(null);
  const leftImgRef = useRef<HTMLImageElement | null>(null);
  const rightImgRef = useRef<HTMLImageElement | null>(null);

  // Dedicated ScrollTrigger for Image Expansion, Split, and Center "Revelytics" Reveal
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !sectionRef.current || !stickyRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Initial Visual States
    gsap.set(leftTextRef.current, { opacity: 1, x: 0 });
    gsap.set(rightTextRef.current, { opacity: 1, x: 0 });
    gsap.set(centerTextRef.current, { opacity: 0, scale: 0.85 });
    gsap.set(imageContainerRef.current, {
      width: 200,
      height: 90,
      borderRadius: 45,
    });
    gsap.set(leftHalfRef.current, { xPercent: 0, opacity: 1 });
    gsap.set(rightHalfRef.current, { xPercent: 0, opacity: 1 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=180%',
        pin: stickyRef.current,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // -------------------------------------------------------------
    // PHASE 1: "We" and "are" fade away as image expands slightly
    // -------------------------------------------------------------
    tl.to(
      leftTextRef.current,
      {
        x: -80,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.35,
      },
      0
    );

    tl.to(
      rightTextRef.current,
      {
        x: 80,
        opacity: 0,
        ease: 'power2.out',
        duration: 0.35,
      },
      0
    );

    tl.to(
      imageContainerRef.current,
      {
        width: () => Math.min(window.innerWidth * 0.85, 960),
        height: () => Math.min(window.innerHeight * 0.62, 480),
        borderRadius: 20,
        ease: 'power2.inOut',
        duration: 0.6,
      },
      0.1
    );

    // -------------------------------------------------------------
    // PHASE 2: Image breaks into 2 pieces (slides left & right)
    // Revealing "Revelytics" boldly at the screen center!
    // -------------------------------------------------------------
    tl.to(
      leftHalfRef.current,
      {
        xPercent: -135,
        opacity: 0.85,
        ease: 'power2.inOut',
        duration: 0.8,
      },
      0.7
    );

    tl.to(
      rightHalfRef.current,
      {
        xPercent: 135,
        opacity: 0.85,
        ease: 'power2.inOut',
        duration: 0.8,
      },
      0.7
    );

    // Center text ("Revelytics") appears cleanly at center
    tl.to(
      centerTextRef.current,
      {
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.4)',
        duration: 0.6,
      },
      0.9
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [imageSrc]);

  return (
    <section
      ref={sectionRef}
      className="split-scroll-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '320vh',
        background: '#ffffff',
        overflow: 'hidden',
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* FLOWING BACKGROUND SVG CURVE (1765x3592 VIEWBOX - STARTS BELOW Y)  */}
      {/* ------------------------------------------------------------------ */}
      <FlowingSvgTrack triggerRef={sectionRef} topOffset="42vh" />

      {/* Pinned Viewport Container */}
      <div
        ref={stickyRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
          overflow: 'hidden',
          zIndex: 2,
        }}
      >
        {/* ------------------------------------------------------------------ */}
        {/* CENTER REVEAL TEXT LAYER ("Revelytics" Revealed in Center)         */}
        {/* ------------------------------------------------------------------ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
            width: '100%',
          }}
        >
          <h2
            ref={centerTextRef}
            style={{
              fontFamily: 'var(--tp-ff-heading, "Outfit", sans-serif)',
              fontSize: 'clamp(3rem, 8vw, 7.5rem)',
              fontWeight: 300,
              color: '#111111',
              margin: 0,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {centerRevealText}
          </h2>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* INITIAL ROW: "We" + Image Pill + "are"                             */}
        {/* ------------------------------------------------------------------ */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            pointerEvents: 'none',
          }}
        >
          {/* Left Text ("We") */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: 'clamp(16px, 2.5vw, 36px)',
            }}
          >
            <h2
              ref={leftTextRef}
              style={{
                fontFamily: 'var(--tp-ff-heading, "Outfit", sans-serif)',
                fontSize: 'clamp(2.5rem, 6.5vw, 6rem)',
                fontWeight: 300,
                color: '#111111',
                margin: 0,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {leftText}
            </h2>
          </div>

          {/* Center spacer matching initial pill width */}
          <div
            style={{
              width: '200px',
              height: '90px',
              flexShrink: 0,
            }}
          />

          {/* Right Text ("are") */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              paddingLeft: 'clamp(16px, 2.5vw, 36px)',
            }}
          >
            <h2
              ref={rightTextRef}
              style={{
                fontFamily: 'var(--tp-ff-heading, "Outfit", sans-serif)',
                fontSize: 'clamp(2.5rem, 6.5vw, 6.0rem)',
                fontWeight: 300,
                color: '#111111',
                margin: 0,
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {rightText}
            </h2>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* IMAGE LAYER (IN FRONT - SPLITS IN 2 TO REVEAL "Revelytics" CENTER)  */}
        {/* ------------------------------------------------------------------ */}
        <div
          ref={imageContainerRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '90px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
            zIndex: 5,
            pointerEvents: 'auto',
          }}
        >
          {/* ----------------- SPLIT LEFT PIECE ----------------- */}
          <div
            ref={leftHalfRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '50%',
              height: '100%',
              overflow: 'hidden',
              borderTopLeftRadius: 'inherit',
              borderBottomLeftRadius: 'inherit',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              transformOrigin: 'left center',
              willChange: 'transform',
            }}
          >
            <img
              ref={leftImgRef}
              src={imageSrc}
              alt="Left Piece"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '200%',
                height: '100%',
                objectFit: 'cover',
                maxWidth: 'none',
                display: 'block',
              }}
            />
          </div>

          {/* ----------------- SPLIT RIGHT PIECE ----------------- */}
          <div
            ref={rightHalfRef}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '50%',
              height: '100%',
              overflow: 'hidden',
              borderTopRightRadius: 'inherit',
              borderBottomRightRadius: 'inherit',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              transformOrigin: 'right center',
              willChange: 'transform',
            }}
          >
            <img
              ref={rightImgRef}
              src={imageSrc}
              alt="Right Piece"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200%',
                height: '100%',
                objectFit: 'cover',
                maxWidth: 'none',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitImageScroll;
