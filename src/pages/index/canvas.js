import React, { Component } from 'react';
import { Row, Col, CardPanel} from 'react-materialize';

class Canvas extends Component {
  render() {
    return (
      <div className="canvas-wrapper center">

            <div className="canvas z-depth-4">
              Este é o Canvas
              { this.props.hidden_word }
            </div>

      </div>
    );
  }
}

export default Canvas;
