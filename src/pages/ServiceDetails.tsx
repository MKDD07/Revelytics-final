import React, { useEffect, useMemo, useState } from 'react';
import { fetchServiceDetailBySlug, type ServiceDetailItem } from '../services/api';
import {
  ServiceDetailsHero,
  ServiceDetailsOverview,
  ServiceDetailsProcess,
  ServiceDetailsWhyChooseUs,
  ServiceDetailsBanner1,
  ServiceDetailsFaq,
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

  // Inject dynamic SEO Meta Tags and Schema.org JSON-LD
  useEffect(() => {
    if (!detail) return;

    // 1. Document Title
    const originalTitle = document.title;
    if (detail.meta_title) {
      document.title = detail.meta_title;
    } else if (detail.service_name) {
      document.title = `${detail.service_name} | Revlytics`;
    }

    // Helper function to safely update or append meta tags
    const setMetaTag = (selector: string, attr: string, value?: string) => {
      if (!value) return;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('name=')) {
          const name = selector.replace(/meta\[name=['"]?|['"]?\]/g, '');
          el.setAttribute('name', name);
        } else if (selector.includes('property=')) {
          const prop = selector.replace(/meta\[property=['"]?|['"]?\]/g, '');
          el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // 2. Meta Description & Keywords
    setMetaTag('meta[name="description"]', 'content', detail.meta_description);
    setMetaTag('meta[name="keywords"]', 'content', detail.meta_keywords);

    // 3. OpenGraph Tags
    setMetaTag('meta[property="og:title"]', 'content', detail.meta_title || detail.service_name);
    setMetaTag('meta[property="og:description"]', 'content', detail.meta_description);
    if (detail.og_image) {
      setMetaTag('meta[property="og:image"]', 'content', detail.og_image);
    }

    // 4. Schema.org JSON-LD Structured Data
    let schemaScript = document.getElementById('service-schema-markup') as HTMLScriptElement | null;
    if (detail.schema_markup) {
      const schemaString =
        typeof detail.schema_markup === 'string'
          ? detail.schema_markup
          : JSON.stringify(detail.schema_markup, null, 2);

      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'service-schema-markup';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = schemaString;
    }

    return () => {
      document.title = originalTitle;
      const script = document.getElementById('service-schema-markup');
      if (script) script.remove();
    };
  }, [detail]);

  return (
    <>
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
    </>
  );
};

export default ServiceDetails;
