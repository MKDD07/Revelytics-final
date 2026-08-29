import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchServiceDetailBySlug, type ServiceDetailItem, type ProcessStep } from '../../../services/api';

// ==================================================
// START: Process (Service Details)
// Connected with D1 `service_details` table
// ==================================================

export interface ServiceDetailsProcessProps {
  slug?: string;
}

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Research And Analysis',
    description: 'Conduct user research (interviews, surveys, analytics).',
  },
  {
    step: '02',
    title: 'Design And Prototyping',
    description: 'Transform wireframes into high-fidelity UI designs.',
  },
  {
    step: '03',
    title: 'Testing And Iteration',
    description: 'Conduct usability testing to gather user feedback.',
  },
  {
    step: '04',
    title: 'Prepare for Delivery',
    description: 'Track performance using analytics and user feedback.',
  },
];

const Process: React.FC<ServiceDetailsProcessProps> = ({ slug: propSlug }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

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

  useEffect(() => {
    let isMounted = true;

    async function loadServiceDetail() {
      if (!currentSlug) return;
      try {
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }
      } catch (err) {
        console.warn('Failed to load process details from D1:', err);
      }
    }

    loadServiceDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // Parse process_steps from D1
  const steps: ProcessStep[] = useMemo(() => {
    if (!detail?.process_steps) return DEFAULT_PROCESS_STEPS;
    if (Array.isArray(detail.process_steps)) {
      return detail.process_steps;
    }
    if (typeof detail.process_steps === 'string') {
      try {
        const parsed = JSON.parse(detail.process_steps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // failed JSON parse
      }
    }
    return DEFAULT_PROCESS_STEPS;
  }, [detail]);

  const clipRectRef = useRef<SVGRectElement | null>(null);

  // GSAP ScrollTrigger animation to reveal the filled ribbon path left-to-right
  useEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (!gsap || !ScrollTrigger || !sectionRef.current || !clipRectRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.set(clipRectRef.current, {
      attr: { width: 0 },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 55%',
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    tl.to(clipRectRef.current, {
      attr: { width: 1103 },
      ease: 'none',
    });

    const handleResize = () => {
      if (ScrollTrigger) ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [steps]);

  const processTitle = detail?.process_title || 'Product making for friendly users';
  const ctaText = detail?.process_cta_text || 'Don’t hesitate collaborate with expertise-';
  const ctaLink = detail?.process_cta_link || '/contact';

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaLink.startsWith('/') || ctaLink.startsWith('#')) {
      e.preventDefault();
      const cleanPath = ctaLink.replace('#', '').replace(/^\//, '');
      window.history.pushState({}, '', cleanPath ? `/${cleanPath}` : '/');
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const pathData =
    'M1102.02 51.5625C1081.73 51.1974 1064.88 38.4341 1048.98 27.0853C1038.04 19.2177 1027.14 10.9691 1014.53 5.60294C1008.59 3.10402 1002.15 1.79409 995.688 1.74838C948.056 3.57459 915.727 48.1061 870.399 49.542C858.42 49.4729 846.441 49.4076 834.462 49.3458C785.999 51.4824 753.96 96.084 709.172 97.536C664.385 95.8257 632.911 51.0873 583.883 48.5711C573.238 48.5654 562.593 48.5625 551.948 48.5625C549.92 48.5625 547.892 48.5626 545.864 48.5628C501.251 47.0237 469.484 2.3562 420.575 -0.000678539C371.666 2.57469 340.377 47.358 295.286 49.2183C283.654 49.2731 272.023 49.3314 260.392 49.3931C211.964 51.9966 180.963 96.8495 135.102 99.0063C106.299 98.5712 82.0489 79.5003 56.8277 66.2993C42.2956 58.561 26.5776 51.3538 9.8133 51.4643C6.5422 51.4968 3.2711 51.5295 0 51.5625C3.2711 51.5955 6.5422 51.6282 9.8133 51.6607C26.5083 51.8867 41.9381 59.3284 56.2798 67.2989C81.2208 80.8592 104.949 100.559 135.102 101.587C182.889 99.7076 215.173 55.1651 260.392 53.7319C272.023 53.7936 283.654 53.8519 295.286 53.9067C343.841 51.7303 375.837 7.11822 420.575 5.65693C465.312 7.33671 496.83 52.0646 545.864 54.5622C547.892 54.5624 549.92 54.5625 551.948 54.5625C562.593 54.5625 573.238 54.5596 583.883 54.5539C628.502 56.0744 660.313 100.731 709.172 103.058C758.032 100.473 789.277 55.6793 834.462 53.7792C846.441 53.7174 858.42 53.6521 870.399 53.583C918.718 50.9822 949.674 6.11829 995.688 3.90787C1001.87 3.85206 1008.07 5.00313 1013.83 7.31207C1026.22 12.3343 1037.24 20.3414 1048.32 28.0148C1064.42 39.0782 1081.71 51.6212 1102.02 51.5625Z';

  return (
    <>
      {/* Process Section */}
      <div ref={sectionRef} className="tp-process-area pt-85 pb-130 p-relative z-index-1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-40">
                <h2 className="tp-section-title reveal-text fs-72">{processTitle}</h2>
              </div>
            </div>
            <div className="col-xxl-10 offset-xxl-1 col-12 p-relative">
              <div className="tp-process-border d-none d-lg-block">
                <svg
                  width="1103"
                  height="104"
                  viewBox="0 0 1103 104"
                  preserveAspectRatio="none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-100"
                  style={{ width: '100%', height: '104px', display: 'block', overflow: 'visible' }}
                >
                  <defs>
                    <clipPath id="tp-process-ribbon-clip">
                      <rect ref={clipRectRef} x="0" y="-10" width="0" height="130" />
                    </clipPath>
                    <radialGradient
                      id="paint0_radial_716_989"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(551.01 51.5625) scale(551.01 48.7344)"
                    >
                      <stop stopColor="#CD4631" />
                      <stop offset="1" stopColor="white" />
                    </radialGradient>
                  </defs>

                  {/* Subtle Guide Background */}
                  <path
                    d={pathData}
                    fill="currentColor"
                    fillOpacity="0.08"
                  />

                  {/* Animated Active Filled Ribbon with Radial Gradient */}
                  <path
                    d={pathData}
                    fill="url(#paint0_radial_716_989)"
                    clipPath="url(#tp-process-ribbon-clip)"
                  />
                </svg>
              </div>
              <div className="row">
                {steps.map((stepItem, index) => {
                  const delay = 0.3 + index * 0.1;
                  return (
                    <div key={index} className="col-lg-3 col-md-6 col-sm-6">
                      <div
                        className="tp-process-item text-center mb-30 tp_fade_anim"
                        data-delay={delay.toFixed(1)}
                        data-fade-from="left"
                      >
                        <span className="tp-process-count d-inline-block text-center fw-600 mb-45">
                          {stepItem.step || `0${index + 1}`}
                        </span>
                        <h3 className="tp-process-title mb-20">{stepItem.title}</h3>
                        <p className="tp-process-dec">{stepItem.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-12">
              <div
                className="tp-process-bottom text-center mt-40 tp_fade_anim"
                data-delay=".5"
                data-fade-from="bottom"
                data-ease="bounce"
              >
                <p className="tp-process-bottom-para">
                  {ctaText}{' '}
                  <a
                    href={ctaLink}
                    onClick={handleCtaClick}
                    className="ml-20 d-inline-block lh-0 tp-btn-switch-animation fw-700"
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      <span className="btn-text">Let&rsquo;s Talk</span>
                      <span className="btn-icon">
                        <svg width="25" height="10" viewBox="0 0 25 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18.675 9.91054L24.72 5.63362C24.806 5.56483 24.8766 5.47086 24.9255 5.36023C24.9744 5.2496 25 5.12579 25 5C25 4.87421 24.9744 4.7504 24.9255 4.63977C24.8766 4.52914 24.806 4.43518 24.72 4.36638L18.675 0.0894619C18.5572 0.0111909 18.4215 -0.0168364 18.2892 0.00979851C18.157 0.0364334 18.0358 0.116215 17.9446 0.236567C17.8535 0.356918 17.7977 0.510993 17.7859 0.674501C17.7742 0.838009 17.8072 1.00165 17.8798 1.13963L19.633 4.26665L0.598757 4.26665C0.439957 4.26665 0.287661 4.34391 0.175371 4.48144C0.0630817 4.61897 0 4.8055 0 5C0 5.1945 0.0630817 5.38103 0.175371 5.51856C0.287661 5.65609 0.439957 5.73335 0.598757 5.73335L19.633 5.73335L17.8798 8.86038C17.8072 8.99835 17.7742 9.16199 17.7859 9.3255C17.7977 9.48901 17.8535 9.64308 17.9446 9.76343C18.0358 9.88378 18.157 9.96357 18.2892 9.9902C18.4215 10.0168 18.5572 9.98881 18.675 9.91054Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-process-area-end */}
    </>
  );
};

export default Process;
