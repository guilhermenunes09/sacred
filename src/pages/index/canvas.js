import React, { Component } from "react";
import { paragraph_style_1, paragraph_style_2, paragraph_style_3 } from "./option_font/paragraph_style.js";

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
        square_width: 200,
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
    const text_style = this.props.settings.text_style;

    const font_size = this.props.settings.font_size;
    const font_color = this.props.settings.font_color;
    const pos_x = this.props.settings.pos_x;
    const pos_y = this.props.settings.pos_y;
    const square_width = this.props.settings.square_width;
    let text = this.stripHtml(this.props.quote);
    let author = this.props.author;
    let font_name = this.props.font_name;
    let words = text.split(" ");
    const height = parseInt(this.props.image.height) / parseInt(this.props.factor);
    const width = parseInt(this.props.image.width) / parseInt(this.props.factor);

    const settings = {
      font_size,
      font_color,
      pos_x,
      pos_y,
      square_width,
      text,
      author,
      font_name,
      words,
      height,
      width
    }

    let new_square_height = settings.square_height;
    if (text_style === "1") {
      new_square_height = paragraph_style_1(settings, ctx);
    } else if (text_style === "2") {
      new_square_height = paragraph_style_2(settings, ctx);
    } else if (text_style === "3") {
      new_square_height = paragraph_style_3(settings, ctx);
    }

    if (this.props.settings.square_height !== new_square_height) {
      this.props.refSetSquareHeight(new_square_height);
    }
  };

  loadCanvas = () => {
    const font_size = this.props.settings.font_size;

    const pos_x = this.props.settings.pos_x;
    const pos_y = this.props.settings.pos_y;
    const square_width = this.props.settings.square_width;
    const font_name = this.props.font_name;
    const imageObj1 = new Image();
    imageObj1.src = this.props.image.urls.regular

    // console.log("OBJECT");
    // console.log(this.props.image.urls.regular);
    // console.log("******** Load Canvas ***********");
    // console.log("img: ");
    // console.log(this.props.image);
    // console.log("font size: " + font_size);
    // console.log("font color: " + font_color);
    // console.log("pos x: " + pos_x);
    // console.log("pos y: " + pos_y);
    // console.log("square width: " + square_width);
    // console.log("font name: " + font_name);

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const img = this.refs.image;
    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;

    const width2 = 500;
    let height2 = null;

    if (height > width) {

      height2 = height * width2 / width;
    } else {
      height2 = width2 * height / width;
    }

    this.new_width = width2;
    this.new_height = height2;
    console.log("New Width: " + width2);
    console.log("Width: " + width);
    console.log("New Height: " + height2);
    console.log("Height: " + height);

    ctx.drawImage(img, 0, 0, width2, height2);
    imageObj1.onload = () => {
      ctx.drawImage(img, 0, 0, width2, height2);
      if (this.props.quote !== undefined) {
        this.createParagraph(ctx);
      }
    }


  };

  componentDidUpdate(prevProps, prevState) {

    if ((prevProps !== this.props) || (prevState !== this.state)) {
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

  render() {
    const image = this.props.image;
    let width = 0;
    let height = 0;
    console.log(this.new_width);
    console.log(this.new_height);

    if (this.props.image !== undefined) {
      width = this.props.image.width;
      height = this.props.image.height;
    }

    return (
      <div>
        <canvas
          className="canvas"
          ref="canvas"
          width={500}
          height={750}
          id="canvas"
        />

        <img
          ref="image"
          src={this.props.image && this.props.image.urls.regular}
          width={300}
          className="hidden"
          crossorigin="anonymous"
        />
      </div>
    );
  }
}

export default Canvas;
