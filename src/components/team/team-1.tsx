import React from 'react';
import { getPexelsImage } from '../../utils';

// ==================================================
// START: Team1
// ==================================================

const Team1 = () => {
  const m1 = getPexelsImage('team', 0, { width: 600, height: 750 });
  const m2 = getPexelsImage('team', 1, { width: 600, height: 750 });
  const m3 = getPexelsImage('team', 2, { width: 600, height: 750 });
  const m4 = getPexelsImage('team', 3, { width: 600, height: 750 });

  return (
    <>
      {/* Team Section 1 */}
      <div className="ca-team-area pb-120" data-bg-color="#09090b">
        <div className="container">
          <div className="ca-team-border pt-150" />
          <div className="row">
            <div className="col-lg-5">
              <div className="ca-team-subtitle-wrap mb-30">
                <span className="ca-team-subtitle text-white">
                  <span>[</span> Our achievements <span>]</span>
                </span>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="ca-team-title-wrap mb-50">
                <h2 className="ca-section-title fs-100 text-white lh-1 reveal-text">
                  Meet the <br /> talented team
                </h2>
              </div>
            </div>

            {/* Member 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="ca-team-item tp-hover-item mb-30 tp_fade_anim" data-delay=".3">
                <a href="#" className="ca-portfolio-thumb mb-20 p-relative fix d-block">
                  <div className="tp-hover-img">
                    <img className="w-100" src={m1} alt="Halvam Alvida" style={{ borderRadius: 8, height: 360, objectFit: 'cover' }} />
                  </div>
                </a>
                <div className="ca-team-content">
                  <h5 className="ca-team-title tp-ff-inter text-white mb-0">
                    <a href="#" className="common-underline">Halvam Alvida</a>
                  </h5>
                  <span>Co-Ordinator</span>
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="ca-team-item tp-hover-item mb-30 tp_fade_anim" data-delay=".5">
                <a href="#" className="ca-portfolio-thumb mb-20 p-relative fix d-block">
                  <div className="tp-hover-img">
                    <img className="w-100" src={m2} alt="Rosalina Willaim" style={{ borderRadius: 8, height: 360, objectFit: 'cover' }} />
                  </div>
                </a>
                <div className="ca-team-content">
                  <h5 className="ca-team-title tp-ff-inter text-white mb-0">
                    <a href="#" className="common-underline">Rosalina Willaim</a>
                  </h5>
                  <span>Economy Manager</span>
                </div>
              </div>
            </div>

            {/* Member 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="ca-team-item tp-hover-item mb-30 tp_fade_anim" data-delay=".7">
                <a href="#" className="ca-portfolio-thumb mb-20 p-relative fix d-block">
                  <div className="tp-hover-img">
                    <img className="w-100" src={m3} alt="Jerome Bell" style={{ borderRadius: 8, height: 360, objectFit: 'cover' }} />
                  </div>
                </a>
                <div className="ca-team-content">
                  <h5 className="ca-team-title tp-ff-inter text-white mb-0">
                    <a href="#" className="common-underline">Jerome Bell</a>
                  </h5>
                  <span>Legal Officer</span>
                </div>
              </div>
            </div>

            {/* Member 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="ca-team-item tp-hover-item mb-30 tp_fade_anim" data-delay=".9">
                <a href="#" className="ca-portfolio-thumb mb-20 p-relative fix d-block">
                  <div className="tp-hover-img">
                    <img className="w-100" src={m4} alt="Guy Hawkins" style={{ borderRadius: 8, height: 360, objectFit: 'cover' }} />
                  </div>
                </a>
                <div className="ca-team-content">
                  <h5 className="ca-team-title tp-ff-inter text-white mb-0">
                    <a href="#" className="common-underline">Guy Hawkins</a>
                  </h5>
                  <span>Lead Strategist</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Team1;
