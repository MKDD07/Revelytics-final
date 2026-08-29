export interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogType: 'website' | 'article' | 'service';
  ogImage: string;
  author?: string;
  publishedTime?: string;
  schema: Record<string, any> | Array<Record<string, any>>;
}

export const SITE_ORIGIN = 'https://www.revlytics.in';
export const DEFAULT_OG_IMAGE = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const CORE_PAGES_SEO: Record<string, PageMetadata> = {
  home: {
    title: 'Revlytics | Travel Digital Acceleration & Booking UX',
    description: 'Revlytics is a travel digital acceleration agency helping luxury resorts, boutique hotels, and destinations scale direct bookings through high-performance UX.',
    keywords: 'travel digital agency, luxury resort branding, direct booking UX, hotel website design, destination marketing, hospitality digital transformation',
    canonical: `${SITE_ORIGIN}/`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Revlytics',
      url: `${SITE_ORIGIN}/`,
      logo: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Revlytics is a travel digital acceleration agency helping luxury resorts, boutique hotels, and destinations scale direct bookings.',
      sameAs: [
        'https://twitter.com/revlytics',
        'https://linkedin.com/company/revlytics',
        'https://instagram.com/revlytics',
      ],
    },
  },
  services: {
    title: 'Our Services | Revlytics Travel Digital Solutions',
    description: 'Explore Revlytics full suite of hospitality digital services: Resort Branding, Booking Engine UX, Destination SEO, 3D Virtual Tours, and Mobile Apps.',
    keywords: 'travel services, luxury resort branding, direct booking engine UX, hospitality SEO, hotel web development, resort mobile app',
    canonical: `${SITE_ORIGIN}/services`,
    ogType: 'website',
    ogImage: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Revlytics Travel Digital Solutions & Services',
      description: 'Full suite of travel digital services for luxury resorts, boutique hotels, and destinations.',
      url: `${SITE_ORIGIN}/services`,
    },
  },
  blog: {
    title: 'Travel Insights & Hospitality Trends | Revlytics Journal',
    description: 'Read expert strategies, analyses, and case studies on hotel direct bookings, hospitality technology, travel UX design, and resort growth.',
    keywords: 'travel marketing insights, hospitality tech trends, hotel direct bookings blog, resort marketing strategy, destination branding articles',
    canonical: `${SITE_ORIGIN}/blog`,
    ogType: 'website',
    ogImage: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Revlytics Journal & Travel Insights',
      description: 'Hospitality insights, direct booking playbooks, and luxury travel technology analyses.',
      url: `${SITE_ORIGIN}/blog`,
    },
  },
  faq: {
    title: 'Frequently Asked Questions | Revlytics Agency',
    description: 'Find answers to common questions about Revlytics travel digital transformation services, direct booking optimization, CRS/PMS integrations, and retainers.',
    keywords: 'hospitality faq, hotel digital agency questions, direct booking engine faq, hotel website design faq',
    canonical: `${SITE_ORIGIN}/faq`,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Revlytics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Revlytics is a full-service travel digital acceleration agency helping luxury resorts, boutique hotels, and global destination brands scale direct bookings.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a travel digital transformation project take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Project timelines range from 2 to 8 weeks depending on scope, from direct booking engine UX audits to end-to-end multi-property digital platforms.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you integrate with our existing CRS and PMS booking engines?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We seamlessly integrate with major booking engines including SynXis, Sabre, Cloudbeds, Mews, SiteMinder, and custom direct booking APIs.',
          },
        },
      ],
    },
  },
  contact: {
    title: 'Contact Revlytics | Accelerate Your Travel Brand',
    description: 'Ready to scale direct bookings for your hotel, luxury resort, or destination brand? Contact the Revlytics team for a discovery session and direct booking audit.',
    keywords: 'contact Revlytics, travel agency contact, direct booking audit, resort digital acceleration inquiry',
    canonical: `${SITE_ORIGIN}/contact`,
    ogType: 'website',
    ogImage: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Revlytics',
      description: 'Schedule a discovery session and direct booking audit with Revlytics.',
      url: `${SITE_ORIGIN}/contact`,
    },
  },
};

