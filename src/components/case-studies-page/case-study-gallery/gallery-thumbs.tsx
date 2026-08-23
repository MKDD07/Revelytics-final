import React from 'react';

// ==================================================
// START: GalleryThumbs
// ==================================================

const GalleryThumbs = () => {
  return (
    <>{ /* Case Study Gallery Large Thumbs (from portfolio-details-gallery-light.html) */ }
    <div className="tp-pd-2-thumb-ptb pb-20">
       <div className="container">
          <div className="row gx-60">
             <div className="col-lg-12">
                <div className="tp-pd-2-thumb-item tp-pd-2-thumb-item-2 scale-up-img mb-60">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/gallery/bg-2.jpg" alt="" />
                </div>
             </div>
             <div className="col-lg-6">
                <div className="tp-pd-2-thumb-item scale-up-img mb-60">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/gallery/bg-3.jpg" alt="" />
                </div>
             </div>
             <div className="col-lg-6">
                <div className="tp-pd-2-thumb-item scale-up-img mb-60">
                   <img data-speed=".8" className="img-cover scale-up" src="assets/img/portfolio/details/gallery/bg-4.jpg" alt="" />
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* portfolio details thumb end */ }</>
  );
};

export default GalleryThumbs;

// ==================================================
// END: GalleryThumbs
// ==================================================
