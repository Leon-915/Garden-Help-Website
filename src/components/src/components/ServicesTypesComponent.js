/* eslint-disable quotes */
'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/ServicesTypes.css');

class ServicesTypesComponent extends React.Component {
    constructor(props) {
        super(props);
        $(document).ready(function(){
            $('.section').hover(function(){
                $(this).addClass('hover');
            },function(){
                $(this).removeClass('hover');
            });
        });
    }

    render() {
        return (
            <div className="wrapper_inner">
                <div className="services_section">
                    {/*<div className="services_offer_list_div">
                        <h3>services we offer in Landscape Maintenance</h3>
                        <div className="services_offer_list">
                            <span>1. Grass cutting</span>
                            <span>2. Power washing</span>
                            <span>3. Planting Services</span>
                            <span>4. Lawn Care</span>
                            <span>5. Leaf clean up</span>
                            <span>6. Fertilizing</span>
                            <span>7. Weeding</span>
                            <span>8. Mulching</span>
                            <span>9. Strimming</span>
                            <span>10. Pruning Hedge cutting (max 6ft ht)</span>
                        </div>
                    </div>*/}


                        <div className="section_wrapper_row">
                            <div className="section_1 section" id="section3_more_details">
	                            <div className="image">
		                            <div className={'overlay_img'}/>
	                            </div>
                                <div className="section_content">
                                    <p>Need a bit of outdoor fencing painted? Or perhaps that decking needs a little repair? or the patio needs a good power wash to remove that grime we have got the solution.</p>
                                    <h2>Garden Repairs</h2>
                                </div>
                            </div>
                            <div className="section_2 section" id="section4_more_details">
	                            <div className="image">
		                            <div className={'overlay_img'}/>
	                            </div>
                                <div className="section_content">
                                    <p>We know that your business is important to you and that to keep it looking at its best requires regular maintenance especially throughout the growing season.</p>
                                    <h2>Corporate Solutions</h2>
                                </div>
                            </div>
                        </div>
	                    <div className="section_wrapper_row">
		                    <div className="section_3 section" id="section3_more_details">
			                    <div className={'image'}>
				                    <div className={'overlay_img'}/>
			                    </div>
			                    <div className="section_content">
				                    <p>Need a bit of outdoor fencing painted? Or perhaps that decking needs a little repair? or the patio needs a good power wash to remove that grime we have got the solution.</p>
				                    <h2>Garden Repairs</h2>
			                    </div>
		                    </div>
		                    <div className="section_4 section" id="section4_more_details">
			                    <div className={"image"}>
				                    <div className={'overlay_img'}/>
			                    </div>
			                    <div className="section_content">
				                    <p>We know that your business is important to you and that to keep it looking at its best requires regular maintenance especially throughout the growing season.</p>
				                    <h2>Corporate Solutions</h2>
			                    </div>
		                    </div>
	                    </div>
                <div className="green_button">
                    <a href={"redesign/services"} >See all Services</a>
                </div>
                </div>
            </div>
        );
    }
}

ServicesTypesComponent.displayName = 'SrcComponentsServicesTypesComponent';

// Uncomment properties you need
// ServicesTypesComponent.propTypes = {};
// ServicesTypesComponent.defaultProps = {};

export default ServicesTypesComponent;
