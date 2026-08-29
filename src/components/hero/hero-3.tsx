import React, { useEffect, useRef } from 'react';
import { usePexelsVideo } from '../../hooks';

// ==================================================
// START: Hero3
// ==================================================

const Hero3: React.FC = () => {
  // Live Pexels API UHD / 4K Video streams
  const digitalMarketingVideo = usePexelsVideo(
    'digital marketing agency modern',
    0,
    'https://html.aqlova.com/videos/cunnet/ca-video-2.mp4',
    'uhd',
    'landscape'
  );

  const hikerVideo = usePexelsVideo(
    'Hiker trekking in foggy mountains with backpack',
    0,
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-hiker-on-top-of-a-mountain-42525-large.mp4',
    'uhd',
    'landscape'
  );

  const digitalMarketingRef = useRef<HTMLVideoElement>(null);
  const hikerVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (digitalMarketingRef.current) {
      digitalMarketingRef.current.load();
      digitalMarketingRef.current.play().catch(() => {});
    }
  }, [digitalMarketingVideo]);

  useEffect(() => {
    if (hikerVideoRef.current) {
      hikerVideoRef.current.load();
      hikerVideoRef.current.play().catch(() => {});
    }
  }, [hikerVideo]);

  return (
    <>
      {/* Hero Section 3 */}
      <div className="ca-hero-area ca-hero-spacing" data-bg-color="#f6f6f6">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-5">
              <div className="ca-hero-left pt-65 pb-30">
                <div className="ca-hero-video p-relative video-uhd">
                  <video
                    ref={digitalMarketingRef}
                    key={digitalMarketingVideo}
                    loop
                    muted
                    autoPlay
                    playsInline
                    className="video-uhd"
                  >
                    <source src={digitalMarketingVideo} type="video/mp4" />
                  </video>
                </div>
                <div className="ca-hero-service">
                  <ul>
                    <li>
                      <a href="#">
                        <span className="explore-text" data-text="Branding">
                          Branding
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="explore-text" data-text="Development">
                          Development
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="explore-text" data-text="Design">
                          Design
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="explore-text" data-text="Marketing">
                          Marketing
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="explore-text" data-text="Creative Design">
                          Creative Design
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-7 col-md-7">
              <div className="ca-hero-title-wrap pt-50 pb-105">
                <h1 className="ca-hero-title cd-headline clip tp_title_anim mb-55">
                  We
                  <br /> Build
                  <br />
                  <span className="cd-words-wrapper">
                    <b className="is-visible">Bold</b>
                    <b className="app">Brave</b>
                    <b>Iconic</b>
                  </span>
                  <br />
                  Ideas
                </h1>
                <a className="tp-btn tp-btn-norotate ca-hero-btn tp-ff-inter" href="#portfolio">
                  <span>
                    <span className="text-1">Explore All Work</span>
                    <span className="text-2">Explore All Work</span>
                  </span>
                  <i>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
                        fill="currentColor"
                      />
                    </svg>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
                        fill="currentColor"
                      />
                    </svg>
                  </i>
                </a>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5">
              <div className="ca-hero-dec ml-60 pb-30">
                <p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1H13V14" stroke="currentColor" strokeWidth={2} />
                  </svg>
                  We build websites, apps &amp;
                  <br />
                  campaigns that actually move the
                  <br />
                  needle for growing brands. Brand
                  <br />
                  design a the have to success
                  <br />
                  whether you breath.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="ca-hero-thumb fix scale-up-img video-uhd" style={{ position: 'relative', overflow: 'hidden' }}>
          <video
            ref={hikerVideoRef}
            key={hikerVideo}
            autoPlay
            loop
            muted
            playsInline
            className="img-cover scale-up w-100 video-uhd"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            <source src={hikerVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      {/* ca-hero-area-end */}
    </>
  );
};

export default Hero3;

// ==================================================
// END: Hero3
// ==================================================
