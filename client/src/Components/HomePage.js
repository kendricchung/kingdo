import React, { Component } from "react";
import HomePageTitle from "./HomePageTitle";
import Center from "react-center";
import PickUpButton from "./HomePageActionButtons/PickUpButton";
import DeliveryButton from "./HomePageActionButtons/DeliveryButton";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import backgroundImage from "./kingdo_homepage_background.png";

class HomePage extends Component {
  state = {
    mouseOverTitle: false,
    mouseOverLocation: false,
  };

  handleMouseEnterLocation = () => {
    this.setState({ mouseOverLocation: true });
  };

  handleMouseLeavingLocation = () => {
    this.setState({ mouseOverLocation: false });
  };

  render() {
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
        <Helmet>
          <title>King Do Restaurant</title>
        </Helmet>
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
            <DeliveryButton />
            <div style={{ width: "10%" }}></div>
            <PickUpButton />
          </div>
          <Center>
            <h2>
              <Link
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
