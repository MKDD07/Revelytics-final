import React from 'react';
import {
  ServiceHero,
  ServiceList,
  ResumeSpecialties,
  ServiceGallery,
  Pricing,
  Cta1,
} from '../components';

const Services: React.FC = () => {
  return (
    <>
      {/* Services Header & Intro */}
      <ServiceHero />

      {/* Interactive Travel Services (Booking UX, Luxury Resort Branding, Travel Ads) */}
      <ServiceList />

      {/* Travel Capabilities & Specialties Breakdown */}
      <ResumeSpecialties />

      {/* Destination & Hospitality Gallery */}
      <ServiceGallery />

      {/* Travel Digital Packages & Pricing */}
      <Pricing />

      {/* Start Your Travel Brand Project */}
      <Cta1 />
    </>
  );
};

export default Services;
