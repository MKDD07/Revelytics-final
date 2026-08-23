import React from 'react';

// Default data array for specialties
const DEFAULT_SPECIALTIES = [
  {
    id: 1,
    years: '2015 - 2018',
    title: <>Web<br /> Design</>,
    link: 'service-details-light.html',
    description: 'Whether you need stunning visuals for your website captivating graphics for your marketing materials innovative UI/UX designs for your app our team of experts.',
  },
  {
    id: 2,
    years: '2019 - 2021',
    title: <>Brand<br /> Identity</>,
    link: 'service-details-light.html',
    description: 'Whether you need stunning visuals for your website captivating graphics for your marketing materials innovative UI/UX designs for your app our team of experts.',
  },
  {
    id: 3,
    years: '2022 - 2024',
    title: <>Motion <br /> Graphics</>,
    link: 'service-details-light.html',
    description: 'Whether you need stunning visuals for your website captivating graphics for your marketing materials innovative UI/UX designs for your app our team of experts.',
  },
  {
    id: 4,
    years: '2022 - 2024',
    title: <>Creative <br /> Direction</>,
    link: 'service-details-light.html',
    description: 'Whether you need stunning visuals for your website captivating graphics for your marketing materials innovative UI/UX designs for your app our team of experts.',
  },
];

const ResumeSpecialties = ({
  sectionTitle = "Specialties",
  heading = <>At cunnet, we don&rsquo;t just<br /> build website or campaigns<br /> we craft purpose.</>,
  specialtiesData = DEFAULT_SPECIALTIES,
}) => {
  return (
    <div id="about" className="about-me-resume-area pt-145 pb-160">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="tp-about-subtitle-wrap mb-20 mt-15 tp_fade_anim" data-delay=".3">
              <span className="tp-section-subtitle text-uppercase">{sectionTitle}</span>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="about-me-resume-content mb-20 tp_fade_anim" data-delay=".5">
              <h2 className="tp-section-title reveal-text">{heading}</h2>
            </div>
          </div>
          <div className="col-12">
            <div className="inner-service-2-wrap about-me-resume-wrap mt-50">
              {specialtiesData.map((item) => (
                <div key={item.id} className="about-me-resume-item tp_fade_anim" data-delay=".3">
                  <div className="row">
                    <div className="col-lg-2">
                      <div className="about-me-resume-date mb-30">
                        <span>{item.years}</span>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="about-me-resume-info ml-40 mb-30">
                        <h3 className="about-me-resume-title tp-ff-sequel-semi-bold">
                          <a href={item.link}>{item.title}</a>
                        </h3>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="about-me-resume-dec ml-50 mb-30">
                        <p>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSpecialties;