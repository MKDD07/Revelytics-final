import React, { useState } from 'react';

// Common plan features icon component
const CheckIcon = () => (
  <span>
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
      <path d="M4.44737 11L0 5.66667L4.44737 8.33333L13 0L4.44737 11Z" fill="currentColor" fillOpacity="0.8" />
    </svg>
  </span>
);

// Structured pricing plans dataset (in INR)
const PRICING_DATA = {
  monthly: [
    {
      id: 'basic-monthly',
      name: 'Starter',
      description: 'Ideal for small businesses & startups.',
      price: '₹1,999',
      period: '/monthly',
      isPopular: false,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'Social Media Setup',
      ],
    },
    {
      id: 'standard-monthly',
      name: 'Standard',
      description: 'Ideal for growing teams needing continuous design.',
      price: '₹4,499',
      period: '/monthly',
      isPopular: true,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'On-Demand Design Revisions',
      ],
    },
    {
      id: 'advanced-monthly',
      name: 'Advanced',
      description: 'Ideal for scaling enterprises and high volume.',
      price: '₹6,499',
      period: '/monthly',
      isPopular: false,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'On-Demand Design Revisions',
      ],
    },
  ],
  yearly: [
    {
      id: 'basic-yearly',
      name: 'Starter',
      description: 'Ideal for small businesses & startups.',
      price: '₹19,999',
      period: '/yearly',
      isPopular: false,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'Social Media Setup',
      ],
    },
    {
      id: 'standard-yearly',
      name: 'Standard',
      description: 'Ideal for growing teams needing continuous design.',
      price: '₹44,999',
      period: '/yearly',
      isPopular: true,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'On-Demand Design Revisions',
      ],
    },
    {
      id: 'advanced-yearly',
      name: 'Advanced',
      description: 'Ideal for scaling enterprises and high volume.',
      price: '₹64,999',
      period: '/yearly',
      isPopular: false,
      features: [
        'Basic Branding Package',
        'Custom 5-Page Website',
        'SEO Optimization Basics',
        'Full Brand Strategy & Design',
        'On-Demand Design Revisions',
      ],
    },
  ],
};

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);

  const activePlans = isYearly ? PRICING_DATA.yearly : PRICING_DATA.monthly;

  return (
    <div id="pricing" className="tp-pricing-ptb pt-155 pb-130">
      <div className="container container-1480">
        <div className="row align-items-end">
          <div className="col-lg-8">
            <div className="tp-pricing-heading mb-65">
              <span className="tp-section-subtitle fs-20 fw-500 mb-10 d-inline-block">
                Travel &amp; Hospitality Plans
              </span>
              <h2 className="tp-section-title reveal-text">
                Special Offer! Choose<br /> your package today
              </h2>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="tp-pricing-nav-wrapper p-relative mb-80 d-flex justify-content-lg-end align-items-center">
              <label 
                className={`tp-toggler-pre ${!isYearly ? 'is-active' : ''}`} 
                id="tp-nav-monthly"
                onClick={() => setIsYearly(false)}
                style={{ cursor: 'pointer' }}
              >
                Monthly
              </label>
              <div className="tp-toggle-input-wrap">
                <input 
                  type="checkbox" 
                  id="tp-switcher-input" 
                  className="tp-input-check" 
                  checked={isYearly}
                  onChange={(e) => setIsYearly(e.target.checked)}
                />
                <b className="tp-switch-toggle" />
              </div>
              <label 
                className={`tp-toggler-post ${isYearly ? 'is-active' : ''}`} 
                id="tp-nav-yearly"
                onClick={() => setIsYearly(true)}
                style={{ cursor: 'pointer' }}
              >
                Yearly
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="tp-pricing-tab-item">
              <div className="row">
                {activePlans.map((plan) => (
                  <div className="col-xl-4 col-md-6" key={plan.id}>
                    <div className={`ds-price-item ${plan.isPopular ? 'active' : ''} mb-30`}>
                      {plan.isPopular && (
                        <div className="ds-price-item-tag">
                          <span>popular</span>
                        </div>
                      )}
                      <div className="ds-price-item-head">
                        <span className="text-capitalize">{plan.name}</span>
                        <p>{plan.description}</p>
                        <h4>
                          {plan.price} <i> {plan.period}</i>
                        </h4>
                      </div>
                      <div className="ds-price-item-list">
                        <h4 className="ds-price-item-list-title">Includes:</h4>
                        <ul>
                          {plan.features.map((feature, idx) => (
                            <li key={idx}>
                              <CheckIcon />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="ds-price-item-btn">
                        <a 
                          className={`tp-btn ${!plan.isPopular ? 'tp-btn-border' : ''} tp-btn-xxl w-100 justify-content-center`} 
                          href="contact-us-light.html"
                        >
                          <span>
                            <span className="text-1">Choose your plan</span>
                            <span className="text-2">Choose your plan</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;