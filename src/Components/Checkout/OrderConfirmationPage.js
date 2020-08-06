import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhoneInput from "material-ui-phone-number";
import { Redirect, Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Center from "react-center";
import Axios from "axios";
import { Helmet } from "react-helmet";
import { parseItemIntoStack } from "../Cart/CartPage";

const hostEndpoint = process.env.KINGDO_HOST_ENDPOINT
  ? process.env.KINGDO_HOST_ENDPOINT
  : "http://localhost:3001";

class OrderConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameText: "",
      lastNameText: "",
      phoneNumber: "",
      deliveryAddress: "",
      token: props.location.state,
      foodTransportationMethod: props.location.pathname.includes("delivery")
        ? "delivery"
        : "pickup",
      disabled: true,
      redirectToPlaceOrderConfirmPage: false,
    };
  }

  handleFirstNameEdit = (event) => {
    this.setState({
      firstNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.lastNameText.length === 0 ||
        this.state.phoneNumber.length === 0 ||
        this.state.deliveryAddress.length === 0,
    });
  };

  handleLastNameEdit = (event) => {
    this.setState({
      lastNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.phoneNumber.length === 0 ||
        this.state.deliveryAddress.length === 0,
    });
  };

  handleDeliveryAddressEdit = (event) => {
    this.setState({
      lastNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.phoneNumber.length === 0 ||
        this.state.lastNameText.length === 0,
    });
  };

  handlePhoneNumberEdit = (value) => {
    this.setState({
      phoneNumber: value.replace(/\(|\)|-|\s/g, ""),
      disabled:
        value.length === 0 ||
        this.state.lastNameText.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.deliveryAddress.length === 0,
    });
  };

  handleRedirectToPlaceOrderConfirmPage = () => {
    try {
      const [stackItems, cartItemsAmount] = parseItemIntoStack(
        JSON.parse(sessionStorage.getItem("cartItems"))
      );
      Axios(`${hostEndpoint}/twilio/sms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        params: {
          customerPhoneNumber: this.state.phoneNumber,
          firstName: this.state.firstNameText,
          lastName: this.state.lastNameText,
          transportationMethod: this.state.foodTransportationMethod,
        },
        data: { stackItems, cartItemsAmount },
      }).then((response) => sessionStorage.removeItem("cartItems"));
      // TODO: need to check if number of valid if not show that they need to pick up on next screen
    } catch (error) {
      console.log(error);
    }
    this.setState({ redirectToPlaceOrderConfirmPage: true });
  };

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

    if (this.state.redirectToPlaceOrderConfirmPage) {
      return (
        <Redirect
          to={{
            pathname: `/${this.state.foodTransportationMethod}/cart/order/confirmed/checkout`,
            state: "token",
            phoneNumber: this.state.phoneNumber,
          }}
        />
      );
    }

    return (
      <div>
        <Helmet>
          <title>King Do Restaurant | Order Confirm</title>
        </Helmet>
        <TopBar />
        <div style={{ padding: "2%", paddingRight: "5%", paddingLeft: "5%" }}>
          <Card>
            <CardContent>
              <div
                style={{
                  padding: "2%",
                }}
              >
                <Typography component="h2" style={{ fontSize: 20 }}>
                  Please fill in the following to confirm that you will be
                  paying for your order.
                </Typography>
                <Typography
                  component="h2"
                  style={{ fontSize: 20, paddingBottom: "2%" }}
                >
                  Your payment will be received upon
                  {this.state.foodTransportationMethod === "deliver"
                    ? " delivery"
                    : " pick up"}
                  .
                </Typography>
                <div
                  style={{ width: "100%", height: 1, backgroundColor: "black" }}
                ></div>
                <Typography
                  component="h2"
                  style={{ fontSize: 20, paddingTop: "2%" }}
                >
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  autoFocus
                  autoComplete
                  variant="outlined"
                  style={{ paddingBottom: 10 }}
                  onChange={this.handleFirstNameEdit}
                />
                <Typography component="h2" style={{ fontSize: 20 }}>
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  autoComplete
                  variant="outlined"
                  style={{ paddingBottom: 10 }}
                  onChange={this.handleLastNameEdit}
                />
                <Typography component="h2" style={{ fontSize: 20 }}>
                  Phone Number
                </Typography>
                <PhoneInput
                  fullWidth
                  autoComplete
                  style={{ height: "40px", paddingTop: "5px" }}
                  onChange={this.handlePhoneNumberEdit}
                  defaultCountry="ca"
                  disableDropdown="true"
                  countryCodeEditable="false"
                />
                {this.state.foodTransportationMethod === "delivery" ? (
                  <Typography component="h2" style={{ fontSize: 20 }}>
                    Delivery Address
                  </Typography>
                ) : (
                  ""
                )}
                {this.state.foodTransportationMethod === "delivery" ? (
                  <TextField
                    fullWidth
                    autoComplete
                    variant="outlined"
                    style={{ paddingBottom: 10 }}
                    onChange={this.handleLastNameEdit}
                  />
                ) : (
                  ""
                )}
              </div>
              <div
                style={{
                  padding: "2%",
                  paddingRight: "10%",
                  paddingLeft: "10%",
                }}
              >
                <Button
                  fullWidth
                  disabled={this.state.disabled}
                  onClick={this.handleRedirectToPlaceOrderConfirmPage}
                  variant="contained"
                  style={{
                    padding: "2%",
                    fontSize: 20,
                    color: "white",
                    backgroundColor: this.state.disabled ? "grey" : "green",
                  }}
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

export default OrderConfirmationPage;
