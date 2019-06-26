import React, { Component } from "react";
import { Row, Col, CardPanel } from "react-materialize";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      image: "",
      count_once: 0
    };
  }

  calcHeight = (w2, h2) => {
    const w1 = 640;
    return (h2 * w1) / w2;
  };

  createParagraph = (ctx, text, pos_x, pos_y) => {
    const words = text.split(" ");
    const leading = 5; // Space between letters
    const spacing = 25; // Space between lines
    let word_width = 0;

    let temp_width = pos_x; // Start Position X
    let temp_height = pos_y; // Start Position Y

    for (let i = 0; i <= words.length; i++) {
      word_width = ctx.measureText(words[i]).width;
      console.log("Word width:" + word_width);
      ctx.fillText(words[i], temp_width, temp_height);
      temp_width = temp_width + word_width + leading;

      if (temp_width > 500) {
        console.log("maior de 600");
        temp_height = temp_height + spacing;
        temp_width = pos_x;
      }
    }
  };

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;

    img.onload = () => {
      const width = this.props.image.width;
      const height = this.props.image.height;
      console.log("width:" + width);
      console.log("height:" + height);
      let new_height = this.calcHeight(width, height);
      ctx.drawImage(img, 0, 0, 640, new_height);
      ctx.font = "20px Arial";
      ctx.fillStyle = "#FFFFFF";
      this.createParagraph(ctx, this.props.hidden_word, 55, 155);
    };
  }

  render() {
    const image = this.props.image;
    console.log(image);
    let width = 0;
    let height = 0;

    if (this.props.image !== undefined) {
      width = this.props.image.width;
      height = this.props.image.height;
    }

    return (
      <div>
        <canvas
          ref="canvas"
          width={640}
          height={this.props.image ? this.calcHeight(width, height) : height}
          id="canvas"
        />
        <img
          ref="image"
          src={this.props.image && this.props.image.urls.regular}
          className="hidden"
        />
      </div>
    );
  }
}

export default Canvas;

/*
<div className="canvas z-depth-4" style={{backgroundImage: `url(${this.state.image})`}}>
Este é o Canvas
{ this.props.hidden_word }
</div>
*/
