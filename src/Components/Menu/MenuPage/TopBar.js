import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RoomIcon from "@material-ui/icons/Room";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

class TopBar extends Component {
  state = {
    mouseOverTitle: false,
    mouseOverLocationIcon: false,
  };

  handleMouseEnterTitle = () => {
    this.setState({ mouseOverTitle: true });
  };

  handleMouseLeavingTitle = () => {
    this.setState({ mouseOverTitle: false });
  };

  handleMouseEnterLocationIcon = () => {
    this.setState({ mouseOverLocationIcon: true });
  };

  handleMouseLeavingLocationIcon = () => {
    this.setState({ mouseOverLocationIcon: false });
  };

  render() {
    return (
      <Box boxShadow={2}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <div style={{ paddingLeft: "2%", width: "15%" }}>
            <h2>OPEN FOR TAKE OUT</h2>
            <h3>Payment is accepted upon pickup</h3>
          </div>
          <Button
            style={{
              backgroundColor: "transparent",
              width: "15%",
            }}
            disableRipple={true}
            onMouseEnter={this.handleMouseEnterTitle}
            onMouseLeave={this.handleMouseLeavingTitle}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: this.state.mouseOverTitle ? "grey" : "black",
              }}
            >
              <div>
                <h1>LOGO</h1>
                {/* TODO: logo goes here */}
                <h3>Kingdo Restaurant</h3>
              </div>
            </Link>
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingRight: "2%",
              width: "15%",
            }}
          >
            <div style={{ paddingRight: "20px" }}>
              <h3>7789999999</h3>
              <h3>7789999997</h3>
            </div>
            <IconButton
              style={{
                backgroundColor: "transparent",
                color: this.state.mouseOverLocationIcon ? "grey" : "black",
              }}
              disableRipple={true}
              onMouseEnter={this.handleMouseEnterLocationIcon}
              onMouseLeave={this.handleMouseLeavingLocationIcon}
            >
              <RoomIcon></RoomIcon>
            </IconButton>
          </div>
        </div>
      </Box>
    );
  }
}

export default TopBar;
