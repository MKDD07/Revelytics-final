import React from 'react';
import { getPexelsImage } from '../../utils';

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
    tagLink: '#',
    title: 'Transforming Direct Hotel Bookings in 2025.',
    link: '#',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Luxury Resort Booking Strategy',
    fadeFrom: 'left',
  },
  {
    id: 2,
    tag: 'UI/UX Design',
    tagLink: '#',
    title: 'Crafting Immersive Destination Web Experiences.',
    link: '#',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Travel Platform UI Design',
    fadeFrom: 'bottom',
  },
  {
    id: 3,
    tag: 'Brand Strategy',
    tagLink: '#',
    title: 'Building Modern Identities for Boutique Resorts.',
    link: '#',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    alt: 'Boutique Hotel Brand Identity',
    fadeFrom: 'right',
  },
];

const Blog1: React.FC<Blog1Props> = ({
  title = 'Travel Insights & Articles',
  allArticlesLink = '#',
  allArticlesText = 'All Articles',
  posts = DEFAULT_BLOG_POSTS,
}) => {
  return (
    <div className="cs-blog-thumb-area pt-135 pb-115">
      <div className="container">
        <div className="row align-items-end">
          {/* Header Title */}
          <div className="col-lg-9">
            <div className="cs-blog-title-wrap mb-60">
              <h2 className="cs-section-title tp-ff-sequel-semi-bold reveal-text tp-color-primary">
                {title}
              </h2>
            </div>
          </div>

          {/* View All Button */}
          <div className="col-lg-3">
            <div
              className="cs-blog-btn-wrap text-lg-end mb-80 tp_fade_anim"
              data-delay=".4"
              data-fade-from="bottom"
              data-ease="bounce"
            >
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

          {/* Dynamic Post Cards */}
          {posts.map((post, idx) => {
            const imgSrc =
              post.image ||
              getPexelsImage(post.imageQuery || 'travel blog', post.imageIndex ?? idx, {
                width: 800,
                height: 550,
              });

            return (
              <div className="col-lg-4 col-md-6 " key={post.id || idx}>
                <div
                  className="cs-blog-item mb-40 cs-portfolio-item tp_fade_anim"
                  data-delay=".4"
                  data-fade-from={post.fadeFrom || 'bottom'}
                  data-ease="bounce"
                >
                  <div className="cs-blog-thumb fix p-relative mb-25" style={{ borderRadius: 32, overflow: 'hidden' }}>
                    <img
                      className="w-100"
                      src={imgSrc}
                      alt={post.alt || `${post.tag} Article`}
                      style={{ borderRadius: 12, height: 360, objectFit: 'cover' }}
                    />
                    <a href={post.tagLink || '#'} className="cs-blog-tag">
                      {post.tag}
                    </a>
                  </div>
                  <h4 className="cs-blog-title" style={{ color: 'var(--tp-common-white)' }}>
                    <a href={post.link || '#'}>
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
  );
};

export default Blog1;
