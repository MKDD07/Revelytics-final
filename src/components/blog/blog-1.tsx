import React, { useEffect, useRef, useState } from 'react';
import { getPexelsImage } from '../../utils';
import { fetchRevDbArticles, fetchBlogs } from '../../services/api';

export interface BlogPost {
  id: string | number;
  tag: string;
  tagLink?: string;
  title: string;
  link?: string;
  image?: string;
  imageQuery?: string;
  imageIndex?: number;
  fadeFrom?: 'left' | 'bottom' | 'right';
  alt?: string;
}

export interface Blog1Props {
  title?: string;
  allArticlesLink?: string;
  allArticlesText?: string;
  posts?: BlogPost[];
}

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    tag: 'Hospitality Tech',
    tagLink: '#blog',
    title: 'Transforming Direct Hotel Bookings in 2025.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Luxury Resort Booking Strategy',
    fadeFrom: 'left',
  },
  {
    id: 2,
    tag: 'UI/UX Design',
    tagLink: '#blog',
    title: 'Crafting Immersive Destination Web Experiences.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Travel Platform UI Design',
    fadeFrom: 'bottom',
  },
  {
    id: 3,
    tag: 'Brand Strategy',
    tagLink: '#blog',
    title: 'Building Modern Identities for Boutique Resorts.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Boutique Hotel Brand Identity',
    fadeFrom: 'right',
  },
  {
    id: 4,
    tag: 'Performance Ads',
    tagLink: '#blog',
    title: 'Scaling High-ROAS Meta & Google Campaigns for Stays.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Hospitality Performance Marketing',
    fadeFrom: 'bottom',
  },
  {
    id: 5,
    tag: 'AI Solutions',
    tagLink: '#blog',
    title: 'Automating Guest Inquiries with Intelligent AI Concierge.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'AI Hospitality Automation',
    fadeFrom: 'left',
  },
  {
    id: 6,
    tag: 'Search Authority',
    tagLink: '#blog',
    title: 'Dominating Local & Destination Keywords for Villas.',
    link: '#blog-details',
    image: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Hospitality SEO Growth',
    fadeFrom: 'right',
  },
];

