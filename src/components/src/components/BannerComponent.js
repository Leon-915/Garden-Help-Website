

import React from 'react';
// import Slider from 'react-slick';
/*
require('styles/src/components/Banner.css');
let back = require('../../../images/banner.png');*/
class BannerComponent extends React.Component {

/*
	constructor(props){
		super(props);
		this.state = {
			slideIndex : 1
		}

		this.banner = React.createRef();
		if(this.state.slideIndex === 2){
			back = require('../../../images/main-banner-image-m.jpg');
		}else if(this.state.slideIndex === 3){
			back = require('../../../images/main-banner-image.jpg');
		}else{
			back = require('../../../images/banner.png');
		}

	}

	plusSlides(n) {
		this.state.slideIndex += n
		console.log(this.state.slideIndex);
	}
*/

	render() {
        // const settings = {
        //     dots: false,
        //     infinite: true,
        //     autoplay: true,
        //     arrows: false,
        //     fade: true,
        //     speed: 500,
        //     cssEase: 'linear',
        //     pauseOnHover: false,
        //     swipeToSlide: false,
        //     swipe: false,
        //     touchMove: false
        // };
        return (
            <div className="wrapper_inner bannerWrapper">
	            {/*<div className="slideshow-container">

		            <div className="banner" id='mySlides1' style={{background: back}}>
			            <div className="numbertext">{this.state.slideIndex} / 3</div>
			            <div className="slider-content">
				            <h1 className="slider-text">LANDSCAP MAINTANANCE</h1><br/>
				            <div className="book_now_button">
					            <a href="#." className="book_now_btn">book now</a>
				            </div>
			            </div>
		            </div>

		            <a className="prev" onClick={this.plusSlides(-1)}>&#10094;</a>
		            <a className="next" onClick={this.plusSlides(1)}>&#10095;</a>
	            </div>*/}

		          {/*  <div >
			            <span className="dot" id={'dot'} onClick={this.currentSlide(1)}/>
			            <span className="dot" id={'dot'} onClick={this.currentSlide(2)}/>
			            <span className="dot" id={'dot'} onClick={this.currentSlide(3)}/>
		            </div>*/}

            <div className="banner">
	            <div className={'overlay_banner'}></div>
	            <div className="slider-content">
		            <h1 className="slider-text">LANDSCAP MAINTANANCE</h1><br/>
		            <div className="book_now_button">
			            <a href="#." className="book_now_btn">book now</a>
		            </div>
	            </div>

            </div>
            </div>
        );
    }
}

BannerComponent.displayName = 'SrcComponentsBannerComponent';

// Uncomment properties you need
// BannerComponent.propTypes = {};
// BannerComponent.defaultProps = {};

export default BannerComponent;
