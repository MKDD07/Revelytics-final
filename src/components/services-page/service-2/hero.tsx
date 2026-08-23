import React from 'react';

// ==================================================
// START: Hero
// ==================================================

const Hero = () => {
  return (
    <>{ /* Service 2 Hero Area (from service-2-light.html) */ }
    <div className="inner-service-banner-area about-us-spacing pb-125">
       <div className="container">
          <div className="row">
             <div className="col-12">
                <div className="inner-service-banner-title-wrap text-center">
                   <h2 className="inner-service-2-title tp-ff-sequel-bold-head text-uppercase tp-char-animation">Services &amp; Capabilities</h2>
                </div>
             </div>
          </div>
       </div>
    </div>
    <div className="inner-service-banner-bottom">
       <div className="container">
          <div className="row">
             <div className="col-md-4 col-sm-6">
                <div className="inner-service-banner-scroll smooth mb-10">
                   <a className="tp-ff-sequel-semi-bold text-uppercase tp-smooth" href="#about">
                      scroll to explore
                      <span>
                         <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.75 0.75L7.75 7.75L0.75 0.75" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                         </svg>
                      </span>
                   </a>
                </div>
             </div>
             <div className="col-md-4 col-sm-6">
                <div className="inner-service-banner-scroll smooth mb-10 text-sm-center">
                   <span className="tp-ff-sequel-semi-bold text-uppercase">(&copy;2021&nbsp;&mdash;&nbsp;2025)</span>
                </div>
             </div>
             <div className="col-md-4 col-sm-6">
                <div className="inner-service-banner-scroll smooth mb-10 text-md-end">
                   <span className="tp-ff-sequel-semi-bold text-uppercase">10 years of experience</span>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* service-us-area-end */ }</>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
