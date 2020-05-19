import React from 'react';
import '../css/Header.css';

const Header = (props) => {
    return (
        <header className="page-header-wrapper">
            <div className="page-header">
                <span className="page-header-text">{ props.header }</span>
            </div>
        </header>
    );
}

export default Header;