import React, { Component } from "react";
import Settings from "./settings.js";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
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
      count_once: 0
    };
  }

  stripHtml = (unsafe) => {
    return unsafe.replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");
  }

  createParagraph = (ctx) => {

    const font_size = this.state.settings.font_size;
    const pos_x = this.state.settings.pos_x;
    const pos_y = this.state.settings.pos_y;
    const square_width = this.state.settings.square_width;

    let text = this.stripHtml(this.props.quote);
    let author = this.props.author;
    let font_name = this.props.font_name;
    let words = text.split(" ");
    const leading = 0; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines

    let line_height = pos_y; // Start Position Y
    let line = "";
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;
    if (typeof square_width === "undefined") {
      square_width = this.state.settings.square_width;
    }

    for (let i = 0; i <= words.length; i++) {
      if (typeof words[i] !== "undefined") {
        line = line + words[i] + " ";
        word_width = ctx.measureText(words[i]).width;
        next_word_width = parseFloat(ctx.measureText(words[i + 1]).width);
        line_width = parseFloat(ctx.measureText(line).width);

        if (
          line_width + next_word_width >= square_width ||
          i === words.length - 1
        ) {
          ctx.fillText(line, pos_x, line_height);
          line = "";
          line_width = 0;
          line_height += spacing;
          square_height += spacing;
        }
      }
    }

    ctx.font = `${font_size - 3}px ${font_name}`;
    let author_width = ctx.measureText(author).width;
    ctx.fillText(author, square_width - author_width, line_height + 10);

    const text_attributes = {
      square_height: square_height
    };
    /* Debugging for Square Width */
    //ctx.rect(pos_x - 10, pos_y - 30, square_width, square_height + 30);
    //ctx.stroke();
    return square_height;
  };

  loadCanvas = () => {

    const font_size = this.state.settings.font_size;
    const font_color = this.state.settings.font_color;
    const pos_x = this.state.settings.pos_x;
    const pos_y = this.state.settings.pos_y;
    const square_width = this.state.settings.square_width;
    const font_name = this.props.font_name;
    const img = this.refs.image;
    const imageObj1 = new Image();
    imageObj1.src = this.props.image.urls.regular
    console.log("OBJECT");
    console.log(this.props.image.urls.regular);

    console.log("******** Load Canvas ***********");
    console.log("img: ");
    console.log(this.props.image);
    console.log("font size: " + font_size);
    console.log("font color: " + font_color);
    console.log("pos x: " + pos_x);
    console.log("pos y: " + pos_y);
    console.log("square width: " + square_width);
    console.log("font name: " + font_name);
    // console.log("*******************");

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = `${font_size}px ${font_name}`;
    ctx.fillStyle = font_color;

    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;
    imageObj1.onload = () => {
      console.log("loaded");
      ctx.drawImage(imageObj1, 0, 0, width, height);
      if (this.props.quote !== undefined) {
        this.createParagraph(ctx);
      }
    }


  };

  componentDidUpdate(prevProps, prevState) {

    if (prevProps !== this.props) {

      // const width = this.props.image.width / this.state.factor;
      // const height = this.props.image.height / this.state.factor;
      // const square_width = width - 100;
      // let settings = this.state.settings;
      // settings.square_width = square_width;

      if (this.props.image) {
        this.loadCanvas();
      }

    }



  }

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
      parseInt(this.props.image.width) / parseInt(this.state.factor);
    const square_width = parseInt(this.state.settings.square_width);
    settings.pos_y = 50;
    let pos_x = width - square_width - 20;
    settings.pos_x = pos_x;
    this.setState({ settings });
  };

  calcPosY = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    const img = this.refs.image;
    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;

    ctx.drawImage(img, 0, 0, width, height);

    ctx.font = `${this.state.settings.font_size}px Arial`;
    ctx.fillStyle = "#FFFFFF";

    if (this.props.quote !== undefined) {
      const text_attributes = this.createParagraph(ctx);
      return height - text_attributes - 30;
    }
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
      parseInt(this.props.image.width) / parseInt(this.state.factor);
    const square_width = parseInt(this.state.settings.square_width);
    settings.pos_x = width - square_width - 20;
    this.setState({ settings });
  };

  render() {
    const image = this.props.image;
    let width = 0;
    let height = 0;

    if (this.props.image !== undefined) {
      width = this.props.image.width;
      height = this.props.image.height;
    }

    return (
      <div>
        <Settings
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

        <canvas
          className="canvas"
          ref="canvas"
          width={width / this.state.factor}
          height={height / this.state.factor}
          id="canvas"
        />

        <img
          ref="image"
          src={this.props.image && this.props.image.urls.regular}
          width={300}
          className=""
        />
      </div>
    );
  }
}

export default Canvas;
