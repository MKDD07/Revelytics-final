import React, { useEffect, useState } from 'react';
import { fetchRevDbHeading, fetchRevDbBySlug, type RevDbItem } from '../../../services/api';

// ==================================================
// START: Hero (Using Cloudflare D1 `rev_db` Table)
// Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335
// ==================================================

interface HeroProps {
  slug?: string;
  title?: string;
  author?: string;
  date?: string;
  category?: string;
  image?: string;
}

const DEFAULT_HEADING = 'Mastering Travel Digital Marketing: Strategies to Drive Bookings in 2026';
const DEFAULT_AUTHOR = 'Elena Rostova';
const DEFAULT_DATE = '2026-08-25';
const DEFAULT_CATEGORY = 'Digital Marketing';
const DEFAULT_IMAGE = 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1600';

const Hero: React.FC<HeroProps> = ({
  slug,
  title: initialTitle,
  author: initialAuthor,
  date: initialDate,
  category: initialCategory,
  image: initialImage,
}) => {
  const [dbData, setDbData] = useState<RevDbItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadHeading() {
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
          setDbData(item);
        }
      } catch (err) {
        console.warn('Failed to load blog-details hero from rev_db:', err);
      }
    }
    loadHeading();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const displayTitle = initialTitle || dbData?.heading || DEFAULT_HEADING;
  const displayAuthor = initialAuthor || dbData?.author || DEFAULT_AUTHOR;
  const displayDate = initialDate || dbData?.date || DEFAULT_DATE;
  const displayCategory = initialCategory || dbData?.category || DEFAULT_CATEGORY;
  const displayImage = initialImage || dbData?.image_url || DEFAULT_IMAGE;

  return (
    <>
      {/* Blog Details Hero Area */}
      <div className="tp-blog-grid-area tp-pd-2-ptb pt-175 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="tp-pd-2-top pb-40">
                <div className="tp-pd-2-categories mb-15 tp_fade_anim" data-delay=".2">
                  <span>{displayCategory}</span>
                </div>
                <h1 className="tp-section-title tp-ff-sequel-bold-head fs-72 mb-20 tp_fade_anim" data-delay=".3">
                  {displayTitle}
                </h1>
                <span className="mp-blog-date mb-10 d-block tp_fade_anim" data-delay=".4">
                  <span>By</span> {displayAuthor} - {displayDate}
                </span>
              </div>
              <div className="tp-blog-details-thumb scale-up-img mb-30 tp_fade_anim" data-delay=".5">
                <img
                  className="w-100 rounded-4"
                  src={displayImage}
                  alt={displayTitle}
                  style={{ maxHeight: '600px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

// ==================================================
// END: Hero
// ==================================================
