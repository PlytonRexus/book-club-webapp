import React, { Component } from 'react';
import { swrite } from '../middleware/sessionStorage';

class AuthWarning extends Component {
    componentDidMount() {
        swrite('redirectTo', this.props.redirectTo);
    }

    render() {
        return (
            <em><strong>You need to be logged in to access this page.</strong></em>
        );
    }
}

export default AuthWarning;