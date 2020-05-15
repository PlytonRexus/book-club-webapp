import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { auth } from '../middleware/auth';
import { openSidebar, closeSidebar } from '../utils/Sidebar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: ['Home', 'Catalogue', 'Contact', 'Notices'],
            active: 'Home',
            authState: false
        }
    }

    componentDidMount = () => {
        openSidebar();
        if(auth()) this.switchAuthState(true);
    }
    
    changeActivePage = (event, index) => {
        var pages = this.state.pages;
        var active = pages[index];

        this.setState({
            active: active
        });
        
        if (document.documentElement.clientWidth <= 600) {
            closeSidebar();
        }
    }

    switchAuthState = (toWhat) => {
        this.setState({ authState: toWhat });
    }

    changeStateElement = (what, toWhat) => {
        this.setState({ [what]: toWhat });
    }

    render = () => {
        return (
            <div className="App">
                <Sidebar 
                    active={this.state.active}
                    authState={this.state.authState}
                    pages={this.state.pages} 
                    changeActivePage={this.changeActivePage}
                    switchAuthState={this.switchAuthState}
                />
                <MainContent 
                    active={this.state.active} 
                    authState={this.state.authState} 
                    switchAuthState={this.switchAuthState}
                />
            </div>
        );
    }
}

export default App;

// openSidebar = () => {
//     if(document.documentElement.clientWidth <= 850) {
//         document.getElementById("mySidenav").style.width = "100vw";
//         document.querySelector(".main-content").style.marginLeft = "100vw";
//         document.querySelector('.burger').style.display = 'none';
//         // this.switchSidebar('opened');
//     }
//     else {
//         document.getElementById("mySidenav").style.width = "18vw";
//         document.querySelector(".main-content").style.marginLeft = "18vw";
//         document.querySelector(".main-content").style.width = "82vw";
//         document.querySelector(".navbar").style.width = "82vw";
//         document.querySelector('.burger').style.display = 'none';
//         // this.switchSidebar('opened');
//     }
// }