export const SERVICES_SEO: Record<string, PageMetadata> = {
  'luxury-resort-branding': {
    title: 'Luxury Resort Branding & Visual Identity | Revlytics',
    description: 'Elevate your luxury resort with bespoke brand strategy, kinetic visual design, and premium experiential identity crafted for direct bookings.',
    keywords: 'luxury resort branding, hospitality brand strategy, hotel visual identity, luxury resort marketing',
    canonical: `${SITE_ORIGIN}/services/luxury-resort-branding`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Luxury Resort Branding',
      serviceType: 'Hospitality Brand Strategy & Identity',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Elevate your luxury resort with bespoke brand strategy, kinetic visual design, and premium experiential identity.',
      url: `${SITE_ORIGIN}/services/luxury-resort-branding`,
    },
  },
  'direct-booking-engine-ux': {
    title: 'Direct Booking Engine UX & Conversion Design | Revlytics',
    description: 'Maximize direct reservations with frictionless hotel booking engine UX, mobile-first reservation funnels, and high-converting checkout flows.',
    keywords: 'direct booking engine ux, hotel booking funnel, hospitality conversion rate optimization, booking engine design',
    canonical: `${SITE_ORIGIN}/services/direct-booking-engine-ux`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Direct Booking Engine UX',
      serviceType: 'Booking Funnel & CRO Engineering',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Maximize direct reservations with frictionless hotel booking engine UX and mobile-first reservation funnels.',
      url: `${SITE_ORIGIN}/services/direct-booking-engine-ux`,
    },
  },
  'destination-marketing-seo': {
    title: 'Destination Marketing & Hospitality SEO | Revlytics',
    description: 'Dominate travel intent with destination-first SEO, luxury hotel search visibility, hyper-local search strategy, and high-intent booking growth.',
    keywords: 'destination marketing, hospitality seo, hotel search optimization, travel digital marketing',
    canonical: `${SITE_ORIGIN}/services/destination-marketing-seo`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Destination Marketing & SEO',
      serviceType: 'Travel Search Engine Optimization',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Dominate travel intent with destination-first SEO and luxury hotel search visibility.',
      url: `${SITE_ORIGIN}/services/destination-marketing-seo`,
    },
  },
  'virtual-travel-experience-3d': {
    title: 'Virtual Travel Experiences & 3D Web Design | Revlytics',
    description: 'Immerse travelers with interactive 3D property tours, kinetic digital environments, and interactive WebGL experiences for luxury hotels.',
    keywords: 'virtual travel experiences, 3D hotel tours, WebGL hospitality design, interactive resort walkthrough',
    canonical: `${SITE_ORIGIN}/services/virtual-travel-experience-3d`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Virtual Travel Experience & 3D',
      serviceType: '3D Web & Interactive Property Tours',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Immerse travelers with interactive 3D property tours and interactive WebGL experiences for luxury hotels.',
      url: `${SITE_ORIGIN}/services/virtual-travel-experience-3d`,
    },
  },
  'hospitality-mobile-app-suite': {
    title: 'Hospitality Mobile App Suite & Guest UX | Revlytics',
    description: 'Deliver seamless guest experiences with custom hotel mobile apps, digital key integrations, in-stay concierge services, and mobile check-in.',
    keywords: 'hospitality mobile app, hotel guest app, digital key integration, resort mobile experience',
    canonical: `${SITE_ORIGIN}/services/hospitality-mobile-app-suite`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Hospitality Mobile App Suite',
      serviceType: 'Hotel Guest Mobile Applications',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Deliver seamless guest experiences with custom hotel mobile apps and digital key integrations.',
      url: `${SITE_ORIGIN}/services/hospitality-mobile-app-suite`,
    },
  },
  'ui-ux-design': {
    title: 'UI/UX Design for Travel & Hospitality Brands | Revlytics',
    description: 'Craft world-class digital guest journeys with human-centered UI/UX design, fluid micro-interactions, and conversion-engineered interfaces.',
    keywords: 'travel ui ux design, hospitality website design, hotel user experience, booking ux',
    canonical: `${SITE_ORIGIN}/services/ui-ux-design`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'UI/UX Design',
      serviceType: 'Hospitality Product & Web Design',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Craft world-class digital guest journeys with human-centered UI/UX design and fluid micro-interactions.',
      url: `${SITE_ORIGIN}/services/ui-ux-design`,
    },
  },
  'web-development': {
    title: 'Custom Web Development for Hotels & Resorts | Revlytics',
    description: 'High-speed, scalable web engineering for hotel brands, resort portfolios, and travel platforms integrated with modern CRS and PMS booking APIs.',
    keywords: 'hotel web development, resort website engineering, hospitality cms, travel platform development',
    canonical: `${SITE_ORIGIN}/services/web-development`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Web Development',
      serviceType: 'Custom Hospitality Engineering',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'High-speed, scalable web engineering for hotel brands, resort portfolios, and travel platforms.',
      url: `${SITE_ORIGIN}/services/web-development`,
    },
  },
  'brand-identity': {
    title: 'Hospitality Brand Identity & Creative Direction | Revlytics',
    description: 'Define iconic brand stories for boutique hotels, eco-lodges, and destination properties through comprehensive creative direction and design.',
    keywords: 'hospitality brand identity, hotel creative direction, boutique hotel branding, resort style guide',
    canonical: `${SITE_ORIGIN}/services/brand-identity`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Brand Identity',
      serviceType: 'Visual Identity & Creative Direction',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Define iconic brand stories for boutique hotels, eco-lodges, and destination properties.',
      url: `${SITE_ORIGIN}/services/brand-identity`,
    },
  },
  'digital-marketing': {
    title: 'Travel Digital Marketing & Performance Growth | Revlytics',
    description: 'Scale direct revenue with performance travel advertising, paid social acquisition, multi-channel retargeting, and automated email funnels.',
    keywords: 'travel digital marketing, hotel paid media, resort performance marketing, hospitality advertising',
    canonical: `${SITE_ORIGIN}/services/digital-marketing`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Digital Marketing',
      serviceType: 'Performance Acquisition & Growth Marketing',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Scale direct revenue with performance travel advertising, paid social acquisition, and automated funnels.',
      url: `${SITE_ORIGIN}/services/digital-marketing`,
    },
  },
  'motion-graphics': {
    title: 'Motion Graphics & Dynamic Visual Content | Revlytics',
    description: 'Captivate guests with cinematic motion graphics, kinetic typography, and short-form video storytelling tailored for luxury travel brands.',
    keywords: 'travel motion graphics, hospitality video production, kinetic typography, hotel promo animations',
    canonical: `${SITE_ORIGIN}/services/motion-graphics`,
    ogType: 'service',
    ogImage: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Motion Graphics',
      serviceType: 'Kinetic & Video Visual Storytelling',
      provider: {
        '@type': 'Organization',
        name: 'Revlytics',
        url: `${SITE_ORIGIN}/`,
      },
      description: 'Captivate guests with cinematic motion graphics and short-form video storytelling.',
      url: `${SITE_ORIGIN}/services/motion-graphics`,
    },
  },
};

