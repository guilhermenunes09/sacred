import React, { Component } from 'react';

class OptionFont extends Component {
    changeFont = (e) => {
        const font_name = e.currentTarget.value;
        console.log("change font");
        console.log(e.currentTarget.value);
        this.props.refChangeFont(font_name);

    }
    changeFontSize = event => {
        const font_size = parseInt(event.currentTarget.value);
        if (font_size >= 1) {
            this.props.refSetFontSize(font_size);
        }
    };

    changeFontColor = event => {
        const font_color = event.currentTarget.value;
        this.props.refSetFontColor(font_color);
    };

    handleChangePosX = event => {
        const pos_x = parseInt(event.currentTarget.value);
        this.props.refSetPosX(pos_x);
    };

    handleChangePosY = event => {
        const pos_y = parseInt(event.currentTarget.value);
        this.props.refSetPosY(pos_y);
    };

    changeSquareWidth = event => {
        const square_width = parseInt(event.currentTarget.value);
        console.log("Change Square Width");
        this.props.refSetSquareWidth(square_width);
    };

    topLeftText = event => {
        this.props.refSetTopLeft();
    };

    topRightText = event => {
        console.log("Top Right");
        this.props.refSetTopRight();
    };

    bottomLeftText = event => {
        this.props.refSetBottomLeft();
    };

    bottomRightText = event => {
        this.props.refSetBottomRight();
    };
    render() {
        return (
            <React.Fragment>
                <div className="row">

                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Tamanho</span>
                        <div className="form-group">
                            <input
                                type="number"
                                min="11"
                                max="1000"
                                className="form-control"
                                name="font-size"
                                pattern="[0-9]*"
                                defaultValue={this.props.fontSize}
                                onChange={e => this.changeFontSize(e)}
                            />
                        </div>
                    </div>
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Fonte</span>
                        <select name="font_name" className="form-control" onChange={e => this.changeFont(e)}>
                            <option value="arial" className="d-inline font-option">Arial</option>
                            <option className="d-inline font-option">Crimson Text</option>
                            <option className="d-inline font-option">DM Serif Text</option>
                            <option className="d-inline font-option">Darker Grotesque</option>
                            <option className="d-inline font-option">Oswald</option>
                            <option className="d-inline font-option">Open Sans Condensed</option>
                        </select>
                        <span className="text-center footer-title">Cor</span>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="font-color"
                                defaultValue={this.props.fontColor}
                                onChange={e => this.changeFontColor(e)}
                            />
                        </div>
                    </div>
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Pos X</span>

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

                        <span className="text-center footer-title">Pos Y</span>

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

                    </div>
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Caixa de Texto</span>
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
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Definir Posição</span>

                        <div className="d-flex d-inline justify-content-center">
                            <div onClick={e => this.topLeftText(e)} className="box" />
                            <div onClick={e => this.topRightText(e)} className="box" />
                        </div>
                        <div className="d-flex d-inline justify-content-center">
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
            </React.Fragment>
        );
    }
}

export default OptionFont;