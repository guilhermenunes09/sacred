import React, { Component } from 'react';
import './App.css';
import Index from './pages/index/index.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
           <Route path="/" exact component={Index} />
      </Router>
    );
  }
}

export default App;
