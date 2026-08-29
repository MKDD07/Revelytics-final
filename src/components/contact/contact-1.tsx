import React, { useEffect, useRef } from 'react';
import { useForm, ValidationError } from '@formspree/react';

interface Contact1Props {
  /** Toggle map visibility on or off. Defaults to true. */
  showMap?: boolean;
}

// ==================================================
// START: Contact1 (Travel & Digital Agency Inquiries)
// Powered by Formspree (ID: xdeoknnq)
// ==================================================

const MORPH_10_STAGES = [
  // 1. Airplane
  'M150 20 L165 90 L270 130 L270 150 L165 130 L150 220 L190 250 L190 265 L150 250 L110 265 L110 250 L150 220 L135 130 L30 150 L30 130 L135 90 L150 20 Z',
  // 2. Location Pin
  'M150 30 C200 30 240 70 240 120 C240 190 150 280 150 280 C150 280 60 190 60 120 C60 70 100 30 150 30 Z M150 90 C130 90 115 105 115 125 C115 145 130 160 150 160 C170 160 185 145 185 125 C185 105 170 90 150 90 Z',
  // 3. Globe
  'M150 40 C205 40 250 85 250 140 C250 195 205 240 150 240 C95 240 50 195 50 140 C50 85 95 40 150 40 Z M50 140 L250 140 M150 40 C120 70 105 105 105 140 C105 175 120 210 150 240 C180 210 195 175 195 140 C195 105 180 70 150 40 Z',
  // 4. Compass
  'M150 50 C205 50 250 95 250 150 C250 205 205 250 150 250 C95 250 50 205 50 150 C50 95 95 50 150 50 Z M150 90 L175 150 L150 210 L125 150 Z',
  // 5. Suitcase
  'M110 90 L110 60 C110 50 118 42 128 42 L172 42 C182 42 190 50 190 60 L190 90 L240 90 C250 90 258 98 258 108 L258 240 C258 250 250 258 240 258 L60 258 C50 258 42 250 42 240 L42 108 C42 98 50 90 60 90 Z M128 60 L172 60 L172 90 L128 90 Z',
  // 6. Passport / Book
  'M70 30 L230 30 C240 30 248 38 248 48 L248 252 C248 262 240 270 230 270 L70 270 C60 270 52 262 52 252 L52 48 C52 38 60 30 70 30 Z M150 80 C175 80 195 100 195 125 C195 150 175 170 150 170 C125 170 105 150 105 125 C105 100 125 80 150 80 Z',
  // 7. Palm Tree
  'M150 280 L150 140 C150 140 100 130 80 90 C120 95 145 110 150 130 C150 100 130 70 90 55 C135 55 155 90 158 120 C168 95 195 75 235 75 C215 105 190 120 158 130 C158 150 158 280 158 280 Z',
  // 8. Sun
  'M150 90 C185 90 210 115 210 150 C210 185 185 210 150 210 C115 210 90 185 90 150 C90 115 115 90 150 90 Z M150 20 L150 55 M150 245 L150 280 M20 150 L55 150 M245 150 L280 150 M55 55 L78 78 M222 222 L245 245 M245 55 L222 78 M78 222 L55 245',
  // 9. Camera
  'M60 90 L110 90 L125 60 L175 60 L190 90 L240 90 C250 90 258 98 258 108 L258 230 C258 240 250 248 240 248 L60 248 C50 248 42 240 42 230 L42 108 C42 98 50 90 60 90 Z M150 105 C185 105 213 133 213 168 C213 203 185 231 150 231 C115 231 87 203 87 168 C87 133 115 105 150 105 Z',
  // 10. Anchor / Ship Wheel
  'M150 30 C165 30 175 40 175 55 C175 68 167 78 156 82 L156 110 L200 110 C200 90 215 75 235 75 C235 95 220 110 200 115 L200 150 C200 195 178 230 150 250 C122 230 100 195 100 150 L100 115 C80 110 65 95 65 75 C85 75 100 90 100 110 L144 110 L144 82 C133 78 125 68 125 55 C125 40 135 30 150 30 Z',
];

