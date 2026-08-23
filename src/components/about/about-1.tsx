import React from 'react';
import { usePexelsImage } from '../../hooks';
import Button, { type ButtonProps, type ButtonVariant, type ButtonSize } from '../ui/Button';

// ==================================================
// TYPES
// ==================================================

export interface AboutCardItem {
  id?: string | number;
  title: string;
  description: string;
  query?: string;
  queryIndex?: number;
  src?: string;
  alt?: string;
}

export interface About1Props {
  subtitle?: React.ReactNode;
  title?: React.ReactNode;
  button?: (ButtonProps & { text: string }) | null;
  cards?: AboutCardItem[];
}

// ==================================================
// DEFAULT DATA
// ==================================================

const DEFAULT_CARDS: AboutCardItem[] = [
  {
    id: 1,
    title: 'Creative-First Hospitality',
    description: 'Every design, booking engine, or campaign starts with a bold idea rooted in luxury travel storytelling.',
    query: 'luxury resort hotel pool',
    queryIndex: 0,
  },
  {
    id: 2,
    title: 'Direct Booking Engines',
    description: 'Cutting-edge UI/UX built to maximize guest conversions and elevate hotelier direct revenue.',
    query: 'tropical beach drone aerial',
    queryIndex: 1,
  },
];

// Reusable Dynamic Card Item
const AboutCard: React.FC<{ card: AboutCardItem }> = ({ card }) => {
  const dynamicImage = usePexelsImage(card.query || '', card.queryIndex ?? 0);
  const imageSrc = card.src || dynamicImage;

  return (
    <div className="col-lg-6 col-md-6">
      <div className="tp-about-item cs-about-item mb-40">
        <div className="mb-35">
          <div className="tp-about-thumb fix" style={{ borderRadius: 16, overflow: 'hidden' }}>
            <img
              src={imageSrc}
              alt={card.alt || card.title}
              style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
        <div className="tp-about-content">
          <h3 className="tp-about-title mb-10">{card.title}</h3>
          <p className="tp-about-dec">{card.description}</p>
        </div>
      </div>
    </div>
  );
};

// ==================================================
// MAIN COMPONENT: About1
// ==================================================

const About1: React.FC<About1Props> = ({
  subtitle = 'About Us',
  title = (
    <>
      At Revlytics, we don&rsquo;t just build websites
      <br />
      or campaigns &mdash; we craft purpose-driven
      digital journeys for global travel brands.
    </>
  ),
  button = {
    text: 'Our Services',
    href: '#services',
    variant: 'stroke' as ButtonVariant,
    size: 'sm' as ButtonSize,
    showIcon: true,
  },
  cards = DEFAULT_CARDS,
}) => {
  return (
    <div className="tp-about-area pt-145">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-xxl-10 col-xl-12">
            <div className="tp-about-title-wrap mb-30">
              <h2 className="tp-section-title tp-text-perspective">
                {title}
                {button && (
                  <span className="tp-about-btn-transform d-inline-block ml-20 mt-20">
                    <Button {...button} />
                  </span>
                )}
              </h2>
            </div>
          </div>
        </div>

        <div className="tp-about-border mt-20 pt-55">
          <div className="row">
            <div className="col-lg-4">
              <div className="tp-about-subtitle-wrap mb-30">
                <span className="tp-about-subtitle">
                  <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1V13.8182H20.7232" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                    <path d="M23 13.8182L15.0349 19.1718L15.0349 8.46456L23 13.8182Z" fill="currentColor" />
                  </svg>
                  {subtitle}
                </span>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="tp-about-thumb-wrap ml-75">
                <div className="row gx-80">
                  {cards.map((card, index) => (
                    <AboutCard key={card.id || index} card={card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About1;