import React, { Component } from 'react';
import { Row, Col, CardPanel} from 'react-materialize';
import Thumb from './thumb.js';

class ImgList extends Component {
  render() {
    console.log();
    return (
      <React.Fragment>
            <CardPanel className="teal card-panel-custom">
                  <Thumb />
                  <Thumb />
                  <Thumb />
                  <Thumb />
                  <Thumb />
                  <Thumb />
                  <Thumb />
            </CardPanel>

      </React.Fragment>
    );
  }
}

export default ImgList;