const Contact1: React.FC<Contact1Props> = ({ showMap = true }) => {
  const [state, handleSubmit] = useForm('xdeoknnq');
  const morphPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !morphPathRef.current) return;

    gsap.set(morphPathRef.current, { transformOrigin: '50% 50%' });
    const timeline = gsap.timeline({ repeat: -1 });

    MORPH_10_STAGES.forEach((_, idx) => {
      const nextPath = MORPH_10_STAGES[(idx + 1) % MORPH_10_STAGES.length];

      timeline
        .to({}, { duration: 1.8 })
        .to(morphPathRef.current, {
          scale: 0.15,
          opacity: 0,
          rotation: 30,
          duration: 0.4,
          ease: 'power2.in',
          onComplete: () => {
            if (morphPathRef.current) {
              morphPathRef.current.setAttribute('d', nextPath);
            }
          },
        })
        .set(morphPathRef.current, { rotation: -30 })
        .to(morphPathRef.current, {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.55,
          ease: 'back.out(1.7)',
        });
    });

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <>
      {/* Portfolio details 2 / Contact Hero */}
      <div className="tp-pd-2-ptb pt-40 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-pd-2-top pb-50 text-center">
                <div className="tp-pd-2-categories mb-10 tp_fade_anim" data-delay=".3">
                  <span><a href="#">Travel Digital Transformation</a></span>
                  <span>Direct Booking Growth</span>
                </div>
                {showMap ? (
                  <h1 className="tp-section-title fs-92 tp-ff-sequel-semi-bold tp_fade_anim" data-delay=".5">
                    Let&rsquo;s Build Your Next Destination Experience
                  </h1>
                ) : (
                  <h2 className="tp-section-title fs-92 tp-ff-sequel-semi-bold tp_fade_anim" data-delay=".5">
                    Let&rsquo;s Build Your Next Destination Experience
                  </h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="inner-service-banner-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10">
                <a className="tp-ff-sequel-semi-bold text-uppercase tp-smooth" href="#contact-section">
                  Scroll to Inquire
                  <span>
                    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.75 0.75L7.75 7.75L0.75 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="inner-service-banner-scroll smooth mb-10 text-sm-end">
                <span className="tp-ff-sequel-semi-bold text-uppercase">12+ Years Empowering Global Travel Brands</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map (Conditional Render) */}
      {showMap && (
        <div className="tp-contact-map-ptb p-relative">
          <div className="tp-contact-map-wrapper p-relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62208.02!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1745055504744!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Revlytics India Headquarters"
            />
          </div>
        </div>
      )}

      {/* Main Contact Area */}
      <div id="contact-section" className="tp-contact-area pt-160 pb-110">
        <div className="container">
          <div className="tp-contact-bg">
            <div className="row">
              <div className="col-md-5">
                <div className="tp-contact-info mb-30 pt-10">
                  <div className="mb-20">
                    <a className="tp-contact-tel" href="tel:+919910668605">+91 99106 68605</a>
                  </div>
                  <div className="mb-30">
                    <a className="tp-contact-mail" href="mailto:info@revlytics.in">info@revlytics.in</a>
                  </div>
                  <div className="tp-contact-address mb-30">
                    <h4>Gurugram, India</h4>
                    <span className="d-block text-muted">Gurugram &bull; Haryana &bull; India</span>
                  </div>

                  {/* Single Large 10-Stage Morphing Icon - No Background */}
                  <div
                    className="pure-morph-icon-wrap mt-30 d-none d-md-inline-flex"
                    style={{
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <svg
                      width="230"
                      height="230"
                      viewBox="0 0 300 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ overflow: 'visible', display: 'block' }}
                    >
                      <defs>
                        <linearGradient
                          id="contact-theme-10morph-grad"
                          x1="20"
                          y1="20"
                          x2="280"
                          y2="280"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#ff3c00" />
                          <stop offset="50%" stopColor="#fd5b0a" />
                          <stop offset="100%" stopColor="#cd4631" />
                        </linearGradient>
                      </defs>

                      <path
                        ref={morphPathRef}
                        d={MORPH_10_STAGES[0]}
                        fill="url(#contact-theme-10morph-grad)"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="col-lg-7">
                <div className="tp-contact-form-wrap ml-95 mb-30">
                  {state.succeeded ? (
                    <div className="p-4 card" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', borderRadius: '16px' }}>
                      <h4 style={{ color: '#16a34a' }} className="mb-2">Dhanyawad! Your Growth Inquiry is Received.</h4>
                      <p className="mb-0" style={{ color: '#1f2937' }}>Our senior digital growth strategists in India will review your goals and schedule a strategy consultation within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label htmlFor="name">Your Full Name *</label>
                            <input
                              id="name"
                              name="name"
                              required
                              type="text"
                              placeholder="e.g. Rahul Sharma"
                            />
                            <ValidationError prefix="Name" field="name" errors={state.errors} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label htmlFor="email">Work Email Address *</label>
                            <input
                              id="email"
                              name="email"
                              required
                              type="email"
                              placeholder="rahul@tatadigital.com"
                            />
                            <ValidationError prefix="Email" field="email" errors={state.errors} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label htmlFor="company">Brand / Enterprise / Company *</label>
                            <input
                              id="company"
                              name="company"
                              required
                              type="text"
                              placeholder="e.g. Reliance Retail / Taj Hotels / Zomato"
                            />
                            <ValidationError prefix="Company" field="company" errors={state.errors} />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label htmlFor="budget">Estimated Marketing Budget</label>
                            <input
                              id="budget"
                              name="budget"
                              type="text"
                              placeholder="e.g. ₹5 Lakh - ₹25 Lakh / Month"
                            />
                            <ValidationError prefix="Budget" field="budget" errors={state.errors} />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="tp-contact-form-input mb-20">
                            <label htmlFor="message">Tell Us About Your Digital Marketing Goals *</label>
                            <textarea
                              id="message"
                              name="message"
                              required
                              rows={4}
                              placeholder="Describe your revenue targets, performance ad campaigns (Meta / Google), SEO expansion, or brand scaling requirements in India & global markets..."
                            />
                            <ValidationError prefix="Message" field="message" errors={state.errors} />
                          </div>
                          <div className="tp-contact-form-btn">
                            <button
                              type="submit"
                              disabled={state.submitting}
                              className="tp-btn tp-btn-xxl tp-btn-red d-inline-flex align-items-center w-100 justify-content-center"
                            >
                              <span>
                                <span className="text-1">
                                  {state.submitting ? 'Submitting Inquiry...' : 'Schedule Strategy Consultation'}
                                </span>
                                <span className="text-2">
                                  {state.submitting ? 'Submitting Inquiry...' : 'Schedule Strategy Consultation'}
                                </span>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact1;