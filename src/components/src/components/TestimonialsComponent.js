'use strict';

import React from 'react';
import Slider from 'react-slick';

require('styles/src/components/Testimonials.css');
let quoteIcon = require('../../../images/quote_icon.png');

class TestimonialsComponent extends React.Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 1,
            adaptiveHeight: false,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 1000,
            fade: true,
            cssEase: 'linear',
            arrows: true,
            swipeToSlide: false,
            swipe: false,
            touchMove: false
        };
        return (
            <div className="wrapper_inner">
                <div className="testimonials">
                    <h2>Request a quote through our online booking form or call <span>0818 919 362</span> and we will be happy to help!</h2>
                    <div className="testimonials_slider">
                        <Slider {...settings}>
                            <div>
                                <img className="quote_icon" src={quoteIcon} />
                                <p className="quote">Garden Help have really impressed me with how professional they are. My garden has never looked better and I would highly recommend.</p>
                                <p className="author">- Brain R.</p>
                            </div>
                            <div>
                                <img className="quote_icon" src={quoteIcon} />
                                <p className="quote">Garden Help make gardening look effortless and without hassle. I called and they came out the same day to offer a free quote. They are a very friendly company to deal with and I am so happy my garden has never looked better.</p>
                                <p className="author">- Claire H.</p>
                            </div>
                            <div>
                                <img className="quote_icon" src={quoteIcon} />
                                <p className="quote">If you want a great service from a reliable company then use this lot! I am thrilled with the work they put in’</p>
                                <p className="author">- Sarah M.</p>
                            </div>
                            <div>
                                <img className="quote_icon" src={quoteIcon} />
                                <p className="quote">An excellent local company very professional and well organized great results’.</p>
                                <p className="author">- Olivia B.</p>
                            </div>
                            <div>
                                <img className="quote_icon" src={quoteIcon} />
                                <p className="quote">Wonderful Service! Garden Help are the company I would use from now on.’</p>
                                <p className="author">- Margaret P.</p>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

TestimonialsComponent.displayName = 'SrcComponentsTestimonialsComponent';

// Uncomment properties you need
// TestimonialsComponent.propTypes = {};
// TestimonialsComponent.defaultProps = {};

export default TestimonialsComponent;
