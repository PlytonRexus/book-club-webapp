import React from 'react';
import '../css/Contact.css';

const Contact = () => (
    <div>
        <div className="contact-wrapper">
            <form class="contact-form">
                <p className="contact-form-label" type="Name:"><input className="contact-form-input" placeholder="Write your name here.."></input></p>
                <p className="contact-form-label" type="Email:"><input className="contact-form-input" placeholder="Let us know how to contact you back.."></input></p>
                <p className="contact-form-label"  type="Message:"><input className="contact-form-input" placeholder="What would you like to tell us.."></input></p>
                <button className="contact-form-submit">Send Message</button>
                <div className="contact-form-details">
                    <span className="fa fa-phone contact-emblem"></span><a
                    href="https://m.me/bookclubiitismdhanbad?fbclid=IwAR3VL5CloWu70ZQKoza6k0T8C_buRt0fnDJ9KrxfyuerqDjmQZ-B7cThnNo">Messenger</a>
                    <span className="fa fa-envelope-o contact-emblem"></span> <a href="book@iitism.ac.in" type="email">book@iitism.ac.in</a>
                </div>
            </form>
        </div>
    </div>
);

export default Contact;