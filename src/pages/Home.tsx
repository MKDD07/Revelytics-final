import React from 'react';
import {
  Hero3,
  Brand1,
  About1,
  ResumeSpecialties,
  Service1,
  TextSlider,
  ServiceDetailsProcess,
  ServiceGallery,
  Funfact,
  Pricing,
  Contact1,
  Hero4,
  Portfolio3,
  Testimonial1,
  Faq1,
  Blog1,
  Cta1,
  FaqAccordion,
  Awards1,
  Portfolio1,
} from '../components';

const Home: React.FC = () => {
  return (
    <>
      {/* 1. Hero Section 3 */}
      <Hero3 />

      {/* 2. Partner Brands & Luxury Resorts */}
      <Brand1 />

      {/* 3. About Us: Travel Digital Transformation */}
      <About1 />

      {/* 4. Travel Specialties & Strategic Capabilities */}
      <ResumeSpecialties
        bannerHeight="600px"
        showCategoryBanner={true}
        showServicesList={false}
      />

      {/* 5. Core Travel Services (Booking UX, Branding, SEO) */}
      <Service1 />

      {/* 6. Dynamic Text Slider */}
      <TextSlider />

      {/* 7. Agile Delivery Process & Product Framework */}
      <ServiceDetailsProcess />

      {/* 8. Portfolio Gallery Showcase */}
      <ServiceGallery />

      {/* 9. Travel Performance Metrics & Fun Facts */}
      <Funfact />

      {/* 10. Hospitality & Travel Packages */}
      <Pricing />

      {/* 12. Masterpiece Showcase Hero Banner */}
      <Hero4 />

      <Awards1 />
      {/* 13. Featured Work Portfolio Showcase */}
      <Portfolio3 />

      {/* 10. Testimonials from Hotel & Travel Leaders */}
      <Testimonial1 />

      {/* 12. Travel Agency FAQ */}
<FaqAccordion
  dbSource="index_faqs"
  initialFaqs={[]}   // empty on purpose — don't seed with another table's data
/>
      {/* 13. Travel Insights & Destination Trends */}
      <Blog1 />
      {/* 11. Travel Discovery & Direct Inquiries */}
      <Contact1 showMap={false} />
    </>
  );
};

export default Home;
