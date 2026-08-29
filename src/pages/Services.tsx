import React, { useEffect, useState } from 'react';
import {
  ServiceHero,
  ServiceList,
  ResumeSpecialties,
  ServiceGallery,
  Contact1,
  Cta1,
  SEO,
} from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';
import { CORE_PAGES_SEO } from '../utils/seoData';

const Services: React.FC = () => {
  const [metaItem, setMetaItem] = useState<RevDbItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadMeta() {
      try {
        const item =
          (await fetchRevDbHeading('services', 'hero')) ||
          (await fetchRevDbHeading('services', 'meta'));
        if (isMounted && item) {
          setMetaItem(item);
        }
      } catch (err) {
        console.warn('Failed to load services meta from D1:', err);
      }
    }
    loadMeta();
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = metaItem?.meta_heading
    ? (metaItem.meta_heading.includes('Revlytics') ? metaItem.meta_heading : `${metaItem.meta_heading} | Revlytics`)
    : CORE_PAGES_SEO.services.title;
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    CORE_PAGES_SEO.services.description;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={CORE_PAGES_SEO.services.keywords}
        canonical={CORE_PAGES_SEO.services.canonical}
        ogType="website"
        ogImage={CORE_PAGES_SEO.services.ogImage}
        schema={CORE_PAGES_SEO.services.schema}
      />

      {/* Services Header & Intro */}
      <ServiceHero />

      {/* Interactive Travel Services (Booking UX, Luxury Resort Branding, Travel Ads) */}
      <ServiceList />

      {/* Complete Services List Breakdown (Cards for each service-detail) */}
      <ResumeSpecialties
        limit={0}
        showCategoryBanner={false}
        showServicesList={true}
      />

      {/* Destination & Hospitality Gallery */}
      <ServiceGallery />

      {/* Direct Inquiries & Contact Consultation Form */}
      <Contact1 />

      {/* Start Your Travel Brand Project */}
      <Cta1 />
    </>
  );
};

export default Services;
