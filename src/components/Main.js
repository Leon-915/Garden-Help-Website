require('styles/reset.css');
require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/Media_767.css');
require('styles/Media_1024.css');

import React from 'react';
import $ from 'jquery';
import HeaderComponent from 'components/src/components/HeaderComponent';
import HeaderNavComponent from 'components/src/components/HeaderNavComponent';
import FormSignInComponent from 'components/src/components/FormSignInComponent';
import FormSignUpComponent from 'components/src/components/FormSignUpComponent';
import FormBookNowComponent from 'components/src/components/FormBookNowComponent';
import GlobalFooterComponent from 'components/src/components/GlobalFooterComponent';

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        sessionStorage['user'] = '';
    }
    componentDidMount() {
      // Decode entities in the URL
      // Sometimes a URL like #/foo#bar will be encoded as #/foo%23bar
      window.location.hash = window.decodeURIComponent(window.location.hash);
      const scrollToAnchor = () => {
        const hashParts = window.location.hash.split('#');
        if (hashParts.length > 2) {
          const hash = hashParts.slice(-1)[0];
          document.querySelector(`#${hash}`).scrollIntoView();
        }
      };
      window.addEventListener('scroll',this.stickNav,true);
      scrollToAnchor();
      window.onhashchange = scrollToAnchor;
    }

	stickNav = () => {
		const heightToShow = this.refs.Header.offsetTop + 60;
		if (window.pageYOffset > heightToShow) {
		    this.refs.Header.classList.add('sticky');
		    this.refs.hideHeader.classList.add('hidden')
		    this.refs.showHeader.classList.remove('hidden')
			/*$('.top_header_wrapper').addClass('sticky');
			$('.position_sticky_hide').addClass('hidden');*/
		}

		if (window.pageYOffset < heightToShow) {
			this.refs.Header.classList.remove('sticky');
			this.refs.hideHeader.classList.remove('hidden');
			this.refs.showHeader.classList.add('hidden')
			/*$('.top_header_wrapper').removeClass('sticky');
			$('.position_sticky_hide').removeClass('hidden');*/
		}

	};
    render() {
        return (
            <div className="wrapper parent-wrapper">
                <div className="wrapper top_header_wrapper" ref={'Header'}>
                       <div className="position_sticky_hide" ref={'hideHeader'}>
	                   <HeaderComponent />
                   </div>
                  <div ref={'showHeader'} className={'hidden'}>
	                  <HeaderNavComponent />
                  </div>
                </div>
                {this.props.children}
                <GlobalFooterComponent />
                <FormSignInComponent />
                <FormSignUpComponent />
                <FormBookNowComponent />
            </div>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
