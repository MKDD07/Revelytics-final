import React, { useEffect, useState } from 'react';
import {
  BlogDetailsHero,
  BlogDetailsPostbox,
  BlogDetailsBanner,
  Cta1,
  SEO,
} from '../components';
import { fetchRevDbBySlug, fetchBlogBySlug, type RevDbItem, type BlogItem } from '../services/api';
import { getMetadataForPath } from '../utils/seoData';

interface BlogDetailsProps {
  slug?: string;
}

const BlogDetails: React.FC<BlogDetailsProps> = ({ slug }) => {
  const currentSlug = slug || 'mastering-travel-digital-marketing-growth-guide';
  const defaultMeta = getMetadataForPath(`/blog/${currentSlug}`);

  const [revItem, setRevItem] = useState<RevDbItem | null>(null);
  const [blogItem, setBlogItem] = useState<BlogItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadArticleMeta() {
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
  }, [currentSlug]);

  const articleTitle =
    revItem?.meta_heading ||
    revItem?.heading ||
    blogItem?.title ||
    defaultMeta.title.replace(' | Revlytics Guide', '').replace(' | Revlytics Playbook', '').replace(' | Revlytics', '');
  const articleDescription =
    revItem?.meta_data ||
    revItem?.description ||
    blogItem?.summary ||
    defaultMeta.description;
  const authorName = revItem?.author || blogItem?.author || defaultMeta.author || 'Elena Rostova';
  const publishDate = revItem?.date || blogItem?.created_at || defaultMeta.publishedTime || '2026-08-25';
  const articleImage =
    revItem?.image_url ||
    blogItem?.image_url ||
    defaultMeta.ogImage;

  const tags = Array.isArray(revItem?.tags)
    ? revItem.tags.join(', ')
    : typeof revItem?.tags === 'string'
    ? revItem.tags
    : defaultMeta.keywords;

  return (
    <>
      <SEO
        title={articleTitle.includes('Revlytics') ? articleTitle : `${articleTitle} | Revlytics`}
        description={articleDescription}
        keywords={tags}
        canonical={`https://www.revlytics.in/blog/${currentSlug}`}
        ogType="article"
        ogImage={articleImage}
        author={authorName}
        publishedTime={publishDate}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.revlytics.in/blog/${currentSlug}`,
          },
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
