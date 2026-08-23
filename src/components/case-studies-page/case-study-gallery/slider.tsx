import React from 'react';

// ==================================================
// START: Slider
// ==================================================

const Slider = () => {
  return (
    <>{ /* Case Study Gallery Thumb Slider Area (from portfolio-details-gallery-light.html) */ }
    <div className="tp-pd-2-slider-ptb tp-item-anime-area pb-140">
       <div className="container-fluid">
          <div className="row">
             <div className="col-lg-12">
                <div className="tp-pd-2-slider-wrapper">
                   <div className="tp-pd-2-active swiper">
                      <div className="swiper-wrapper">
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio.jpg" alt="" />
                            </div>
                         </div>
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio-2.jpg" alt="" />
                            </div>
                         </div>
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio-3.jpg" alt="" />
                            </div>
                         </div>
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio.jpg" alt="" />
                            </div>
                         </div>
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio-2.jpg" alt="" />
                            </div>
                         </div>
                         <div className="swiper-slide">
                            <div className="tp-pd-2-slider-thumb tp-item-anime marque">
                               <img src="assets/img/portfolio/details/gallery/portfolio-3.jpg" alt="" />
                            </div>
                         </div>
                      </div>
                      <div className="tp-pd-2-dot text-center" />
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* portfolio details thumb slider */ }</>
  );
};

export default Slider;

// ==================================================
// END: Slider
// ==================================================
