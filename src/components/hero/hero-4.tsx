import React, { useEffect, useRef } from 'react';
import { getPexelsImage } from '../../utils';
import Button from '../ui/Button';

// ==================================================
// START: Hero4 (Interactive Magnetic Showcase Banner)
// ==================================================

interface Hero4Props {
  titlePre?: string;
  titlePost?: string;
  bigTitle?: string;
  awardText?: string;
}

const Hero4: React.FC<Hero4Props> = ({
  titlePre = 'The perfect place',
  titlePost = 'for your masterpiece',
  bigTitle = 'Revlytics',
}) => {
  const magneticRef = useRef<HTMLDivElement>(null);

  const img1 = getPexelsImage('maldives luxury resort villa', 0, { width: 500, height: 700 });
  const img2 = getPexelsImage('tropical beach palm aerial', 1, { width: 500, height: 700 });
  const img3 = getPexelsImage('santorini greece scenic sea', 2, { width: 500, height: 700 });
  const img4 = getPexelsImage('amalfi coast cliffside italy', 3, { width: 500, height: 700 });

  useEffect(() => {
    const magneticEl = magneticRef.current;
    if (!magneticEl) return;

    let t = 0,
      a = 0,
      n = 0,
      o = 0,
      i = 0,
      s = 0;
    let animId: number;

    const updateMouse = (nX: number, nY: number) => {
      const rect = magneticEl.getBoundingClientRect();
      const offsetX = rect.left + rect.width / 50;
      const offsetY = rect.top + rect.height / 50;
      t = nX - offsetX;
      a = nY - offsetY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateMouse(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        updateMouse(event.touches[0].clientX, event.touches[0].clientY);
      }
    };

    magneticEl.addEventListener('mousemove', handleMouseMove);
    magneticEl.addEventListener('touchmove', handleTouchMove, { passive: true });

    const items = magneticEl.querySelectorAll<HTMLElement>('.mp-hero-magnetic-item');

    const animate = () => {
      i += 0.9 * (t - n);
      s += 0.9 * (a - o);
      i *= 0.86;
      s *= 0.86;
      n = t;
      o = a;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mRect = magneticEl.getBoundingClientRect();
        const dX = t - (centerX - mRect.left);
        const dY = a - (centerY - mRect.top);
        const distance = Math.sqrt(dX ** 2 + dY ** 2);
        const width = rect.width || 150;
        const power = Math.max(0, Math.min(1, 1 - distance / width));
        const limit = 250;

        let offsetX = i * power;
        let offsetY = s * power;

        offsetX = Math.max(Math.min(offsetX, limit), -limit);
        offsetY = Math.max(Math.min(offsetY, limit), -limit);

        item.style.setProperty('--offsetX', `${(2 * offsetX).toFixed(2)}`);
        item.style.setProperty('--offsetY', `${(2 * offsetY).toFixed(2)}`);
        item.style.setProperty('--velocity', `${(-0.35 * (offsetX - offsetY)).toFixed(2)}`);
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Also trigger global scripts if loaded
    if (typeof (window as any).ms_magnetic === 'function') {
      (window as any).ms_magnetic();
    }
    if (typeof (window as any).initJumpAnim === 'function') {
      (window as any).initJumpAnim();
    }

    return () => {
      magneticEl.removeEventListener('mousemove', handleMouseMove);
      magneticEl.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="mp-hero-area mp-hero-spacing pt-120 pb-120">
      <div className="container">
        <div className="row align-items-center">
          {/* Rotating Award Badge */}

          {/* Center / Right Content */}
          <div className="col-xl-9">
            <div className="mp-hero-content ml-75">
              <h2 className="mp-hero-title tp-ff-inter mb-40 tp-char-animation">
                {titlePre}
                <br /> {titlePost}
              </h2>

              <div className="mp-hero-btn d-flex flex-wrap gap-3 mb-50">
                <Button
                  text="Explore All Work"
                  href="#portfolio"
                  variant="fill-black"
                  showIcon={true}
                />
                <Button
                  text="Contact Us"
                  href="#contact-section"
                  variant="fill-grey"
                  showIcon={true}
                />
              </div>

              {/* Interactive Magnetic Floating Image Reel */}
              <div className="mp-hero-magnetic" ref={magneticRef}>
                <div className="mp-hero-magnetic-image-wrap d-flex flex-wrap flex-md-nowrap gap-3">
                  <div
                    className="mp-hero-magnetic-item mb-20 tp_fade_anim"
                    data-delay=".4"
                    data-fade-from="bottom"
                    data-ease="bounce"
                  >
                    <img
                      decoding="async"
                      src={img1}
                      className="mp-hero-magnetic-image"
                      alt="Luxury Resort Maldives"
                      style={{ borderRadius: 16, objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    className="mp-hero-magnetic-item mb-20 tp_fade_anim"
                    data-delay=".5"
                    data-fade-from="bottom"
                    data-ease="bounce"
                  >
                    <img
                      decoding="async"
                      src={img2}
                      className="mp-hero-magnetic-image"
                      alt="Tropical Coastal Getaway"
                      style={{ borderRadius: 16, objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    className="mp-hero-magnetic-item mb-20 tp_fade_anim"
                    data-delay=".6"
                    data-fade-from="bottom"
                    data-ease="bounce"
                  >
                    <img
                      decoding="async"
                      src={img3}
                      className="mp-hero-magnetic-image"
                      alt="Santorini Scenic Destination"
                      style={{ borderRadius: 16, objectFit: 'cover' }}
                    />
                  </div>

                  <div
                    className="mp-hero-magnetic-item mb-20 tp_fade_anim"
                    data-delay=".7"
                    data-fade-from="bottom"
                    data-ease="bounce"
                  >
                    <img
                      decoding="async"
                      src={img4}
                      className="mp-hero-magnetic-image"
                      alt="Amalfi Coast Cliffside"
                      style={{ borderRadius: 16, objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Big Jump Animated Title */}
        <div className="row">
          <div className="col-lg-12">
            <div
              className="mp-hero-bigtitle-wrap jump-anim text-center pt-10 tp_fade_anim"
              data-delay=".8"
              data-fade-from="bottom"
              data-ease="bounce"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero4;
