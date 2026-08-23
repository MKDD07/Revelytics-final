import React from 'react';

// Generates an array from 1 to 14: [ { id: 1, img: 'assets/img/brand/brand_2_1.png', ... }, ... ]
const DEFAULT_BRANDS = Array.from({ length: 14 }, (_, index) => {
  const count = index + 1;
  return {
    id: count,
    img: `assets/img/brand/brand_2_${count}.svg`,
    alt: `Brand ${count}`,
    link: '#',
  };
});

const Brand1 = ({ brands = DEFAULT_BRANDS, className = '' }) => {
  return (
    <div className={`ca-brand-area pt-100 ${className}`.trim()}>
      <div className="swiper cs-brand-slider-active">
        <div className="swiper-wrapper slide-transtion">
          {brands.map((brand, index) => (
            <div className="swiper-slide" key={brand.id || index}>
              <a href={brand.link || '#'} className="cs-brand-logo">
                <img src={brand.img} alt={brand.alt || 'Brand Logo'} width={120} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand1;