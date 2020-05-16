import React from 'react';
import '../css/Header.css';

const Header = (props) => {
    return (
        <header className="page-header-wrapper">
            <div className="page-header">
                { props.header }
            </div>
        </header>
    );
}

export default Header;