import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { fetchServices, API_BASE_URL, type ServiceItem } from '../../../services/api';
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
  bannerHeight?: string | number; // Configurable Card Size (default: 500px)
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
        minHeight: '450px',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
        willChange: 'transform',
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
        className="service-card-foreground d-flex flex-column justify-content-between h-100 p-4 p-md-5 position-relative"
        style={{ zIndex: 2, willChange: 'opacity, transform' }}
      >
        {/* Top Header Row */}
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 pb-3" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="d-flex align-items-center gap-3">
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                boxShadow: '0 0 12px var(--tp-theme-primary, #ff3c00)',
              }}
            />
            <span
              className="text-uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '2.5px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.75)',
              }}
            >
              Category Showcase
            </span>
          </div>
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '1px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: 500,
            }}
          >
            {serviceCount} {serviceCount === 1 ? 'Capability' : 'Capabilities'}
          </span>
        </div>

        {/* Bottom Content with Heading, Description & Action Button */}
        <div className="row align-items-end g-4 mt-auto pt-4">
          <div className="col-lg-7 col-md-7 col-12">
            <h3
              className="m-0 text-white tp-ff-sequel-bold-head mb-3"
              style={{ fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.1, letterSpacing: '-1px' }}
            >
              {categoryName}
            </h3>
            <a
              href={`/services/${primaryServiceSlug}`}
              onClick={(e) => onNavigate(`/services/${primaryServiceSlug}`, e)}
              className="d-inline-flex align-items-center gap-3 text-decoration-none mt-2 group-hover-link"
              style={{
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
              }}
            >
              <span
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 8px 20px rgba(255, 60, 0, 0.35)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <ArrowUpRight size={20} />
              </span>
              <span>Explore {categoryName}</span>
            </a>
          </div>

          <div className="col-lg-5 col-md-5 col-12">
            <p
              className="text-white m-0"
              style={{
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.78)',
                borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
                paddingLeft: '20px',
              }}
            >
              {description}
            </p>
          </div>
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
  bannerHeight = '500px',
  showCategoryBanner = true,
  showServicesList = true,
}) => {
  const [services, setServices] = useState<ServiceItem[]>(
    initialServices || specialtiesData || []
  );
  const [serviceDetailsMap, setServiceDetailsMap] = useState<Record<string, any>>({});
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});
  const [categoryBanners, setCategoryBanners] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(
    !(initialServices && initialServices.length > 0) &&
    !(specialtiesData && specialtiesData.length > 0)
  );

  const cardHeightStr = useMemo(() => {
    if (typeof bannerHeight === 'number') return `${bannerHeight}px`;
    return bannerHeight || '500px';
  }, [bannerHeight]);

  // 1. Fetch Services & Service Details from D1
  useEffect(() => {
    let isMounted = true;

    async function loadServicesData() {
      try {
        const [servicesData, detailsRes] = await Promise.allSettled([
          fetchServices(),
          fetch(`${API_BASE_URL}/api/service-details`).then((r) => (r.ok ? r.json() : null)),
        ]);

        if (isMounted && servicesData.status === 'fulfilled' && servicesData.value && servicesData.value.length > 0) {
          setServices(servicesData.value);
        }

        if (isMounted && detailsRes.status === 'fulfilled' && detailsRes.value?.data) {
          const detailMap: Record<string, any> = {};
          for (const d of detailsRes.value.data) {
            if (d.slug) {
              detailMap[d.slug] = d;
            }
          }
          setServiceDetailsMap(detailMap);
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

  // 3. Fetch Pexels Photography (High-Quality Original Landscape with Zero Duplicates)
  useEffect(() => {
    if (services.length === 0) return;

    let isMounted = true;

    async function fetchPexelsServiceImages() {
      const imgMap: Record<number, string> = {};
      const bannerMap: Record<string, string> = {};
      const usedUrls = new Set<string>();

      // A. Fetch Category Banners (Landscape)
      await Promise.all(
        categorySections.map(async (cat) => {
          const query = `${cat.name} technology architecture luxury landscape`;
          try {
            const photos = await searchPexelsPhotos(query, 5, 'landscape');
            if (photos && photos.length > 0) {
              const uniquePhoto = photos.find((p) => !usedUrls.has(p)) || photos[0];
              bannerMap[cat.slug] = uniquePhoto;
              usedUrls.add(uniquePhoto);
            } else if (FALLBACK_CATEGORY_IMAGES[cat.slug]) {
              bannerMap[cat.slug] = FALLBACK_CATEGORY_IMAGES[cat.slug];
              usedUrls.add(FALLBACK_CATEGORY_IMAGES[cat.slug]);
            }
          } catch {
            if (FALLBACK_CATEGORY_IMAGES[cat.slug]) {
              bannerMap[cat.slug] = FALLBACK_CATEGORY_IMAGES[cat.slug];
            }
          }
        })
      );

      // B. Fetch Individual Service Card Images (Landscape with dedicated distinct queries to eliminate duplication)
      for (const s of services) {
        const detail = serviceDetailsMap[s.service_slug || ''] || null;
        const pexelsQuery =
          detail?.pexels_query ||
          `${s.category_name || s.category || 'digital'} ${s.title} minimal modern technology workspace`;

        try {
          const photos = await searchPexelsPhotos(pexelsQuery, 8, 'landscape');
          if (photos && photos.length > 0) {
            const uniquePhoto = photos.find((p) => !usedUrls.has(p)) || photos[0];
            imgMap[s.id] = uniquePhoto;
            usedUrls.add(uniquePhoto);
          } else if (s.category_slug && FALLBACK_CATEGORY_IMAGES[s.category_slug]) {
            imgMap[s.id] = FALLBACK_CATEGORY_IMAGES[s.category_slug];
          }
        } catch {
          if (s.category_slug && FALLBACK_CATEGORY_IMAGES[s.category_slug]) {
            imgMap[s.id] = FALLBACK_CATEGORY_IMAGES[s.category_slug];
          }
        }
      }

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
  }, [categorySections, services, serviceDetailsMap]);

  // 4. GSAP Stacking / Sticky Card Animation
  // Fix layout shifts & size auto-changes: Pin each card at its fixed outer container.
  useEffect(() => {
    let ctx: any;
    const timer = setTimeout(() => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      ScrollTrigger.config({ limitCallbacks: true });

      const cards = document.querySelectorAll('.service-stacking-card');
      if (cards.length === 0) return;

      const isDesktop = window.innerWidth >= 992;

      ctx = gsap.context(() => {
        cards.forEach((card: any, index: number) => {
          if (index < cards.length - 1) {
            const nextCard = cards[index + 1];
            const thirdCard = index + 2 < cards.length ? cards[index + 2] : null;
            const bgImg = card.querySelector('img');
            const content = card.querySelector('.service-card-foreground');

            // Stage 1: Card pinning and 1st scale transition
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top top+=90',
                endTrigger: nextCard,
                end: 'top top+=90',
                pin: true,
                pinSpacing: false,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            tl.to(
              card,
              {
                scale: isDesktop ? 0.84 : 0.92,
                yPercent: isDesktop ? -4 : -2,
                transformOrigin: 'top center',
                ease: 'none',
              },
              0
            );

            if (bgImg) {
              tl.to(
                bgImg,
                {
                  scale: 1.05,
                  filter: 'brightness(0.45) saturate(0.85)',
                  ease: 'none',
                },
                0
              );
            }

            if (content) {
              tl.to(
                content,
                {
                  opacity: 0.45,
                  ease: 'none',
                },
                0
              );
            }

            // Stage 2: When 3rd card arrives, scale top card to 70%
            if (thirdCard && isDesktop) {
              const tl2 = gsap.timeline({
                scrollTrigger: {
                  trigger: nextCard,
                  start: 'top top+=90',
                  endTrigger: thirdCard,
                  end: 'top top+=90',
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              });

              tl2.to(
                card,
                {
                  scale: 0.7,
                  yPercent: -7,
                  opacity: 0.5,
                  transformOrigin: 'top center',
                  ease: 'none',
                },
                0
              );

              if (content) {
                tl2.to(
                  content,
                  {
                    opacity: 0.25,
                    ease: 'none',
                  },
                  0
                );
              }
            }
          }
        });
        ScrollTrigger.refresh();
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [categorySections, services, showCategoryBanner, showServicesList]);

  const handleNavigate = (path: string, e: React.MouseEvent) => {
    // Global click listener in App.tsx intercepts internal hrefs and manages Barba transition
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
              <div className="services-stacked-container mt-30">
                {/* Optional Category Banners (if showCategoryBanner is enabled) */}
                {showCategoryBanner &&
                  categorySections.map((category) => {
                    const bannerPhoto =
                      categoryBanners[category.slug] ||
                      FALLBACK_CATEGORY_IMAGES[category.slug] ||
                      DEFAULT_IMAGE;

                    return (
                      <div
                        key={`cat-banner-${category.slug}`}
                        className="service-card-wrapper w-100"
                        style={{ marginBottom: 'clamp(40px, 15vw, 250px)' }}
                      >
                        <div
                          className="service-stacking-card w-100"
                          style={{
                            height: '500px',
                            borderRadius: '28px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                            willChange: 'transform',
                            transformOrigin: 'top center',
                            backgroundColor: '#09090b',
                          }}
                        >
                          <CategoryBanner
                            categoryName={category.name}
                            categorySlug={category.slug}
                            primaryServiceSlug={category.primaryServiceSlug}
                            serviceCount={category.items.length}
                            bannerImage={bannerPhoto}
                            height="500px"
                            onNavigate={handleNavigate}
                          />
                        </div>
                      </div>
                    );
                  })}

                {/* All Individual Service Cards Rendered Directly One After Another */}
                {showServicesList &&
                  services.map((item, index) => {
                    const serviceSlug = normalizeSlug(item.title, item.service_slug);
                    const displayCategory =
                      item.subheading ||
                      item.category_name ||
                      item.category ||
                      'Core Service';

                    const photoUrl =
                      serviceImages[item.id] ||
                      (item.category_slug && FALLBACK_CATEGORY_IMAGES[item.category_slug]) ||
                      DEFAULT_IMAGE;

                    const numStr = String(index + 1).padStart(2, '0');

                    const detailData = serviceDetailsMap[serviceSlug] || serviceDetailsMap[item.service_slug || ''] || null;

                    // Parse features if available from service_details D1 table
                    let featureList: string[] = [];
                    if (detailData?.features) {
                      try {
                        featureList = typeof detailData.features === 'string' ? JSON.parse(detailData.features) : detailData.features;
                      } catch {
                        if (typeof detailData.features === 'string') {
                          featureList = detailData.features.split(',').map((f: string) => f.trim()).filter(Boolean);
                        }
                      }
                    }

                    const detailedPara =
                      item.description ||
                      detailData?.meta_description ||
                      `Audit and enrich ${item.title} with high-converting digital assets, scalable architectures, and strategic customer conversion frameworks.`;

                    const isLastCard = index === services.length - 1;
                    const catSlug = item.category_slug || (item.category_name || item.category || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

                    return (
                      <div
                        key={item.id || serviceSlug || index}
                        id={`service-wrapper-${serviceSlug}`}
                        data-category-slug={catSlug}
                        className="service-card-wrapper w-100"
                        style={{ marginBottom: isLastCard ? '0px' : 'clamp(40px, 15vw, 250px)' }}
                      >
                        <div
                          className="service-stacking-card w-100 position-relative fix"
                          id={`service-${serviceSlug}`}
                          data-service-slug={serviceSlug}
                          data-category-slug={catSlug}
                          data-slug={serviceSlug}
                          style={{
                            height: '500px',
                            borderRadius: '28px',
                            overflow: 'hidden',
                            position: 'relative',
                            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                            willChange: 'transform',
                            transformOrigin: 'top center',
                            backgroundColor: '#09090b',
                          }}
                        >
                        {/* Background Image with Cinematic Depth */}
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
                            filter: 'brightness(0.68) saturate(1.15)',
                          }}
                        />

                        {/* Multi-layered Cinematic Gradient Vignette */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(135deg, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.65) 45%, rgba(9, 9, 11, 0.9) 100%)',
                            pointerEvents: 'none',
                          }}
                        />

                        {/* Decorative Watermark Monogram */}
                        <div
                          className="category-watermark-text position-absolute user-select-none pointer-events-none d-none d-md-block"
                          style={{
                            right: '-10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: 'clamp(90px, 13vw, 190px)',
                            fontWeight: 900,
                            lineHeight: 0.8,
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                            color: 'rgba(255, 255, 255, 0.035)',
                            zIndex: 1,
                            letterSpacing: '-4px',
                            fontFamily: 'var(--tp-ff-sequel-bold, sans-serif)',
                            pointerEvents: 'none',
                          }}
                        >
                          {numStr}
                        </div>

                        {/* Foreground Content */}
                        <div
                          className="service-card-foreground d-flex flex-column justify-content-between h-100 p-4 p-md-5 position-relative"
                          style={{ zIndex: 2, willChange: 'opacity, transform' }}
                        >
                          {/* Top Header Row: Category Badge & Features Indicator */}
                          <div
                            className="d-flex align-items-center justify-content-between flex-wrap gap-3 pb-3"
                            style={{
                              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: 'var(--tp-theme-primary, #ff3c00)',
                                  boxShadow: '0 0 10px var(--tp-theme-primary, #ff3c00)',
                                }}
                              />
                              <span
                                className="text-uppercase"
                                style={{
                                  fontSize: '12px',
                                  letterSpacing: '2.5px',
                                  fontWeight: 600,
                                  color: 'rgba(255, 255, 255, 0.85)',
                                }}
                              >
                                {displayCategory}
                              </span>
                            </div>

                            <div className="d-flex align-items-center gap-3">
                              {detailData?.why_choose_subtitle && (
                                <span
                                  className="d-none d-md-inline-flex align-items-center gap-1 text-white-50"
                                  style={{ fontSize: '13px', letterSpacing: '0.5px' }}
                                >
                                  <Sparkles size={13} color="var(--tp-theme-primary, #ff3c00)" />
                                  {detailData.why_choose_subtitle}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Bottom Content: Title & Action Left | Editorial Description & Features Right */}
                          <div className="row align-items-end g-4 mt-auto pt-3">
                            {/* Left Column: Heading & Button */}
                            <div className="col-lg-6 col-md-6 col-12">
                              <h3
                                className="m-0 text-white tp-ff-sequel-bold-head mb-4"
                                style={{
                                  fontSize: 'clamp(28px, 3.4vw, 46px)',
                                  lineHeight: 1.15,
                                  letterSpacing: '-1px',
                                }}
                              >
                                {item.title}
                              </h3>

                              <a
                                href={`/service-details/${serviceSlug}`}
                                onClick={(e) => handleNavigate(`/service-details/${serviceSlug}`, e)}
                                className="d-inline-flex align-items-center gap-3 text-decoration-none group-hover-link"
                                style={{
                                  color: '#ffffff',
                                  fontSize: '15px',
                                  fontWeight: 600,
                                  letterSpacing: '0.5px',
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <span
                                  style={{
                                    width: '46px',
                                    height: '46px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ffffff',
                                    color: '#000000',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--tp-theme-primary, #ff3c00)';
                                    e.currentTarget.style.color = '#ffffff';
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.color = '#000000';
                                    e.currentTarget.style.transform = 'scale(1)';
                                  }}
                                >
                                  <ArrowUpRight size={20} />
                                </span>
                                <span style={{ opacity: 0.9 }}>Explore Full Scope</span>
                              </a>
                            </div>

                            {/* Right Column: Editorial Paragraph with Left Glowing Border & Optional Features */}
                            <div className="col-lg-6 col-md-6 col-12">
                              <div
                                className="service-card-right-desc position-relative"
                                style={{
                                  borderLeft: '2px solid rgba(255, 60, 0, 0.65)',
                                  paddingLeft: '24px',
                                  transition: 'border-color 0.3s ease',
                                }}
                              >
                                <p
                                  className="m-0 mb-3"
                                  style={{
                                    fontSize: 'clamp(14px, 1.1vw, 16px)',
                                    lineHeight: 1.7,
                                    color: 'rgba(255, 255, 255, 0.88)',
                                    fontWeight: 400,
                                  }}
                                >
                                  {detailedPara}
                                </p>

                                {/* Key Capabilities / Features Pills from D1 */}
                                {featureList.length > 0 && (
                                  <div className="d-flex flex-wrap gap-2 mt-3 pt-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                    {featureList.slice(0, 3).map((feat, fIdx) => (
                                      <span
                                        key={fIdx}
                                        className="d-inline-flex align-items-center gap-1 text-white"
                                        style={{
                                          fontSize: '12px',
                                          padding: '4px 10px',
                                          letterSpacing: '0.3px',
                                        }}
                                      >
                                        <CheckCircle2 size={12} color="var(--tp-theme-primary, #ff3c00)" />
                                        {feat}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSpecialties;