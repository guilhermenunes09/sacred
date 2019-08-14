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

  paragraph_style_1 = (ctx) => {
    const font_size = this.props.settings.font_size;
    const font_color = this.props.settings.font_color;
    const pos_x = this.props.settings.pos_x;
    const pos_y = this.props.settings.pos_y;
    const square_width = this.props.settings.square_width;
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
      square_width = this.props.settings.square_width;
    }

    ctx.font = `${font_size}px ${font_name}`;
    ctx.fillStyle = font_color;

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
    ctx.fillText(author, square_width - author_width + pos_x, line_height + 10);

    const text_attributes = {
      square_height: square_height
    };
    /* Debugging for Square Width */
    //◘ctx.rect(pos_x - 10, pos_y - 30, square_width, square_height + 30);
    //ctx.stroke();
    if (this.props.settings.square_height !== parseInt(square_height)) {
      this.props.refSetSquareHeight(parseInt(square_height));
    }
  }

  paragraph_style_2 = (ctx) => {
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

    const leading = 0; // Space between letters
    const spacing = 35 * (font_size * 0.05); // Space between lines
    let line_height = pos_y; // Start Position Y
    let line = "";
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;
    if (typeof square_width === "undefined") {
      square_width = this.props.settings.square_width;
    }

    ctx.font = `${font_size}px ${font_name}`;
    ctx.fillStyle = "black";

    /* Debugging for Square Width */


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
          ctx.save();
          ctx.beginPath();
          console.log("line_height:" + line_height);
          ctx.rect(pos_x - 10, line_height - spacing + 10 + font_size * 0.4, line_width + 10, font_size * 1.3);
          ctx.fillStyle = "white";
          ctx.fill();

          ctx.globalCompositeOperation = 'source-over';

          ctx.fillStyle = "black";
          ctx.fillText(line, pos_x, line_height);

          ctx.restore();

          line = "";
          line_width = 0;
          line_height += spacing;
          square_height += spacing;

        }
      }
    }

    ctx.font = `${font_size + 15}px ${font_name}`;
    author_width = ctx.measureText(author).width;

    let author_width = ctx.measureText(author).width;

    ctx.save();
    ctx.beginPath();

    ctx.rect(width / 2 - author_width + 65, height - 30 - spacing + font_size * 0.4, author_width + 20, font_size * 1.3 + 20);
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
    console.log("Height" + height);
    ctx.fillStyle = "black";
    ctx.fillText(author, width / 2 - author_width + 75, height - 20);

    const text_attributes = {
      square_height: square_height
    };

    if (this.props.settings.square_height !== parseInt(square_height)) {
      this.props.refSetSquareHeight(parseInt(square_height));
    }
  }

  createParagraph = (ctx) => {
    const text_style = this.props.settings.text_style;
    console.log("Create Text Style");
    console.log(text_style);
    if (text_style === "1") {
      this.paragraph_style_1(ctx);
    } else {
      this.paragraph_style_2(ctx);
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
    ctx.drawImage(img, 0, 0, width, height);
    imageObj1.onload = () => {
      console.log("loaded");
      ctx.drawImage(img, 0, 0, width, height);
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

    if (this.props.image !== undefined) {
      width = this.props.image.width;
      height = this.props.image.height;
    }

    return (
      <div>
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
          className="hidden"
          crossorigin="anonymous"
        />
      </div>
    );
  }
}

export default Canvas;
