import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchServices, type ServiceItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

// ==================================================
// START: ServiceList (Interactive Category Showcase)
// Connected with D1 `services` Table & Smooth Scroll To Category
// ==================================================

// Helper to resize any image URL inside tp-about-border to max 500px width for fast loading
const toIntrinsic500px = (url: string) => {
  if (!url) return url;
  if (url.includes('images.pexels.com')) {
    const base = url.split('?')[0];
    return `${base}?auto=compress&cs=tinysrgb&w=500&fit=crop`;
  }
  return url;
};

const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
  'web-design':
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
  'web-development':
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
  'api-integration':
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
  'app-development':
    'https://images.pexels.com/photos/1092646/pexels-photo-1092646.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
  'e-commerce-solutions':
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
  'digital-marketing':
    'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop',
};

const DEFAULT_SERVICE_IMAGE =
  'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=500&fit=crop';

export interface ServiceListProps {
  id?: string;
}

const ServiceList: React.FC<ServiceListProps> = ({ id = 'about' }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // 1. Fetch live services from D1
  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      try {
        const data = await fetchServices();
        if (isMounted && data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Failed to load services in ServiceList:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Extract distinct categories with a primary service slug
  const distinctCategories = useMemo(() => {
    if (!services || services.length === 0) {
      return [
        { name: 'Web Design', slug: 'web-design', serviceSlug: 'ui-ux-design' },
        { name: 'Web Development', slug: 'web-development', serviceSlug: 'frontend-development' },
        { name: 'API Integration', slug: 'api-integration', serviceSlug: 'rest-api-integration' },
        { name: 'App Development', slug: 'app-development', serviceSlug: 'ios-app-development' },
        { name: 'E-Commerce Solutions', slug: 'e-commerce-solutions', serviceSlug: 'online-store-setup' },
        { name: 'Digital Marketing', slug: 'digital-marketing', serviceSlug: 'seo-optimization' },
      ];
    }

    const seen = new Set<string>();
    const list: { name: string; slug: string; serviceSlug: string }[] = [];

    for (const s of services) {
      const catName = s.category_name || s.category || 'Services';
      const catSlug = s.category_slug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const serviceSlug = s.service_slug || 'ui-ux-design';

      if (!seen.has(catSlug)) {
        seen.add(catSlug);
        list.push({
          name: catName,
          slug: catSlug,
          serviceSlug,
        });
      }
    }

    return list;
  }, [services]);

  // 3. Fetch Pexels Photography for each category
  useEffect(() => {
    if (distinctCategories.length === 0) return;

    let isMounted = true;

    async function loadImages() {
      const imgMap: Record<string, string> = {};

      await Promise.all(
        distinctCategories.map(async (cat) => {
          const query = `${cat.name} digital technology modern creative`;
          try {
            const photos = await searchPexelsPhotos(query, 1, 'portrait');
            if (photos && photos.length > 0) {
              imgMap[cat.slug] = toIntrinsic500px(photos[0]);
            } else if (FALLBACK_CATEGORY_IMAGES[cat.slug]) {
              imgMap[cat.slug] = FALLBACK_CATEGORY_IMAGES[cat.slug];
            }
          } catch {
            if (FALLBACK_CATEGORY_IMAGES[cat.slug]) {
              imgMap[cat.slug] = FALLBACK_CATEGORY_IMAGES[cat.slug];
            }
          }
        })
      );

      if (isMounted && Object.keys(imgMap).length > 0) {
        setCategoryImages((prev) => ({ ...prev, ...imgMap }));
      }
    }

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [distinctCategories]);

  // Scroll down smoothly to the first item of the clicked category
  const handleCategoryClick = (catSlug: string, e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Find the first service card belonging to this category
    const targetCard =
      document.querySelector(`[data-category-slug="${catSlug}"]`) ||
      document.getElementById(`category-${catSlug}`) ||
      document.querySelector(`[data-slug="${catSlug}"]`);

    if (targetCard) {
      const headerOffset = 100;
      const elementPosition = targetCard.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      return;
    }

    // 2. Fallback: match by finding the category's primary service slug
    const cat = distinctCategories.find((c) => c.slug === catSlug);
    if (cat && cat.serviceSlug) {
      const serviceCard = document.getElementById(`service-${cat.serviceSlug}`) || document.getElementById(`service-wrapper-${cat.serviceSlug}`);
      if (serviceCard) {
        const headerOffset = 100;
        const elementPosition = serviceCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        return;
      }
    }

    // 3. Fallback to about section
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeCategory = distinctCategories[activeIndex] || distinctCategories[0];
  const activeImageUrl = toIntrinsic500px(
    (activeCategory && categoryImages[activeCategory.slug]) ||
    (activeCategory && FALLBACK_CATEGORY_IMAGES[activeCategory.slug]) ||
    DEFAULT_SERVICE_IMAGE
  );

  return (
    <>
      {/* Service List with Pinned Image Showcase */}
      <div id={id} className="tp-service-area tp-panel-pin-area tp-bg-grey pt-145 pb-90">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xxl-11 col-xl-12">
              <div className="tp-about-title-wrap mb-30">
                <h2 className="tp-section-title reveal-text">
                  At Revlytics, we don&rsquo;t just build websites
                  <br /> or campaigns, we craft purpose-driven
                  <br /> digital ecosystems.
                </h2>
              </div>
            </div>
          </div>

          <div className="tp-about-border mt-20 pt-40">
            <div className="row">
              {/* Left Pinned Image Container */}
              <div className="col-lg-4 mb-40">
                <div className="tp-service-content mr-60 mt-20">
                  <div
                    className="tp-service-sales-wrap tp-panel-pin fix p-relative"
                    style={{
                      width: '100%',
                      maxWidth: '380px',
                      height: '500px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    }}
                  >
                    <div className="tp-service-img-wrapper image-container" style={{ width: '100%', height: '500px', position: 'relative' }}>
                      <img
                        key={activeImageUrl}
                        className="thumb"
                        src={activeImageUrl}
                        alt={activeCategory ? activeCategory.name : 'Service Image'}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          borderRadius: '20px',
                          transition: 'opacity 0.4s ease, transform 0.4s ease',
                          animation: 'fadeInScale 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
                          borderRadius: '20px',
                          pointerEvents: 'none',
                        }}
                      />
                      {activeCategory && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '24px',
                            left: '24px',
                            right: '24px',
                            color: '#ffffff',
                            zIndex: 2,
                          }}
                        >
                          <span
                            style={{
                              fontSize: '13px',
                              letterSpacing: '1.5px',
                              textTransform: 'uppercase',
                              opacity: 0.85,
                              fontWeight: 600,
                            }}
                          >
                            Category
                          </span>
                          <h4 style={{ margin: '4px 0 0 0', color: '#ffffff', fontSize: '22px', fontWeight: 700 }}>
                            {activeCategory.name}
                          </h4>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Category & Service Selection List */}
              <div className="col-lg-8 mb-40">
                <div className="tp-service-list-wrap ml-60">
                  {distinctCategories.map((cat, idx) => {
                    const isActive = activeIndex === idx;
                    const catImage =
                      categoryImages[cat.slug] ||
                      FALLBACK_CATEGORY_IMAGES[cat.slug] ||
                      DEFAULT_SERVICE_IMAGE;

                    return (
                      <div
                        key={cat.slug || idx}
                        className={`tp-service-item service-item mb-5 ${isActive ? 'active' : ''}`}
                        data-img={catImage}
                        onMouseEnter={() => setActiveIndex(idx)}
                        style={{
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          padding: '12px 0',
                          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                        }}
                      >
                        <h2 className="tp-service-title tp-ff-sequel-roman d-inline-block m-0 w-100">
                          <a
                            href={`#category-${cat.slug}`}
                            onClick={(e) => handleCategoryClick(cat.slug, e)}
                            className="text-decoration-none d-flex align-items-center justify-content-between"
                            style={{
                              color: isActive ? 'var(--tp-theme-primary, #ff3c00)' : '#111111',
                              transition: 'color 0.25s ease',
                              gap: '20px',
                              fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                              fontWeight: 500,
                              letterSpacing: '-0.02em',
                            }}
                          >
                            <span>{cat.name}</span>
                            <span
                              className="tp-service-icon d-inline-flex align-items-center justify-content-center"
                              style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: isActive ? 'var(--tp-theme-primary, #ff3c00)' : 'rgba(0, 0, 0, 0.04)',
                                color: isActive ? '#ffffff' : '#111111',
                                transform: isActive ? 'rotate(45deg)' : 'none',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                flexShrink: 0,
                              }}
                            >
                              <ArrowUpRight size={22} strokeWidth={2} />
                            </span>
                          </a>
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-service-area-end */}
    </>
  );
};

export default ServiceList;
