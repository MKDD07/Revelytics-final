import React from 'react';

// ==================================================
// START: Faq
// ==================================================

const Faq = () => {
  return (
    <>{ /* Service Details FAQ Section (from service-details-light.html) */ }
    <div className="tp-faq-area pb-130 pt-145">
       <div className="container">
          <div className="row">
             <div className="col-xxl-5 col-xl-3">
                <div className="tp-faq-subtitle mb-30">
                   <span className="text-uppercase fw-500">what i do</span>
                </div>
             </div>
             <div className="col-xxl-7 col-xl-9">
                <div className="tp-faq tp-service-details-faq-two tp-service-details-faq mb-30">
                   <h2 className="tp-section-title reveal-text fs-72 mb-40">Explore Answers to<br />
                   Our Most Asked Questions</h2>
                   <div className="accordion" id="accordionExample2">
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button" type="button" data-bs-toggle="collapse" data-bs-target="#faqOne" aria-expanded="true" aria-controls="faqOne"><span>01</span>What industries do you serve?</button>
                         </h2>
                         <div id="faqOne" className="tp-faq-collapse collapse show" data-bs-parent="#accordionExample2">
                            <div className="tp-faq-body">
                               <p>Track Your Income and Expenses: With our app, you can easily track your income<br />
                               and expenses, so you always know where your money is going.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqTwo" aria-expanded="false" aria-controls="faqTwo"><span>02</span>How do you protect client data and privacy?</button>
                         </h2>
                         <div id="faqTwo" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="tp-faq-body">
                               <p>Track Your Income and Expenses: With our app, you can easily track your income<br />
                               and expenses, so you always know where your money is going.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqThree" aria-expanded="false" aria-controls="faqThree"><span>03</span>Do you provide support after the project is done?</button>
                         </h2>
                         <div id="faqThree" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="tp-faq-body">
                               <p>Track Your Income and Expenses: With our app, you can easily track your income<br />
                               and expenses, so you always know where your money is going.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFour" aria-expanded="false" aria-controls="faqFour"><span>04</span>How long does an average AI project take?</button>
                         </h2>
                         <div id="faqFour" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="tp-faq-body">
                               <p>Track Your Income and Expenses: With our app, you can easily track your income<br />
                               and expenses, so you always know where your money is going.</p>
                            </div>
                         </div>
                      </div>
                      <div className="tp-faq-item tp_fade_anim" data-delay=".3">
                         <h2 className="accordion-header">
                            <button className="tp-faq-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faqFive" aria-expanded="false" aria-controls="faqFive"><span>05</span>Is my data safe and secure?</button>
                         </h2>
                         <div id="faqFive" className="tp-faq-collapse collapse" data-bs-parent="#accordionExample2">
                            <div className="tp-faq-body">
                               <p>Track Your Income and Expenses: With our app, you can easily track your income<br />
                               and expenses, so you always know where your money is going.</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* tp-faq-area-end */ }</>
  );
};

export default Faq;

// ==================================================
// END: Faq
// ==================================================
