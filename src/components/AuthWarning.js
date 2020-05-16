import React, { Component } from 'react';
import { swrite } from '../middleware/sessionStorage';
import '../css/AuthWarning.css';

class AuthWarning extends Component {
    componentDidMount() {
        swrite('redirectTo', this.props.redirectTo);
    }

    render() {
        return (
            <span className="auth-warning-text">You need to be logged in to access this page.</span>
        );
    }
}

export default AuthWarning;