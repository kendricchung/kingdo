import React, { Component } from "react";
import { Link } from "react-router-dom";

class Generic404Page extends Component {
  render() {
    return (
      <h1>
        Please return to the main page <Link to="/">here</Link>.
      </h1>
    );
  }
}

export default Generic404Page;
