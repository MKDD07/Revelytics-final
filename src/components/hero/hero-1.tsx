import React, { useEffect, useRef } from 'react';
import { usePexelsVideo } from '../../hooks';

// ==================================================
// START: Hero1 (Travel & Digital Agency Hero with Pexels API Video)
// ==================================================

const Hero1 = () => {
  // Live Pexels API HD Video streams powered by user's API Key
  const travelVideo = usePexelsVideo('tropical resort luxury travel', 0);
  const heroVideo = usePexelsVideo('creative studio animation', 0);

  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.load();
      bgVideoRef.current.play().catch(() => {});
    }
  }, [travelVideo]);

  useEffect(() => {
    if (inlineVideoRef.current) {
      inlineVideoRef.current.load();
      inlineVideoRef.current.play().catch(() => {});
    }
  }, [heroVideo]);

  return (
    <>
      {/* Hero Section */}
      <div
        className="cs-hero-area cs-hero-spacing bg-position p-relative fix"
        style={{
          backgroundColor: '#09090b',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Live Pexels API Full-Screen Video Background */}
        <video
          ref={bgVideoRef}
          key={travelVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.8,
            filter: 'brightness(0.8) contrast(1.15)',
            pointerEvents: 'none',
          }}
        >
          <source src={travelVideo} type="video/mp4" />
        </video>

        {/* Dark Gradient Overlay for Typography Contrast */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(9,9,11,0.35) 0%, rgba(9,9,11,0.85) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div className="container p-relative" style={{ zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-12">
              <div className="cs-hero-content">
                <h2
                  className="cs-hero-title text-uppercase text-white tp-ff-sequel-heavy-disp tp_fade_anim"
                  data-delay=".3"
                >
                  <span className="text-center d-block">Travel &</span>
                  <span className="text-center d-md-flex justify-content-center align-items-center">
                    Agency{' '}
                    <span className="text-sm tp-ff-inter d-none d-md-inline-block ml-20 mr-20">
                      Destination
                      <br /> Innovator
                    </span>{' '}
                    And
                  </span>
                  <span className="cs-hero-video d-flex align-items-center justify-content-center flex-wrap ml-lg-140">
                    <video
                      ref={inlineVideoRef}
                      key={heroVideo}
                      loop
                      muted
                      autoPlay
                      playsInline
                      style={{
                        borderRadius: 40,
                        width: 140,
                        height: 75,
                        objectFit: 'cover',
                        border: '2px solid rgba(255,255,255,0.35)',
                        display: 'inline-block',
                      }}
                    >
                      <source src={heroVideo} type="video/mp4" />
                    </video>
                    <span className="text-sm text-sm-video tp-ff-inter ml-15 mr-15 d-none d-sm-inline-block">
                      Direct <br /> Bookings
                    </span>
                    Studio
                  </span>
                </h2>

                {/* Subtitle & CTA Button */}
                <div className="d-flex justify-content-center align-items-center mt-40 tp_fade_anim" data-delay=".5">
                  <a href="#services" className="tp-btn tp-btn-red tp-ff-inter">
                    <span>
                      <span className="text-1">Explore Travel Services</span>
                      <span className="text-2">Explore Travel Services</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* hero area end */}
    </>
  );
};

export default Hero1;
