'use strict';

import React from 'react';
import $ from 'jquery';

require('styles/src/components/ServicesDetails.css');
let LM_1 = require('../../../images/315x315.png');
let LM_2 = require('../../../images/315x315.png');
let LM_3 = require('../../../images/315x315.png');
let LM_4 = require('../../../images/interior-landscaping.jpg');
let LM_5 = require('../../../images/lawn-mowed.jpg');
let LM_6 = require('../../../images/planting.jpg');
let LM_7 = require('../../../images/weed-control.jpg');
let LM_8 = require('../../../images/winter-services.jpg');

let LMC_1 = require('../../../images/artificial-lawns.jpg');
let LMC_2 = require('../../../images/fertilizer-treatments.jpg');
let LMC_3 = require('../../../images/lawn-repairs-re-turfing.jpg');
let LMC_4 = require('../../../images/moss-control.jpg');
let LMC_5 = require('../../../images/over-seeding.jpg');

let GR_1 = require('../../../images/outdoor.jpg');
let GR_2 = require('../../../images/power-washing.jpg');
let GR_3 = require('../../../images/repairs.jpg');
let GR_4 = require('../../../images/stonework.jpg');

let CS_1 = require('../../../images/interior-land.jpg');
let CS_2 = require('../../../images/landscape-maintenance-grounds-care.jpg');
let CS_3 = require('../../../images/maintenance-programs.jpg');
let CS_4 = require('../../../images/winter-care.jpg');

class ServicesDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        $(document).on('click', '.section', function () {
            var get_height_header = $('.top_header_wrapper').outerHeight();
            $('.section_more_details').hide();
            var get_id = $(this).attr('id');
            $('.'+get_id).show();
            $('.services_open_container').show();
            $('html, body').animate({
                scrollTop: $('.services_open_container').offset().top - get_height_header
            }, 1000);
        });
        $(document).on('click', '.sectionNav div', function () {
            $(this).siblings('.activate').removeClass('activate');
            $(this).addClass('activate');
            var getIndex = $(this).index();
            $(this).parent('.sectionNav').next('.section-for').children('div').removeClass('activated-sec');
            $(this).parent('.sectionNav').next('.section-for').children('div').eq(getIndex).addClass('activated-sec');
        });
        $(document).on('click', '.prevService', function () {
            var get_first_child = $(this).parent('.sectionNav').children('div').eq(0);
            if($(get_first_child).hasClass('activate')) {
                $(this).parent('.sectionNav').children('div').last().trigger('click');
            } else {
                $(this).parent('.sectionNav').find('.activate').prev('div').trigger('click');
            }
        });
        $(document).on('click', '.nextService', function () {
            var get_last_child = $(this).parent('.sectionNav').children('div').last();
            if($(get_last_child).hasClass('activate')) {
                $(this).parent('.sectionNav').find('div:first-child').trigger('click');
            } else {
                $(this).parent('.sectionNav').find('.activate').next('div').trigger('click');
            }
        });
    }
    render() {
        return (
            <div className="services_open_container" id="show_services_container"><div className="wrapper_inner">
                <div className="section_more_details section1_more_details">
                    <h2>Landscape Maintenance</h2>
                    <p>A well maintained garden provides a great look and feel to any property, and also adds value. With our professional services we can provide a regular maintenance package, or a once off service.</p>
                    <p>Check out the services under Landscape Maintenance below:</p>
                    <div className="sectionNav section-nav1">
                        <div className="activate">Fertilizing and mulching</div>
                        <div>Lawn Mowing</div>
                        <div>Green Waste Removal</div>
                        <div>Hedge cutting &amp; Pruning</div>
                        <div>Weed control</div>
                        <div>Planting</div>
                        <div>Interior landscaping</div>
                        <div>Winter Services</div>
                        <span className="prevService">&#9664;</span>
                        <span className="nextService">&#9654;</span>
                    </div>
                    <div className="section-for section-for1">
                        <div className="activated-sec">
                            <div className="section_img">
                                <div className="overlay_img"/>
                                <img  src={LM_1} />
	                            <div className="section_img_name">
		                            Fertilizing and mulching
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Your garden needs regular fertilizing throughout the year to ensure it looks its best year round. Especially in the spring, whether it vegetables or roses, we’ve got the treatment for you.</p>
                                <p>We can also supply compost, and the best mulch for your garden all supplied and spread for you.</p>
                                <h3>Key Benefits of the Service</h3>
                                <p>A mulch is usually but not exclusively organic in nature. It may be permanent (e.g. plastic sheeting) or temporary (e.g. bark chips). It may be applied to bare soil, or around existing plants. Mulches of manure or compost will be incorporated naturally into the soil by the activity of worms and other organisms.</p>
                                <ul>
                                    <li>Coonserves moisture</li>
                                    <li>Improves the fertility and health of the soil</li>
                                    <li>Reduces weed growth</li>
                                    <li>Enhances the visual appeal of the area</li>
                                    <li>Controls Pests</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_2} />
	                            <div className="section_img_name">
		                            Lawn Mowing
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>We provide professional lawn cutting services, no matter how big or small your lawn is, a well maintained lawn is an important feature of any garden.</p>

                                <h3>Key Benefits of the Service</h3>
                                <p>Mowing your lawn has some key benefits that make it well worth from both an aesthetic and practical point of view.</p>
                                <ul>
                                    <li>Keeps your lawn healthy and consistent</li>
                                    <li>Eliminates some of the pests in the grass</li>
                                    <li>The fallen shoots fertilise the lawn</li>
                                    <li>Pleasant visual appearance</li>
                                    <li>Grass reinforcement over time</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_3} />
	                            <div className="section_img_name">
		                            Green Waste Removal
	                            </div>
                            </div>
                            <div className="section_details">
                            <p>The thoughts of clearing your garden of rubbish can be a bitter experience. Not for Garden Help! Please note green waste only please.</p>

                            <p>Don&#39;t hesitate to call us if you need help clearing up your garden.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_4} />
	                            <div className="section_img_name">
		                            Hedge cutting & Pruning
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Regular and professional hedge trimming to your property is an essential element in maintaining excellent health and shape to your hedge and shrubs.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_5} />
	                            <div className="section_img_name">
		                            Weed control
	                            </div>
                            </div>
                            <div className="section_details">
                            <p>Annual weeds are unsightly and in our wet and warm climate have the ideal conditions to thrive. We can supply trained technicians to take care of this problem for you year round.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_6} />
	                            <div className="section_img_name">
		                            Planting
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>If you have a flower border or selection of fruit trees you would like planted we can supply the service for you.</p>
                                <p>Our planting care will ensure your plant species will thrive! We can also offer regular maintenance thereafter.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_7} />
	                            <div className="section_img_name">
                                    Interior landscaping
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Garden Help can provide an extensive range of exotic and tropical plants in order to be used in your Home.</p>

                                <p>It may be a special occasion such as a birthday party, or you may like the idea of having extra plants about the house, we have the solution.</p>

                                <p>We will call to your home and discuss requirements with the homeowner providing examples and suggestions from our collections which best suit the client and the environment.</p>

                                <p>Sometimes however live plants are not always the best option, At Garden Help we can provide a range of realistic artificial solutions which suit your every need.</p>

                                <p>The initial process will include a visit from a member of our staff to discuss your requirements personally with you to ensure we deliver the best products to suit your requirements.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LM_8} />
	                            <div className="section_img_name">
		                            Winter Services
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>The winter months can cause potential hazardous conditions in an around your home icy conditions can cause accidents to you and your family.</p>

                                <p>We can provide salting and gritting services to ensure this problem is eradicated.</p>

                                <p>Garden Help can also provide plants suitable for winter bedding and pruning services to ensure your property is well maintained even during the darkest months of the year.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_more_details section2_more_details">
                    <h2>Lawn Maintenance & Care</h2>
                    <p>A well maintained garden provides a great look and feel to any property, and also adds value. With our professional services we can provide a regular maintenance package, or a once off service.</p>
                    <p>Check out the services under Lawn Maintenance & Care below:</p>
                    <div className="sectionNav section-nav2">
                        <div className="activate">Moss control</div>
                        <div>Over Seeding</div>
                        <div>Fertilizer Treatments</div>
                        <div>Lawn Repairs &amp; re-turfing</div>
                        <div>Artificial Lawns</div>
                        <span className="prevService">&#9664;</span>
                        <span className="nextService">&#9654;</span>
                    </div>
                    <div className="section-for section-for2">
                        <div className="activated-sec">
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LMC_1} />
	                            <div className="section_img_name">
		                            Moss control
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Moss thrives in Ireland’s climate and is often increased from poor mowing techniques. Our process to rectify this problem is to firstly survey the infected area in order to determine the extent of the problem. This is usually followed up by applying a moss control preventive formula to the area.</p>
                                <p>We then leave the infected area for 2-3 weeks where we would return to scarify the lawn. This method helps to remove the now dead moss where it is collected and disposed of in an environmentally safe manner.</p>

                                <p>Remaining bare patches are then further repaired using good quality selected seed, and we then further follow up by using our specialised fertiliser treatment to really get your lawn thriving again. Most of our clients see an improvement within 6-8 weeks.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LMC_2} />
	                            <div className="section_img_name">
		                            Over Seeding
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>The process of over seeding and aeration can work wonders to rejuvenate tired lawns. We would normally begin the process by firstly surveying the area, this is done to gauge the quantity of seed that is required for the process. This is then followed up by the process of aerating the soil. Aeration can relieve compacted soil and allow the soil to benefit from increased oxygen which in turn strengthens the root system of your lawn.</p>

                                <p>Then next process is the dispersal of seed or ‘overseeding’ Garden Help only use the best selected seed which is stronger than the existing lawn turf and best suited to out compete annual lawn weeds.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LMC_3} />
	                            <div className="section_img_name">
		                            Fertilizer Treatments
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Our fertiliser treatments are simple two applications of our specialised formula will leave your lawn looking lush, green and healthy looking. Our process will firstly involve surveying the area that requires treatment a member of our team will then return to your property an apply the fertilizer in the required areas.</p>

                                <p>We recommend one treatment in the spring and a follow up treatment in the autumn or early winter to give excellent all year round results.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LMC_4} />
	                            <div className="section_img_name">
		                            Lawn Repairs &amp; re-turfing
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Our initial visit will involve supplying the customer with a free estimate on all re-turfing job.</p>

                                <p>At times it may be more suitable to re-pair your existing lawn instead of a full blown re-placement either way we will sit down with you to discuss the available options.</p>

                                <p>You can ensure that we will remove all existing green waste from the lawn and replace with only the best quality turf.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={LMC_5} />
	                            <div className="section_img_name">
		                            Artificial Lawns
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Sometimes real grass can become too much of a burden to maintain. That’s where the option of artificial grass can take some of the burden off you.</p>

                                <p>Our artificial products are of the highest quality and we can lay these products for you and remove the existing lawn and dispose of any existing turf.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_more_details section3_more_details">
                    <h2>Garden Repairs</h2>
                    <p>A well maintained garden provides a great look and feel to any property, and also adds value. With our professional services we can provide a regular maintenance package, or a once off service.</p>
                    <p>Check out the services under Garden Repairs below:</p>
                    <div className="sectionNav section-nav3">
                        <div className="activate">Power Washing</div>
                        <div>Outdoor</div>
                        <div>Repairs</div>
                        <div>Stonework</div>
                        <span className="prevService">&#9664;</span>
                        <span className="nextService">&#9654;</span>
                    </div>
                    <div className="section-for section-for3">
                        <div className="activated-sec">
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={GR_1} />
	                            <div className="section_img_name">
		                            Power Washing
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Patios, paths, decking can all become slippery and grimy during the winter months pressure washing can restore these to their original state.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={GR_2} />
	                            <div className="section_img_name">
		                            Outdoor
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>If your outside space needs a splash of colour we can provide the solution for you painting decking fencing, garden sheds, and providing wood preserving treatments.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={GR_3} />
	                            <div className="section_img_name">
		                            Repairs
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>If the decking, garden shed or your fencing is in need of a patch up we can do this for you.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={GR_4} />
	                            <div className="section_img_name">
		                            Stonework
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>We can provide hard landscaping solutions such as patio installations, decking and small walls, to continue to make improvements to your property.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section_more_details section4_more_details">
                    <h2>Corporate Solutions</h2>
                    <p>A well maintained garden provides a great look and feel to any property, and also adds value. With our professional services we can provide a regular maintenance package, or a once off service.</p>
                    <p>Check out the services under Corporate Solutions below:</p>
                    <div className="sectionNav section-nav4">
                        <div className="activate">Interior Landscaping</div>
                        <div>Landscape Maintenance &amp; Grounds Care</div>
                        <div>Maintenance programs</div>
                        <div>Winter Care</div>
                        <span className="prevService">&#9664;</span>
                        <span className="nextService">&#9654;</span>
                    </div>
                    <div className="section-for section-for4">
                        <div className="activated-sec">
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={CS_1} />
	                            <div className="section_img_name">
		                            Interior Landscaping
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>Garden Help can provide an extensive range of exotic and tropical plants in order to be used to design your work place or office.</p>

                                <p>Sometimes however live plants are not always the best option, especially when it comes to office space. At Garden Help we can provide a range of realistic artificial solutions which suit your every need.</p>

                                <p>The process will include a visit from a member of our dedicated team to discuss your requirements personally with you to ensure we deliver the best product to suit your requirements.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={CS_2} />
	                            <div className="section_img_name">
		                            Landscape Maintenance &amp;
	                            </div><br/>
                                <div className="section_img_name" style={{top:'270px'}}>
                                    Grounds Care
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>We can provide an extensive grounds maintenance solution for your business so to ensure that your property remains looking efficiently tidy 12 months of the year.</p>

                                <p>We can provide solutions in shrubbery pruning, mulching lawn care, weed control and power washing</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img">
                                <div className="overlay_img"/>
                                <img src={CS_3} />
	                            <div className="section_img_name">
		                            Maintenance programs
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>We know that running a business is a rewarding but often time consuming exercise. We also know that a well maintained property can add value to your business and look more appealing to potential customers.</p>

                                <p>A member of our staff will call to your business to discuss your needs, after an initial discussion we will send you our recommended maintenance schedule, tailored to your specific needs and requirements.</p>

                                <p>Our dedicated maintenance team can work on your property year round spring, summer, autumn and winter to ensure your property remains looking well presented.</p>
                            </div>
                        </div>
                        <div>
                            <div className="section_img"><div className="overlay_img"/>
                                <img src={CS_4} />
	                            <div className="section_img_name">
		                            Winter Care
	                            </div>
                            </div>
                            <div className="section_details">
                                <p>The winter months can cause potential hazardous conditions in an around your grounds, icy conditions can cause accidents to staff and visitors alike. We provide salting and gritting services to ensure this problem is eradicated.</p>

                                <p>Garden Help can also provide plants suitable for winter bedding and pruning services to ensure your property is well maintained even during the darkest months of the year.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
        );
    }
}

ServicesDetailsComponent.displayName = 'SrcComponentsServicesDetailsComponent';

// Uncomment properties you need
// ServicesDetailsComponent.propTypes = {};
// ServicesDetailsComponent.defaultProps = {};

export default ServicesDetailsComponent;
