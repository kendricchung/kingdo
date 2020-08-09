import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePageTitle extends Component {
  render() {
    return (
      <h1
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: 75,
            color: "white",
            flexWrap: "wrap",
          }}
        >
          King Do Restaurant
        </Link>
      </h1>
      // TODO: need to pick font family
    );
  }
}

export default HomePageTitle;
