import React, { useState, useEffect, useMemo, useRef } from 'react';
import { fetchServices, type ServiceItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

// ==================================================
// START: ResumeSpecialties (Category Grouped with Parallax Banners)
// Connected with D1 `services` Table & GSAP Parallax
// ==================================================

export interface ResumeSpecialtiesProps {
  sectionTitle?: string;
  heading?: React.ReactNode;
  initialServices?: ServiceItem[];
  specialtiesData?: ServiceItem[];
  limit?: number;
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
  items: ServiceItem[];
}

const CategoryBanner: React.FC<{
  categoryName: string;
  categorySlug: string;
  serviceCount: number;
  bannerImage: string;
}> = ({ categoryName, categorySlug, serviceCount, bannerImage }) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // GSAP ScrollTrigger Parallax for each category banner
  useEffect(() => {
    if (!bannerRef.current || !imgRef.current) return;
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (gsap && ScrollTrigger) {
      const tween = gsap.fromTo(
        imgRef.current,
        { yPercent: -12, scale: 1.12 },
        {
          yPercent: 12,
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        }
      );

      return () => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      };
    }
  }, [bannerImage]);

  return (
    <div
      ref={bannerRef}
      className="category-parallax-banner mb-40 mt-60 fix position-relative"
      id={`category-${categorySlug}`}
      style={{
        height: '400px',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        ref={imgRef}
        src={bannerImage}
        alt={categoryName}
        style={{
          position: 'absolute',
          top: '-15%',
          left: 0,
          width: '100%',
          height: '130%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.7) 100%)',
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
          fontSize: 'clamp(85px, 13vw, 190px)',
          fontWeight: 900,
          lineHeight: 0.8,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          color: 'rgba(255, 255, 255, 0.08)',
          zIndex: 1,
          letterSpacing: '-3px',
          fontFamily: 'var(--tp-ff-sequel-bold, sans-serif)',
          pointerEvents: 'none',
        }}
      >
        {categoryName}
      </div>

      <div
        className="d-flex align-items-center justify-content-between h-100 p-4 p-md-5 position-relative"
        style={{ zIndex: 2 }}
      >
        <div>
          <span
            className="text-uppercase fw-600 mb-2 d-inline-block"
            style={{
              fontSize: '13px',
              letterSpacing: '2px',
              color: 'var(--tp-theme-primary, #ff3c00)',
            }}
          >
            Service Category
          </span>
          <h3
            className="m-0 text-white tp-ff-sequel-bold-head"
            style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}
          >
            {categoryName}
          </h3>
        </div>
        <div className="d-none d-sm-block text-end">
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

    // If limit is set (e.g. Home page limit=6), select one flagship per category
    if (limit && limit > 0) {
      const seenCategories = new Set<string>();
      const flagshipItems: ServiceItem[] = [];

      for (const item of services) {
        const catSlug =
          item.category_slug ||
          (item.category_name && item.category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) ||
          'general';

        if (!seenCategories.has(catSlug)) {
          seenCategories.add(catSlug);
          flagshipItems.push(item);
          if (flagshipItems.length === limit) break;
        }
      }

      return [
        {
          slug: 'featured-services',
          name: 'Featured Capabilities',
          items: flagshipItems,
        },
      ];
    }

    // When limit is 0 (Services page), group all services under their respective categories
    const groups: Record<string, { name: string; items: ServiceItem[] }> = {};

    for (const item of services) {
      const catName = item.category_name || item.category || 'Core Services';
      const catSlug =
        item.category_slug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      if (!groups[catSlug]) {
        groups[catSlug] = {
          name: catName,
          items: [],
        };
      }
      groups[catSlug].items.push(item);
    }

    return Object.keys(groups).map((slug) => ({
      slug,
      name: groups[slug].name,
      items: groups[slug].items,
    }));
  }, [services, limit]);

  // 3. Fetch Pexels Photography for each service & category banner
  useEffect(() => {
    if (services.length === 0) return;

    let isMounted = true;

    async function fetchPexelsServiceImages() {
      const imgMap: Record<number, string> = {};
      const bannerMap: Record<string, string> = {};

      // Category Banners
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
            // fallback used
          }
        })
      );

      // Service hover cards
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

  // 4. GSAP Hover Interactions allowing overflow on top of other cards
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

  const handleNavigateToServiceDetails = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetPath = `/service-details/${slug}`;
    window.history.pushState({}, '', targetPath);
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
                  <div key={category.slug} className="category-service-group mb-60">
                    {/* Category Top Parallax Banner (shown when divided by category) */}
                    {limit === 0 && (
                      <CategoryBanner
                        categoryName={category.name}
                        categorySlug={category.slug}
                        serviceCount={category.items.length}
                        bannerImage={bannerPhoto}
                      />
                    )}

                    {/* Category Services List Container */}
                    <div
                      className="inner-service-2-wrap about-me-resume-wrap mt-20"
                      style={{ overflow: 'visible' }}
                    >
                      {category.items.map((item, index) => {
                        const serviceSlug = normalizeSlug(item.title, item.service_slug);
                        const displayDateOrCategory =
                          item.subheading ||
                          item.category_name ||
                          item.category ||
                          item.years ||
                          `0${index + 1}`;

                        const photoUrl =
                          serviceImages[item.id] ||
                          (item.category_slug && FALLBACK_CATEGORY_IMAGES[item.category_slug]) ||
                          DEFAULT_IMAGE;

                        const currentRotation = ROTATION_ANGLES[index % ROTATION_ANGLES.length];

                        return (
                          <a
                            key={item.id || serviceSlug || index}
                            id={`service-${serviceSlug}`}
                            href={`/service-details/${serviceSlug}`}
                            data-service-slug={serviceSlug}
                            data-slug={serviceSlug}
                            onClick={(e) => handleNavigateToServiceDetails(serviceSlug, e)}
                            onMouseEnter={(e) => handleMouseEnter(item.id, e)}
                            onMouseMove={(e) => handleMouseMove(item.id, e)}
                            onMouseLeave={(e) => handleMouseLeave(item.id, e)}
                            className="about-me-resume-item tp_fade_anim d-block text-decoration-none position-relative"
                            data-delay=".3"
                            style={{
                              cursor: 'pointer',
                              overflow: 'visible',
                              position: 'relative',
                              zIndex: 1,
                              border: 'none',
                              boxShadow: 'none',
                              outline: 'none',
                            }}
                          >
                            <div
                              className="row align-items-center position-relative"
                              style={{ zIndex: 2 }}
                            >
                              <div className="col-lg-2">
                                <div className="about-me-resume-date mb-30">
                                  <span>{displayDateOrCategory}</span>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="about-me-resume-info ml-40 mb-30">
                                  <h3 className="about-me-resume-title tp-ff-sequel-semi-bold">
                                    <span>{item.title}</span>
                                  </h3>
                                </div>
                              </div>
                              <div className="col-lg-5">
                                <div className="about-me-resume-dec ml-50 mb-30">
                                  <p>{item.description}</p>
                                </div>
                              </div>
                            </div>

                            {/* GSAP Hover Service Image - Vertical Card that overflows freely */}
                            <div
                              ref={(el) => {
                                imageRefs.current[item.id] = el;
                              }}
                              className="service-card-hover-image d-none d-md-block"
                              style={{
                                position: 'absolute',
                                left: '40px',
                                top: '50%',
                                marginTop: '-160px',
                                width: '220px',
                                height: '320px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                opacity: 0,
                                pointerEvents: 'none',
                                zIndex: 50,
                                boxShadow: 'none',
                                border: 'none',
                                outline: 'none',
                                transform: `rotate(${currentRotation})`,
                              }}
                            >
                              <img
                                src={photoUrl}
                                alt={item.title}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  display: 'block',
                                  border: 'none',
                                  boxShadow: 'none',
                                }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  background:
                                    'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                                }}
                              />
                            </div>
                          </a>
                        );
                      })}
                    </div>
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