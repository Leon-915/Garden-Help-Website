'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/GlobalFooter.css');

let iconFb = require('../../../images/icon-fb_footer.png');
let iconTwitter = require('../../../images/icon-twitter_footer.png');
let iconYouTube = require('../../../images/icon-youtube_footer.png');
let iconInsta = require('../../../images/icon-insta_footer.png');

class GlobalFooterComponent extends React.Component {
    constructor(props) {
        super(props);
        var $window = $(window);
        $window.on('load scroll resize', this.check_if_in_view.bind(this));
    }
    check_if_in_view() {
        var $animation_elements = $('.how_to_icon1, .how_to_icon2, .how_to_icon3, .how_to_icon4, .step_copy, .banner_book_now_section');
        var $window = $(window);
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function() {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
            (element_top_position <= window_bottom_position)) {
                $element.addClass('animation');
            } else {
                //   $element.removeClass('animation');
            }
        });
    }
    render() {
        return (
            <div className="global_footer_container"><div className="wrapper_inner"><div className="global_footer">
            <div className="global_nav">
            <div className="global_nav_1 global_nav_section">
            <span className="global_nav_title">More Info</span>
            <span><a href="about.html">About us</a></span>
            <span><a href="term-and-conditions.html">Terms & Conditions</a></span>
            <span><a href="privacy-policy.html">Privacy Policy</a></span>
            </div>
            <div className="global_nav_2 global_nav_section">
            <span className="global_nav_title">Contact Details</span>
            <span style={{fontSize:'14px'}}>0818 919 362</span>
            <span style={{fontSize:'14px'}}>your@email.com</span>
            </div>
            <div className="global_nav_4 global_nav_section">
            <span className="global_nav_title">Follow Us</span>
            <span>
            <a href="https://www.facebook.com/gardenhelp.ie/" target="_blank"><img src={iconFb} alt="FB" /></a>
            <a href="https://twitter.com/garden_help?lang=en" target="_blank"><img src={iconTwitter} alt="Twitter" /></a>
            <a href="https://www.youtube.com/channel/UCXI2KCrUSZzr9rixksRjptg" target="_blank"><img src={iconYouTube} alt="YouTube" /></a>
            <a href="https://www.instagram.com/garden.help/?hl=en" target="_blank"><img src={iconInsta} alt="Insta" /></a>
            </span>
            </div>
            </div>
            <p className="global_footer_desc">Copyright 2017 - <b>Garden Help</b></p>
            </div></div></div>
        );
    }
}

GlobalFooterComponent.displayName = 'SrcComponentsGlobalFooterComponent';

// Uncomment properties you need
// GlobalFooterComponent.propTypes = {};
// GlobalFooterComponent.defaultProps = {};

export default GlobalFooterComponent;
