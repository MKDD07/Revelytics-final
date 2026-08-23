import React from 'react';
import {
  FaqHero,
  FaqAccordion,
  Cta1,
} from '../components';

const Faq: React.FC = () => {
  return (
    <>
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
