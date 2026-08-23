import React, { useState, useEffect } from 'react';
import { fetchFaqPage, type FaqItem } from '../../services/api';

// ==================================================
// START: FaqAccordion (Dedicated FAQ Page)
// Connected to D1 Database table: faq_page
// ==================================================

const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 1,
    subheading: 'General',
    section_sort_order: 10,
    question: 'Who is Revlytics?',
    answer: 'Revlytics is a digital marketing and travel-technology company that designs websites and apps, integrates travel APIs/GDS systems, and runs digital marketing campaigns — helping travel, e-commerce, and business clients grow online.',
  },
  {
    id: 2,
    subheading: 'General',
    section_sort_order: 10,
    question: 'What makes Revlytics different from a typical agency?',
    answer: 'We combine technical development (websites, apps, API integrations) and marketing (SEO, PPC, social) under one roof, so the platform we build and the traffic we drive to it are always aligned.',
  },
  {
    id: 5,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'How much does a website cost?',
    answer: 'Pricing depends on the number of pages, design complexity, and functionality (e.g., booking engine vs informational site); we provide a custom quote after understanding your requirements.',
  },
  {
    id: 10,
    subheading: 'Travel API & GDS Integration',
    section_sort_order: 30,
    question: 'Which GDS and travel APIs can you integrate?',
    answer: 'Amadeus, Sabre, Travelpayouts, car rental APIs, and various white-label supplier APIs for flights, hotels, and cars.',
  },
  {
    id: 17,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'How long until SEO shows results?',
    answer: 'Most clients see measurable ranking and traffic improvements within 3–6 months, with results compounding as authority builds.',
  },
];

interface FaqGroup {
  subheading: string;
  items: FaqItem[];
}

const FaqAccordion = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(FALLBACK_FAQS);
  const [openKey, setOpenKey] = useState<string | null>('group-0-item-0');

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchFaqPage();
        if (isMounted && data && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.warn('Failed to load FAQ page data from D1:', err);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  // Group FAQs by subheading preserving sort order
  const groupedFaqs: FaqGroup[] = React.useMemo(() => {
    const groups: { [key: string]: FaqGroup } = {};
    const groupOrder: string[] = [];

    faqs.forEach((item) => {
      const heading = item.subheading || 'General';
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
      <div id="faq" className="tp-faq-area pb-130">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="tp-section-title reveal-text fs-72 mb-40">
                Explore Answers to<br />
                Our Most Asked Questions
              </h2>
            </div>
          </div>

          {groupedFaqs.map((group, groupIdx) => (
            <div className="row mb-50" key={group.subheading || groupIdx}>
              <div className="col-xxl-4 col-xl-3">
                <div className="tp-faq-subtitle mb-30 pt-10">
                  <span className="text-uppercase fw-500">{group.subheading}</span>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-9">
                <div className="tp-faq tp-service-details-faq-two tp-service-details-faq mb-30">
                  <div className="accordion" id={`accordionGroup${groupIdx}`}>
                    {group.items.map((item, itemIdx) => {
                      globalCounter += 1;
                      const itemKey = `group-${groupIdx}-item-${itemIdx}`;
                      const collapseId = `collapseGroup${groupIdx}Item${itemIdx}`;
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
                            data-bs-parent={`#accordionGroup${groupIdx}`}
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
