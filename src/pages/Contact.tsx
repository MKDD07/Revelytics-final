import React, { useEffect, useState } from 'react';
import { Contact1, SEO } from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';

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
    ? `${metaItem.meta_heading} | Revlytics`
    : 'Contact Revlytics | Accelerate Your Travel Brand Growth';
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    'Ready to elevate your resort, boutique hotel, or destination brand? Contact the Revlytics team for a discovery session and direct booking audit.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="contact Revlytics, travel agency contact, direct booking audit, resort digital acceleration inquiry"
        ogType="website"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: pageTitle,
          description: pageDescription,
          url: 'https://revelytics-final.mkmkataria07.workers.dev/contact',
        }}
      />
      <Contact1 />
    </>
  );
};

export default Contact;
