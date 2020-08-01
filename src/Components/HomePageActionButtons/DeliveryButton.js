import React, { Component } from "react";
import ActionButton from "./ActionButton";

class DeliveryButton extends Component {
  render() {
    return <ActionButton nextPageRoute="/delivery" buttonName="Delivery" />;
  }
}

export default DeliveryButton;
