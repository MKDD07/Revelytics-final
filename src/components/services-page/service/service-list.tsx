import React from 'react';

// ==================================================
// START: ServiceList
// ==================================================

const ServiceList = () => {
  return (
    <>{ /* Service List (from service-light.html) */ }
    <div id="service" className="tp-service-area tp-panel-pin-area tp-bg-grey pt-145 pb-90">
       <div className="container">
          <div className="row align-items-end">
             <div className="col-xxl-11 col-xl-12">
                <div className="tp-about-title-wrap mb-30">
                   <h2 className="tp-section-title reveal-text">At cunnet, we don&rsquo;t just build website<br />
                      or campaigns we craft purpose-driven
                      digital journeys.
                   </h2>
                </div>
             </div>
          </div>
          <div className="tp-about-border mt-20 pt-40">
             <div className="row">
                <div className="col-lg-4 mb-40">
                   <div className="tp-service-content mr-60 mt-20">
                      <div className="tp-service-sales-wrap tp-panel-pin fix p-relative">
                         <div className="tp-service-img-wrapper image-container">
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service.jpg" alt="Service Image" />
                            </div>
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service-2.jpg" alt="Service Image" />
                            </div>
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service-3.jpg" alt="Service Image" />
                            </div>
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service-4.jpg" alt="Service Image" />
                            </div>
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service-4.jpg" alt="Service Image" />
                            </div>
                            <div className="hover-image">
                               <img className="thumb" src="assets/img/service/service-4.jpg" alt="Service Image" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="col-lg-8 mb-40">
                   <div className="tp-service-list-wrap ml-60">
                      <div className="tp-service-item service-item mb-5 active" data-img="assets/img/service/service.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Branding
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                      <div className="tp-service-item service-item mb-5" data-img="assets/img/service/service-2.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Infodesign
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                      <div className="tp-service-item service-item mb-5" data-img="assets/img/service/service-3.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Digital
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                      <div className="tp-service-item service-item mb-5" data-img="assets/img/service/service-4.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Editorial
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                      <div className="tp-service-item service-item mb-5" data-img="assets/img/service/service-4.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Raum
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                      <div className="tp-service-item service-item mb-5" data-img="assets/img/service/service-4.jpg">
                         <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block">
                            <a href="service-details-light.html">Champagne
                               <span className="tp-service-icon d-inline-block">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M1.17157 41.1716C-0.390524 42.7337 -0.390524 45.2663 1.17157 46.8284C2.73367 48.3905 5.26633 48.3905 6.82843 46.8284L4 44L1.17157 41.1716ZM48 4C48 1.79086 46.2091 -2.03428e-06 44 -3.48405e-07L8 1.57357e-07C5.79087 -1.19134e-06 4.00001 1.79086 4.00001 4C4.00001 6.20914 5.79087 8 8.00001 8L40 8L40 40C40 42.2091 41.7909 44 44 44C46.2091 44 48 42.2091 48 40L48 4ZM4 44L6.82843 46.8284L46.8284 6.82843L44 4L41.1716 1.17157L1.17157 41.1716L4 44Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </h2>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-service-area-end */ }</>
  );
};

export default ServiceList;

// ==================================================
// END: ServiceList
// ==================================================
