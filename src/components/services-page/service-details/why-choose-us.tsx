import React, { useState, useEffect, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { fetchServiceDetailBySlug, type ServiceDetailItem, type WhyChooseItem } from '../../../services/api';

// ==================================================
// START: WhyChooseUs (Service Details)
// Connected with D1 `service_details` table & Lucide Icons
// ==================================================

export interface ServiceDetailsWhyChooseUsProps {
  slug?: string;
}

const DEFAULT_WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    id: 'collapseOne',
    icon: 'Users',
    title: 'User-Centric Architecture',
    description:
      'We map intuitive user journeys, wireframes, and workflows tailored precisely to solve user pain points and drive product adoption.',
  },
  {
    id: 'collapseTwo',
    icon: 'Layers',
    title: 'Interactive Prototyping',
    description:
      'We build clickable, responsive prototypes to test interactions, gather early feedback, and validate ideas before development begins.',
  },
  {
    id: 'collapseThree',
    icon: 'Component',
    title: 'Scalable Design Systems',
    description:
      'We create clean, modular component libraries and design tokens in Figma to ensure consistent brand identity and faster frontend builds.',
  },
  {
    id: 'collapseFour',
    icon: 'FlaskConical',
    title: 'Data & Usability Testing',
    description:
      'We run rigorous usability tests, analyze behavioral analytics, and refine layouts to maximize engagement and conversion rates.',
  },
  {
    id: 'collapseFive',
    icon: 'TrendingUp',
    title: 'Conversion-Rate Optimization',
    description:
      'We strategically place micro-interactions and clear calls-to-action to turn regular visitors into active, long-term paying customers.',
  },
  {
    id: 'collapseSix',
    icon: 'Code2',
    title: 'Seamless Developer Handoff',
    description:
      'We deliver pixel-perfect Figma files with complete asset exports, responsive auto-layouts, and precise tokens for effortless development.',
  },
];

const renderLucideIcon = (iconName?: string) => {
  if (!iconName) return null;
  const IconComponent = (
    LucideIcons as unknown as Record<
      string,
      React.ComponentType<{ size?: number | string; className?: string; style?: React.CSSProperties }>
    >
  )[iconName];

  if (!IconComponent) return null;
  return (
    <span
      className="why-choose-icon-wrap d-inline-flex align-items-center justify-content-center me-3"
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        color: 'var(--tp-theme-primary, #ff3c00)',
        flexShrink: 0,
      }}
    >
      <IconComponent size={20} />
    </span>
  );
};

const WhyChooseUs: React.FC<ServiceDetailsWhyChooseUsProps> = ({ slug: propSlug }) => {
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

    async function loadDetail() {
      if (!currentSlug) return;
      try {
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }
      } catch (err) {
        console.warn('Failed to load why-choose-us details from D1:', err);
      }
    }

    loadDetail();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // Parse why_choose_items
  const items: WhyChooseItem[] = useMemo(() => {
    if (!detail?.why_choose_items) return DEFAULT_WHY_CHOOSE_ITEMS;
    if (Array.isArray(detail.why_choose_items)) {
      return detail.why_choose_items;
    }
    if (typeof detail.why_choose_items === 'string') {
      try {
        const parsed = JSON.parse(detail.why_choose_items);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // parsing failed
      }
    }
    return DEFAULT_WHY_CHOOSE_ITEMS;
  }, [detail]);

  const subtitle = detail?.why_choose_subtitle || 'Why Choose Us';
  const headingTitle =
    detail?.why_choose_title ||
    'At revlytics, we don’t just build interfaces we engineer experiences.';

  return (
    <>
      {/* Why Choose Us / Service FAQ 1 Section */}
      <div className="tp-faq-area pb-130 pt-60">
        <div className="container">
          <div className="row">
            <div className="col-xxl-5 col-xl-3">
              <div className="tp-faq-subtitle mb-30">
                <span className="text-uppercase fw-500">{subtitle}</span>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-9">
              <div className="tp-faq tp-service-details-faq-one tp-service-details-faq mb-30">
                <h2 className="tp-section-title reveal-text fs-72 mb-30">{headingTitle}</h2>
                <div className="accordion" id="accordionWhyChooseUs">
                  {items.map((item, index) => {
                    const collapseId = item.id || `collapseWhyChoose${index}`;
                    const isFirst = index === 0;
                    const itemNumber = item.number || (index < 9 ? `0${index + 1}` : `${index + 1}`);

                    return (
                      <div key={index} className="tp-faq-item tp_fade_anim" data-delay=".3">
                        <h2 className="accordion-header">
                          <button
                            className={`tp-faq-button ${isFirst ? '' : 'collapsed'} d-flex align-items-center`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst ? 'true' : 'false'}
                            aria-controls={collapseId}
                          >
                            <span className="d-inline-flex align-items-center">
                              {renderLucideIcon(item.icon)}
                              <span>
                                {item.number ? `${item.number}. ` : `${itemNumber}. `}
                                {item.title}
                              </span>
                            </span>
                          </button>
                        </h2>
                        <div
                          id={collapseId}
                          className={`tp-faq-collapse collapse ${isFirst ? 'show' : ''}`}
                          data-bs-parent="#accordionWhyChooseUs"
                        >
                          <div className="tp-faq-body">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-faq-area-end */}
    </>
  );
};

export default WhyChooseUs;
