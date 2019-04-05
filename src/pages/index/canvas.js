import React, { Component } from 'react';
import { Row, Col, CardPanel} from 'react-materialize';

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      image: '',
      count_once: 0,
    }
  }

  render() {

    const image = this.props.image;

    console.log("canvas");
    if(typeof image.results !== "undefined" && this.state.count_once === 0) {
      if(image.results.length > 0) {
        this.setState({image: image.results[0].urls.small})
        this.setState({count_once: 1});
      }
    }


    return (
      <div className="canvas-wrapper center">
            <div className="canvas z-depth-4" style={{backgroundImage: `url(${this.state.image})`}}>
              Este é o Canvas
              { this.props.hidden_word }
            </div>

      </div>
    );
  }
}

export default Canvas;
