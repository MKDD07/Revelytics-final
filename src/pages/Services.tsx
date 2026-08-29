import React from 'react';
import {
  ServiceHero,
  ServiceList,
  ResumeSpecialties,
  ServiceGallery,
  Contact1,
  Cta1,
} from '../components';

const Services: React.FC = () => {
  return (
    <>
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
