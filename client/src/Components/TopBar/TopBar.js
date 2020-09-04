import React, { Component } from "react";

class TopBar extends Component {
  state = {};
  render() {
    return (
      <div
        style={{
          backgroundColor: "gray",
          height: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <h2>Page status</h2>
        <h2>Title</h2>
        <h2>Social media info</h2>
      </div>
    );
  }
}

export default TopBar;
