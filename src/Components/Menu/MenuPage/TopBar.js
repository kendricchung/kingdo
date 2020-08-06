import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

class TopBar extends Component {
  state = {
    mouseOverTitle: false,
    mouseOverLocation: false,
  };

  handleMouseEnterTitle = () => {
    this.setState({ mouseOverTitle: true });
  };

  handleMouseLeavingTitle = () => {
    this.setState({ mouseOverTitle: false });
  };

  handleMouseEnterLocation = () => {
    this.setState({ mouseOverLocation: true });
  };

  handleMouseLeavingLocation = () => {
    this.setState({ mouseOverLocation: false });
  };

  render() {
    return (
      <Box boxShadow={4}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundImage:
              "url(https://www.kingdorestaurant.com/wp-content/uploads/sites/177/2018/12/shutterstock_390619714.png)",
            alignItems: "center",
          }}
        >
          <div
            style={{
              paddingLeft: "2%",
              width: "20%",
            }}
          >
            <h1>
              {`This Order is for 
              ${
                this.props.foodTransportationMethod === "delivery"
                  ? "Delivery"
                  : "Pickup"
              }`}
            </h1>
            <h3>
              <Link
                component={() => (
                  <a
                    onMouseEnter={this.handleMouseEnterLocation}
                    onMouseLeave={this.handleMouseLeavingLocation}
                    style={{
                      textDecoration: "none",
                      color: this.state.mouseOverLocation ? "grey" : "black",
                    }}
                    href="https://www.google.com/maps/place/New+King+Do+Seafood+Restaurant/@49.191253,-122.8387086,17z/data=!3m1!4b1!4m5!3m4!1s0x5485d77f3574a219:0x593120f0f17c1726!8m2!3d49.191253!4d-122.8365199"
                  >
                    13922-104 Avenue, Surrey, British Columbia V3T 1X2, Canada
                  </a>
                )}
              ></Link>
            </h3>
          </div>
          <Link
            onMouseEnter={this.handleMouseEnterTitle}
            onMouseLeave={this.handleMouseLeavingTitle}
            to="/"
            style={{
              fontSize: 18,
              flexWrap: "wrap",
              textDecoration: "none",
              color: this.state.mouseOverTitle ? "grey" : "black",
              textAlign: "center",
            }}
          >
            <h1>LOGO</h1>
            {/* TODO: logo goes here */}
            <h2>Kingdo Restaurant</h2>
          </Link>
          <div
            style={{
              justifyContent: "center",
              paddingRight: "2%",
              width: "20%",
              textAlign: "right",
            }}
          >
            <h2>7 DAYS A WEEK</h2>
            <h3>Monday-Sunday 10:30 am - 10:00 pm</h3>
            <h3>604-582-6911</h3>
          </div>
        </div>
      </Box>
    );
  }
}

export default TopBar;
