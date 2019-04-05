import React, { Component } from 'react';
import '../../App.css';
import Request from '../../api/request.js';
import Unsplash from '../../api/unsplash.js';
import { Button, Card, Row, Col } from 'react-materialize';

class Index extends Component {

  render() {
    return(
      <div className="Index">
        hello
        <Button
          floating
          large
          className="red"
          waves="light"
          icon="add"
        />
        <Unsplash />


      </div>
    );
  }

}

export default Index;
