import React from 'react';

// ==================================================
// START: Hero
// ==================================================

const Hero = () => {
  return (
    <>{ /* FAQ Hero / Breadcrumb Area (from faq-light.html) */ }
    <div className="tp-breadcrumb-area about-us-spacing pb-100">
       <div className="container">
          <div className="tp-breadcrumb-border pb-20">
             <div className="row align-items-end">
                <div className="col-lg-9">
                   <div className="tp-tp-breadcrumb-main mb-30">
                      <span className="tp-breadcrumb-subtitle fw-600 text-uppercase mb-10 tp_fade_anim" data-delay=".3">Our Faq</span>
                      <h2 className="tp-breadcrumb-title tp-ff-sequel-bold-head tp_fade_anim" data-delay=".5">Multiplied<br /> By One Hundred</h2>
                   </div>
                </div>
                <div className="col-lg-3">
                   <div className="inner-service-banner-scroll text-lg-end smooth mb-30">
                      <a className="tp-ff-sequel-semi-bold text-uppercase tp-smooth" href="#faq">
                         scroll to explore
                         <span>
                            <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M14.75 0.75L7.75 7.75L0.75 0.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                         </span>
                      </a>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-breadcrumb-details-area-end */ }</>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
