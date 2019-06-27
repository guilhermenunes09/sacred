import React, { Component } from "react";
import { Fetch } from "react-request";

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count_once: 0
    };
  }

  render() {
    return (
      <Fetch url="https://BahaiPrayers.net/api/prayer/HiddensByLanguage?languageid=8">
        {({ fetching, failed, data }) => {
          if (fetching) {
            return <div>Loading data...</div>;
          }

          if (failed) {
            return <div>The request did not succeed.</div>;
          }

          if (data) {
            if (this.state.count_once === 0) {
              this.setState({ count_once: 1 });
              const random = Math.floor(Math.random() * +data.length);
              const hidden_word = data[random].Text;
              this.props.refHiddenWord(hidden_word);
            }
            return <div />;
          }

          return null;
        }}
      </Fetch>
    );
  }
}

export default Request;
