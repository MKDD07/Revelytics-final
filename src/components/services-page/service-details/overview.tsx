import React, { useState, useEffect, useMemo } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { fetchServiceDetailBySlug, type ServiceDetailItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

// ==================================================
// START: Overview (Service Details)
// Dynamic Pexels Photography Integration & Breadcrumbs
// ==================================================

export interface ServiceDetailsOverviewProps {
  slug?: string;
}

const DEFAULT_IMAGE = 'assets/img/service/details/service.jpg';

const Overview: React.FC<ServiceDetailsOverviewProps> = ({ slug: propSlug }) => {
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
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [loadingImg, setLoadingImg] = useState<boolean>(true);

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
        console.warn('Failed to load service overview details:', err);
      }
    }

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // 2. Fetch Pexels Image based on pexels_query or service metadata (Landscape orientation)
  useEffect(() => {
    let isMounted = true;

    async function loadPexelsImage() {
      // Use direct image_url if provided in database
      if (detail?.image_url) {
        setPhotoUrl(detail.image_url);
        return;
      }

      const query =
        detail?.pexels_query ||
        `${detail?.category || ''} ${detail?.service_name || currentSlug} technology architecture minimal landscape`.trim();

      try {
        setLoadingImg(true);
        const photos = await searchPexelsPhotos(query, 5, 'landscape');
        if (isMounted && photos && photos.length > 0) {
          setPhotoUrl(photos[0]);
        } else if (isMounted) {
          setPhotoUrl(DEFAULT_IMAGE);
        }
      } catch (err) {
        console.warn('Pexels image search failed for service overview:', err);
        if (isMounted) {
          setPhotoUrl(DEFAULT_IMAGE);
        }
      }
    }

    loadPexelsImage();

    return () => {
      isMounted = false;
    };
  }, [detail, currentSlug]);

  const serviceName = detail?.service_name || currentSlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    const isTouchOrMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    window.scrollTo({ top: 0, behavior: isTouchOrMobile ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* Service Overview Section */}
      <div className="tp-service-overview-area pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-service-overview-top mb-50">
                <h2 className="tp-section-title reveal-text fs-72 mb-30">Service Overview</h2>

                {/* Breadcrumbs with Lucide Home Icon (no text) */}
                <nav aria-label="breadcrumb" className="mb-35">
                  <ol
                    className="d-flex align-items-center flex-wrap list-unstyled p-0 m-0"
                    style={{ gap: '10px', fontSize: '15px' }}
                  >
                    <li className="d-flex align-items-center">
                      <a
                        href="/"
                        onClick={(e) => handleNav('/', e)}
                        title="Home"
                        className="d-inline-flex align-items-center justify-content-center text-decoration-none"
                        style={{
                          color: 'var(--tp-theme-primary, #ff3c00)',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        <Home size={18} />
                      </a>
                    </li>
                    <li className="d-flex align-items-center text-muted">
                      <ChevronRight size={14} style={{ opacity: 0.6 }} />
                    </li>
                    <li className="d-flex align-items-center">
                      <a
                        href="/services"
                        onClick={(e) => handleNav('/services', e)}
                        className="text-decoration-none text-muted"
                        style={{ transition: 'color 0.2s ease' }}
                      >
                        {detail?.category || 'Services'}
                      </a>
                    </li>
                    <li className="d-flex align-items-center text-muted">
                      <ChevronRight size={14} style={{ opacity: 0.6 }} />
                    </li>
                    <li
                      className="d-flex align-items-center fw-600 active"
                      aria-current="page"
                      style={{ color: 'inherit' }}
                    >
                      {serviceName}
                    </li>
                  </ol>
                </nav>

                <div className="tp-process-border tp-service-overview-border d-none d-lg-block">
                  <svg viewBox="0 0 1320 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1315 3.5L1320 5.88675V0.113249L1315 2.5V3.5ZM4.5 3.5H1315.5V2.5H4.5V3.5Z"
                      fill="currentColor"
                      fillOpacity="0.1"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="tp-service-details-content mb-40 mr-115">
                <p className="tp-service-details-dec mb-45">
                  Strategic {serviceName} engineered to deliver measurable impact, intuitive user experiences, and sustainable business growth across digital ecosystems.
                </p>
                <h5 className="tp-service-details-title mb-30">Our Approach to Excellence</h5>
                <ul>
                  <li>
                    <i className="fa-regular fa-circle-check" />
                    <p>Discovery &amp; Research &ndash; Understanding your business, audience, and market potential.</p>
                  </li>
                  <li>
                    <i className="fa-regular fa-circle-check" />
                    <p>Concept &amp; Architecture &ndash; Crafting scalable frameworks and cutting-edge solutions.</p>
                  </li>
                  <li>
                    <i className="fa-regular fa-circle-check" />
                    <p>Refinement &amp; Performance &ndash; Perfecting every interaction and optimizing for conversion.</p>
                  </li>
                  <li>
                    <i className="fa-regular fa-circle-check" />
                    <p>Deployment &amp; Growth &ndash; Delivering seamless implementations with future-ready scalability.</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-7">
              <div
                className="tp-service-thumb mb-30 position-relative"
                style={{
                  minHeight: '380px',
                  height: '100%',
                  maxHeight: '520px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f0f2f5',
                }}
              >
                {/* Light Grey Shimmer Skeleton Loader */}
                {loadingImg && (
                  <div
                    className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                      top: 0,
                      left: 0,
                      backgroundColor: '#e9ecef',
                      borderRadius: '16px',
                      zIndex: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(90deg, rgba(233,236,239,0) 0%, rgba(248,249,250,0.85) 50%, rgba(233,236,239,0) 100%)',
                        animation: 'shimmerSweep 1.5s infinite',
                      }}
                    />
                    <style>{`
                      @keyframes shimmerSweep {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                      }
                    `}</style>
                  </div>
                )}

                {photoUrl && (
                  <img
                    className="w-100"
                    src={photoUrl}
                    alt={serviceName}
                    onLoad={() => setLoadingImg(false)}
                    onError={() => {
                      if (photoUrl !== DEFAULT_IMAGE) {
                        setPhotoUrl(DEFAULT_IMAGE);
                      }
                      setLoadingImg(false);
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      maxHeight: '520px',
                      objectFit: 'cover',
                      borderRadius: '16px',
                      transition: 'opacity 0.4s ease-in-out',
                      opacity: loadingImg ? 0 : 1,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-service-overview-area-end */}
    </>
  );
};

export default Overview;
