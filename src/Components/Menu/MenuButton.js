import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import buttonBackground from "../kingdo_background.png";

class MenuButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: props.buttonName,
    };
  }

  render() {
    return (
      <Button
        label="Submit"
        color="#808080"
        variant="contained"
        size="large"
        style={{
          fontSize: 18,
          fontWeight: "bolder",
          backgroundImage: `url(${buttonBackground})`,
          borderWidth: 2,
          borderColor: "black",
          borderStyle: "solid",
        }}
      >
        {this.state.buttonName}
      </Button>
    );
  }
}

export default MenuButton;
