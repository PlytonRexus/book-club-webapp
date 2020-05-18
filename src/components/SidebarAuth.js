import React, { Component } from 'react';
import '../css/SidebarAuth.css'
import { signin } from '../middleware/auth';
import { lwrite } from '../middleware/localStorage';
import { showOverlay } from '../utils/SidebarAuth';
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

    runSubmit = async (event) => {
        showOverlay('Getting you in!');
        // event.preventDefault();
        const user = await signin(this.state.email, this.state.password);
        if (user) {
            const { switchAuthState } = this.props;
            lwrite('bkclbSid', [user.user._id, user.user.email, user.user.admin, user.user.superUser]);
            switchAuthState(true);
            if (document.documentElement.clientWidth < 800) {
                closeSidebar();
            }
        }
        else {
            this.setState(this.initialState);
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div id="sidebar-auth-wrapper">
                <div className='sidebar-auth-overlay'>
                    <div className='sidebar-auth-overlay-text'></div>
                </div>
                <form className="sidebar-auth">
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