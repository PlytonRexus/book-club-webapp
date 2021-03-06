import React, { Component } from 'react';
import Header from './Header';
import '../css/Notices.css';
import { fetchNotice } from "../utils/Notice";
import { launchModal } from "../utils/Modal";

const NoticeCards = (props) => {
    if (!props.notices) {
        return (
            <div className="warning-card">
                <div className="warning-card-text">
                    <h4>
                        <b>Loading...</b>
                    </h4>
                    <p>
                        <em>
                        If this message does not go away within a minute,
                        try reloading or check your internet connection.
                        </em>
                    </p>
                </div>
            </div>
        );
    }
    const noticeCards = props.notices.map((notice, index) => {
        return (
            <div className="notice-card" key={index}>
                <div className="notice-card-text">
                    <a
                            href={`/notice?id=${notice._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='notice-card-text-title'
                        >
                            <h4>{notice.title}</h4>
                    </a>
                    <p dangerouslySetInnerHTML={{__html: notice.body}}></p>
                </div>
            </div>
        );
    });

    return (
        <div className="notice-card-wrapper">
            <div className="notice-card">
                <div className="notice-card-text">
                    <h4><b>Sample Notice</b></h4> 
                    <p>Notice content.</p> 
                </div>
            </div>
            {noticeCards}
        </div>
    );
}

class Notices extends Component {
    state = {
        notices: null
    }

    componentDidMount = async () => {
        const notices = await fetchNotice();
        if (notices) {
            this.setState({
                notices: notices.notices
            });
        }
        else {
            launchModal();
            return window
            .ModalRef
            .setState({ toLoad: <div>Some error occured.</div>});
        }
        document.title = "Notices";
    }

    noticeCreator = (e) => {
        e.preventDefault();
        window.open('/notice');
    }

    render() {
        return (
            <div className="notices-wrapper">
                <Header header={`Notices`}/>
                <button onClick={this.noticeCreator} className="notices-creator">
                    Create New Notice
                </button>
                <NoticeCards notices={this.state.notices}/>
            </div>
        );
    }
}

export default Notices;