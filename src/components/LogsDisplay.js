import React, { Component } from "react";
import { lread } from '../middleware/localStorage';

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

                    { lread('bkclbSid') ? (lread('bkclbSid').split(',')[2] === 'true' ? 
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
                        </td> : null) : null
                    }
                </tr>
            );
        });
    }
    
    return <tbody>{body}</tbody>
};

const DisplayHead = (props) => {
    return (
        <thead className="logs-header">
            <tr>
                <th>Issued On</th>
                <th>Issuer</th>
                <th>Logger</th>
                <th>Book</th>
                <th>Returned On</th>
                { lread('bkclbSid') ? (lread('bkclbSid').split(',')[2] === 'true' ? 
                    <th className="logs-modify-button">Modify</th> : null) : 
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

export default Display;