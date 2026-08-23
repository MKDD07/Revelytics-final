import React, { useState, useEffect, useMemo } from 'react';
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

  return (
    <>
      {/* Process Section */}
      <div className="tp-process-area pt-85 pb-130 p-relative z-index-1">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center mb-40">
                <h2 className="tp-section-title reveal-text fs-72">{processTitle}</h2>
              </div>
            </div>
            <div className="col-xxl-10 offset-xxl-1 col-12">
              <div className="tp-process-border d-none d-lg-block">
                <svg viewBox="0 0 1320 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1315 3.5L1320 5.88675V0.113249L1315 2.5V3.5ZM4.5 3.5H1315.5V2.5H4.5V3.5Z"
                    fill="currentColor"
                    fillOpacity="0.1"
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
