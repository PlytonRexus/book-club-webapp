import React, { Component } from 'react';
import '../css/Sidebar.css';
import SidebarAuth from './SidebarAuth';
import { auth } from '../middleware/auth';
import { closeSidebar } from '../utils/Sidebar';
import { lread } from '../middleware/localStorage';

const SideItems = (props) => {
    const items = props.pages.map((item, index) => {
        return (
        <button 
            key={index}
            id={item.toLowerCase() === props.active.toLowerCase() ? "active-side-item" : null}
            onClick={(e) => {
                e.preventDefault();
                props.changeActivePage(null, index)
            }}
        >
            {item}
        </button>);
    });
    if (props.authState) {
        items.push(
        <button 
            disabled={true} 
            id="login-state" 
            style={{ color: 'lightgreen' }} 
            key={1000}
        >
            <em><strong>{lread('bkclbSid').split(',')[1]}</strong></em>
        </button>);
    }
    return items;
}

const SideHeader = (props) => {
    return (
    <button 
        href="#home"
        onClick={(e) => {
            e.preventDefault();
            props.changeActivePage(null, 0);
        }}
    >
        <img 
            className="logo" 
            src={process.env.PUBLIC_URL + '/bookclub-logo.png'}
            alt="Logo resides here."
        />
    </button>);
}

class Sidebar extends Component {
    handleClosing = (e) => {
        e.preventDefault();
        closeSidebar();
    }

    render() {
        console.log("auth():", auth());
        const { pages, changeActivePage, authState, switchAuthState, active } = this.props;
        return (
            <div className="sidebar-container">
                <div id="mySidenav" className="sidenav">
                    <button 
                        className="closebtn" 
                        onClick={this.handleClosing}
                    >
                        &times;
                    </button>
                    <SideHeader 
                        changeActivePage={changeActivePage} 
                    />
                    <SideItems 
                        active={active}
                        pages={pages} 
                        changeActivePage={changeActivePage} 
                        authState={authState}
                    />
                    { 
                        authState ? 
                        <div>
                        </div> : 
                        <SidebarAuth 
                            changeActivePage={changeActivePage} 
                            switchAuthState={switchAuthState}
                        /> 
                    }
                </div>
            </div>
        );
    }
}

export default Sidebar;