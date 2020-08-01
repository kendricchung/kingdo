import React, { Component } from "react";
import ActionButton from "./ActionButton";

class PickUpButton extends Component {
  render() {
    return <ActionButton nextPageRoute="/pickup" buttonName="Pick Up" />;
  }
}

export default PickUpButton;
