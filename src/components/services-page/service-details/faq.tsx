import React, { useState, useEffect, useMemo } from 'react';
import { fetchServiceDetailBySlug, fetchFaqs, type ServiceDetailItem, type ServiceFaq } from '../../../services/api';

// ==================================================
// START: ServiceDetailsFaq
// Connected with D1 `service_details.faqs` table/column
// ==================================================

export interface ServiceDetailsFaqProps {
  slug?: string;
}

const DEFAULT_FAQS: ServiceFaq[] = [
  {
    question: 'What design tools do you use?',
    answer:
      'We primarily design in Figma for collaborative wireframing, UI kits, design systems, and clickable prototypes.',
  },
  {
    question: 'Do you provide design systems and component libraries?',
    answer:
      'Yes, every UI/UX project includes an atomic design system with typography, color palettes, auto-layout components, and reusable UI tokens.',
  },
  {
    question: 'How long does a full UI/UX design project take?',
    answer:
      'A standard end-to-end design cycle typically takes 2 to 6 weeks, depending on the screen count and complexity.',
  },
  {
    question: 'Can you redesign our existing web or mobile app?',
    answer:
      'Yes, we run a UX audit on your existing app to remove friction points and modernize the interface.',
  },
  {
    question: 'How do you hand off designs to developers?',
    answer:
      'We provide pixel-perfect Figma files with auto-layout, design tokens, asset exports, and developer specs.',
  },
];

const Faq: React.FC<ServiceDetailsFaqProps> = ({ slug: propSlug }) => {
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
  const [fallbackFaqs, setFallbackFaqs] = useState<ServiceFaq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (!currentSlug) return;
      try {
        setLoading(true);
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }

        // If detail doesn't have faqs column populated, fallback to service_faqs table
        if (!data?.faqs) {
          const sFaqs = await fetchFaqs('service_faqs', currentSlug);
          if (isMounted && sFaqs && sFaqs.length > 0) {
            setFallbackFaqs(
              sFaqs.map((f) => ({
                question: f.question,
                answer: f.answer,
              }))
            );
          }
        }
      } catch (err) {
        console.warn('Failed to load service faqs from D1:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  // Parse faqs from D1 service_details.faqs
  const faqsList: ServiceFaq[] = useMemo(() => {
    if (detail?.faqs) {
      if (Array.isArray(detail.faqs)) {
        return detail.faqs;
      }
      if (typeof detail.faqs === 'string') {
        try {
          const parsed = JSON.parse(detail.faqs);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch {
          // json parse error
        }
      }
    }

    if (fallbackFaqs.length > 0) {
      return fallbackFaqs;
    }

    return DEFAULT_FAQS;
  }, [detail, fallbackFaqs]);

  return (
    <>
      {/* Service Details FAQ Section */}
      <div className="tp-faq-area pb-130 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-xxl-5 col-xl-3">
              <div className="tp-faq-subtitle mb-30">
                <span className="text-uppercase fw-500">FAQ</span>
              </div>
            </div>
            <div className="col-xxl-7 col-xl-9">
              <div className="tp-faq tp-service-details-faq-two tp-service-details-faq mb-30">
                <h2 className="tp-section-title reveal-text fs-72 mb-40 mt-40">
                  Explore Answers to
                  <br />
                  Our Most Asked Questions
                </h2>
                <div className="accordion" id="accordionServiceFaqs">
                  {faqsList.map((faq, index) => {
                    const collapseId = `faqCollapse${index}`;
                    const isFirst = index === 0;
                    const itemNumber = index < 9 ? `0${index + 1}` : `${index + 1}`;

                    return (
                      <div key={index} className="tp-faq-item tp_fade_anim" data-delay=".3">
                        <h2 className="accordion-header">
                          <button
                            className={`tp-faq-button ${isFirst ? '' : 'collapsed'}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${collapseId}`}
                            aria-expanded={isFirst ? 'true' : 'false'}
                            aria-controls={collapseId}
                          >
                            <span>{itemNumber}</span>
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={collapseId}
                          className={`tp-faq-collapse collapse ${isFirst ? 'show' : ''}`}
                          data-bs-parent="#accordionServiceFaqs"
                        >
                          <div className="tp-faq-body">
                            <p>{faq.answer}</p>
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

export default Faq;
