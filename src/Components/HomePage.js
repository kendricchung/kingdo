import React, { Component } from "react";
import HomePageTitle from "./HomePageTitle";
import Center from "react-center";
import { Link } from "react-router-dom";
import backgroundImage from "./kingdo_homepage_background.png";
import { isMobile } from "react-device-detect";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

class HomePage extends Component {
  state = {
    mouseOverTitle: false,
    mouseOverLocation: false,
    redirectToNextPage: false,
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
          onClick={() => this.handleRedirecToNextPage("/delivery")}
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
        onClick={() => this.handleRedirecToNextPage("/delivery")}
        buttonStyle={{ borderRadius: 10 }}
        style={{ borderRadius: 10, fontSize: 25 }}
      >
        Delivery
      </Button>
    );
  };

  render() {
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
      </div>
    );
  }
}

export default HomePage;
