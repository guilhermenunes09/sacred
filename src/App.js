import React, { Component } from 'react';
import './App.css';
import Index from './pages/index/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
           <Route path="/" exact component={Index} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
