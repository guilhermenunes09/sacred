import React, { Component } from "react";
import Unsplash from "../../api/unsplash";

class ImageOptions extends Component {
  constructor(props) {
    super(props);
  }

  changeImage = e => {
    console.log("Change Image");
    this.props.refSetKeyWord(e.currentTarget.value);
    this.props.refChangeMenu("option_imgs");
  };

  render() {
    return (
      <div className="image-options">
        <div className="row mx-auto">
          <div className="col">
            <div className="form-group">
              <label>
                Busca Imagem:
                <input
                  type="text"
                  className="form-control"
                  name="image-search"
                  onChange={e => this.changeImage(e)}
                />
              </label>
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
