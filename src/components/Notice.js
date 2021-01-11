import React, { Component } from "react";
import { fetchNoticeById, updateNotice, createNotice, deleteNotice } from "../utils/Notice";
import { lread } from '../middleware/localStorage';
import '../css/Notice.css';
import { launchModal } from '../utils/Modal';
import Header from './Header';

class FormattingInfo extends Component {
    render = () => {
        return (
            <div className="formatting-instructions modal-with-white-bg">
                <h4>You can use basic HTML syntax to format the notice body. For example:</h4>
                <p>
                    <ul>
                        <li><code>{`<b></b>`}</code> makes text bold. </li>
                        <li><code>{`<i></i>`}</code> makes text italic.</li>
                        <li><code>{`<code></code>`}</code> formats text as code.</li>
                        <li><code>{`<u></u>`}</code> underlines text.</li>
                        <li><code>{`<img src=${`image-url`} />`}</code> adds images.</li>
                        <li> In fact, you can also add youtube iframes. Use the share button under a video to get an HTML Snippet.</li>
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

    componentDidMount = () => {
        this.setState({
            title: this.props.notice.title,
            body: this.props.notice.body    
        });
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
        document.querySelector('.notice-editor-form-delete').disabled = true;
        const uid = lread('bkclbSid').split(',')[0];
        const { id, title, body } = this.state;
        if (id.length > 0) await updateNotice(id, title, body, uid);
        else await createNotice(title, body, lread('bkclbSid').split(',')[0]);
        document.querySelector('.notice-editor-alert-area').innerHTML = 'Saved.';
        document.querySelector('.notice-editor-form-title').disabled = false;
        document.querySelector('.notice-editor-form-body').disabled = false;
        document.querySelector('.notice-editor-form-submit').disabled = false;
        document.querySelector('.notice-editor-form-delete').disabled = false;
    }

    runDelete = async (e) => {
        e.preventDefault();
        document.querySelector('.notice-editor-alert-area').innerHTML = 'Deleting...';
        document.querySelector('.notice-editor-form-title').disabled = true;
        document.querySelector('.notice-editor-form-body').disabled = true;
        document.querySelector('.notice-editor-form-submit').disabled = true;
        document.querySelector('.notice-editor-form-delete').disabled = true;
        const { id } = this.state;
        if (id.length > 0) await deleteNotice(id);
        document.querySelector('.notice-editor-alert-area').innerHTML = 'Deleted.';
        document.querySelector('.notice-editor-form-title').disabled = false;
        document.querySelector('.notice-editor-form-body').disabled = false;
        document.querySelector('.notice-editor-form-submit').disabled = false;
        document.querySelector('.notice-editor-form-delete').disabled = true;
        launchModal();
        window.ModalRef.setState({
            toLoad: <div  style={{
                background: '#fff',
                padding: '20px',
                border: '2px solid white'
            }}><em>Notice deleted successfully.</em><br />
            You can continue editing to create a new notice or close this tab to discard changes.</div>
        })
    }

    render = () => {
        document.title = "Notice Editor";
        return (
            <div className="notice-editor-wrapper">
                <Header header={`Notice Editor`}/>
                <form className="notice-editor-form">
                    <p className="notice-editor-info">
                        An edit cannot be reverted. Only admins can make changes to notices.
                    </p>
                    <input 
                        type="text" 
                        name="title" 
                        className="notice-editor-form-title" 
                        onChange={this.handleChange}
                        defaultValue={this.props.notice.title}
                        placeholder="Notice Title"
                        required={true} 
                    />
                    <textarea 
                        name="body" 
                        id="notice-editor-form-body" 
                        className="notice-editor-form-body"
                        onChange={this.handleChange}
                        defaultValue={this.props.notice.body}
                        placeholder="Notice Body"
                        required={true}
                    >
                    </textarea>
                    <span className="notice-editor-alert-area"></span>
                    {
                        lread('bkclbSid') ? 
                            lread('bkclbSid').split(',')[2] === 'true' ?
                                <div>
                                    <hr />
                                    <button 
                                        className="notice-editor-form-submit"
                                        onClick={this.runSubmit}
                                    >
                                        Save
                                    </button>
                                    <button 
                                        className="notice-editor-form-delete"
                                        onClick={this.runDelete}
                                    >
                                        Delete
                                    </button>
                                </div> : null :
                            null
                    }
                    <hr />
                    <div 
                        className="notice-preview-area" 
                        dangerouslySetInnerHTML={{__html: this.state.body}}
                    >
                    </div>
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
        if(params.id)  {
            this.state = {
                id: params.id
            }
        }
        else {
            this.state = {
                id: ''
            }
        }
    }

    componentDidMount = async () => {
        launchModal();
        window
        .ModalRef
        .setState({ toLoad: 
            <div>
                <FormattingInfo />
            </div> 
        });
        if (this.state.id.length > 0) {
            var fetchedNotice= await fetchNoticeById(this.state.id);
            if (fetchedNotice) {
                this.setState({ notice: fetchedNotice });
            }
        }
        else {
            this.setState({ notice: { title: '', body: '' } });
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