'use strict';

import React from 'react';

require('styles/src/components/Aboutus.css');

class AboutusComponent extends React.Component {
  render() {
    return (
      <div id="aboutus">
          <div className="page-header">
              <div className="container_static">
                  <div className="static_header">
                      <h1 className="main-title">About Us</h1>
                      <h3 className="sub-title">"Garden Help"</h3>
                  </div>
              </div>
          </div>

          <div className="static_page_container">
              <div className="static_page_content">
                <p>Garden Help ltd provide a user based platform from which users can book professional gardeners and landscapers to help with their gardening tasks. Garden Help only use top quality rated professionals who are vetted and background checked for professional competency. Garden Help are fully insured to carry out all our services.</p>
                <p>Garden Help originate in Carlow in the South East of Ireland and were established in 2015, and now operate services across Ireland including Dublin and the south east including Carlow and Kilkenny.</p>
                <p>We pride ourselves we pride ourselves in our ability to provide unwavering dedication to customer service, and passion for our customer’s needs.</p>
                <p>Our services to our customers include a comprehensive quote obtained online through our booking platform open available 24 hours a day 7 days a week, or by calling our customer service line on 0818 919 362 to organize your service schedule delivered by our team of dedicated professionals.</p>
              </div>
          </div>
      </div>
    );
  }
}

AboutusComponent.displayName = 'SrcComponentsAboutusComponent';

// Uncomment properties you need
// AboutusComponent.propTypes = {};
// AboutusComponent.defaultProps = {};

export default AboutusComponent;
