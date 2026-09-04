import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { fetchServices, type ServiceItem } from '../../services/api';

// ==================================================
// START: Header1 (Redesigned Modern Header)
// ==================================================

interface Header1Props {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

const FALLBACK_SERVICES: ServiceItem[] = [
  { id: 1, title: 'UI/UX Design', service_slug: 'ui-ux-design' },
  { id: 2, title: 'Web Development', service_slug: 'web-development' },
  { id: 3, title: 'Google Business Listing & Optimisation', service_slug: 'google-business-listing-and-optimisation' },
  { id: 4, title: 'Digital Marketing & Growth', service_slug: 'digital-marketing' },
  { id: 5, title: 'SEO & Search Authority', service_slug: 'seo-optimization' },
  { id: 6, title: 'Cloud & DevOps Architecture', service_slug: 'cloud-devops' },
  { id: 7, title: 'AI Solutions & Automation', service_slug: 'ai-solutions' },
  { id: 8, title: 'Branding & Creative Direction', service_slug: 'branding-strategy' },
];

const Header1: React.FC<Header1Props> = ({ onNavigate }) => {
  const [services, setServices] = useState<ServiceItem[]>(FALLBACK_SERVICES);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchServices();
        if (isMounted && data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Failed to load services in header:', err);
      }
    }
    loadData();

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      isMounted = false;
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNav = (route: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.hash = route;
    }
    const el = document.getElementById(route);
    if (el) {
      const isTouchOrMobile = window.innerWidth < 768 || ('ontouchstart' in window);
      el.scrollIntoView({ behavior: isTouchOrMobile ? 'auto' : 'smooth' });
    }
  };

  const handleServiceClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetRoute = `service-details/${slug}`;
    if (onNavigate) {
      onNavigate(targetRoute);
    } else {
      window.location.hash = targetRoute;
    }
    const isTouchOrMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    window.scrollTo({ top: 0, behavior: isTouchOrMobile ? 'auto' : 'smooth' });
  };

  return (
    <header>
      <div
        className={`tp-header-area tp-header-spacing cs-header-wrap header-transparent ${
          isSticky ? 'header-sticky tp-header-pinned' : ''
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 999,
          transition: 'all 0.35s ease',
          backgroundColor: isSticky ? 'rgb(255 255 255 / 92%)' : 'transparent',
          backdropFilter: isSticky ? 'blur(16px)' : 'none',
          boxShadow: isSticky ? '0 4px 30px rgba(0, 0, 0, 0.3)' : 'none',
          paddingTop: isSticky ? '14px' : '24px',
          paddingBottom: isSticky ? '14px' : '24px',
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Logo Area */}
            <div className="col-xl-3 col-6">
              <div className="tp-header-logo">
                <a href="#home" onClick={(e) => handleNav('home', e)} style={{ display: 'inline-block' }}>
                  <img
                    data-width="180"
                    style={{ width: '180px', height: 'auto', display: 'block' }}
                    src="/assets/img/logo/logo.svg"
                    alt="Revlytics Travel Agency"
                  />
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="col-xl-6 d-none d-xl-block">
              <div className="tp-main-menu d-flex justify-content-center">
                <nav>
                  <ul>
                    <li>
                      <a href="#home" onClick={(e) => handleNav('home', e)}>
                        Home
                      </a>
                    </li>

                    {/* Services Dropdown */}
                    <li className="has-dropdown">
                      <a href="#services" onClick={(e) => handleNav('services', e)}>
                        Services
                      </a>
                      <ul className="tp-submenu submenu">
                        <li>
                          <a href="#services" onClick={(e) => handleNav('services', e)}>
                            All Services
                          </a>
                        </li>
                        {services.map((s) => {
                          const slug =
                            s.service_slug ||
                            s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                          return (
                            <li key={s.id}>
                              <a
                                href={`#service-details/${slug}`}
                                onClick={(e) => handleServiceClick(slug, e)}
                              >
                                {s.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    {/* News & Trends Dropdown */}
                    <li className="has-dropdown">
                      <a href="#blog" onClick={(e) => handleNav('blog', e)}>
                        News &amp; Trends
                      </a>
                      <ul className="tp-submenu submenu">
                        <li>
                          <a href="#blog" onClick={(e) => handleNav('blog', e)}>
                            Travel Blog Grid
                          </a>
                        </li>
                        <li>
                          <a href="#blog-details" onClick={(e) => handleNav('blog-details', e)}>
                            Article Details
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a href="#faq" onClick={(e) => handleNav('faq', e)}>
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a href="#contact" onClick={(e) => handleNav('contact', e)}>
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Right Action Buttons & Hamburger Toggle */}
            <div className="col-xl-3 col-6">
              <div className="tp-header-right d-flex justify-content-end align-items-center">
                <button
                  className="tp-header-search-btn tp-search-click"
                  type="button"
                  aria-label="Search"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18.7508 18.5233L13.5538 13.392M13.5538 13.392C14.9604 12.0032 15.7506 10.1196 15.7506 8.15551C15.7506 6.19144 14.9604 4.30782 13.5538 2.91902C12.1472 1.53022 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.53022 2.94678 2.91902C1.54021 4.30782 0.75 6.19144 0.75 8.15551C0.75 10.1196 1.54021 12.0032 2.94678 13.392C4.35336 14.7808 6.26108 15.561 8.25028 15.561C10.2395 15.561 12.1472 14.7808 13.5538 13.392Z"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="tp-header-btn-wrap d-none d-sm-block ml-30">
                  <Button
                    text="Book Consultation"
                    href="#contact"
                    size="sm"
                    variant="fill-red"
                    showIcon={false}
                    onClick={(e: any) => handleNav('contact', e)}
                  />
                </div>
                <button
                  className="tp-header-sidebar-btn hamburger-open-btn d-xl-none ml-20 text-white"
                  type="button"
                  aria-label="Open Mobile Menu"
                >
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;
