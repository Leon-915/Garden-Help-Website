'use strict';

import React from 'react';
import $ from 'jquery';
import { HashLink as Link } from 'react-router-hash-link';
import UserNameComponent from 'components/src/components/userLoginInfo/UserNameComponent';

require('styles/src/components/Header.css');
let iconPhone = require('../../../images/phone.png');
let iconFb = require('../../../images/facebook.png');
let iconTwitter = require('../../../images/twitter.png');
let iconYouTube = require('../../../images/youtube.png');
let iconInsta = require('../../../images/insta.png');
let leaf_logo = require('../../../images/leaf_logo.png');
let garden_logo = require('../../../images/garden_logo.png');

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        $(document).on('click', '.how_work_link, .services_section_link, .about_link, .nav_section_first li a', function () {
            if($('.sign_in_wrapper').hasClass('show')) {
                $('.sign_in_wrapper, .bookNowWrap').removeClass('show');
                $('.sign_in_wrapper, .bookNowWrap').addClass('hide');
                $('.overlay').hide();
            }
        });
	    $(document).on('click', '.nav_section_first > a, .login_form_open', function() {
		    $('#nav-icon3').trigger('click');
		    $('.nav_section_first > a, .login_form_open').removeClass('activeHeaderLink');
		    $(this).addClass('activeHeaderLink');
	    });

	    $(document).on('click', '.nav_section_first li a', function() {
		    $('#nav-icon3').trigger('click');
		    $('.nav_section_first > a, .login_form_open').removeClass('activeHeaderLink');
	    });

	    $(document).on('click', '#nav-icon3', function() {
		    $('.nav_section_first, #nav-icon3').toggleClass('open');
	    });
    }
    render() {
        return (
            <div className="wrapper_inner">
                <div className={'overlay_header'}></div>
            <div className="header">
            <div className="contact">
            <img className="header-icon" style={{marginRight:'7px'}} src={iconPhone} />
            <span style={{color:'white'}}>0818 919 362</span>
            </div>
            <div className="social-icons">
            <a href="https://www.facebook.com/gardenhelp.ie/" target="_blank"><img className="header-icon" src={iconFb} alt="FB" /></a>
            <a href="https://twitter.com/garden_help?lang=en" target="_blank"><img className="header-icon" src={iconTwitter} alt="Twitter" /></a>
            <a href="https://www.youtube.com/channel/UCXI2KCrUSZzr9rixksRjptg" target="_blank"><img className="header-icon" src={iconYouTube} alt="YouTube" /></a>
            <a href="https://www.instagram.com/garden.help/?hl=en" target="_blank"><img className="header-icon" src={iconInsta} alt="Insta" /></a>
            </div>
            </div>
	            <div className="top_nav_first">
		            <div className="logo_wrap_first">
			            <img src={leaf_logo} className="leaf_logo_first" />
			            <img src={garden_logo} className="garden_logo_first" />
		            </div>
		            <div className="menuWrap">
			            <div id="nav-icon3" className="mobile">
				            <span></span>
				            <span></span>
				            <span></span>
				            <span></span>
			            </div>
		            </div>

		            <div className="nav_section_first">
			            <Link to="/rahul/#how_to_section_wrapper" className="how_work_link"><span>How we work</span></Link>
			            <Link to="/rahul/services/#services_section" className="services_section_link"><span>Services</span></Link>
			            <Link to="/rahul/about/#aboutus" className="about_link"><span>About</span></Link>
			            <a href="#." className="join_us_form_open"><span>Sign up</span></a>
			            <UserNameComponent />
			            <div className="book_now_btn book_now_btn_css mobile">
				            <a href="#." ><span>BOOK NOW</span></a>
			            </div>
		            </div>

		            <div className="book_now_btn book_now_btn_css micro">
			            <a href="#."><span>BOOK NOW</span></a>
		            </div>
	            </div>
            </div>
        );
    }
}

HeaderComponent.displayName = 'SrcComponentsHeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
