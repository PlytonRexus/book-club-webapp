import React, { Component } from 'react';
import Home from './Home';
import Catalogue from './Catalogue';
import Contact from './Contact';
import Notices from './Notices';
import Topbar from './Topbar';
import AuthWarning from './AuthWarning';

class MainContent extends Component {
    state = {
        pages: [
            {
                name: 'Home',
                xml: <Home />
            },
            {
                name: 'Catalogue',
                xml: <Catalogue />
            }, 
            {
                name: 'Contact',
                xml: <Contact />
            },
            {
                name: 'Notices',
                xml: <Notices />
            }
        ],
        pages2: {
            'Home': <Home />,
            'Catalogue': <Catalogue />,
            'Notices': <Notices />,
            'Contact': <Contact />,
            'AuthWarning': <AuthWarning />
        }
    }

    render = () => {
        var { authState, active, switchAuthState } = this.props;
        console.log('authState:', authState);
        return (
            <div className="main-content">
                <Topbar 
                    authState={authState}
                    switchAuthState={switchAuthState}
                />
                { authState !== false ? this.state.pages2[active] : this.state.pages2['AuthWarning']}
            </div>
        );
    }
}

export default MainContent;