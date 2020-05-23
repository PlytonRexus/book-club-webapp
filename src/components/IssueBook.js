import React, { Component } from 'react';
import '../css/IssueBook.css';
import { lread } from '../middleware/localStorage';
import { fetchUser } from '../utils/User';
import { createLog } from '../utils/Log';
import { closeModal } from '../utils/Modal';

class IssueBook extends Component {
    state = {
        bookId: '',
        issuer: ''
    }

    componentDidMount = async () => {
        const users = await fetchUser('all');
        const issuerSelector = document.querySelector('.issuer');
        users.users.forEach((user) => {
            if (user._id === lread('bkclbSid').split(',')[1]) return;
            var option = document.createElement('option');
            var text = user.email + '-' + user._id;
            option.setAttribute('value', user.email + '-' + user._id);
            option.textContent = text;
            option.setAttribute('class', 'issuer-option');
            issuerSelector.appendChild(option);
        });
    }

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    runSubmit = async (event) => {
        event.preventDefault();
        document.querySelector('.submitIssue').disabled = true;
        document.querySelector('.issue-book-status').innerHTML = 'Creating...';
        const issuer = this.state.issuer || document.querySelector('.issuer').value.split('-')[1];
        const bookIdToIssue = this.state.bookId || document.querySelector('.bookId').value;
        const createdBy = lread('bkclbSid').split(',')[0];
        await createLog(issuer, bookIdToIssue, createdBy);
        document.querySelector('.issue-book-status').innerHTML = 'Created.';
        document.querySelector('.submitIssue').disabled = false;
        setTimeout(closeModal, 1000);

    }

    render = () => {
        const { bookId } = this.props;
        return (
            <div className="issue-book">
                <form className="log-details">
                    <label htmlFor="bookId" className="issue-book-label">Book ID:</label>
                    <hr />
                    <input 
                        type="text" 
                        className="bookId" 
                        disabled={true} 
                        value={bookId} 
                        required={true} 
                        name="bookId"
                    />
                    <label htmlFor="issuer" className="issue-book-label">Issued To:</label>
                    <hr />
                    <select 
                        className="issuer" 
                        name="issuer" 
                        required={true} 
                    >
                        <option 
                            value={`${lread('bkclbSid').split(',')[1]}-${lread('bkclbSid').split(',')[0]}`} 
                            id="issuer-you"
                            className="issuer-option"
                        >
                            You
                        </option>
                    </select>
                    <hr />
                    <span className="issue-book-status"></span>
                    <button 
                        className="submitIssue" 
                        onClick={this.runSubmit} 
                    >
                        Create Log
                    </button>
                </form>
            </div>
        );
    }
}

export default IssueBook;