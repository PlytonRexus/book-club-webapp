import React, { Component } from 'react';
import '../css/Burger.css';

class Burger extends Component {
    render() {
        // var { switchSidebar } = this.props;
        return (
            <button
                className="burger" 
                onClick={() => {
                    if(document.documentElement.clientWidth <= 650) {
                        document.getElementById("mySidenav").style.width = "100vw";
                        document.querySelector(".main-content").style.marginLeft = "100vw";
                        document.querySelector('.burger').style.display = 'none';
                        // switchSidebar('opened');
                    }
                    else {
                        document.getElementById("mySidenav").style.width = "18vw";
                        document.querySelector(".main-content").style.marginLeft = "18vw";
                        document.querySelector(".main-content").style.width = "82vw";
                        document.querySelector(".navbar").style.width = "82vw";
                        document.querySelector('.burger').style.display = 'none';
                        // switchSidebar('opened');
                    }
                }}
            >
                &#9776;
            </button>
        );
    }
}

export default Burger;