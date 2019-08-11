import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <React.Fragment>
        <div className="settings">
          <h4 className="text-center">Configurações</h4>
        </div>
        <div className="row">
          <div className="col">
            Caixa de Texto:
            <input
              type="number"
              min="0"
              max="1000"
              className="form-control"
              name="square-width"
              pattern="[0-9]*"
              value={this.props.squareWidth}
              onChange={e => this.changeSquareWidth(e)}
            />
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
              <div
                onClick={e => this.bottomLeftText(e)}
                className="box bottom-left"
              />
              <div
                onClick={e => this.bottomRightText(e)}
                className="box bottom-right"
              />
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default Settings;
