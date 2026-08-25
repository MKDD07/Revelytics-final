import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchServices, type ServiceItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

// ==================================================
// START: ResumeSpecialties (Stacking Sticky Parallax Cards)
// Supports GSAP ScrollTrigger Card Stacking, Configurable Card Size, Descriptions & CTA Buttons
// ==================================================

export interface ResumeSpecialtiesProps {
  sectionTitle?: string;
  heading?: React.ReactNode;
  initialServices?: ServiceItem[];
  specialtiesData?: ServiceItem[];
  limit?: number;
  bannerHeight?: string | number; // Configurable Card Size (default: 600px)
  showCategoryBanner?: boolean; // Enable or disable category banners
  showServicesList?: boolean; // Enable or disable services list container
}

const FALLBACK_CATEGORY_IMAGES: Record<string, string> = {
  'web-design':
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
  'web-development':
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
  'api-integration':
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
  'app-development':
    'https://images.pexels.com/photos/1092646/pexels-photo-1092646.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
  'e-commerce-solutions':
    'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
  'digital-marketing':
    'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1200&fit=crop',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'web-design':
    'Crafting user-centric UI/UX architectures, interactive wireframes, and scalable design systems that drive customer engagement and product adoption.',
  'web-development':
    'Building modern, performant web applications with cutting-edge frontend frameworks, optimized rendering, and robust backend architectures.',
  'api-integration':
    'Architecting high-speed RESTful APIs, third-party connectors, and automated cloud workflows built for maximum reliability and security.',
  'app-development':
    'Developing cross-platform and native iOS & Android applications engineered for fluid 60fps performance and intuitive user journeys.',
  'e-commerce-solutions':
    'Creating high-converting digital storefronts, frictionless checkout flows, and automated inventory systems for modern commerce.',
  'digital-marketing':
    'Driving sustainable revenue growth through precision SEO optimization, programmatic campaigns, and conversion rate optimization.',
};

const DEFAULT_IMAGE =
  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop';

const ROTATION_ANGLES = ['2deg', '-2deg', '3deg', '-3deg'];

