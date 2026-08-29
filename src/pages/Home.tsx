import React, { useEffect, useState } from 'react';
import {
  Hero3,
  Brand1,
  ServiceList,
  ResumeSpecialties,
  TextSlider,
  ServiceDetailsProcess,
  ServiceGallery,
  Funfact,
  Pricing,
  Contact1,
  Hero4,
  Portfolio3,
  Testimonial1,
  FaqAccordion,
  Awards1,
  Blog1,
  SplitImageScroll,
  VideoScrollShowcase,
  SEO,
} from '../components';
import { fetchRevDbHeading, type RevDbItem } from '../services/api';
import { CORE_PAGES_SEO } from '../utils/seoData';

const Home: React.FC = () => {
  const [metaItem, setMetaItem] = useState<RevDbItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadMeta() {
      try {
        const item =
          (await fetchRevDbHeading('home', 'hero')) ||
          (await fetchRevDbHeading('home', 'meta'));
        if (isMounted && item) {
          setMetaItem(item);
        }
      } catch (err) {
        console.warn('Failed to load home meta from D1:', err);
      }
    }
    loadMeta();
    return () => {
      isMounted = false;
    };
  }, []);

  const pageTitle = metaItem?.meta_heading
    ? (metaItem.meta_heading.includes('Revlytics') ? metaItem.meta_heading : `${metaItem.meta_heading} | Revlytics`)
    : CORE_PAGES_SEO.home.title;
  const pageDescription =
    metaItem?.meta_data ||
    metaItem?.description ||
    CORE_PAGES_SEO.home.description;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={CORE_PAGES_SEO.home.keywords}
        canonical={CORE_PAGES_SEO.home.canonical}
        ogType="website"
        ogImage={CORE_PAGES_SEO.home.ogImage}
        schema={CORE_PAGES_SEO.home.schema}
      />

      {/* 1. Hero Section 3 */}
      <Hero3 />

      {/* 2. Partner Brands & Luxury Resorts */}
      <Brand1 />

      {/* 2.5 Split Image & SVG Interactive Scroll Trigger Section */}
      <SplitImageScroll
        leftText="We"
        rightText="are"
        centerRevealText="Revelytics"
        pexelsQuery="couple walking desert travel adventure"
        pexelsIndex={0}
      />

      {/* 3. Interactive Category & Service Showcase (from Service Page) */}
      <ServiceList id="about" />

      {/* 4. Travel Specialties & Strategic Capabilities */}
      <ResumeSpecialties
        limit={0}
        showCategoryBanner={false}
        showServicesList={true}
      />

      {/* 4.5 Editorial Video Trio Showcase with GSAP Parallax Scroll */}
      <VideoScrollShowcase />

      {/* 5. Dynamic Text Slider */}
      <TextSlider />

      {/* 7. Agile Delivery Process & Product Framework */}
      <ServiceDetailsProcess />

      {/* 8. Portfolio Gallery Showcase */}
      <ServiceGallery />

      {/* 9. Travel Performance Metrics & Fun Facts */}
      <Funfact />


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
