import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Request from '../api/request.js';
import Unsplash from '../api/unsplash.js';

class Index extends Component {

  render() {
    return(
      <div className="Index">
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

export default Unsplash;
