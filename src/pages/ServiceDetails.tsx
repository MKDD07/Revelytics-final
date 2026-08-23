import React from 'react';
import {
  ServiceDetailsHero,
  ServiceDetailsOverview,
  ServiceDetailsProcess,
  ServiceDetailsWhyChooseUs,
  ServiceDetailsFaq,
  ServiceDetailsBanner1,
  Cta1,
} from '../components';

const ServiceDetails: React.FC = () => {
  return (
    <>
      {/* Service Details Header */}
      <ServiceDetailsHero />

      {/* Service Overview & Strategy */}
      <ServiceDetailsOverview />

      {/* 4-Step Travel Transformation Process */}
      <ServiceDetailsProcess />

      {/* Immersive Travel Banner */}
      <ServiceDetailsBanner1 />

      {/* Why Travel Leaders Choose Revlytics */}
      <ServiceDetailsWhyChooseUs />

      {/* Service Specific FAQs */}
      <ServiceDetailsFaq />

      {/* Call To Action */}
      <Cta1 />
    </>
  );
};

export default ServiceDetails;
