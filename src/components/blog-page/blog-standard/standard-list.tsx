import React from 'react';

// ==================================================
// START: StandardList
// ==================================================

const StandardList = () => {
  return (
    <>{ /* Blog Standard Feed & Sidebar Area (from blog-standard-light.html) */ }
    <div className="tp-blog-standard-area pb-160">
       <div className="container">
          <div className="row">
             <div className="col-xl-8 col-lg-7">
                <div className="postbox-wrapper mb-40">
                   <article className="postbox-item">
                      <div className="postbox-thumb mb-20">
                         <a href="blog-details-light.html">
                            <img className="w-100" src="assets/img/blog/blog-standard/blog-s-1.jpg" alt="" />
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
                   <article className="postbox-item">
                      <div className="postbox-thumb postbox-thumb-overlay p-relative mb-20">
                         <a href="blog-details-light.html">
                            <img className="w-100" src="assets/img/blog/blog-standard/blog-s-2.jpg" alt="" />
                         </a>
                         <div className="postbox-play-btn z-index-1">
                            <a className="popup-video" href="https://www.youtube.com/watch?v=VCPGMjCW0is">
                               <span>
                                  <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="currentColor" />
                                  </svg>
                               </span>
                            </a>
                         </div>
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
                   <article className="postbox-item">
                      <div className="postbox-slider-thumb mb-20">
                         <div className="postbox-slider p-relative">
                            <div className="swiper-container postbox-slider-active fix">
                               <div className="swiper-wrapper">
                                  <div className="swiper-slide">
                                     <div className="postbox-slider-item">
                                        <img className="w-100" src="assets/img/blog/blog-standard/blog-s-3.jpg" alt="" />
                                     </div>
                                  </div>
                                  <div className="swiper-slide">
                                     <div className="postbox-slider-item">
                                        <img className="w-100" src="assets/img/blog/blog-standard/blog-s-2.jpg" alt="" />
                                     </div>
                                  </div>
                                  <div className="swiper-slide">
                                     <div className="postbox-slider-item">
                                        <img className="w-100" src="assets/img/blog/blog-standard/blog-s-4.jpg" alt="" />
                                     </div>
                                  </div>
                               </div>
                            </div>
                            <div className="postbox-arrow">
                               <button className="postbox-arrow-prev">
                                  <span>
                                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </button>
                               <button className="postbox-arrow-next">
                                  <span>
                                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </button>
                            </div>
                         </div>
                      </div>
                      <div className="postbox-content">
                         <span className="mp-blog-date mb-10 d-block"><span>By</span> Cunnet - 2024</span>
                         <h3 className="postbox-title mb-15 tp-ff-sequel-semi-bold"><a href="blog-details-light.html" className="common-underline">Our Creative Process for High-Impact Branding.</a></h3>
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
                   <article className="postbox-item">
                      <div className="postbox-thumb mb-20">
                         <a href="blog-details-light.html">
                            <img className="w-100" src="assets/img/blog/blog-standard/blog-s-4.jpg" alt="" />
                         </a>
                      </div>
                      <div className="postbox-content">
                         <span className="mp-blog-date mb-10 d-block"><span>By</span> Cunnet - 2024</span>
                         <h3 className="postbox-title mb-15 tp-ff-sequel-semi-bold"><a href="blog-details-light.html" className="common-underline">Top 5 Web Design Mistakes That Hurt</a></h3>
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
             </div>
             <div className="col-xxl-4 col-xl-4 col-lg-5">
                <div className="sidebar-blog-grid-wrap mb-40 ml-115">
                   <div className="sidebar-wrapper">
                      <div className="sidebar-widget mb-10">
                         <div className="sidebar-search">
                            <form action="#">
                               <div className="sidebar-search-input">
                                  <input type="text" placeholder="Search..." />
                                  <button type="submit">
                                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M18.9999 19L14.6499 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentcolor" strokeOpacity="0.8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                  </button>
                               </div>
                            </form>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <div className="sidebar-widget-author">
                            <div className="sidebar-widget-author-img d-flex align-items-center">
                               <img src="assets/img/blog/blog-standard/av-1.png" alt="" />
                               <div className="sidebar-widget-author-content">
                                  <h4 className="sidebar-widget-author-name mb-0">Kate Johnson</h4>
                                  <span>Digital Artist</span>
                               </div>
                            </div>
                            <div className="sidebar-widget-author-content">
                               <p>Crafting Digital Experiences <br /> with Purpose!</p>
                            </div>
                            <div className="sidebar-widget-author-social">
                               <a href="#">
                                  <span>
                                     <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.59416 7.41667C0.895758 7.41667 0.75 7.57015 0.75 8.30556V9.63889C0.75 10.3743 0.895757 10.5278 1.59416 10.5278H3.28247V15.8611C3.28247 16.5965 3.42823 16.75 4.12662 16.75H5.81494C6.51333 16.75 6.65909 16.5965 6.65909 15.8611V10.5278H8.55481C9.08449 10.5278 9.22097 10.4194 9.36649 9.88309L9.72827 8.54975C9.97754 7.63109 9.82394 7.41667 8.91659 7.41667H6.65909V5.19444C6.65909 4.70352 7.03703 4.30556 7.50325 4.30556H9.90584C10.6042 4.30556 10.75 4.15207 10.75 3.41667V1.63889C10.75 0.903481 10.6042 0.75 9.90584 0.75H7.50325C5.17217 0.75 3.28247 2.73985 3.28247 5.19444V7.41667H1.59416Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </a>
                               <a href="#">
                                  <span>
                                     <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.67227 0H0L6.72535 8.79151L0.430223 16.1665H3.33876L8.09997 10.5886L12.3277 16.1153H18L11.0793 7.06826L11.0915 7.08386L17.0504 0.102701H14.1418L9.71667 5.28701L5.67227 0ZM3.131 1.53968H4.89685L14.869 14.5755H13.1032L3.131 1.53968Z" fill="currentcolor" />
                                     </svg>
                                  </span>
                               </a>
                               <a href="#">
                                  <span>
                                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.9994 10.5256C17.2116 10.3786 16.4014 10.302 15.5746 10.302C11.025 10.302 6.97863 12.6212 4.39943 16.2214M15.45 3.53634C12.79 6.63763 8.79271 8.61014 4.32318 8.61014C3.17971 8.61014 2.06716 8.48103 1 8.23695M11.7254 17.9135C11.9384 16.8869 12.0503 15.8237 12.0503 14.7345C12.0503 9.39347 9.35944 4.67635 5.25026 1.84649M18 9.45632C18 14.1266 14.1944 17.9126 9.5 17.9126C4.80558 17.9126 1 14.1266 1 9.45632C1 4.78603 4.80558 1 9.5 1C14.1944 1 18 4.78603 18 9.45632Z" stroke="currentcolor" strokeWidth={1.5} strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </a>
                               <a href="#">
                                  <span>
                                     <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.2426 4.82562H14.2496M5.27195 1H13.8159C16.1752 1 18.0878 2.90279 18.0878 5.25V13.75C18.0878 16.0972 16.1752 18 13.8159 18H5.27195C2.91262 18 1 16.0972 1 13.75V5.25C1 2.90279 2.91262 1 5.27195 1ZM12.9615 8.96482C13.0669 9.67223 12.9455 10.3947 12.6144 11.0295C12.2833 11.6643 11.7595 12.179 11.1174 12.5005C10.4753 12.8221 9.74767 12.934 9.03796 12.8204C8.32825 12.7067 7.67263 12.3734 7.16433 11.8677C6.65603 11.362 6.32096 10.7098 6.20675 10.0037C6.09255 9.29764 6.20504 8.57373 6.52823 7.93494C6.85141 7.29615 7.36883 6.775 8.00688 6.44563C8.64494 6.11625 9.37115 5.99542 10.0822 6.10032C10.8075 6.20732 11.479 6.54356 11.9975 7.05938C12.516 7.5752 12.854 8.24324 12.9615 8.96482Z" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </a>
                            </div>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <h3 className="sidebar-widget-title">Categories</h3>
                         <div className="sidebar-widget-category">
                            <ul>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Articles
                                     <span>08</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Business
                                     <span>04</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Family &amp; Divorce
                                     <span>12</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Web Design
                                     <span>16</span>
                                  </a>
                               </li>
                            </ul>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <h3 className="sidebar-widget-title">Latest Posts</h3>
                         <div className="rc-post-wrap">
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-1.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Fueling ambition &amp; Achieving your goals</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-2.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Behind the scenes of creative processes</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-3.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Starting seo as your home business</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="sidebar-widget">
                         <h3 className="sidebar-widget-title">Tags</h3>
                         <div className="sidebar-widget-content">
                            <div className="tagcloud">
                               <a href="#">Creative</a>
                               <a href="#">Design Trends</a>
                               <a href="#">Development</a>
                               <a href="#">LifeclassName=</a>
                               <a href="#">Cunnet</a>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="col-lg-12">
                <div className="basic-pagination-wrap">
                   <div className="row">
                      <div className="col-xl-6">
                         <div className="basic-pagination mb-0">
                            <nav>
                               <ul>
                                  <li>
                                     <a href="blog-grid-with-sidebar.html">
                                        <i className="fa-regular fa-angle-left" />
                                     </a>
                                  </li>
                                  <li>
                                     <span className="current">1</span>
                                  </li>
                                  <li>
                                     <a href="blog-grid-with-sidebar.html">2</a>
                                  </li>
                                  <li>
                                     <a href="blog-grid-with-sidebar.html">3</a>
                                  </li>
                                  <li>
                                     <a href="blog-grid-with-sidebar.html">
                                        <i className="fa-regular fa-angle-right" />
                                     </a>
                                  </li>
                               </ul>
                            </nav>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* blog-standard-area-end */ }</>
  );
};

export default StandardList;

// ==================================================
// END: StandardList
// ==================================================
