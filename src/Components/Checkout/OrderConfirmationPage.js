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
import { parseItemIntoStack } from "../Cart/CartPage";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { isMobile } from "react-device-detect";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

// backend server url
const hostEndpoint = process.env.REACT_APP_KINGDO_HOST_ENDPOINT
  ? process.env.REACT_APP_KINGDO_HOST_ENDPOINT
  : "http://localhost:4000";

class OrderConfirmationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameText: "",
      lastNameText: "",
      phoneNumber: "",
      deliveryAddress: "",
      city: "",
      postalCode: "",
      token: props.location.state,
      foodTransportationMethod: sessionStorage
        .getItem("foodTransportMethod")
        .includes("delivery")
        ? "delivery"
        : "pickup",
      redirectToPlaceOrderConfirmPage: false,
      error: false,
      isModalOpen: false,
      modalMessage: "",
      isWithinRange: true, // NOTE: within the 8km range but more than 5km
      isLoading: false,
      errorMessage: "",
      withIn5km: true,
      totalPrice: sessionStorage.getItem("totalPrice"),
      subtotalPrice: sessionStorage.getItem("subtotalPrice"),
      taxPrice: sessionStorage.getItem("taxPrice"),
      noValidForDeliveryModalOpen: false,
    };
  }

  handleFirstNameEdit = (event) => {
    this.setState({
      firstNameText: event.target.value,
    });
  };

  handleLastNameEdit = (event) => {
    this.setState({
      lastNameText: event.target.value,
    });
  };

  handleDeliveryAddressEdit = (event) => {
    this.setState({
      deliveryAddress: event.target.value,
    });
  };

  handleCityEdit = (event) => {
    this.setState({
      city: event.target.value,
    });
  };

  handlePostalCodeEdit = (event) => {
    this.setState({
      postalCode: event.target.value,
    });
  };

  handlePhoneNumberEdit = (value) => {
    this.setState({
      phoneNumber: value.replace(/\(|\)|-|\s/g, ""),
    });
  };

  handleRedirectToPlaceOrderConfirmPage = async () => {
    try {
      const [stackItems, cartItemsAmount] = parseItemIntoStack(
        JSON.parse(sessionStorage.getItem("cartItems"))
      );

      await Axios(`${hostEndpoint}/twilio/sms`, {
        method: "POST",
        params: {
          customerPhoneNumber: this.state.phoneNumber,
          firstName: this.state.firstNameText,
          lastName: this.state.lastNameText,
          transportationMethod: this.state.foodTransportationMethod,
          deliveryAddress: this.state.deliveryAddress,
          city: this.state.city,
          postalCode: this.state.postalCode,
          isWithIn5km: this.state.withIn5km,
          totalPrice: this.state.totalPrice,
          subtotalPrice: this.state.subtotalPrice,
          taxPrice: this.state.taxPrice,
        },
        data: { stackItems, cartItemsAmount },
      });

      sessionStorage.removeItem("cartItems");
      this.setState({
        redirectToPlaceOrderConfirmPage: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage:
          "Please check that you have entered your information correctly.",
        error: true,
        isLoading: false,
      });
    }
  };

  handleIsWithinRange = async () => {
    try {
      this.setState({ isLoading: true });

      if (
        (this.state.foodTransportationMethod === "pickup" &&
          (this.state.firstNameText.length === 0 ||
            this.state.lastNameText.length === 0 ||
            this.state.phoneNumber.length < 3)) ||
        (this.state.foodTransportationMethod === "delivery" &&
          (this.state.city.length === 0 ||
            this.state.deliveryAddress.length === 0 ||
            this.state.firstNameText.length === 0 ||
            this.state.lastNameText.length === 0 ||
            this.state.postalCode.length === 0 ||
            this.state.phoneNumber.length < 3))
      ) {
        throw Error("missing_inputs");
      }

      if (
        this.state.subtotalPrice < 30 &&
        this.state.foodTransportationMethod === "delivery"
      ) {
        throw Error("not_valid_for_delivery");
      }

      if (this.state.foodTransportationMethod === "delivery") {
        const response = await Axios(`${hostEndpoint}/range`, {
          method: "GET",
          params: {
            deliveryAddress: this.state.deliveryAddress,
            city: this.state.city,
            postalCode: this.state.postalCode,
          },
        });

        const range = response.data.range;

        if (range > 5) {
          if (range > 8) {
            this.setState({
              isWithinRange: false,
              modalMessage:
                "Sorry but your location exceeds our delivery distance limit. Please change your order to 'Pick Up' to place your order.",
              isModalOpen: true,
              isLoading: false,
              withIn5km: false,
            });
          } else {
            this.setState({
              isWithinRange: true,
              modalMessage:
                "Your location is more than 5 km away from us. A delivery fee of $5 is going to be added to your purchase, do you wish to continue?",
              isModalOpen: true,
              isLoading: false,
              withIn5km: false,
            });
          }
        } else {
          this.setState({ withIn5km: true });
          this.handleRedirectToPlaceOrderConfirmPage();
        }
      } else {
        this.handleRedirectToPlaceOrderConfirmPage();
      }
    } catch (error) {
      if (error.message === "not_valid_for_delivery") {
        this.setState({ noValidForDeliveryModalOpen: true, isLoading: false });
      } else if (
        error.message === "missing_inputs" ||
        error.response.status === 400
      ) {
        this.setState({
          errorMessage:
            "Please check that you have entered your information correctly.",
          error: true,
          isLoading: false,
        });
      } else {
        this.setState({
          errorMessage:
            "There has been an error with our network. We are working on getting it fixed.",
          error: true,
          isLoading: false,
        });
      }
    }
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

  handleClose = () => {
    this.setState({ error: false });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  handleModalCloseNotValidForDelivery = () => {
    this.setState({ noValidForDeliveryModalOpen: false });
  };

  render() {
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

    if (
      !this.state.token ||
      JSON.parse(sessionStorage.getItem("cartItems")) === null
    ) {
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
          <div
            style={{
              padding: "10px",
            }}
          >
            <Card>
              <CardContent>
                <div
                  style={{
                    padding: "2%",
                  }}
                >
                  <Typography component="h2" style={{ fontSize: 17 }}>
                    Please fill in the following to confirm that you will be
                    paying for your order.
                  </Typography>
                  <Typography
                    component="h2"
                    style={{ fontSize: 17, paddingBottom: "10px" }}
                  >
                    Your payment will be received upon
                    {this.state.foodTransportationMethod === "delivery"
                      ? " delivery"
                      : " pick up"}
                    .
                  </Typography>
                  <Typography
                    component="h2"
                    style={{ fontSize: 17, paddingBottom: "10px" }}
                  >
                    You can still change between delivery and pick up here:
                  </Typography>
                  <FormControl
                    variant="outlined"
                    style={{ width: "150px", paddingBottom: "10px" }}
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
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "black",
                    }}
                  ></div>
                  <Typography
                    component="h2"
                    style={{ fontSize: 17, paddingTop: "2%" }}
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    autoComplete
                    variant="outlined"
                    style={{ paddingBottom: 10 }}
                    onChange={this.handleFirstNameEdit}
                  />
                  <Typography component="h2" style={{ fontSize: 17 }}>
                    Last Name
                  </Typography>
                  <TextField
                    fullWidth
                    autoComplete
                    variant="outlined"
                    style={{ paddingBottom: 10 }}
                    onChange={(event) => this.handleLastNameEdit(event)}
                  />
                  <Typography component="h2" style={{ fontSize: 17 }}>
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
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Address
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
                  {this.state.foodTransportationMethod === "delivery" ? (
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      City
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
                      onChange={this.handleCityEdit}
                    />
                  ) : (
                    ""
                  )}
                  {this.state.foodTransportationMethod === "delivery" ? (
                    <Typography component="h2" style={{ fontSize: 17 }}>
                      Postal Code
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
                      onChange={this.handlePostalCodeEdit}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div
                  style={{
                    padding: "10px",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={this.handleIsWithinRange}
                    variant="contained"
                    style={{
                      padding: "5px",
                      fontSize: 20,
                      color: "black",
                      backgroundColor: "green",
                      borderWidth: 1,
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
          <Snackbar
            open={this.state.error}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <Alert severity="error" elevation={6} variant="filled">
              {this.state.errorMessage}
            </Alert>
          </Snackbar>
          <Modal
            open={this.state.noValidForDeliveryModalOpen}
            onClose={this.handleModalCloseNotValidForDelivery}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                backgroundColor: "white",
                width: "80%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <IconButton onClick={this.handleModalCloseNotValidForDelivery}>
                <CloseIcon fontSize="medium" />
              </IconButton>
              <div style={{ paddingLeft: "10px" }}>
                <h4>
                  Your subtotal price must be at least $30 in order for
                  delivery. Please add one or more item(s) to your cart.
                </h4>
              </div>
            </div>
          </Modal>
          <Modal
            open={this.state.isModalOpen}
            onClose={this.handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                backgroundColor: "white",
                width: "80%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <IconButton onClick={this.handleModalClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
              <div style={{ paddingLeft: "10px" }}>
                <h4>{this.state.modalMessage}</h4>
              </div>

              {this.state.isWithinRange ? (
                <div
                  style={{
                    padding: "5px",
                    paddingBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={this.handleModalClose}
                    variant="contained"
                    style={{
                      padding: "5px",
                      fontSize: 16,
                      color: "black",
                      backgroundColor: "red",
                      borderWidth: 1,
                      borderColor: "black",
                      borderStyle: "solid",
                    }}
                  >
                    Cancel
                  </Button>
                  <div style={{ width: "10px" }}></div>
                  <Button
                    fullWidth
                    onClick={this.handleRedirectToPlaceOrderConfirmPage}
                    variant="contained"
                    style={{
                      padding: "5px",
                      fontSize: 16,
                      color: "black",
                      backgroundColor: "green",
                      borderWidth: 1,
                      borderColor: "black",
                      borderStyle: "solid",
                    }}
                  >
                    Place Order
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </Modal>
        </div>
      );
    }

    return (
      <div>
        <TopBar />
        <div
          style={{
            padding: "2%",
            paddingRight: "5%",
            paddingLeft: "5%",
          }}
        >
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
                  {this.state.foodTransportationMethod === "delivery"
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
                  style={{ width: "200px", paddingBottom: "25px" }}
                >
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={this.state.foodTransportationMethod}
                    onChange={(event) =>
                      this.handleFoodTransportationMethodChange(event)
                    }
                    style={{ fontSize: 20 }}
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
                {this.state.foodTransportationMethod === "delivery" ? (
                  <Typography component="h2" style={{ fontSize: 20 }}>
                    Address
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
                {this.state.foodTransportationMethod === "delivery" ? (
                  <Typography component="h2" style={{ fontSize: 20 }}>
                    City
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
                    onChange={this.handleCityEdit}
                  />
                ) : (
                  ""
                )}
                {this.state.foodTransportationMethod === "delivery" ? (
                  <Typography component="h2" style={{ fontSize: 20 }}>
                    Postal Code
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
                    onChange={this.handlePostalCodeEdit}
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
                  pointerEvents: this.state.isLoading ? "none" : "auto",
                }}
              >
                <Button
                  fullWidth
                  onClick={this.handleIsWithinRange}
                  variant="contained"
                  style={{
                    padding: "2%",
                    fontSize: 25,
                    color: "black",
                    backgroundColor: "green",
                    borderWidth: 1,
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
        <Snackbar
          open={this.state.error}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <Alert
            severity="error"
            elevation={6}
            variant="filled"
            style={{ height: 75, width: 500, fontSize: 22 }}
          >
            {this.state.errorMessage}
          </Alert>
        </Snackbar>
        <Modal
          open={this.state.noValidForDeliveryModalOpen}
          onClose={this.handleModalCloseNotValidForDelivery}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              backgroundColor: "white",
              width: "80%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IconButton onClick={this.handleModalCloseNotValidForDelivery}>
              <CloseIcon fontSize="medium" />
            </IconButton>
            <div style={{ paddingLeft: "10px" }}>
              <h2>
                Your subtotal price must be at least $30 in order for delivery.
                Please add one or more item(s) to your cart.
              </h2>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.isModalOpen}
          onClose={this.handleModalClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div
            style={{
              backgroundColor: "white",
              width: "550px",
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              outline: "none",
              borderRadius: "10px",
            }}
          >
            <IconButton onClick={this.handleModalClose}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
              <h2>{this.state.modalMessage}</h2>
            </div>

            {this.state.isWithinRange ? (
              <div
                style={{
                  paddingTop: "10px",
                  paddingBottom: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    paddingLeft: "30px",
                    paddingRight: "15px",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={this.handleModalClose}
                    variant="contained"
                    style={{
                      fontSize: 20,
                      color: "black",
                      backgroundColor: "red",
                      borderWidth: 1,
                      borderColor: "black",
                      borderStyle: "solid",
                      width: "200px",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div
                  style={{
                    paddingLeft: "15px",
                    paddingRight: "30px",
                    pointerEvents: this.state.isLoading ? "none" : "auto",
                  }}
                >
                  <Button
                    fullWidth
                    onClick={this.handleRedirectToPlaceOrderConfirmPage}
                    variant="contained"
                    style={{
                      fontSize: 20,
                      color: "black",
                      backgroundColor: "green",
                      borderWidth: 1,
                      borderColor: "black",
                      borderStyle: "solid",
                      width: "200px",
                    }}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default OrderConfirmationPage;
