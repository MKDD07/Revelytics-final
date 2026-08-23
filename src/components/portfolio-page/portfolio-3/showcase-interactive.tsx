import React from 'react';

// ==================================================
// START: ShowcaseInteractive
// ==================================================

const ShowcaseInteractive = () => {
  return (
    <>{ /* portfolio area start */ }
                <div className="tp-portfolio-inner-ptb tp-animate-tab tp-portfolio-inner-tab-3 pb-120">
                   <div className="container">
                      <div className="row">
                         <div className="col-12">
                            <div className="tp-portfolio-tab-content-wrap">
                               <div className="tp-portfolio-inner-tab-wrap mb-40">
                                  <nav>
                                     <div className="nav nav-tabs justify-content-center" id="nav-tab" role="tablist">
                                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All</button>
                                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Design</button>
                                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Motion</button>
                                        <button className="nav-link" id="nav-four-tab" data-bs-toggle="tab" data-bs-target="#nav-four" type="button" role="tab" aria-controls="nav-four" aria-selected="false">Web dev</button>
                                        <button className="nav-link" id="nav-five-tab" data-bs-toggle="tab" data-bs-target="#nav-five" type="button" role="tab" aria-controls="nav-five" aria-selected="false">AI Tools</button>
                                     </div>
                                  </nav>
                               </div>
                               <div className="tab-content p-relative" id="nav-tabContent">
                                  <div className="tab-pane show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                                     <div className="row gx-40">
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-2.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Marketly</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shopline</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">DropMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">NeoMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
                                     <div className="row gx-40">
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Marketly</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shopline</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-2.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">DropMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">NeoMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>
                                     <div className="row gx-40">
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-2.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Marketly</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shopline</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">DropMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">NeoMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab" tabIndex={0}>
                                     <div className="row gx-40">
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">DropMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">NeoMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-2.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Marketly</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shopline</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-five" role="tabpanel" aria-labelledby="nav-five-tab" tabIndex={0}>
                                     <div className="row gx-40">
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-2.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Marketly</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shopline</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Shophoria</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">Storefront</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">DropMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Web Design</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-xl-6">
                                           <div className="tp-title-anim cs-portfolio-item anim-zoomin-wrap mb-40">
                                              <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-gallery-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/cs/inner/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                                                    <a href="portfolio-details-gallery-light.html" className="common-underline tp-title-text">NeoMarket</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
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
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
                { /* portfolio area end */ }</>
  );
};

export default ShowcaseInteractive;

// ==================================================
// END: ShowcaseInteractive
// ==================================================
