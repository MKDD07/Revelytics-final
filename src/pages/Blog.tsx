import React, { useEffect, useState } from 'react';
import {
  BlogHero,
  BlogGrid,
  Cta1,
  SEO,
} from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';
import { CORE_PAGES_SEO } from '../utils/seoData';

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
    ? (metaItem.meta_heading.includes('Revlytics') ? metaItem.meta_heading : `${metaItem.meta_heading} | Revlytics`)
    : CORE_PAGES_SEO.blog.title;
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    CORE_PAGES_SEO.blog.description;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={CORE_PAGES_SEO.blog.keywords}
        canonical={CORE_PAGES_SEO.blog.canonical}
        ogType="website"
        ogImage={CORE_PAGES_SEO.blog.ogImage}
        schema={CORE_PAGES_SEO.blog.schema}
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
