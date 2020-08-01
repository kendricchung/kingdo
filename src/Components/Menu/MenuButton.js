import React, { Component } from "react";
import Button from "@material-ui/core/Button";

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
        buttonStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 10, fontSize: 15 }}
      >
        {this.state.buttonName}
      </Button>
    );
  }
}

export default MenuButton;
