import React, { useEffect, useState } from 'react';
import {
  fetchRevDbHeading,
  fetchRevDbBySlug,
  fetchRevDbComments,
  fetchRevDbCategories,
  fetchPexelsPhotos,
  submitRevDbComment,
  type RevDbItem,
  type RevDbComment,
  type RevDbCategory,
  type SectionH2Para,
  DEFAULT_BLOG_CATEGORIES,
} from '../../../services/api';

// ==================================================
// START: Postbox Article Area (from Cloudflare D1 `rev_db`)
// Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
// ==================================================

interface PostboxProps {
  slug?: string;
}

const DEFAULT_BLOCKS: SectionH2Para[] = [
  {
    h2: '1. Master Google Business Profile (GBP) Completeness',
    paragraph:
      'Populate every secondary category, list accurate seasonal opening hours, update direct ticketing links, and post high-resolution weekly photo updates.',
  },
  {
    h2: '2. Implement High-Frequency Review Capture Systems',
    paragraph:
      'Set up automated SMS or on-site QR cards encouraging happy guests to leave keyword-rich reviews mentioning specific guides, dishes, or amenities.',
  },
  {
    h2: '3. Add Structured LocalBusiness and TouristAttraction Schema',
    paragraph:
      'Deploy rich snippet schema markup across your site with explicit geo-coordinates, price ranges, verified reviews, and accepted payment types.',
  },
  {
    h2: '4. Build Hyper-Local Landmark Vicinity Pages',
    paragraph:
      'Create localized landing pages optimized for location landmarks, such as "boutique hotel near Colosseum" or "kayak rental by marina pier."',
  },
  {
    h2: '5. Optimize for Voice Search and Spontaneous Conversions',
    paragraph:
      'Answer conversational, intent-based FAQ queries like "where can I rent bikes without a reservation" to capture direct voice search traffic on mobile devices.',
  },
];

const DEFAULT_PARAGRAPH =
  'In-destination travelers use mobile search for immediate solutions: "best walking tour right now" or "seafood restaurant with view near me." Optimizing your Google Business Profile, localized schema, and geotargeted review velocity secures high-intent spontaneous revenue.';

const DEFAULT_QUOTE =
  'If you are invisible on Google Maps when a tourist steps outside their hotel, you do not exist to them.';
const DEFAULT_QUOTE_AUTHOR = 'Marco Moretti';

const DEFAULT_COMMENTS: RevDbComment[] = [
  {
    id: 1,
    rev_id: 1,
    author_name: 'Marcus Vance',
    author_email: 'marcus.vance@triphub.com',
    comment_text:
      'Spot on about short-form video. Our micro-itinerary Reels saw a 40% increase in direct inquiries this summer.',
    status: 'approved',
    created_at: '5 minutes ago',
  },
  {
    id: 2,
    rev_id: 1,
    author_name: 'Amina Patel',
    author_email: 'amina@wanderlustmedia.io',
    comment_text:
      'Destination-first SEO has been our biggest growth driver. Niche itinerary guides convert far better than broad city keywords.',
    status: 'approved',
    created_at: '3 minutes ago',
  },
  {
    id: 3,
    rev_id: 1,
    author_name: 'Julian Rossi',
    author_email: 'j.rossi@boutiquevillas.it',
    comment_text:
      'The point about mobile checkout friction is critical. Adding one-click digital wallets reduced our drop-off rate by 22%.',
    status: 'approved',
    created_at: '30 seconds ago',
  },
  {
    id: 4,
    rev_id: 1,
    author_name: 'Chloe Bennett',
    author_email: 'chloe@bennetttravel.com',
    comment_text:
      'Great breakdown! How often do you recommend updating seasonal destination hubs for SEO freshness?',
    status: 'approved',
    created_at: 'Just now',
  },
  {
    id: 5,
    rev_id: 1,
    author_name: 'David Lin',
    author_email: 'david.lin@ecotrails.co',
    comment_text:
      'UGC embedded directly at checkout made an immediate impact on our tour bookings. High-value guide.',
    status: 'approved',
    created_at: 'Just now',
  },
];

