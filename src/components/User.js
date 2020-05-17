import React, { Component } from "react";
import { fetchUser } from "../utils/User";
import '../css/User.css';

const UserDetailsBody = props => {
    const body = Object.keys(props.user).map((property) => {
        if (property === 'avatar' || property === 'format') return null;
        return (
            <tr key={ property }>
                <th key={ property }>{ property }</th>
                <td>
                    <textarea disabled={true}>
                        { JSON.stringify(props.user[property]) }
                    </textarea>
                </td>
            </tr>
        );
    });
    return (
        <tbody>
            {body}
            <button className="edit-button"> Edit </button>
            <button className="save-button"> Save </button>
        </tbody>
    );
};

const UserDetails = (props) => {
    return (
        <div className="user-details">
            <div className="user-details-form-wrapper">
                <form className="user-details-form">
                    <div className="user-avatar-wrapper">
                        <img 
                            src={ props.user.avatar ? props.user.avatar : null } 
                            alt="This user's avatar." 
                            className="user-avatar" 
                        />
                    </div>
                    <div className="user-table-wrapper">
                        <table className="user-table">
                            <UserDetailsBody user={props.user} />
                        </table>
                    </div>
                </form>
            </div>
        </div>
    );
}

class User extends Component {
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
        var fetchedUser = await fetchUser(this.state.id);
        if (fetchedUser) {
            this.setState({ user: fetchedUser });
        }
    }

    render = () => {
        return (
        <div className="User">
            <div className="user-overlay">
                <div className="user-overlay-text"></div>
            </div>
            { this.state.user ? <UserDetails user={this.state.user}/> : null }
        </div>
        );
        
    }
}

export default User;