import React, { useEffect, useState } from 'react';
import {
  BlogHero,
  BlogGrid,
  Cta1,
  SEO,
} from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';

const Blog: React.FC = () => {
  const [metaItem, setMetaItem] = useState<RevDbItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadMeta() {
      try {
        const item =
          (await fetchRevDbHeading('blog', 'hero')) ||
          (await fetchRevDbHeading('blog', 'meta')) ||
          (await fetchRevDbHeading('travel-marketing-insights', 'hero'));
        if (isMounted && item) {
          setMetaItem(item);
        }
      } catch (err) {
        console.warn('Failed to load blog meta from D1:', err);
      }
    }
    loadMeta();
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = metaItem?.meta_heading
    ? `${metaItem.meta_heading} | Revlytics`
    : 'Travel Insights & Destination Growth Trends | Revlytics Journal';
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    'Read the latest articles, strategies, and case studies on hotel direct bookings, hospitality technology, travel UX design, and luxury destination brand strategy.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="travel marketing insights, hospitality tech trends, hotel direct bookings blog, resort marketing strategy"
        ogType="website"
      />

      {/* Blog Page Hero */}
      <BlogHero />

      {/* Travel Industry Insights Grid */}
      <BlogGrid />

      {/* Subscribe & Contact CTA */}
      <Cta1 />
    </>
  );
};

export default Blog;
