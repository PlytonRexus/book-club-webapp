import React, { Component } from 'react';
import '../css/Loader.css';

class Loader extends Component {
    render  = () => {
        return (
            <div className="loader-wrap">
                <div id="loader"></div>
            </div>
        );
    }
}

export default Loader;