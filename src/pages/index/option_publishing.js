import React, { Component } from "react";

class OptionPublishing extends Component {
    saveToComputer = e => {

        console.log("Salvar");
        const image_name = this.props.quote.substring(0, 10);
        const canvas = document.getElementById("canvas");
        const url = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.download = "quote_" + image_name + ".png";
        link.href = document.getElementById('canvas').toDataURL();
        link.click();
        console.log(canvas);
        canvas.toDataURL('image/png');
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col col-footer mx-auto text-center">
                        <span className="text-center footer-title">Publicar</span>
                        <div className="form-group">
                            <button className="btn btn-primary" onClick={e => this.saveToComputer(e)}>Salvar no Computador</button> {' '}
                            <button className="btn btn-primary disabled">Publicar no Facebook</button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default OptionPublishing;