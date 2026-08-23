import React from 'react';

// ==================================================
// START: WhyChooseUs
// ==================================================

const WhyChooseUs = () => {
  return (
    <>{ /* Why Choose Us / Service FAQ 1 Section (from service-details-light.html) */ }
    <div className="tp-faq-area pb-130">
       <div className="container">
          <div className="row">
             <div className="col-xxl-5 col-xl-3">
                <div className="tp-faq-subtitle mb-30">
                   <span className="text-uppercase fw-500">Why Chose us</span>
                </div>
             </div>
             <div className="col-xxl-7 col-xl-9">
                <div className="tp-faq tp-service-details-faq-one tp-service-details-faq mb-30">
                   <h2 className="tp-section-title reveal-text fs-72 mb-30">At cunnet, we don&rsquo;t just<br />
                      build website or campaigns<br />
                      we craft purpose.</h2>
                   <div className="accordion" id="accordionExample">
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">01. Complete Brand Design</button>
                         </h2>
                         <div id="collapseOne" className="tp-faq-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="tp-faq-body">
                               <p>Branding design is the process of creating a unique identity that visually and<br />
                               strategically represents a business. It includes logo design, color schemes typography,<br />
                               and brand messaging to ensure consistency across all platforms.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">02. Logo Design</button>
                         </h2>
                         <div id="collapseTwo" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="tp-faq-body">
                               <p>Branding design is the process of creating a unique identity that visually and<br />
                               strategically represents a business. It includes logo design, color schemes typography,<br />
                               and brand messaging to ensure consistency across all platforms.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">03. Graphic Design</button>
                         </h2>
                         <div id="collapseThree" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="tp-faq-body">
                               <p>Branding design is the process of creating a unique identity that visually and<br />
                               strategically represents a business. It includes logo design, color schemes typography,<br />
                               and brand messaging to ensure consistency across all platforms.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">03. Infographic An other</button>
                         </h2>
                         <div id="collapseFour" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="tp-faq-body">
                               <p>Branding design is the process of creating a unique identity that visually and<br />
                               strategically represents a business. It includes logo design, color schemes typography,<br />
                               and brand messaging to ensure consistency across all platforms.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-faq-area-end */ }</>
  );
};

export default WhyChooseUs;

// ==================================================
// END: WhyChooseUs
// ==================================================
