import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Center from "react-center";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.location.state,
      phoneNumber: props.location.phoneNumber,
      foodTransportationMethod: props.location.pathname.includes("delivery")
        ? "delivery"
        : "pick up",
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

    if (isMobile) {
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
              }}
            >
              <h2>THANK YOU!</h2>
              <h4>
                {`We have sent you a text message to confirm your ${this.state.foodTransportationMethod} order.`}
              </h4>
              <h4>
                Please reply "CONFIRM" to your text message so that we can start
                preparing your order. We will see you soon!
              </h4>
            </div>
          </Center>
        </div>
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
              {`We have sent you a text message to confirm your ${this.state.foodTransportationMethod} order.`}
            </h3>
            <h3>
              Please reply "CONFIRM" to your text message so that we can start
              preparing your order. We will see you soon!
            </h3>
          </div>
        </Center>
      </div>
    );
  }
}

export default Checkout;
