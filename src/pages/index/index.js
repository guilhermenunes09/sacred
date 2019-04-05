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
      image:'',
    }
  }

  changeHiddenWord = (hidden_word) => {
    this.setState({hidden_word});
  }

  changeImage = (image) => {
    this.setState({image});
  }

  render() {
    console.log("New State");
    console.log(this.state.hidden_word);
    console.log("Image");
    console.log(this.state.image);
    return(
      <div className="Index">
            <Request refHiddenWord = {this.changeHiddenWord} {...this.state} />
            <Unsplash refImage={this.changeImage} />
            <ImgList {...this.state} />
            <Canvas {...this.state} />
      </div>
    );
  }

}

export default Index;
