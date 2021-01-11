import React, { Component } from "react";
import { fetchLogById, updateLog } from "../utils/Log";
import { lread } from '../middleware/localStorage';
import '../css/Log.css';
import { fetchUser } from '../utils/User';
import { launchModal, closeModal } from '../utils/Modal';
import Loader from "./Loader";

class LogEditor extends Component {
    state = {
        id: this.props.id,
        issuedOn: '',
        returnedOn: '',
        issuedTo: '',
        createdBy: ''
    }

    fetchIssuedToOptions = async (issuedOn, returnedOn) => {
        const users = await fetchUser('all');
        const issuedToSelector = document.querySelector('.log-editor-form-issuedTo');
        users.users.forEach((user) => {
            if (user._id === lread('bkclbSid').split(',')[1]) return;
            var option = document.createElement('option');
            var text = user.name ? `${user.name} | ${user.email}` : user.email;
            option.textContent = text;
            option.setAttribute('class', 'issuedTo-option');
            option.setAttribute('value', user._id);

            if (this.props.log.issuedTo === user._id) option.setAttribute('selected', true);
            issuedToSelector.appendChild(option);
        });

        /**
         * The function parameters only help to render the state the once
         * rather than twice.
         * The following QuerySelector applies default value.
         */
        this.setState({
            users: users.users,
            issuedOn,
            returnedOn
        });
    }

    componentDidMount = async () => {
        const { issuedOn, returnedOn } = this.props.log;

        var lissuedOn = '', lreturnedOn = '';

        var di = new Date(issuedOn);
        var dr = new Date(returnedOn);

        /**Date Parsing */
        var iyear = di.getFullYear();
        var imonth = 
            di.getMonth().toString().length < 2 ?
             `0${di.getMonth().toString()}` : 
             di.getMonth().toString();
        var idate = 
            di.getDate().toString().length < 2 ?
            `0${di.getDate().toString()}` : 
            di.getDate().toString();
        var ryear = dr.getFullYear();
        var rmonth = 
            dr.getMonth().toString().length < 2 ?
                `0${di.getMonth().toString()}` : 
                dr.getMonth().toString();
        var rdate = 
            dr.getDate().toString().length < 2 ?
            `0${di.getDate().toString()}` : 
            dr.getDate().toString();

        lissuedOn += `${iyear}-${imonth}-${idate}`;
        lreturnedOn += `${ryear}-${rmonth}-${rdate}`;

        await this.fetchIssuedToOptions(lissuedOn, lreturnedOn);
        closeModal()
    }

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    runSubmit = async (e) => {
        e.preventDefault();
        document.querySelector('.log-editor-alert-area').innerHTML = 'Saving edits...';
        document.querySelector('.log-editor-form-issuedOn').disabled = true;
        document.querySelector('.log-editor-form-returnedOn').disabled = true;
        document.querySelector('.log-editor-form-issuedTo').disabled = true;
        document.querySelector('.log-editor-form-submit').disabled = true;
        const { id, issuedOn, issuedTo, returnedOn } = this.state;
        var lio = issuedOn ? Date.parse(issuedOn) : this.props.log.issuedOn;
        var lro = returnedOn ? Date.parse(returnedOn) : this.props.log.issuedOn;
        let result = await updateLog(id, { 
            issuedOn: lio, 
            issuedTo: issuedTo, 
            returnedOn: lro
        });
        if (result)
        document.querySelector('.log-editor-alert-area').innerHTML = 'Saved.';
        else
        document.querySelector('.log-editor-alert-area').innerHTML = 'Some error occured.';

        document.querySelector('.log-editor-form-issuedOn').disabled = false;
        document.querySelector('.log-editor-form-returnedOn').disabled = false;
        document.querySelector('.log-editor-form-issuedTo').disabled = false;
        document.querySelector('.log-editor-form-submit').disabled = false;
    }

    render = () => {
        return (
            <div className="log-editor-wrapper">
                <form className="log-editor-form">
                    <div className="log-editor-info">
                        Make sure the dates are always filled. 
                        Log id: {`${this.state.id}`}. 
                        Book id: {`${this.props.log.book}`}. 
                    </div>
                    <label htmlFor="issuedOn" className="log-editor-form-label">
                        Issued On:
                    </label>
                    <input 
                        type="date" 
                        name="issuedOn" 
                        className="log-editor-form-issuedOn" 
                        onChange={this.handleChange} 
                        defaultValue={this.state.issuedOn} 
                        required={true}
                    />
                    <hr />
                    <label htmlFor="returnedOn" className="log-editor-form-label">
                        Returned On:
                    </label>
                    <input 
                        name="returnedOn" 
                        type="date"
                        id="log-editor-form-returnedOn" 
                        className="log-editor-form-returnedOn"
                        onChange={this.handleChange}
                        defaultValue={this.state.returnedOn}
                        required={true}
                    />
                    <hr />
                    <label htmlFor="issuedTo" className="log-editor-form-label">
                        Who was this book issued to?
                    </label>
                    <select 
                        className="log-editor-form-issuedTo" 
                        name="issuedTo" 
                        required={true} 
                    >
                        <option 
                            value={lread('bkclbSid').split(',')[1]} 
                            id="issuedTo-you"
                            className="issuedTo-option"
                        >
                            You
                        </option>
                    </select>
                    <p className="log-editor-alert-area"></p>
                    <hr />
                    <button 
                        className="log-editor-form-submit"
                        onClick={this.runSubmit}
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

class Log extends Component {
    constructor(props) {
        super(props);
        var params = {};
        window.location.search.replace('?', '').split('&').forEach((val, ind) => {
            params[val.split('=')[0]] = val.split('=')[1];
        });
        this.state = {
            id: params.id
        }
    }

    componentDidMount = async () => {
        launchModal();
        window
        .ModalRef
        .setState({ toLoad: <Loader />,
            closable: false 
        });
        var fetchedLog= await fetchLogById(this.state.id);
        if (fetchedLog) {
            this.setState({ log: fetchedLog});
            document.title = 'Log Editor';
        }
    }

    render = () => {
        const { log, id } = this.state;
        return (
        <div className="Log">
            { this.state.log ? 
                <LogEditor log={log} id={id}/> : 
                <div>
                    Nothing will appear here if the request is invalid.
                    Only if you are an admin, will this edit work.
                </div>
            }
        </div>
        );
        
    }
}

export default Log;