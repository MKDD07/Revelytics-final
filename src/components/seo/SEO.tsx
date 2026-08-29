import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'profile' | 'service';
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  author?: string;
  publishedTime?: string;
  schema?: string | Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_TITLE = 'Revlytics | High-Performance Travel Digital Agency & Direct Booking UX';
const DEFAULT_DESCRIPTION =
  'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings through high-performance design, custom engineering, and growth strategy.';
const DEFAULT_KEYWORDS =
  'travel digital agency, luxury resort branding, direct booking UX, hotel website design, destination marketing, hospitality digital transformation, hospitality tech';
const DEFAULT_OG_IMAGE =
  'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200';
const SITE_NAME = 'Revlytics';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage,
  ogTitle,
  ogDescription,
  twitterCard = 'summary_large_image',
  author,
  publishedTime,
  schema,
}) => {
  useEffect(() => {
    // 1. Title
    const finalTitle = title ? `${title}` : DEFAULT_TITLE;
    document.title = finalTitle;

    // Helper to safely set / update <meta> tags in <head>
    const setMeta = (attrName: 'name' | 'property', attrValue: string, content?: string) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper for <link rel="canonical">
    const setCanonical = (href: string) => {
      let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    const finalDescription = description || DEFAULT_DESCRIPTION;
    const finalKeywords = keywords || DEFAULT_KEYWORDS;
    const finalImage = ogImage || DEFAULT_OG_IMAGE;
    const currentOrigin =
      typeof window !== 'undefined'
        ? window.location.origin
        : 'https://revelytics-final.mkmkataria07.workers.dev';
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const finalCanonical = canonical || `${currentOrigin}${currentPath}`;

    // Standard Meta Tags
    setMeta('name', 'description', finalDescription);
    setMeta('name', 'keywords', finalKeywords);
    setMeta('name', 'author', author || 'Revlytics Editorial');
    setCanonical(finalCanonical);

    // OpenGraph Meta Tags
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:title', ogTitle || finalTitle);
    setMeta('property', 'og:description', ogDescription || finalDescription);
    setMeta('property', 'og:url', finalCanonical);
    setMeta('property', 'og:image', finalImage);

    if (publishedTime) {
      setMeta('property', 'article:published_time', publishedTime);
    }
    if (author) {
      setMeta('property', 'article:author', author);
    }

    // Twitter Card Meta Tags
    setMeta('name', 'twitter:card', twitterCard);
    setMeta('name', 'twitter:title', ogTitle || finalTitle);
    setMeta('name', 'twitter:description', ogDescription || finalDescription);
    setMeta('name', 'twitter:image', finalImage);

    // Schema.org JSON-LD Structured Data
    const scriptId = 'revlytics-dynamic-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent =
        typeof schema === 'string' ? schema : JSON.stringify(schema, null, 2);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Cleanup custom schema on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    ogType,
    ogImage,
    ogTitle,
    ogDescription,
    twitterCard,
    author,
    publishedTime,
    schema,
  ]);

  return null;
};

export default SEO;
