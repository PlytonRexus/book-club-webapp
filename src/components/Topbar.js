import React, { Component } from 'react';
import '../css/Topbar.css';
import Burger from './Burger';
import { signout } from '../middleware/auth';

class Topbar extends Component {
    state ={
        menu: 'closed'
    }

    attemptSignout = () => {
        if(signout())
        this.props.switchAuthState(false);
        this.toggleMenu();
    }

    toggleMenu = () => {
        const menuState = this.state.menu;
        if (menuState === 'closed' && this.props.authState) {
            document.getElementById('logout-btn').style.display = 'block';
            this.setState({menu: 'open'});
        }
        else {
            document.getElementById('logout-btn').style.display = 'none';
            this.setState({menu: 'closed'});
        }
    }

    render() {
        // var { switchSidebar } = this.props;
        return (
            <div className="navbar">
                <Burger 
                    // switchSidebar={switchSidebar}
                />
                <span href="#home" className="page-title">Book Club</span>
                <prof 
                    className="logout-btn" 
                    id="logout-btn"
                    onClick={this.attemptSignout}
                >
                    Signout
                </prof>
                <prof
                    
                />
                <prof className="custom profile" onClick={this.toggleMenu}>
                    <div className="dropdown">
                        <img 
                            alt="avatar" 
                            className="avatar" 
                            src={process.env.PUBLIC_URL + '/bookclub-logo.png'}
                        />
                    </div>
                </prof>
            </div>
        );
    }
}

export default Topbar;