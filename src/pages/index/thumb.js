import React, { Component } from 'react';
import { Row, Col, Card, CardTitle} from 'react-materialize';

class Thumb extends Component {
  render() {
    return (
      <React.Fragment>

          <Col m={1} s={1}>
            <div className="card card-custom">
              Imagem
            </div>
          </Col>

      </React.Fragment>
    );
  }
}

export default Thumb;
