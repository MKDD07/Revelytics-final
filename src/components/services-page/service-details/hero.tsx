import React, { useState, useEffect, useMemo } from 'react';
import { fetchServiceDetailBySlug, type ServiceDetailItem } from '../../../services/api';

// ==================================================
// START: Hero (Service Details)
// Connected with D1 `service_details` table
// ==================================================

export interface ServiceDetailsHeroProps {
  slug?: string;
}

const Hero: React.FC<ServiceDetailsHeroProps> = ({ slug: propSlug }) => {
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
        console.warn('Failed to load service detail from D1:', err);
      }
    }

    loadServiceDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  const categoryName = detail?.category || 'Services';
  const serviceName =
    detail?.service_name ||
    currentSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

  // Dynamically extract features list strictly from D1 service_details `features` column
  const capabilitiesList: string[] = useMemo(() => {
    if (!detail?.features) return [];
    if (Array.isArray(detail.features)) {
      return detail.features.map((f) => (f.startsWith('+') ? f : `+ ${f.trim()}`));
    }
    if (typeof detail.features === 'string') {
      try {
        const parsed = JSON.parse(detail.features);
        if (Array.isArray(parsed)) {
          return parsed.map((f: string) => (f.startsWith('+') ? f : `+ ${f.trim()}`));
        }
      } catch {
        return detail.features
          .split(',')
          .map((f) => f.trim())
          .filter(Boolean)
          .map((f) => (f.startsWith('+') ? f : `+ ${f}`));
      }
    }
    return [];
  }, [detail]);

  return (
    <>
      {/* Service Details Hero Section */}
      <div className="tp-service-details-banner-area about-us-spacing pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-lg-4">
              <div className="tp-service-details-hero-subtitle mb-20 tp_fade_anim" data-delay=".3">
                <span className="text-uppercase fw-500">
                  {categoryName}
                  <svg width="64" height="8" viewBox="0 0 64 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="3.5" width="62.5039" height="1" fill="currentColor" />
                    <path d="M59.5273 7.46366L62.9998 3.98183L59.5273 0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8">
              <div className="tp-service-details-hero-title ml-115 tp_fade_anim" data-delay=".5">
                <h1 className="tp-ff-sequel-bold-head">{serviceName}</h1>
              </div>
            </div>
            {capabilitiesList.length > 0 && (
              <div className="col-xl-4 col-lg-6">
                <div className="ca-hero-service tp-service-details-hero-link ml-90 mt-90 tp_fade_anim" data-delay=".7">
                  <ul>
                    {capabilitiesList.map((item, idx) => (
                      <li key={idx}>
                        <a href="#">
                          <span className="explore-text" data-text={item}>
                            {item}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* tp-service-details-area-end */}
    </>
  );
};

export default Hero;
