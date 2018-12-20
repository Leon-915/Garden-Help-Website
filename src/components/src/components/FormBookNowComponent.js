'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import $ from 'jquery';

import moment from 'moment';
import InputMoment from 'input-moment/lib/input-moment.js';
import 'input-moment/dist/input-moment.css';

import Hologram from 'hologram-image-upload/dist/Hologram';
import '../../../styles/Hologram.css';

require('styles/src/components/FormBookNow.css');
let form_loader = require('../../../images/form-loader.gif');

import FormSignInComponent from 'components/src/components/FormSignInComponent';
import StripeCheckout from 'components/src/components/StripeCheckout';

//import ReactPhoneInput from 'react-phone-input-2';

const eircode = require('eircode');
// console.log(postalCodes);

class FormBookNowComponent extends React.Component {
    constructor(props) {
        super(props);
        this.getUserObj = null;
        this.session = true;
        this.error = false;
        this.headers = {};
        this.indexFile = 0;
        this.showField = true;
        this.stripeTokenValue = 0;
        this.state = {
            userEmail: '',
            userToken: '',
            location: '',
            property: '',
            maintained: '',
            property_size: '',
            num_hours: 0,
            cost: 0,
            costWeekly: 0,
            costBiWeekly: 0,
            waste_removed: false,
            jobDate: moment(),
            contactnumber: '',
            userid: '',
            profile_image_book: [],
            errors: '',
            bookStatusMsg: '',
            isSuccess: false,
            loading: false,
            showBookNowForm: false,
            showFormFromBooknow: false,
            jobaddress: '',
            servicesOptions: [],
            pets: true,
            accesstoproperty: true,
            extradetails: 'No Extra Details Provided',
            servicerequired: 1,
            gatewidth: '',
            post_code: '',
            grass_height: '',
            basePrice: '',
            priceDiscounted: '',
            serviceCharge: '',
            weeklyDiscount: '',
                byWeeklyDiscount: '',

            stripe_form: false,
            minHours: 1,
            error_form_msg: true
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleRadio = this.handleRadio.bind(this);
        $(document).on('click', '.book_now_btn', function() {
            if ($(this).hasClass('book_now_btn_css')) {
                $('#nav-icon3').trigger('click');
            }

            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
            $('.overlay').fadeIn(1000);
            $('.sign_in_wrapper').addClass('hide').removeClass('show');
            $('.sign_in_wrapper.book_now, .bookNowWrap').removeClass('hide').addClass('show');
        });
        $(document).on('click', '.close_form, .overlay', () => {
            this.setState(this.getInitialState());
            if(this.state.isSuccess == true) {
                this.refs.user_form.reset();
                this.setState(this.getInitialState());
                this.setState({showBookNowForm: true});
            }
            this.reset();
        });
        $(document).on('click', '.fake_form_btn button[type="submit"]', () => {
            $('.org_form_btn button[type="submit"]').trigger('click');
        });
        $(document).on('click', '.fake_form_btn button[type="button"]', () => {
            $('.org_form_btn button[type="button"]').trigger('click');
        });
    }
    getInitialState() {
        return {stripe_form: false, location: '', property: '', jobaddress: '', maintained: '', property_size: '', num_hours: 0, cost: 0, costWeekly: 0,
            costBiWeekly: 0, waste_removed: false, jobDate: moment(), contactnumber: '', profile_image_book: [], isSuccess: false, loading: false, errors: {}, servicesOptions: [], pets: true, accesstoproperty: true, extradetails: '', servicerequired: 1, gatewidth: '', post_code: '', grass_height: '', error_form_msg: true,
            showField: true}
    }

  
    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/jobs',
            type: 'POST',
            headers: this.headers,
            data: JSON.stringify({
                location: this.state.location,
                propertydetails: this.state.property,
                lastmaintained: this.state.maintained,
                propertysize: this.state.property_size,
                workhours: parseInt(this.state.num_hours),
                cost: parseInt(this.state.cost),
                greenwasteremoval: this.state.waste_removed,
                jobdate: moment(this.state.jobDate).toDate(),
                contactnumber: this.state.contactnumber,
                userid: parseInt(this.state.userid),
                images: this.state.profile_image_book,
                jobaddress: this.state.jobaddress,
                latitude: 18.9780,
                longitude: 79.5678,
                status: 0,
                services: this.state.servicesOptions,
                gatewidth: this.state.gatewidth,
                servicerequied: parseInt(this.state.servicerequired),
                extradetails: this.state.extradetails,
                accesstoproperty: this.state.accesstoproperty,
                pets: this.state.pets,
                postcode: this.state.post_code,
                grassheight: this.state.grass_height,
                stripetoken: this.stripeTokenValue
            }),
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    _validate() {
        var errors = {};
        if(this.state.location == '') {
            errors.location = 'Location is required';
        }
        if(this.state.property == '') {
            errors.property = 'Property details is required';
        }
        if(this.state.maintained == '') {
            errors.maintained = 'Last Maintained is required';
        }
        if(this.state.property_size == '') {
            errors.property_size = 'Property size is required';
        }
        if(this.state.num_hours == '') {
            errors.num_hours = 'Hours is required';
        } else {
            var get_min_hr = $('#num_hours').attr('min');
            var get_actual_hr = $('#num_hours').val();

            if(get_min_hr > get_actual_hr) {
                errors.num_hours = 'Minimum Hours should be ' + get_min_hr;
            }
        }
        if(this.state.jobDate == '') {
            errors.jobDate = 'Please select Job Date'
        }

        if(this.state.contactnumber.lenght < 9) {
            errors.contactnumber = 'Please eneter a valid mobile number.';
        }

        if(this.state.jobaddress == '') {
          errors.jobaddress = 'Address is required';
        }

        if(this.state.post_code == '') {
          errors.post_code = 'Post Code is required';
        } else {
          var isValidPostCode = eircode(this.state.post_code);
          if(isValidPostCode != true) {
            // errors.post_code = isValidPostCode;
            errors.post_code = 'Post Code is invalid';
          }
        }

        if(this.state.servicesOptions == '') {
          errors.servicesOptions = 'Please choose atleast one service'
        }

        if(this.state.extradetails == '' && document.getElementById('otherServicesCheckbox').checked) {
          errors.extradetails = 'Extra details is required'
        }

        if(this.state.grass_height == '' && !$('.grassHeight').hasClass('hidden')) {
          errors.grass_height = 'Grass height is required'
        }

        return errors;
    }
    checkError(e){
      var errors = this.state.errors;
      if (!errors) {
          var errors = {};
      }
    var checkField = e.target.name;
      var errorMsg;
        if (checkField == 'location') {
            errorMsg = 'Location is required';
        } else if (checkField == 'property') {
            errorMsg = 'Property details is required';
        } else if (checkField == 'maintained') {
            errorMsg = 'Last Maintained is required';
        } else if (checkField == 'property_size') {
            errorMsg = 'Property size is required';
        } else if (checkField == 'num_hours') {
                errorMsg = 'Hours is required';
        } else if (checkField == 'jobDate') {
            errorMsg = 'Please select Job Date';
        } else if (checkField == 'contactnumber') {
            errorMsg = 'Please eneter a mobile number.';
        } else if (checkField == 'jobaddress') {
            errorMsg = 'Address is required';
        } else if (checkField == 'post_code') {
            errorMsg = 'Post Code is required';
        } else if (checkField == 'servicesOptions') {
            errorMsg = 'Please choose atleast one service';
        } else if (checkField == 'extradetails' && document.getElementById('otherServicesCheckbox').checked) {
            errorMsg = 'Extra details is required';
        } else if (checkField == 'otherServicesCheckbox') {
            errorMsg = '';
        } else if (checkField == 'grass_height' && !$('.grassHeight').hasClass('hidden')) {
            errorMsg = 'Grass height is required';
        }
        
        if (e.target.value) {
            if (checkField == 'num_hours') {
                if (e.target.value > 0){
                    errors[e.target.name] = '';
                } else {
                    errors[checkField] = errorMsg;
                }
            } else {
                errors[e.target.name] = '';
            }
        } else {
            errors[checkField] = errorMsg;
        }
      this.setState({
        errors: errors
      });
    }
    _onSubmit(e) {
        e.preventDefault();
        var errors = this._validate();
        if(Object.keys(errors).length != 0) {
            this.setState({
                errors: errors,
                error_form_msg: false
            });
            return;
        } else {
            this._onError();
        }

        if($('input[type="file"]')[0].files.length == 0) {
            this.setState({
                stripe_form: true
            });
            $('.Checkout button').trigger('click');
        } else {
            $('.hologram-btn').eq(1).trigger('click');
        }
    }
    _onSubmitForm= (payload) => {
        this.stripeTokenValue = payload;
        var xhr = this._create();
        xhr.done(this._onSuccess.bind(this))
        .fail(this._onError.bind(this))
        .always(this.hideLoading.bind(this))
    }
    hideLoading() {
        this.setState({loading: false});
    }
    _onSuccess() {
        this.setState({bookStatusMsg: 'Successfully Booked...', isSuccess: true, showBookNowForm: false, error_form_msg: true});
        // $('.close_form').trigger('click');
        // this.setState({
        //     isSuccess: false
        // });
        // show success message
    }
    _onError() {
        this.setState({
            errors: '',
            error_form_msg: true
        });
    }
    _onChange(e) {
        var state = {};
        state[e.target.name] =  $.trim(e.target.value);
        this.setState(state);

        if(e.target.name == 'num_hours') {
          if (e.target.value > 0)
          {
            this.calculatePrice(e.target.value);
          }else {
              this.setState({
                  costWeekly:  0,
                  costBiWeekly: 0
              });

              this.setState({
                  cost: 0
              });
          }

        }
    }
    _onDynamicChangeVal(name, value) {
        var state = {};
        state[name] =  value;
        this.setState(state);

        if(name == 'num_hours' && value > 0) {
            this.calculatePrice(value);
        } else {
             this.setState({
                costWeekly:  0,
                costBiWeekly: 0
            });

            this.setState({
                cost: 0
            });
        }
    }
    handleDateChange = m => {
        this.setState({ jobDate: m });
    };
    handleOnPhoneChange(value) {
       this.setState({
          contactnumber: value
       });
    }
    handleRadio(e) {
        if($(e.target).attr('name') == 'pets') {
            this.setState({
                pets: !this.state.pets
            });
        } else if($(e.target).attr('name') == 'accesstoproperty') {
            this.setState({
                accesstoproperty: !this.state.accesstoproperty
            });
        } else if($(e.target).attr('name') == 'servicerequired') {
            this.setState({
                servicerequired: e.target.value
            }, function () {
                this.calculatePrice(this.state.num_hours);
            });
        } else {
            this.setState({
                waste_removed: !this.state.waste_removed
            });
        }
    }
    _formGroupClass(field) {
        var className = 'form-group ';
        if(field) {
            className += ' has-error'
        }
        return className;
    }
    componentWillReceiveProps() {
        if (!(sessionStorage['user'] == null || sessionStorage['user'] == '' || sessionStorage['user'] == undefined) && this.session) {
            this.getUserObj = JSON.parse(sessionStorage['user']);
            this.setState({
                userToken: this.getUserObj.tokenData.token,
                userid: this.getUserObj.user._id,
                userEmail: this.getUserObj.user.email,
                basePrice: this.getUserObj.price,
                priceDiscounted: this.getUserObj.priceDiscounted,
                serviceCharge: this.getUserObj.serviceCharge,
                weeklyDiscount: this.getUserObj.weeklyDiscount,
                byWeeklyDiscount: this.getUserObj.byWeeklyDiscount
            });
            this.headers = {
                'Content-Type': 'application/json',
                'x-access-token': this.getUserObj.tokenData.token,
                'x-key': this.getUserObj.user.email
            }
            this.setState({showFormFromBooknow: true, showBookNowForm: true});

            this.session = false
        }

        if($('.bookNowWrap > div').attr('hidden') && $('.book_now').hasClass('show')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    }



    calculatePrice(hours) {

        var firstTwoHrsPrice = this.state.basePrice;
        var RestHrsPrice = this.state.priceDiscounted;
        var serviceCharge = this.state.serviceCharge;
        var totalHrsPrice = 0;
        var totalHrs = hours;

        if (totalHrs == 0)
        {
          this.setState({
              cost: 0
          });
          this.setState({
              costWeekly:  0,
              costBiWeekly: 0
          });
          return;
        }

        if (totalHrs == 0) {
            totalHrsPrice = 0;
        } else if (totalHrs > 2) {
            var getOtherHrs = totalHrs - 2;
            totalHrsPrice = ((2 * firstTwoHrsPrice) + (getOtherHrs * RestHrsPrice)) + serviceCharge;
        } else {
            totalHrsPrice = totalHrs * firstTwoHrsPrice + serviceCharge;
        }

        var priceWihoutServiceCharge = totalHrsPrice - serviceCharge;
        var discountedWeeklyPrice =  Math.round(( priceWihoutServiceCharge * this.state.weeklyDiscount)/100 ) ;
        var discountedByWeeklyPrice =  Math.round(( priceWihoutServiceCharge * this.state.byWeeklyDiscount)/100 ) ;
        /* Calculate cost for weekly and biWeekly*/
        this.setState({
            costWeekly:  (priceWihoutServiceCharge -  discountedWeeklyPrice) + serviceCharge,
            costBiWeekly: (priceWihoutServiceCharge - discountedByWeeklyPrice)  + serviceCharge
        });

       if (this.state.servicerequired == 1 ||  this.state.servicerequired == 4) {
            this.setState({
                cost: totalHrsPrice
            });
       } else {
            if (this.state.servicerequired == 2) {
                this.setState({
                    cost: (priceWihoutServiceCharge -  discountedWeeklyPrice) + serviceCharge
                });
            }

            if (this.state.servicerequired == 3) {
                this.setState({
                    cost: (priceWihoutServiceCharge - discountedByWeeklyPrice)  + serviceCharge
                });
            }
       }
    }

    myUploadFunc() { // myUploadFunc(file, data) {
        var list = $('input[type="file"]')[0].files;
        var fromData = new FormData();
        fromData.append('file', list[this.indexFile]);
        this.indexFile = this.indexFile + 1;
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/utils/image/upload',
            type: 'POST',
            headers: {
                'x-access-token': this.state.userToken,'x-key': this.state.userEmail
            },
            data: fromData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this),
            success: function(res) {
                this.indexFile = this.indexFile - 1;
                if (this.indexFile == 0) {
                    var joined = this.state.profile_image_book.concat(res.file);
                    this.setState({ stripe_form: true, loading: false, profile_image_book: joined });
                    $('.Checkout button').trigger('click');
                    // $('.StripeCheckout').trigger('click');
                    // this._onSubmitForm();
                }
            }.bind(this),
            error: function() {
                this.setState({loading: false});
            }.bind(this),
            complete: function() {
                this.setState({loading: false});
            }.bind(this)
        })
    }
    reset() {
        this.refs.user_form.reset();
        ReactDOM.unmountComponentAtNode(document.getElementsByClassName('photoUploader')[0]);
        ReactDOM.render(
            <Hologram uploadFunction={this.myUploadFunc.bind(this)} />,
            document.getElementsByClassName('photoUploader')[0]
        );

      /*  ReactDOM.unmountComponentAtNode(document.getElementsByClassName('contactDiv')[0]);
        ReactDOM.render(
            <ReactPhoneInput  disableCountryCode='true' name='contactnumber' placeholder='xxxxxxxxx' onlyCountries={['ie']}  onChange={this.handleOnPhoneChange.bind(this)} onBlur={this.checkError.bind(this)}/>,
            document.getElementsByClassName('contactDiv')[0]
        );*/
    }

    enableBookNowForm() {
        this.setState({showBookNowForm: true});
        this.componentWillReceiveProps();
    }

    servicesChanged = (newServices) => {
        //show grass height form field
        var errors = this.state.errors;
        if (newServices.indexOf('1') != -1) {
            //$('.grassHeight').removeClass('hidden');
            this.showField = false;
        } else {
            //$('.grassHeight').addClass('hidden');
            this.showField = true;
        }

        // Set min hrs


        if (newServices.length == 1 && newServices.indexOf('1') != -1) {
            this.setState({
              num_hours: 1
            });

            $('#num_hours').attr('min', 1);
            this._onDynamicChangeVal('num_hours', 1);
        } else if (newServices.length >= 1 && newServices.length <=2) {
            this.setState({
              num_hours: 3
            });

            $('#num_hours').attr('min', 3);
            this._onDynamicChangeVal('num_hours', 3);
        }
        else if (newServices.length >= 3) {
            this.setState({
              num_hours: 4
            });

            $('#num_hours').attr('min', 4);
            this._onDynamicChangeVal('num_hours', 4);
        }
        else {
            this.setState({
              num_hours: 0
            });

            $('#num_hours').attr('min', 0);
            this._onDynamicChangeVal('num_hours', 0);
        }
        if (newServices.length > 0){
            this.state.errors['servicesOptions'] = ''
        } else {
            this.state.errors['servicesOptions'] = 'Please choose atleast one service';
        }

        this.setState({
          servicesOptions: newServices,
          errors: errors
        });

    }

    otherServicesCheck() {
       var errors = this.state.errors;
        document.getElementById('extradetails').readOnly =
                   !document.getElementById('otherServicesCheckbox').checked;
        if (document.getElementById('otherServicesCheckbox').checked == false){
            var errors = this.state.errors;
            this.state.errors['extradetails'] = ''
            this.setState({errors: errors});
        }
    }

    render() {
        return (
            <div className="bookNowWrap">
                <div className={this.state.isSuccess == true ? 'book_success' : ''} hidden={!this.state.isSuccess}>
                    <div className="title_form">
                        <h2>Thank you!</h2>
                        <p>Order is placed.</p>
                        <a href="#." className="close_form" >x</a>
                    </div>
                </div>
                <div className="bookNow_signIn" hidden={this.state.showBookNowForm}>
                    <FormSignInComponent showFormFromBooknow={this.state.showFormFromBooknow} enableBookNow={this.enableBookNowForm.bind(this)} />
                </div>

                <div className="sign_in_wrapper book_now" hidden={!this.state.showBookNowForm}>
                    <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                    <div className="costWrapper">
                        <div className="costTotal">
                            <p>Total Cost of your Job is :</p>
                            <p className="euroCost"> <span>&euro;</span>{this.state.cost}</p>
                            <br></br>
                        </div>
                        <div className="discounted_offer notes" hidden={this.state.servicerequired != 1  || this.state.num_hours == 0}>
                            <p hidden={this.state.servicerequired != 1  || this.state.num_hours == 0}><span>&euro;</span>{this.state.costWeekly}  Weekly Job <br></br> <span>&euro;</span> {this.state.costBiWeekly} Bi-Weekly Job</p>
                        </div>
                    </div>

                    <div className="error_msg" hidden={this.state.error_form_msg}>
                        There is an error in the form, please check if all the fields are completed.
                    </div>
                    // to hide element hidden={this.state.stripe_form}
                    <div className="book_now_form_div">
                        <div className="title_form">
                            <h2 >Book Now</h2>
                            <a href="#." className="close_form" >x</a>
                        </div>
                        <form noValidate="noValidate" ref='user_form' onSubmit={this._onSubmit.bind(this)}>
                            <div className={'servicesOptions ' + this._formGroupClass(this.state.errors.servicesOptions)}>
                                <label>Select Services</label>
                                <CheckboxGroup
                                    name="fruits"
                                    value={this.state.servicesOptions}
                                    onChange={this.servicesChanged} >

                                    <label><Checkbox value="1"/><span>Grass cutting</span></label>
                                    <label><Checkbox value="2"/><span>Power washing</span></label>
                                    <label><Checkbox value="3"/><span>Lawn Care</span></label>
                                    <label><Checkbox value="4"/><span>Strimming</span></label>
                                    <label><Checkbox value="5"/><span>Weeding</span></label>
                                    <label><Checkbox value="6"/><span>Leaf clean up</span></label>
                                    <label><Checkbox value="7"/><span>Planting Services</span></label>
                                    <label><Checkbox value="8"/><span>Pruning</span></label>
                                    <label><Checkbox value="9"/><span>Hedge cutting</span></label>
                                    <label><Checkbox value="10"/><span>Mulching</span></label>
                                    <label><Checkbox value="11"/><span>Fertilizing</span></label>
                                    <label><Checkbox value="12"/><span>Lawn Edging</span></label>
                                </CheckboxGroup>
                                <span className="help-block">{this.state.errors.servicesOptions}</span>
                            </div>

                            <div className={'grassHeight ' + this._formGroupClass(this.state.errors.grass_height)} hidden={this.showField}>
                                <label>Please specify grass height</label>
                                <input name="grass_height" ref="grass_height" type="text" className="form-control" id="grass_height" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}/>
                                <span className="help-block">{this.state.errors.grass_height}</span>
                            </div>

                            <div className={'extradetails clearfix ' + this._formGroupClass(this.state.errors.extradetails)}>
                                <label><input name="otherServicesCheckbox" id="otherServicesCheckbox" type="checkbox" onChange={this.otherServicesCheck.bind(this)}/> Other Services</label>
                                <textarea readOnly name="extradetails" ref="extradetails" type="text" className="form-control" id="extradetails" placeholder="Is there anything else you would like to add?" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}></textarea>
                                <span className="help-block">{this.state.errors.extradetails}</span>
                            </div>

                            <div className={'property ' + this._formGroupClass(this.state.errors.property)}>
                                <label>Tell us a bit about your property what would you like us to do?</label>
                                <textarea name="property" ref="property" type="text" className="form-control" id="property" placeholder="Property" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}></textarea>
                                <span className="help-block">{this.state.errors.property}</span>
                            </div>

                            <div className={'num_hours col-6-left ' + this._formGroupClass(this.state.errors.num_hours)}>
                                <label>How many hours do you require a gardener for?</label>
                                <input name="num_hours" ref="num_hours" type="number" className="form-control" id="num_hours" placeholder="Number of Hours*" step="1" min="0" onChange={this._onChange.bind(this)} value={this.state.num_hours} onBlur={this.checkError.bind(this)} />
                                <span className="help-block">{this.state.errors.num_hours}</span>
                            </div>

                            <div className="jobDate col-6-right">
                                <label>Choose a date and time for your service.</label>
                                <div className="input">
                                    <input type="text" placeholder="mm/dd/yyyy 00:00 AM/PM" value={this.state.jobDate.format('llll')} readOnly />
                                </div>
                                <InputMoment
                                    moment={this.state.jobDate}
                                    onChange={this.handleDateChange}
                                    minStep={5}
                                  />
                            </div>

                            <div className={'servicerequired clearfix ' + this._formGroupClass(this.state.errors.servicerequired)}>
                                <label>How often do your require your service*</label>
                                <div className="radio-form-wrap">
                                    <label><input name='servicerequired' type="radio" checked={this.state.servicerequired == 1} onChange={this.handleRadio} value="1" /><span>Once off</span></label>

                                    <label><input name='servicerequired' type="radio" value="2" checked={this.state.servicerequired == 2} onChange={this.handleRadio} /><span>Weekly</span></label>

                                    <label><input name='servicerequired' type="radio" value="3" checked={this.state.servicerequired == 3} onChange={this.handleRadio} /><span>Bi Weekly</span></label>

                                    <label><input name='servicerequired' type="radio" value="4" checked={this.state.servicerequired == 4} onChange={this.handleRadio} /><span>Monthly</span></label>
                                    <span className="field-specific-note" hidden={this.state.servicerequired != 1} >Date and time for the appointment may vary, depending on the availability of the contractor.</span>
                                </div>
                                <span className="help-block">{this.state.errors.servicerequired}</span>


                            </div>

                            <div className={'waste_removed ' + this._formGroupClass(this.state.errors.waste_removed)}>
                                <label>Do you require green waste removed?*</label>
                                <div className="radio-form-wrap">
                                    <label><input name='waste_removed' type="radio" checked={this.state.waste_removed == true} onChange={this.handleRadio} value="Yes" /><span>Yes</span></label>
                                    <label><input name='waste_removed' type="radio" value="No" checked={this.state.waste_removed == false} onChange={this.handleRadio} /><span>No</span></label>
                                </div>
                                <span className="field-specific-note">This may incur an additional charge in some instances depending on size and weight.</span>
                            </div>

                            <div className={'maintained col-6-left ' + this._formGroupClass(this.state.errors.maintained)}>
                                <label>When your property was last maintained?*</label>
                                <select name="maintained" ref="maintained" type="text" className="form-control" id="maintained" placeholder="Select Last Maintained" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}>
                                    <option value="">Select Last Maintained</option>
                                    <option value="Often - Every week or few weeks">Often - Every week or few weeks</option>
                                    <option value="Every 3-6 months">Every 3-6 months</option>
                                    <option value="Six months +">Six months +</option>
                                </select>
                                <span className="help-block">{this.state.errors.maintained}</span>
                            </div>

                            <div className={'property_size col-6-right ' + this._formGroupClass(this.state.errors.property_size)}>
                                <label>What is your property size – approx.?</label>
                                <select name="property_size" ref="property_size" type="text" className="form-control" id="property_size" placeholder="Select Property Size" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}>
                                    <option value="">Select Property Size</option>
                                    <option value="Town or small garden">Town or small garden</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large or country garden">Large or country garden</option>
                                </select>
                                <span className="help-block">{this.state.errors.property_size}</span>
                            </div>

                            <div className={'gateWidth clearfix ' + this._formGroupClass(this.state.errors.gateWidth)}>
                                <label>Select Your Gate Width (if applicable)</label>
                                <div className="clearfix">
                                    <input name="gatewidth" ref="gatewidth" type="number" className="form-control" id="gatewidth" placeholder="Feet" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)} />
                                </div>
                                <span className="help-block">{this.state.errors.gateWidth}</span>
                            </div>

                            <div className={'pets ' + this._formGroupClass(this.state.errors.pets)}>
                                <label>Are their pets present?</label>
                                <div className="radio-form-wrap">
                                    <label><input name='pets' type="radio" checked={this.state.pets == true} onChange={this.handleRadio} value="Yes" /><span>Yes</span></label>
                                    <label><input name='pets' type="radio" value="No" checked={this.state.pets == false} onChange={this.handleRadio} /><span>No</span></label>
                                </div>
                            </div>

                            <div className={'accesstoproperty ' + this._formGroupClass(this.state.errors.accesstoproperty)}>
                                <label>Access to property?</label>
                                <div className="radio-form-wrap">
                                    <label><input name='accesstoproperty' type="radio" checked={this.state.accesstoproperty == true} onChange={this.handleRadio} value="Yes" /><span>Yes</span></label>
                                    <label><input name='accesstoproperty' type="radio" value="No" checked={this.state.accesstoproperty == false} onChange={this.handleRadio} /><span>No</span></label>
                                </div>
                            </div>

                            <div className="photoUploader clearfix"><Hologram uploadFunction={this.myUploadFunc.bind(this)} ></Hologram></div>

                            <div className={'contactnumber col-6-left ' + this._formGroupClass(this.state.errors.contactnumber)}>
                                <label>Your Contact Number?*</label>
                                <div className="contactDiv">
                                    <input name="contactnumber" ref="contactnumber" type="text" className="form-control" id="contactnumber" placeholder="xxxxxxxxx" onChange={this._onChange.bind(this)}  onBlur={this.checkError.bind(this)}/>
                                </div>
                                {/*<div className="contactDiv"><ReactPhoneInput defaultCountry='ie' onlyCountries={['ie']} onChange={this.handleOnPhoneChange.bind(this)}/></div>*/}
                                <span className="help-block">{this.state.errors.contactnumber}</span>
                            </div>

                            <div className={'location col-6-right ' + this._formGroupClass(this.state.errors.location)}>
                                <label>Your Location?*</label>
                                <select name="location" ref="location" type="text" className="form-control" id="location" placeholder="Select Location" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}>
                                    <option value="">Select Location</option>
                                    <option value="Dublin">Dublin</option>
                                    <option value="Carlow">Carlow</option>
                                    <option value="Kilkenny">Kilkenny</option>
                                    <option value="Arklow">Arklow</option>
                                    <option value="Gorey">Gorey</option>
                                    <option value="Kildare">Kildare</option>
                                    <option value="Portlaoise">Portlaoise</option>
                                </select>
                                <span className="help-block">{this.state.errors.location}</span>
                            </div>

                            <div className={'jobaddress clearfix ' + this._formGroupClass(this.state.errors.jobaddress)}>
                                <label>Please provide your detailed address.</label>
                                <textarea name="jobaddress" ref="jobaddress" type="text" className="form-control" id="jobaddress" placeholder="Address" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}></textarea>
                                <span className="help-block">{this.state.errors.jobaddress}</span>
                            </div>

                            <div className={'post_code clearfix ' + this._formGroupClass(this.state.errors.post_code)}>
                                <label>Post Code</label>
                                <input name="post_code" ref="post_code" type="text" className="form-control" id="post_code" placeholder="ex. D02 AF30" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)} />
                                <span className="help-block">{this.state.errors.post_code}</span>
                            </div>

                            <div className="submit_button org_form_btn clearfix">
                                <button type="submit">Book Now</button>
                                <button type="button" className="reset" onClick={this.reset.bind(this)}>Reset</button>
                            </div>
                        </form>
                    </div>

                    // to hide element hidden={!this.state.stripe_form}
                    <div className="stripe_wrapper">
                        <div className="title_form">
                            <h2>Payment using card</h2>
                            <span className="field-specific-note" >Ammount on card is not charged until after job is completed. We will contact you with order confirmation.</span>
                        </div>
                        <StripeCheckout costFinal={this.state.cost} parentMethod={this._onSubmitForm} />
                    </div>

                    <div className="submit_button fake_form_btn clearfix">
                        <button type="submit">Book Now</button>
                        <button type="button" className="reset" onClick={this.reset.bind(this)}>Reset</button>
                    </div>
                </div>
            </div>
        );
    }
}

FormBookNowComponent.displayName = 'SrcComponentsFormBookNowComponent';

// Uncomment properties you need
// FormBookNowComponent.propTypes = {};
// FormBookNowComponent.defaultProps = {};

export default FormBookNowComponent;
