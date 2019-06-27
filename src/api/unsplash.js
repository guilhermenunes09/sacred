import React, { Component } from "react";
import Unsplashjs, { toJson } from "unsplash-js";

const unsplash = new Unsplashjs({
  applicationId: process.env.REACT_APP_UNSPLAH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLAH_SECRET_KEY
});

class Unsplash extends Component {
  componentDidMount() {
    unsplash.search
      .photos("friendship", 1, 5)
      .then(toJson)
      .then(json => {
        if (typeof json !== "undefined") {
          this.props.refImages(json.results);
        }
      });
  }

  render() {
    return <React.Fragment />;
  }
}

export default Unsplash;
