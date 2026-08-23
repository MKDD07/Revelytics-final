import React from 'react';

// ==================================================
// START: ShowcaseMasonry
// ==================================================

const ShowcaseMasonry = () => {
  return (
    <>{ /* portfolio area start */ }
                <div className="tp-portfolio-inner-ptb tp-animate-tab tp-portfolio-inner-tab-2 pb-75">
                   <div className="container">
                      <div className="row">
                         <div className="col-xxl-4 col-xl-3">
                            <div className="tp-portfolio-inner-tab-wrap mb-25">
                               <nav>
                                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                     <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Work</button>
                                     <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Web Design</button>
                                     <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Motion Design</button>
                                     <button className="nav-link" id="nav-four-tab" data-bs-toggle="tab" data-bs-target="#nav-four" type="button" role="tab" aria-controls="nav-four" aria-selected="false">AI Tools</button>
                                  </div>
                               </nav>
                            </div>
                         </div>
                         <div className="col-xxl-8 col-xl-9">
                            <div className="tp-portfolio-tab-content-wrap">
                               <div className="tab-content p-relative" id="nav-tabContent">
                                  <div className="tab-pane show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}>
                                     <div className="row gx-60">
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-2.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Trust In Time</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
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
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Light The Way</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Path To Victory</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Stronger Every Day</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}>
                                     <div className="row gx-60">
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Trust In Time</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
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
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-2.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Light The Way</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Path To Victory</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Stronger Every Day</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}>
                                     <div className="row gx-60">
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Light The Way</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Path To Victory</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-2.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Trust In Time</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
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
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Stronger Every Day</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                                  <div className="tab-pane" id="nav-four" role="tabpanel" aria-labelledby="nav-four-tab" tabIndex={0}>
                                     <div className="row gx-60">
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-7.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-8.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Stronger Every Day</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-2.jpg" alt="" />
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
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-3.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Trust In Time</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web development</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-4.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Future In Focus</a>
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
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-5.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Light The Way</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
                                                       <li><a href="#">Web Design</a></li>
                                                    </ul>
                                                 </div>
                                              </div>
                                           </div>
                                        </div>
                                        <div className="col-lg-6">
                                           <div className="mg-portfolio-item anim-zoomin-wrap mb-55">
                                              <div className="mg-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                                                 <a className="cursor-hide" href="portfolio-details-light.html">
                                                    <img className="w-100" src="assets/img/portfolio/portfolio-col-3/portfolio-6.jpg" alt="" />
                                                 </a>
                                              </div>
                                              <div className="mg-portfolio-content cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                                                 <h3 className="cs-portfolio-title tp-title-anim fix mr-20 tp-ff-sequel-semi-bold">
                                                    <a href="portfolio-details-light.html" className="tp-title-text">Path To Victory</a>
                                                 </h3>
                                                 <div className="cs-portfolio-tag">
                                                    <ul>
                                                       <li><a href="#">Branding</a></li>
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

export default ShowcaseMasonry;

// ==================================================
// END: ShowcaseMasonry
// ==================================================
