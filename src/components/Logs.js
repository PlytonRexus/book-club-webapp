import React, { Component } from 'react';
import '../css/Catalogue.css';
import SearchBar from './SearchBar';
import { lread } from '../middleware/localStorage';
import { launchModal } from '../utils/Modal';
import { fetchLog } from '../utils/Log';
import '../css/Logs.css';

const DisplayBody = (props) => {
    var body = null;
    if (props.logs) {
        body = props.logs.map((log, index) => {
            var issuedOn = new Date(log.issuedOn).toLocaleDateString();
            var returnedOn;
            log.returnedOn !== 0 ?
             returnedOn = new Date(log.returnedOn).toLocaleDateString() : 
             returnedOn = 'Not yet returned.';
            return (
                <tr key={index}>
                    <td>{issuedOn}</td>
                    <td>
                        <a 
                            href={`/user?id=${log.issuedTo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logs-issuedTo"
                        >
                            {log.issuedTo}
                        </a>
                    </td>
                    <td>
                        <a 
                            href={`/user?id=${log.createdBy}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logs-logger"
                        >
                            {log.createdBy}
                        </a>
                    </td>
                    <td>
                        <a 
                            href={`/book?id=${log.book}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="logs-book"
                        >
                            {log.book}
                        </a>
                    </td>
                    <td>{returnedOn}</td>

                    {
                    /**
                     * Add && log.returnedOn === 0 to make sure 
                     * only unreturned logs can be modified.
                     */
                    }

                    { lread('bkclbSid').split(',')[2] ? 
                        <td>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open(`/log?id=${log._id}`);
                                }}
                                className="logs-modify-button"
                            >
                                Modify
                            </button>
                        </td> : null 
                    }
                </tr>
            );
        });
    }
    
    return <tbody>{body}</tbody>
};

const DisplayHead = (props) => {
    return (
        <thead className="catalogue-header">
            <tr>
                <th>Issued On</th>
                <th>Issuer</th>
                <th>Logger</th>
                <th>Book</th>
                <th>Returned On</th>
                { lread('bkclbSid').split(',')[2] === 'true' ? 
                    <th className="logs-modify-button">Modify</th> : 
                    null 
                }
            </tr>
        </thead>
    );
};

class Display extends Component {
    render() {
        const { logs } = this.props;
        return (
            <div className="table-wrapper">
                <table className="fl-table">
                    <DisplayHead 
                    />
                    <DisplayBody 
                        logs={logs}
                    />
                </table>
            </div>
        );
    }
}

class Logs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            filtered: null
        }
    }

    filterSearch = async (query) => {
        if (query === '') {
            await this.setLogs();
            return;
        }
        var regex = new RegExp(`${query}`, 'gi');
        var results = this.state.logs;
        var filtered = results.filter((log) => {
            if (regex.test(log.book)) {
                return true;
            } else if (regex.test(log.issuer)) {
                return true;
            } else if (regex.test(log.logger)) {
                return true;
            } else if (regex.test(log.issuedOn)) {
                return true;
            } else if (regex.test(log.returnedOn)) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({filtered: filtered});
    }

    componentDidMount = async () => {
        await this.setLogs();
    }

    setLogs = async () => {
        const logs = await fetchLog();
        if (!logs) {
            launchModal();
            return window
            .ModalRef
            .setState({ toLoad: <div>Some error occured.</div>});
        }
        this.setState({
            logs: logs
        });
    }

    render = () => {
        return (
            <div>
                <header>
                    <h1 className="page-header">
                        Logs
                        <SearchBar 
                            filterSearch={this.filterSearch} 
                            placeholder="Book, Issuer, Logger, Date..." 
                        />
                    </h1>
                </header>
                <Display 
                    logs={this.state.filtered || this.state.logs} 
                />
            </div>
        );
    }
}

export default Logs;