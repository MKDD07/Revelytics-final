import React, { useEffect, useState } from 'react';
import {
  BlogDetailsHero,
  BlogDetailsPostbox,
  BlogDetailsBanner,
  Cta1,
  SEO,
} from '../components';
import { fetchRevDbBySlug, fetchBlogBySlug, type RevDbItem, type BlogItem } from '../services/api';

interface BlogDetailsProps {
  slug?: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  const [revItem, setRevItem] = useState<RevDbItem | null>(null);
  const [blogItem, setBlogItem] = useState<BlogItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadArticleMeta() {
      const currentSlug = slug || 'mastering-travel-digital-marketing-growth-guide';
      try {
        const revData = await fetchRevDbBySlug(currentSlug);
        if (isMounted && revData) {
          setRevItem(revData);
          return;
        }

        const bData = await fetchBlogBySlug(currentSlug);
        if (isMounted && bData) {
          setBlogItem(bData);
        }
      } catch (err) {
        console.warn('Failed to load blog details meta from D1:', err);
      }
    }
    loadArticleMeta();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const articleTitle =
    revItem?.meta_heading ||
    revItem?.heading ||
    blogItem?.title ||
    'Mastering Travel Digital Marketing: Strategies to Drive Bookings in 2026';
  const articleDescription =
    revItem?.meta_data ||
    revItem?.description ||
    blogItem?.summary ||
    'Discover proven travel digital marketing strategies covering SEO, short-form video, user-generated content, automated funnels, and retention tactics.';
  const authorName = revItem?.author || blogItem?.author || 'Elena Rostova';
  const publishDate = revItem?.date || blogItem?.created_at || '2026-08-25';
  const articleImage =
    revItem?.image_url ||
    blogItem?.image_url ||
    'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const tags = Array.isArray(revItem?.tags)
    ? revItem.tags.join(', ')
    : typeof revItem?.tags === 'string'
    ? revItem.tags
    : 'TravelMarketing, SEOStrategy, DigitalMarketing';

  return (
    <>
      <SEO
        title={`${articleTitle} | Revlytics`}
        description={articleDescription}
        keywords={tags}
        ogType="article"
        ogImage={articleImage}
        author={authorName}
        publishedTime={publishDate}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: articleTitle,
          description: articleDescription,
          image: articleImage,
          author: {
            '@type': 'Person',
            name: authorName,
          },
          publisher: {
            '@type': 'Organization',
            name: 'Revlytics',
            logo: {
              '@type': 'ImageObject',
              url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
            },
          },
          datePublished: publishDate,
        }}
      />

      {/* Blog Details Header */}
      <BlogDetailsHero slug={slug} />

      {/* Full Article Content, Comments & Author Bio */}
      <BlogDetailsPostbox slug={slug} />

      {/* Featured Destination Banner */}
      <BlogDetailsBanner />

      {/* CTA */}
      <Cta1 />
    </>
  );
};

export default BlogDetails;
