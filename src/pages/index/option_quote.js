import React, { Component } from "react";

class OptionQuote extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    const quote = this.props.quote;
    this.state = {
      quote: quote
    };
  }

  componentDidMount() {
    this.state.quote = this.props.quote;
  }

  handleChange = e => {
    const text = e.currentTarget.value;
    this.props.refChangeText(text);
    this.setState({ quote: text });
    console.log(text);
  };

  componentDidUpdate(props, prevProps) {
    if (props.quote !== prevProps.quote) {
      this.setState({ quote: this.props.quote });
      console.log("check ref");
      console.log(this.myRef);
      //this.myRef.value = this.state.quote;
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mx-auto">
          <div className="col text-center">
            <div className="form-group">
              <label>
                Citação:
                <textarea
                  ref={this.myRef}
                  rows="3"
                  cols="30"
                  type="text"
                  className="form-control"
                  name="textarea"
                  defaultValue={this.props.quote}
                  value={this.props.quote}
                  onChange={e => this.handleChange(e)}
                />
              </label>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default OptionQuote;
