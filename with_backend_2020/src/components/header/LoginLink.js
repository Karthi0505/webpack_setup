import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../actions/authentication/authActions";

import { Link } from 'react-router-dom';
import LogoutLink from './LogoutLink';

import Dropdown from 'react-bootstrap/Dropdown';


class LoginLink extends Component {

    render() {
        const loggedIn = this.props.auth.isAuthenticated;
        const { user } = this.props.auth;
        
        /*if (this.props.auth.isAuthenticated) {
            console.log("Welcome, You loggedin");
        } else {
            console.log("You are loggedOut");
        }*/
        
        return loggedIn ? (
            <div className="d-flex align-items-center">

                <Dropdown className="px-2">
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        Welcome, {user.name.split(" ")[0]}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {/*<Dropdown.Item href="#/action-1">My Account</Dropdown.Item>*/}
                        <Dropdown.ItemText>
                            <LogoutLink />
                        </Dropdown.ItemText>
                    </Dropdown.Menu>
                </Dropdown>
                

                
                
            </div>
        ): (
            <div className="d-flex align-items-center">
                    <div className="px-2">You are loggedOut:</div>
                    <Link to="/login" variant="primary" className="btn btn-primary mx-2">Login</Link>
            </div>
        );

           
    }
}
/*export default LoginLink;*/

LoginLink.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
  
export default connect(
    mapStateToProps,
    { loginUser }
)(LoginLink);