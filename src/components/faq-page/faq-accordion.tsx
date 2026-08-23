import React, { useState, useEffect } from 'react';
import { fetchFaqsByDb, type FaqDbSource, type FaqItem } from '../../services/api';

export type { FaqDbSource };

// ==================================================
// START: FaqAccordion (Dedicated FAQ Page)
// Dynamic Component connected with D1 table: faq_page (with db selection)
// ==================================================

export interface FaqAccordionProps {
  /** Initial fallback data or custom items */
  initialFaqs?: FaqItem[];
  /** The target database table / source to retrieve data from ('faq_page' | 'index_faqs' | 'service_faqs' | 'faqs') */
  dbSource?: FaqDbSource;
  /** Optional service slug for filtering service_faqs */
  serviceSlug?: string;
  /** Whether to show the database selector controls on top */
  showDbSelector?: boolean;
  /** Custom section title */
  title?: string | React.ReactNode;
  /** Custom section subtitle */
  subtitle?: string;
  /** Callback when DB source is changed */
  onDbChange?: (selectedDb: FaqDbSource) => void;
}

interface FaqGroup {
  subheading: string;
  items: FaqItem[];
}

const DB_OPTIONS: { id: FaqDbSource; label: string; table: string; badge: string }[] = [
  { id: 'faq_pages', label: 'Dedicated FAQ Page', table: 'faq_page', badge: 'D1 Table' },
  { id: 'index_faqs', label: 'Homepage FAQs', table: 'index_faqs', badge: 'D1 Table' },
  { id: 'service_faqs', label: 'Service FAQs', table: 'service_faqs', badge: 'D1 Table' },
  { id: 'faqs', label: 'General FAQs', table: 'faqs', badge: 'D1 Table' },
];

