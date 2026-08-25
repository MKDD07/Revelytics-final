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
];

const Grid = () => {
  const [articles, setArticles] = useState<RevDbItem[]>(FALLBACK_ARTICLES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const data = await fetchRevDbArticles();
        if (isMounted && data.length > 0) {
          setArticles(data);
        }
      } catch {
        // keep fallback
      } finally {
        if (isMounted) setLoading(false);
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
