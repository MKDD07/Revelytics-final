import React from 'react';

// ==================================================
// START: Overview
// ==================================================

const Overview = () => {
  return (
    <>{ /* Service Overview Section (from service-details-light.html) */ }
    <div className="tp-service-overview-area pb-120">
       <div className="container">
          <div className="row">
             <div className="col-lg-12">
                <div className="tp-service-overview-top mb-50">
                   <h2 className="tp-section-title reveal-text fs-72 mb-30">Service Overview</h2>
                   <div className="tp-process-border tp-service-overview-border d-none d-lg-block">
                      <svg viewBox="0 0 1320 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M5 2.5L0 0.113249V5.88675L5 3.5V2.5ZM1315 3.5L1320 5.88675V0.113249L1315 2.5V3.5ZM4.5 3.5H1315.5V2.5H4.5V3.5Z" fill="currentColor" fillOpacity="0.1" />
                      </svg>
                   </div>
                </div>
             </div>
             <div className="col-lg-5">
                <div className="tp-service-details-content mb-40 mr-115">
                   <p className="tp-service-details-dec mb-45">Branding design is the process of creating a unique identity that visually and strategically represents a business. It includes logo design, color schemes, typography, and brand messaging to ensure consistency across all platforms.</p>
                   <h5 className="tp-service-details-title mb-30">Our Approach to Branding</h5>
                   <ul>
                      <li>
                         <i className="fa-regular fa-circle-check" />
                         <p>Discovery &amp; Research &ndash; Understanding your business, audience, and competition.</p>
                      </li>
                      <li>
                         <i className="fa-regular fa-circle-check" />
                         <p>Concept Development &ndash; Creating initial branding concepts and design ideas.</p>
                      </li>
                      <li>
                         <i className="fa-regular fa-circle-check" />
                         <p>Refinement &amp; Testing &ndash; Perfecting the visuals and ensuring they resonate with your audience.</p>
                      </li>
                      <li>
                         <i className="fa-regular fa-circle-check" />
                         <p>Final Implementation &ndash; Delivering all branding assets with a detailed className= guide.</p>
                      </li>
                   </ul>
                </div>
             </div>
             <div className="col-lg-7">
                <div className="tp-service-thumb mb-30">
                   <img className="w-100" src="assets/img/service/details/service.jpg" alt="" />
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-service-overview-area-end */ }</>
  );
};

export default Overview;

// ==================================================
// END: Overview
// ==================================================
