import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import { isMobile } from "react-device-detect";

class ActionButton extends Component {
  state = {
    redirectToNextPage: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      redirectToNextPage: false,
      nextPageRoute: props.nextPageRoute,
      buttonName: props.buttonName,
    };
  }

  handleRedirecToNextPage = () => {
    sessionStorage.setItem("foodTransportMethod", this.state.nextPageRoute);
    this.setState({ redirectToNextPage: true });
  };

  render() {
    if (this.state.redirectToNextPage) {
      return <Redirect push to={this.state.nextPageRoute} />;
    }

    if (isMobile) {
      return (
        <Button
          fullWidth
          label="Submit"
          color="#808080"
          variant="contained"
          size="medium"
          onClick={this.handleRedirecToNextPage}
          style={{ borderRadius: 10, fontSize: 16, width: "120px" }}
        >
          {this.state.buttonName}
        </Button>
      );
    }

    return (
      <Button
        fullWidth
        label="Submit"
        color="#808080"
        variant="contained"
        size="large"
        // TODO: need to change it to medium/small if it is mobile
        onClick={this.handleRedirecToNextPage}
        buttonStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 10, fontSize: 25 }}
      >
        {this.state.buttonName}
      </Button>
    );
  }
}

export default ActionButton;
