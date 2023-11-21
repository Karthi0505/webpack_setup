import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser, loginUser } from "../../actions/authentication/authActions";

import Button from 'react-bootstrap/Button';

class LogoutLink extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    
    render() {
        return (
            <div>
                <Button
                    className="mx-2"
                    variant="secondary"
                    onClick={this.onLogoutClick}
                >
                    Logout
                </Button>
            </div>
        );
    }
}

LogoutLink.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(LogoutLink);