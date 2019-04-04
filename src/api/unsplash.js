import React, { Component } from 'react';
import Unsplashjs from 'unsplash-js';

const unsplash = new Unsplashjs({
  applicationId: process.env.REACT_APP_UNSPLAH_ACCESS_KEY,
  secret: process.env.REACT_APP_UNSPLAH_SECRET_KEY,
});

class Unsplash extends Component {

  componentDidMount(){
    console.log(unsplash);
    console.log(process.env.REACT_APP_UNSPLAH_ACCESS_KEY);
  }

  render() {
    return(
      <React.Fragment>
        Olá, testand Unsplashjs
      </React.Fragment>
    );
  }

}

export default Unsplash;
