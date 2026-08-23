import React from 'react';

// ==================================================
// START: Testimonial1
// ==================================================

const Testimonial1 = () => {
  return (
    <>{ /* Testimonial Section 1 (from index-digital-light.html) */ }
    <div className="ca-testimonial-area pt-135 pb-155" style={{backgroundColor: "#09090b"}}>
       <div className="container">
          <div className="row">
             <div className="col-xl-5">
                <div className="ca-testimonial-title-wrap mb-30">
                   <div className="ca-testimonial-review mb-15">
                      <h3 className="ca-testimonial-ratings tp-ff-inter p-relative reveal-text">4.8 
                         <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.55951 0L10.5801 6.21885H17.119L11.829 10.0623L13.8496 16.2812L8.55951 12.4377L3.26944 16.2812L5.29007 10.0623L9.53674e-07 6.21885H6.53888L8.55951 0Z" fill="#F9A811" />
                         </svg>
                      </h3>
                      <span className="ca-testimonial-review-count">86+ reviews</span>
                   </div>
                   <h2 className="ca-section-title fs-52 text-white mb-115 reveal-text">Helping world-class<br /> company by creative<br /> design.</h2>
                   <div className="ca-testimonial-navigation">
                      <span className="ca-testimonial-arrow-prev"><i className="fa-solid fa-arrow-left" /></span>
                      <span className="ca-testimonial-arrow-next"><i className="fa-solid fa-arrow-right" /></span>
                   </div>
                </div>
             </div>
             <div className="col-xxl-6 col-xl-7">
                <div className="p-relative">
                   <span className="ca-testimonial-bg-transparent" />
                   <div className="ca-testimonial-slider-wrap p-relative mb-30">
                      <span className="ca-testimonial-pagination" />
                      <div className="swiper ca-testimonial-slider-active">
                         <div className="swiper-wrapper">
                            <div className="swiper-slide">
                               <div className="ca-testimonial-item text-center">
                                  <span className="ca-testimonial-reviewed d-block">reviewed On</span>
                                  <img className="mb-30" src="assets/img/testimonial/envato-logo.png" alt="" />
                                  <p className="ca-testimonial-comment mb-30">&ldquo; It uses a directory of over 200 latin words combine
                                     a half of model sentence structures. All generations
                                     on the internet trends to repeat predefined chunks
                                     as nessessary to make this file. &rdquo;</p>
                                  <div className="ca-testimonial-author-name">
                                     <b>Christian B.</b>
                                     <span className="d-block">Mid-Level Developer</span>
                                  </div>
                               </div>
                            </div>
                            <div className="swiper-slide">
                               <div className="ca-testimonial-item text-center">
                                  <span className="ca-testimonial-reviewed d-block">reviewed On</span>
                                  <img className="mb-30" src="assets/img/testimonial/envato-logo.png" alt="" />
                                  <p className="ca-testimonial-comment mb-30">&ldquo; It uses a directory of over 200 latin words combine
                                     a half of model sentence structures. All generations
                                     on the internet trends to repeat predefined chunks
                                     as nessessary to make this file. &rdquo;</p>
                                  <div className="ca-testimonial-author-name">
                                     <b>Christian B.</b>
                                     <span className="d-block">Mid-Level Developer</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* ca-testimonial-area-end */ }</>
  );
};

export default Testimonial1;

// ==================================================
// END: Testimonial1
// ==================================================
