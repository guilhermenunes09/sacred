import React, { Component } from 'react';
import '../../App.css';
import Request from '../../api/request.js';
import Unsplash from '../../api/unsplash.js';
import { Button, Card, Row, Col } from 'react-materialize';
import ImgList from './img_list.js';
import Canvas from './canvas.js';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden_word: 'Default',
    }
  }

  changeHiddenWord = (hidden_word) => {
    this.setState({hidden_word});
  }

  render() {
    console.log("New State");
    console.log(this.state.hidden_word);
    return(
      <div className="Index">
            <Request refHiddenWord = {this.changeHiddenWord} {...this.state} />
            <ImgList />
            <Canvas {...this.state} />
      </div>
    );
  }

}

export default Index;
