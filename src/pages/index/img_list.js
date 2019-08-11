import React, { Component } from "react";
import Thumb from "./thumb.js";

class ImgList extends Component {
  constructor(props) {
    super(props);
    this.refThumbClick = this.refThumbClick.bind(this);
  }

  componentDidMount() { }

  refThumbClick(image) {
    this.props.refThumbClick(image);
  }

  changeActualPage = delta => {
    this.props.refChangeActualPage(delta);
  };

  changeImage = e => {
    const image_key_word = this.refs.input_image.value;
    this.props.refSetKeyWord(image_key_word);
    this.props.refChangeMenu("option_imgs");
  };

  render() {
    return (
      <React.Fragment>

        <div className="input-group mb-3">
          <input
            type="text"
            ref="input_image"
            className="form-control"
            name="image-search"
            defaultValue={this.props.key_word || ""}
            placeholder={this.props.key_word || "Buscar Imagem"}
          />
          <div className="input-group-append">
            <button class="btn btn-outline-secondary" type="button" onClick={e => this.changeImage(e)}>Ok</button>
          </div>
        </div>

        <div className="d-flex flex-row mx-auto">
          <i
            onClick={e => this.changeActualPage(-1)}
            className="material-icons align-self-center p-2 arrow"
          >
            arrow_back_ios
          </i>
          {this.props.images.map((name, index) => {
            return (
              <div className="p-2 mx-auto" key={index}>
                <Thumb
                  key={index}
                  className="thumb"
                  onClick={() => this.refThumbClick(name)}
                  image_url={name.urls.thumb}
                />
              </div>
            );
          })}
          <i
            onClick={e => this.changeActualPage(1)}
            class="material-icons align-self-center p-2 arrow"
          >
            arrow_forward_ios
          </i>
        </div>
      </React.Fragment>
    );
  }
}

export default ImgList;
