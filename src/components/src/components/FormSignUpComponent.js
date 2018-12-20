'use strict';

import React from 'react';
import $ from 'jquery';
import  { OldSocialLogin as SocialLogin }  from 'react-social-login'
require('styles/src/components/FormSignUp.css');
require('styles/src/components/LoginButtons.css');
let form_loader = require('../../../images/form-loader.gif');
let apiURL = require('../../../../cfg/defaults').socialApiUrl;

class FormSignUpComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              firstName: '',
              lastName: '',
              emailUser: '',
              passwordUser: '',
              errors: '',
              regStatusMsg: '',
              isSuccess: false,
              invalidLoginMsg: '',
              loading: false
        };
        $(document).ready(function(){
            $('.join_us_form_open').on('click', function () {
                $('.overlay').fadeIn(1000);
                $('.sign_in_wrapper, .bookNowWrap').addClass('hide').removeClass('show');
                $('.sign_in_wrapper.sign_up_form').removeClass('hide').addClass('show');
            });
        });
        $(document).on('click', '.close_form, .overlay', () => {
            this.closeForm();
            this.refs.user_form.reset();
            $('.overlay').fadeOut(1000);
            $('.sign_in_wrapper, .bookNowWrap').removeClass('show');
            $('.sign_in_wrapper, .bookNowWrap').addClass('hide');
            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
        });
    }
    getInitialState() {
        return {firstName: '', lastName: '', emailUser: '', passwordUser: '', isSuccess: false, invalidLoginMsg: '', loading: false, errors: {}}
    }
    closeForm(){
        this.state.errors = {};
    }
    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/signup',
            type: 'POST',
            data: {
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                email: this.state.emailUser,
                password: this.state.passwordUser
            },
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    _validate() {
      var errors = {}
      if(this.state.firstName == '') {
        errors.firstName = 'First Name is required';
      }
      if(this.state.lastName == '') {
        errors.lastName = 'Last Name is required';
      }
      if(this.state.emailUser == '') {
        errors.emailUser = 'Email is required';
      }
      if(this.state.passwordUser == '') {
        errors.passwordUser = 'Password is required';
      }
      return errors;
    }

    responseGoogle = (user, err) => {
	    if(user){
		    return $.ajax({
			    url: apiURL+ 'gardenhelp/socialLogin',
			    type: 'POST',
			    body: {
				    id: user._profile.id,
				    provider: user._provider,
				    token : user._token,
				    firstName : user._profile.firstName,
				    lastName : user._profile.lastName,
				    profilePicURL : user._profile.profilePicURL,
				    fullName : user._profile.name
			    },
			    beforeSend: function () {
				    this.setState({loading: true});
			    }.bind(this)
		    }).done(this._onSuccess.bind(this))
			    .fail(this._onError.bind(this))
			    .always(this.hideLoading.bind(this))
	    }

	    if(err){
		    alert(err);
	    }
    }

    responseFacebook = (user, err) => {
        if(user){
            return $.ajax({
                url: apiURL + 'gardenhelp/socialLogin',
                type: 'POST',
                body: {
                    id: user._profile.id,
                    provider: user._provider,
                    token : user._token,
                    firstName : user._profile.firstName,
                    lastName : user._profile.lastName,
                    profilePicURL : user._profile.profilePicURL,
                    fullName : user._profile.name
                },
                beforeSend: function () {
                    this.setState({loading: true});
                }.bind(this)
            }).done(this._onSuccess.bind(this))
                .fail(this._onError.bind(this))
                .always(this.hideLoading.bind(this))
        }

        if(err){
            alert(err);
        }
    }

  _onSubmit(e) {
    e.preventDefault();
    var errors = this._validate();
    if(Object.keys(errors).length != 0) {
      this.setState({
        errors: errors
      });
      return;
    }
    var xhr = this._create();
    xhr.done(this._onSuccess.bind(this))
    .fail(this._onError.bind(this))
    .always(this.hideLoading.bind(this))
  }
  hideLoading() {
    this.setState({loading: false});
  }
  _onSuccess() {
      this.setState({regStatusMsg: 'You are successfully registered...', isSuccess: true, invalidLoginMsg: ''});
    this.refs.user_form.reset();
    this.setState(this.getInitialState());
    $('.close_form').trigger('click');
    // show success message
  }

  _onError() {
      var message = 'Account already exist OR Please try again!';
    this.setState({
      invalidLoginMsg: message,
      errors: ''
    });
  }
  checkError(e){
    var errors = this.state.errors;
    if (!errors) {
        var errors = {};
    }
    var checkField = e.target.name;
    var errorMsg;
    if (checkField == 'firstName') {
        errorMsg = 'First Name is required';
    } else if (checkField == 'lastName') {
        errorMsg = 'Last Name is required';
    } else if (checkField == 'emailUser') {
        errorMsg = 'Email is required';
    } else if (checkField == 'passwordUser') {
        errorMsg = 'Password is required';
    }
    if (e.target.value) {
        errors[e.target.name] = '';
    } else {
        errors[checkField] = errorMsg;
    }
    this.setState({
      errors: errors
    });
  }

  _onChange(e) {
    var state = {};
    state[e.target.name] =  $.trim(e.target.value);
    this.setState(state);
  }
  _formGroupClass(field) {
    var className = 'form-group ';
    if(field) {
      className += ' has-error'
    }
    return className;
  }
    render() {
        return (
            <div className="sign_in_wrapper sign_up_form">
                <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                <div className="title_form">
                    // <h2 className={'loginStatus ' + (this.state.regStatusMsg ? 'isa_success' : '')}><span>{this.state.regStatusMsg}</span></h2>
                    <h2>Sign Up</h2>
                    <div className="invalidLogin error_message" hidden={this.state.isSuccess}>{this.state.invalidLoginMsg}</div>
                    <a href="#." className="close_form">x</a>
                </div>
                <form ref='user_form' onSubmit={this._onSubmit.bind(this)}>
                    <div className={'first_name col-6-left ' + this._formGroupClass(this.state.errors.firstName)}>
                        <input name="firstName" ref="firstName" type="text" className="form-control" id="firstName" placeholder="First Name" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}/>
                        <span className="help-block">{this.state.errors.firstName}</span>
                    </div>
                    <div className={'last_name col-6-right ' + this._formGroupClass(this.state.errors.lastName)}>
                        <input name="lastName" ref="lastName" type="text" className="form-control" id="lastName" placeholder="Last Name" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}/>
                        <span className="help-block">{this.state.errors.lastName}</span>
                    </div>
                    <div className={'email_user col-6-left ' + this._formGroupClass(this.state.errors.emailUser)}>
                        <input name="emailUser" ref="emailUser" type="email" className="form-control" id="emailUser" placeholder="Email" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}/>
                        <span className="help-block">{this.state.errors.emailUser}</span>
                    </div>
                    <div className={'password_user col-6-right ' + this._formGroupClass(this.state.errors.passwordUser)}>
                        <input name="passwordUser" ref="Password" type="password" className="form-control" id="passwordUser" placeholder="Password" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)}/>
                        <span className="help-block">{this.state.errors.passwordUser}</span>
                    </div>
                    <div >
                        <SocialLogin
                            provider='facebook'
                            appId='260612557878070'
                            autoLoad={true}
                            fields="id,cover,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified,email"
                            callback={this.responseFacebook}
                        >
                            <button type="button" style={{float:'left'}} className="btn btn-block btn-facebook btn-social col-6-left ">Login with
                                Facebook
                            </button>
                        </SocialLogin>

                        <SocialLogin
                            provider='google'
                            appId={'84020664301-gjroq867pddubgk379dr46v1rskq7b4k.apps.googleusercontent.com'}
                            callback={this.responseGoogle}
                        >
                            <button type="button" className="btn btn-block btn-google btn-social col-6-right">Login with Google
                            </button>
                        </SocialLogin>
                    </div>
                    <div className="submit_button">
                        <button type="submit" disabled={this.state.loading}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

FormSignUpComponent.displayName = 'SrcComponentsFormSignUpComponent';

// Uncomment properties you need
// FormSignUpComponent.propTypes = {};
// FormSignUpComponent.defaultProps = {};

export default FormSignUpComponent;
