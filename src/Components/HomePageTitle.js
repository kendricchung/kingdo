import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

class HomePageTitle extends Component {
  render() {
    return (
      <h1
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
          textAlign: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: isMobile ? 40 : 75,
            color: "white",
            flexWrap: "wrap",
          }}
        >
          King Do Restaurant (DO NOT ORDER! SYSTEM IS DOWN!)
        </Link>
      </h1>
    );
  }
}

export default HomePageTitle;
