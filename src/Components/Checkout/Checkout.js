import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Center from "react-center";
import { Link } from "react-router-dom";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state,
      phoneNumber: props.location.phoneNumber,
    };
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
        <Center>
          <div
            style={{
              textAlign: "center",
              height: "20px",
              paddingTop: "14%",
              paddingRight: "5%",
              paddingLeft: "5%",
              minWidth: "1440px",
            }}
          >
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