const FaqAccordion: React.FC<FaqAccordionProps> = ({
  initialFaqs = [],
  dbSource = 'faq_page',
  serviceSlug,
  showDbSelector = false,
  title,
  subtitle,
  onDbChange,
}) => {
  const [activeDb, setActiveDb] = useState<FaqDbSource>(dbSource);
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [openKey, setOpenKey] = useState<string | null>('group-0-item-0');
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSourceInfo, setDataSourceInfo] = useState<{ source: string; count: number; isLive: boolean }>({
    source: dbSource,
    count: 0,
    isLive: false,
  });

  // Sync state if prop changes
  useEffect(() => {
    setActiveDb(dbSource);
  }, [dbSource]);

  // Fetch from the chosen DB source.
  // NOTE: initialFaqs is only ever used as a fallback when activeDb still
  // equals the dbSource the component was mounted/prop-updated with. If the
  // user switches tables via the selector and that table comes back empty or
  // errors, we show an empty state instead of silently re-showing
  // initialFaqs — otherwise an empty "index_faqs" table would render
  // leftover "faq_page" content and look like the same cross-source leak bug.
  useEffect(() => {
    let isMounted = true;
    const isInitialSource = activeDb === dbSource;

    async function loadData() {
      setLoading(true);
      try {
        const data = await fetchFaqsByDb(activeDb, serviceSlug);
        if (isMounted) {
          if (data && data.length > 0) {
            setFaqs(data);
            setDataSourceInfo({ source: `D1: ${activeDb}`, count: data.length, isLive: true });
          } else if (isInitialSource && initialFaqs.length > 0) {
            setFaqs(initialFaqs);
            setDataSourceInfo({ source: `${activeDb} (empty, using fallback)`, count: initialFaqs.length, isLive: false });
          } else {
            setFaqs([]);
            setDataSourceInfo({ source: `${activeDb} (empty)`, count: 0, isLive: false });
          }
        }
      } catch (err) {
        console.warn(`Failed to retrieve FAQ data from ${activeDb}:`, err);
        if (isMounted) {
          if (isInitialSource && initialFaqs.length > 0) {
            setFaqs(initialFaqs);
            setDataSourceInfo({ source: `${activeDb} (offline fallback)`, count: initialFaqs.length, isLive: false });
          } else {
            setFaqs([]);
            setDataSourceInfo({ source: `${activeDb} (error)`, count: 0, isLive: false });
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
    // dbSource/initialFaqs intentionally excluded: isInitialSource already
    // captures dbSource per-render, and initialFaqs is only read, not a
    // trigger for refetching.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDb, serviceSlug]);

  const handleDbSelect = (source: FaqDbSource) => {
    setActiveDb(source);
    if (onDbChange) {
      onDbChange(source);
    }
  };

  // Group FAQs by subheading / category preserving sort order
  const groupedFaqs: FaqGroup[] = React.useMemo(() => {
    const groups: { [key: string]: FaqGroup } = {};
    const groupOrder: string[] = [];

    faqs.forEach((item) => {
      const heading = item.subheading || item.category || 'General';
      if (!groups[heading]) {
        groups[heading] = { subheading: heading, items: [] };
        groupOrder.push(heading);
      }
      groups[heading].items.push(item);
    });

    return groupOrder.map((h) => groups[h]);
  }, [faqs]);

  const toggleFaq = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  let globalCounter = 0;

  return (
    <>
      {/* FAQ Accordion Area */}
      <div id="faq" className="tp-faq-area pb-130 position-relative">
        <div className="container">
          {/* Optional Database Selector UI */}
          {showDbSelector && (
            <div className="row mb-40">
              <div className="col-12">
                <div
                  className="p-4 rounded-4"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span
                        style={{
                          display: 'inline-block',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: dataSourceInfo.isLive ? '#10b981' : '#f59e0b',
                          boxShadow: dataSourceInfo.isLive ? '0 0 10px #10b981' : '0 0 10px #f59e0b',
                        }}
                      />
                      <span className="text-white fw-600 fs-15">Select Database Source:</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-dark border border-secondary text-secondary px-3 py-2 rounded-pill fs-13">
                        Active: <strong className="text-white">{dataSourceInfo.source}</strong> ({dataSourceInfo.count} items)
                      </span>
                    </div>
                  </div>

                  {/* DB Option Tabs / Buttons */}
                  <div className="d-flex flex-wrap gap-2">
                    {DB_OPTIONS.map((opt) => {
                      const isSelected = activeDb === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleDbSelect(opt.id)}
                          disabled={loading}
                          className="btn btn-sm px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2"
                          style={{
                            background: isSelected ? '#ff3e6c' : 'rgba(255, 255, 255, 0.08)',
                            color: '#ffffff',
                            border: isSelected ? '1px solid #ff3e6c' : '1px solid rgba(255, 255, 255, 0.15)',
                            transition: 'all 0.2s ease',
                            cursor: loading ? 'wait' : 'pointer',
                          }}
                        >
                          <span>{opt.label}</span>
                          <span
                            style={{
                              fontSize: '10px',
                              opacity: 0.8,
                              textTransform: 'uppercase',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: isSelected ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {opt.table}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Header Title */}
          <div className="row">
            <div className="col-12">
              {subtitle && (
                <span className="text-uppercase fw-500 text-muted mb-2 d-inline-block">
                  {subtitle}
                </span>
              )}
              <h2 className="tp-section-title reveal-text fs-72 mb-40">
                {title || (
                  <>
                    Explore Answers to<br />
                    Our Most Asked Questions
                  </>
                )}
              </h2>
            </div>
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="row mb-40 text-center">
              <div className="col-12">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading FAQs from database...</span>
                </div>
                <p className="mt-2 text-muted fs-14">Retrieving FAQ records from D1 ({activeDb})...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && faqs.length === 0 && (
            <div className="row mb-50">
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-16">No FAQ records found in table: <strong>{activeDb}</strong>.</p>
              </div>
            </div>
          )}

          {/* FAQs List Grouped */}
          {groupedFaqs.map((group, groupIdx) => (
            <div className="row mb-50" key={group.subheading || groupIdx}>
              <div className="col-xxl-4 col-xl-3">
                <div className="tp-faq-subtitle mb-30 pt-10">
                  <span className="text-uppercase fw-500">{group.subheading}</span>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-9">
                <div className="tp-faq tp-service-details-faq-two tp-service-details-faq mb-30">
                  <div className="accordion" id={`faqPageAccordionGroup${groupIdx}`}>
                    {group.items.map((item, itemIdx) => {
                      globalCounter += 1;
                      const itemKey = `faq-page-${groupIdx}-${itemIdx}`;
                      const collapseId = `faqPageCollapse-${groupIdx}-${itemIdx}`;
                      const isOpen = openKey === itemKey;
                      const numStr = String(globalCounter).padStart(2, '0');

                      return (
                        <div className="tp-faq-item tp_fade_anim" data-delay=".3" key={item.id || itemKey}>
                          <h2 className="accordion-header">
                            <button
                              className={`tp-faq-button ${!isOpen ? 'collapsed' : ''}`}
                              type="button"
                              onClick={() => toggleFaq(itemKey)}
                              aria-expanded={isOpen}
                              aria-controls={collapseId}
                            >
                              <span>{numStr}</span>
                              {item.question}
                            </button>
                          </h2>
                          <div
                            id={collapseId}
                            className={`tp-faq-collapse collapse ${isOpen ? 'show' : ''}`}
                            data-bs-parent={`#faqPageAccordionGroup${groupIdx}`}
                          >
                            <div className="tp-faq-body">
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FaqAccordion;

// ==================================================
// END: FaqAccordion
// ==================================================