const Blog1: React.FC<Blog1Props> = ({
  title = 'Travel Insights & Articles',
  allArticlesLink = '#blog',
  allArticlesText = 'All Articles',
  posts: initialPosts,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || DEFAULT_BLOG_POSTS);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<any>(null);

  // Fetch live articles from Cloudflare D1 database (rev_db / blogs)
  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) {
      setPosts(initialPosts);
      return;
    }

    let isMounted = true;
    async function loadLiveBlogs() {
      try {
        const articles = await fetchRevDbArticles();
        if (isMounted && articles && articles.length > 0) {
          const mapped: BlogPost[] = articles.map((art, idx) => ({
            id: art.id || art.slug || idx + 1,
            tag: art.category || 'Travel Insights',
            tagLink: '#blog',
            title: art.heading || 'Travel Industry Insight',
            link: `/blog-details/${art.slug}`,
            image:
              art.image_url ||
              'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
            alt: art.heading,
            fadeFrom: idx % 3 === 0 ? 'left' : idx % 3 === 1 ? 'bottom' : 'right',
          }));
          setPosts(mapped);
          return;
        }

        const blogs = await fetchBlogs();
        if (isMounted && blogs && blogs.length > 0) {
          const mapped: BlogPost[] = blogs.map((b, idx) => ({
            id: b.id || b.slug || idx + 1,
            tag: b.tag || 'Travel Insights',
            tagLink: '#blog',
            title: b.title || 'Travel Industry Insight',
            link: `/blog-details/${b.slug || b.id}`,
            image:
              b.image_url ||
              'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
            alt: b.title,
            fadeFrom: idx % 3 === 0 ? 'left' : idx % 3 === 1 ? 'bottom' : 'right',
          }));
          setPosts(mapped);
        }
      } catch (err) {
        console.warn('Failed to load live blogs from Cloudflare D1:', err);
      }
    }

    loadLiveBlogs();
    return () => {
      isMounted = false;
    };
  }, [initialPosts]);

  useEffect(() => {
    const initSwiper = () => {
      const SwiperClass = (window as any).Swiper;
      if (SwiperClass && swiperContainerRef.current) {
        if (swiperInstanceRef.current && typeof swiperInstanceRef.current.destroy === 'function') {
          swiperInstanceRef.current.destroy(true, true);
        }

        swiperInstanceRef.current = new SwiperClass(swiperContainerRef.current, {
          slidesPerView: 1.2,
          spaceBetween: 16,
          loop: posts.length > 3,
          grabCursor: true,
          speed: 700,
          autoplay: {
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          },
          navigation: {
            prevEl: '.cs-blog-slider-prev',
            nextEl: '.cs-blog-slider-next',
          },
          breakpoints: {
            0: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          },
        });
      }
    };

    const timer = setTimeout(initSwiper, 100);

    return () => {
      clearTimeout(timer);
      if (swiperInstanceRef.current && typeof swiperInstanceRef.current.destroy === 'function') {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [posts]);

  return (
    <div className="cs-blog-thumb-area pt-135 pb-115">
      <div className="container">
        {/* Header Row */}
        <div className="row align-items-end mb-60">
          {/* Header Title */}
          <div className="col-lg-7 col-md-8">
            <div className="cs-blog-title-wrap">
              <h2 className="cs-section-title tp-ff-sequel-semi-bold reveal-text tp-color-primary fs-72">
                {title}
              </h2>
            </div>
          </div>

          {/* Action Buttons & Navigation Arrows */}
          <div className="col-lg-5 col-md-4">
            <div className="d-flex align-items-center justify-content-md-end gap-3 mb-20 flex-wrap">
              {/* Slider Arrows */}
              <div className="cs-blog-arrows d-flex align-items-center gap-2">
                <button
                  type="button"
                  className="cs-blog-slider-prev tp-btn"
                  aria-label="Previous Slide"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--tp-common-white)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className="fa-regular fa-arrow-left" style={{ fontSize: '15px' }} />
                </button>
                <button
                  type="button"
                  className="cs-blog-slider-next tp-btn"
                  aria-label="Next Slide"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--tp-common-white)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <i className="fa-regular fa-arrow-right" style={{ fontSize: '15px' }} />
                </button>
              </div>

              {/* View All Button */}
              <div className="cs-blog-btn-wrap tp_fade_anim" data-delay=".4" data-fade-from="bottom">
                <a className="tp-btn tp-ff-inter text-uppercase" href={allArticlesLink}>
                  <span>
                    <span className="text-1">{allArticlesText}</span>
                    <span className="text-2">{allArticlesText}</span>
                  </span>
                  <i>
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
          </div>
        </div>

        {/* Swiper Slider Container */}
        <div ref={swiperContainerRef} className="swiper cs-blog-swiper-active" style={{ overflow: 'hidden' }}>
          <div className="swiper-wrapper">
            {posts.map((post, idx) => {
              const imgSrc =
                post.image ||
                getPexelsImage(post.imageQuery || 'travel blog', post.imageIndex ?? idx, {
                  width: 800,
                  height: 550,
                });

              return (
                <div key={post.id || idx} className="swiper-slide">
                  <div
                    className="cs-blog-item mb-40 cs-portfolio-item"
                    style={{ height: '100%' }}
                  >
                    <div className="cs-blog-thumb fix p-relative mb-25" style={{ borderRadius: 24, overflow: 'hidden' }}>
                      <a
                        href={post.link || '#blog-details'}
                        onClick={(e) => {
                          if (post.link && (post.link.startsWith('/blog') || post.link.startsWith('/blog-details'))) {
                            e.preventDefault();
                            window.history.pushState({}, '', post.link);
                            window.dispatchEvent(new PopStateEvent('popstate'));
                          }
                        }}
                        style={{ display: 'block' }}
                      >
                        <img
                          className="w-100"
                          src={imgSrc}
                          alt={post.alt || `${post.tag} Article`}
                          style={{
                            borderRadius: 24,
                            height: 340,
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'transform 0.5s ease',
                          }}
                        />
                      </a>
                      <a href={post.tagLink || '#blog'} className="cs-blog-tag">
                        {post.tag}
                      </a>
                    </div>
                    <h4 className="cs-blog-title" style={{ color: 'var(--tp-common-white)' }}>
                      <a
                        href={post.link || '#blog-details'}
                        onClick={(e) => {
                          if (post.link && (post.link.startsWith('/blog') || post.link.startsWith('/blog-details'))) {
                            e.preventDefault();
                            window.history.pushState({}, '', post.link);
                            window.dispatchEvent(new PopStateEvent('popstate'));
                          }
                        }}
                      >
                        {post.title}
                      </a>
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog1;
