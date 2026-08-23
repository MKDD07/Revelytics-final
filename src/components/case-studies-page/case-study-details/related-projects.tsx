import React from 'react';

// ==================================================
// START: RelatedProjects
// ==================================================

const RelatedProjects = () => {
  return (
    <>{ /* Case Study Related Projects Area (from portfolio-details-light.html) */ }
    <div className="tp-portfolio-area pb-110">
       <div className="container">
          <div className="row">
             <div className="col-12">
                <div className="mb-25">
                   <h2 className="tp-portfoliom-m-title reveal-text">Related Project</h2>
                </div>
             </div>
             <div className="col-lg-6">
                <div className="mg-portfolio-item anim-zoomin-wrap mb-40">
                   <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                      <a className="cursor-hide" href="portfolio-details-light.html">
                         <img className="w-100" src="assets/img/portfolio/portfolio-col-2/portfolio.jpg" alt="" />
                      </a>
                   </div>
                   <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                      <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                         <a href="portfolio-details-light.html" className="tp-title-text">Times One Hundred</a>
                      </h3>
                      <div className="cs-portfolio-tag">
                         <ul>
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Web development</a></li>
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
             <div className="col-lg-6">
                <div className="mg-portfolio-item anim-zoomin-wrap mb-40">
                   <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                      <a className="cursor-hide" href="portfolio-details-light.html">
                         <img className="w-100" src="assets/img/portfolio/portfolio-col-2/portfolio-2.jpg" alt="" />
                      </a>
                   </div>
                   <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                      <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                         <a href="portfolio-details-light.html" className="tp-title-text">Built For Success</a>
                      </h3>
                      <div className="cs-portfolio-tag">
                         <ul>
                            <li><a href="#">Branding</a></li>
                            <li><a href="#">Web Design</a></li>
                            <li><a href="#">Web development</a></li>
                         </ul>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-portfolio-area-end */ }</>
  );
};

export default RelatedProjects;

// ==================================================
// END: RelatedProjects
// ==================================================
