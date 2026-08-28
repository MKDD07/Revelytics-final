import React, { useEffect, useRef } from 'react';

// ==================================================
// START: Funfact
// ==================================================

// All shapes MUST use exact same number of commands for browser-native SVG morphing
// Format: M <anchor> C <ctrl1> <ctrl2> <anchor> ... Z
// 6 cubic bezier curves (12 control points each), closing path at end
const DIAMOND = 'M136.499 150.219L119.898 75.0521L152.178 42.9688C166.012 29.2188 170.624 10.8854 166.012 1.71875C156.789 -2.86458 138.344 1.71875 124.509 15.4688L92.229 47.5521L16.6012 31.0521C11.9898 30.1354 8.30061 31.9687 6.45603 35.6354L3.68916 40.2187C1.84458 44.8021 2.76687 49.3854 6.45603 52.1354L55.3374 84.2188L36.8916 111.719H9.2229L0 120.885L27.6687 139.219L46.1145 166.719L55.3374 157.552V130.052L83.0061 111.719L115.286 160.302C118.053 163.969 122.665 164.885 127.276 163.052L131.888 161.219C135.577 158.469 137.421 154.802 136.499 150.219';
const LIGHTNING = 'M 150,15 C 200,60 260,65 255,120 C 250,175 175,160 180,210 C 185,260 120,275 100,240 C 80,205 140,185 130,140 C 120,95 50,105 60,55 C 70,5 100,0 150,15 Z';

const MORPH_STAGES = [
  DIAMOND,
  LIGHTNING,
  DIAMOND,
];

const Funfact: React.FC = () => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !pathRef.current) return;

    // Use GSAP attr tweening to animate the d attribute directly
    // This works with same-structure paths (same number/type of commands)
    const tween = gsap.to(pathRef.current, {
      attr: { d: LIGHTNING },
      duration: 2,
      ease: 'expo.inOut',
      repeat: -1,
      yoyo: true,
    });

    return () => {
      if (tween) tween.kill();
    };
  }, []);

  return (
    <>
      {/* Fun Facts Section (from service-2-light.html) */}
      <div className="tp-funfact-area pt-150 pb-165">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="tp-funfact-title-wrap mb-30">
                <span className="tp-section-subtitle">Fun Facts</span>
                <h2 className="tp-section-title reveal-text tp-ff-sequel-semi-bold">
                  Numbers that speak volumes
                </h2>

                {/* ----------------------------------------------------------- */}
                {/* GSAP attr-tweened SVG morph (diamond → lightning, repeat:-1, yoyo) */}
                {/* ----------------------------------------------------------- */}
                <div
                  className="pure-morph-icon-wrap mt-35"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <svg
                    width="220"
                    height="220"
                    viewBox="0 0 300 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ overflow: 'visible' }}
                  >
                    <defs>
                      <linearGradient
                        id="pure-theme-morph-grad"
                        x1="20"
                        y1="20"
                        x2="280"
                        y2="280"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#ff3c00" />
                        <stop offset="50%" stopColor="#fd5b0a" />
                        <stop offset="100%" stopColor="#cd4631" />
                      </linearGradient>
                    </defs>

                    {/* Morphing path animated by GSAP attr tween */}
                    <path
                      ref={pathRef}
                      d={DIAMOND}
                      fill="url(#pure-theme-morph-grad)"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="tp-funfact-content-wrap mt-75">
                <div className="tp-funfact-content-dec mb-80 ml-25">
                  <p>
                    Whether you need stunning visuals for your website
                    <br />
                    captivating graphics for your marketing materials innovative
                    <br />
                    UI/UX designs for your app our team of experts.
                  </p>
                </div>
                <div className="tp-funfact-item-wrap">
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="120"
                        className="purecounter"
                      >
                        0
                      </span>
                      +
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Nice! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">
                        Projects Completed
                      </h5>
                    </div>
                  </div>
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="16"
                        className="purecounter"
                      >
                        0
                      </span>
                      +
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Holy Moly! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">
                        Years of Experience
                      </h5>
                    </div>
                  </div>
                  <div className="tp-funfact-item d-flex align-items-center">
                    <h2 className="tp-funfact-numbar tp-ff-sequel-semi-bold mr-40 mb-20">
                      <span
                        data-purecounter-duration="1"
                        data-purecounter-end="185"
                        className="purecounter"
                      >
                        0
                      </span>
                      %
                    </h2>
                    <div className="tp-funfact-info mb-20">
                      <span>[ Ho Ho! ]</span>
                      <h5 className="tp-funfact-info-title tp-ff-sequel-semi-bold">
                        Growing Agency
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* tp-funfact-area-end */}
    </>
  );
};

export default Funfact;

// ==================================================
// END: Funfact
// ==================================================
