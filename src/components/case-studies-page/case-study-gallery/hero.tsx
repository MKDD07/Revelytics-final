import React from 'react';

// ==================================================
// START: Hero
// ==================================================

const Hero = () => {
  return (
    <>{ /* Case Study Gallery Hero Area (from portfolio-details-gallery-light.html) */ }
    <div className="tp-pd-2-ptb pt-40 pb-40">
       <div className="container">
          <div className="row">
             <div className="col-12">
                <div className="tp-pd-2-top pb-50 text-center">
                   <div className="tp-pd-2-categories mb-10 tp_fade_anim" data-delay=".3">
                      <span><a href="index.html">Website</a></span>
                      <span>Envato Market</span>
                   </div>
                   <h3 className="tp-pd-2-title tp-ff-sequel-bold-head tp_fade_anim" data-delay=".5">Olivia Rivers</h3>
                </div>
             </div>
             <div className="col-lg-3">
                <div className="tp-pd-2-bottom-item text-center mb-20">
                   <span>Role</span>
                   <h6>Envato Market</h6>
                </div>
             </div>
             <div className="col-lg-3">
                <div className="tp-pd-2-bottom-item text-center mb-20">
                   <span>Duration</span>
                   <h6>UX, UI Design, Development</h6>
                </div>
             </div>
             <div className="col-lg-3">
                <div className="tp-pd-2-bottom-item text-center mb-20">
                   <span>Duration</span>
                   <h6>8 March 2025</h6>
                </div>
             </div>
             <div className="col-lg-3">
                <div className="tp-pd-2-bottom-item text-center mb-20">
                   <span>Designer</span>
                   <h6>ThemePure</h6>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* portfolio details 2 area end */ }</>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
