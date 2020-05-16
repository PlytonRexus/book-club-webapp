import React, { Component } from "react";
import '../css/Modal.css';
import { closeModal } from "../utils/Modal";

class Modal extends Component {
    state = {
        toLoad: null
    }
    render() {
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                    }}>
                        &times;
                    </span>
                    <div>
                        { this.state.toLoad ? this.state.toLoad : null }
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Modal;