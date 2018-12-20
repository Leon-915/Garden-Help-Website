'use strict';

import React from 'react';
import $ from 'jquery';
import { HashLink as Link } from 'react-router-hash-link';
require('styles/src/components/userLoginInfo/UserName.css');

class UserNameComponent extends React.Component {
    constructor(props) {
        super(props);
        this.session = true;
        this.state = {
            user: 'Login'
        }

        $(document).on('click', '.log_out a', () => {
            $('#app').hide();
            this.setState({user: 'Login'});
        });
    }

    // componentWillReceiveProps() {
    //     if (!(sessionStorage['user'] == null || sessionStorage['user'] == '' || sessionStorage['user'] == undefined) && this.session) {
    //         let getUserObj = JSON.parse(sessionStorage['user']);
    //         this.setState({user: getUserObj.user.firstname});
    //         this.session = false;
    //
    //         $('.join_us_form_open').hide();
    //     }
    //     if (this.session) {
    //         this.setState({user: 'Login'});
    //         $('.join_us_form_open').hide();
    //     }
    // }

    render() {
        setInterval(  () => {
            if (!(sessionStorage['user'] == null || sessionStorage['user'] == '' || sessionStorage['user'] == undefined) && this.session) {
                let getUserObj = JSON.parse(sessionStorage['user']);
                this.setState({user: getUserObj.user.firstname});
                this.session = false;

                $('.join_us_form_open').hide();
            }
        }, 2000);

        return(
            <div className={this.state.user == 'Login' ? 'login_form_open' : ''}>
                {
                    this.state.user == 'Login'
                    ? <span>Login</span>
                    : <ul><li><span>Hi {this.state.user} ￬</span></li><li><Link to="/redesign/jobs"><span>Jobs</span></Link></li><li className="log_out"><Link to="/redesign"><span>Log Out</span></Link></li></ul>
                }
            </div>
        );
    }
}

UserNameComponent.displayName = 'SrcComponentsUserLoginInfoUserNameComponent';

// Uncomment properties you need
// UserNameComponent.propTypes = {};
// UserNameComponent.defaultProps = {};

export default UserNameComponent;
