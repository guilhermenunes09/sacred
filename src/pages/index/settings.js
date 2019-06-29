import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  changeFontSize = event => {
    const font_size = parseInt(event.currentTarget.value);
    if (font_size >= 11 && font_size <= 40) {
      this.props.loadCanvas(font_size, this.props.posX, this.props.posY);
      this.props.refSetFontSize(font_size);
    }
  };

  handleChangePosX = event => {
    const pos_x = parseInt(event.currentTarget.value);
    this.props.loadCanvas(this.props.fontSize, pos_x, this.props.posY);
    this.props.refSetPosX(pos_x);
  };

  handleChangePosY = event => {
    const pos_y = parseInt(event.currentTarget.value);
    this.props.loadCanvas(this.props.fontSize, this.props.posX, pos_y);
    this.props.refSetPosY(pos_y);
  };

  topLeftText = event => {
    this.props.refSetTopLeft();
  };

  topRightText = event => {
    this.props.refSetTopRight();
  };

  render() {
    return (
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
                  defaultValue={this.props.fontSize}
                  onChange={e => this.changeFontSize(e)}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Pos X:
                <input
                  type="number"
                  min="0"
                  max="1000"
                  className="form-control"
                  name="pos-x"
                  pattern="[0-9]*"
                  value={this.props.posX}
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
                  max="1000"
                  className="form-control"
                  name="pos-y"
                  pattern="[0-9]*"
                  value={this.props.posY}
                  onChange={e => this.handleChangePosY(e)}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="row mx-auto">
          <div className="col">
            Posição:
            <div className="d-flex d-inline">
              <div onClick={e => this.topLeftText(e)} className="box" />
              <div onClick={e => this.topRightText(e)} className="box" />
            </div>
            <div className="d-flex d-inline">
              <div className="box top-left" />
              <div className="box" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
