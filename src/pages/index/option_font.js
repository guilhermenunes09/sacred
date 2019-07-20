import React, { Component } from 'react';

class OptionFont extends Component {
    changeFont = (font_name) => {
        this.props.refChangeFont(font_name);
        console.log(font_name);
    }
    render() {
        return (
            <React.Fragment>
                <div className="d-inline font-option" onClick={e => this.changeFont("Arial")}>Arial</div>
                <div className="d-inline font-option" onClick={e => this.changeFont("Crimson Text")}>Crimson Text</div>
                <div className="d-inline font-option" onClick={e => this.changeFont("DM Serif Text")}>DM Serif Text</div>
                <div className="d-inline font-option" onClick={e => this.changeFont("Darker Grotesque")}>Darker Grotesque</div>
                <div className="d-inline font-option" onClick={e => this.changeFont("Oswald")}>Oswald</div>
                <div className="d-inline font-option" onClick={e => this.changeFont("Open Sans Condensed")}>Open Sans Condensed</div>
            </React.Fragment>
        );
    }
}

export default OptionFont;