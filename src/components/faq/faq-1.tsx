import React, { useState } from 'react';

// Arrow Icon Component
const ArrowIcon = () => (
  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 6.36401C0.447715 6.36401 1.67492e-07 6.81173 1.19209e-07 7.36401C7.0927e-08 7.9163 0.447715 8.36401 1 8.36401L1 7.36401L1 6.36401ZM16.7071 8.07112C17.0976 7.6806 17.0976 7.04743 16.7071 6.65691L10.3431 0.292948C9.95262 -0.0975769 9.31946 -0.0975769 8.92893 0.292947C8.53841 0.683472 8.53841 1.31664 8.92893 1.70716L14.5858 7.36401L8.92893 13.0209C8.53841 13.4114 8.53841 14.0446 8.92893 14.4351C9.31946 14.8256 9.95262 14.8256 10.3431 14.4351L16.7071 8.07112ZM1 7.36401L1 8.36401L16 8.36401L16 7.36401L16 6.36402L1 6.36401L1 7.36401Z"
      fill="currentColor"
    />
  </svg>
);

// Structured FAQ Dataset
const FAQ_DATA = [
  {
    id: 'faq-1',
    question: 'What is Cunnet?',
    answer: 'Track your income and expenses easily with our app so you always know where your money is going and can make better financial decisions.',
  },
  {
    id: 'faq-2',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary depending on scope and requirements, but most design and development projects range between 2 to 6 weeks.',
  },
  {
    id: 'faq-3',
    question: 'What makes Cunnet different from other agencies?',
    answer: 'We focus on end-to-end strategy, rapid execution, and data-driven designs tailored specifically to scale modern online businesses.',
  },
  {
    id: 'faq-4',
    question: 'Can you handle both design and development?',
    answer: 'Yes! We provide full-stack services including brand strategy, UI/UX design, custom web development, and digital marketing.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer ongoing support after project delivery?',
    answer: 'Absolutely. We provide flexible maintenance, optimization, and dedicated post-launch support packages to ensure long-term success.',
  },
];

const Faq1 = () => {
  // Track open item index (default opens first item: 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="ca-faq-area pt-135 pb-145">
      <div className="container">
        <div className="row">
          {/* Left Column - Section Header & CTA */}
          <div className="col-lg-5">
            <div className="ca-faq-title-wrap mb-40 tp_fade_anim" data-delay=".3">
              <span className="ca-team-subtitle text-uppercase d-block mb-15">
                <span>[ </span>Our Faq<span> ]</span>
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
              <div className="accordion" id="accordionExample">
                {FAQ_DATA.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div className="tp-faq-item tp_fade_anim" data-delay=".3" key={item.id}>
                      <h2 className="accordion-header">
                        <button
                          className={`tp-faq-button ${!isOpen ? 'collapsed' : ''}`}
                          type="button"
                          onClick={() => toggleFaq(index)}
                          aria-expanded={isOpen}
                        >
                          {item.question}
                        </button>
                      </h2>
                      <div className={`tp-faq-collapse collapse ${isOpen ? 'show' : ''}`}>
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