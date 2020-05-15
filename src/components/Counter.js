import React, { Component } from "react";
import '../css/Table.css';

class Counter extends Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0
      };
    }
      // change code below this line
    increment = () => {
      var count = this.state.count;
      this.setState({ count: count + 1 });
    }
  
    decrement = () => {
      var count = this.state.count;
      this.setState({ count: count - 1 });
    }
  
    reset = () => {
      this.setState({ count: 0 });
    }
    
    render() {
      return (
        <div>
          <button className='inc icon-btn add-btn' onClick={this.increment}>
            <div className="btn-txt">Increment!</div>
          </button>
          <button className='dec icon-btn add-btn' onClick={this.decrement}>
            <div className="btn-txt">Decrement!</div>
          </button>
          <button className='reset icon-btn' onClick={this.reset}>
            <div className="btn-txt">Reset</div>
          </button>
          <h1>Current Count: {this.state.count}</h1>
        </div>
      );
    }
}

export default Counter;