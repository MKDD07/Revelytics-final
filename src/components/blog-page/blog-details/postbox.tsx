import React from 'react';

// ==================================================
// START: Postbox
// ==================================================

const Postbox = () => {
  return (
    <>{ /* Postbox Article Area (from blog-details-light.html) */ }
    <div className="postbox-area tp-blog-details-ptb pt-110 pb-120">
       <div className="container">
          <div className="row">
             <div className="col-xl-8">
                <div className="postbox-left-sidebar mb-40">
                   <div className="postbox-wrapper">
                      <div className="postbox-details-text mb-45">
                         <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">Using a Query</h4>
                         <p className="mb-20">
                            We love to bring designs to life as a developer, and I aim to do this using whatever front end tools are necessary. My preferred tools
                            are more modern javascript libraries like React.js but I like to use whatever is best for the websites needs. There are several reasons why
                            a business would consider a rebrand and it doesn&rsquo;t necessarily mean the business has been unsuccessful. Alexandre began his artistic
                            journey as a painter in Paris before refining his skills in Tokyo, Japan. Now working from New York,
                         </p>
                         <p>
                            love to bring designs to life as a developer, and I aim to do this using whatever front end tools are necessary. My preferred tools
                            are more modern javascript libraries like React.js but I like to use whatever is best for the websites needs. There are several reasons why
                            a business would consider a rebrand and it doesn&rsquo;t necessarily.
                         </p>
                      </div>
                      <div className="postbox-details-text mb-40">
                         <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-15">The Spark of an Idea</h4>
                         <p>
                            We love to bring designs to life as a developer, and I aim to do this using whatever front end tools are necessary. My preferred tools
                            are more modern javascript libraries like React.js but I like to use whatever is best for the websites needs. There are several reasons why
                            a business would consider a rebrand and it doesn&rsquo;t necessarily mean the business has been unsuccessful. Alexandre began his artistic
                            journey as a painter in Paris before refining his skills in Tokyo, Japan. Now working from New York,
                         </p>
                      </div>
                      <div className="postbox-details-thumb-wrap mb-10">
                         <div className="row">
                            <div className="col-lg-6">
                               <div className="postbox-details-thumb mb-20">
                                  <img className="w-100" src="assets/img/blog/details/thumb.jpg" alt="" />
                               </div>
                            </div>
                            <div className="col-lg-6">
                               <div className="postbox-details-thumb mb-20">
                                  <img className="w-100" src="assets/img/blog/details/thumb-2.jpg" alt="" />
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="postbox-details-text mb-45">
                         <p>
                            We love to bring designs to life as a developer, and I aim to do this using whatever front end tools are necessary. My preferred tools
                            are more modern javascript libraries like React.js but I like to use whatever is best for the websites needs. There are several reasons why
                            a business would consider a rebrand and it doesn&rsquo;t necessarily mean the business has been unsuccessful. Alexandre began his artistic
                            journey as a painter in Paris before refining his skills in Tokyo, Japan. Now working from New York,
                         </p>
                      </div>
                      <div className="postbox-details-quote-box mb-40">
                         <blockquote>
                            <div className="postbox-details-quote-box-inner d-flex align-items-start">
                               <i>
                                  <svg width="48" height="59" viewBox="0 0 48 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M25.2 58.8L29.6 0H47.6L38.6 58.8H25.2ZM0 58.8L4.4 0H22.4L13.4 58.8H0Z" fill="currentColor" fillOpacity="0.1" />
                                  </svg>
                               </i>
                               <div className="postbox-details-quote">
                                  <p className="mb-10">&ldquo;Success is the result of perfection hard<br />
                                     work learning from failure loyalty &amp; persistence&rdquo;
                                  </p>
                                  <span>Phil Martinez</span>
                               </div>
                            </div>
                         </blockquote>
                      </div>
                      <div className="postbox-details-text mb-35">
                         <p>
                            We love to bring designs to life as a developer, and I aim to do this using whatever front end tools are necessary. My preferred tools
                            are more modern javascript libraries like React.js but I like to use whatever is best for the websites needs. There are several reasons why
                            a business would consider a rebrand and it doesn&rsquo;t necessarily mean the business has been unsuccessful. Alexandre began his artistic
                            journey as a painter in Paris before refining his skills in Tokyo, Japan. Now working from New York,
                         </p>
                      </div>
                      <div className="postbox-details-text mb-25">
                         <h4 className="postbox-title tp-ff-sequel-bold-head fs-32 mb-20">On the specificity of selectors</h4>
                         <p>
                            The specificity of the : <span>not()</span> pseudo-class is the specificity of its argument. The :not() pseudo-class does not add to the selector specificity, unlike other pseudo-classes.
                         </p>
                      </div>
                      <div className="postbox-details-text mb-45">
                         <p className="mb-20">
                            The simple <span>selector that</span> : <span>not()</span> takes as an argument can be any of the following:
                         </p>
                         <div className="postbox-details-list">
                            <ul>
                               <li>Type selector (e.g <span>p, span,</span> etc.)</li>
                               <li>Class selector (e.g <span>.element, .sidebar,</span> etc.)</li>
                               <li>ID selector (e. #header)</li>
                               <li>Pseudo-class selector (e.g <i>:first-child, :last-of-type</i>)</li>
                            </ul>
                         </div>
                      </div>
                      <div className="postbox-details-code mb-30">
                            <pre>li:not(.old)::after { /*$merge: {    
    content: "New!";
    color: deepPink;
    }*/ }
    </pre>
                      </div>
                      <div className="postbox-details-text mb-50">
                         <p>
                            The specificity of the <span>:not()</span> pseudo-class is the specificity of its argument. The :not() pseudo-class does not add to the selector specificity, unlike other pseudo-classes.
                         </p>
                      </div>
                      <div className="postbox-details-tag-wrap d-flex justify-content-between align-items-center">
                         <div className="tp-blog-sidebar-tagcloud d-flex flex-wrap align-items-center mb-10">
                            <span className="mr-10 mb-5 d-inline-block">Tagged with :</span>
                            <div className="tagcloud">
                               <a href="#">Blog</a>
                               <a href="#">Creative</a>
                               <a href="#">Portfolio</a>
                               <a href="#">Theme</a>
                            </div>
                         </div>
                         <div className="postbox-details-social mb-10">
                            <a href="#">
                               <span>
                                  <svg width="18" height="17" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path fillRule="evenodd" clipRule="evenodd" d="M1.77219 6.41667C1.13333 6.41667 1 6.54137 1 7.13889V8.22222C1 8.81974 1.13333 8.94444 1.77219 8.94444H3.31657V13.2778C3.31657 13.8753 3.4499 14 4.08876 14H5.63314C6.272 14 6.40533 13.8753 6.40533 13.2778V8.94444H8.13944C8.62396 8.94444 8.74881 8.85636 8.88192 8.42063L9.21286 7.3373C9.44088 6.59088 9.30037 6.41667 8.47038 6.41667H6.40533V4.61111C6.40533 4.21224 6.75106 3.88889 7.17752 3.88889H9.3753C10.0142 3.88889 10.1475 3.76419 10.1475 3.16667V1.72222C10.1475 1.1247 10.0142 1 9.3753 1H7.17752C5.04518 1 3.31657 2.61675 3.31657 4.61111V6.41667H1.77219Z" stroke="currentcolor" strokeWidth={1.5} strokeLinejoin="round" />
                                  </svg>
                               </span>
                            </a>
                            <a href="#">
                               <span>
                                  <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path fillRule="evenodd" clipRule="evenodd" d="M5.67227 0H0L6.72535 8.79151L0.430223 16.1665H3.33876L8.09997 10.5886L12.3277 16.1153H18L11.0793 7.06826L11.0915 7.08386L17.0504 0.102701H14.1418L9.71667 5.28701L5.67227 0ZM3.131 1.53968H4.89685L14.869 14.5755H13.1032L3.131 1.53968Z" fill="currentcolor" />
                                  </svg>
                               </span>
                            </a>
                            <a href="#">
                               <span>
                                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M2.73047 0.149414C3.39876 0.149414 4.03742 0.409082 4.5166 0.926758C4.98986 1.40809 5.27986 2.05471 5.25 2.74023C5.25 3.45295 4.96325 4.1009 4.4873 4.58496C4.01091 5.06939 3.40304 5.33099 2.76074 5.33105H2.7002V5.33008C2.05404 5.36027 1.38762 5.0664 0.914062 4.58496C0.43812 4.1009 0.150391 3.45295 0.150391 2.74023C0.150439 2.06041 0.406515 1.41269 0.914062 0.896484C1.39344 0.408975 2.0322 0.149417 2.73047 0.149414ZM2.73047 1.05957C2.2578 1.05957 1.84759 1.22933 1.54785 1.53418C1.2159 1.87183 1.05084 2.29113 1.05078 2.74023C1.05078 3.13677 1.17903 3.52776 1.42871 3.82227L1.54297 3.94238L1.54785 3.94727C1.84752 4.25193 2.28766 4.42082 2.7002 4.4209H2.70996C3.13817 4.44811 3.54773 4.25827 3.85352 3.94727L3.8584 3.94238C4.18316 3.63943 4.35059 3.19332 4.35059 2.74023C4.35053 2.29122 4.18535 1.8718 3.85352 1.53418C3.55193 1.22745 3.14046 1.05957 2.73047 1.05957Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                     <path d="M3.90137 5.64062C4.46636 5.64074 4.95106 6.13761 4.95117 6.70605V17.415C4.9509 17.9561 4.46304 18.4491 3.90137 18.4492H1.50098C0.936026 18.4489 0.451172 17.9522 0.451172 17.3838V6.70605C0.451274 6.11043 0.903317 5.64062 1.47168 5.64062H3.90137ZM1.47168 6.55078C1.44981 6.55078 1.42129 6.5624 1.39453 6.59375C1.36751 6.62546 1.35162 6.66768 1.35156 6.70605V17.3838C1.35156 17.4121 1.36713 17.4524 1.40234 17.4883C1.43757 17.5241 1.47567 17.5389 1.50098 17.5391H3.90137C3.93695 17.539 3.97683 17.5234 4.00781 17.4961C4.03816 17.4693 4.05063 17.4401 4.05078 17.415V6.70605C4.05071 6.6777 4.03521 6.63738 4 6.60156C3.96472 6.5658 3.92661 6.55086 3.90137 6.55078H1.47168Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                     <path d="M14.1025 5.33594C16.5595 5.33597 18.4521 7.29949 18.4521 9.81836V17.6895C18.4521 17.8898 18.355 18.0782 18.2217 18.2139C18.0884 18.3494 17.9018 18.4502 17.7021 18.4502H14.7021C14.5026 18.4501 14.3158 18.3494 14.1826 18.2139C14.0494 18.0782 13.9521 17.8897 13.9521 17.6895V11.1299C13.9521 10.5978 13.8352 10.2229 13.5811 9.99023L13.5752 9.98438C13.2746 9.67884 12.864 9.51078 12.4229 9.51074C11.5883 9.51074 10.9229 10.2242 10.9229 11.1611V17.751C10.9227 17.972 10.8127 18.1487 10.6689 18.2666C10.5272 18.3828 10.3442 18.4492 10.1729 18.4492H6.87305C6.70179 18.4491 6.51859 18.3828 6.37695 18.2666C6.2333 18.1487 6.12319 17.9718 6.12305 17.751V6.37109C6.12305 6.15159 6.23189 5.96781 6.37305 5.84277C6.51244 5.71944 6.69647 5.6417 6.87305 5.6416H9.87305C10.0727 5.64162 10.2593 5.74141 10.3926 5.87695C10.5259 6.01261 10.623 6.20106 10.623 6.40137V6.45801C11.3643 5.7615 12.3939 5.33594 13.4727 5.33594H14.1025ZM13.5029 6.24609C12.4406 6.24609 11.4364 6.77274 10.8652 7.58594L10.8584 7.59668L10.8496 7.60547L10.8203 7.63574L10.0098 8.45898L9.75293 8.7207V6.55176H7.05371V17.5391H10.0527V11.1611C10.0527 9.74273 11.1027 8.63318 12.4492 8.60059H12.4531C13.1223 8.6007 13.7607 8.86089 14.2393 9.34766C14.6655 9.78125 14.8525 10.3735 14.8525 11.1299L14.8818 17.5391H17.5518V9.81836C17.5517 7.82029 16.0531 6.24629 14.1328 6.24609H13.5029Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                  </svg>
                               </span>
                            </a>
                            <a href="#">
                               <span>
                                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M14.2426 4.82562H14.2496M5.27195 1H13.8159C16.1752 1 18.0878 2.90279 18.0878 5.25V13.75C18.0878 16.0972 16.1752 18 13.8159 18H5.27195C2.91262 18 1 16.0972 1 13.75V5.25C1 2.90279 2.91262 1 5.27195 1ZM12.9615 8.96482C13.0669 9.67223 12.9455 10.3947 12.6144 11.0295C12.2833 11.6643 11.7595 12.179 11.1174 12.5005C10.4753 12.8221 9.74767 12.934 9.03796 12.8204C8.32825 12.7067 7.67263 12.3734 7.16433 11.8677C6.65603 11.362 6.32096 10.7098 6.20675 10.0037C6.09255 9.29764 6.20504 8.57373 6.52823 7.93494C6.85141 7.29615 7.36883 6.775 8.00688 6.44563C8.64494 6.11625 9.37115 5.99542 10.0822 6.10032C10.8075 6.20732 11.479 6.54356 11.9975 7.05938C12.516 7.5752 12.854 8.24324 12.9615 8.96482Z" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                               </span>
                            </a>
                         </div>
                      </div>
                      <div className="postbox-details-navigation-wrap mb-35 mt-30 pt-40">
                         <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6">
                               <div className="postbox-details-navigation mb-30">
                                  <a href="#">
                                     <i className="far fa-arrow-left" />
                                     <div className="postbox-details-navigation-text">
                                        <span>Previous Post</span>
                                        <h4 className="postbox-details-navigation-title">10 Principles Of Effective <br /> Web Design</h4>
                                     </div>
                                  </a>
                               </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-6">
                               <div className="postbox-details-navigation mb-30 text-end">
                                  <a href="#" className="justify-content-end">                                      
                                     <div className="postbox-details-navigation-text">
                                        <span>Next Post</span>
                                        <h4 className="postbox-details-navigation-title">Focus on Your Personal<br /> Goals in AI Consulting</h4>
                                     </div>
                                     <i className="far fa-arrow-right" />
                                  </a>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="postbox-details-author mt-30">
                         <div className="sidebar-widget-author d-flex align-items-start">
                            <div className="sidebar-widget-author-img">
                               <img src="assets/img/blog/details/user.png" alt="" />
                            </div>
                            <div className="postbox-details-content">
                               <div className="sidebar-widget-author-content">
                                  <span>About Author</span>
                                  <h4 className="sidebar-widget-author-name">Peter Bowman</h4>
                                  <p>
                                     Phasellus et ipsum justo. Aenean fringilla a fermentum mauris non venenatis. <br />
                                     Praesent at nulla aliquam ligula.
                                  </p>
                               </div>
                               <div className="sidebar-widget-author-social">
                                  <a href="#">
                                     <span>
                                        <svg width="18" height="17" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path fillRule="evenodd" clipRule="evenodd" d="M1.77219 6.41667C1.13333 6.41667 1 6.54137 1 7.13889V8.22222C1 8.81974 1.13333 8.94444 1.77219 8.94444H3.31657V13.2778C3.31657 13.8753 3.4499 14 4.08876 14H5.63314C6.272 14 6.40533 13.8753 6.40533 13.2778V8.94444H8.13944C8.62396 8.94444 8.74881 8.85636 8.88192 8.42063L9.21286 7.3373C9.44088 6.59088 9.30037 6.41667 8.47038 6.41667H6.40533V4.61111C6.40533 4.21224 6.75106 3.88889 7.17752 3.88889H9.3753C10.0142 3.88889 10.1475 3.76419 10.1475 3.16667V1.72222C10.1475 1.1247 10.0142 1 9.3753 1H7.17752C5.04518 1 3.31657 2.61675 3.31657 4.61111V6.41667H1.77219Z" stroke="currentcolor" strokeWidth={1.5} strokeLinejoin="round" />
                                        </svg>
                                     </span>
                                  </a>
                                  <a href="#">
                                     <span>
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path fillRule="evenodd" clipRule="evenodd" d="M5.67227 0H0L6.72535 8.79151L0.430223 16.1665H3.33876L8.09997 10.5886L12.3277 16.1153H18L11.0793 7.06826L11.0915 7.08386L17.0504 0.102701H14.1418L9.71667 5.28701L5.67227 0ZM3.131 1.53968H4.89685L14.869 14.5755H13.1032L3.131 1.53968Z" fill="currentcolor" />
                                        </svg>
                                     </span>
                                  </a>
                                  <a href="#">
                                     <span>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M2.73047 0.149414C3.39876 0.149414 4.03742 0.409082 4.5166 0.926758C4.98986 1.40809 5.27986 2.05471 5.25 2.74023C5.25 3.45295 4.96325 4.1009 4.4873 4.58496C4.01091 5.06939 3.40304 5.33099 2.76074 5.33105H2.7002V5.33008C2.05404 5.36027 1.38762 5.0664 0.914062 4.58496C0.43812 4.1009 0.150391 3.45295 0.150391 2.74023C0.150439 2.06041 0.406515 1.41269 0.914062 0.896484C1.39344 0.408975 2.0322 0.149417 2.73047 0.149414ZM2.73047 1.05957C2.2578 1.05957 1.84759 1.22933 1.54785 1.53418C1.2159 1.87183 1.05084 2.29113 1.05078 2.74023C1.05078 3.13677 1.17903 3.52776 1.42871 3.82227L1.54297 3.94238L1.54785 3.94727C1.84752 4.25193 2.28766 4.42082 2.7002 4.4209H2.70996C3.13817 4.44811 3.54773 4.25827 3.85352 3.94727L3.8584 3.94238C4.18316 3.63943 4.35059 3.19332 4.35059 2.74023C4.35053 2.29122 4.18535 1.8718 3.85352 1.53418C3.55193 1.22745 3.14046 1.05957 2.73047 1.05957Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                           <path d="M3.90137 5.64062C4.46636 5.64074 4.95106 6.13761 4.95117 6.70605V17.415C4.9509 17.9561 4.46304 18.4491 3.90137 18.4492H1.50098C0.936026 18.4489 0.451172 17.9522 0.451172 17.3838V6.70605C0.451274 6.11043 0.903317 5.64062 1.47168 5.64062H3.90137ZM1.47168 6.55078C1.44981 6.55078 1.42129 6.5624 1.39453 6.59375C1.36751 6.62546 1.35162 6.66768 1.35156 6.70605V17.3838C1.35156 17.4121 1.36713 17.4524 1.40234 17.4883C1.43757 17.5241 1.47567 17.5389 1.50098 17.5391H3.90137C3.93695 17.539 3.97683 17.5234 4.00781 17.4961C4.03816 17.4693 4.05063 17.4401 4.05078 17.415V6.70605C4.05071 6.6777 4.03521 6.63738 4 6.60156C3.96472 6.5658 3.92661 6.55086 3.90137 6.55078H1.47168Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                           <path d="M14.1025 5.33594C16.5595 5.33597 18.4521 7.29949 18.4521 9.81836V17.6895C18.4521 17.8898 18.355 18.0782 18.2217 18.2139C18.0884 18.3494 17.9018 18.4502 17.7021 18.4502H14.7021C14.5026 18.4501 14.3158 18.3494 14.1826 18.2139C14.0494 18.0782 13.9521 17.8897 13.9521 17.6895V11.1299C13.9521 10.5978 13.8352 10.2229 13.5811 9.99023L13.5752 9.98438C13.2746 9.67884 12.864 9.51078 12.4229 9.51074C11.5883 9.51074 10.9229 10.2242 10.9229 11.1611V17.751C10.9227 17.972 10.8127 18.1487 10.6689 18.2666C10.5272 18.3828 10.3442 18.4492 10.1729 18.4492H6.87305C6.70179 18.4491 6.51859 18.3828 6.37695 18.2666C6.2333 18.1487 6.12319 17.9718 6.12305 17.751V6.37109C6.12305 6.15159 6.23189 5.96781 6.37305 5.84277C6.51244 5.71944 6.69647 5.6417 6.87305 5.6416H9.87305C10.0727 5.64162 10.2593 5.74141 10.3926 5.87695C10.5259 6.01261 10.623 6.20106 10.623 6.40137V6.45801C11.3643 5.7615 12.3939 5.33594 13.4727 5.33594H14.1025ZM13.5029 6.24609C12.4406 6.24609 11.4364 6.77274 10.8652 7.58594L10.8584 7.59668L10.8496 7.60547L10.8203 7.63574L10.0098 8.45898L9.75293 8.7207V6.55176H7.05371V17.5391H10.0527V11.1611C10.0527 9.74273 11.1027 8.63318 12.4492 8.60059H12.4531C13.1223 8.6007 13.7607 8.86089 14.2393 9.34766C14.6655 9.78125 14.8525 10.3735 14.8525 11.1299L14.8818 17.5391H17.5518V9.81836C17.5517 7.82029 16.0531 6.24629 14.1328 6.24609H13.5029Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                  </svg>
                               </span>
                            </a>
                            <a href="#">
                               <span>
                                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M14.2426 4.82562H14.2496M5.27195 1H13.8159C16.1752 1 18.0878 2.90279 18.0878 5.25V13.75C18.0878 16.0972 16.1752 18 13.8159 18H5.27195C2.91262 18 1 16.0972 1 13.75V5.25C1 2.90279 2.91262 1 5.27195 1ZM12.9615 8.96482C13.0669 9.67223 12.9455 10.3947 12.6144 11.0295C12.2833 11.6643 11.7595 12.179 11.1174 12.5005C10.4753 12.8221 9.74767 12.934 9.03796 12.8204C8.32825 12.7067 7.67263 12.3734 7.16433 11.8677C6.65603 11.362 6.32096 10.7098 6.20675 10.0037C6.09255 9.29764 6.20504 8.57373 6.52823 7.93494C6.85141 7.29615 7.36883 6.775 8.00688 6.44563C8.64494 6.11625 9.37115 5.99542 10.0822 6.10032C10.8075 6.20732 11.479 6.54356 11.9975 7.05938C12.516 7.5752 12.854 8.24324 12.9615 8.96482Z" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                               </span>
                            </a>
                         </div>
                      </div>
                   </div>
                   <div className="row">
                      <div className="col-xxl-10">
                         <div className="postbox__comment pt-75 pb-50">
                            <h3 className="postbox__comment-title">Comments(02)</h3>
                            <ul>
                               <li>
                                  <div className="postbox__comment-box d-flex">
                                     <div className="postbox__comment-info ">
                                        <div className="postbox__comment-avater mr-30">
                                           <img src="assets/img/blog/details/blog-details-sm-2.jpg" alt="" />
                                        </div>
                                     </div>
                                     <div className="postbox__comment-text">
                                        <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                           <h5>By Harun Rashid</h5>
                                           <span className="post-meta">January 2, 2025</span>
                                        </div>
                                        <p>
                                           I love this theme. Sometimes it&rsquo;s difficult to work with some themes, because even if they are created with Elementor, you can&rsquo;t edit all the things with Elementor.
                                        </p>
                                        <div className="postbox__comment-reply">
                                           <a href="#">
                                              Reply
                                              <span>
                                                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L9 1M9 1V9M9 1L1 1" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                 </svg>
                                              </span>
                                           </a>
                                        </div>
                                     </div>
                                  </div>
                               </li>
                               <li className="children">
                                  <div className="postbox__comment-box d-flex">
                                     <div className="postbox__comment-info ">
                                        <div className="postbox__comment-avater mr-30">
                                           <img src="assets/img/blog/details/blog-details-sm-1.jpg" alt="" />
                                        </div>
                                     </div>
                                     <div className="postbox__comment-text">
                                        <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                           <h5>By Oliver Williams</h5>
                                           <span className="post-meta">January 2, 2025</span>
                                        </div>
                                        <p>
                                           They have really taken their timeto work appearance of the theme, also, they have a very intereactive client assistance service, I like() !
                                        </p>
                                        <div className="postbox__comment-reply">
                                           <a href="#">
                                              Reply
                                              <span>
                                                 <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 9L9 1M9 1V9M9 1L1 1" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                 </svg>
                                              </span>
                                           </a>
                                        </div>
                                     </div>
                                  </div>
                               </li>
                               <li>
                                  <div className="postbox__comment-box d-flex">
                                     <div className="postbox__comment-info ">
                                        <div className="postbox__comment-avater mr-30">
                                           <img src="assets/img/blog/details/blog-details-sm-2.jpg" alt="" />
                                        </div>
                                     </div>
                                     <div className="postbox__comment-text">
                                        <div className="postbox__comment-name d-flex justify-content-between align-items-center">
                                           <h5>By James Taylor</h5>
                                           <span className="post-meta">January 2, 2025</span>
                                        </div>
                                        <p>
                                           They have really taken their timeto work appearance of the theme, also, they have a very intereactive client assistance service, I like() !
                                        </p>
                                        <div className="postbox__comment-reply">
                                           <a href="#">
                                              Reply
                                              <span>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M1 9L9 1M9 1V9M9 1L1 1" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                              </span>
                                           </a>
                                        </div>
                                     </div>
                                  </div>
                               </li>
                            </ul>
                         </div>
                      </div>
                   </div>
                   <div className="postbox-details-form">
                      <h3 className="postbox-details-form-title mb-10">Leave a Reply</h3>
                      <p>Your email address will not be published. Required fields are marked *</p>
                      <div className="postbox-details-form-wrapper">
                         <div className="postbox-details-form-inner">
                            <form action="#">
                               <div className="row">
                                  <div className="col-xl-6">
                                     <div className="postbox-details-input-box">
                                        <div className="postbox-details-input">
                                              <label>Name *</label>
                                              <input type="text" />
                                        </div>
                                     </div>
                                  </div>
                                  <div className="col-xl-6">
                                     <div className="postbox-details-input-box">
                                        <div className="postbox-details-input">
                                           <label>Email *</label>
                                           <input type="email" />
                                        </div>
                                     </div>
                                  </div>
                                  <div className="col-xl-12">
                                     <div className="postbox-details-input-box">
                                        <div className="postbox-details-input">
                                           <label>Website</label>
                                           <input type="text" />
                                        </div>
                                     </div>
                                  </div>
                                  <div className="col-xl-12">
                                     <div className="postbox-details-input-box">
                                        <div className="postbox-details-input">
                                           <label>Comment *</label>
                                           <textarea id="msg" />
                                        </div>
                                     </div>
                                  </div>
                               </div>
                            </form>
                         </div>
                         <div className="postbox-details-suggetions mb-20">
                            <div className="postbox-details-remeber">
                               <input id="remeber" type="checkbox" />
                               <label htmlFor="remeber">Save my name, email, and website in this browser for the next time I comment.</label>
                            </div>
                         </div>
                         <div className="postbox-details-input-box">
                            <button type="submit" className="tp-btn d-inline-flex align-items-center">
                               <span>
                                  <span className="text-1">Post Comment</span>
                                  <span className="text-2">Post Comment</span>
                               </span>
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="col-xl-4">
                <div className="sidebar-blog-grid-wrap mb-40 ml-115">
                   <div className="sidebar-wrapper">
                      <div className="sidebar-widget mb-10">
                         <div className="sidebar-search">
                            <form action="#">
                               <div className="sidebar-search-input">
                                  <input type="text" placeholder="Search..." />
                                  <button type="submit">
                                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                           <path d="M18.9999 19L14.6499 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="currentcolor" strokeOpacity="0.8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                  </button>
                               </div>
                            </form>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <div className="sidebar-widget-author">
                            <div className="sidebar-widget-author-img d-flex align-items-center">
                               <img src="assets/img/blog/blog-standard/av-1.png" alt="" />
                               <div className="sidebar-widget-author-content">
                                  <h4 className="sidebar-widget-author-name mb-0">Kate Johnson</h4>
                                  <span>Digital Artist</span>
                               </div>
                            </div>
                            <div className="sidebar-widget-author-content">
                               <p>Crafting Digital Experiences <br /> with Purpose!</p>
                            </div>
                            <div className="sidebar-widget-author-social">
                               <a href="#">
                                  <span>
                                     <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.59416 7.41667C0.895758 7.41667 0.75 7.57015 0.75 8.30556V9.63889C0.75 10.3743 0.895757 10.5278 1.59416 10.5278H3.28247V15.8611C3.28247 16.5965 3.42823 16.75 4.12662 16.75H5.81494C6.51333 16.75 6.65909 16.5965 6.65909 15.8611V10.5278H8.55481C9.08449 10.5278 9.22097 10.4194 9.36649 9.88309L9.72827 8.54975C9.97754 7.63109 9.82394 7.41667 8.91659 7.41667H6.65909V5.19444C6.65909 4.70352 7.03703 4.30556 7.50325 4.30556H9.90584C10.6042 4.30556 10.75 4.15207 10.75 3.41667V1.63889C10.75 0.903481 10.6042 0.75 9.90584 0.75H7.50325C5.17217 0.75 3.28247 2.73985 3.28247 5.19444V7.41667H1.59416Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                                     </svg>
                                  </span>
                               </a>
                               <a href="#">
                                  <span>
                                     <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.67227 0H0L6.72535 8.79151L0.430223 16.1665H3.33876L8.09997 10.5886L12.3277 16.1153H18L11.0793 7.06826L11.0915 7.08386L17.0504 0.102701H14.1418L9.71667 5.28701L5.67227 0ZM3.131 1.53968H4.89685L14.869 14.5755H13.1032L3.131 1.53968Z" fill="currentcolor" />
                                     </svg>
                                  </span>
                               </a>
                               <a href="#">
                                  <span>
                                     <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.73047 0.149414C3.39876 0.149414 4.03742 0.409082 4.5166 0.926758C4.98986 1.40809 5.27986 2.05471 5.25 2.74023C5.25 3.45295 4.96325 4.1009 4.4873 4.58496C4.01091 5.06939 3.40304 5.33099 2.76074 5.33105H2.7002V5.33008C2.05404 5.36027 1.38762 5.0664 0.914062 4.58496C0.43812 4.1009 0.150391 3.45295 0.150391 2.74023C0.150439 2.06041 0.406515 1.41269 0.914062 0.896484C1.39344 0.408975 2.0322 0.149417 2.73047 0.149414ZM2.73047 1.05957C2.2578 1.05957 1.84759 1.22933 1.54785 1.53418C1.2159 1.87183 1.05084 2.29113 1.05078 2.74023C1.05078 3.13677 1.17903 3.52776 1.42871 3.82227L1.54297 3.94238L1.54785 3.94727C1.84752 4.25193 2.28766 4.42082 2.7002 4.4209H2.70996C3.13817 4.44811 3.54773 4.25827 3.85352 3.94727L3.8584 3.94238C4.18316 3.63943 4.35059 3.19332 4.35059 2.74023C4.35053 2.29122 4.18535 1.8718 3.85352 1.53418C3.55193 1.22745 3.14046 1.05957 2.73047 1.05957Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                        <path d="M3.90137 5.64062C4.46636 5.64074 4.95106 6.13761 4.95117 6.70605V17.415C4.9509 17.9561 4.46304 18.4491 3.90137 18.4492H1.50098C0.936026 18.4489 0.451172 17.9522 0.451172 17.3838V6.70605C0.451274 6.11043 0.903317 5.64062 1.47168 5.64062H3.90137ZM1.47168 6.55078C1.44981 6.55078 1.42129 6.5624 1.39453 6.59375C1.36751 6.62546 1.35162 6.66768 1.35156 6.70605V17.3838C1.35156 17.4121 1.36713 17.4524 1.40234 17.4883C1.43757 17.5241 1.47567 17.5389 1.50098 17.5391H3.90137C3.93695 17.539 3.97683 17.5234 4.00781 17.4961C4.03816 17.4693 4.05063 17.4401 4.05078 17.415V6.70605C4.05071 6.6777 4.03521 6.63738 4 6.60156C3.96472 6.5658 3.92661 6.55086 3.90137 6.55078H1.47168Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                        <path d="M14.1025 5.33594C16.5595 5.33597 18.4521 7.29949 18.4521 9.81836V17.6895C18.4521 17.8898 18.355 18.0782 18.2217 18.2139C18.0884 18.3494 17.9018 18.4502 17.7021 18.4502H14.7021C14.5026 18.4501 14.3158 18.3494 14.1826 18.2139C14.0494 18.0782 13.9521 17.8897 13.9521 17.6895V11.1299C13.9521 10.5978 13.8352 10.2229 13.5811 9.99023L13.5752 9.98438C13.2746 9.67884 12.864 9.51078 12.4229 9.51074C11.5883 9.51074 10.9229 10.2242 10.9229 11.1611V17.751C10.9227 17.972 10.8127 18.1487 10.6689 18.2666C10.5272 18.3828 10.3442 18.4492 10.1729 18.4492H6.87305C6.70179 18.4491 6.51859 18.3828 6.37695 18.2666C6.2333 18.1487 6.12319 17.9718 6.12305 17.751V6.37109C6.12305 6.15159 6.23189 5.96781 6.37305 5.84277C6.51244 5.71944 6.69647 5.6417 6.87305 5.6416H9.87305C10.0727 5.64162 10.2593 5.74141 10.3926 5.87695C10.5259 6.01261 10.623 6.20106 10.623 6.40137V6.45801C11.3643 5.7615 12.3939 5.33594 13.4727 5.33594H14.1025ZM13.5029 6.24609C12.4406 6.24609 11.4364 6.77274 10.8652 7.58594L10.8584 7.59668L10.8496 7.60547L10.8203 7.63574L10.0098 8.45898L9.75293 8.7207V6.55176H7.05371V17.5391H10.0527V11.1611C10.0527 9.74273 11.1027 8.63318 12.4492 8.60059H12.4531C13.1223 8.6007 13.7607 8.86089 14.2393 9.34766C14.6655 9.78125 14.8525 10.3735 14.8525 11.1299L14.8818 17.5391H17.5518V9.81836C17.5517 7.82029 16.0531 6.24629 14.1328 6.24609H13.5029Z" fill="currentColor" stroke="currentColor" strokeWidth={0.3} />
                                  </svg>
                               </span>
                            </a>
                            <a href="#">
                               <span>
                                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                     <path d="M14.2426 4.82562H14.2496M5.27195 1H13.8159C16.1752 1 18.0878 2.90279 18.0878 5.25V13.75C18.0878 16.0972 16.1752 18 13.8159 18H5.27195C2.91262 18 1 16.0972 1 13.75V5.25C1 2.90279 2.91262 1 5.27195 1ZM12.9615 8.96482C13.0669 9.67223 12.9455 10.3947 12.6144 11.0295C12.2833 11.6643 11.7595 12.179 11.1174 12.5005C10.4753 12.8221 9.74767 12.934 9.03796 12.8204C8.32825 12.7067 7.67263 12.3734 7.16433 11.8677C6.65603 11.362 6.32096 10.7098 6.20675 10.0037C6.09255 9.29764 6.20504 8.57373 6.52823 7.93494C6.85141 7.29615 7.36883 6.775 8.00688 6.44563C8.64494 6.11625 9.37115 5.99542 10.0822 6.10032C10.8075 6.20732 11.479 6.54356 11.9975 7.05938C12.516 7.5752 12.854 8.24324 12.9615 8.96482Z" stroke="currentcolor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                               </span>
                            </a>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <h3 className="sidebar-widget-title">Categories</h3>
                         <div className="sidebar-widget-category">
                            <ul>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Articles
                                     <span>08</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Business
                                     <span>04</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Family &amp; Divorce
                                     <span>12</span>
                                  </a>
                               </li>
                               <li>
                                  <a className="d-flex align-items-center justify-content-between" href="blog-grid-with-sidebar-light.html">
                                     Web Design
                                     <span>16</span>
                                  </a>
                               </li>
                            </ul>
                         </div>
                      </div>
                      <div className="sidebar-widget mb-45">
                         <h3 className="sidebar-widget-title">Latest Posts</h3>
                         <div className="rc-post-wrap">
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-1.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Fueling ambition &amp; Achieving your goals</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-2.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Behind the scenes of creative processes</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                            <div className="rc-post d-flex align-items-center">
                               <div className="rc-post-thumb">
                                  <a href="blog-details-light.html">
                                     <img src="assets/img/blog/blog-standard/blog-rp-3.jpg" alt="" />
                                  </a>
                               </div>
                               <div className="rc-post-content">
                                  <div className="rc-post-category">
                                     <a href="#">Design</a>
                                  </div>
                                  <h3 className="rc-post-title">
                                     <a href="blog-details-light.html" className="common-underline">Starting seo as your home business</a>
                                  </h3>
                                  <div className="rc-post-meta">
                                     <span>July 15, 2023</span>
                                  </div>
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="sidebar-widget">
                         <h3 className="sidebar-widget-title">Tags</h3>
                         <div className="sidebar-widget-content">
                            <div className="tagcloud">
                               <a href="#">Creative</a>
                               <a href="#">Design Trends</a>
                               <a href="#">Development</a>
                               <a href="#">LifeclassName=</a>
                               <a href="#">Cunnet</a>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
    { /* postbox area end */ }</div></div></div></>
  );
};

export default Postbox;

// ==================================================
// END: Postbox
// ==================================================
