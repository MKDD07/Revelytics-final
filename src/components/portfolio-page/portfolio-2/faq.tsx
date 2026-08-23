import React, { useState, useEffect } from 'react';
import { fetchFaqPage, type FaqItem } from '../../../services/api';

// ==================================================
// START: Faq
// ==================================================

const Faq = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openKey, setOpenKey] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const data = await fetchFaqPage();
        if (isMounted) {
          // Limit to first 5 items to match the layout size, or show all. 
          // We'll show all but flatten the groups since this layout doesn't use subheadings.
          setFaqs(data);
        }
      } catch (error) {
        console.error('Failed to load portfolio FAQs:', error);
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
    setOpenKey(openKey === index ? -1 : index);
  };

  return (
    <>{ /* Portfolio 2 FAQ Section (from portfolio-2-light.html) */ }
    <div id="faq" className="tp-faq-area pb-130">
       <div className="container">
          <div className="row">
             <div className="col-xxl-4 col-xl-3">
                <div className="tp-faq-subtitle mb-30 pt-10">
                   <span className="text-uppercase fw-500">what i do</span>
                </div>
             </div>
             <div className="col-xxl-8 col-xl-9">
                <div className="tp-faq tp-service-details-faq-two tp-service-details-faq mb-30">
                   <h2 className="tp-section-title reveal-text fs-72 mb-40">Explore Answers to<br />
                   Our Most Asked Questions</h2>
                   <div className="accordion" id="portfolioFaqAccordion">
                      {loading ? (
                        <div className="text-center py-5">
                          <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : faqs.length === 0 ? (
                        <p className="text-muted text-center py-5">No FAQ records found.</p>
                      ) : (
                        faqs.map((item, index) => {
                          const isOpen = openKey === index;
                          const collapseId = `portfolioFaqCollapse-${index}`;
                          const numStr = String(index + 1).padStart(2, '0');

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
                                  <span>{numStr}</span>
                                  {item.question}
                                </button>
                              </h2>
                              <div 
                                id={collapseId} 
                                className={`tp-faq-collapse collapse ${isOpen ? 'show' : ''}`}
                                data-bs-parent="#portfolioFaqAccordion"
                              >
                                <div className="tp-faq-body">
                                  <p>{item.answer}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-faq-area-end */ }</>
  );
};

export default Faq;

// ==================================================
// END: Faq
// ==================================================

