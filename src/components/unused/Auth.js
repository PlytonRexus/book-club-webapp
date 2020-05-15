import React, { Component } from 'react';
import '../css/Form.css';
import { write } from '../../middleware/localStorage';

const profileURL = 'https://frigid-fox.herokuapp.com/v1/users/me';

class Auth extends Component {
    initialState = {
        email: '',
        password: ''
    }

    state = this.initialState

    handleChange = event => {
        const { name, value } = event.target;
      
        this.setState({ [name]: value, });
    }

    runSubmit = async (event) => {
        event.preventDefault();
        const result = await this.handleSubmit(this.state.email, this.state.password);
        if (result) {
            this.props.changeActivePage(parseInt(null, this.props.redirectTo));
        }
        else {
            this.setState(this.initialState);
            console.log('Try again!');
        }
    }

    handleSubmit = async (email, password) => {
        var response = await fetch(
            profileURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        console.log(response);

        if (response.ok) {
            var obj = await response.json();
            write('bkclbSid', obj._id);
            write('bkclbEmail', obj.email);
            write('bkclbPass', obj.password);
            return true;
        }
        else return false;
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="formDiv">
                <form>
                    <label >Name</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={this.handleChange}
                        required={true}
                    />
                    <label>password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={this.handleChange}
                        required={true}
                    />
                    <input
                        type="submit"
                        name="submit"
                        id="submit"
                        onClick={this.runSubmit}
                    />
                </form>
            </div>
        );
    }
}

export default Auth;