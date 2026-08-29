import React from 'react';

// ==================================================
// START: Hero
// ==================================================

const Hero = () => {
  return (
    <>{ /* Blog Hero / Top Area (from blog-light.html) */ }
    <div className="tp-blog-grid-area tp-pd-2-ptb pt-40 pb-40">
       <div className="container">
          <div className="row">
             <div className="col-12">
                <div className="tp-pd-2-top tp-breadcrumb-border pb-15">
                   <h1 className="tp-section-title fs-72 tp_fade_anim mb-20" data-delay=".5">Inside Story Report</h1>
                   <div className="tp-pd-2-categories mb-10 tp_fade_anim" data-delay=".3">
                      <span><a href="/">Website</a></span>
                      <span>Blog</span>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* blog top area end */ }</>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
