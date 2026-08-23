import React from 'react';

// ==================================================
// START: Hero
// ==================================================

const Hero = () => {
  return (
    <>{ /* Service Details Hero Section (from service-details-light.html) */ }
    <div className="tp-service-details-banner-area about-us-spacing pb-80">
       <div className="container">
          <div className="row">
             <div className="col-xl-2 col-lg-4">
                <div className="tp-service-details-hero-subtitle mb-20 tp_fade_anim" data-delay=".3">
                   <span className="text-uppercase fw-500">Web Design
                      <svg width="64" height="8" viewBox="0 0 64 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <rect y="3.5" width="62.5039" height="1" fill="currentColor" />
                         <path d="M59.5273 7.46366L62.9998 3.98183L59.5273 0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                   </span>
                </div>
             </div>
             <div className="col-xl-6 col-lg-8">
                <div className="tp-service-details-hero-title ml-115 tp_fade_anim" data-delay=".5">
                   <h2 className="tp-ff-sequel-bold-head">Services Capabilities</h2>
                </div>
             </div>
             <div className="col-xl-4 col-lg-6">
                <div className="ca-hero-service tp-service-details-hero-link ml-90 mt-90 tp_fade_anim" data-delay=".7">
                   <ul>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ API Development">+ API Development</span></a>
                      </li>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ WordPress">+ WordPress</span></a>
                      </li>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ Cloud Migration">+ Cloud Migration</span></a>
                      </li>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ Front End Development">+ Front End Development</span></a>
                      </li>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ JavaScript">+ JavaScript</span></a>
                      </li>
                      <li>
                         <a href="#"><span className="explore-text" data-text="+ Flutter Framework">+ Flutter Framework</span></a>
                      </li>
                   </ul>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-service-details-area-end */ }</>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
