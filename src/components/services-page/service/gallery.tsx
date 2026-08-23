import React from 'react';
import { getPexelsImage } from '../../../utils';
import Button from '../../ui/Button';

// ==================================================
// START: Gallery
// ==================================================

export interface ServiceGalleryProps {
  title?: React.ReactNode;
  buttonText?: string;
  buttonHref?: string;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({
  title = (
    <>
      Explore<br /> Travel Destinations
    </>
  ),
  buttonText = 'Check Our Travel Packages',
  buttonHref = '#pricing',
}) => {
  const g1 = getPexelsImage('maldives', 0, { width: 600, height: 800 });
  const g2 = getPexelsImage('santorini', 0, { width: 600, height: 800 });
  const g3 = getPexelsImage('bali', 0, { width: 600, height: 800 });
  const g4 = getPexelsImage('amalfi', 0, { width: 600, height: 800 });
  const g5 = getPexelsImage('alps', 0, { width: 600, height: 800 });
  const g6 = getPexelsImage('kyoto', 0, { width: 600, height: 800 });
  const g7 = getPexelsImage('tulum', 0, { width: 600, height: 800 });
  const g8 = getPexelsImage('dubai', 0, { width: 600, height: 800 });
  const g9 = getPexelsImage('paris', 0, { width: 600, height: 800 });
  const g10 = getPexelsImage('iceland', 0, { width: 600, height: 800 });
  const g11 = getPexelsImage('resort', 0, { width: 600, height: 800 });
  const g12 = getPexelsImage('tropical', 0, { width: 600, height: 800 });

  return (
    <div className="mg-gallery-area fix pt-120 pb-120">
      <div className="container-fluid container-1886">
        <div className="inner-service-gallery tp-gallery-wrapper">
          <div className="inner-service-gallery-item about-us-history-title-wrap text-center mb-50">
            <h2 className="about-us-history-title tp-ff-sequel-bold-head text-uppercase mb-40">
              {title}
            </h2>
            <Button text={buttonText} href={buttonHref} variant="fill-black" size="lg" />
          </div>
          <div className="row gx-30">
            {/* Column 1 */}
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="-0.1">
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g1} alt="Portfolio Gallery 1" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g2} alt="Portfolio Gallery 2" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g3} alt="Portfolio Gallery 3" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g4} alt="Portfolio Gallery 4" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="0.8">
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g5} alt="Portfolio Gallery 5" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g6} alt="Portfolio Gallery 6" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g7} alt="Portfolio Gallery 7" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g8} alt="Portfolio Gallery 8" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
              <div className="tp-gallery-item-wrapper" data-speed="-0.1">
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g9} alt="Portfolio Gallery 9" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g10} alt="Portfolio Gallery 10" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g11} alt="Portfolio Gallery 11" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
                <div className="tp-gallery-item mb-30" style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <img className="w-100" src={g12} alt="Portfolio Gallery 12" style={{ borderRadius: 16, objectFit: 'cover', height: 380 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceGallery;
