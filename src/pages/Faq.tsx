import React, { useEffect, useState } from 'react';
import {
  FaqHero,
  FaqAccordion,
  Cta1,
  SEO,
} from '../components';
import { fetchFaqPage, type FaqItem } from '../services/api';
import { CORE_PAGES_SEO } from '../utils/seoData';

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    async function loadFaqs() {
      try {
        const data = await fetchFaqPage();
        if (isMounted && data.length > 0) {
          setFaqs(data);
        }
      } catch (err) {
        console.warn('Failed to load FAQs for schema:', err);
      }
    }
    loadFaqs();
    return () => {
      isMounted = false;
    };
  }, []);

  const dynamicFaqSchema = faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.slice(0, 10).map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      }
    : CORE_PAGES_SEO.faq.schema;

  return (
    <>
      <SEO
        title={CORE_PAGES_SEO.faq.title}
        description={CORE_PAGES_SEO.faq.description}
        keywords={CORE_PAGES_SEO.faq.keywords}
        canonical={CORE_PAGES_SEO.faq.canonical}
        ogType="website"
        ogImage={CORE_PAGES_SEO.faq.ogImage}
        schema={dynamicFaqSchema}
      />

      {/* FAQ Header */}
      <FaqHero />

      {/* Accordion FAQ Sections with Database Source Selection */}
<FaqAccordion
  dbSource="faq_page"
  initialFaqs={[]}   // empty on purpose — don't seed with another table's data
/>
      {/* Inquire CTA */}
      <Cta1 />
    </>
  );
};

export default Faq;
