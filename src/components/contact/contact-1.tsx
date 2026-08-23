import React, { useState } from 'react';
import { getPexelsImage } from '../../utils';

interface Contact1Props {
  /** Toggle map visibility on or off. Defaults to true. */
  showMap?: boolean;
}

// ==================================================
// START: Contact1 (Travel Digital Agency Inquiries)
// ==================================================

const Contact1: React.FC<Contact1Props> = ({ showMap = true }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'Resort & Hotel Branding',
    budget: '$10k - $25k',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const authorImg = getPexelsImage('team', 0, { width: 100, height: 100 });

  return (
    <>
      {/* Portfolio details 2 / Contact Hero */}
      <div className="tp-pd-2-ptb pt-175 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-pd-2-top pb-50 text-center">
                <div className="tp-pd-2-categories mb-10 tp_fade_anim" data-delay=".3">
                  <span><a href="#">Travel Digital Transformation</a></span>
                  <span>Direct Booking Growth</span>
                </div>
                <h3 className="tp-section-title fs-92 tp-ff-sequel-semi-bold tp_fade_anim" data-delay=".5">
                  Let&rsquo;s Build Your Next Destination Experience
                </h3>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193596.26002818075!2d-74.1443121872927!3d40.69728463485858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1745055504744!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Revlytics Global Headquarters"
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
                <div className="tp-contact-author-wrap d-flex align-items-center mb-30">
                  <div className="tp-contact-author-thumb mr-15">
                    <img src={authorImg} alt="Lead Consultant" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover' }} />
                  </div>
                  <div className="tp-contact-author-content">
                    <h6>Elena Rostova</h6>
                    <span>VP of Travel Partnerships</span>
                  </div>
                </div>
                                <div className="tp-contact-info mb-30">
                  <div className="mb-20">
                    <a className="tp-contact-tel" href="tel:+18005557385">+1 (800) 555-REVLYTICS</a>
                  </div>
                  <div className="mb-30">
                    <a className="tp-contact-mail" href="mailto:destinations@revlytics.com">destinations@revlytics.com</a>
                  </div>
                  <div className="tp-contact-address mb-30">
                    <h4>Global Studios</h4>
                    <span className="d-block text-muted">New York &bull; Zurich &bull; Bali</span>
                  </div>
              </div>
              </div>



              <div className="col-lg-7">
                <div className="tp-contact-form-wrap ml-95 mb-30">
                  {submitted ? (
                    <div className="p-4 card" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e' }}>
                      <h4 style={{ color: '#22c55e' }} className="mb-2">Thank you! Your Travel Discovery Inquiry is Received.</h4>
                      <p className="text-white">Our travel digital strategy team will review your requirements and reach out within 24 hours.</p>
                      <button type="button" className="tp-btn mt-3" onClick={() => setSubmitted(false)}>Send Another Inquiry</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label>Your Name *</label>
                            <input
                              required
                              type="text"
                              placeholder="e.g. Alexander Wright"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label>Work Email *</label>
                            <input
                              required
                              type="email"
                              placeholder="alex@luxuryresorts.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label>Brand / Resort / Company</label>
                            <input
                              type="text"
                              placeholder="e.g. Azure Maldives Collection"
                              value={formData.company}
                              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="tp-contact-form-input mb-20">
                            <label>Estimated Project Budget</label>
                            <input
                              type="text"
                              placeholder="e.g. $15k - $50k"
                              value={formData.budget}
                              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="tp-contact-form-input mb-20">
                            <label>Tell Us About Your Travel Brand Goals *</label>
                            <textarea
                              required
                              rows={4}
                              placeholder="Describe your booking conversion goals, resort redesign, travel app or campaign..."
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                          </div>
                          <div className="tp-contact-form-btn">
                            <button type="submit" className="tp-btn tp-btn-xxl tp-btn-red d-inline-flex align-items-center w-100">
                              <span>
                                <span className="text-1">Submit Travel Inquiry</span>
                                <span className="text-2">Submit Travel Inquiry</span>
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