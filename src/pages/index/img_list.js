import React, { Component } from "react";
import Thumb from "./thumb.js";

class ImgList extends Component {
  constructor(props) {
    super(props);
    this.refThumbClick = this.refThumbClick.bind(this);
  }

  componentDidMount() {}

  refThumbClick(image) {
    console.log("Event Clicked" + image);
    this.props.refThumbClick(image);
  }

  render() {
    return (
      <React.Fragment>
        <div className="d-flex flex-row mx-auto">
          <i class="material-icons align-self-center p-2">arrow_back_ios</i>
          {this.props.images.map((name, index) => {
            return (
              <div className="p-2 mx-auto" key={index}>
                <Thumb
                  key={index}
                  onClick={() => this.refThumbClick(name)}
                  image_url={name.urls.thumb}
                />
              </div>
            );
          })}
          <i class="material-icons align-self-center p-2">arrow_forward_ios</i>
        </div>
      </React.Fragment>
    );
  }
}

export default ImgList;
