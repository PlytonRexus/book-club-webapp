import React, { Component } from 'react';
import '../css/IssueBook.css';
import { lread } from '../middleware/localStorage';
import { fetchUser } from '../utils/User';
import { createLog } from '../utils/Log';

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
            var text = user.email;
            option.textContent = text;
            option.setAttribute('class', 'issuer-option');
            option.setAttribute('value', user._id);
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
        const issuer = document.querySelector('.issuer').value;
        const bookIdToIssue = document.querySelector('.bookId').value;
        const createdBy = lread('bkclbSid').split(',')[1];
        const createdLog = await createLog(issuer, bookIdToIssue, createdBy);
        window
        .ModalRef
        .setState({ toLoad: <div>{JSON.stringify(createdLog)}</div> });
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
                            value={lread('bkclbSid').split(',')[1]} 
                            id="issuer-you"
                            className="issuer-option"
                        >
                            You
                        </option>
                    </select>
                    <hr />
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