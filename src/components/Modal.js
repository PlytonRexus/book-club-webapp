import React, { Component } from "react";
import '../css/Modal.css';
import { closeModal } from "../utils/Modal";

class Modal extends Component {
    state = {
        toLoad: null,
        closable: true
    }
    
    render = () => {
        const { closable, toLoad } = this.state;
        window.addEventListener("keydown", (e) => {
            console.log('closability:', closable);
            if (e.key === "Escape" && closable) {
                closeModal();
            } else if (!closable) {
                return;
            }
        });
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    { closable ? <span className="close" onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                    }}>
                        &times;
                    </span> : null}
                    <div>
                        { toLoad ? toLoad : null }
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Modal;