import React from 'react';
import { getPexelsImage } from '../../utils';

export interface PortfolioItem {
  id: string | number;
  title: string;
  year: string;
  link?: string;
  imageQuery?: string;
  imageAlt: string;
  src?: string;
  colClass?: string;
  itemClass?: string;
}

interface Portfolio3Props {
  sectionTitlePre?: string;
  sectionTitleHighlight?: string;
  sectionTitlePost?: string;
  items?: PortfolioItem[];
}

const DEFAULT_PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'Amanpuri Resort UI/UX',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Boutique Resort & Pool Design',
    colClass: 'col-xxl-3 col-xl-4 col-lg-6 col-md-6',
    itemClass: '',
  },
  {
    id: 2,
    title: 'Direct Booking Engine',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Maldives Overwater Resort Engine',
    colClass: 'col-xxl-4 col-xl-4 offset-xxl-5 offset-xl-4 col-lg-6 col-md-6',
    itemClass: 'ca-portfolio-item-2 mt-110',
  },
  {
    id: 3,
    title: 'Villa Belmond Identity',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Santorini Luxury Villa Branding',
    colClass: 'col-xl-4 offset-xl-2 col-lg-6 col-md-6',
    itemClass: 'ca-portfolio-item-3',
  },
  {
    id: 4,
    title: 'Virtual Travel Concierge',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Bali Destination Experience Guide',
    colClass: 'col-xl-3 offset-xl-1 col-lg-6 col-md-6',
    itemClass: 'ca-portfolio-item-4 mt-110',
  },
  {
    id: 5,
    title: 'Eco Resort Mobile App',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Amalfi Coast Mobile Booking Experience',
    colClass: 'col-xl-4 col-lg-6 col-md-6',
    itemClass: 'ca-portfolio-item-3',
  },
  {
    id: 6,
    title: 'Alpine Chalet Campaign',
    year: '2025',
    link: '#portfolio',
    src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop',
    imageAlt: 'Swiss Alps Luxury Retreat',
    colClass: 'col-xl-4 offset-xl-4 col-lg-6 col-md-6',
    itemClass: 'ca-portfolio-item-6',
  },
];

const Portfolio3: React.FC<Portfolio3Props> = ({
  sectionTitlePre = 'Our',
  sectionTitleHighlight = 'Work',
  sectionTitlePost = 'Featured',
  items = DEFAULT_PORTFOLIO_ITEMS,
}) => {
  return (
    <div className="ca-portfolio-area portfolio-area pt-160 pb-130">
      <div className="container">
        {/* Header Section */}
        <div className="row">
          <div className="col-xxl-6 col-xl-6 offset-xxl-3 offset-xl-4">
            <div className="ca-portfolio-main-title-wrap mb-50">
              <h2 className="ca-portfolio-main-title tp-ff-sequel-bold-head portfolio-text">
                {sectionTitlePre}{' '}
                <span>
                  {sectionTitleHighlight}
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1806 0.652913C10.5028 -0.217705 11.7342 -0.217705 12.0563 0.652913L14.4701 7.17599C14.5714 7.44971 14.7872 7.66552 15.0609 7.7668L21.584 10.1806C22.4546 10.5027 22.4546 11.7341 21.584 12.0563L15.0609 14.47C14.7872 14.5713 14.5714 14.7871 14.4701 15.0608L12.0563 21.5839C11.7342 22.4545 10.5028 22.4545 10.1806 21.5839L7.76686 15.0608C7.66558 14.7871 7.44977 14.5713 7.17605 14.47L0.652974 12.0563C-0.217644 11.7341 -0.217644 10.5027 0.652974 10.1806L7.17605 7.7668C7.44977 7.66552 7.66558 7.44971 7.76686 7.17599L10.1806 0.652913Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <br /> {sectionTitlePost}
              </h2>
            </div>
          </div>
        </div>

        {/* Dynamic Portfolio Items Grid */}
        <div className="row">
          {items.map((item, index) => {
            const imgSrc =
              item.src ||
              getPexelsImage(item.imageQuery || 'travel luxury', index, {
                width: 800,
                height: 1000,
              });

            return (
              <div
                key={item.id}
                className={item.colClass || 'col-xl-4 col-lg-6 col-md-6'}
              >
                <div
                  className={`ca-portfolio-item tp-hover-item mb-30 ${
                    item.itemClass || ''
                  }`}
                >
                  <a
                    href={item.link || '#portfolio'}
                    className="ca-portfolio-thumb mb-15 p-relative fix d-block"
                    style={{ borderRadius: 16, overflow: 'hidden' }}
                  >
                    <div className="tp-hover-img">
                      <img
                        className="w-100"
                        src={imgSrc}
                        alt={item.imageAlt}
                        style={{
                          borderRadius: 16,
                          objectFit: 'cover',
                          height: 400,
                        }}
                      />
                    </div>
                  </a>
                  <div className="ca-portfolio-content d-flex justify-content-between">
                    <h5 className="ca-portfolio-title mb-0">
                      <a
                        href={item.link || '#portfolio'}
                        className="common-underline"
                      >
                        {item.title}
                      </a>
                    </h5>
                    <span className="ca-portfolio-date tp-ff-sequel-medium">
                      / {item.year}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Portfolio3;