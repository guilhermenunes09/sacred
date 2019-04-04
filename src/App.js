import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Request from './api/request.js';
import Unsplash from './api/unsplash.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Request />
        <Unsplash />
        <header className="App-header">

        </header>
        <body></body>

        <footer></footer>
      </div>
    );
  }
}

export default App;