// Fallback slug mapping helper
const normalizeSlug = (title: string, existingSlug?: string): string => {
  if (existingSlug) return existingSlug;
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

interface CategorySection {
  slug: string;
  name: string;
  primaryServiceSlug: string;
  items: ServiceItem[];
}

const CategoryBanner: React.FC<{
  categoryName: string;
  categorySlug: string;
  primaryServiceSlug: string;
  serviceCount: number;
  bannerImage: string;
  height: string;
  onNavigate: (path: string, e: React.MouseEvent) => void;
}> = ({
  categoryName,
  categorySlug,
  primaryServiceSlug,
  serviceCount,
  bannerImage,
  height,
  onNavigate,
}) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const description =
    CATEGORY_DESCRIPTIONS[categorySlug] ||
    `Explore our specialized capabilities and proven frameworks engineered to elevate your ${categoryName.toLowerCase()} solutions.`;

  return (
    <div
      ref={bannerRef}
      className="category-parallax-banner category-stacking-card mb-40 mt-30 fix position-relative"
      id={`category-${categorySlug}`}
      style={{
        height,
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        willChange: 'transform, opacity',
        transformOrigin: 'top center',
        backgroundColor: '#0c0c0c',
      }}
    >
      {/* Background Image */}
      <img
        ref={imgRef}
        src={bannerImage}
        alt={categoryName}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Dark Cinematic Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.75) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Large Decorative Duplicate Solid Overlay Text from Right */}
      <div
        className="category-watermark-text position-absolute user-select-none pointer-events-none d-none d-md-block"
        style={{
          right: '-25px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(90px, 14vw, 210px)',
          fontWeight: 900,
          lineHeight: 0.8,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          color: 'rgba(255, 255, 255, 0.08)',
          zIndex: 1,
          letterSpacing: '-4px',
          fontFamily: 'var(--tp-ff-sequel-bold, sans-serif)',
          pointerEvents: 'none',
        }}
      >
        {categoryName}
      </div>

      {/* Foreground Content */}
      <div
        className="d-flex flex-column justify-content-between h-100 p-4 p-md-5 position-relative"
        style={{ zIndex: 2 }}
      >
        {/* Top Header Badge */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <span
            className="text-uppercase fw-600 d-inline-block px-3 py-1 rounded-pill"
            style={{
              fontSize: '12px',
              letterSpacing: '2px',
              color: '#ffffff',
              backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
            }}
          >
            Service Category
          </span>
          <span
            className="badge rounded-pill px-3 py-2"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            {serviceCount} {serviceCount === 1 ? 'Capability' : 'Capabilities'}
          </span>
        </div>

        {/* Bottom Content with Heading, Description & Action Button */}
        <div style={{ maxWidth: '680px' }}>
          <h3
            className="m-0 text-white tp-ff-sequel-bold-head mb-3"
            style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.1 }}
          >
            {categoryName}
          </h3>
          <p
            className="text-white mb-4"
            style={{
              fontSize: 'clamp(15px, 1.25vw, 18px)',
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: '560px',
            }}
          >
            {description}
          </p>
          <a
            href={`/services/${primaryServiceSlug}`}
            onClick={(e) => onNavigate(`/services/${primaryServiceSlug}`, e)}
            className="d-inline-flex align-items-center gap-2 text-decoration-none"
            style={{
              padding: '14px 30px',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '15px',
              backgroundColor: '#ffffff',
              color: '#000000',
              boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.25s ease, background-color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--tp-theme-primary, #ff3c00)';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>Explore {categoryName}</span>
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ResumeSpecialties: React.FC<ResumeSpecialtiesProps> = ({
  sectionTitle = 'Specialties',
  heading = (
    <>
      At Revlytics, we don&rsquo;t just
      <br /> build websites or campaigns,
      <br /> we craft purpose.
    </>
  ),
  initialServices,
  specialtiesData,
  limit = 0,
  bannerHeight = '600px',
  showCategoryBanner = true,
  showServicesList = true,
}) => {
  const [services, setServices] = useState<ServiceItem[]>(
    initialServices || specialtiesData || []
  );
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});
  const [categoryBanners, setCategoryBanners] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(
    !(initialServices && initialServices.length > 0) &&
    !(specialtiesData && specialtiesData.length > 0)
  );

  const imageRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const cardHeightStr = useMemo(() => {
    if (typeof bannerHeight === 'number') return `${bannerHeight}px`;
    return bannerHeight || '600px';
  }, [bannerHeight]);

  // 1. Fetch Services from D1
  useEffect(() => {
    let isMounted = true;

    async function loadServicesData() {
      try {
        const data = await fetchServices();
        if (isMounted && data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Failed to load services data for specialties:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadServicesData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Group Services by Category
  const categorySections: CategorySection[] = useMemo(() => {
    if (!services || services.length === 0) return [];

    const groups: Record<string, { name: string; primarySlug: string; items: ServiceItem[] }> = {};

    for (const item of services) {
      const catName = item.category_name || item.category || 'Core Services';
      const catSlug =
        item.category_slug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const serviceSlug = item.service_slug || 'ui-ux-design';

      if (!groups[catSlug]) {
        groups[catSlug] = {
          name: catName,
          primarySlug: serviceSlug,
          items: [],
        };
      }
      groups[catSlug].items.push(item);
    }

    let list = Object.keys(groups).map((slug) => ({
      slug,
      name: groups[slug].name,
      primaryServiceSlug: groups[slug].primarySlug,
      items: groups[slug].items,
    }));

    if (limit && limit > 0) {
      list = list.slice(0, limit);
    }

    return list;
  }, [services, limit]);

  // 3. Fetch Pexels Photography
  useEffect(() => {
    if (services.length === 0) return;

    let isMounted = true;

    async function fetchPexelsServiceImages() {
      const imgMap: Record<number, string> = {};
      const bannerMap: Record<string, string> = {};

      await Promise.all(
        categorySections.map(async (cat) => {
          if (FALLBACK_CATEGORY_IMAGES[cat.slug]) {
            bannerMap[cat.slug] = FALLBACK_CATEGORY_IMAGES[cat.slug];
          }
          const query = `${cat.name} technology panoramic modern digital creative`;
          try {
            const photos = await searchPexelsPhotos(query, 1, 'landscape');
            if (photos && photos.length > 0) {
              bannerMap[cat.slug] = photos[0];
            }
          } catch {
            // fallback
          }
        })
      );

      await Promise.all(
        services.map(async (s) => {
          const query = `${s.category_name || 'technology'} ${s.title}`;
          try {
            const photos = await searchPexelsPhotos(query, 1, 'portrait');
            if (photos && photos.length > 0) {
              imgMap[s.id] = photos[0];
            } else if (s.category_slug && FALLBACK_CATEGORY_IMAGES[s.category_slug]) {
              imgMap[s.id] = FALLBACK_CATEGORY_IMAGES[s.category_slug];
            }
          } catch {
            if (s.category_slug && FALLBACK_CATEGORY_IMAGES[s.category_slug]) {
              imgMap[s.id] = FALLBACK_CATEGORY_IMAGES[s.category_slug];
            }
          }
        })
      );

      if (isMounted) {
        if (Object.keys(imgMap).length > 0) {
          setServiceImages((prev) => ({ ...prev, ...imgMap }));
        }
        if (Object.keys(bannerMap).length > 0) {
          setCategoryBanners((prev) => ({ ...prev, ...bannerMap }));
        }
      }
    }

    fetchPexelsServiceImages();

    return () => {
      isMounted = false;
    };
  }, [categorySections, services]);

  // 4. GSAP Stacking / Sticky Card Animation
  // Cards pin at top, and as the next card arrives at viewport center, the current card scales down to 80% and moves up
  useEffect(() => {
    if (!showCategoryBanner || showServicesList) return;

    const timer = setTimeout(() => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      const cards = document.querySelectorAll('.category-stacking-card');
      if (cards.length === 0) return;

      const triggers: any[] = [];

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];
          const st = ScrollTrigger.create({
            trigger: card,
            start: 'top top+=90',
            endTrigger: nextCard,
            end: 'top top+=90',
            pin: true,
            pinSpacing: false,
            scrub: true,
            animation: gsap.to(card, {
              scale: 0.8,
              opacity: 0.6,
              yPercent: -8,
              ease: 'none',
            }),
          });
          triggers.push(st);
        }
      });

      return () => {
        triggers.forEach((t) => t.kill());
      };
    }, 250);

    return () => clearTimeout(timer);
  }, [categorySections, showCategoryBanner, showServicesList]);

  // 5. GSAP Hover Handlers
  const handleMouseEnter = (id: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.zIndex = '30';
    const el = imageRefs.current[id];
    if (!el) return;
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    }
  };

  const handleMouseMove = (id: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = imageRefs.current[id];
    const card = e.currentTarget;
    if (!el || !card) return;
    const gsap = (window as any).gsap;
    if (!gsap) return;

    const rect = card.getBoundingClientRect();
    const relY = e.clientY - rect.top;
    const offset = (relY - rect.height / 2) * 0.4;

    gsap.to(el, {
      y: offset,
      duration: 0.25,
      ease: 'power1.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = (id: number, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.zIndex = '1';
    const el = imageRefs.current[id];
    if (!el) return;
    const gsap = (window as any).gsap;
    if (gsap) {
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        scale: 0.85,
        y: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    } else {
      el.style.opacity = '0';
      el.style.transform = 'scale(0.85)';
    }
  };

  const handleNavigate = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="about" className="about-me-resume-area pt-145 pb-160">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="tp-about-subtitle-wrap mb-20 mt-15 tp_fade_anim" data-delay=".3">
              <span className="tp-section-subtitle text-uppercase">{sectionTitle}</span>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="about-me-resume-content mb-20 tp_fade_anim" data-delay=".5">
              <h2 className="tp-section-title reveal-text">{heading}</h2>
            </div>
          </div>

          <div className="col-12">
            {loading && services.length === 0 ? (
              <div className="text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading services...</span>
                </div>
              </div>
            ) : (
              categorySections.map((category) => {
                const bannerPhoto =
                  categoryBanners[category.slug] ||
                  FALLBACK_CATEGORY_IMAGES[category.slug] ||
                  DEFAULT_IMAGE;

                return (
                  <div key={category.slug} id={`category-${category.slug}`} className="category-service-group mb-60">
                    {/* Category Header & Border Divider */}
                    <div className="tp-about-border mt-20 pt-40 mb-30">
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div className="d-flex align-items-center gap-3">
                          <span
                            className="text-uppercase fw-600 d-inline-block px-3 py-1 rounded-pill"
                            style={{
                              fontSize: '12px',
                              letterSpacing: '2px',
                              color: '#ffffff',
                              backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                            }}
                          >
                            Category
                          </span>
                          <h3 className="m-0 tp-ff-sequel-bold-head" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
                            {category.name}
                          </h3>
                        </div>
                        <span className="text-muted fw-500">
                          {category.items.length} {category.items.length === 1 ? 'Service' : 'Services'}
                        </span>
                      </div>
                    </div>

                    {/* Category Stacking Sticky Banner (if enabled) */}
                    {showCategoryBanner && (
                      <CategoryBanner
                        categoryName={category.name}
                        categorySlug={category.slug}
                        primaryServiceSlug={category.primaryServiceSlug}
                        serviceCount={category.items.length}
                        bannerImage={bannerPhoto}
                        height={cardHeightStr}
                        onNavigate={handleNavigate}
                      />
                    )}

                    {/* Category Services List (Cards for each service-detail) */}
                    {showServicesList && (
                      <div className="row g-4 mt-10">
                        {category.items.map((item, index) => {
                          const serviceSlug = normalizeSlug(item.title, item.service_slug);
                          const displayCategory =
                            item.subheading ||
                            item.category_name ||
                            item.category ||
                            category.name;

                          const photoUrl =
                            serviceImages[item.id] ||
                            (item.category_slug && FALLBACK_CATEGORY_IMAGES[item.category_slug]) ||
                            DEFAULT_IMAGE;

                          const numStr = String(index + 1).padStart(2, '0');

                          return (
                            <div
                              key={item.id || serviceSlug || index}
                              className="col-lg-6 col-md-6 col-12 tp_fade_anim"
                              data-delay=".3"
                            >
                              <a
                                id={`service-${serviceSlug}`}
                                href={`/service-details/${serviceSlug}`}
                                data-service-slug={serviceSlug}
                                data-slug={serviceSlug}
                                onClick={(e) => handleNavigate(`/service-details/${serviceSlug}`, e)}
                                className="service-details-card d-block text-decoration-none position-relative overflow-hidden h-100"
                                style={{
                                  minHeight: '380px',
                                  borderRadius: '24px',
                                  backgroundColor: '#0e0e0e',
                                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform = 'translateY(-6px)';
                                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'none';
                                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
                                }}
                              >
                                {/* Background Image */}
                                <img
                                  src={photoUrl}
                                  alt={item.title}
                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s ease',
                                  }}
                                  className="service-card-bg-img"
                                />

                                {/* Dark Cinematic Gradient Overlay */}
                                <div
                                  style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background:
                                      'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.8) 100%)',
                                    pointerEvents: 'none',
                                  }}
                                />

                                {/* Foreground Card Content */}
                                <div
                                  className="d-flex flex-column justify-content-between h-100 p-4 p-md-5 position-relative"
                                  style={{ zIndex: 2 }}
                                >
                                  {/* Top Header Badge */}
                                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                                    <span
                                      className="text-uppercase fw-600 d-inline-block px-3 py-1 rounded-pill"
                                      style={{
                                        fontSize: '12px',
                                        letterSpacing: '2px',
                                        color: '#ffffff',
                                        backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                                      }}
                                    >
                                      {displayCategory}
                                    </span>
                                    <span
                                      className="badge rounded-pill px-3 py-2"
                                      style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(8px)',
                                        color: '#ffffff',
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        letterSpacing: '1px',
                                      }}
                                    >
                                      {numStr}
                                    </span>
                                  </div>

                                  {/* Bottom Content with Heading, Description & Action Button */}
                                  <div>
                                    <h3
                                      className="m-0 text-white tp-ff-sequel-bold-head mb-3"
                                      style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', lineHeight: 1.2 }}
                                    >
                                      {item.title}
                                    </h3>
                                    {item.description && (
                                      <p
                                        className="text-white mb-4"
                                        style={{
                                          fontSize: '15px',
                                          lineHeight: 1.6,
                                          opacity: 0.88,
                                          display: '-webkit-box',
                                          WebkitLineClamp: 3,
                                          WebkitBoxOrient: 'vertical',
                                          overflow: 'hidden',
                                        }}
                                      >
                                        {item.description}
                                      </p>
                                    )}
                                    <div className="d-inline-flex align-items-center gap-2 text-white fw-600 fs-14">
                                      <span
                                        style={{
                                          padding: '10px 22px',
                                          borderRadius: '50px',
                                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                                          backdropFilter: 'blur(10px)',
                                          border: '1px solid rgba(255, 255, 255, 0.2)',
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          transition: 'all 0.25s ease',
                                        }}
                                      >
                                        Explore Service <ArrowUpRight size={16} />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSpecialties;