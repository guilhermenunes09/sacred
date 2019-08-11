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
      quote: "",
      author: "Bahá'u'lláh",
      font_name: 'Oswald',
      images: [],
      image: "",
      settings: {
        font_size: 23,
        pos_y: 100,
        pos_x: 210,
        square_width: 400,
        square_height: 200,
        font_color: "#FFFFFF"
      },
      factor: 5,
      option_imgs: false,
      option_quote: true,
      option_font: false,
      key_word: "moon",
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
    /* Auto load first Image */
    const size = images.length;
    let random = Math.floor(Math.random() * (+size - 0)) + 0;
    this.setState({ image: images[random] });
  };

  refThumbClick = image => {
    this.refSetTopLeft();
    console.log(">> Ref Thumb Click");
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

  /* Option Font */
  refSetPosX = pos_x => {
    let settings = this.state.settings;
    settings.pos_x = pos_x;
    this.setState({ settings });
  };

  refSetPosY = pos_y => {
    let settings = this.state.settings;
    settings.pos_y = pos_y;
    this.setState({ settings });
  };

  refSetSquareWidth = square_width => {
    let settings = this.state.settings;
    settings.square_width = square_width;
    this.setState({ settings });
  };

  refSetSquareHeight = square_height => {
    console.log("****")
    let settings = this.state.settings;
    settings.square_height = square_height;
    this.setState({ settings });
    console.log(settings);
  }

  refSetFontSize = font_size => {
    let settings = this.state.settings;
    settings.font_size = font_size;
    this.setState({ settings });
  };

  refSetFontColor = font_color => {
    let settings = this.state.settings;
    settings.font_color = font_color;
    this.setState({ settings });
  };

  refSetTopLeft = () => {
    let settings = this.state.settings;
    settings.pos_y = 50;
    settings.pos_x = 50;
    this.setState({ settings });
  };

  refSetTopRight = () => {
    let settings = this.state.settings;
    const width =
      parseInt(this.state.image.width) / parseInt(this.state.factor);
    const square_width = parseInt(this.state.settings.square_width);
    settings.pos_y = 50;
    let pos_x = width - square_width - 20;
    settings.pos_x = pos_x;
    this.setState({ settings });
  };

  refSetBottomLeft = () => {
    let settings = this.state.settings;
    settings.pos_x = 50;
    const pos_y = this.calcPosY();
    settings.pos_y = pos_y;
    this.setState({ settings });
  };

  refSetBottomRight = () => {
    let settings = this.state.settings;
    const pos_y = this.calcPosY();
    settings.pos_y = pos_y;

    const width =
      parseInt(this.state.image.width) / parseInt(this.state.factor);
    const square_width = parseInt(this.state.settings.square_width);
    settings.pos_x = width - square_width - 20;
    this.setState({ settings });
  };

  calcPosY = () => {
    console.log("pos Y");
    const height =
      parseInt(this.state.image.height) / parseInt(this.state.factor);
    console.log(height);
    if (this.state.quote !== undefined) {
      return height - this.state.settings.square_height - 60;
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

        <div className="d-flex justify-content-center canvas-layout">
          <Canvas
            refSetSquareHeight={this.refSetSquareHeight}
            {...this.state}
          />
        </div>

        <footer className="footer">
          {this.state.option_imgs && (
            <ImgList
              refChangeActualPage={this.refChangeActualPage}
              refThumbClick={this.refThumbClick}
              refChangeMenu={this.refChangeMenu}
              refSetKeyWord={this.refSetKeyWord}
              {...this.state}
            />
          )}
          {this.state.option_quote && (
            <OptionQuote
              refChangeText={this.changeText}
              refChangeAuthor={this.changeAuthor}
              author={this.state.author}
              quote={this.state.quote}
            />
          )}
          {this.state.option_font && (
            <OptionFont
              refChangeFont={this.changeFont}
              fontSize={this.state.settings.font_size}
              fontColor={this.state.settings.font_color}
              quote={this.state.quote}
              posX={this.state.settings.pos_x}
              posY={this.state.settings.pos_y}
              squareWidth={this.state.settings.square_width}
              refSetPosX={this.refSetPosX}
              refSetPosY={this.refSetPosY}
              refSetSquareWidth={this.refSetSquareWidth}
              refSetFontSize={this.refSetFontSize}
              refSetFontColor={this.refSetFontColor}
              refSetTopLeft={this.refSetTopLeft}
              refSetTopRight={this.refSetTopRight}
              refSetBottomLeft={this.refSetBottomLeft}
              refSetBottomRight={this.refSetBottomRight}
            />
          )}
        </footer>

        <div className="footer2 p-2">
          <span className="btn btn-primary" onClick={this.goToQuoteOption}>Citação</span>{" "}
          <span className="btn btn-primary" onClick={this.goToImageOption}>Imagem</span>{" "}
          <span className="btn btn-primary" onClick={this.goToFontOption}>Fonte</span>
        </div>
      </div>
    );
  }
}

export default Index;
