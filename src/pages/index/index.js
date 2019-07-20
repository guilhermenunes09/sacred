import React, { Component } from "react";
import "../../App.css";
import Request from "../../api/request.js";
import Unsplash from "../../api/unsplash.js";
import ImgList from "./img_list.js";
import OptionQuote from "./option_quote.js";
import OptionFont from './option_font.js';
import Canvas from "./canvas.js";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Default Quote",
      author: "Bahá'u'lláh",
      font_name: 'Arial',
      images: [],
      image: "",
      option_imgs: false,
      option_quote: true,
      option_font: false,
      key_word: "environment",
      actual_page: 1
    };
  }

  componentDidMount() {

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

  changeAuthor = author => {
    this.setState({ author });
  };

  changeFont = font_name => {
    this.setState({ font_name });
  }

  goToImageOption = () => {
    this.setState({ option_imgs: true });
    this.setState({ option_font: false });
    this.setState({ option_quote: false });
  };

  goToQuoteOption = () => {
    this.setState({ option_imgs: false });
    this.setState({ option_font: false });
    this.setState({ option_quote: true });
  };

  goToFontOption = () => {
    this.setState({ option_imgs: false });
    this.setState({ option_quote: false });
    this.setState({ option_font: true });
  };

  refSetKeyWord = key_word => {
    console.log("Change Image");
    this.setState({ key_word });
  };

  refChangeActualPage = delta => {
    console.log("Delta");
    if (this.state.actual_page + delta >= 1) {
      this.setState({ actual_page: this.state.actual_page + delta });
    }
  };

  refChangeMenu = menu => {
    console.log("change Menu");
    if (menu === "option_imgs") {
      this.setState({ option_imgs: true });
      this.setState({ option_quote: false });
    }
  };

  render() {
    return (
      <div className="Index">
        <Request refQuote={this.changeQuote} {...this.state} />
        <Unsplash
          actual_page={this.state.actual_page}
          key_word={this.state.key_word}
          refImages={this.refImages}
        />

        <div className="d-flex justify-content-center ">
          <Canvas
            refChangeMenu={this.refChangeMenu}
            refSetKeyWord={this.refSetKeyWord}
            {...this.state}
          />
        </div>

        <footer className="footer">
          {this.state.option_imgs && (
            <ImgList
              refChangeActualPage={this.refChangeActualPage}
              refThumbClick={this.refThumbClick}
              {...this.state}
            />
          )}
          {this.state.option_quote && (
            <OptionQuote
              refChangeText={this.changeText}
              refChangeAuthor={this.changeAuthor}
              quote={this.state.quote}
            />
          )}
          {this.state.option_font && (
            <OptionFont
              refChangeFont={this.changeFont}
            />
          )}
        </footer>

        <div className="footer2 p-2">
          <span onClick={this.goToQuoteOption}>Citação</span> |{" "}
          <span onClick={this.goToImageOption}>Imagem</span> |{" "}
          <span onClick={this.goToFontOption}>Fonte</span>
        </div>
      </div>
    );
  }
}

export default Index;
