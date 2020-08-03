import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhoneInput from "material-ui-phone-number";
import { Redirect } from "react-router-dom";

class OrderConfirmationPage extends Component {
  state = {
    disabledButton: true,
    firstNameText: "",
    lastNameText: "",
    phoneNumber: "",
  };

  handleFirstNameEdit = (event) => {
    this.setState({ firstNameText: event.target.value });
  };

  handleLastNameEdit = (event) => {
    this.setState({ lastNameText: event.target.value });
  };

  handlePhoneNumberEdit = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };

  render() {
    if (!this.props.token) {
      return <Redirect to="/404" />;
    }

    return (
      <div>
        <TopBar />
        <div style={{ padding: "2%", paddingRight: "10%", paddingLeft: "10%" }}>
          <Typography
            component="h2"
            style={{ fontSize: 20, paddingBottom: "2%" }}
          >
            Please fill in the following to confirm that you will be picking up
            the order. Your payment will be received upon pick up.
          </Typography>
          <div
            style={{ width: "100%", height: 1, backgroundColor: "black" }}
          ></div>
          <Typography component="h2" style={{ fontSize: 20, paddingTop: "2%" }}>
            First Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            style={{ paddingBottom: 10 }}
            onChange={this.handleFirstNameEdit}
          />
          <Typography component="h2" style={{ fontSize: 20 }}>
            Last Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            style={{ paddingBottom: 10 }}
            onChange={this.handleLastNameEdit}
          />
          <Typography component="h2" style={{ fontSize: 20 }}>
            Phone Number
          </Typography>
          <PhoneInput
            fullWidth
            style={{ height: "40px", paddingTop: "5px" }}
            onChange={this.handlePhoneNumberEdit}
            defaultCountry="ca"
            disableDropdown="true"
            countryCodeEditable="false"
          />
        </div>
        <div style={{ padding: "2%", paddingRight: "10%", paddingLeft: "10%" }}>
          <Button
            fullWidth
            variant="contained"
            style={{
              padding: "2%",
              fontSize: 20,
              color: "white",
              backgroundColor: "green",
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    );
  }
}

export default OrderConfirmationPage;
