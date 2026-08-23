import React, { useState, useEffect } from 'react';
import { fetchIndexFaqs, type FaqItem } from '../../services/api';

// Arrow Icon Component
const ArrowIcon = () => (
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6.36401C0.447715 6.36401 1.67492e-07 6.81173 1.19209e-07 7.36401C7.0927e-08 7.9163 0.447715 8.36401 1 8.36401L1 7.36401L1 6.36401ZM16.7071 8.07112C17.0976 7.6806 17.0976 7.04743 16.7071 6.65691L10.3431 0.292948C9.95262 -0.0975769 9.31946 -0.0975769 8.92893 0.292947C8.53841 0.683472 8.53841 1.31664 8.92893 1.70716L14.5858 7.36401L8.92893 13.0209C8.53841 13.4114 8.53841 14.0446 8.92893 14.4351C9.31946 14.8256 9.95262 14.8256 10.3431 14.4351L16.7071 8.07112ZM1 7.36401L1 8.36401L16 8.36401L16 7.36401L16 6.36402L1 6.36401L1 7.36401Z"
      fill="currentColor"
    />
  </svg>
);

const FALLBACK_FAQS: FaqItem[] = [
  {
    id: 1,
    question: 'What does Revlytics do?',
    answer: 'Revlytics is a digital marketing and travel-technology company. We build and grow websites, booking engines, and apps for travel businesses (airlines, OTAs, DMCs, hotels, car rentals) as well as e-commerce and service brands — covering web design, web development, API integrations (GDS/flight/hotel), mobile apps, and full-funnel digital marketing (SEO, PPC, social media).',
  },
  {
    id: 2,
    question: 'Which industries does Revlytics specialize in?',
    answer: 'While we serve e-commerce, hospitality, and general businesses, our core strength is travel: flight and hotel booking platforms, tour and DMC websites, car rental portals, and travel marketplaces — combined with the digital marketing needed to drive bookings.',
  },
  {
    id: 3,
    question: 'What services are included under one roof at Revlytics?',
    answer: 'Website design and development, custom web applications, GDS/travel API integration (Amadeus, Sabre, Travelpayouts, car rental APIs), mobile app development (Android/iOS), e-commerce development (Shopify/WooCommerce/custom), and digital marketing (SEO, PPC, social media, Amazon/Flipkart ads).',
  },
  {
    id: 4,
    question: 'How is Revlytics different from a regular web design or SEO agency?',
    answer: 'We combine engineering and marketing under one team. Instead of just designing a site or just running ads, we build the booking/e-commerce backend, integrate the APIs that power live pricing and availability, and then run the SEO/PPC/social campaigns that bring qualified traffic to convert on that backend.',
  },
  {
    id: 5,
    question: 'Do you work with startups as well as established travel companies?',
    answer: 'Yes. We work with early-stage travel and e-commerce startups that need an MVP website or app, as well as established agencies and DMCs that need to modernize, integrate new APIs, or scale their marketing.',
  },
];

const Faq1: React.FC = () => {
  // Track open item index (default opens first item: 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FaqItem[]>(FALLBACK_FAQS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function loadFaqs() {
      try {
        const data = await fetchIndexFaqs();
        if (isMounted && data && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.warn('Error fetching FAQs:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadFaqs();

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const subheading = faqs[0]?.subheading || 'Our Faq';

  return (
    <div className="ca-faq-area pt-135 pb-145">
      <div className="container">
        <div className="row">
          {/* Left Column - Section Header & CTA */}
          <div className="col-lg-5">
            <div className="ca-faq-title-wrap mb-40 tp_fade_anim" data-delay=".3">
              <span className="ca-team-subtitle text-uppercase d-block mb-15">
                <span>[ </span>{subheading}<span> ]</span>
              </span>
              <img className="mb-10" src="assets/img/faq/faq-thumb.png" alt="FAQ thumbnail" width={300} />
              <h2 className="ca-section-title mb-15">Have Questions</h2>
              <p className="tp-faq-dec mb-35">Let us know how we can assist you</p>
              <a href="contact-us-light.html" className="tp-btn tp-btn-xl tp-btn-grey tp-btn-switch-animation">
                <span className="d-flex align-items-center justify-content-center">
                  <span className="btn-text">Contact Me</span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                  <span className="btn-icon">
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column - Dynamic Accordion */}
          <div className="col-xl-7">
            <div className="tp-faq ml-115">
              <div className="accordion" id="indexFaqAccordion">
                {faqs.map((item, index) => {
                  const isOpen = openIndex === index;
                  const collapseId = `indexFaqCollapse${item.id || index}`;

                  return (
                    <div className="tp-faq-item tp_fade_anim" data-delay=".3" key={item.id || index}>
                      <h2 className="accordion-header">
                        <button
                          className={`tp-faq-button ${!isOpen ? 'collapsed' : ''}`}
                          type="button"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={isOpen}
                          aria-controls={collapseId}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className={`tp-faq-collapse collapse ${isOpen ? 'show' : ''}`}
                        data-bs-parent="#indexFaqAccordion"
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
      </div>
    </div>
  );
};

export default Faq1;