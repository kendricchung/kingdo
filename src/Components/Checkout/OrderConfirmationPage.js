import React, { Component } from "react";
import TopBar from "../Menu/MenuPage/TopBar";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PhoneInput from "material-ui-phone-number";
import { Redirect } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

class OrderConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledButton: true,
      firstNameText: "",
      lastNameText: "",
      phoneNumber: "",
      token: props.location.state,
      disabled: true,
    };
  }

  handleFirstNameEdit = (event) => {
    this.setState({
      firstNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.lastNameText.length === 0 ||
        this.state.phoneNumber.length === 0,
    });
  };

  handleLastNameEdit = (event) => {
    this.setState({
      lastNameText: event.target.value,
      disabled:
        event.target.value.length === 0 ||
        this.state.firstNameText.length === 0 ||
        this.state.phoneNumber.length === 0,
    });
  };

  handlePhoneNumberEdit = (value) => {
    this.setState({
      phoneNumber: value.replace(/\(|\)|-|\s/g, ""),
      disabled:
        value.length === 0 ||
        this.state.lastNameText.length === 0 ||
        this.state.firstNameText.length === 0,
    });
  };

  render() {
    if (!this.state.token) {
      return <Redirect to="/404" />;
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
                  picking up the order.
                </Typography>
                <Typography
                  component="h2"
                  style={{ fontSize: 20, paddingBottom: "2%" }}
                >
                  Your payment will be received upon pick up.
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
