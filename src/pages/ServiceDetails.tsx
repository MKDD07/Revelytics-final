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
import { getMetadataForPath } from '../utils/seoData';

export interface ServiceDetailsProps {
  slug?: string;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ slug: propSlug }) => {
  // Extract slug from prop, pathname (/services/ui-ux-design or /service-details/ui-ux-design), or hash
  const currentSlug = useMemo(() => {
    if (propSlug) return propSlug;
    const path = window.location.pathname.replace(/^\/|\/$/g, '');
    const parts = path.split('/');
    if ((parts[0] === 'service-details' || parts[0] === 'services') && parts[1]) {
      return parts[1];
    }
    const hash = window.location.hash.replace(/^#\/?/, '');
    const hashParts = hash.split('?')[0].split('/');
    if ((hashParts[0] === 'service-details' || hashParts[0] === 'services') && hashParts[1]) {
      return hashParts[1];
    }
    const param =
      new URLSearchParams(window.location.search || hash.split('?')[1] || '').get('service') ||
      new URLSearchParams(window.location.search || hash.split('?')[1] || '').get('slug');
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

  const defaultMeta = useMemo(() => getMetadataForPath(`/services/${currentSlug}`), [currentSlug]);

  const serviceTitle = detail?.meta_title || (detail?.service_name ? `${detail.service_name} | Revlytics` : defaultMeta.title);
  const serviceDescription = detail?.meta_description || defaultMeta.description;
  const serviceKeywords = detail?.meta_keywords || defaultMeta.keywords;
  const serviceOgImage = detail?.og_image || detail?.image_url || defaultMeta.ogImage;
  const serviceSchema = detail?.schema_markup || defaultMeta.schema;

  return (
    <>
      <SEO
        title={serviceTitle}
        description={serviceDescription}
        keywords={serviceKeywords}
        canonical={`https://www.revlytics.in/services/${currentSlug}`}
        ogType="service"
        ogImage={serviceOgImage}
        schema={serviceSchema}
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
