import React, { Component } from 'react';
import '../css/Topbar.css';
import Burger from './Burger';
import { signout } from '../middleware/auth';
import { lread } from '../middleware/localStorage';

class Topbar extends Component {
    state = {
        menu: 'closed',
        typeWriter: 1
    }

    attemptSignout = () => {
        if(signout())
        this.props.switchAuthState(false);
        this.toggleMenu();
        window.location.reload();
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

    // typeWriter = (id, text) => {
    //     let i = 0;
    //     let timeout = 300;
    //     setInterval(() => {
    //         if (this.state.typeWriter === 0) return;
    //         document.querySelector(`#${id}`).innerHTML += text[i];
    //         i += 1;
    //         setTimeout(function() {
    //             if (i === text.length) {
    //                 document.querySelector(`#${id}`).innerHTML = "";
    //                 i = 0;
    //             }
    //         }, 250);
    //     }, timeout);
    // }

    // stopTypeWriter = () => {
    //     this.setState({ typeWriter: 0 });
    // }

    render() {
        // var { switchSidebar } = this.props;
        return (
            <div className="navbar">
                <Burger 
                    // switchSidebar={switchSidebar}
                />
                <span href="#home" className="page-title" id="site-title">Book Club</span>
                <span id="topbar-social-wrapper">
                    <a
                        id="topbar-social"
                        href="https://www.facebook.com/bookclubiitismdhanbad"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img 
                            src={process.env.PUBLIC_URL + '/facebook-logo.svg'}
                            height="32px"
                            width="32px"
                            alt="/bookclubiitismdhanbad"
                        />
                    </a>
                </span>
                <prof 
                    className="logout-btn" 
                    id="logout-btn"
                    onClick={this.attemptSignout}
                >
                    Signout
                </prof>
                <prof className="custom profile" onClick={this.toggleMenu}>
                    <div className="dropdown">
                        <img 
                            alt="avatar" 
                            className="avatar" 
                            src={
                                lread(`bkclbSid`) ?
                                 `https://frigid-fox.herokuapp.com/v1/users/${lread(`bkclbSid`).split(',')[0]}/avatar` : 
                                 '/bookclub-logo.png'
                                }
                            onError={() => {document.querySelector('.avatar').src = `/bookclub-logo.png`}}
                        />
                    </div>
                </prof>
            </div>
        );
    }
}

export default Topbar;