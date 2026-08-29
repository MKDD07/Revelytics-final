import React, { useState, useEffect } from 'react';

// ==================================================
// START: Offcanvas2
// ==================================================

const Offcanvas2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const openBtns = document.querySelectorAll('.hamburger-open-btn');
    openBtns.forEach((btn) => btn.addEventListener('click', handleOpen));

    return () => {
      openBtns.forEach((btn) => btn.removeEventListener('click', handleOpen));
    };
  }, []);

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <>
      {/* Search Overlay */}
      <div className="tp-search-body-overlay" />
      <div className="tp-search-form-toggle">
        <div className="container">
          <div className="row mb-70">
            <div className="col-lg-12">
              <div className="tp-search-top d-flex justify-content-between align-items-center">
                <div className="cm-search-logo">
                  <a href="index.html">
                    <img className="logo-1" data-width="140" src="assets/img/logo/logo.png" alt="Revlytics" />
                    <img className="logo-2" data-width="140" src="assets/img/logo/logo-white.png" alt="Revlytics" />
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
                    <input type="text" placeholder="What are you looking for?" required />
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

      {/* Main Full-Screen Offcanvas Menu */}
      <div className={`tp-offcanvas-2-area p-relative ${isOpen ? 'menu-open' : ''}`}>
        <div className="offcanvas-bg" onClick={closeMenu} />
        <div className="tp-offcanvas-2-wrapper offcanvas-menu">
          <div className="tp-offcanvas-2-left">
            <div className="tp-header-logo d-flex justify-content-between align-items-center mb-50">
              <a href="index.html" onClick={handleLinkClick}>
                <img className="logo-1" style={{ width: '170px' }} src="assets/img/logo/logo.png" alt="Revlytics" />
                <img className="logo-2" style={{ width: '170px' }} src="assets/img/logo/logo-white.png" alt="Revlytics" />
              </a>
              <span className={`hamburger-close-btn ${isOpen ? 'active' : ''}`} onClick={closeMenu} style={{ cursor: 'pointer' }}>
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="tp-offcanvas-menu counter-row mb-40">
              <nav>
                <ul>
                  <li>
                    <a href="#home" onClick={handleLinkClick}>Home</a>
                  </li>
                  <li className={`has-dropdown ${openDropdown === 'services' ? 'active' : ''}`}>
                    <a
                      href="#services"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown((prev) => (prev === 'services' ? null : 'services'));
                      }}
                    >
                      Services
                    </a>
                    <ul
                      className="tp-submenu submenu"
                      style={{
                        display: openDropdown === 'services' ? 'block' : 'none',
                      }}
                    >
                      <li><a href="#services" onClick={handleLinkClick}>All Services</a></li>
                      <li><a href="#service-details/ui-ux-design" onClick={handleLinkClick}>UI/UX Design</a></li>
                      <li><a href="#service-details/web-development" onClick={handleLinkClick}>Web Development</a></li>
                      <li><a href="#service-details/google-business-listing-and-optimisation" onClick={handleLinkClick}>Google Business Listing &amp; Optimisation</a></li>
                      <li><a href="#service-details/digital-marketing" onClick={handleLinkClick}>Digital Marketing &amp; Growth</a></li>
                      <li><a href="#service-details/seo-optimization" onClick={handleLinkClick}>SEO &amp; Search Authority</a></li>
                      <li><a href="#service-details/cloud-devops" onClick={handleLinkClick}>Cloud &amp; DevOps Architecture</a></li>
                      <li><a href="#service-details/ai-solutions" onClick={handleLinkClick}>AI Solutions &amp; Automation</a></li>
                      <li><a href="#service-details/branding-strategy" onClick={handleLinkClick}>Branding &amp; Creative Direction</a></li>
                    </ul>
                    <button
                      className="tp-menu-close"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDropdown((prev) => (prev === 'services' ? null : 'services'));
                      }}
                      aria-label="Toggle Services"
                    >
                      <i className={`fa-solid ${openDropdown === 'services' ? 'fa-minus' : 'fa-plus'}`} />
                    </button>
                  </li>
                  <li className={`has-dropdown ${openDropdown === 'blog' ? 'active' : ''}`}>
                    <a
                      href="#blog"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown((prev) => (prev === 'blog' ? null : 'blog'));
                      }}
                    >
                      News &amp; Trends
                    </a>
                    <ul
                      className="tp-submenu submenu"
                      style={{
                        display: openDropdown === 'blog' ? 'block' : 'none',
                      }}
                    >
                      <li><a href="#blog" onClick={handleLinkClick}>Travel Blog Grid</a></li>
                      <li><a href="#blog-details" onClick={handleLinkClick}>Article Details</a></li>
                    </ul>
                    <button
                      className="tp-menu-close"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenDropdown((prev) => (prev === 'blog' ? null : 'blog'));
                      }}
                      aria-label="Toggle Blog"
                    >
                      <i className={`fa-solid ${openDropdown === 'blog' ? 'fa-minus' : 'fa-plus'}`} />
                    </button>
                  </li>
                  <li>
                    <a href="#faq" onClick={handleLinkClick}>FAQ</a>
                  </li>
                  <li>
                    <a href="#contact" onClick={handleLinkClick}>Contact</a>
                  </li>
                </ul>
              </nav>
            </div>

            <span
              className="hamburger-close-btn hamburger-mobile-close-btn d-md-none active"
              onClick={closeMenu}
              style={{ cursor: 'pointer' }}
            >
              CLOSE
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas2;
