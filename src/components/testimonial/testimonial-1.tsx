import React, { useEffect } from 'react';
import { getPexelsImageQualityUrl } from '../../services/pexels';

// ==================================================
// START: Testimonial1
// Indian Executive Testimonials for Digital Marketing Services
// ==================================================

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  badge: string;
  comment: string;
}

const INDIAN_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Aarav Sharma',
    role: 'Chief Marketing Officer',
    company: 'LuxeStay Hospitality India',
    avatarUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'sd'),
    rating: 5,
    badge: 'Performance Marketing & Direct Acquisition',
    comment:
      'Revlytics transformed our paid search and Meta advertising engine. Within 4 months, our direct resort bookings grew by 240% across Mumbai, Goa, and Jaipur, while reducing our overall CAC by 38%.',
  },
  {
    id: 'test-2',
    name: 'Priya Sundaram',
    role: 'Founder & Managing Director',
    company: 'Vedic Aura Wellness',
    avatarUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg', 'sd'),
    rating: 5,
    badge: 'Enterprise SEO & Content Authority',
    comment:
      'Their organic search optimization and bespoke brand storytelling catapulted our D2C products to rank #1 nationwide. The depth of analytics and ROI transparency they provide sets a new industry standard.',
  },
  {
    id: 'test-3',
    name: 'Rohan Singhania',
    role: 'VP of Growth & Strategy',
    company: 'FinPulse Technologies Bangalore',
    avatarUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg', 'sd'),
    rating: 5,
    badge: 'Full-Funnel Demand Generation',
    comment:
      'From programmatic retargeting to conversion rate optimization, Revlytics doubled our pipeline velocity. They operate seamlessly as an elite extension of our internal digital marketing and growth team.',
  },
  {
    id: 'test-4',
    name: 'Ananya Deshmukh',
    role: 'Head of Digital Commerce',
    company: 'Ziba Couture Retail',
    avatarUrl: getPexelsImageQualityUrl('https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg', 'sd'),
    rating: 5,
    badge: 'Omnichannel Ad Scaling & ROAS',
    comment:
      'Our festive campaign ROAS scaled from 2.4x to an incredible 6.8x. Their algorithmic ad creatives and rapid multi-variant testing consistently generate record-breaking revenues season after season.',
  },
];

const Testimonial1: React.FC = () => {
  useEffect(() => {
    const SwiperClass = (window as any).Swiper;
    if (SwiperClass) {
      const swiperInstance = new SwiperClass('.ca-testimonial-slider-active', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        speed: 900,
        spaceBetween: 0,
        pagination: {
          el: '.ca-testimonial-pagination',
          type: 'progressbar',
        },
        navigation: {
          prevEl: '.ca-testimonial-arrow-prev',
          nextEl: '.ca-testimonial-arrow-next',
        },
      });

      return () => {
        if (swiperInstance && typeof swiperInstance.destroy === 'function') {
          swiperInstance.destroy(true, true);
        }
      };
    }
  }, []);

  return (
    <>
      {/* Testimonial Section */}
      <div className="ca-testimonial-area pt-135 pb-155" style={{ backgroundColor: '#09090b' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <div className="ca-testimonial-title-wrap mb-30">
                <div className="ca-testimonial-review mb-15">
                  <h3 className="ca-testimonial-ratings tp-ff-inter p-relative reveal-text">
                    4.4
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.55951 0L10.5801 6.21885H17.119L11.829 10.0623L13.8496 16.2812L8.55951 12.4377L3.26944 16.2812L5.29007 10.0623L9.53674e-07 6.21885H6.53888L8.55951 0Z"
                        fill="#F9A811"
                      />
                    </svg>
                  </h3>
                  <span className="ca-testimonial-review-count">120+ Verified Client Reviews</span>
                </div>
                <h2 className="ca-section-title fs-52 text-white mb-115 reveal-text">
                  Accelerating high-growth brands through data-driven digital marketing.
                </h2>
                <div className="ca-testimonial-navigation">
                  <span className="ca-testimonial-arrow-prev" role="button" aria-label="Previous review">
                    <i className="fa-solid fa-arrow-left" />
                  </span>
                  <span className="ca-testimonial-arrow-next" role="button" aria-label="Next review">
                    <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-7">
              <div className="p-relative">
                <span className="ca-testimonial-bg-transparent" />
                <div className="ca-testimonial-slider-wrap p-relative mb-30">
                  <span className="ca-testimonial-pagination" />
                  <div className="swiper ca-testimonial-slider-active">
                    <div className="swiper-wrapper">
                      {INDIAN_TESTIMONIALS.map((item) => (
                        <div key={item.id} className="swiper-slide">
                          <div className="ca-testimonial-item text-center">
                            {/* Author Portrait Avatar */}
                            <div className="ca-testimonial-avatar mb-25 d-flex justify-content-center">
                              <img
                                src={item.avatarUrl}
                                alt={item.name}
                                className="rounded-circle"
                                style={{
                                  width: '80px',
                                  height: '80px',
                                  objectFit: 'cover',
                                  border: '3px solid rgba(255, 255, 255, 0.2)',
                                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
                                  display: 'block',
                                }}
                              />
                            </div>
                            <span className="ca-testimonial-reviewed d-block mb-10 text-uppercase" style={{ letterSpacing: '0.08em' }}>
                              {item.badge}
                            </span>
                            <p className="ca-testimonial-comment mb-30">
                              &ldquo;{item.comment}&rdquo;
                            </p>
                            <div className="ca-testimonial-author-name">
                              <b>{item.name}</b>
                              <span className="d-block mt-1">
                                {item.role} &bull; {item.company}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ca-testimonial-area-end */}
    </>
  );
};

export default Testimonial1;

// ==================================================
// END: Testimonial1
// ==================================================

