import React, { Component } from 'react';
import Home from './Home';
import Catalogue from './Catalogue';
import Contact from './Contact';
import Notices from './Notices';
import Topbar from './Topbar';
import AuthWarning from './AuthWarning';
import { BrowserRouter, Route } from 'react-router-dom';
import Book from './Book';
import Logs from './Logs';
import Notice from './Notice';
import Log from './Log';
import User from './User';
import Users from './Users';

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
            'AuthWarning': <AuthWarning />,
            'Logs': <Logs />,
            'Members': <Users />,
            'Notice': <Notice />,
            'Log': <Log />,
            'User': <User />,
            'Book': <Book />
        }
    }

    render = () => {
        document.title = "Book Club - Home";
        var { authState, active, switchAuthState } = this.props;
        return (
            <BrowserRouter>
            <div className="main-content">
                <Topbar 
                    authState={authState}
                    switchAuthState={switchAuthState}
                />
                <Route exact path='/'>
                    { active === 'Home' || active === 'Catalogue' || active === 'Contact' || active === 'Logs' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>

                {
                /** 
                 * This needs to be updated.
                 * Presently, the complete app can run on any of these links.
                 * e.preventDefault() is active on the links in the sidebar,
                 * so, they won't redirect to their hrefs.
                 * 
                 * To change, consider anchors in SideItems,
                 * componentDidMount() in App and Route in MainContent.
                 */
                }
                <Route path={'/catalogue' || '/notices' || '/contact' || '/logs'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/notices'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/contact'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/book'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/notice'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/log'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/user'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
                <Route path={'/members'}>
                    { active === 'Catalogue' || active === 'Notices' || active === 'Home' || authState !== false ? 
                        this.state.pages2[active] : 
                        this.state.pages2['AuthWarning']
                    }
                </Route>
            </div>
            </BrowserRouter>
        );
    }
}

export default MainContent;