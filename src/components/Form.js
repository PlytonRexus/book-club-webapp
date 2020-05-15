import React, { Component } from "react";
import '../css/Form.css';

class Form extends Component {
    initialState = {
        name: '',
        job: ''
    }

    state = this.initialState

    handleChange = event => {
        const { name, value } = event.target
      
        this.setState({
          [name]: value,
        })
    }

    runSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state.name, this.state.job);
        this.setState(this.initialState);
    }

    render() {
        const { name, job } = this.state;
        
        return (
            <div className="formDiv">
                <form>
                    <label >Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <label>Job</label>
                    <input
                        type="text"
                        name="job"
                        id="job"
                        value={job}
                        onChange={this.handleChange}
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

export default Form;