import React, { Component } from "react";
import Settings from "./settings.js";
import ImageOptions from "./image_options.js";

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

  createParagraph = (ctx, pos_x, pos_y, font_size, square_width) => {
    let text = this.props.quote;
    let author = this.props.author;
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

    ctx.font = `${font_size - 3}px Crimson Text`;
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

  loadCanvas = (font_size, font_color, pos_x, pos_y, square_width) => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const img = this.refs.image;
    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;
    ctx.drawImage(img, 0, 0, width, height);

    ctx.font = `${font_size}px Crimson Text`;
    ctx.fillStyle = font_color;

    if (this.props.quote !== undefined) {
      this.createParagraph(ctx, pos_x, pos_y, font_size, square_width);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.loadCanvas(
        this.state.settings.font_size,
        this.state.settings.font_color,
        this.state.settings.pos_x,
        this.state.settings.pos_y
      );
    }

    if (this.props.image !== prevProps.image) {
      this.refSetTopLeft();
      const width = this.props.image.width / this.state.factor;
      const height = this.props.image.height / this.state.factor;
      const square_width = width - 100;
      let settings = this.state.settings;
      settings.square_width = square_width;
      this.setState({ settings });
    }
  }

  componentDidMount() {
    const img = this.refs.image;
    img.onload = () => {
      this.loadCanvas(
        this.state.settings.font_size,
        this.state.settings.font_color,
        this.state.settings.pos_x,
        this.state.settings.pos_y
      );
    };
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
    this.loadCanvas(
      this.state.settings.font_size,
      this.state.settings.font_color,
      settings.pos_x,
      settings.pos_y
    );
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
    this.loadCanvas(
      this.state.settings.font_size,
      this.state.settings.font_color,
      settings.pos_x,
      settings.pos_y
    );

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
      const text_attributes = this.createParagraph(
        ctx,
        55,
        55,
        this.state.settings.font_size
      );

      return height - text_attributes - 30;
    }
  };

  refSetBottomLeft = () => {
    let settings = this.state.settings;
    settings.pos_x = 50;
    const pos_y = this.calcPosY();
    settings.pos_y = pos_y;

    this.loadCanvas(
      this.state.settings.font_size,
      this.state.settings.font_color,
      settings.pos_x,
      settings.pos_y
    );
    this.setState({ settings });
  };

  refSetBottomRight = () => {
    console.log("Bottom Right");
    let settings = this.state.settings;
    const pos_y = this.calcPosY();
    settings.pos_y = pos_y;

    const width =
      parseInt(this.props.image.width) / parseInt(this.state.factor);
    const square_width = parseInt(this.state.settings.square_width);

    settings.pos_x = width - square_width - 20;

    this.loadCanvas(
      this.state.settings.font_size,
      this.state.settings.font_color,
      settings.pos_x,
      settings.pos_y
    );
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
        <ImageOptions
          refChangeMenu={this.props.refChangeMenu}
          refSetKeyWord={this.props.refSetKeyWord}
        />
        <Settings
          loadCanvas={this.loadCanvas}
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
          className="hidden"
        />
      </div>
    );
  }
}

export default Canvas;
