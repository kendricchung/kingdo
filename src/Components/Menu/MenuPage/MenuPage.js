import React, { Component } from "react";
import TopBar from "./TopBar";
import CarBar from "../../Cart/CartBar";

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTransportation: props.location.pathname.substring(1),
    };
  }
  render() {
    // TODO: if it is anything else, rediect to 404 page
    return (
      <div style={{ backgroundColor: "#FFCCCB" }}>
        <TopBar />
        <h2>Menu page</h2>
        <CarBar />
      </div>
    );
  }
}

export default MenuPage;
