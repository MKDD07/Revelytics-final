import React from 'react';

// ==================================================
// START: Funfact
// ==================================================

const Funfact = () => {
  return (
    <>{ /* Fun Facts Section (from service-2-light.html) */ }
    <div className="tp-funfact-area pt-150 pb-165">
       <div className="container">
          <div className="row">
             <div className="col-lg-5">
                <div className="tp-funfact-title-wrap mb-30">
                   <span className="tp-section-subtitle">Fun Facts</span>
                   <h2 className="tp-section-title reveal-text tp-ff-sequel-semi-bold">Numbers that speak volumes</h2>
                </div>
             </div>
             <div className="col-lg-7">
                <div className="tp-funfact-content-wrap mt-75">
                   <div className="tp-funfact-content-dec mb-80 ml-25">
                      <p>Whether you need stunning visuals for your website<br />
                      captivating graphics for your marketing materials innovative<br />
                      UI/UX designs for your app our team of experts.</p>
                   </div>
                   <div className="tp-funfact-item-wrap">
                      <div className="tp-funfact-item d-flex align-items-center">
                         <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20"><span data-purecounter-duration="1" data-purecounter-end="120" className="purecounter">0</span>+</h2>
                         <div className="tp-funfact-info mb-20">
                            <span>[ Nice! ]</span>
                            <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Projects Completed</h5>
                         </div>
                      </div>
                      <div className="tp-funfact-item d-flex align-items-center">
                         <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20"><span data-purecounter-duration="1" data-purecounter-end="16" className="purecounter">0</span>+</h2>
                         <div className="tp-funfact-info mb-20">
                            <span>[ Holy Moly! ]</span>
                            <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Years of Experience</h5>
                         </div>
                      </div>
                      <div className="tp-funfact-item d-flex align-items-center">
                         <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20"><span data-purecounter-duration="1" data-purecounter-end="185" className="purecounter">0</span>%</h2>
                         <div className="tp-funfact-info mb-20">
                            <span>[ Ho Ho! ]</span>
                            <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">Growing Agency</h5>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-funfact-area-end */ }</>
  );
};

export default Funfact;

// ==================================================
// END: Funfact
// ==================================================
