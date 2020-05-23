import React, { Component } from "react";
import { fetchUser, updateUser } from "../utils/User";
import '../css/User.css';
import Display from "./LogsDisplay";
import { lread, lwrite } from "../middleware/localStorage";
import Header from "./Header";
import BooksDisplay from './BooksDisplay';

var arrayedProps = [];

const UserDetailsBody = props => {

    // Contains properties that will be displayed to the user.

    // Putting propertins into tr elements.
    const body = Object.keys(props.user).map((property) => {

        // Validation
        const invalid = ['avatar', 'format', 'superUser', 'toRead', 'fid', 'id']
        if (invalid.includes(property)) return null;
        if(property === 'password' && !(lread('bkclbSid').split(',')[0] === props.user['_id'])) return null;
        arrayedProps.push(property);

        // Main details pane - return statement
        return (
            <tr key={ property }>
                <th key={ property }>{ property.toLocaleUpperCase() }</th>
                <td>
                    <input 
                        type={property}
                        disabled={true}
                        defaultValue={typeof(props.user[property]) === 'string' ? props.user[property].replace(/"/g, "") : props.user[property]}
                        className={`user-${property} user-fields-textarea`}
                    >
                    </input>
                </td>
            </tr>
        );
    });

    const enableEditing = (e) => {
        e.preventDefault();

        const editable = ['name', 'email', 'password'];

        editable.forEach((property) => {
            if (!document.querySelector(`.user-${property}`)) return;
            document.querySelector(`.user-${property}`).disabled = false;
        });

        if (document.querySelector('.user-edit-status')) {
            document.querySelector('.user-edit-status').innerHTML = 'Editing...';
        }
        if (document.querySelector(`.user-save-button`)) {
            document.querySelector(`.user-edit-button`).disabled = true;
            document.querySelector(`.user-save-button`).disabled = false;
            document.querySelector(`.user-save-button`).addEventListener('click', saveChanges);
        }
    }

    const saveChanges = async (e) => {
        e.preventDefault();

        if (document.querySelector('.user-edit-status')) {
            document.querySelector('.user-edit-status').innerHTML = 'Saving...';
        }

        // Disable save button.
        document.querySelector(`.user-save-button`).disabled = true;

        // Disabling editable fields.
        const editable = ['name', 'email', 'password'];
        editable.forEach((property) => {
            if (!document.querySelector(`.user-${property}`)) return;
            document.querySelector(`.user-${property}`).disabled = false;
        });

        // Getting DOM input fields.
        var nameField, emailField, passwordField;
        if (document.querySelector(`.user-name`)) nameField = document.querySelector(`.user-name`);
        if (document.querySelector(`.user-email`)) emailField = document.querySelector(`.user-email`);
        if (document.querySelector(`.user-password`)) passwordField = document.querySelector(`.user-password`);

        // Creating updatable object.
        var updatingObject = {};
        if (props.user.name !== nameField) {
            updatingObject[`name`] = nameField.value;
        }
        if (props.user.email !== emailField) {
            updatingObject[`email`] = emailField.value;
        }
        if (props.user.password !== passwordField) {
            updatingObject[`password`] = passwordField.value;
        }

        // API call to save changes.
        await updateUser(updatingObject);

        // Enabling edit button and displaying edits.
        if (document.querySelector('.user-edit-status')) {
            document.querySelector('.user-edit-status').innerHTML = 'Saved';
        }
        document.querySelector(`.user-edit-button`).disabled = false;

        // Reseting user state.
        props.resetUser();
    }

    function setImage() {
        var fd = new FormData();
        var request = new XMLHttpRequest();
        request.open("POST", "https://frigid-fox.herokuapp.com/v1/users/me/avatar", true);
        fd.append("email", "app@book.club");
        fd.append("password", "android@superUser");
        fd.append("_id", props.user._id);
        fd.append("avatar", 
            document.querySelector('#avatar-select-button').files[0], 
            document.querySelector('#avatar-select-button').files[0].name);
        console.log(document.querySelector('#avatar-select-button').files[0]);
        request.send(fd);   
        request.onload = function(oEvent) {
            if (request.status === 202) {
                console.log("Uploaded!");
                showSavedState();
                props.resetUser();

            } else {
                console.log(request.response);
                showErrorState();
            }
        };
    }

    function changeAvatar(e) {
        document.querySelector(`.user-edit-button`).disabled = true;
        if (document.querySelector('.user-edit-status')) {
            document.querySelector('.user-edit-status').innerHTML = 'Saving...';
        }
        setImage();
        e.preventDefault();

    }

    function showSavedState() {
        document.querySelector(`.user-edit-button`).disabled = false;
        if (document.querySelector('.user-edit-status')) {
            document.querySelector('.user-edit-status').innerHTML = 'Saved.'
        }
    }

    function showErrorState() {
        document.querySelector(`.user-edit-button`).disabled = false;
        if (document.querySelector('.user-edit-status')) {
            setTimeout(() => {
                document.querySelector('.user-edit-status').innerHTML = 'Error.'
            }, 15000);
        }
    }

    return (
        <tbody>
            {body}
            {
                lread('bkclbSid').split(',')[0] === props.user._id ? 
                    <tr>
                        <td>
                        <form 
                            method="POST" 
                            action="https://frigid-fox.herokuapp.com/v1/users/me/avatar"
                            encType="multipart/form-data"
                            className="avatar-change-form"
                        >
                            <input 
                                type="file" 
                                className="avatar-select-button" 
                                id="avatar-select-button" 
                                accept=".png, .jpg, .tiff" 
                                required={true}
                            />
                            <button 
                                className="avatar-save-button"
                                type="submit"
                                onClick={changeAvatar}
                            > 
                                Change Avatar 
                            </button>
                        </form>
                        </td>
                        <td>
                            <button 
                                className="user-edit-button"
                                onClick={enableEditing}> Edit </button>
                        </td>
                        <td>
                            <button className="user-save-button" disabled={true}> Save </button>
                        </td> 
                        <td>
                            <span className="user-edit-status"></span>
                        </td>
                    </tr> : null
            }
        </tbody>
    );
};

const UserDetails = (props) => {
    return (
        <div className="user-details">
            <div className="user-details-form-wrapper">
                <form className="user-details-form">
                    <div className="user-avatar-wrapper">
                        <span className="user-avatar-wrapper">
                            <img 
                                src={`https://frigid-fox.herokuapp.com/v1/users/${props.user._id}/avatar`} 
                                onError={() => {document.querySelector('.user-avatar').src = `/bookclub-logo.png`}}
                                className="user-avatar"
                                alt=""
                            />
                        </span>
                    </div>
                    <div className="user-table-wrapper">
                        <table className="user-table">
                            <UserDetailsBody user={props.user} resetUser={props.resetUser}/>
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

    resetUser = async () => {
        var fetchedUser;
        if(this.state.id)
        fetchedUser = await fetchUser(this.state.id);
        if (fetchedUser) {
            lwrite('bkclbSid', [fetchedUser._id, fetchedUser.email, fetchedUser.admin, fetchedUser.superUser]);

            this.setState({
                user: fetchedUser
            });
        }
    }

    componentDidMount = async () => {
        var fetchedUser;
        if(this.state.id)
        fetchedUser = await fetchUser(this.state.id);
        var issuedByUser = await fetchUser('issued/all', this.state.id);
        if (fetchedUser) {
            this.setState({ 
                user: fetchedUser,
                logs: issuedByUser.books.map((log) => {
                    return {
                        book: log.book.title,
                        issuedTo: log.issuedTo,
                        issuedOn: log.issuedOn,
                        returnedOn: log.returnedOn,
                        createdBy: log.createdBy
                    }
                }),
                toRead: fetchedUser.toRead
            });
            document.title = fetchedUser.email;
        }                                                                                                                                                                                                                                                                      
    }

    render = () => {                                                                                                                                
        return (
        <div className="User">
            <div className="user-overlay">
                <div className="user-overlay-text"></div>
            </div>
            <Header header={`Details`}/>
            { this.state.user ? <UserDetails user={this.state.user} resetUser={this.resetUser}/> : null }
            <Header header={`Issued Books`} />
            { 
                this.state.user ? 
                <Display
                    logs={this.state.logs} 
                /> : null 
            }
                <Header header={`Want-To-Read Shelf`}/>
            {
                this.state.user ? 
                <BooksDisplay 
                    books={this.state.toRead} 
                /> : null
            }
        </div>
        );
        
    }
}

export default User;