import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './api/request.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Request />
        <header className="App-header">

        </header>
        <body></body>

        <footer></footer>
      </div>
    );
  }
}

export default App;
