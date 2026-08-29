import React, { useEffect, useState } from 'react';
import { fetchRevDbArticles, type RevDbItem } from '../../../services/api';

// ==================================================
// START: Grid — Dynamic blog cards from Cloudflare D1 rev_db
// ==================================================

// Fallback articles shown before the API responds
const FALLBACK_ARTICLES: RevDbItem[] = [
  {
    id: 1,
    page_name: 'travel-marketing-insights',
    slug: 'mastering-travel-digital-marketing-growth-guide',
    heading: 'Mastering Travel Digital Marketing: Strategies to Drive Bookings in 2026',
    subheading:
      'From immersive storytelling to hyper-local SEO, discover how modern travel brands turn wandering dreamers into paying travelers.',
    category: 'Digital Marketing',
    author: 'Elena Rostova',
    date: '2026-08-25',
    image_url: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
  {
    id: 2,
    page_name: 'hospitality-tech-ux',
    slug: 'transforming-direct-hotel-bookings-2025',
    heading: 'Transforming Direct Hotel Bookings in 2025: Tech & UX Playbook',
    subheading: 'How boutique hotels and luxury resorts reduce OTA dependency with seamless mobile booking flows.',
    category: 'Hospitality Tech',
    author: 'Vikram Mehta',
    date: '2026-08-26',
    image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
  {
    id: 3,
    page_name: 'destination-branding',
    slug: 'building-modern-identities-boutique-resorts',
    heading: 'Building Modern Identities for Boutique Resorts & Villas',
    subheading: 'Crafting luxury visual identity and experiential marketing that resonate with global travelers.',
    category: 'Brand Strategy',
    author: 'Aria Chen',
    date: '2026-08-27',
    image_url: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
  {
    id: 4,
    page_name: 'travel-performance-ads',
    slug: 'scaling-high-roas-campaigns-luxury-stays',
    heading: 'Scaling High-ROAS Meta & Google Campaigns for Stays',
    subheading: 'Precision audience targeting and multi-variant creative testing to maximize booking revenue.',
    category: 'Performance Ads',
    author: 'Sarah Jenkins',
    date: '2026-08-28',
    image_url: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
  {
    id: 5,
    page_name: 'ai-hospitality-automation',
    slug: 'automating-guest-inquiries-ai-concierge',
    heading: 'Automating Guest Inquiries with Intelligent AI Concierge',
    subheading: 'Empower hotel operations with 24/7 autonomous guest assistance and instant booking recommendations.',
    category: 'AI Solutions',
    author: 'Devon Lee',
    date: '2026-08-28',
    image_url: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
  {
    id: 6,
    page_name: 'hospitality-seo-authority',
    slug: 'dominating-local-destination-keywords',
    heading: 'Dominating Local & Destination Keywords for Luxury Villas',
    subheading: 'Organic search strategy to rank #1 on Google for high-intent destination search queries.',
    category: 'Search Authority',
    author: 'Carlos Ramos',
    date: '2026-08-29',
    image_url: 'https://images.pexels.com/photos/221457/pexels-photo-221457.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
  },
];

const Grid = () => {
  const [articles, setArticles] = useState<RevDbItem[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchRevDbArticles();
        if (isMounted && data && data.length > 0) {
          setArticles(data);
        }
      } catch {
        // keep fallback
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  const handleCardClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    window.history.pushState({}, '', `/blog-details/${slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <>
      {/* Blog Grid Area */}
      <div className="mp-blog-area pb-95">
        <div className="container">
          {loading && articles.length === 0 && (
            <div className="text-center py-5" style={{ opacity: 0.5 }}>Loading articles…</div>
          )}
          <div className="row">
            {articles.map((article, idx) => (
              <div key={article.id ?? idx} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6">
                <div
                  className="mp-blog-item tp-hover-item mb-55 tp_fade_anim"
                  data-delay={`.${3 + idx}`}
                >
                  <a
                    href={`/blog-details/${article.slug}`}
                    onClick={(e) => handleCardClick(e, article.slug)}
                    className="mp-blog-thumb mb-25 p-relative fix d-block"
                  >
                    <div
                      className="tp-hover-img"
                      data-displacement="assets/img/imghover/fluid.jpg"
                      data-intensity="0.2"
                      data-speedin="1"
                      data-speedout="1"
                    >
                      <img
                        className="w-100"
                        src={
                          article.image_url ||
                          'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop'
                        }
                        alt={article.heading}
                        style={{ height: '260px', objectFit: 'cover' }}
                      />
                    </div>
                  </a>
                  <div className="mp-blog-content">
                    {article.category && (
                      <div className="mp-blog-meta mb-10">
                        <span className="mp-blog-tag">{article.category}</span>
                      </div>
                    )}
                    <h2 className="mp-blog-title tp-ff-sequel-semi-bold mb-10">
                      <a
                        href={`/blog-details/${article.slug}`}
                        onClick={(e) => handleCardClick(e, article.slug)}
                        className="common-underline"
                      >
                        {article.heading}
                      </a>
                    </h2>
                    {article.subheading && (
                      <p
                        className="mp-blog-excerpt mb-15"
                        style={{ fontSize: '14px', opacity: 0.7 }}
                      >
                        {article.subheading}
                      </p>
                    )}
                    <span className="mp-blog-date">
                      <span>By</span> {article.author || 'Revlytics'} - {article.date || '2026'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Grid;

// ==================================================
// END: Grid
// ==================================================
