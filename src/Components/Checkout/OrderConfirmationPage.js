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
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import buttonBackground from "../kingdo_background.png";

const hostEndpoint = process.env.KINGDO_HOST_ENDPOINT
  ? process.env.KINGDO_HOST_ENDPOINT
  : "http://localhost:4000";

class OrderConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameText: "",
      lastNameText: "",
      phoneNumber: "",
      deliveryAddress: "",
      token: props.location.state,
      foodTransportationMethod: sessionStorage
        .getItem("foodTransportMethod")
        .includes("delivery")
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
        this.state.phoneNumber.length <= 2 ||
        (this.state.foodTransportationMethod === "delivery"
          ? this.state.deliveryAddress.length === 0
          : false),
    });
  };

  handleLastNameEdit = (event) => {
    this.setState({
      lastNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.phoneNumber.length <= 2 ||
        (this.state.foodTransportationMethod === "delivery"
          ? this.state.deliveryAddress.length === 0
          : false),
    });
  };

  handleDeliveryAddressEdit = (event) => {
    this.setState({
      deliveryAddress: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.phoneNumber.length <= 2 ||
        this.state.lastNameText.length === 0,
    });
  };

  handlePhoneNumberEdit = (value) => {
    this.setState({
      phoneNumber: value.replace(/\(|\)|-|\s/g, ""),
      disabled:
        value.length <= 2 ||
        this.state.lastNameText.length === 0 ||
        this.state.firstNameText.length === 0 ||
        (this.state.foodTransportationMethod === "delivery"
          ? this.state.deliveryAddress.length === 0
          : false),
    });
  };

  handleRedirectToPlaceOrderConfirmPage = () => {
    try {
      const [stackItems, cartItemsAmount] = parseItemIntoStack(
        JSON.parse(sessionStorage.getItem("cartItems"))
      );
      Axios(`${hostEndpoint}/twilio/sms`, {
        method: "POST",
        params: {
          customerPhoneNumber: this.state.phoneNumber,
          firstName: this.state.firstNameText,
          lastName: this.state.lastNameText,
          transportationMethod: this.state.foodTransportationMethod,
          deliveryAddress: this.state.deliveryAddress,
        },
        data: { stackItems, cartItemsAmount },
      }).then((response) => {
        console.log(response);
        sessionStorage.removeItem("cartItems");
      });
      // TODO: need to check if number of valid if not show that they need to pick up on next screen
    } catch (error) {
      console.log(error);
    }
    this.setState({ redirectToPlaceOrderConfirmPage: true });
  };

  handleFoodTransportationMethodChange = (event) => {
    sessionStorage.setItem(
      "foodTransportMethod",
      event.target.value === "delivery" ? "delivery" : "pickup"
    );
    this.setState({
      foodTransportationMethod: event.target.value,
      disabled:
        event.target.value === "delivery"
          ? true
          : this.state.firstNameText.length === 0 ||
            this.state.phoneNumber.length <= 2 ||
            this.state.lastNameText.length === 0,
    });
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
                <Typography
                  component="h2"
                  style={{ fontSize: 20, paddingBottom: "1%" }}
                >
                  You can still change between delivery and pick up here:
                </Typography>
                <FormControl
                  variant="outlined"
                  style={{ width: "25%", paddingBottom: "2%" }}
                >
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.foodTransportationMethod}
                    onChange={(event) =>
                      this.handleFoodTransportationMethodChange(event)
                    }
                  >
                    <MenuItem value={"delivery"}>Delivery</MenuItem>
                    <MenuItem value={"pickup"}>Pick Up</MenuItem>
                  </Select>
                </FormControl>
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
                  onChange={(event) => this.handleLastNameEdit(event)}
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
                {/* TODO: split by city name, street, and postal code */}
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
                    onChange={this.handleDeliveryAddressEdit}
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
                    fontSize: 25,
                    color: "black",
                    backgroundImage: `url(${buttonBackground})`,
                    filter: this.state.disabled
                      ? "grayscale(100%)"
                      : "grayscale(0%)",
                    borderWidth: 2,
                    borderColor: "black",
                    borderStyle: "solid",
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