const DEFAULT_TAGS = [
  'LocalSEO',
  'GoogleBusinessProfile',
  'SearchOptimization',
  'InDestinationTravel',
  'HospitalityMarketing',
  'GoogleMaps',
];

const Postbox: React.FC<PostboxProps> = ({ slug }) => {
  const [article, setArticle] = useState<RevDbItem | null>(null);
  const [comments, setComments] = useState<RevDbComment[]>(DEFAULT_COMMENTS);
  const [categories, setCategories] = useState<RevDbCategory[]>(DEFAULT_BLOG_CATEGORIES);
  const [pexelsImages, setPexelsImages] = useState<[string | null, string | null, string | null, string | null]>([
    'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop',
    'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
  ]);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    // Load categories independently (max 8 from D1)
    fetchRevDbCategories()
      .then((cats) => {
        if (isMounted && cats && cats.length > 0) {
          setCategories(cats);
        }
      })
      .catch(() => { /* keep defaults */ });

    async function loadPostData() {
      try {
        let item: RevDbItem | null = null;
        if (slug) {
          item = await fetchRevDbBySlug(slug);
        }
        if (!item) {
          item =
            (await fetchRevDbBySlug('mastering-travel-digital-marketing-growth-guide')) ||
            (await fetchRevDbHeading('travel-marketing-insights', 'hero')) ||
            (await fetchRevDbHeading('blog-details', 'hero'));
        }

        if (isMounted && item) {
          setArticle(item);

          // Load comments independently (non-blocking)
          if (item.id) {
            fetchRevDbComments(item.id)
              .then((commentList) => {
                if (isMounted && commentList && commentList.length > 0) {
                  setComments(commentList);
                }
              })
              .catch(() => { /* keep defaults */ });
          }

          // Load Pexels images independently (non-blocking, fallbacks for _2, _3, _4, _5)
          const q2 = item.pexels_query_2 || 'kayaker navigating rapids in dramatic river canyon';
          const q3 = item.pexels_query_3 || 'digital tablet showing flight map and travel itinerary';
          const q4 = item.pexels_query_4 || 'local artisan demonstrating sustainable craft to tourists';
          const q5 = item.pexels_query_5 || 'scenic coastal hiking trail overlooking turquoise ocean';
          
          const FALLBACK_2 = 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop';
          const FALLBACK_3 = 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop';
          const FALLBACK_4 = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop';
          const FALLBACK_5 = 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop';

          fetchPexelsPhotos([q2, q3, q4, q5]).then(([img2, img3, img4, img5]) => {
            if (isMounted) {
              setPexelsImages([
                img2 || FALLBACK_2,
                img3 || FALLBACK_3,
                img4 || FALLBACK_4,
                img5 || FALLBACK_5,
              ]);
            }
          }).catch(() => { /* keep fallbacks */ });
        }
      } catch (err) {
        console.warn('Failed to load article from rev_db:', err);
      }
    }
    loadPostData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const revId = article?.id || 1;
    setSubmitStatus('Submitting...');

    try {
      const res = await submitRevDbComment({
        rev_id: revId,
        author_name: authorName,
        author_email: authorEmail,
        comment_text: commentText,
      });

      if (res.success) {
        setSubmitStatus('Comment posted successfully!');
        setComments((prev) => [
          {
            id: Date.now(),
            rev_id: revId,
            author_name: authorName,
            author_email: authorEmail,
            comment_text: commentText,
            created_at: 'Just now',
          },
          ...prev,
        ]);
        setCommentText('');
        setAuthorName('');
        setAuthorEmail('');
      } else {
        setSubmitStatus('Submission failed. Please try again.');
      }
    } catch {
      setSubmitStatus('Submission error.');
    }
  };

  // Parse structured sections
  let sectionBlocks: SectionH2Para[] = DEFAULT_BLOCKS;
  if (article?.sections_h2_para) {
    if (typeof article.sections_h2_para === 'string') {
      try {
        sectionBlocks = JSON.parse(article.sections_h2_para);
      } catch {
        sectionBlocks = DEFAULT_BLOCKS;
      }
    } else if (Array.isArray(article.sections_h2_para)) {
      sectionBlocks = article.sections_h2_para;
    }
  }

  // Parse tags
  let articleTags: string[] = DEFAULT_TAGS;
  if (article?.tags) {
    if (typeof article.tags === 'string') {
      try {
        articleTags = JSON.parse(article.tags);
      } catch {
        articleTags = DEFAULT_TAGS;
      }
    } else if (Array.isArray(article.tags)) {
      articleTags = article.tags;
    }
  }

  const quoteText = article?.useful_quote || DEFAULT_QUOTE;
  const quoteAuthor = article?.author || DEFAULT_QUOTE_AUTHOR;
  const introParagraph = article?.paragraph || DEFAULT_PARAGRAPH;

  return (
    <>
      {/* Postbox Article Area */}
      <div className="postbox-area tp-blog-details-ptb pt-10 pb-120">
        <div className="container">
          <div className="row">
            {/* Left Column: Full Article Content */}
            <div className="col-xl-8">
              <div className="postbox-left-sidebar mb-40">
                <div className="postbox-wrapper">
                  {/* Block 1: Section 1 */}
                  <div className="postbox-details-text mb-45">
                    <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                      {sectionBlocks[0]?.h2 || DEFAULT_BLOCKS[0].h2}
                    </h4>
                    <p className="mb-20">{sectionBlocks[0]?.paragraph || DEFAULT_BLOCKS[0].paragraph}</p>
                    <p>{introParagraph}</p>
                  </div>

                  {/* Block 2: Section 2 */}
                  <div className="postbox-details-text mb-40">
                    <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                      {sectionBlocks[1]?.h2 || DEFAULT_BLOCKS[1].h2}
                    </h4>
                    <p>{sectionBlocks[1]?.paragraph || DEFAULT_BLOCKS[1].paragraph}</p>
                  </div>

                  {/* 2-Image Row Between Paragraphs — Pexels API (pexels_query_2 + pexels_query_3) */}
                  <div className="postbox-details-thumb-wrap mb-10">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="postbox-details-thumb mb-20">
                          <img
                            className="w-100 rounded-3"
                            data-query={article?.pexels_query_2 || 'kayaker navigating rapids in dramatic river canyon'}
                            alt={article?.pexels_query_2 || 'kayaker navigating rapids in dramatic river canyon'}
                            src={pexelsImages[0] || 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop'}
                            style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="postbox-details-thumb mb-20">
                          <img
                            className="w-100 rounded-3"
                            data-query={article?.pexels_query_3 || 'digital tablet showing flight map and travel itinerary'}
                            alt={article?.pexels_query_3 || 'digital tablet showing flight map and travel itinerary'}
                            src={pexelsImages[1] || 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=800&h=550&fit=crop'}
                            style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Block 3: Section 3 */}
                  <div className="postbox-details-text mb-45">
                    <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                      {sectionBlocks[2]?.h2 || DEFAULT_BLOCKS[2].h2}
                    </h4>
                    <p>{sectionBlocks[2]?.paragraph || DEFAULT_BLOCKS[2].paragraph}</p>
                  </div>

                  {/* Blockquote Box with Garamond font */}
                  <div className="postbox-details-quote-box mb-40">
                    <blockquote>
                      <div className="postbox-details-quote-box-inner d-flex align-items-start">
                        <i>
                          <svg width="48" height="59" viewBox="0 0 48 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.2 58.8L29.6 0H47.6L38.6 58.8H25.2ZM0 58.8L4.4 0H22.4L13.4 58.8H0Z" fill="currentColor" fillOpacity="0.1" />
                          </svg>
                        </i>
                        <div className="postbox-details-quote">
                          <p className="mb-10 quote-text">“{quoteText}”</p>
                          <span>{quoteAuthor}</span>
                        </div>
                      </div>
                    </blockquote>
                  </div>

                  {/* Single Featured Image Row */}
                  <div className="postbox-details-thumb-wrap mb-20">
                    <div className="postbox-details-thumb mb-20">
                      <img
                        className="w-100 rounded-3"
                        data-query={article?.pexels_query_4 || 'local artisan demonstrating sustainable craft to tourists'}
                        alt={article?.pexels_query_4 || 'local artisan demonstrating sustainable craft to tourists'}
                        src={pexelsImages[2] || 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop'}
                        style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  </div>

                  {/* Block 4: Section 4 */}
                  <div className="postbox-details-text mb-35">
                    <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                      {sectionBlocks[3]?.h2 || DEFAULT_BLOCKS[3].h2}
                    </h4>
                    <p>{sectionBlocks[3]?.paragraph || DEFAULT_BLOCKS[3].paragraph}</p>
                  </div>

                  {/* Block 5: Section 5 */}
                  <div className="postbox-details-text mb-45">
                    <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">
                      {sectionBlocks[4]?.h2 || DEFAULT_BLOCKS[4].h2}
                    </h4>
                    <p>{sectionBlocks[4]?.paragraph || DEFAULT_BLOCKS[4].paragraph}</p>
                  </div>

                  {/* Tags and Share */}
                  <div className="postbox-details-tag-share d-flex align-items-center justify-content-between flex-wrap mb-40">
                    <div className="postbox-details-tag tagcloud">
                      <span>Tags:</span>
                      {articleTags.map((tag, idx) => (
                        <a key={idx} href="#blog">
                          #{tag.replace(/^#/, '')}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Navigation prev/next */}
                  <div className="postbox-details-np mb-60">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="postbox-details-np-item prev mb-30">
                          <a href="#blog" className="d-flex align-items-center">
                            <div className="postbox-details-np-icon mr-15">
                              <i className="fa-regular fa-arrow-left" />
                            </div>
                            <div className="postbox-details-np-text">
                              <span>Previous Post</span>
                              <h5 className="postbox-details-np-title">Crafting Immersive Experiences</h5>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="postbox-details-np-item next text-md-end mb-30">
                          <a href="#blog" className="d-flex align-items-center justify-content-md-end">
                            <div className="postbox-details-np-text">
                              <span>Next Post</span>
                              <h5 className="postbox-details-np-title">Direct Booking Funnels in 2026</h5>
                            </div>
                            <div className="postbox-details-np-icon ml-15">
                              <i className="fa-regular fa-arrow-right" />
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="postbox-details-comment mb-65">
                    <h3 className="postbox-details-comment-title mb-35">
                      Comments ({comments.length})
                    </h3>
                    <ul className="list-unstyled">
                      {comments.map((c) => (
                        <li key={c.id}>
                          <div className="postbox-details-comment-box d-flex">
                            <div className="postbox-details-comment-info">
                              <div className="postbox-details-comment-avater mr-20">
                                <div
                                  style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: '50%',
                                    background: 'var(--tp-theme-primary, #ff3c00)',
                                    color: '#fff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                  }}
                                >
                                  {c.author_name.charAt(0).toUpperCase()}
                                </div>
                              </div>
                            </div>
                            <div className="postbox-details-comment-text">
                              <div className="postbox-details-comment-name d-flex align-items-center justify-content-between">
                                <h5>{c.author_name}</h5>
                                <span className="post-meta">{c.created_at || 'Recent'}</span>
                              </div>
                              <p>{c.comment_text}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Comment Form */}
                  <div className="postbox-details-form">
                    <h3 className="postbox-details-form-title mb-10">Leave a Reply</h3>
                    <p className="mb-30">Your email address will not be published. Required fields are marked *</p>
                    <form onSubmit={handleCommentSubmit}>
                      <div className="row">
                        <div className="col-xl-6 col-lg-6">
                          <div className="postbox-details-input-box mb-20">
                            <div className="postbox-details-input">
                              <label>Name *</label>
                              <input
                                type="text"
                                required
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                          <div className="postbox-details-input-box mb-20">
                            <div className="postbox-details-input">
                              <label>Email *</label>
                              <input
                                type="email"
                                required
                                value={authorEmail}
                                onChange={(e) => setAuthorEmail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12">
                          <div className="postbox-details-input-box mb-20">
                            <div className="postbox-details-input">
                              <label>Comment *</label>
                              <textarea
                                id="msg"
                                required
                                rows={4}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="postbox-details-input-box">
                        <button type="submit" className="tp-btn d-inline-flex align-items-center">
                          <span>
                            <span className="text-1">Post Comment</span>
                            <span className="text-2">Post Comment</span>
                          </span>
                        </button>
                        {submitStatus && (
                          <span
                            className="ms-3"
                            style={{
                              fontSize: '14px',
                              color: submitStatus.includes('success') ? '#10b981' : '#f59e0b',
                            }}
                          >
                            {submitStatus}
                          </span>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="col-xl-4 col-lg-8">
              <div className="postbox-sidebar-wrap mb-40">
                {/* Author Widget */}
                <div className="sidebar-widget mb-40">
                  <div className="sidebar-author text-center">
                    <div className="sidebar-author-thumb mb-25">
                      <img
                        className="rounded-circle"
                        src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                        alt={article?.author || 'Elena Rostova'}
                        style={{ width: '110px', height: '110px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="sidebar-author-content">
                      <h4 className="sidebar-author-title mb-5">{article?.author || 'Elena Rostova'}</h4>
                      <span className="sidebar-author-designation mb-15 d-block">
                        Head of Travel Strategy & SEO
                      </span>
                      <p>
                        Specializing in direct booking acceleration, revenue optimization, and localized search architectures for luxury hospitality brands worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Categories Widget */}
                <div className="sidebar-widget mb-40">
                  <h3 className="sidebar-widget-title mb-25">Categories</h3>
                  <div className="sidebar-widget-content">
                    <ul className="list-unstyled">
                      {categories.slice(0, 8).map((cat, idx) => (
                        <li key={idx}>
                          <a href="#blog">
                            {cat.name} <span>({cat.count < 10 ? `0${cat.count}` : cat.count})</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recent Posts Widget */}
                <div className="sidebar-widget mb-40">
                  <h3 className="sidebar-widget-title mb-25">Recent Articles</h3>
                  <div className="sidebar-widget-content">
                    <div className="sidebar-post rc-post">
                      <div className="rc-post-item d-flex align-items-center mb-20">
                        <div className="rc-post-thumb mr-15">
                          <a href="#blog-details">
                            <img
                              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                              alt=""
                              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          </a>
                        </div>
                        <div className="rc-post-content">
                          <div className="rc-meta mb-5">
                            <span>Aug 24, 2026</span>
                          </div>
                          <h6 className="rc-post-title">
                            <a href="#blog-details">Transforming Direct Hotel Bookings in 2026</a>
                          </h6>
                        </div>
                      </div>
                      <div className="rc-post-item d-flex align-items-center mb-20">
                        <div className="rc-post-thumb mr-15">
                          <a href="#blog-details">
                            <img
                              src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                              alt=""
                              style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                          </a>
                        </div>
                        <div className="rc-post-content">
                          <div className="rc-meta mb-5">
                            <span>Aug 21, 2026</span>
                          </div>
                          <h6 className="rc-post-title">
                            <a href="#blog-details">Crafting Immersive Destination Web Experiences</a>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Widget */}
                <div className="sidebar-widget mb-40">
                  <h3 className="sidebar-widget-title mb-25">Popular Tags</h3>
                  <div className="sidebar-widget-content">
                    <div className="tagcloud">
                      {articleTags.map((tag, idx) => (
                        <a key={idx} href="#blog">
                          #{tag.replace(/^#/, '')}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Postbox;

// ==================================================
// END: Postbox
// ==================================================
