import React from 'react';
import Button, { type ButtonProps, type ButtonVariant, type ButtonSize } from '../ui/Button';

// ==================================================
// TYPES
// ==================================================

export interface Cta1Props {
  title?: React.ReactNode;
  bgColor?: string;
  button?: ButtonProps & { text: string };
  thumbImg?: string;
  shapeImg?: string;
  scaleValues?: {
    start: string | number;
    end: string | number;
  };
  className?: string;
}

// ==================================================
// MAIN COMPONENT: Cta1
// ==================================================

const Cta1: React.FC<Cta1Props> = ({
  title = (
    <>
      Lets talk about
      <br />
      your project!
    </>
  ),
  bgColor = '#09090b',
  button = {
    text: 'Contact Me',
    href: 'contact-us-light.html',
    variant: 'fill-red' as ButtonVariant,
    fontFamily: 'inter',
    showIcon: true,
  },
  thumbImg = 'assets/img/cta/shape-2.png',
  shapeImg = 'assets/img/cta/shape-3.png',
  scaleValues = { start: '1.45', end: '1' },
  className = '',
}) => {
  return (
    <div
      className={`ca-testimonial-spacing mb-120 fix ${className}`.trim()}
      data-bg-color={bgColor}
      style={{ backgroundColor: bgColor }}
    >
      <div className="ca-cta-area ca-cta-spacing pt-180 pb-120 p-relative z-index-1">
        <div
          className="mil-scale-img ca-cta-scale"
          data-value-1={scaleValues.start}
          data-value-2={scaleValues.end}
        />
        <div className="container">
          <div className="row align-content-end">
            <div className="col-lg-7">
              <div className="ca-cta-title-wrap p-relative mb-40">
                <h2 className="ca-section-title fs-100 text-white lh-1 mb-50 reveal-text">
                  {title}
                </h2>

                {button && (
                  <div
                    className="tp_fade_anim"
                    data-delay=".4"
                    data-fade-from="bottom"
                    data-ease="bounce"
                  >
                    <Button {...button} />
                  </div>
                )}

                {shapeImg && (
                  <img
                    className="ca-cta-shape-2 d-none d-sm-inline-block"
                    src={shapeImg}
                    alt="CTA Shape"
                  />
                )}
              </div>
            </div>

            {thumbImg && (
              <div className="col-lg-5">
                <div className="ca-cta-thumb ml-100">
                  <img src={thumbImg} alt="CTA Thumbnail" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta1;