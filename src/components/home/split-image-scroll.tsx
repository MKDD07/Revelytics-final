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
  centerRevealText = 'Revlytics',
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

  // Center Brand Reveal Text ("Revelytics") & Letter Refs
  const centerTextRef = useRef<HTMLHeadingElement | null>(null);
  const centerLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

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
    gsap.set(imageContainerRef.current, {
      width: 200,
      height: 90,
      borderRadius: 45,
    });
    gsap.set(leftHalfRef.current, { xPercent: 0, opacity: 1 });
    gsap.set(rightHalfRef.current, { xPercent: 0, opacity: 1 });

    // Distinct starting displacement offsets & rotations for each letter so they arrive from different directions
    const letterOffsets = [
      { x: -140, y: -100, z: -150, rotate: -35, rotateY: 45 },
      { x: -90, y: 120, z: 80, rotate: 25, rotateY: -30 },
      { x: -40, y: -130, z: -100, rotate: -20, rotateY: 50 },
      { x: 20, y: 110, z: 120, rotate: 30, rotateY: -40 },
      { x: 70, y: -90, z: -80, rotate: -25, rotateY: 35 },
      { x: 110, y: 130, z: 100, rotate: 40, rotateY: -50 },
      { x: 150, y: -110, z: -120, rotate: -30, rotateY: 40 },
      { x: -60, y: 80, z: 60, rotate: 15, rotateY: -20 },
      { x: 100, y: -70, z: 90, rotate: -15, rotateY: 25 },
    ];

    const letters = centerLettersRef.current.filter(Boolean);

    letters.forEach((letterEl, idx) => {
      const offset = letterOffsets[idx % letterOffsets.length];
      gsap.set(letterEl, {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        z: offset.z,
        rotation: offset.rotate,
        rotationY: offset.rotateY,
        rotationX: offset.rotate * 0.7,
        scale: 0.6,
        transformPerspective: 800,
      });
    });

    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => (window.innerWidth < 768 ? '+=100%' : '+=180%'),
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
    // Revealing "Revlytics" with each letter converging from different directions
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

    // Letters converge to original position (x: 0, y: 0, z: 0, rotation: 0, opacity: 1, scale: 1)
    letters.forEach((letterEl, idx) => {
      tl.to(
        letterEl,
        {
          opacity: 1,
          x: 0,
          y: 0,
          z: 0,
          rotation: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          ease: 'power3.out',
          duration: 0.55,
        },
        0.75 + idx * 0.04
      );
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [imageSrc, centerRevealText]);

  return (
    <section
      ref={sectionRef}
      className="split-scroll-section"
      style={{
        position: 'relative',
        width: '100%',
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
        {/* CENTER REVEAL TEXT LAYER ("Revlytics" Letters Reveal from Different Locations) */}
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
            perspective: 1000,
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
              display: 'inline-flex',
              transformStyle: 'preserve-3d',
            }}
          >
            {centerRevealText.split('').map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  centerLettersRef.current[index] = el;
                }}
                style={{
                  display: 'inline-block',
                  whiteSpace: char === ' ' ? 'pre' : 'normal',
                  willChange: 'transform, opacity',
                }}
              >
                {char}
              </span>
            ))}
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