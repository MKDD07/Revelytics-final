import React from 'react';

// Brand logos from public/assets/img/brand/
const PARTNER_BRANDS = [
  { id: 1, name: 'Brand 1', logo: '/assets/img/brand/brand_2_1.svg' },
  { id: 2, name: 'Brand 2', logo: '/assets/img/brand/brand_2_2.svg' },
  { id: 3, name: 'Brand 3', logo: '/assets/img/brand/brand_2_3.svg' },
  { id: 4, name: 'Brand 4', logo: '/assets/img/brand/brand_2_4.svg' },
  { id: 5, name: 'Brand 5', logo: '/assets/img/brand/brand_2_5.svg' },
  { id: 6, name: 'Brand 6', logo: '/assets/img/brand/brand_2_6.svg' },
  { id: 7, name: 'Brand 7', logo: '/assets/img/brand/brand_2_7.svg' },
  { id: 8, name: 'Brand 8', logo: '/assets/img/brand/brand_2_8.svg' },
  { id: 9, name: 'Brand 9', logo: '/assets/img/brand/brand_2_9.svg' },
  { id: 10, name: 'Brand 10', logo: '/assets/img/brand/brand_2_10.svg' },
  { id: 11, name: 'Brand 11', logo: '/assets/img/brand/brand_2_11.svg' },
  { id: 12, name: 'Brand 12', logo: '/assets/img/brand/brand_2_12.svg' },
  { id: 13, name: 'Brand 13', logo: '/assets/img/brand/brand_2_13.svg' },
  { id: 14, name: 'Brand 14', logo: '/assets/img/brand/brand_2_14.svg' },
];

export interface PartnersSectionProps {
  className?: string;
}

const PartnersSection: React.FC<PartnersSectionProps> = ({ className = '' }) => {
  return (
    <section
      className={`sec-3-home-2 pt-130 pb-130 position-relative ${className}`.trim()}
      style={{
        backgroundColor: '#09090b',
        color: '#ffffff',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div className="row">
          {/* Header Row */}
          <div className="col-lg-10 col-12">
            <div className="at-about-title-wrap d-flex flex-wrap flex-lg-nowrap align-items-start gap-4 mb-30">
              {/* Particular Stylized Badge Button */}
              <div
                className="tp-partner-badge-btn d-inline-flex align-items-center gap-2 px-4 py-2 mt-xxl-1"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 60, 0, 0.12) 0%, rgba(181, 123, 238, 0.08) 100%)',
                  border: '1px solid rgba(255, 60, 0, 0.35)',
                  borderRadius: '100px',
                  boxShadow: '0 0 20px rgba(255, 60, 0, 0.15)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  flexShrink: 0,
                }}
              >
                {/* Glowing Pulse Dot */}
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                    boxShadow: '0 0 10px var(--tp-theme-primary, #ff3c00)',
                    display: 'inline-block',
                    animation: 'partnerPulse 2s infinite',
                  }}
                />

                <span
                  className="text-uppercase"
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '1.8px',
                    color: '#ffffff',
                  }}
                >
                  Our{' '}
                  <span
                    style={{
                      color: 'var(--tp-theme-primary, #ff3c00)',
                      textShadow: '0 0 12px rgba(255, 60, 0, 0.5)',
                    }}
                  >
                    Partners
                  </span>
                </span>

                <i
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    color: 'var(--tp-theme-primary, #ff3c00)',
                    marginLeft: '2px',
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
                      fill="currentColor"
                    />
                  </svg>
                </i>
              </div>

              {/* Section Headline */}
              <h4
                className="at-section-title reveal-text text-white m-0 tp-ff-sequel-bold-head"
                style={{
                  fontSize: 'clamp(28px, 3.8vw, 48px)',
                  lineHeight: 1.2,
                  letterSpacing: '-1px',
                  fontWeight: 700,
                }}
              >
                Collaborating with{' '}
                <span
                  style={{
                    color: 'var(--tp-theme-primary, #ff3c00)',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(255, 60, 0, 0.4)',
                    textUnderlineOffset: '6px',
                  }}
                >
                  progressive brands
                </span>{' '}
                to shape meaningful, long-term impact.
              </h4>
            </div>
          </div>

          {/* Carousel Ticker Brand Marquee */}
          <div className="col-lg-12 col-12 at-brand-area border-0 my-4">
            <div className="carouselTicker carouselTicker-left position-relative z-1 overflow-hidden">
              <div
                className="carouselTicker__wrap"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                }}
              >
                <div className="marquee-track d-flex align-items-center">
                  {/* First Set of Brands */}
                  {PARTNER_BRANDS.map((item, idx) => (
                    <div
                      key={`b1-${item.id}-${idx}`}
                      className="brand-item dark-mode-invert px-4 py-3 d-flex align-items-center justify-content-center"
                      style={{
                        flexShrink: 0,
                        width: '180px',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                      }}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        style={{
                          maxHeight: '44px',
                          maxWidth: '130px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)',
                          opacity: 0.75,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.75';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  ))}

                  {/* Duplicate Clone Set for Infinite Loop */}
                  {PARTNER_BRANDS.map((item, idx) => (
                    <div
                      key={`b2-${item.id}-${idx}`}
                      className="brand-item dark-mode-invert px-4 py-3 d-flex align-items-center justify-content-center"
                      style={{
                        flexShrink: 0,
                        width: '180px',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                      }}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        style={{
                          maxHeight: '44px',
                          maxWidth: '130px',
                          objectFit: 'contain',
                          filter: 'brightness(0) invert(1)',
                          opacity: 0.75,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'scale(1.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.75';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes partnerPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 10px var(--tp-theme-primary, #ff3c00);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
            box-shadow: 0 0 18px var(--tp-theme-primary, #ff3c00);
          }
        }
        .tp-partner-badge-btn:hover {
          background: linear-gradient(135deg, rgba(255, 60, 0, 0.22) 0%, rgba(181, 123, 238, 0.16) 100%) !important;
          border-color: var(--tp-theme-primary, #ff3c00) !important;
          box-shadow: 0 0 28px rgba(255, 60, 0, 0.3) !important;
          transform: translateY(-2px);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeScroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
