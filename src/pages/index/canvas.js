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
        is_bottom: true
      },
      factor: 5,
      count_once: 0
    };
  }

  createParagraph = (ctx, pos_x, pos_y, font_size) => {
    let text = this.props.quote;
    let words = text.split(" ");
    const leading = 0; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines

    let line_height = pos_y; // Start Position Y
    let line = "";
    const square_width = parseInt(this.state.settings.square_width);
    let line_width = 0;
    let square_height = 1;
    let next_word_width = "";
    let word_width = 0.0;

    for (let i = 0; i <= words.length; i++) {
      if (typeof words[i] !== "undefined") {
        line = line + words[i] + " ";
        word_width = ctx.measureText(words[i]).width;
        next_word_width = parseFloat(ctx.measureText(words[i + 1]).width);
        line_width =
          parseFloat(
            line_width + ctx.measureText(line).width + next_word_width
          ) *
          (font_size * 0.03);
        if (line_width >= square_width || i === words.length - 1) {
          ctx.fillText(line, pos_x, line_height);
          line = "";
          line_width = 0;
          line_height += spacing;
          square_height += spacing;
        }
      }
    }
    const text_attributes = {
      square_height: square_height
    };
    ctx.rect(pos_x - 10, pos_y - 30, square_width, square_height + 30);
    ctx.stroke();
    return square_height;
  };

  loadCanvas = (font_size, pos_x, pos_y) => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    const img = this.refs.image;
    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;
    ctx.drawImage(img, 0, 0, width, height);

    ctx.font = `${font_size}px Arial`;
    ctx.fillStyle = "#FFFFFF";

    if (this.props.quote !== undefined) {
      this.createParagraph(ctx, pos_x, pos_y, font_size);
    }
  };

  componentDidUpdate(props, prevProps) {
    if (props !== prevProps) {
      this.loadCanvas(
        this.state.settings.font_size,
        this.state.settings.pos_x,
        this.state.settings.pos_y
      );
    }
  }

  componentDidMount() {
    const img = this.refs.image;
    img.onload = () => {
      this.loadCanvas(
        this.state.settings.font_size,
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

  refSetFontSize = font_size => {
    let settings = this.state.settings;
    settings.font_size = font_size;
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

    while (parseInt(pos_x) + parseInt(square_width) > width) {
      pos_x -= 15;
    }
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
      const text_attributes = this.createParagraph(
        ctx,
        55,
        55,
        this.state.settings.font_size
      );
      console.log("Text Attributes:");
      console.log(text_attributes);
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
        <ImageOptions refSetKeyWord={this.props.refSetKeyWord} />
        <Settings
          loadCanvas={this.loadCanvas}
          fontSize={this.state.settings.font_size}
          quote={this.state.quote}
          posX={this.state.settings.pos_x}
          posY={this.state.settings.pos_y}
          refSetPosX={this.refSetPosX}
          refSetPosY={this.refSetPosY}
          refSetFontSize={this.refSetFontSize}
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
