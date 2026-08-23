import React from 'react';

// ==================================================
// START: Offcanvas1
// ==================================================

const Offcanvas1 = () => {
  return (
    <>{ /* Offcanvas, Search & Helper Overlays */ }

    { /*search-form-start */ }
    <div className="tp-search-body-overlay" />
    <div className="tp-search-form-toggle">
       <div className="container">
          <div className="row mb-70">
             <div className="col-lg-12">
                <div className="tp-search-top d-flex justify-content-between align-items-center">
                   <div className="cm-search-logo">
                      <a href="index.html">
                         <img className="logo-1" data-width="140" src="assets/img/logo/logo.png" alt="" />
                         <img className="logo-2" data-width="140" src="assets/img/logo/logo-white.png" alt="" />
                      </a>
                   </div>
                   <button className="tp-search-close">
                      <i className="fa-light fa-xmark" />
                   </button>
                </div>
             </div>
          </div>
          <div className="row justify-content-center">
             <div className="col-lg-12">
                <div className="tp-search-form">
                   <form action="#">
                      <div className="tp-search-form-input">
                         <input type="text" placeholder="What are you looking foor?" required />
                         <span className="tp-search-focus-border" />
                         <button className="tp-search-form-icon" type="submit">
                            <i className="fa-sharp fa-regular fa-magnifying-glass" />
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* search-form-end */ }

    { /* tp-offcanvus-area-start */ }
    <div className="tp-offcanvas-area">
       <div className="tp-offcanvas">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
             <div className="tp-offcanvas-logo">
                <a href="index.html">
                   <img className="logo-1" data-width="140" src="assets/img/logo/logo.png" alt="" />
                   <img className="logo-2" data-width="140" src="assets/img/logo/logo-white.png" alt="" />
                </a>
             </div>
             <div className="tp-offcanvas-close-btn">
                <button className="close-btn">
                   <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                </button>
             </div>
          </div>
          <div className="tp-offcanvas-content d-none d-xl-block">
             <h3 className="tp-offcanvas-title">Hello There!</h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, </p>
          </div>
          <div className="tp-offcanvas-menu d-xl-none">
             <nav />
          </div>
          <div className="tp-offcanvas-gallery d-none d-xl-block">
             <div className="row gx-2">
                <div className="col-md-3 col-3">
                   <div className="tp-offcanvas-gallery-img fix">
                      <a className="popup-image" href="assets/img/offcanvas/offcanvas-1.jpg"><img src="assets/img/offcanvas/offcanvas-1.jpg" alt="" /></a>
                   </div>
                </div>
                <div className="col-md-3 col-3">
                   <div className="tp-offcanvas-gallery-img fix">
                      <a className="popup-image" href="assets/img/offcanvas/offcanvas-2.jpg"><img src="assets/img/offcanvas/offcanvas-2.jpg" alt="" /></a>
                   </div>
                </div>
                <div className="col-md-3 col-3">
                   <div className="tp-offcanvas-gallery-img fix">
                      <a className="popup-image" href="assets/img/offcanvas/offcanvas-3.jpg"><img src="assets/img/offcanvas/offcanvas-3.jpg" alt="" /></a>
                   </div>
                </div>
                <div className="col-md-3 col-3">
                   <div className="tp-offcanvas-gallery-img fix">
                      <a className="popup-image" href="assets/img/offcanvas/offcanvas-4.jpg"><img src="assets/img/offcanvas/offcanvas-4.jpg" alt="" /></a>
                   </div>
                </div>
             </div>
          </div>
          <div className="tp-offcanvas-contact">
             <h3 className="tp-offcanvas-title sm">Information</h3>
             <ul>
                <li><a href="tel:1245654">+ 4 20 7700 1007</a></li>
                <li><a href="mailto:hello@aleric.com">hello@cunnet.com</a></li>
                <li><a href="#">Avenue de Roma 158b, Lisboa</a></li>
             </ul>
          </div>
          <div className="tp-offcanvas-social">
             <h3 className="tp-offcanvas-title sm">Follow Us</h3>
             <ul>
                <li>
                   <a href="#">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M11.25 1.5H4.75C2.95507 1.5 1.5 2.95507 1.5 4.75V11.25C1.5 13.0449 2.95507 14.5 4.75 14.5H11.25C13.0449 14.5 14.5 13.0449 14.5 11.25V4.75C14.5 2.95507 13.0449 1.5 11.25 1.5Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                         <path d="M10.6016 7.5907C10.6818 8.13166 10.5894 8.68414 10.3375 9.16955C10.0856 9.65497 9.68711 10.0486 9.19862 10.2945C8.71014 10.5404 8.15656 10.6259 7.61663 10.5391C7.0767 10.4522 6.57791 10.1972 6.19121 9.81055C5.80451 9.42385 5.54959 8.92506 5.46271 8.38513C5.37583 7.8452 5.46141 7.29163 5.70728 6.80314C5.95315 6.31465 6.34679 5.91613 6.83221 5.66425C7.31763 5.41238 7.87011 5.31998 8.41107 5.4002C8.96287 5.48202 9.47372 5.73915 9.86817 6.1336C10.2626 6.52804 10.5197 7.0389 10.6016 7.5907Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                         <path d="M11.5742 4.42578H11.5842" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                   </a>
                </li>
                <li>
                   <a href="#">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M2.50589 12.7494C4.57662 16.336 9.16278 17.5648 12.7494 15.4941C14.2113 14.65 15.2816 13.388 15.8962 11.9461C16.7895 9.85066 16.7208 7.37526 15.4941 5.25063C14.2674 3.12599 12.1581 1.82872 9.89669 1.55462C8.34063 1.366 6.71259 1.66183 5.25063 2.50589C1.66403 4.57662 0.435172 9.16278 2.50589 12.7494Z" stroke="currentColor" strokeWidth={1.5} />
                         <path d="M12.7127 15.4292C12.7127 15.4292 12.0086 10.4867 10.5011 7.87559C8.99362 5.26451 5.28935 2.57155 5.28935 2.57155M5.68449 15.6124C6.79553 12.2606 12.34 8.54524 16.3975 9.43537M12.311 2.4082C11.1953 5.72344 5.75732 9.38453 1.71875 8.58915" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
                      </svg>
                   </a>
                </li>
                <li>
                   <a href="#">
                      <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M1 5.5715H6.33342C7.62867 5.5715 8.61917 6.56199 8.61917 7.85725C8.61917 9.15251 7.62867 10.143 6.33342 10.143H1.76192C1.30477 10.143 1 9.83823 1 9.38108V1.76192C1 1.30477 1.30477 1 1.76192 1H5.5715C6.86676 1 7.85725 1.99049 7.85725 3.28575C7.85725 4.58101 6.86676 5.5715 5.5715 5.5715H1Z" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit={10} />
                         <path d="M10.9062 7.09454H17.0016C17.0016 5.41832 15.6301 4.04688 13.9539 4.04688C12.2777 4.04688 10.9062 5.41832 10.9062 7.09454ZM10.9062 7.09454C10.9062 8.77076 12.2777 10.1422 13.9539 10.1422H15.2492" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                         <path d="M16.1125 1.44434H11.668" stroke="currentColor" strokeWidth={1.2} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                   </a>
                </li>
                <li>
                   <a href="#">
                      <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M12.75 13H5.25C3 13 1.5 11.5 1.5 9.25V4.75C1.5 2.5 3 1 5.25 1H12.75C15 1 16.5 2.5 16.5 4.75V9.25C16.5 11.5 15 13 12.75 13Z" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
                         <path d="M8.70676 5.14837L10.8006 6.40465C11.5543 6.90716 11.5543 7.66093 10.8006 8.16344L8.70676 9.41972C7.86923 9.92224 7.19922 9.50348 7.19922 8.5822V6.06964C7.19922 4.98086 7.86923 4.64585 8.70676 5.14837Z" fill="currentColor" />
                      </svg>
                   </a>
                </li>
             </ul>
          </div>
       </div>
    </div>
    <div className="body-overlay" />
    { /* tp-offcanvus-area-end */ }

    { /* offcanvas 2 start */ }
    <div className="tp-offcanvas-2-area p-relative">
       <div className="offcanvas-bg" />
       <div className="tp-offcanvas-2-wrapper offcanvas-menu">
          <div className="tp-offcanvas-2-left">
             <div className="tp-header-logo d-flex justify-content-between align-items-center mb-50">
                <a href="index.html">
                   <img className="logo-1" data-width="170" src="assets/img/logo/logo.png" alt="" />
                   <img className="logo-2" data-width="170" src="assets/img/logo/logo-white.png" alt="" />
                </a>
                <span className="hamburger-close-btn">
                   <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                </span>
             </div>
             <div className="tp-offcanvas-menu counter-row">
                <nav />
             </div>
             <span className="hamburger-close-btn hamburger-mobile-close-btn d-md-none">CLOSE</span>
          </div>
       </div>
    </div>
    { /* offcanvas 2 end */ }</>
  );
};

export default Offcanvas1;

// ==================================================
// END: Offcanvas1
// ==================================================
