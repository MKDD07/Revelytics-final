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
    ? `${metaItem.meta_heading} | Revlytics`
    : 'Our Services | Revlytics Travel Digital Solutions & Engineering';
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    'Explore Revlytics full suite of hospitality digital services: Luxury Resort Branding, Direct Booking Engine UX, Destination Marketing & SEO, 3D Virtual Experiences, and Mobile Apps.';

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords="travel services, luxury resort branding, direct booking engine UX, hospitality SEO, hotel web development"
        ogType="website"
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
