import React, { Component } from 'react';
import Slider from 'react-input-slider';
import { SketchPicker } from 'react-color';
import Popover from 'react-tiny-popover'

class OptionFont extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPopoverOpen: false,
            displayColorPicker: false,
        }

    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef = node => {
        this.wrapperRef = node;
    }

    handleClickOutside = event => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ isPopoverOpen: false });
        }
    }

    changeTextStyle = (e) => {
        const text_style = e.currentTarget.value;
        console.log("Text Style");
        console.log(text_style);
        this.props.refSetTextStyle(text_style);
    }

    changeFont = (e) => {

        //this.props.refChangeFont(font_name);
    }

    changeFontSize = event => {
        const font_size = parseInt(event.currentTarget.value);
        if (font_size >= 1) {
            this.props.refSetFontSize(font_size);
        }
    };

    changeFontColor = color => {
        console.log("Color");
        console.log(color);
        const font_color = color.hex;
        this.props.refSetFontColor(font_color);
    };

    handleChangePosX = x => {

        console.log("Pos X");
        console.log(x.x);
        this.setState({ posx: x.x });
        const pos_x = parseInt(x.x);
        this.props.refSetPosX(pos_x);
    };

    handleChangePosY = x => {

        console.log("Pos Y");
        console.log(x.x);
        this.setState({ posy: x.x });
        const pos_y = parseInt(x.x);
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
                        <span className="text-center footer-title">Estilo</span>
                        <select name="text_style" className="form-control" onChange={e => this.changeTextStyle(e)}>
                            <option value="1" className="d-inline font-option">Estilo 1</option>
                            <option value="2" className="d-inline font-option">Estilo 2</option>
                            <option value="3" className="d-inline font-option">Estilo 3</option>
                        </select>

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

                        <Popover
                            isOpen={this.state.isPopoverOpen}
                            position={'top'} // preferred position
                            content={(
                                <div ref={this.setWrapperRef}>
                                    <SketchPicker
                                        id={"G1"}
                                        color={this.props.fontColor}
                                        onChangeComplete={this.changeFontColor}
                                    />
                                </div>
                            )}
                        >
                            <div style={{ backgroundColor: this.props.fontColor }} className="colorPick mx-auto shadow" onClick={() => this.setState({ isPopoverOpen: !this.state.isPopoverOpen })}>
                            </div>
                        </Popover>

                    </div>
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Posição: </span><br />
                        <span className="text-center footer-title">Pos X: </span>

                        <Slider
                            axis="x"
                            x={this.props.posX}
                            xmin={0}
                            xmax={this.props.width}
                            onChange={x => this.handleChangePosX(x)}
                        />


                        <span className="text-center footer-title">Pos Y: </span>

                        <Slider
                            axis="x"
                            x={this.props.posY}
                            xmin={0}
                            xmax={this.props.height}
                            onChange={y => this.handleChangePosY(y)}
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