import React, { useState, useEffect } from 'react';

// ==================================================
// START: Offcanvas1 (Redesigned Pure React Drawer)
// ==================================================

const Offcanvas1: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      e.preventDefault();
      setIsOpen(true);
    };

    const openBtns = document.querySelectorAll('.hamburger-open-btn');
    openBtns.forEach((btn) => btn.addEventListener('click', handleOpen));

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      openBtns.forEach((btn) => btn.removeEventListener('click', handleOpen));
      window.removeEventListener('keydown', handleKeyDown);
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
      {/* Offcanvas Slide-in Drawer */}
      <div className={`tp-offcanvas-2-area p-relative ${isOpen ? 'menu-open' : ''}`}>
        <div className="offcanvas-bg" onClick={closeMenu} />
        <div className="tp-offcanvas-2-wrapper offcanvas-menu">
          <div className="tp-offcanvas-2-left">
            {/* Top Logo & Close Button */}
            <div className="tp-header-logo d-flex justify-content-between align-items-center mb-40">
              <a href="#home" onClick={handleLinkClick} style={{ display: 'inline-block' }}>
                <img
                  style={{ width: '160px', height: 'auto', display: 'block' }}
                  src="/assets/img/logo/logo.svg"
                  alt="Revlytics"
                />
              </a>
              <span
                className="hamburger-close-btn active"
                onClick={closeMenu}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close Menu"
              >
                <svg width="34" height="34" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
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

            {/* Quick Contact & Info */}
            <div className="tp-offcanvas-contact mt-30 pt-20">
              <p className="mb-10" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6b7280', fontWeight: 600 }}>
                Direct Inquiries
              </p>
              <h5 className="mb-8" style={{ fontSize: '16px', fontWeight: 400 }}>
                <a href="mailto:contact@revlytics.in" style={{ color: '#111827', textDecoration: 'none', transition: 'color 0.2s' }}>
                  contact@revlytics.in
                </a>
              </h5>
              <p className="mb-20" style={{ fontSize: '15px', color: '#374151', fontWeight: 500 }}>
                <a href="tel:+919263553116" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +91 92635 53116
                </a>
              </p>
              <div className="mb-25">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  style={{
                    display: 'inline-block',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    backgroundColor: '#cd4631',
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: '14px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(205, 70, 49, 0.25)',
                    transition: 'transform 0.2s, background-color 0.2s',
                  }}
                >
                  Book Consultation
                </a>
              </div>

              {/* Social Icons at Bottom */}
              <div className="tp-offcanvas-social pt-10">
                <p className="mb-12" style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#6b7280', fontWeight: 600 }}>
                  Connect With Us
                </p>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className="fa-brands fa-linkedin-in" style={{ fontSize: '15px' }} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className="fa-brands fa-instagram" style={{ fontSize: '15px' }} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className="fa-brands fa-youtube" style={{ fontSize: '15px' }} />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#111827',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <i className="fa-brands fa-facebook-f" style={{ fontSize: '15px' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas1;
