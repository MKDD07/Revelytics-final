import React, { useEffect, useState } from 'react';
import {
  FaqHero,
  FaqAccordion,
  Cta1,
  SEO,
} from '../components';
import { fetchFaqPage, type FaqItem } from '../services/api';

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

  const faqSchema = faqs.length > 0
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
    : undefined;

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Revlytics Travel Digital Agency"
        description="Get answers to common questions about Revlytics travel digital transformation services, direct booking optimization, CRS/PMS integrations, and retainers."
        keywords="hospitality faq, hotel digital agency questions, direct booking engine faq, hotel website design faq"
        ogType="website"
        schema={faqSchema}
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
