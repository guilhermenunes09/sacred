import React, { Component } from "react";
import "../../App.css";
import Request from "../../api/request.js";
import Unsplash from "../../api/unsplash.js";
import ImgList from "./img_list.js";
import OptionQuote from "./option_quote.js";
import Canvas from "./canvas.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Default",
      images: [],
      image: "",
      option_imgs: false,
      option_quote: true
    };
  }

  changeQuote = quote => {
    this.setState({ quote });
  };

  refImages = images => {
    this.setState({ images });
  };

  refThumbClick = image => {
    console.log("Image props");
    console.log(image);
    this.setState({ image });
  };

  changeText = text => {
    this.setState({ quote: text });
  };

  goToImageOption = () => {
    this.setState({ option_imgs: true });
    this.setState({ option_quote: false });
  };

  goToQuoteOption = () => {
    this.setState({ option_imgs: false });
    this.setState({ option_quote: true });
  };

  render() {
    return (
      <div className="Index">
        <Request refQuote={this.changeQuote} {...this.state} />
        <Unsplash refImages={this.refImages} />

        <div className="d-flex justify-content-center ">
          <Canvas {...this.state} />
        </div>

        <footer className="footer">
          {this.state.option_imgs && (
            <ImgList refThumbClick={this.refThumbClick} {...this.state} />
          )}
          {this.state.option_quote && (
            <OptionQuote
              refChangeText={this.changeText}
              quote={this.state.quote}
            />
          )}
        </footer>

        <div className="footer2 p-2">
          <span onClick={this.goToQuoteOption}>Citação</span> |{" "}
          <span onClick={this.goToImageOption}>Imagem</span> | Estilos
        </div>
      </div>
    );
  }
}

export default Index;
