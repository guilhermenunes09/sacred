import React, { Component } from 'react';
import Unsplashjs, { toJson } from 'unsplash-js';

const unsplash = new Unsplashjs({
  applicationId: process.env.REACT_APP_UNSPLAH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLAH_SECRET_KEY,
});

class Unsplash extends Component {

  componentDidMount(){
    unsplash.search.photos("love", 2, 2)
    .then(toJson)
    .then(json => {

      this.props.refImage(json);
    });

  }

  render() {
    return(
      <React.Fragment>
        Olá, testand Unsplashjs
        Hello
      </React.Fragment>
    );
  }

}

export default Unsplash;
