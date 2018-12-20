'use strict';

import React from 'react';

require('styles/src/components/HowTo.css');
let how_to_icon_1 = require('../../../images/how_to_icon_1.png');
let how_to_icon_2 = require('../../../images/how_to_icon_2.png');
let how_to_icon_3 = require('../../../images/how_to_icon_3.png');
let how_to_icon_4 = require('../../../images/how_to_icon_4.png');
let how_to_icon_5 = require('../../../images/how_to_icon_5.png');

class HowToComponent extends React.Component {
    render() {
        return (
            <div className="how_to_section_container"><div className="wrapper_inner"><div className="how_to_section_wrapper" id="how_to_section_wrapper">
                <div className="how_to_subject_copy">
                    <h2>HOW WE WORK</h2>
                    <p>Lorem ipsum dolor sit amet, nam in natum ipsum, in his verterem tacimates. Ne pri option repudiare. Ut mucius intellegat referrentur mei, sale malorum vulputate vis cu. Odio legere suscipit ut quo.
                    </p>
                </div>
                <div className="how_to_section">
                    <div className="how_to_icons_wrap">
                        <div className="step1_copy step_copy">
                            <span className="how_number">1</span>
                            <img src={how_to_icon_1} className="how_to_icon1" />
                            <p className="text">Tell us about what you would like us to do</p>
                        </div>
                        <div className="step2_copy step_copy">
                            <span className="how_number">2</span>
                            <img src={how_to_icon_2} className="how_to_icon2" />
                            <p className="text">Select a date and time you would like to book your service. </p>
                        </div>
                        <div className="step3_copy step_copy">
                            <span className="how_number">3</span>
                            <img src={how_to_icon_3} className="how_to_icon3" />
                            <p className="text">Receive a quote from us</p>
                        </div>
                        <div className="step4_copy step_copy">
                            <span className="how_number">4</span>
                            <img src={how_to_icon_4} className="how_to_icon4" />
                            <p className="text">Well  confirm your booking and take payment electronically and securely</p>
                        </div>
                        <div className="step5_copy step_copy">
                            <span className="how_number">5</span>
                            <img src={how_to_icon_5} className="how_to_icon5" />
                            <p className="text">At the scheduled time an experienced and fully equipped member of our team will get the job done!</p>
                        </div>
                    </div>
                </div>
               {/* <p className="how_to_footer_copy">Our priority is to provide all our customers with exceptional service. Choose from our Extensive Range of Professional Landscaping Services</p>
                <div className="book_now_button">
                    <a href="#." className="book_now_btn">book now</a>
                </div>*/}
            </div></div></div>
        );
    }
}

HowToComponent.displayName = 'SrcComponentsHowToComponent';

// Uncomment properties you need
// HowToComponent.propTypes = {};
// HowToComponent.defaultProps = {};

export default HowToComponent;
