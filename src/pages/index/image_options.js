import React, { Component } from "react";
import Unsplash from "../../api/unsplash";

class ImageOptions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image-options">
        <div className="row mx-auto">
          <div className="col">
            <div className="form-group">

            </div>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col">Compartilhar no Facebook</div>
        </div>
      </div>
    );
  }
}

export default ImageOptions;
