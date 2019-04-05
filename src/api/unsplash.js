import React, { Component } from 'react';
import Unsplashjs, { toJson } from 'unsplash-js';

const unsplash = new Unsplashjs({
  applicationId: process.env.REACT_APP_UNSPLAH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLAH_SECRET_KEY,
});

class Unsplash extends Component {

  componentDidMount(){
    console.log(unsplash);
    console.log(process.env.REACT_APP_UNSPLAH_ACCESS_KEY);

    unsplash.search.photos("love", 1, 1)
    .then(toJson)
    .then(json => {
      console.log("result");
      console.log(json);
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
