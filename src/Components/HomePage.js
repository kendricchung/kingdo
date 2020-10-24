import React, { Component } from "react";
import HomePageTitle from "./HomePageTitle";
import Center from "react-center";
import { Link, Redirect } from "react-router-dom";
import backgroundImage from "./kingdo_homepage_background.png";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

class HomePage extends Component {
  state = {
    mouseOverTitle: false,
    mouseOverLocation: false,
    redirectToNextPage: false,
    showDeliveryModal: false,
  };

  handleMouseEnterLocation = () => {
    this.setState({ mouseOverLocation: true });
  };

  handleMouseLeavingLocation = () => {
    this.setState({ mouseOverLocation: false });
  };

  handleRedirecToNextPage = (nextPageRoute) => {
    sessionStorage.setItem("foodTransportMethod", nextPageRoute);
    this.setState({ redirectToNextPage: true });
  };

  handleShowDeliveryModal = () => {
    this.setState({ showDeliveryModal: true });
  };

  handleCloseDeliveryModal = () => {
    this.setState({ showDeliveryModal: false });
  };

  pickUpButton = () => {
    if (isMobile) {
      return (
        <Button
          fullWidth
          label="Submit"
          color="#808080"
          variant="contained"
          size="medium"
          onClick={() => this.handleRedirecToNextPage("/pickup")}
          style={{
            borderRadius: 10,
            fontSize: 16,
            width: "120px",
            textTransform: "none",
          }}
        >
          Pick Up
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
        onClick={() => this.handleRedirecToNextPage("/pickup")}
        buttonStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 10, fontSize: 25 }}
      >
        Pick Up
      </Button>
    );
  };

  deliveryButton = () => {
    if (isMobile) {
      return (
        <Button
          fullWidth
          label="Submit"
          color="#808080"
          variant="contained"
          size="medium"
          onClick={this.handleShowDeliveryModal}
          style={{
            borderRadius: 10,
            fontSize: 16,
            width: "120px",
            textTransform: "none",
          }}
        >
          Delivery
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
        onClick={this.handleShowDeliveryModal}
        buttonStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 10, fontSize: 25 }}
      >
        Delivery
      </Button>
    );
  };

  render() {
    if (this.state.redirectToNextPage) {
      return (
        <Redirect push to={sessionStorage.getItem("foodTransportMethod")} />
      );
    }

    if (isMobile) {
      return (
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            position: "fixed",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <HomePageTitle />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {this.deliveryButton()}
              <div style={{ width: "10%" }}></div>
              {this.pickUpButton()}
            </div>
            <h5 style={{ textAlign: "center" }}>
              <Link
                to="#"
                component={() => (
                  <a
                    onMouseEnter={this.handleMouseEnterLocation}
                    onMouseLeave={this.handleMouseLeavingLocation}
                    style={{
                      textDecoration: "none",
                      color: this.state.mouseOverLocation ? "grey" : "white",
                    }}
                    href="https://www.google.com/maps/place/New+King+Do+Seafood+Restaurant/@49.191253,-122.8387086,17z/data=!3m1!4b1!4m5!3m4!1s0x5485d77f3574a219:0x593120f0f17c1726!8m2!3d49.191253!4d-122.8365199"
                  >
                    13922-104 Avenue, Surrey, British Columbia V3T 1X2, Canada
                  </a>
                )}
              ></Link>
            </h5>
          </div>
          <Modal
            open={this.state.showDeliveryModal}
            onClose={this.handleCloseDeliveryModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                backgroundColor: "white",
                height: "320px",
                width: "80%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <IconButton onClick={this.handleCloseDeliveryModal}>
                <CloseIcon fontSize="medium" />
              </IconButton>
              <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <h4>
                  Please note that we do not deliver more than 8 km away from
                  us.
                </h4>
                <h4>
                  Delivery fees that are within 5 km from us will be free and if
                  you are located more than 5 km, a $5 fee will be charged upon
                  delivery up to 8km.
                </h4>
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => this.handleRedirecToNextPage("/delivery")}
                  style={{
                    backgroundColor: "green",
                    fontSize: 14,
                    color: "black",
                    borderWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                  }}
                >
                  Continue with Delivery
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      );
    }

    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          position: "fixed",
          minWidth: "1440px",
        }}
      >
        <div style={{ paddingTop: "15%" }}>
          <Center>
            <HomePageTitle />
          </Center>
          <div
            style={{
              display: "flex",
              paddingRight: "30%",
              paddingLeft: "30%",
            }}
          >
            {this.deliveryButton()}
            <div style={{ width: "10%" }}></div>
            {this.pickUpButton()}
          </div>
          <Center>
            <h2>
              <Link
                to="#"
                component={() => (
                  <a
                    onMouseEnter={this.handleMouseEnterLocation}
                    onMouseLeave={this.handleMouseLeavingLocation}
                    style={{
                      textDecoration: "none",
                      color: this.state.mouseOverLocation ? "grey" : "white",
                    }}
                    href="https://www.google.com/maps/place/New+King+Do+Seafood+Restaurant/@49.191253,-122.8387086,17z/data=!3m1!4b1!4m5!3m4!1s0x5485d77f3574a219:0x593120f0f17c1726!8m2!3d49.191253!4d-122.8365199"
                  >
                    13922-104 Avenue, Surrey, British Columbia V3T 1X2, Canada
                  </a>
                )}
              ></Link>
            </h2>
          </Center>
        </div>
        <Modal
          open={this.state.showDeliveryModal}
          onClose={this.handleCloseDeliveryModal}
        >
          <div
            style={{
              backgroundColor: "white",
              height: "400px",
              width: "600px",
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              outline: "none",
              borderRadius: "10px",
            }}
          >
            <IconButton onClick={this.handleCloseDeliveryModal}>
              <CloseIcon fontSize="large" />
            </IconButton>
            <div style={{ height: "20px" }} />
            <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
              <h2>
                Please note that we do not deliver more than 8 km away from us.
              </h2>
              <h2>
                Delivery fees that are within 5 km from us will be free and if
                you are located more than 5 km, a $5 fee will be charged upon
                delivery up to 8km.
              </h2>
            </div>
            <div
              style={{
                paddingLeft: "30px",
                paddingRight: "30px",
                paddingTop: "10px",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                onClick={() => this.handleRedirecToNextPage("/delivery")}
                style={{
                  backgroundColor: "green",
                  fontSize: 20,
                  color: "black",
                  borderWidth: 1,
                  borderColor: "black",
                  borderStyle: "solid",
                }}
              >
                Continue with Delivery
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default HomePage;
