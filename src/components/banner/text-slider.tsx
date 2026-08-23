import React from 'react';

// ==================================================
// TYPES & INTERFACES
// ==================================================

export interface TextSliderItem {
  id?: number | string;
  text: string;
}

export interface TextSliderProps {
  items?: TextSliderItem[];
  bgColor?: string;
  className?: string;
}

const DEFAULT_ITEMS: TextSliderItem[] = [
  { id: 1, text: 'Exclusive Deals on Style!' },
  { id: 2, text: 'Exclusive Deals on Style!' },
  { id: 3, text: 'Exclusive Deals on Style!' },
  { id: 4, text: 'Exclusive Deals on Style!' },
  { id: 5, text: 'Exclusive Deals on Style!' },
  { id: 6, text: 'Exclusive Deals on Style!' },
  { id: 7, text: 'Exclusive Deals on Style!' },
  { id: 8, text: 'Exclusive Deals on Style!' },
];

// ==================================================
// COMPONENT: TextSlider (shop-text-slider)
// ==================================================

const TextSlider: React.FC<TextSliderProps> = ({
  items = DEFAULT_ITEMS,
  bgColor = '#e1eeb7',
  className = 'mt-160',
}) => {
  return (
    <>
      {/* shop-text-slider-area-start */}
      <div
        className={`shop-text-slider pp-porfolio-slider ${className}`.trim()}
        data-bg-color={bgColor}
      >
        <div className="swiper pp-slide-active">
          <div className="swiper-wrapper slide-transtion">
            {items.map((item, index) => (
              <div key={item.id || index} className="swiper-slide">
                <span>
                  {item.text} <span></span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* shop-text-slider-area-end */}
    </>
  );
};

export default TextSlider;
