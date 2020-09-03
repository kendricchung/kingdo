import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";

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
