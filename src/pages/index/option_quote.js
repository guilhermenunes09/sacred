import React, { Component } from "react";

class OptionQuote extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    const quote = this.props.quote;
    const author = this.props.author;
    this.state = {
      quote: quote,
      author: author
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

  handleChangeAuthor = e => {
    const text = e.currentTarget.value;
    this.props.refChangeAuthor(text);
    this.setState({ author: text });
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

  autoRenewQuote = e => {
    console.log("Auto Renew Quote");
    this.props.refAutoRenewQuote();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col col-footer mx-auto text-center">
            <span className="text-center footer-title">Citação</span>

            <div className="form-group">
              <textarea
                ref={this.myRef}
                rows="3"
                type="text"
                className="form-control"
                name="textarea"
                defaultValue={this.props.quote}
                value={this.props.quote}
                onChange={e => this.handleChange(e)}
              />
            </div>
          </div>
          <div className="col col-footer mx-auto text-center">
            <span className="text-center footer-title">Autor</span>
            <div className="form-group">
              <input
                ref={this.myInput}
                type="text"
                className="form-control"
                name="textarea"
                defaultValue={this.props.author}
                value={this.props.author}
                onChange={e => this.handleChangeAuthor(e)}
              />
            </div>
          </div>

          <div className="col col-footer mx-auto text-center">
            <span className="text-center footer-title">Carregar outra citação</span>
            <div className="form-group">
              <i
                onClick={e => this.autoRenewQuote(e)}
                class="material-icons align-self-center p-2 arrow"
              >
                autorenew
          </i>
            </div>
          </div>

        </div>

      </React.Fragment>
    );
  }
}

export default OptionQuote;
