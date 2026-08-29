import React from 'react';

// ==================================================
// START: Footer1
// ==================================================

const Footer1 = () => {
  return (
    <>{ /* Footer Section */ }
    <footer>
       { /* footer area start */ }
       <div className="tp-footer-area mp-footer cs-footer pt-105" data-bg-color="#09090b">
          <div className="container">
             <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-5">
                   <div className="tp-footer-logo mb-25 tp_fade_anim" data-delay=".4">
                      <a href="index.html">
                         <img style={{ maxWidth: '170px', height: 'auto' }} src="assets/img/logo/logo-white.svg" alt="Revlytics" />
                      </a>
                   </div>
                   <p className="tp-footer-dec text-white mb-25 text-justify" style={{ maxWidth: '320px', fontSize: '14px', lineHeight: '1.7', opacity: 0.75 }}>
                      Empowering premier travel brands, luxury resorts, and global hospitality leaders with high-yield direct booking engines, data-driven performance marketing, and end-to-end digital transformation.
                   </p>
                   {/* Social Icon Logos - White, No Text */}
                   <div className="tp-footer-social-icons d-flex align-items-center mb-30" style={{ gap: '18px' }}>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.85, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="LinkedIn">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28Z" />
                         </svg>
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.85, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Instagram">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                         </svg>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.85, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="X (Twitter)">
                         <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                         </svg>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.85, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="YouTube">
                         <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                         </svg>
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.85, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} aria-label="Facebook">
                         <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                         </svg>
                      </a>
                   </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-7">
                   <div className="tp-footer-widget tp-footer-link cs-footer-widget-1 mb-30 tp_fade_anim" data-delay=".5">
                      <h5 className="tp-footer-subtitle text-white mb-25">Growth Solutions</h5>
                      <div className="tp-hero-social">
                         <a href="#">Direct Booking Engine</a>
                         <a href="#">Performance Marketing</a>
                         <a href="#">Hospitality Branding</a>
                         <a href="#">Travel Analytics</a>
                         <a href="#">Destination SEO</a>
                         <a href="#contact-section">Contact Strategists</a>
                      </div>
                   </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6">
                   <div className="tp-footer-widget cs-footer-widget-2 mb-30 tp_fade_anim" data-delay=".6">
                      <span className="tp-footer-dec text-white">Ready to scale your travel revenue?</span>
                      <h4 className="tp-footer-email tp-ff-sequel-roman text-white mb-10">
                         <a href="mailto:info@revlytics.in">info@revlytics.in</a>
                      </h4>
                      <p className="text-white mb-0" style={{ fontSize: '14px', opacity: 0.75 }}>
                         <a href="tel:+919910668605" style={{ color: 'inherit' }}>+91 99106 68605</a>
                         <br />
                         Gurugram, Haryana, India
                      </p>
                   </div>
                </div>
             </div>
             <div className="tp-footer-copyright-area tp-about-border mt-65 pt-30 pb-10">
                <div className="row align-items-center">
                   <div className="col-12">
                      <div className="tp-title-anim no-animrtion text-center fix pb-15 tp_fade_anim" data-delay=".4" data-fade-from="bottom" data-ease="bounce">
                         <h2 className="tp-title-anim-inner fs-72 cs-footer-bigtitle justify-content-center tp-ff-sequel-heavy-disp text-uppercase text-white">
                            <a className="tp-title-text fs-72" href="#contact-section">Let's Scale</a>
                         </h2>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
       { /* footer area end */ }
    </footer></>
  );
};

export default Footer1;

// ==================================================
// END: Footer1
// ==================================================
