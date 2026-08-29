import React, { useEffect, useState } from 'react';
import { Contact1, SEO } from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';
import { CORE_PAGES_SEO } from '../utils/seoData';

const Contact: React.FC = () => {
  const [metaItem, setMetaItem] = useState<RevDbItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadMeta() {
      try {
        const item =
          (await fetchRevDbHeading('contact', 'hero')) ||
          (await fetchRevDbHeading('contact', 'meta'));
        if (isMounted && item) {
          setMetaItem(item);
        }
      } catch (err) {
        console.warn('Failed to load contact meta from D1:', err);
      }
    }
    loadMeta();
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = metaItem?.meta_heading
    ? (metaItem.meta_heading.includes('Revlytics') ? metaItem.meta_heading : `${metaItem.meta_heading} | Revlytics`)
    : CORE_PAGES_SEO.contact.title;
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    CORE_PAGES_SEO.contact.description;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={CORE_PAGES_SEO.contact.keywords}
        canonical={CORE_PAGES_SEO.contact.canonical}
        ogType="website"
        ogImage={CORE_PAGES_SEO.contact.ogImage}
        schema={CORE_PAGES_SEO.contact.schema}
      />
      <Contact1 />
    </>
  );
};

export default Contact;
