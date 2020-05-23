import React, { Component } from 'react';
import '../css/Users.css';
import SearchBar from './SearchBar';
import { launchModal } from '../utils/Modal';
import { fetchUser } from '../utils/User';
import '../css/Users.css';

const DisplayBody = (props) => {
    var body = null;
    var iterator = 0;
    if (props.users) {
        body = props.users.map((user, index) => {
            iterator += 1;
            return (
                <tr key={index}>
                    <td>{iterator}</td>
                    <td>
                        ...
                    </td>
                    <td>
                        <a 
                            href={`/user?id=${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="users-name"
                        >
                            {user.name}
                        </a>
                    </td>
                    <td>
                        <a 
                            href={`/user?id=${user._id}`} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="users-email"
                        >
                            {user.email}
                        </a>
                    </td>
                    <td>{user.admin ? 'Yes' : 'No'}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                        <a 
                            href={`/user?id=${user._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="users-id"
                        >
                            {user._id}
                        </a>
                    </td>
                </tr>
            );
        });
    }
    
    return <tbody>{body}</tbody>
};

const DisplayHead = (props) => {
    return (
        <thead className="users-header">
            <tr>
                <th>Order</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Joined</th>
                <th>Member ID</th>
            </tr>
        </thead>
    );
};

class Display extends Component {
    render() {
        const { users } = this.props;
        return (
            <div className="table-wrapper">
                <table className="fl-table">
                    <DisplayHead 
                    />
                    <DisplayBody 
                        users={users}
                    />
                </table>
            </div>
        );
    }
}

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filtered: null
        }
    }

    filterSearch = async (query) => {
        if (query === '') {
            this.setState({
                users: this.state.all
            });
            return;
        }
        var regex = new RegExp(query, 'i');
        var results = this.state.users;
        var filtered = results.filter((user) => {
            if (regex.test(user.name)) {
                return true;
            } else if (regex.test(user.email)) {
                return true;
            } else if (regex.test(user._id)) {
                return true;
            } else if (regex.test(user.format)) {
                return true;
            } else if (regex.test(user.mode)) {
                return true;
            } else if (regex.test(user.admin ? 'yes' : 'no')) {
                return true;
            } else {
                return false;
            }
        });
        this.setState({filtered: filtered});
    }

    componentDidMount = async () => {
        await this.setUsers();
    }

    setUsers = async () => {
        const users = await fetchUser('all');
        if (!users) {
            launchModal();
            return window
            .ModalRef
            .setState({ toLoad: <div>Some error occured.</div>});
        }
        this.setState({
            users: users.users,
            all: users.users
        });
        document.title = "Members";
    }

    render = () => {
        return (
            <div>
                <header>
                    <h1 className="page-header">
                        Users
                        <SearchBar 
                            filterSearch={this.filterSearch} 
                            placeholder="Name, Email, ID, Joined..." 
                        />
                    </h1>
                </header>
                <Display 
                    users={this.state.filtered || this.state.users} 
                />
            </div>
        );
    }
}

export default Users;