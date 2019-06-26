import React, { Component } from "react";
import { Row, Col, CardPanel } from "react-materialize";
import Thumb from "./thumb.js";

class ImgList extends Component {
  constructor(props) {
    super(props);
    this.refThumbClick = this.refThumbClick.bind(this);
  }
  refThumbClick(image) {
    console.log("Event Clicked" + image);
    this.props.refThumbClick(image);
  }

  render() {
    return (
      <React.Fragment>
        <CardPanel className="teal card-panel-custom">
          {this.props.images.map((name, index) => {
            return (
              <Thumb
                key={index}
                onClick={() => this.refThumbClick(name)}
                image_url={name.urls.thumb}
              />
            );
          })}
        </CardPanel>
      </React.Fragment>
    );
  }
}

export default ImgList;
