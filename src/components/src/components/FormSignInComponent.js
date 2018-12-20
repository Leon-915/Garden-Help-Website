'use strict';

import React from 'react';
require('react-dom');
import $ from 'jquery';
import { Modal } from 'react-bootstrap'
import  { OldSocialLogin as SocialLogin }  from 'react-social-login'
require('styles/src/components/FormSignIn.css');
// require('styles/src/components/LoginButtons.css');

let form_loader = require('../../../images/form-loader.gif');
let apiURL = require('../../../../cfg/defaults').socialApiUrl;

class FormSignInComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              emailAddress: '',
              loginPassword: '',
              errors: '',
              invalidLoginMsg: '',
              loginStatusMsg: '',
              loading: false,
              isSuccess: false,
              formOpen: false,
	        forgotPassClicked : false,
              userCompleteData: {}
        };

        $(document).on('click', '.login_form_open', function () {
            $('.overlay').fadeIn(1000);
            $('.sign_in_wrapper').addClass('hide').removeClass('show');
            $('.sign_in_wrapper.sign_in_form').removeClass('hide').addClass('show');
        });
        $(document).on('click', '.close_form, .overlay', () => {
            this.closeForm();
            this.refs.user_form.reset();
            $('.overlay').fadeOut(1000);
            $('.sign_in_wrapper, .bookNowWrap').removeClass('show');
            $('.sign_in_wrapper, .bookNowWrap').addClass('hide');
            $('.nav_section > a, .login_form_open').removeClass('activeHeaderLink');
        });
         this.openForgotPasswordPopup = this.openForgotPasswordPopup.bind(this);
         this.closeForgotPasswordPopup = this.closeForgotPasswordPopup.bind(this);
         this.forgotPassword = this.forgotPassword.bind(this);

    }
    getInitialState() {
        return {emailAddress: '', loginPassword: '', loading: false, errors: {},forgotPassClicked : false}
    }

    _create() {
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/login',
            type: 'POST',
            data: {
                username: this.state.emailAddress,
                password: this.state.loginPassword
            },
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    closeForm(){
        this.state.errors = {};
    }
    _validate() {
      var errors = {}
      if(this.state.emailAddress == '') {
        errors.emailAddress = 'Email Address is required';
      }
      if(this.state.loginPassword == '') {
        errors.loginPassword = 'Password is required';
      }
      return errors;
    }

    responseGoogle = (user, err) => {
	    if(user){
		    return $.ajax({
			    url: apiURL + 'gardenhelp/socialLogin',
			    type: 'POST',
			    data: {
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
                data: {
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

	openForgotPasswordPopup(){
		this.setState({forgotPassClicked: true});
		$('.sign_in_form .close_form').trigger('click');
    }

	closeForgotPasswordPopup(){
		this.setState({forgotPassClicked : false});
    }

	forgotPassword(){
		return $.ajax({
			url: apiURL + 'gardenhelp/forgot-password',
			type: 'POST',
			data: {
				email : this.state.emailAddress
			},
		}).done(this._onEmailSuccess.bind(this))
			.fail(this._onEmailError.bind(this))
			.always(this.hideLoading.bind(this))

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
  _onSuccess(data) {
    this.state.userCompleteData = data;
    sessionStorage['user'] = JSON.stringify(this.state.userCompleteData);
    this.setState({loginStatusMsg: 'You are successfully logged in...', isSuccess: true});
    this.refs.user_form.reset();
    this.setState(this.getInitialState());
    if(this.props.enableBookNow) {
        this.props.enableBookNow();
    } else {
        $('.sign_in_form .close_form').trigger('click');
    }
    // show success message
  }

  _onEmailError(){
	  var message = 'This Email address is invalid or not found. Please enter Email again!';
	  this.setState({
		  invalidLoginMsg: message,
		  errors: ''
	  });
  }

  _onEmailSuccess(){
	  this.setState({loginStatusMsg: 'Link has been sent to your email successfully...', isSuccess: true});
	  this.setState(this.getInitialState());
	  this.closeForgotPasswordPopup();
	  // show email success message
  }

  _onError() {
      var message = 'Invalid Username OR Email address. Please login again!';
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
    if (checkField == 'emailAddress') {
        errorMsg = 'Email Address is required';
    } else if (checkField == 'loginPassword') {
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
    console.log(state);
  }
  _formGroupClass(field) {
    var className = 'form-group ';
    if(field) {
      className += ' has-error'
    }
    return className;
  }
  componentWillReceiveProps() {
      if (this.props.showFormFromBooknow == false) {
          $('.bookNowWrap .sign_in_wrapper.sign_in_form').removeClass('hide').addClass('show');
      }
  }
    render() {
        return (
            <div className="sign_in_wrapper sign_in_form">
                <div className='overlay_form' hidden={!this.state.loading}><div><img src={form_loader}/></div></div>
                <div className="title_form">
                    // <h2 className={'loginStatus ' + (this.state.loginStatusMsg ? 'isa_success' : '')}><span>{this.state.loginStatusMsg}</span></h2>
                    <h2>Sign In</h2>
                    <div className="invalidLogin error_message" hidden={this.state.isSuccess}>{this.state.invalidLoginMsg}</div>
                    <a href="#." className="close_form">x</a>
                </div>
                <form ref="user_form" onSubmit={this._onSubmit.bind(this)}>
                    <div className={'email_address ' + this._formGroupClass(this.state.errors.emailAddress)}>
                        <input name="emailAddress" ref={node => this.node = node} type="email" className="form-control" id="emailAddress" placeholder="Email Address" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)} />
                        <span className="help-block">{this.state.errors.emailAddress}</span>
                    </div>
                    <div className={'login_password ' + this._formGroupClass(this.state.errors.loginPassword)}>
                        <input name="loginPassword" ref={node => this.node = node} type="password" className="form-control" id="loginPassword" placeholder="EnterPassword" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)} />
                        <span className="help-block">{this.state.errors.loginPassword}</span>
                    </div>
                    <div >
                        <SocialLogin
                            provider='facebook'
                            appId='260612557878070'
                            callback={this.responseFacebook}
                        >
                            <button type="button" style={{float:'left',marginRight:'1%'}} className="btn btn-block btn-facebook btn-social col-6-left  ">Login with
                                Facebook
                            </button>
                        </SocialLogin>
                        <SocialLogin
                            provider='google'
                            appId={'84020664301-gjroq867pddubgk379dr46v1rskq7b4k.apps.googleusercontent.com'}
                            callback={this.responseGoogle}
                        >
                            <button type="button" style={{marginLeft:'1%'}} className="btn btn-block btn-google btn-social col-6-right">Login with Google
                            </button>
                        </SocialLogin>
                    </div>
                    <div>
                        <a  href={'#'} onClick={this.openForgotPasswordPopup} style={{color:'black',textDecoration:'none',marginBottom:'10px'}}>Forgot Password..</a>
                    </div>
                    <br/>
                    <div className="submit_button">
                        <button type="submit" disabled={this.state.loading}>
                            Submit
                        </button>
                    </div>
                </form>
                <Modal show={this.state.forgotPassClicked} onHide={this.closeForgotPasswordPopup}>
                    <Modal.Header closeButton>Forgot Password</Modal.Header>
                    <Modal.Body>
                        <br/>
	                    <label>Enter Your Email : </label>
                        <br/>
	                    <div className={'email_address ' + this._formGroupClass(this.state.errors.emailAddress)}>
		                    <input name="emailAddress" ref={node => this.node = node} type="email" className="form-control" id="emailAddress" placeholder="Email Address" onChange={this._onChange.bind(this)} onBlur={this.checkError.bind(this)} />
		                    <span className="help-block">{this.state.errors.emailAddress}</span>
	                    </div>
                    </Modal.Body>
                    <Modal.Footer>
	                    <div className="submit_button">
		                    <button type="submit" onClick={this.forgotPassword}>
			                    Submit
		                    </button>
	                    </div>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

FormSignInComponent.displayName = 'SrcComponentsFormSignInComponent';

// Uncomment properties you need
// FormSignInComponent.propTypes = {};
// FormSignInComponent.defaultProps = {};

export default FormSignInComponent;
