import React, { useEffect, useMemo, useState } from 'react';
import { fetchServiceDetailBySlug, type ServiceDetailItem } from '../services/api';
import {
  ServiceDetailsHero,
  ServiceDetailsOverview,
  ServiceDetailsProcess,
  ServiceDetailsWhyChooseUs,
  ServiceDetailsBanner1,
  ServiceDetailsFaq,
  ServiceDetailsSlider,
  ServiceDetailsHorizontalScroll,
  Contact1,
  SEO,
} from '../components';

export interface ServiceDetailsProps {
  slug?: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ slug: propSlug }) => {
  // Extract slug from prop, pathname (/service-details/ui-ux-design), or hash
  const currentSlug = useMemo(() => {
    if (propSlug) return propSlug;
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const parts = path.split('/');
    if (parts[0] === 'service-details' && parts[1]) {
      return parts[1];
    }
    const hash = window.location.hash.replace('#', '');
    const hashParts = hash.split('?')[0].split('/');
    if (hashParts[0] === 'service-details' && hashParts[1]) {
      return hashParts[1];
    }
    const param = new URLSearchParams(window.location.search || hash.split('?')[1] || '').get('service');
    return param || 'ui-ux-design';
  }, [propSlug]);

  const [detail, setDetail] = useState<ServiceDetailItem | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadServiceMeta() {
      if (!currentSlug) return;
      try {
        const data = await fetchServiceDetailBySlug(currentSlug);
        if (isMounted && data) {
          setDetail(data);
        }
      } catch (err) {
        console.warn('Failed to load service meta from D1:', err);
      }
    }

    loadServiceMeta();

    return () => {
      isMounted = false;
    };
  }, [currentSlug]);

  const serviceTitle = detail?.meta_title
    ? detail.meta_title
    : detail?.service_name
    ? `${detail.service_name} | Revlytics`
    : 'Travel Digital Service | Revlytics';
  const serviceDescription =
    detail?.meta_description ||
    'Transform your travel brand with Revlytics high-performance digital acceleration, direct booking UX, and custom hospitality solutions.';

  return (
    <>
      <SEO
        title={serviceTitle}
        description={serviceDescription}
        keywords={detail?.meta_keywords || 'hospitality service, travel digital transformation, resort direct booking'}
        ogType="service"
        ogImage={detail?.og_image || detail?.image_url}
        schema={detail?.schema_markup}
      />

      {/* Service Details Header */}
      <ServiceDetailsHero slug={currentSlug} />

      {/* Service Overview & Strategy */}
      <ServiceDetailsOverview slug={currentSlug} />

      {/* 4-Step Travel Transformation Process */}
      <ServiceDetailsProcess slug={currentSlug} />

      {/* Immersive Travel Banner */}
      <ServiceDetailsBanner1 slug={currentSlug} />

      {/* Why Travel Leaders Choose Revlytics */}
      <ServiceDetailsWhyChooseUs slug={currentSlug} />

      {/* Service Specific FAQs from D1 */}
      <ServiceDetailsFaq slug={currentSlug} />

      {/* Luxury Swiper All Services Carousel (No Inline CSS, No Pagination) */}
      <ServiceDetailsSlider currentSlug={currentSlug} />
      <Contact1 showMap={false} />

      {/* GSAP ScrollTrigger Horizontal Pinned Headline (White Background) */}
      <ServiceDetailsHorizontalScroll />

      {/* Travel Digital Inquiry & Contact Section */}
    </>
  );
};

export default ServiceDetails;
