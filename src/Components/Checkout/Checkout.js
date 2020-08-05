import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Center from "react-center";
import { Link } from "react-router-dom";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state,
    };
    sessionStorage.removeItem("cartItems");
  }

  render() {
    if (!this.state.token) {
      return (
        <Center>
          <h1>
            Please return to the main page <Link to="/">here</Link>.
          </h1>
        </Center>
      );
    }

    return (
      <div>
        <TopBar />
        <div style={{ height: "20px", paddingTop: "14%" }} />
        <Center>
          <div>
            <h1>THANK YOU!</h1>
            <h3>
              We have sent you a text message to confirm that you will pick up
              your order. Please reply "CONFIRM" to your text message so that we
              can start preparing your order. We'll see you soon!
            </h3>
          </div>
        </Center>
      </div>
    );
  }
}

export default Checkout;
