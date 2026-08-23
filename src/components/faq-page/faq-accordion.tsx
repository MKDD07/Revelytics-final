import React, { useState, useEffect } from 'react';
import { fetchFaqPage, type FaqItem } from '../../services/api';

// ==================================================
// START: FaqAccordion (Dedicated FAQ Page)
// Dynamic Component connected with D1 table: faq_page
// ==================================================

export const ALL_FAQ_PAGE_DATA: FaqItem[] = [
  // 1. General
  {
    id: 1,
    subheading: 'General',
    section_sort_order: 10,
    question: 'Who is Revlytics?',
    answer: 'Revlytics is a digital marketing and travel-technology company that designs websites and apps, integrates travel APIs/GDS systems, and runs digital marketing campaigns — helping travel, e-commerce, and business clients grow online.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 2,
    subheading: 'General',
    section_sort_order: 10,
    question: 'What makes Revlytics different from a typical agency?',
    answer: 'We combine technical development (websites, apps, API integrations) and marketing (SEO, PPC, social) under one roof, so the platform we build and the traffic we drive to it are always aligned.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 3,
    subheading: 'General',
    section_sort_order: 10,
    question: 'Which locations/markets do you serve?',
    answer: 'We work with clients across India and internationally, including travel businesses in the US, Canada, and other regions, delivering projects remotely with regular calls and updates.',
    question_sort_order: 30,
    is_active: 1,
  },
  {
    id: 4,
    subheading: 'General',
    section_sort_order: 10,
    question: 'How do I request a quote?',
    answer: 'Contact us via the website form, email, or WhatsApp with your project details, and we\'ll schedule a free consultation before sending a detailed proposal.',
    question_sort_order: 40,
    is_active: 1,
  },

  // 2. Website & App Development
  {
    id: 5,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'How much does a website cost?',
    answer: 'Pricing depends on the number of pages, design complexity, and functionality (e.g., booking engine vs informational site); we provide a custom quote after understanding your requirements.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 6,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'Do you build booking engines for flights, hotels, and tours?',
    answer: 'Yes, this is one of our core specialties, including live pricing via GDS/API integration, search filters, and secure checkout.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 7,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'Can you redesign my existing website instead of building from scratch?',
    answer: 'Yes, we can redesign and rebuild your existing site while preserving SEO value and improving speed, design, and conversions.',
    question_sort_order: 30,
    is_active: 1,
  },
  {
    id: 8,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'Do you develop mobile apps as well as websites?',
    answer: 'Yes, we build Android and iOS apps that can share the same backend and booking logic as your website.',
    question_sort_order: 40,
    is_active: 1,
  },
  {
    id: 9,
    subheading: 'Website & App Development',
    section_sort_order: 20,
    question: 'What CMS or platform will my website be built on?',
    answer: 'We typically use WordPress for content-driven sites and custom code for complex booking/e-commerce platforms, recommending the best fit for your goals and budget.',
    question_sort_order: 50,
    is_active: 1,
  },

  // 3. Travel API & GDS Integration
  {
    id: 10,
    subheading: 'Travel API & GDS Integration',
    section_sort_order: 30,
    question: 'Which GDS and travel APIs can you integrate?',
    answer: 'Amadeus, Sabre, Travelpayouts, car rental APIs, and various white-label supplier APIs for flights, hotels, and cars.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 11,
    subheading: 'Travel API & GDS Integration',
    section_sort_order: 30,
    question: 'Why do travel businesses need GDS integration?',
    answer: 'It gives your platform real-time flight/hotel availability and pricing, letting customers search and book directly instead of relying on manual quotes or third-party sites.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 12,
    subheading: 'Travel API & GDS Integration',
    section_sort_order: 30,
    question: 'Can you combine multiple suppliers into one search results page?',
    answer: 'Yes, we build engines that query several APIs at once and merge the results, similar to a meta-search experience.',
    question_sort_order: 30,
    is_active: 1,
  },
  {
    id: 13,
    subheading: 'Travel API & GDS Integration',
    section_sort_order: 30,
    question: 'How long does API integration usually take?',
    answer: 'Typically 4–8 weeks depending on the number of APIs, business logic (markup/commission rules), and the testing/certification process required by the provider.',
    question_sort_order: 40,
    is_active: 1,
  },

  // 4. E-Commerce
  {
    id: 14,
    subheading: 'E-Commerce',
    section_sort_order: 40,
    question: 'Do you build Shopify or WooCommerce stores?',
    answer: 'Yes, we build and customize stores on both platforms, and also develop fully custom e-commerce solutions for larger catalogs.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 15,
    subheading: 'E-Commerce',
    section_sort_order: 40,
    question: 'Can you build a multi-vendor marketplace?',
    answer: 'Yes, including vendor onboarding, dashboards, commissions, and order management.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 16,
    subheading: 'E-Commerce',
    section_sort_order: 40,
    question: 'Will my store be optimized for mobile shopping?',
    answer: 'Yes, every store is built mobile-first with a streamlined, fast checkout flow.',
    question_sort_order: 30,
    is_active: 1,
  },

  // 5. Digital Marketing (SEO, PPC, Social)
  {
    id: 17,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'How long until SEO shows results?',
    answer: 'Most clients see measurable ranking and traffic improvements within 3–6 months, with results compounding as authority builds.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 18,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'Do you run PPC/Google Ads campaigns for travel bookings?',
    answer: 'Yes, we run PPC campaigns optimized for cost-per-booking, not just clicks, specifically for flight, hotel, and tour searches.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 19,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'Can you manage our social media accounts and content?',
    answer: 'Yes, including content planning, creative, posting, and paid social campaigns.',
    question_sort_order: 30,
    is_active: 1,
  },
  {
    id: 20,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'Do you offer Amazon/Flipkart marketplace advertising?',
    answer: 'Yes, we manage marketplace ad campaigns to boost product visibility and sales.',
    question_sort_order: 40,
    is_active: 1,
  },
  {
    id: 21,
    subheading: 'Digital Marketing (SEO, PPC, Social)',
    section_sort_order: 50,
    question: 'Is there a minimum contract length for marketing services?',
    answer: 'We typically recommend a 3–6 month minimum for SEO to allow enough time to show measurable results; PPC and social can start on shorter monthly terms.',
    question_sort_order: 50,
    is_active: 1,
  },

  // 6. Support & Pricing
  {
    id: 22,
    subheading: 'Support & Pricing',
    section_sort_order: 60,
    question: 'Do you offer post-launch maintenance and support?',
    answer: 'Yes, we offer maintenance packages covering bug fixes, security updates, API monitoring, and content updates after your project goes live.',
    question_sort_order: 10,
    is_active: 1,
  },
  {
    id: 23,
    subheading: 'Support & Pricing',
    section_sort_order: 60,
    question: 'What payment terms do you follow?',
    answer: 'Typically a milestone-based payment schedule (e.g., advance, mid-project, and final payment on delivery); exact terms are shared in the proposal.',
    question_sort_order: 20,
    is_active: 1,
  },
  {
    id: 24,
    subheading: 'Support & Pricing',
    section_sort_order: 60,
    question: 'Can I request ongoing feature additions after launch?',
    answer: 'Yes, we support ongoing development as a retainer or per-project basis for new features, integrations, or redesigns.',
    question_sort_order: 30,
    is_active: 1,
  },
];

export interface FaqAccordionProps {
  initialFaqs?: FaqItem[];
}

interface FaqGroup {
  subheading: string;
  items: FaqItem[];
}

const FaqAccordion: React.FC<FaqAccordionProps> = ({ initialFaqs = ALL_FAQ_PAGE_DATA }) => {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
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
