import React, { Component } from "react";
import { fetchNoticeById, updateNotice } from "../utils/Notice";
import { lread } from '../middleware/localStorage';
import '../css/Notice.css';
import { launchModal } from '../utils/Modal';

class FormattingInfo extends Component {
    render = () => {
        return (
            <div className="formatting-instructions">
                <h4>You can use basic HTML syntax to format the notice body. For example:</h4>
                <p>
                    <ul>
                        <li>{`<b></b>`} makes text bold. </li>
                        <li>{`<i></i>`} makes text italic.</li>
                        <li>{`<code></code>`} formats text as code.</li>
                        <li>{`<u></u>`} underlines text.</li>
                    </ul>
                </p>
            </div>
        );
    }
    
}

class NoticeEditor extends Component {
    state = {
        id: this.props.id,
        title: '',
        body: ''
    }

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    runSubmit = async (e) => {
        e.preventDefault();
        document.querySelector('.notice-editor-alert-area').innerHTML = 'Saving edits...';
        document.querySelector('.notice-editor-form-title').disabled = true;
        document.querySelector('.notice-editor-form-body').disabled = true;
        document.querySelector('.notice-editor-form-submit').disabled = true;
        const uid = lread('bkclbSid').split(',')[0];
        const { id, title, body } = this.state;
        await updateNotice(id, title, body, uid);
        document.querySelector('.notice-editor-alert-area').innerHTML = 'Saved.';
        document.querySelector('.notice-editor-form-title').disabled = false;
        document.querySelector('.notice-editor-form-body').disabled = false;
        document.querySelector('.notice-editor-form-submit').disabled = false;
    }

    render = () => {
        return (
            <div className="notice-editor-wrapper">
                <form className="notice-editor-form">
                    <p className="notice-editor-info">
                        An edit cannot be reverted. Be careful when you make any changes.
                    </p>
                    <input 
                        type="text" 
                        name="title" 
                        className="notice-editor-form-title" 
                        onChange={this.handleChange}
                        defaultValue={this.props.notice.title}
                    />
                    <textarea 
                        name="body" 
                        id="notice-editor-form-body" 
                        className="notice-editor-form-body"
                        onChange={this.handleChange}
                        defaultValue={this.props.notice.body}
                    >
                    </textarea>
                    <span className="notice-editor-alert-area"></span>
                    <hr />
                    <button 
                        className="notice-editor-form-submit"
                        onClick={this.runSubmit}
                    >
                        Save
                    </button>
                </form>
            </div>
        );
    }
}

class Notice extends Component {
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
        .setState({ toLoad: <FormattingInfo /> });
        var fetchedNotice= await fetchNoticeById(this.state.id);
        if (fetchedNotice) {
            this.setState({ notice: fetchedNotice });
        }
    }

    render = () => {
        const { notice, id } = this.state;
        return (
        <div className="Notice">
            { this.state.notice ? 
                <NoticeEditor notice={notice} id={id}/> : 
                <div>
                    Nothing will appear here if the request is invalid.
                    Only if you are an admin, will this edit work.
                </div>
            }
        </div>
        );
        
    }
}

export default Notice;