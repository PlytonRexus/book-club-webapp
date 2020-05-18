import React, { Component } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { auth } from '../middleware/auth';
import { openSidebar, closeSidebar } from '../utils/Sidebar';
import Modal from './Modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pages: ['Home', 'Catalogue', 'Notices', 'Logs', 'Contact'],
            active: 'Home',
            authState: false
        }
    }

    componentDidMount = () => {
        document.querySelector('body').style.background = 
            `url(${process.env.PUBLIC_URL}/book-background${Math.floor(Math.random() * 5)}.jpg)`;
        document.querySelector('body').style.backgroundAttachment = 'fixed';
        openSidebar();
        if (auth()) this.switchAuthState(true);

        /**The following has to be updated.
         * Checking location.pathname should not be required
         * for every route that is created.
         * A simple solution to that is to not prevent defaults of
         * Sidebar links.
        */

        /**Real routes */
        if (window.location.pathname === '/catalogue') this.setState({ active: 'Catalogue' });
        if (window.location.pathname === '/contact') this.setState({ active: 'Contact' });
        if (window.location.pathname === '/notices') this.setState({ active: 'Notices' });
        if (window.location.pathname === '/logs') this.setState({ active: 'Logs' });

        /**Pseuo routes */
        if (window.location.pathname === '/book') this.setState({ active: 'Book' });
        if (window.location.pathname === '/notice') this.setState({ active: 'Notice' });
        if (window.location.pathname === '/log') this.setState({ active: 'Log' });
        if (window.location.pathname === '/user') this.setState({ active: 'User' });
    }
    
    changeActivePage = (event, index) => {
        var pages = this.state.pages;
        var active = pages[index];

        this.setState({
            active: active
        });
        
        if (document.documentElement.clientWidth <= 850) {
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
                <Modal ref={ (Modal) => { window.ModalRef = Modal } } />
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