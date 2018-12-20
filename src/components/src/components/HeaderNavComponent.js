'use strict';

import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import $ from 'jquery';

require('styles/src/components/HeaderNav.css');
import UserNameComponent from 'components/src/components/userLoginInfo/UserNameComponent';
let leaf_logo = require('../../../images/leaf_logo.png');
let garden_logo = require('../../../images/garden_logo.png');

class HeaderNavComponent extends React.Component {
    constructor(props) {
        super(props);
        /*var get_height_header = 1;
        setTimeout(function() {
            get_height_header = $('.top_header_wrapper').outerHeight();
        });*/

        $(document).on('click', '.nav_section > a, .login_form_open', function() {
            $('#nav-icon3').trigger('click');
            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
            $(this).addClass('activeHeaderLink');
        });

        $(document).on('click', '.nav_section li a', function() {
            $('#nav-icon3').trigger('click');
            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
        });

        $(document).on('click', '#nav-icon3', function() {
        	$('.nav_section, #nav-icon3').toggleClass('open');
    	});
    }
    render() {
        return (
            <div className="top_nav_container">
            <div className="wrapper_inner">
            <div className="top_nav">
            <div className="logo_wrap">
            <img src={leaf_logo} className="leaf_logo" />
            <img src={garden_logo} className="garden_logo" />
            </div>
            <div className="menuWrap">
                <div id="nav-icon3" className="mobile">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
            </div>

            <div className="nav_section">
            <Link to="/rahul/#how_to_section_wrapper" className="how_work_link"><span>How we work</span></Link>
            <Link to="/rahul/services/#services_section" className="services_section_link"><span>Services</span></Link>
            <Link to="/rahul/about/#aboutus" className="about_link"><span>About</span></Link>
            <a href="#." className="join_us_form_open"><span>Sign up</span></a>
            <UserNameComponent />
            <div className="book_now_btn book_now_btn_css mobile">
            <a href="#."><span>BOOK NOW</span></a>
            </div>
            </div>

            <div className="book_now_btn book_now_btn_css micro">
            <a href="#."><span>BOOK NOW</span></a>
            </div>
            </div>
            </div>
            </div>
        );
    }
}

HeaderNavComponent.displayName = 'SrcComponentsHeaderNavComponent';

// Uncomment properties you need
// HeaderNavComponent.propTypes = {};
// HeaderNavComponent.defaultProps = {};

export default HeaderNavComponent;
