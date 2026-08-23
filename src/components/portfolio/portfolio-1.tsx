import React from 'react';
import { getPexelsImage } from '../../utils';

// ==================================================
// START: Portfolio1
// ==================================================

const Portfolio1 = () => {
  const p1 = getPexelsImage('portfolio', 0, { width: 1200, height: 750 });
  const p2 = getPexelsImage('portfolio', 1, { width: 800, height: 600 });
  const p3 = getPexelsImage('portfolio', 2, { width: 1000, height: 600 });
  const p4 = getPexelsImage('portfolio', 3, { width: 1200, height: 750 });

  return (
    <>
      {/* Portfolio Section */}
      <div className="cs-portfolio-area pt-135">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cs-section-title-wrap mb-60">
                <h2 className="cs-section-title tp-ff-sequel-semi-bold reveal-text">Our featured work</h2>
              </div>
            </div>

            {/* Project 1 */}
            <div className="col-12">
              <div className="cs-portfolio-item anim-zoomin-wrap mb-50">
                <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                  <a className="cursor-hide" href="#">
                    <img className="w-100" src={p1} alt="Storefront Project" />
                  </a>
                </div>
                <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                  <h3 className="cs-portfolio-title tp-title-anim tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                    <a href="#" className="tp-title-text">Storefront</a>
                  </h3>
                  <div className="cs-portfolio-tag">
                    <ul>
                      <li><a href="#">Branding</a></li>
                      <li><a href="#">Web Design</a></li>
                      <li><a href="#">Web development</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="col-xl-5">
              <div className="cs-portfolio-item cs-portfolio-item-2 anim-zoomin-wrap mb-50">
                <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                  <a className="cursor-hide" href="#">
                    <img className="w-100" src={p2} alt="Shophoria" />
                  </a>
                </div>
                <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                  <h3 className="cs-portfolio-title tp-title-anim tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                    <a href="#" className="tp-title-text">Shophoria</a>
                  </h3>
                  <div className="cs-portfolio-tag">
                    <ul>
                      <li><a href="#">Web Design</a></li>
                      <li><a href="#">Web development</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="col-xl-7">
              <div className="cs-portfolio-item cs-portfolio-item-3 anim-zoomin-wrap mb-50">
                <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                  <a className="cursor-hide" href="#">
                    <img className="w-100" src={p3} alt="Marketly" />
                  </a>
                </div>
                <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                  <h3 className="cs-portfolio-title tp-title-anim tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                    <a href="#" className="tp-title-text">Marketly</a>
                  </h3>
                  <div className="cs-portfolio-tag">
                    <ul>
                      <li><a href="#">Web Design</a></li>
                      <li><a href="#">Web development</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="col-12">
              <div className="cs-portfolio-item anim-zoomin-wrap mb-50">
                <div className="cs-portfolio-thumb anim-zoomin not-hide-cursor" data-cursor="View<br>Demo">
                  <a className="cursor-hide" href="#">
                    <img className="w-100" src={p4} alt="Shopline" />
                  </a>
                </div>
                <div className="cs-portfolio-content d-flex align-items-center flex-wrap justify-content-between">
                  <h3 className="tp-title-anim cs-portfolio-title tp-title-anim-inner mr-20 text-white tp-ff-sequel-semi-bold text-uppercase">
                    <a href="#" className="tp-title-text">Shopline</a>
                  </h3>
                  <div className="cs-portfolio-tag">
                    <ul>
                      <li><a href="#">Branding</a></li>
                      <li><a href="#">Web Design</a></li>
                      <li><a href="#">Web development</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio1;
