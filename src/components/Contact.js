import React, { Component } from 'react';
import '../css/Contact.css';

const fbMessenger = "https://m.me/bookclubiitismdhanbad?fbclid=IwAR3VL5CloWu70ZQKoza6k0T8C_buRt0fnDJ9KrxfyuerqDjmQZ-B7cThnNo";

class Contact extends Component {
    state = {
        status: ""
    }

    render = () => {
        var { status } = this.state;
        return (
            <div>
                <div className="contact-wrapper">
                    <form 
                        className="contact-form"
                        id="contact-form"
                        onSubmit={this.submitForm}
                        action="https://formspree.io/xyyneqzl"
                        method="POST"
                    >
                        <label className="contact-form-label" value="Name">Name:</label>
                        <input 
                            className="contact-form-input contact-name" 
                            placeholder="Write your name here.." 
                            name="_replyTo" 
                            type="text"
                        />
                        <label className="contact-form-label" value="Email">Email:</label>
                        <input 
                            className="contact-form-input contact-email" 
                            placeholder="Let us know how to get back to you..." 
                            name="email" 
                            type="email"
                        />
                        <label className="contact-form-label"  value="Message">Message:</label>
                        <input 
                            className="contact-form-input contact-message" 
                            placeholder="What would you like to tell us..." 
                            name="message" 
                            type="text"
                        />
                        <div className="contact-form-details">
                            <span className="fa fa-phone contact-emblem contact-extras"></span>
                            <a
                                href={fbMessenger}
                                className="contact-extras"
                            >
                                Messenger
                            </a>
                            <span className="fa fa-envelope-o contact-emblem"></span> <a className="contact-extras" href="book@iitism.ac.in" type="email">book@iitism.ac.in</a>
                            {status === "ERROR" && <span className="fa fa-envelope-o contact-emblem"></span>}
                            {status === "ERROR" && <span>Oops! There was an error.</span>}
                        </div>
                        {status === "SUCCESS" ? <p>Thanks!</p> : <button className="contact-form-submit">Send Message</button>}
                    </form>
                </div>
            </div>
        );
    }

    submitForm = (ev) => {
        ev.preventDefault();
        let form = document.getElementById('contact-form');
        let data = new FormData(form);
        const xhr = new XMLHttpRequest();
        // data.append('_replyTo', document.querySelector('.contact-name').value);
        // data.append('email', document.querySelector('.contact-email').value);
        // data.append('message', document.querySelector('.contact-message').value);
        xhr.open("POST", "https://formspree.io/xyyneqzl");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
                form.reset();
                this.setState({ status: "SUCCESS" });
            } else {
                this.setState({ status: "ERROR" });
            }
        };
        xhr.send(data);
    }
}

export default Contact;