import React, { Component } from "react";

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
    this.state = {
      image: "",
      count_once: 0,
      font_size: 23,
      pos_y: 0,
      pos_x: 0
    };
  }

  calcHeight = (w2, h2) => {
    const w1 = 640;
    return (h2 * w1) / w2;
  };

  createParagraph = (ctx, text, pos_x, pos_y, font_size) => {
    let words = text.split(" ");
    const leading = 5; // Space between letters
    const spacing = 25 * (font_size * 0.05); // Space between lines
    let word_width = 0.0;

    let temp_width = pos_x; // Start Position X
    let temp_height = pos_y; // Start Position Y

    for (let i = 0; i <= words.length; i++) {
      if (typeof words[i] !== "undefined") {
        word_width = ctx.measureText(words[i]).width;

        //console.log(">>>>>" + word_width);
        //console.log(words[i]);

        ctx.fillText(words[i], temp_width, temp_height);
        //console.log("Before:" + temp_width);
        temp_width = temp_width + word_width + leading;
        //console.log("After:" + temp_width);
        if (temp_width > 500) {
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
    const width = this.props.image.width;
    const height = this.props.image.height;
    let new_height = this.calcHeight(width, height);
    //ctx.drawImage(img, 0, 0, 640, new_height);
    if (height > width) {
      ctx.drawImage(img, 0, 400, new_height / 2, 480, 0, 0, 640, 480);
    } else {
      ctx.drawImage(img, 0, 0, 640, new_height);
    }

    ctx.font = `${font_size}px Arial`;
    ctx.fillStyle = "#FFFFFF";

    this.createParagraph(ctx, this.props.hidden_word, pos_x, pos_y, font_size);
  };

  componentDidMount() {
    const img = this.refs.image;
    img.onload = () => {
      this.loadCanvas(this.state.font_size, this.state.pos_x, this.state.pos_y);
    };
  }

  handleChangePosX = event => {
    const pos_x = parseInt(event.currentTarget.value);
    this.loadCanvas(this.state.font_size, pos_x, this.state.pos_y);
    this.setState({ pos_x: pos_x });
  };

  handleChangePosY = event => {
    const pos_y = parseInt(event.currentTarget.value);
    this.loadCanvas(this.state.font_size, this.state.pos_x, pos_y);
    this.setState({ pos_y: pos_y });
  };

  handleChange = event => {
    const font_size = parseInt(event.currentTarget.value);
    if (font_size >= 11 && font_size <= 40) {
      this.loadCanvas(font_size, this.state.pos_x, this.state.pos_y);
      this.setState({ font_size: font_size });
    }
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
        <div className="settings">
          <h4 className="text-center">Configurações</h4>
          <div className="row mx-auto">
            <div className="col">
              <div className="form-group">
                <label>
                  Tamanho:
                  <input
                    type="number"
                    min="11"
                    max="40"
                    className="form-control"
                    name="font-size"
                    pattern="[0-9]*"
                    defaultValue={this.state.font_size}
                    onChange={e => this.handleChange(e)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Pos X:
                  <input
                    type="number"
                    min="0"
                    max="200"
                    className="form-control"
                    name="pos-x"
                    pattern="[0-9]*"
                    defaultValue={this.state.pos_x}
                    onChange={e => this.handleChangePosX(e)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Pos Y:
                  <input
                    type="number"
                    min="0"
                    max="200"
                    className="form-control"
                    name="pos-y"
                    pattern="[0-9]*"
                    defaultValue={this.state.pos_x}
                    onChange={e => this.handleChangePosY(e)}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="canvas">
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