export const BLOGS_SEO: Record<string, PageMetadata> = {
  'mastering-travel-digital-marketing-growth-guide': {
    title: 'Mastering Travel Digital Marketing in 2026 | Revlytics Guide',
    description: 'Discover proven travel digital marketing strategies covering SEO, short-form video, UGC, automated funnels, and frictionless mobile checkouts.',
    keywords: 'TravelMarketing, SEOStrategy, DigitalMarketing, HospitalityGrowth, SocialMediaTrends',
    canonical: `${SITE_ORIGIN}/blog/mastering-travel-digital-marketing-growth-guide`,
    ogType: 'article',
    ogImage: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Elena Rostova',
    publishedTime: '2026-08-25',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Mastering Travel Digital Marketing: Strategies to Drive Bookings in 2026',
      description: 'Discover proven travel digital marketing strategies covering SEO, short-form video, UGC, automated funnels, and frictionless mobile checkouts.',
      image: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: {
        '@type': 'Person',
        name: 'Elena Rostova',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Revlytics',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      },
      datePublished: '2026-08-25',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/blog/mastering-travel-digital-marketing-growth-guide`,
      },
    },
  },
  'transforming-direct-hotel-bookings-2025': {
    title: 'Transforming Direct Hotel Bookings: 2026 Playbook | Revlytics',
    description: 'How modern luxury hospitality brands bypass OTA commissions with frictionless custom direct booking flows, one-click wallets, and instant UX.',
    keywords: 'Hospitality Tech, Direct Bookings, Hotel Conversion Optimization, Travel Engineering',
    canonical: `${SITE_ORIGIN}/blog/transforming-direct-hotel-bookings-2025`,
    ogType: 'article',
    ogImage: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Revlytics Editorial',
    publishedTime: '2026-08-20',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Transforming Direct Hotel Bookings in 2026',
      description: 'How modern luxury hospitality brands bypass OTA commissions with frictionless custom direct booking flows.',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: {
        '@type': 'Person',
        name: 'Revlytics Editorial',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Revlytics',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      },
      datePublished: '2026-08-20',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/blog/transforming-direct-hotel-bookings-2025`,
      },
    },
  },
  'crafting-immersive-destination-web-experiences': {
    title: 'Crafting Immersive Destination Web Experiences | Revlytics',
    description: 'Why dynamic media, kinetic typography, and sub-second loading speeds drive 40% higher room reservations for luxury boutique resorts.',
    keywords: 'UI/UX Design, Immersive Web Experiences, Destination Storytelling, Hospitality UX',
    canonical: `${SITE_ORIGIN}/blog/crafting-immersive-destination-web-experiences`,
    ogType: 'article',
    ogImage: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Revlytics Editorial',
    publishedTime: '2026-08-15',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Crafting Immersive Destination Web Experiences',
      description: 'Why dynamic media, kinetic typography, and sub-second loading speeds drive 40% higher room reservations.',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: {
        '@type': 'Person',
        name: 'Revlytics Editorial',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Revlytics',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      },
      datePublished: '2026-08-15',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/blog/crafting-immersive-destination-web-experiences`,
      },
    },
  },
  'building-modern-identities-for-boutique-resorts': {
    title: 'Building Modern Identities for Boutique Resorts | Revlytics',
    description: 'The architectural elements of modern hospitality branding and experiential storytelling that turn one-time visitors into lifelong advocates.',
    keywords: 'Brand Strategy, Boutique Resort Identity, Luxury Hospitality Branding, Visual Identity',
    canonical: `${SITE_ORIGIN}/blog/building-modern-identities-for-boutique-resorts`,
    ogType: 'article',
    ogImage: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: 'Revlytics Editorial',
    publishedTime: '2026-08-10',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: 'Building Modern Identities for Boutique Resorts',
      description: 'The architectural elements of modern hospitality branding and experiential storytelling.',
      image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
      author: {
        '@type': 'Person',
        name: 'Revlytics Editorial',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Revlytics',
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
        },
      },
      datePublished: '2026-08-10',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_ORIGIN}/blog/building-modern-identities-for-boutique-resorts`,
      },
    },
  },
};

