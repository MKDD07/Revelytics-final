import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchServices, type ServiceItem } from '../../../services/api';
import { searchPexelsPhotos } from '../../../services/pexels';

export interface ServiceSliderProps {
  currentSlug?: string;
  title?: string;
  subtitle?: string;
}

const FALLBACK_IMAGES: Record<string, string> = {
  'web-design': 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
  'web-development': 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
  'api-integration': 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
  'app-development': 'https://images.pexels.com/photos/1092646/pexels-photo-1092646.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
  'e-commerce-solutions': 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
  'digital-marketing': 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop',
};

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&fit=crop';

const ServiceSlider: React.FC<ServiceSliderProps> = ({
  currentSlug,
  title = 'Our Featured Services',
  subtitle = 'Explore All Capabilities',
}) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [serviceImages, setServiceImages] = useState<Record<number, string>>({});
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  // 1. Fetch all services
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const data = await fetchServices();
        if (isMounted && data && data.length > 0) {
          setServices(data);
        }
      } catch (err) {
        console.warn('Failed to load services for slider:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Fetch Pexels photography
  useEffect(() => {
    if (services.length === 0) return;
    let isMounted = true;

    async function loadImages() {
      const imgMap: Record<number, string> = {};
      const usedUrls = new Set<string>();

      for (const s of services) {
        const query = `${s.category_name || s.category || 'technology'} ${s.title} luxury portfolio landscape`;
        try {
          const photos = await searchPexelsPhotos(query, 5, 'landscape');
          if (photos && photos.length > 0) {
            const unique = photos.find((p) => !usedUrls.has(p)) || photos[0];
            imgMap[s.id] = unique;
            usedUrls.add(unique);
          } else if (s.category_slug && FALLBACK_IMAGES[s.category_slug]) {
            imgMap[s.id] = FALLBACK_IMAGES[s.category_slug];
          }
        } catch {
          if (s.category_slug && FALLBACK_IMAGES[s.category_slug]) {
            imgMap[s.id] = FALLBACK_IMAGES[s.category_slug];
          }
        }
      }

      if (isMounted && Object.keys(imgMap).length > 0) {
        setServiceImages((prev) => ({ ...prev, ...imgMap }));
      }
    }

    loadImages();

    return () => {
      isMounted = false;
    };
  }, [services]);

  // 3. Initialize Swiper without pagination
  useEffect(() => {
    if (!sliderRef.current || services.length === 0) return;

    const SwiperConstructor = (window as any).Swiper;
    if (!SwiperConstructor) return;

    if (swiperInstanceRef.current) {
      try {
        swiperInstanceRef.current.destroy(true, true);
      } catch {
        // ignore
      }
    }

    const swiper = new SwiperConstructor(sliderRef.current, {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: services.length > 4,
      grabCursor: true,
      speed: 700,
      navigation: {
        nextEl: '.cs-service-slider-next',
        prevEl: '.cs-service-slider-prev',
      },
      breakpoints: {
        576: {
          slidesPerView: 1.4,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });

    swiperInstanceRef.current = swiper;

    return () => {
      if (swiperInstanceRef.current) {
        try {
          swiperInstanceRef.current.destroy(true, true);
        } catch {
          // ignore
        }
      }
    };
  }, [services]);

  const handleNavigate = (path: string, e: React.MouseEvent) => {
    // Global click listener in App.tsx intercepts internal hrefs and manages Barba transition
  };

  return (
    <div className="cs-portfolio-area revlytics pt-135 pb-100">
      <div className="container">
        {/* Header row with navigation arrows */}
        <div className="row align-items-end mb-60">
          <div className="col-lg-8 col-md-8">
            <div className="tp-section-title-wrap">
              <div className="tp-about-subtitle-wrap mb-10">
                <span className="tp-section-subtitle text-uppercase">{subtitle}</span>
              </div>
              <h2 className="tp-section-title reveal-text fs-72 mb-0">
                {title}
              </h2>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
              <button
                type="button"
                className="cs-service-slider-prev"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                className="cs-service-slider-next"
                aria-label="Next Slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper Slider with cs-portfolio-item card structure */}
        <div className="row">
          <div className="col-12">
            <div ref={sliderRef} className="swiper">
              <div className="swiper-wrapper">
                {services.map((item, index) => {
                  const slug =
                    item.service_slug ||
                    item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  const catName =
                    item.category_name || item.category || 'Service';
                  const photoUrl =
                    serviceImages[item.id] ||
                    (item.category_slug && FALLBACK_IMAGES[item.category_slug]) ||
                    DEFAULT_IMAGE;

                  return (
                    <div key={item.id || index} className="swiper-slide">
                      <div className="cs-portfolio-item cs-portfolio-item-2 anim-zoomin-wrap mb-50">
                        <div className="anim-zoomin-wrap position-relative">
                          {/* Top-Left Category Badge */}
                          <div className="cs-portfolio-badge-wrap">
                            <span className="cs-portfolio-badge">{catName}</span>
                          </div>

                          {/* Image Thumbnail with Overlay Button */}
                          <div
                            className="cs-portfolio-thumb anim-zoomin not-hide-cursor"
                            data-cursor="View<br>Service"
                          >
                            <a
                              className="cursor-hide"
                              href={`/services/${slug}`}
                              onClick={(e) => handleNavigate(`/services/${slug}`, e)}
                            >
                              <img
                                className="w-100"
                                src={photoUrl}
                                alt={item.title}
                              />
                            </a>
                            <a
                              href={`/services/${slug}`}
                              onClick={(e) => handleNavigate(`/services/${slug}`, e)}
                              className="tp-btn tp-btn-sm tp-btn-white-border cs-portfolio-btn-icon"
                              aria-label={`View ${item.title}`}
                            >
                              <i>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
                                    fill="currentColor"
                                  />
                                </svg>
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M0.21967 9.40717C-0.0732232 9.70006 -0.0732232 10.1749 0.21967 10.4678C0.512563 10.7607 0.987437 10.7607 1.28033 10.4678L0.21967 9.40717ZM10.6875 0.75C10.6875 0.335786 10.3517 2.97145e-09 9.9375 1.50485e-07L3.1875 -2.70983e-07C2.77329 -2.70983e-07 2.4375 0.335786 2.4375 0.75C2.4375 1.16421 2.77329 1.5 3.1875 1.5H9.1875V7.5C9.1875 7.91421 9.52329 8.25 9.9375 8.25C10.3517 8.25 10.6875 7.91421 10.6875 7.5L10.6875 0.75ZM0.75 9.9375L1.28033 10.4678L10.4678 1.28033L9.9375 0.75L9.40717 0.21967L0.21967 9.40717L0.75 9.9375Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </i>
                            </a>
                          </div>
                        </div>

                        {/* Title Under Image */}
                        <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                          <h3 className="cs-portfolio-title tp-title-anim tp-title-anim-inner text-white tp-ff-sequel-semi-bold text-uppercase m-0">
                            <a
                              href={`/services/${slug}`}
                              onClick={(e) => handleNavigate(`/services/${slug}`, e)}
                              className="tp-title-text"
                            >
                              {item.title}
                            </a>
                          </h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
