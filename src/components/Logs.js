import React, { Component } from 'react';
import '../css/Catalogue.css';
import SearchBar from './SearchBar';
import { launchModal } from '../utils/Modal';
import { fetchLog } from '../utils/Log';
import '../css/Logs.css';
import Display from "./LogsDisplay";

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
            this.setState({
                logs: this.state.all
            });
            return;
        }
        var regex = new RegExp(query, 'i');
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
        document.title = "Logs";
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
            logs: logs,
            all: logs
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