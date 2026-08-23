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

      {/* Accordion FAQ Sections */}
      <FaqAccordion />

      {/* Inquire CTA */}
      <Cta1 />
    </>
  );
};

export default Faq;
