import React from 'react';

// ==================================================
// START: Banner
// ==================================================

const Banner = () => {
  return (
    <>{ /* Case Study Image Showcase Banner (from portfolio-details-light.html) */ }
    <div className="tp-pd-2-area pb-110">
       <div className="container-fluid p-0">
          <div className="row gx-20">
             <div className="col-lg-12">
                <div className="tp-pd-2-banner mb-20 scale-up-img">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/main/thumb.jpg" alt="" />
                </div>
             </div>
             <div className="col-lg-3 col-md-6">
                <div className="tp-pd-2-thumb-item scale-up-img mb-20">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/main/thumb-2.jpg" alt="" />
                </div>
             </div>
             <div className="col-lg-6 col-md-6">
                <div className="tp-pd-2-thumb-item scale-up-img mb-20">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/main/thumb-3.jpg" alt="" />
                </div>
             </div>
             <div className="col-lg-3 col-md-6">
                <div className="tp-pd-2-thumb-item scale-up-img mb-20">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/main/thumb-4.jpg" alt="" />
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* portfolio details area end */ }</>
  );
};

export default Banner;

// ==================================================
// END: Banner
// ==================================================