/**
 * Resolve metadata for any path
 */
export function getMetadataForPath(pathname: string): PageMetadata {
  const clean = pathname.replace(/^\/|\/$/g, '').toLowerCase();
  const parts = clean.split('/');
  const section = parts[0] || 'home';
  const slug = parts[1];

  if (section === 'services' && slug && SERVICES_SEO[slug]) {
    return SERVICES_SEO[slug];
  }
  if (section === 'service-details' && slug && SERVICES_SEO[slug]) {
    return SERVICES_SEO[slug];
  }
  if (section === 'blog' && slug && BLOGS_SEO[slug]) {
    return BLOGS_SEO[slug];
  }
  if (section === 'blog-details' && slug && BLOGS_SEO[slug]) {
    return BLOGS_SEO[slug];
  }

  if (SERVICES_SEO[clean]) {
    return SERVICES_SEO[clean];
  }
  if (BLOGS_SEO[clean]) {
    return BLOGS_SEO[clean];
  }
  if (CORE_PAGES_SEO[section]) {
    return CORE_PAGES_SEO[section];
  }

  // Fallback for custom slugs
  if (section === 'services' && slug) {
    const formatted = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      title: `${formatted} | Revlytics`,
      description: `Transform your hospitality brand with Revlytics ${formatted} digital acceleration solutions.`,
      keywords: `hospitality, travel digital transformation, ${slug.replace(/-/g, ' ')}`,
      canonical: `${SITE_ORIGIN}/services/${slug}`,
      ogType: 'service',
      ogImage: DEFAULT_OG_IMAGE,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: formatted,
        provider: { '@type': 'Organization', name: 'Revlytics' },
      },
    };
  }

  if (section === 'blog' && slug) {
    const formatted = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    return {
      title: `${formatted} | Revlytics Journal`,
      description: `Read the latest travel industry analysis on ${formatted} by Revlytics.`,
      keywords: `travel marketing, hospitality, ${slug.replace(/-/g, ' ')}`,
      canonical: `${SITE_ORIGIN}/blog/${slug}`,
      ogType: 'article',
      ogImage: DEFAULT_OG_IMAGE,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: formatted,
        publisher: { '@type': 'Organization', name: 'Revlytics' },
      },
    };
  }

  return CORE_PAGES_SEO.home;
}
