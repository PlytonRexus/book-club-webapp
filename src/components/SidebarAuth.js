import React, { Component } from 'react';
import '../css/SidebarAuth.css'
import { signin } from '../middleware/auth';
import { lwrite } from '../middleware/localStorage';
import { closeSidebar } from '../utils/Sidebar';
// import { sread } from '../middleware/sessionStorage';

class SidebarAuth extends Component {
    initialState = {
        email: '',
        password: ''
    }

    state = this.initialState

    handleChange = event => {
        const { name, value } = event.target;
      
        this.setState({ [name]: value, });
    }

    showStatus = (text) => {
        document.querySelector('.alert-area').innerHTML = text;
    }

    switchFieldAccess = (value) => {
        document.querySelector('.sidebar-auth-email').disabled = value;
        document.querySelector('.sidebar-auth-password').disabled = value;
        document.querySelector('.sidebar-auth-submit').disabled = value;
    }

    runSubmit = async (event) => {
        event.preventDefault();
        this.switchFieldAccess(true);
        this.showStatus('Getting you in!');
        const user = await signin(this.state.email, this.state.password);
        if (user) {
            const { switchAuthState } = this.props;
            lwrite('bkclbSid', [user.user._id, user.user.email, user.user.admin, user.user.superUser]);
            lwrite('bkclbSread', user.user.toRead ? user.user.toRead : []);
            switchAuthState(true);
            if (document.documentElement.clientWidth < 800) {
                closeSidebar();
            }
            window.location.reload();
            // this.switchFieldAccess(false);
            // this.showStatus('Success!');
        }
        else {
            this.switchFieldAccess(false);
            this.showStatus('Something was wrong; maybe your credentials?(!)');
            this.setState(this.initialState);
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div id="sidebar-auth-wrapper">
                <form className="sidebar-auth" autoComplete={`off`}>
                    {/* <label className="sidebar-auth-label">Email</label> */}
                    <input
                        type="text"
                        name="email"
                        id="sidebar-auth-email"
                        value={email}
                        onChange={this.handleChange}
                        required={true}
                        className="sidebar-auth-email"
                        placeholder="Email"
                        autoComplete={`off`}
                    />
                    {/* <label className="sidebar-auth-label">Password</label> */}
                    <input
                        type="password"
                        name="password"
                        id="sidebar-auth-password"
                        value={password}
                        onChange={this.handleChange}
                        required={true}
                        className="sidebar-auth-password"
                        placeholder="Password"
                        autoComplete={`off`}
                    />
                    <input
                        type="submit"
                        name="submit"
                        id="sidebar-auth-submit"
                        onClick={this.runSubmit}
                        className="sidebar-auth-submit"
                        value="Sign In/Sign Up"
                    />
                    <span className="alert-area"></span>
                </form>
            </div>
        );
    }
}

export default SidebarAuth;