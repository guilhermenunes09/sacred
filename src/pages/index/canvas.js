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
        pos_y: 55,
        pos_x: 55
      },
      factor: 5,
      count_once: 0
    };
  }

  calcHeight = (w2, h2) => {
    const w1 = 640;
    return (h2 * w1) / w2;
  };

  createParagraph = (ctx, pos_x, pos_y, font_size) => {
    let text = this.props.quote;
    let words = text.split(" ");
    const leading = 5; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines
    let word_width = 0.0;

    let temp_width = pos_x; // Start Position X
    let temp_height = pos_y; // Start Position Y

    for (let i = 0; i <= words.length; i++) {
      if (typeof words[i] !== "undefined") {
        word_width = ctx.measureText(words[i]).width;
        ctx.fillText(words[i], temp_width, temp_height);
        temp_width = temp_width + word_width + leading;
        if (temp_width > pos_x + 400) {
          word_width = 0;

          temp_height = temp_height + spacing;
          temp_width = pos_x;
        }
      }
    }
  };

  loadCanvas = (font_size, pos_x, pos_y) => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    const width = this.props.image.width / this.state.factor;
    const height = this.props.image.height / this.state.factor;
    ctx.drawImage(img, 0, 0, width, height);

    ctx.font = `${font_size}px Arial`;
    ctx.fillStyle = "#FFFFFF";
    console.log("***************" + this.props.quote);
    if (this.props.quote !== undefined) {
      console.log("<<<<<<<<<<Text");
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
          loadCanvas={this.loadCanvas}
          fontSize={this.state.settings.font_size}
          quote={this.state.quote}
          posX={this.state.settings.pos_x}
          posY={this.state.settings.pos_y}
          refSetPosX={this.refSetPosX}
          refSetPosY={this.refSetPosY}
          refSetFontSize={this.refSetFontSize}
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
