import React from 'react'
import $ from 'jquery';
require('react-dom');
let apiURL = require('../../../../cfg/defaults').socialApiUrl;
require('styles/src/components/ResetPassword.css');
// let form_loader = require('../../../images/form-loader.gif');

class ResetPassword extends React.Component {
	constructor(props){
		super(props);
		console.log(props);
		this.state = {
			newPassword : '',
			confirmPassword : '',
			email : '',
			errors :'',
			resetPasswordMsg : '',
			resetPasswordStatusMsg : ''
		}
	}

	_formGroupClass(field) {
		let className = 'form-group ';
		if(field) {
			className += ' has-error'
		}
		return className;
	}

	_onChange(e) {
		let state = {};
		state[e.target.name] =  $.trim(e.target.value);
		this.setState(state);
	}

	_validate() {

		var errors = {}

		if(this.state.newPassword === '') {
			errors.newPassword = 'Password is required';
		}
		console.log('pass',this.state.newPassword);
		if(this.state.confirmPassword === ''){
			errors.confirmPassword = 'confirm your Password';
		}

		if(this.state.newPassword !== this.state.confirmPassword){
			errors.confirmPassword = 'both password must be same';
		}
		console.log('blure',errors);
		return errors;
	}

	_onSubmit(){
		let errors = this._validate();
		if(Object.keys(errors).length !== 0) {
			this.setState({
				errors: errors
			});
			return;
		}
		console.log(this.props.match.params.data);
		return $.ajax({
			url: apiURL + 'gardenhelp/reset-password',
			type: 'POST',
			data: {
				password : this.state.newPassword,
				token: this.props.match.params.data
			}
		}).done(this._onPasswordSuccess.bind(this))
			.fail(this._onPasswordError.bind(this))
	}

	_onPasswordError(){
		// var message = 'Something went wrong try again!';
		this.setState({
			// resetPasswordMsg: message,
			errors: ''
		});
	}

	_onPasswordSuccess(){
		/*this.setState({
			resetPasswordStatusMsg: 'Your password has been changed successfully...'});*/
		window.location.replace('/redesign');
	}

	render(){
		return(
			<div className="reset-password">
				<br/>
				<div className={'login_password ' + this._formGroupClass(this.state.errors.newPassword)}>
					<input name="newPassword" type="password" className="form-control" placeholder="New Password" onChange={this._onChange.bind(this)} onBlur={this._validate.bind(this)}/>
					<span className="help-block"  style={{color:'red'}}>{this.state.errors.newPassword}</span>
				</div><br/>
				<div className={'login_password ' + this._formGroupClass(this.state.errors.confirmPassword)}>
					<input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" onChange={this._onChange.bind(this)} onBlur={this._validate.bind(this)}/>
					<span className="help-block" style={{color:'red'}}>{this.state.errors.confirmPassword}</span>
				</div>
				<br/>
				<div className="submit_button">
					<button type="submit" onClick={this._onSubmit.bind(this)}>
						Reset Password
					</button>
				</div>
			</div>
		)
	}
}

export default ResetPassword