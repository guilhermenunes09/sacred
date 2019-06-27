import React, { Component } from "react";

class Thumb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div
          onClick={this.props.onClick}
          className="img-thumb-background"
          style={{ backgroundImage: `url(${this.props.image_url})` }}
        >
          {" "}
        </div>
      </React.Fragment>
    );
  }
}

export default Thumb;
