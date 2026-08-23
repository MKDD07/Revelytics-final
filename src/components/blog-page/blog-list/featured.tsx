import React from 'react';

// ==================================================
// START: Featured
// ==================================================

const Featured = () => {
  return (
    <>{ /* Blog List Featured Posts & Category Tags (from blog-list-light.html) */ }
    <div className="tp-blog-area pt-100">
       <div className="container">
          <div className="row gx-50">
             <div className="col-lg-6">
                <article className="postbox-item mb-30 tp_fade_anim" data-delay=".3">
                   <div className="postbox-thumb mb-20">
                      <a href="blog-details-light.html">
                         <img className="w-100" src="assets/img/blog/list/thumb.jpg" alt="" />
                      </a>
                   </div>
                   <div className="postbox-content">
                      <span className="mp-blog-date mb-10 d-block"><span>By</span> Cunnet - 2024</span>
                      <h3 className="postbox-title mb-15 tp-ff-sequel-semi-bold"><a href="blog-details-light.html" className="common-underline">Your marketplace dreams we shape them.</a></h3>
                      <p className="mb-30">Solfeggio Obscuro is a music event shaped by the pulse of the underground, where rhythm moves the<br />
                      body and sound opens the mind. Obscuro suggests.</p>
                      <a className="tp-btn tp-btn-grey" href="blog-details-light.html">
                         <span>
                            <span className="text-1">View More</span>
                            <span className="text-2">View More</span>
                         </span>
                         <i>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                         </i>
                      </a>
                   </div>
                </article>
             </div>
             <div className="col-lg-6">
                <article className="postbox-item mb-30 tp_fade_anim" data-delay=".5">
                   <div className="postbox-thumb mb-20">
                      <a href="blog-details-light.html">
                         <img className="w-100" src="assets/img/blog/list/thumb-2.jpg" alt="" />
                      </a>
                   </div>
                   <div className="postbox-content">
                      <span className="mp-blog-date mb-10 d-block"><span>By</span> Cunnet - 2024</span>
                      <h3 className="postbox-title mb-15 tp-ff-sequel-semi-bold"><a href="blog-details-light.html" className="common-underline">Mastering customer journeys with marketing</a></h3>
                      <p className="mb-30">Solfeggio Obscuro is a music event shaped by the pulse of the underground, where rhythm moves the<br />
                      body and sound opens the mind. Obscuro suggests.</p>
                      <a className="tp-btn tp-btn-grey" href="blog-details-light.html">
                         <span>
                            <span className="text-1">View More</span>
                            <span className="text-2">View More</span>
                         </span>
                         <i>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                               <path d="M1 11L11 1M11 1V11M11 1H1" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                         </i>
                      </a>
                   </div>
                </article>
             </div>
             <div className="col-12">
                <div className="tp-blog-tag tp-blog-tag-2 mb-80 mt-90">
                   <a href="#">All News</a>
                   <a href="#">Design</a>
                   <a href="#">Motion design</a>
                   <a href="#">Branding</a>
                   <a href="#">AI Tools</a>
                   <a href="#">UX</a>
                   <a href="#">Midjourney</a>
                   <a href="#">Web experience</a>
                   <a href="#">3d modeling</a>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* blog-area-end */ }</>
  );
};

export default Featured;

// ==================================================
// END: Featured
// ==================================================
