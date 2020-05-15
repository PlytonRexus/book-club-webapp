import React, { Component } from 'react';
import './App.css';

const EDAMAM_ID = 'ee08e98d';
const EDAMAM_API_KEY = '17ca8545f217ef283aafc1d5d7e1ea10';
const url = 
`https://api.edamam.com/search?q=chicken&app_id=${EDAMAM_ID}&app_key=${EDAMAM_API_KEY}`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>Hello!</div>
      </div>
    );
  }
}

export default App;