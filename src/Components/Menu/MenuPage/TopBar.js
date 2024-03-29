import React, { Component } from "react";
import { Box, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import topBarLogo from "../../logo_transparent.png";
import { isMobile } from "react-device-detect";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

class TopBar extends Component {
  state = {
    mouseOverLocation: false,
    drawerIsOpen: false,
  };

  handleMouseEnterLocation = () => {
    this.setState({ mouseOverLocation: true });
  };

  handleMouseLeavingLocation = () => {
    this.setState({ mouseOverLocation: false });
  };

  toggleDrawer = (isOpen) => {
    this.setState({ drawerIsOpen: isOpen });
  };

  render() {
    if (isMobile) {
      return (
        <Box boxShadow={4}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#161c20",
              alignItems: "center",
              height: "100px",
            }}
          >
            <IconButton onClick={() => this.toggleDrawer(true)}>
              <MenuIcon fontSize="large" style={{ color: "white" }} />
            </IconButton>
            <Drawer
              anchor="left"
              open={this.state.drawerIsOpen}
              onClose={() => this.toggleDrawer(false)}
            >
              <div style={{ width: "200px" }}>
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "40px",
                    marginRight: "10px",
                  }}
                >
                  <h3 style={{ color: "black" }}>
                    {`This Order is for ${
                      sessionStorage
                        .getItem("foodTransportMethod")
                        .includes("delivery")
                        ? "Delivery"
                        : "Pickup"
                    }`}
                  </h3>
                  <Divider />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h3>
                      <Link
                        to="#"
                        component={() => (
                          <a
                            style={{
                              textDecoration: "none",
                              color: "black",
                            }}
                            href="https://www.google.com/maps/place/New+King+Do+Seafood+Restaurant/@49.191253,-122.8387086,17z/data=!3m1!4b1!4m5!3m4!1s0x5485d77f3574a219:0x593120f0f17c1726!8m2!3d49.191253!4d-122.8365199"
                          >
                            Location
                          </a>
                        )}
                      ></Link>
                    </h3>
                    <div style={{ width: "5px" }} />
                    <OpenInNewIcon fontSize="small" />
                  </div>
                  <Divider />
                  <h4>Hours of Operation:</h4>
                  <h5>7 DAYS A WEEK</h5>
                  <h5>Monday - Sunday</h5>
                  <h5>11:00am - 9:00pm</h5>
                  <h4>Contact us at:</h4>
                  <h5>604-582-6911</h5>
                </div>
              </div>
            </Drawer>
            <Link
              to="/"
              style={{
                position: "absolute",
                left: "50%",
                top: "48px",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                alt="log"
                src={topBarLogo}
                height="75px"
                style={{ transform: "scale(1.2)" }}
              />
            </Link>
          </div>
        </Box>
      );
    }
    return (
      <Box boxShadow={4}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#161c20",
            alignItems: "center",
            minWidth: "1440px",
          }}
        >
          <div
            style={{
              paddingLeft: "30px",
              width: "300px",
            }}
          >
            <h1 style={{ color: "white" }}>
              {`This Order is for 
              ${
                sessionStorage
                  .getItem("foodTransportMethod")
                  .includes("delivery")
                  ? "Delivery"
                  : "Pickup"
              }`}
            </h1>
            <h3>
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
            </h3>
          </div>
          <Link to="/">
            <img
              alt="log"
              src={topBarLogo}
              style={{ transform: "scale(1.8)", height: "100px" }}
            />
          </Link>
          <div
            style={{
              justifyContent: "center",
              paddingRight: "30px",
              textAlign: "right",
              color: "white",
              width: "300px",
            }}
          >
            <h2>7 DAYS A WEEK</h2>
            <h3>Monday - Sunday</h3>
            <h3>11:00am - 9:00pm</h3>
            <h3>604-582-6911</h3>
          </div>
        </div>
      </Box>
    );
  }
}

export default TopBar;
