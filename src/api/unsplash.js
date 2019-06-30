import React, { Component } from "react";
import Unsplashjs, { toJson } from "unsplash-js";

const unsplash = new Unsplashjs({
  applicationId: process.env.REACT_APP_UNSPLAH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLAH_SECRET_KEY
});

class Unsplash extends Component {
  constructor(props) {
    super(props);
  }
  imageSearch = () => {
    unsplash.search
      .photos(this.props.key_word, this.props.actual_page, 5)
      .then(toJson)
      .then(json => {
        if (typeof json !== "undefined") {
          this.props.refImages(json.results);
          console.log(json);
        }
      });
  };
  componentDidMount() {
    console.log("Init Search");
    this.imageSearch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.key_word !== prevProps.key_word) {
      console.log("New Search");
      this.imageSearch();
    }
    if (this.props.actual_page !== prevProps.actual_page) {
      console.log("New Search");
      this.imageSearch();
    }
  }

  render() {
    return <React.Fragment />;
  }
}

export default Unsplash;
