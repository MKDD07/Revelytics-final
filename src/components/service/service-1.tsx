import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getPexelsImage } from '../../utils';
import Button from '../ui/Button';

// Default Arrow Icon SVG to keep code DRY
const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'Branding',
    alt: 'Branding & Design',
    link: '#',
    image: getPexelsImage('branding design', 0, { width: 800, height: 600 }),
  },
  {
    id: 2,
    title: 'Infodesign',
    alt: 'Infodesign & Architecture',
    link: '#',
    image: getPexelsImage('architecture technology', 1, { width: 800, height: 600 }),
  },
  {
    id: 3,
    title: 'Digital',
    alt: 'Digital Marketing & AI',
    link: '#',
    image: getPexelsImage('digital marketing', 2, { width: 800, height: 600 }),
  },
  {
    id: 4,
    title: 'Editorial',
    alt: 'Editorial & Content Development',
    link: '#',
    image: getPexelsImage('magazine creative', 3, { width: 800, height: 600 }),
  },
  {
    id: 5,
    title: 'UI/UX Design',
    alt: 'UI/UX & Product Design',
    link: '#',
    image: getPexelsImage('ux ui design', 4, { width: 800, height: 600 }),
  },
  {
    id: 6,
    title: 'Development',
    alt: 'Full-Stack Web & App Engineering',
    link: '#',
    image: getPexelsImage('web development coding', 5, { width: 800, height: 600 }),
  },
  {
    id: 7,
    title: 'Motion & 3D',
    alt: 'Motion Graphics & 3D Animation',
    link: '#',
    image: getPexelsImage('3d animation motion', 6, { width: 800, height: 600 }),
  },
  {
    id: 8,
    title: 'SEO & Growth',
    alt: 'Search Optimization & Performance Marketing',
    link: '#',
    image: getPexelsImage('analytics growth chart', 7, { width: 800, height: 600 }),
  },
  {
    id: 9,
    title: 'Strategy',
    alt: 'Creative Strategy & Brand Positioning',
    link: '#',
    image: getPexelsImage('business strategy meeting', 8, { width: 800, height: 600 }),
  },
];

const Service1 = ({
  subtitle = 'Our latest Services',
  count = '( 24 )',
  services = DEFAULT_SERVICES,
  buttonText = 'More Services',
  buttonHref = '#services',
}) => {
  // Dynamic active state management for hover effects
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tp-service-area tp-panel-pin-area tp-bg-grey pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-service-subtitle-wrap tp-about-border pt-25 d-flex justify-content-between gap-3 mb-50">
              <span className="tp-section-subtitle tp-ff-sequel-roman">{subtitle}</span>
              <span className="tp-section-subtitle tp-ff-sequel-roman">{count}</span>
            </div>
          </div>

          {/* Left Column: Vertically Centered Sticky Image Preview */}
          <div className="col-lg-4 mb-40" style={{ position: 'relative' }}>
            <div
              className="tp-service-content mr-60"
              style={{
                position: 'sticky',
                top: 'calc(50vh - 240px)',
                zIndex: 10,
              }}
            >
              <div
                className="tp-service-sales-wrap fix p-relative"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div
                  className="tp-service-img-wrapper image-container"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 480,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  {services.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={item.id}
                        className={`hover-image ${isActive ? 'active' : ''}`}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          opacity: isActive ? 1 : 0,
                          visibility: isActive ? 'visible' : 'hidden',
                          zIndex: isActive ? 5 : 1,
                          transition: 'opacity 0.4s ease, transform 0.4s ease',
                        }}
                      >
                        <img
                          className="thumb"
                          src={item.image}
                          alt={item.alt || item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            borderRadius: 16,
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Service Item List */}
          <div className="col-lg-8 mb-40">
            <div className="tp-service-list-wrap ml-60">
              {services.map((item, index) => (
                <div
                  key={item.id}
                  className={`tp-service-item service-item mb-5 ${
                    index === activeIndex ? 'active' : ''
                  }`}
                  data-img={item.image}
                  onMouseEnter={() => setActiveIndex(index)}
                  onTouchStart={() => setActiveIndex(index)}
                >
                  <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block m-0 w-100">
                    <a
                      href={item.link}
                      onClick={(e) => e.preventDefault()}
                      className="text-decoration-none d-flex align-items-center justify-content-between"
                      style={{
                        color: index === activeIndex ? 'var(--tp-theme-primary, #ff3c00)' : 'inherit',
                        transition: 'color 0.25s ease',
                        gap: '20px',
                      }}
                    >
                      <span>{item.title}</span>
                      <span
                        className="tp-service-icon d-inline-flex align-items-center justify-content-center"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: index === activeIndex ? 'var(--tp-theme-primary, #ff3c00)' : 'rgba(0, 0, 0, 0.04)',
                          color: index === activeIndex ? '#ffffff' : 'inherit',
                          transform: index === activeIndex ? 'rotate(45deg)' : 'none',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          flexShrink: 0,
                        }}
                      >
                        <ArrowUpRight size={20} strokeWidth={2} />
                      </span>
                    </a>
                  </h2>
                </div>
              ))}

              <div className="tp-service-btn pt-30">
                <Button text={buttonText} href={buttonHref} variant="fill-red" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service1;