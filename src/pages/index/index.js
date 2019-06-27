import React, { Component } from "react";
import "../../App.css";
import Request from "../../api/request.js";
import Unsplash from "../../api/unsplash.js";
import ImgList from "./img_list.js";
import Canvas from "./canvas.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden_word: "Default",
      images: [],
      image: ""
    };
  }

  changeHiddenWord = hidden_word => {
    this.setState({ hidden_word });
  };

  refImages = images => {
    this.setState({ images });
  };

  refThumbClick = image => {
    console.log("Image props");
    console.log(image);
    this.setState({ image });
  };

  render() {
    return (
      <div className="Index">
        <Request refHiddenWord={this.changeHiddenWord} {...this.state} />
        <Unsplash refImages={this.refImages} />

        <div className="d-flex justify-content-center ">
          <Canvas {...this.state} />
        </div>

        <footer className="footer">
          <ImgList refThumbClick={this.refThumbClick} {...this.state} />
        </footer>
        <div className="footer2 p-2">Citação | Imagem | Estilos</div>
      </div>
    );
  }
}

export default Index;
